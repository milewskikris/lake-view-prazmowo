import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/logo";
import { seller } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Zasady przetwarzania danych osobowych przekazywanych przez formularz kontaktowy strony Lake View Prażmowo.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

const Todo = ({ children }: { children: React.ReactNode }) => <span className="todo">{children}</span>;

export default function PrivacyPolicy() {
  return (
    <>
      <header className="bg-smola pt-[env(safe-area-inset-top,0px)] text-jasny">
        <div className="wrap flex h-16 items-center justify-between">
          <Link href="/" className="no-underline" aria-label="Lake View Prażmowo – strona główna">
            <Wordmark />
          </Link>
          <Link href="/" className="text-link">
            ← Wróć na stronę
          </Link>
        </div>
      </header>
      <main id="tresc" className="band light">
        <article className="wrap grid max-w-[760px] gap-5 [&_h2]:mt-6 [&_h2]:font-sans [&_h2]:text-base [&_h2]:font-semibold [&_p]:max-w-[65ch]">
          <span className="eyebrow">Dokument</span>
          <h1 className="display h-l">Polityka prywatności</h1>
          <p className="note border-l-2 border-cegla pl-3">Szablon do uzupełnienia przez sprzedającego i weryfikacji prawnej przed publikacją strony.</p>

          <h2>Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest {seller.name ?? <Todo>nazwa podmiotu</Todo>}, {seller.address ?? <Todo>adres siedziby</Todo>},{" "}
            {seller.registry ?? <Todo>NIP / KRS</Todo>}.
          </p>

          <h2>Jakie dane zbieramy</h2>
          <p>Przez formularz kontaktowy zbieramy imię, adres e-mail oraz – jeśli je podasz – numer telefonu, numer domu, którego dotyczy zapytanie, i treść wiadomości.</p>

          <h2>Cel i podstawa przetwarzania</h2>
          <p>
            Dane przetwarzamy w celu udzielenia odpowiedzi na zapytanie, na podstawie zgody (art. 6 ust. 1 lit. a RODO), oraz w celu podjęcia działań przed zawarciem umowy na żądanie osoby, której dane dotyczą (art. 6 ust. 1 lit. b RODO). Jeśli
            zaznaczysz zgodę na informacje o inwestycji, przesyłamy je drogą elektroniczną na podstawie tej zgody.
          </p>

          <h2>Okres przechowywania</h2>
          <p>
            <Todo>Okres przechowywania danych – do uzupełnienia</Todo>
          </p>

          <h2>Odbiorcy danych</h2>
          <p>
            Dane mogą być przekazywane dostawcom usług technicznych: hostingu strony (Vercel Inc.) oraz wysyłki wiadomości e-mail (Resend). <Todo>Pozostali odbiorcy – do uzupełnienia</Todo>
          </p>

          <h2>Twoje prawa</h2>
          <p>
            Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu, cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem) oraz
            wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
          </p>

          <h2>Pliki cookies</h2>
          <p>Strona nie używa plików cookies analitycznych ani marketingowych.</p>

          <Link href="/#kontakt" className="btn btn-dark mt-6 w-fit">
            Przejdź do formularza
          </Link>
        </article>
      </main>
    </>
  );
}
