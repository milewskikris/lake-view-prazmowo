import Image from "next/image";
import { images } from "@/content/media";
import { contact, investment, seller } from "@/content/site.config";
import { WaterCanvas } from "./water-canvas";
import { LogoMark } from "./logo";

const Arrow = ({ dir = "→" }: { dir?: string }) => (
  <span className="arrow" aria-hidden="true">
    {dir}
  </span>
);

export function Todo({ children }: { children: React.ReactNode }) {
  return <span className="todo">{children}</span>;
}

/* =========================== 1. HERO =========================== */
export function Hero() {
  return (
    <section aria-labelledby="hero-h" className="relative flex min-h-[min(92svh,900px)] items-end overflow-hidden bg-smola text-jasny">
      <Image
        src={images.wizualizacja}
        alt="Wizualizacja domu typu 1a od strony ogrodu: ciemne drewniane deskowanie, wysokie przeszklenie salonu, taras z leżakami i wanną ogrodową wśród zieleni"
        fill
        preload
        quality={85}
        sizes="100vw"
        placeholder="blur"
        className="animate-settle object-cover object-[62%_40%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_26_24/0.55)_0%,rgb(28_26_24/0)_22%,rgb(28_26_24/0)_42%,rgb(28_26_24/0.82)_100%)]"
      />
      <p className="absolute top-[calc(64px+env(safe-area-inset-top,0px)+14px)] right-[max(16px,env(safe-area-inset-right,0px))] z-10 max-w-[46%] text-right font-mono text-[0.68rem] tracking-[0.08em] text-jasny/80 md:right-8">
        Wizualizacja · dom typu 1a · widok od strony ogrodu
      </p>
      <div className="relative z-10 w-full pt-[124px] pb-[clamp(40px,7vh,72px)] md:pb-28">
        <div className="wrap grid items-end gap-7 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <span className="eyebrow mb-4 block animate-rise text-jasny/85!">Lake View Prażmowo · 16 domów nad Jeziorem Jagodnym</span>
            <h1 id="hero-h" className="max-w-[12ch] animate-rise text-display [animation-delay:150ms]">
              Twoje miejsce. Twój rytm. Mazury.
            </h1>
          </div>
          <div className="grid animate-rise gap-5 [animation-delay:350ms]">
            <p className="max-w-[32em] text-jasny/90">
              Poznaj kameralną inwestycję 16 domów jednorodzinnych w Prażmowie. Bliskość jeziora, wspólny dostęp do linii brzegowej i przestrzeń do życia w rytmie natury.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#inwestycja" className="btn btn-light">
                Poznaj inwestycję <Arrow />
              </a>
              <a href="#domy" className="text-link">
                Sprawdź dostępne domy
              </a>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#inwestycja"
        aria-label="Przewiń do opisu inwestycji"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-jasny/70 uppercase no-underline md:flex"
      >
        <span>Przewiń</span>
        <i aria-hidden="true" className="scroll-cue-line block h-[34px] w-px bg-gradient-to-b from-jasny/80 to-transparent" />
      </a>
    </section>
  );
}

