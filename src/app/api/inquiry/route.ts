import { NextResponse, type NextRequest } from "next/server";
import { MIN_FILL_TIME_MS, normalizeInquiry, validateInquiry, type InquiryResponse } from "@/lib/inquiry";
import { getMailConfig, sendInquiryEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

function json(body: InquiryResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function allowedOrigins(): Set<string> {
  const set = new Set<string>([getSiteUrl()]);
  for (const v of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]) {
    if (v) set.add(`https://${v}`);
  }
  if (process.env.NODE_ENV !== "production") {
    set.add("http://localhost:3000");
    set.add("http://127.0.0.1:3000");
  }
  return set;
}

/** Informacja dla formularza, czy wysyłka jest skonfigurowana (bez ujawniania szczegółów). */
export function GET() {
  return NextResponse.json({ configured: getMailConfig() !== null }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  // Ochrona przed wysyłką z obcych stron (przeglądarki zawsze dołączają Origin do POST).
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin && !allowedOrigins().has(origin)) {
    return json({ ok: false, code: "forbidden", message: "Żądanie z niedozwolonego źródła." }, 403);
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Nieprawidłowy format danych." }, 415);
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, code: "bad_request", message: "Wiadomość jest zbyt długa." }, 413);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request", message: "Nieprawidłowy format danych." }, 400);
  }
  const inquiry = normalizeInquiry(parsed);

  // Pole-pułapka wypełnione → bot. Odpowiadamy neutralnie i niczego nie wysyłamy.
  if (inquiry.website) return json({ ok: true }, 200);

  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) return json({ ok: false, code: "invalid", errors }, 422);

  if (inquiry.elapsedMs < MIN_FILL_TIME_MS) {
    return json({ ok: false, code: "too_fast", message: "Formularz został wysłany zbyt szybko. Odczekaj chwilę i spróbuj ponownie." }, 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) {
    return json({ ok: false, code: "rate_limited", message: "Wysłano zbyt wiele zapytań. Spróbuj ponownie za kilka minut." }, 429);
  }

  const cfg = getMailConfig();
  if (!cfg) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message: "Formularz nie jest jeszcze połączony z usługą wysyłki wiadomości, dlatego zapytanie nie zostało wysłane.",
      },
      503,
    );
  }

  try {
    const result = await sendInquiryEmail(cfg, inquiry);
    if (!result.ok) {
      console.error(`[inquiry] Resend odrzucił wiadomość (HTTP ${result.status})`);
      return json({ ok: false, code: "send_failed", message: "Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę." }, 502);
    }
  } catch (err) {
    console.error("[inquiry] Błąd połączenia z Resend", err instanceof Error ? err.message : err);
    return json({ ok: false, code: "send_failed", message: "Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę." }, 502);
  }

  return json({ ok: true }, 200);
}
