/** Wspólna walidacja zapytania – używana w formularzu (klient) i w API (serwer). */

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  house: string; // "" = pytanie ogólne, "1".."16" = numer domu
  message: string;
  consent: boolean;
  consentMarketing: boolean;
  /** Pole-pułapka na boty – musi pozostać puste. */
  website: string;
  /** Czas od wyświetlenia formularza do wysłania (ms). */
  elapsedMs: number;
}

export type InquiryField = "name" | "email" | "phone" | "house" | "message" | "consent";
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const LIMITS = { name: 80, email: 120, phone: 30, message: 2000 } as const;
export const MIN_FILL_TIME_MS = 2500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{9,20}$/;

export function validateField(field: InquiryField, input: Partial<InquiryInput>): string {
  switch (field) {
    case "name": {
      const v = (input.name ?? "").trim();
      if (!v) return "Podaj imię.";
      if (v.length < 2) return "Imię powinno mieć co najmniej 2 znaki.";
      if (v.length > LIMITS.name) return `Imię może mieć najwyżej ${LIMITS.name} znaków.`;
      return "";
    }
    case "email": {
      const v = (input.email ?? "").trim();
      if (!v) return "Podaj adres e-mail, abyśmy mogli odpowiedzieć.";
      if (v.length > LIMITS.email || !EMAIL_RE.test(v)) return "Sprawdź adres e-mail – powinien mieć postać nazwa@domena.pl.";
      return "";
    }
    case "phone": {
      const v = (input.phone ?? "").trim();
      if (v && !PHONE_RE.test(v)) return "Numer telefonu może zawierać cyfry, spacje i znak +, np. +48 600 000 000.";
      return "";
    }
    case "house": {
      const v = input.house ?? "";
      if (v === "") return "";
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 16) return "Wybierz dom z listy.";
      return "";
    }
    case "message": {
      const v = input.message ?? "";
      if (v.length > LIMITS.message) return `Wiadomość może mieć najwyżej ${LIMITS.message} znaków.`;
      return "";
    }
    case "consent":
      return input.consent ? "" : "Zaznacz zgodę, abyśmy mogli odpowiedzieć na zapytanie.";
  }
}

const FIELDS: InquiryField[] = ["name", "email", "phone", "house", "message", "consent"];

export function validateInquiry(input: Partial<InquiryInput>): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const f of FIELDS) {
    const e = validateField(f, input);
    if (e) errors[f] = e;
  }
  return errors;
}

/** Bezpieczne sprowadzenie nieznanego JSON-a do InquiryInput. */
export function normalizeInquiry(raw: unknown): InquiryInput {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max + 1) : "");
  return {
    name: str(o.name, LIMITS.name).trim(),
    email: str(o.email, LIMITS.email).trim(),
    phone: str(o.phone, LIMITS.phone).trim(),
    house: str(o.house, 2).trim(),
    message: str(o.message, LIMITS.message).trim(),
    consent: o.consent === true,
    consentMarketing: o.consentMarketing === true,
    website: str(o.website, 200),
    elapsedMs: typeof o.elapsedMs === "number" && Number.isFinite(o.elapsedMs) ? o.elapsedMs : 0,
  };
}

export function inquirySummary(i: Pick<InquiryInput, "name" | "email" | "phone" | "house" | "message">): string {
  return [
    `Imię: ${i.name}`,
    `E-mail: ${i.email}`,
    i.phone ? `Telefon: ${i.phone}` : null,
    `Dotyczy: ${i.house ? `Dom nr ${i.house}` : "pytanie ogólne o inwestycję"}`,
    i.message ? `Wiadomość:\n${i.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export type InquiryResponse =
  | { ok: true }
  | { ok: false; code: "invalid"; errors: InquiryErrors }
  | { ok: false; code: "not_configured" | "too_fast" | "rate_limited" | "forbidden" | "send_failed" | "bad_request"; message: string };