/* =========================== 2. IDEA =========================== */
export function Idea() {
  return (
    <section id="inwestycja" aria-labelledby="idea-h" className="band">
      <div className="wrap grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-start md:gap-16">
        <div aria-hidden="true" className="flex items-start gap-[0.08em] font-display text-[clamp(9rem,26vw,22rem)] leading-[0.8] tracking-[-0.04em] text-smola">
          16
          <small className="mt-[1.3em] max-w-[9em] font-mono text-xs leading-normal tracking-[0.14em] text-ink-2 uppercase">domów jednorodzinnych w jednej inwestycji</small>
        </div>
        <div className="grid gap-6 md:pt-7">
          <span className="eyebrow">Idea inwestycji</span>
          <h2 id="idea-h" className="text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]">
            Nie więcej. Lepiej.
          </h2>
          <p className="lead">
            Lake View Prażmowo to kameralna inwestycja zaprojektowana wokół tego, co naprawdę ważne: bliskości natury, przestrzeni i możliwości korzystania z uroków życia nad jeziorem. Szesnaście domów tworzy miejsce, w którym mazurski krajobraz staje się częścią codzienności.
          </p>
          <p className="max-w-[34em]">
            Tylko szesnaście budynków na całym terenie. Od strony Jeziora Jagodnego plan zagospodarowania przewiduje teren przy jeziorze z plażą dostępną dla mieszkańców osiedla.
          </p>
        </div>
        <figure className="mt-2 grid gap-2.5 md:col-start-2 md:-mt-20">
          <Image
            src={images.detalElewacja}
            alt="Detal elewacji domu typu 1a: pionowe i ukośne ciemne deskowanie szczytu, przeszklenie w narożniku"
            sizes="(min-width: 768px) 55vw, 100vw"
            placeholder="blur"
            className="aspect-[16/10] w-full object-cover object-[50%_35%]"
          />
          <figcaption className="figcap">Detal elewacji · wizualizacja domu typu 1a</figcaption>
        </figure>
        <div className="grid max-w-[28em] gap-2.5 border-t border-kreska pt-4 md:col-start-1 md:row-start-2 md:self-end">
          <span className="eyebrow">Z planu zagospodarowania</span>
          <p className="note">Rys. A-01 · PZT · 10.2026. Dojazd istniejącym zjazdem z drogi wojewódzkiej nr 643. Teren przy jeziorze w południowo-wschodniej części inwestycji.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================== 3. ATUTY =========================== */
const FEATURES = [
  {
    title: "16 domów",
    text: "Kameralny charakter inwestycji i ograniczona liczba budynków.",
    icon: (
      <>
        <path d="M4 22 12 15l8 7v14H4z" />
        <path d="M24 22l8-7 8 7v14H24z" />
        <path d="M2 40h40" />
      </>
    ),
  },
  {
    title: "Bliskość jeziora",
    text: "Wspólny dostęp mieszkańców do linii brzegowej Jeziora Jagodnego.",
    icon: (
      <>
        <path d="M2 18c5-3 9-3 14 0s9 3 14 0 9-3 12-1" />
        <path d="M2 26c5-3 9-3 14 0s9 3 14 0 9-3 12-1" />
        <path d="M2 34c5-3 9-3 14 0s9 3 14 0 9-3 12-1" />
      </>
    ),
  },
  {
    title: "Pomost dla każdego domu",
    text: "Dostęp do pomostu przypisany do każdego domu, zgodnie z warunkami inwestycji.",
    icon: (
      <>
        <path d="M4 20h30M4 24h30" />
        <path d="M10 24v12M22 24v12M32 24v12" />
        <path d="M2 36c4-2 7-2 10 0s7 2 10 0 7-2 10 0 6 2 10 0" />
      </>
    ),
  },
  {
    title: "Prywatne miejsce postojowe",
    text: "Jedno miejsce postojowe przypisane do każdego domu.",
    icon: (
      <>
        <rect x="6" y="6" width="32" height="32" />
        <path d="M17 31V13h7a5 5 0 0 1 0 10h-7" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section id="atuty" aria-labelledby="atuty-h" className="band on-dark bg-smola text-jasny">
      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,64px)] grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-12">
          <span className="eyebrow">Najważniejsze atuty</span>
          <h2 id="atuty-h" className="text-h2">
            Cztery rzeczy, które definiują to miejsce.
          </h2>
        </div>
        <ul className="grid border-t border-jasny/20 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <li
              key={f.title}
              className={`grid content-start gap-3.5 border-b border-jasny/20 py-8 pr-6 lg:border-b-0 lg:py-10 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <svg viewBox="0 0 44 44" aria-hidden="true" className="size-11 fill-none stroke-jasny stroke-[1.2]">
                {f.icon}
              </svg>
              <h3 className="text-[1.65rem] leading-tight">{f.title}</h3>
              <p className="max-w-[26em] text-sm text-jasny-2">{f.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <p className="note">Szczegółowe zasady korzystania z pomostów i linii brzegowej przekażemy wraz z ofertą.</p>
          <a href="#domy" className="text-link">
            Zobacz dostępne domy <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================== 5. LOKALIZACJA =========================== */
export function Location() {
  const mapHref = investment.coordinates
    ? `https://www.openstreetmap.org/?mlat=${investment.coordinates.lat}&mlon=${investment.coordinates.lng}#map=15/${investment.coordinates.lat}/${investment.coordinates.lng}`
    : "https://www.openstreetmap.org/search?query=Pra%C5%BCmowo%2C%20gmina%20Ryn";
  return (
    <section id="lokalizacja" aria-labelledby="loc-h" className="band pt-0!">
      <div className="wrap grid gap-10 md:grid-cols-2 md:items-start md:gap-[72px]">
        <div className="grid gap-6">
          <span className="eyebrow">Lokalizacja</span>
          <h2 id="loc-h" className="text-h2">
            Mazury zaczynają się tutaj.
          </h2>
          <p className="lead">
            Lake View Prażmowo to propozycja dla tych, którzy chcą mieć naturę bliżej siebie. Jezioro, mazurski krajobraz i kameralny charakter inwestycji tworzą przestrzeń sprzyjającą odpoczynkowi.
          </p>
          <dl className="grid border-t border-kreska">
            {[
              ["Miejscowość", "Prażmowo, gmina Ryn, województwo warmińsko-mazurskie"],
              ["Jezioro", "Jezioro Jagodne, przy południowo-wschodniej granicy inwestycji"],
              ["Dojazd", "Istniejący zjazd z drogi wojewódzkiej nr 643, dalej wewnętrzny ciąg pieszo-jezdny"],
            ].map(([dt, dd]) => (
              <div key={dt} className="grid grid-cols-[9em_minmax(0,1fr)] gap-4 border-b border-kreska py-3.5">
                <dt className="pt-0.5 font-mono text-xs tracking-[0.1em] text-ink-2 uppercase">{dt}</dt>
                <dd className="text-sm">{dd}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[9em_minmax(0,1fr)] gap-4 border-b border-kreska py-3.5">
              <dt className="pt-0.5 font-mono text-xs tracking-[0.1em] text-ink-2 uppercase">W okolicy</dt>
              <dd className="text-sm">
                <Todo>Miejscowości, mariny i atrakcje regionu – do uzupełnienia zweryfikowanymi danymi</Todo>
              </dd>
            </div>
          </dl>
          <p className="note">Dane wg planu zagospodarowania terenu (rys. A-01). Odległości do miejscowości i atrakcji podamy po ich weryfikacji.</p>
        </div>
        <div className="grid gap-3.5 border border-kreska bg-papier p-[clamp(16px,2.5vw,28px)]">
          <svg viewBox="0 0 400 300" role="img" aria-labelledby="locmap-t" className="h-auto w-full">
            <title id="locmap-t">Schemat położenia inwestycji między drogą wojewódzką nr 643 a Jeziorem Jagodnym</title>
            <rect width="400" height="300" fill="#f7f6f2" />
            <path d="M250 300 C 270 250 300 225 340 205 C 370 190 400 185 400 185 L400 300Z" fill="#22303a" opacity=".9" />
            <path d="M262 300 C 282 256 310 233 346 214" fill="none" stroke="#ecebe3" strokeWidth=".8" opacity=".5" />
            <path d="M-10 128 L 250 -10" stroke="#c9c5ba" strokeWidth="14" fill="none" />
            <path d="M-10 128 L 250 -10" stroke="#55534c" strokeWidth="1" strokeDasharray="6 6" fill="none" />
            <polygon points="60,150 180,80 230,130 200,160 270,225 235,245 90,170" fill="#4f5f4c" opacity=".9" />
            <circle cx="250" cy="236" r="5" fill="#9e5537" />
            <text x="20" y="96" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#55534c" transform="rotate(-28 20 96)">
              droga wojewódzka nr 643
            </text>
            <text x="104" y="140" fontFamily="Libre Caslon Display, Georgia, serif" fontSize="15" fill="#f7f6f2">
              Lake View
            </text>
            <text x="312" y="262" fontFamily="Libre Caslon Display, Georgia, serif" fontSize="15" fill="#ecebe3" fontStyle="italic">
              Jez. Jagodne
            </text>
            <text x="176" y="262" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#9e5537">
              teren przy jeziorze
            </text>
          </svg>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5">
            <p className="note">
              Schemat poglądowy, bez skali.{" "}
              {investment.coordinates ? "Link prowadzi do dokładnej lokalizacji inwestycji." : "Dokładny punkt na mapie po podaniu współrzędnych inwestycji."}
            </p>
            <a className="text-link" href={mapHref} target="_blank" rel="noopener noreferrer">
              Odkryj lokalizację na mapie <Arrow dir="↗" />
              <span className="sr-only">(otwiera się w nowej karcie)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== 6. ŻYCIE NAD JEZIOREM =========================== */
function PhotoSlot({ label, icon, className }: { label: string; icon: React.ReactNode; className: string }) {
  return (
    <figure className={`grid min-h-[180px] place-content-center gap-2 border border-dashed border-jasny/30 p-4 text-center ${className}`}>
      <svg viewBox="0 0 60 30" aria-hidden="true" className="mx-auto w-12 fill-none stroke-jasny/55 stroke-[1.1]">
        {icon}
      </svg>
      <figcaption className="max-w-[20em] font-mono text-[0.68rem] tracking-[0.06em] text-jasny/75">{label}</figcaption>
    </figure>
  );
}

function Shot({ src, alt, caption, className, sizes, position }: { src: (typeof images)[keyof typeof images]; alt: string; caption: string; className: string; sizes: string; position?: string }) {
  return (
    <figure className={`group relative min-h-[180px] overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.035]" style={position ? { objectPosition: position } : undefined} />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(20_26_30/0.75)] to-transparent px-3 pt-7 pb-2.5 font-mono text-[0.66rem] tracking-[0.05em] text-jasny/90">
        {caption}
      </figcaption>
    </figure>
  );
}

export function LakeLife() {
  return (
    <section id="zycie" aria-labelledby="lake-h" className="band on-dark relative overflow-hidden bg-ton text-jasny">
      <WaterCanvas />
      <div className="wrap relative grid gap-[clamp(32px,5vw,64px)]">
        <div className="grid max-w-[44rem] gap-5">
          <span className="eyebrow">Życie nad jeziorem</span>
          <h2 id="lake-h" className="text-[clamp(2.6rem,7vw,5.8rem)] leading-[1.02]">
            Zwolnij. Jesteś na Mazurach.
          </h2>
          <p className="max-w-[30em] text-[clamp(1.05rem,1.6vw,1.3rem)] text-jasny/85">
            Miejsce, do którego wracasz po spokój. Gdzie dzień może zacząć się nad wodą, a wieczór kończy się wśród mazurskiej natury.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3.5 md:auto-rows-[clamp(110px,11vw,170px)] md:grid-cols-12">
          <Shot
            src={images.wizualizacja}
            alt="Wizualizacja: dom typu 1a w ogrodzie, popołudniowe światło na tarasie"
            caption="Popołudnie w ogrodzie · wizualizacja"
            sizes="(min-width: 768px) 58vw, 100vw"
            position="70% 50%"
            className="col-span-2 aspect-[4/3] md:col-span-7 md:row-span-3 md:aspect-auto"
          />
          <PhotoSlot
            label="Miejsce na fotografię: poranna tafla Jeziora Jagodnego"
            className="md:col-span-5 md:row-span-2"
            icon={
              <>
                <path d="M2 12c6-4 10-4 16 0s10 4 16 0 10-4 16 0 6 3 8 2" />
                <path d="M2 20c6-4 10-4 16 0s10 4 16 0 10-4 16 0 6 3 8 2" />
              </>
            }
          />
          <Shot src={images.detalLezaki} alt="Wizualizacja: leżaki na tarasie przed przeszklonym salonem" caption="Światło we wnętrzu · wizualizacja" sizes="(min-width: 768px) 42vw, 50vw" className="md:col-span-5 md:row-span-2" />
          <Shot src={images.detalTaras} alt="Wizualizacja: drewniana wanna ogrodowa na tarasie przy domu" caption="Taras z jacuzzi ogrodowym · wizualizacja" sizes="(min-width: 768px) 34vw, 100vw" className="col-span-2 md:col-span-4 md:row-span-2" />
          <PhotoSlot label="Miejsce na fotografię: pomost" className="md:col-span-3" icon={<path d="M2 14h40M2 18h40M10 18v10M24 18v10M38 18v10" />} />
          <PhotoSlot label="Miejsce na fotografię: mazurska zieleń" className="md:col-span-3" icon={<path d="M30 28V6M30 10l-8 8M30 14l8 6M20 28c3-4 7-6 10-6s7 2 10 6" />} />
        </div>
      </div>
    </section>
  );
}

/* =========================== 9. KONTAKT – część informacyjna =========================== */
export function ContactInfo() {
  return (
    <div className="grid content-start gap-6">
      <span className="eyebrow">Kontakt</span>
      <h2 id="kontakt-h" className="text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.02]">
        Poznaj Lake View Prażmowo bliżej.
      </h2>
      <p className="lead">Porozmawiajmy o domach, dostępności i możliwościach zakupu. Poznaj szczegóły inwestycji i wybierz miejsce dla siebie.</p>
      <div className="grid gap-1 border-t border-jasny/20 pt-5">
        <span className="eyebrow mb-1">Biuro sprzedaży</span>
        {contact.phone ? (
          <a className="w-fit font-display text-2xl no-underline hover:underline" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
            {contact.phone}
          </a>
        ) : (
          <p>
            <Todo>Telefon – do uzupełnienia</Todo>
          </p>
        )}
        {contact.email ? (
          <a className="w-fit no-underline hover:underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        ) : (
          <p>
            <Todo>E-mail – do uzupełnienia</Todo>
          </p>
        )}
        {contact.officeNote && <p className="text-sm text-jasny-2">{contact.officeNote}</p>}
      </div>
    </div>
  );
}

/* =========================== 10. STOPKA =========================== */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-len pt-16 pb-[calc(40px+env(safe-area-inset-bottom,0px))] text-sm">
      <div className="wrap">
        <div className="grid gap-9 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="grid content-start gap-3.5">
            <a href="#start" className="flex w-fit items-center gap-3 no-underline" aria-label="Lake View Prażmowo – początek strony">
              <LogoMark className="size-[30px]" />
              <span className="font-display text-[1.2rem] leading-none">
                Lake View
                <small className="mt-[3px] block font-mono text-[0.62rem] tracking-[0.2em] uppercase opacity-75">Prażmowo · Mazury</small>
              </span>
            </a>
            <p className="max-w-[26em] text-ink-2">Kameralna inwestycja 16 domów jednorodzinnych nad Jeziorem Jagodnym w Prażmowie, gmina Ryn.</p>
          </div>
          <nav aria-label="Stopka – sekcje">
            <h2 className="mb-3 font-mono text-xs font-normal tracking-[0.12em] text-ink-2 uppercase">Strona</h2>
            <ul className="grid gap-0.5">
              {[
                ["#inwestycja", "Inwestycja"],
                ["#architektura", "Architektura"],
                ["#lokalizacja", "Lokalizacja"],
                ["#domy", "Dostępne domy"],
                ["#galeria", "Galeria"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-block py-1.5 no-underline hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-3 font-mono text-xs font-normal tracking-[0.12em] text-ink-2 uppercase">Kontakt</h2>
            <ul className="grid gap-0.5">
              <li className="py-1.5">{contact.phone ? <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a> : <Todo>Telefon – do uzupełnienia</Todo>}</li>
              <li className="py-1.5">{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <Todo>E-mail – do uzupełnienia</Todo>}</li>
              <li>
                <a href="#kontakt" className="inline-block py-1.5 no-underline hover:underline">
                  Formularz zapytania
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-mono text-xs font-normal tracking-[0.12em] text-ink-2 uppercase">Sprzedający</h2>
            <ul className="grid gap-0.5">
              <li className="py-1.5">{seller.name ?? <Todo>Nazwa podmiotu</Todo>}</li>
              <li className="py-1.5">{seller.address ?? <Todo>Adres siedziby</Todo>}</li>
              <li className="py-1.5">{seller.registry ?? <Todo>NIP · KRS / CEIDG</Todo>}</li>
              <li>
                <a href="/polityka-prywatnosci" className="inline-block py-1.5 underline">
                  Polityka prywatności
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 grid gap-2 border-t border-kreska pt-5 text-xs leading-relaxed text-ink-2">
          <p>
            Informacje i materiały prezentowane na stronie nie stanowią oferty w rozumieniu art. 66 § 1 Kodeksu cywilnego. Wizualizacje mają charakter poglądowy. Wiążące są dokumenty przekazywane w procesie sprzedaży.
          </p>
          <p>
            Wizualizacje i rysunki: Studio Form Architektonicznych PANTEL, Olsztyn. © {year} Lake View Prażmowo.
          </p>
        </div>
      </div>
    </footer>
  );
}
