import Link from "next/link";

export default function NotFound() {
  return (
    <main id="tresc" className="grid min-h-dvh place-items-center bg-smola text-jasny">
      <div className="wrap grid max-w-[640px] gap-5 on-dark">
        <span className="eyebrow">Błąd 404</span>
        <h1 className="display h-l">Tej strony nie ma nad jeziorem.</h1>
        <p className="lead">Adres mógł się zmienić albo zawierać literówkę.</p>
        <Link href="/" className="btn btn-light w-fit">
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
