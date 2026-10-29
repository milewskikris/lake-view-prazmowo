"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { houses } from "@/content/site.config";
import { LIMITS, inquirySummary, validateField, validateInquiry, type InquiryErrors, type InquiryField, type InquiryInput, type InquiryResponse } from "@/lib/inquiry";
import { useInquiry } from "./providers";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; email: string }
  | { kind: "invalid" }
  | { kind: "not_configured"; summary: string; message: string }
  | { kind: "error"; message: string };

const NOT_CONFIGURED = "Formularz nie jest jeszcze połączony z usługą wysyłki wiadomości, dlatego zapytanie nie zostało wysłane.";

const empty = { name: "", email: "", phone: "", message: "", consent: false, consentMarketing: false, website: "" };

export function ContactForm() {
  const { house, setHouse, messageHint, focusToken } = useInquiry();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState<"" | "ok" | "select">("");
  const shownAt = useRef(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLPreElement>(null);

  // null = jeszcze nie wiadomo, false = brak skonfigurowanej usługi wysyłki
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    shownAt.current = Date.now();
    const ctrl = new AbortController();
    fetch("/api/inquiry", { signal: ctrl.signal, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { configured?: boolean } | null) => setConfigured(d?.configured ?? null))
      .catch(() => undefined);
    return () => ctrl.abort();
  }, []);

  // Zapytanie z karty domu / typu domu: ustaw podpowiedź i ustaw fokus na pierwszym polu.
  useEffect(() => {
    if (!focusToken) return;
    if (messageHint) setValues((v) => (v.message ? v : { ...v, message: messageHint }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), reduce ? 0 : 700);
    return () => window.clearTimeout(t);
  }, [focusToken, messageHint]);

  const input = (): InquiryInput => ({ ...values, house, elapsedMs: Date.now() - shownAt.current });

  const set = <K extends keyof typeof empty>(k: K, v: (typeof empty)[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as InquiryField]) {
      setErrors((e) => ({ ...e, [k]: validateField(k as InquiryField, { ...values, [k]: v }) || undefined }));
    }
  };
  const blur = (f: InquiryField) => {
    const v = values[f as keyof typeof empty];
    if (v === "" || v === false) return;
    setErrors((e) => ({ ...e, [f]: validateField(f, { ...values, house }) || undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const data = input();
    const errs = validateInquiry(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "invalid" });
      const first = (["name", "email", "phone", "message", "consent"] as const).find((f) => errs[f]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setCopied("");
    if (configured === false) {
      setStatus({ kind: "not_configured", summary: inquirySummary(data), message: NOT_CONFIGURED });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => null)) as InquiryResponse | null;
      if (res.ok && body?.ok) {
        setStatus({ kind: "success", email: data.email });
        setValues(empty);
        setHouse("");
        shownAt.current = Date.now();
        return;
      }
      if (body && !body.ok && body.code === "invalid") {
        setErrors(body.errors);
        setStatus({ kind: "invalid" });
        return;
      }
      if (body && !body.ok && body.code === "not_configured") {
        setStatus({ kind: "not_configured", summary: inquirySummary(data), message: body.message });
        return;
      }
      setStatus({ kind: "error", message: body && !body.ok && "message" in body ? body.message : "Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę." });
    } catch {
      setStatus({ kind: "error", message: "Brak połączenia z serwerem. Sprawdź połączenie z internetem i spróbuj ponownie. Twoje dane pozostały w formularzu." });
    }
  }

  async function copySummary(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
    } catch {
      const el = summaryRef.current;
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = window.getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
      setCopied("select");
    }
  }

  const err = (f: InquiryField) =>
    errors[f] ? (
      <span id={`f-${f}-err`} className="text-xs text-cegla-jasna">
        {errors[f]}
      </span>
    ) : null;
  const aria = (f: InquiryField) => ({ "aria-invalid": errors[f] ? true : undefined, "aria-describedby": errors[f] ? `f-${f}-err` : undefined });

  return (
    <form className="grid gap-[22px]" noValidate onSubmit={onSubmit} aria-labelledby="kontakt-h">
      <div className="grid gap-[22px] sm:grid-cols-2">
        <div className="grid min-w-0 gap-2">
          <label htmlFor="f-name" className="field-label">
            Imię
          </label>
          <input ref={nameRef} id="f-name" name="name" className="field-input" type="text" autoComplete="given-name" required maxLength={LIMITS.name} value={values.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} {...aria("name")} />
          {err("name")}
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="f-email" className="field-label">
            Adres e-mail
          </label>
          <input id="f-email" name="email" className="field-input" type="email" autoComplete="email" required maxLength={LIMITS.email} value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} {...aria("email")} />
          {err("email")}
        </div>
      </div>
      <div className="grid gap-[22px] sm:grid-cols-2">
        <div className="grid min-w-0 gap-2">
          <label htmlFor="f-phone" className="field-label">
            Telefon <span className="tracking-normal normal-case opacity-80">(opcjonalnie)</span>
          </label>
          <input id="f-phone" name="phone" className="field-input" type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} {...aria("phone")} />
          {err("phone")}
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor="f-house" className="field-label">
            Dom
          </label>
          <select id="f-house" name="house" className="field-input" value={house} onChange={(e) => setHouse(e.target.value)}>
            <option value="">Pytanie ogólne o inwestycję</option>
            {houses
              .slice()
              .sort((a, b) => a.nr - b.nr)
              .map((h) => (
                <option key={h.nr} value={String(h.nr)}>
                  Dom nr {h.nr}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="f-message" className="field-label">
          Wiadomość <span className="tracking-normal normal-case opacity-80">(opcjonalnie)</span>
        </label>
        <textarea id="f-message" name="message" className="field-input min-h-[110px] resize-y" maxLength={LIMITS.message} value={values.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} />
        {err("message")}
      </div>

      {/* Pole-pułapka na boty – ukryte przed ludźmi i czytnikami ekranu */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Strona www</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid grid-cols-[22px_minmax(0,1fr)] gap-3 text-xs leading-relaxed text-jasny-2">
        <input id="f-consent" name="consent" type="checkbox" className="mt-0.5 size-5 accent-cegla" checked={values.consent} onChange={(e) => {
          set("consent", e.target.checked);
          setErrors((er) => ({ ...er, consent: e.target.checked ? undefined : er.consent }));
        }} {...aria("consent")} />
        <label htmlFor="f-consent">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na zapytanie dotyczące inwestycji Lake View Prażmowo. Zgodę mogę wycofać w każdej chwili. Szczegóły w{" "}
          <a href="/polityka-prywatnosci" className="underline" target="_blank" rel="noopener">
            polityce prywatności<span className="sr-only"> (otwiera się w nowej karcie)</span>
          </a>
          .
        </label>
        <span className="col-start-2">{err("consent")}</span>
      </div>
      <div className="grid grid-cols-[22px_minmax(0,1fr)] gap-3 text-xs leading-relaxed text-jasny-2">
        <input id="f-marketing" name="consentMarketing" type="checkbox" className="mt-0.5 size-5 accent-cegla" checked={values.consentMarketing} onChange={(e) => set("consentMarketing", e.target.checked)} />
        <label htmlFor="f-marketing">Chcę otrzymywać informacje o inwestycji drogą elektroniczną (opcjonalnie).</label>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" className="btn btn-light" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Wysyłanie…" : "Zapytaj o inwestycję"} <span className="arrow" aria-hidden="true">→</span>
        </button>
        <p className="note">Pola bez dopisku „opcjonalnie” są wymagane.</p>
      </div>
      {configured === false && (
        <p className="border-l-2 border-st-rezerwacja pl-3 text-sm text-jasny-2">
          Wysyłka zapytań przez formularz zostanie wkrótce uruchomiona. Do tego czasu skontaktuj się bezpośrednio z biurem sprzedaży – po wypełnieniu formularza możesz skopiować treść zapytania.
        </p>
      )}

      <div role="status" aria-live="polite" className="empty:hidden">
        {status.kind === "invalid" && <Msg tone="warn">Uzupełnij zaznaczone pola, aby wysłać zapytanie.</Msg>}
        {status.kind === "success" && (
          <Msg tone="ok">
            <strong>Dziękujemy, zapytanie zostało wysłane.</strong> Odpowiemy na adres {status.email}.
          </Msg>
        )}
        {status.kind === "error" && (
          <Msg tone="warn">
            <strong>Nie udało się wysłać zapytania.</strong> {status.message}
          </Msg>
        )}
        {status.kind === "not_configured" && (
          <Msg tone="warn">
            <strong>Zapytanie nie zostało wysłane.</strong> {status.message} Skontaktuj się bezpośrednio z biurem sprzedaży. Możesz skopiować treść zapytania:
            <pre ref={summaryRef} className="m-0 bg-jasny/5 p-3 font-mono text-xs whitespace-pre-wrap select-all">
              {status.summary}
            </pre>
            <button type="button" className="text-link w-fit" onClick={() => copySummary(status.summary)}>
              {copied === "ok" ? "Skopiowano" : copied === "select" ? "Zaznaczono – skopiuj skrótem klawiszowym" : "Kopiuj treść zapytania"}
            </button>
          </Msg>
        )}
      </div>
    </form>
  );
}

function Msg({ tone, children }: { tone: "ok" | "warn"; children: React.ReactNode }) {
  return <div className={`grid gap-2.5 border px-4.5 py-4 text-sm ${tone === "ok" ? "border-st-dostepny" : "border-st-rezerwacja"}`}>{children}</div>;
}
