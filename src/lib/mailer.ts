import "server-only";
import { inquirySummary, type InquiryInput } from "./inquiry";

/**
 * Wysyłka zapytań przez Resend (https://resend.com/docs/api-reference/emails/send-email).
 * Wymagane zmienne środowiskowe: RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL.
 */

interface MailConfig {
  apiKey: string;
  from: string;
  to: string[];
}

export function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (!apiKey || !from || to.length === 0) return null;
  return { apiKey, from, to };
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

export async function sendInquiryEmail(cfg: MailConfig, inquiry: InquiryInput): Promise<{ ok: true } | { ok: false; status: number }> {
  const subject = `Zapytanie ze strony: ${inquiry.house ? `dom nr ${inquiry.house}` : "inwestycja"} – ${oneLine(inquiry.name)}`;
  const text = [
    "Nowe zapytanie ze strony Lake View Prażmowo",
    "",
    inquirySummary(inquiry),
    "",
    `Zgoda na kontakt w sprawie zapytania: tak`,
    `Zgoda na informacje o inwestycji: ${inquiry.consentMarketing ? "tak" : "nie"}`,
    `Wysłano: ${new Date().toISOString()}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: cfg.from,
      to: cfg.to,
      reply_to: inquiry.email,
      subject,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!res.ok) return { ok: false, status: res.status };
  return { ok: true };
}
