import Image from "next/image";
import type { ReactNode } from "react";
import { images } from "@/content/media";
import { contact, investment, seller } from "@/content/site.config";
import { m2, totals } from "@/content/rooms";
import { LogoMark } from "./logo";
import { WaterCanvas } from "./water-canvas";

export const Arrow = ({ dir = "→" }: { dir?: string }) => (
  <span className="arrow" aria-hidden="true">
    {dir}
  </span>
);

export function Todo({ children }: { children: ReactNode }) {
  return <span className="todo">{children}</span>;
}

/* Ikony liniowe – jedna grubość kreski w całym serwisie */
export function Icon({ name, className = "size-10" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={`fill-none stroke-current stroke-[1.15] ${className}`}>
      {ICONS[name]}
    </svg>
  );
}
const ICONS = {
  houses: (
    <>
      <path d="M4 24 13 16l9 8v16H4z" />
      <path d="M26 24l9-8 9 8v16H26z" />
      <path d="M2 44h44" />
    </>
  ),
  lake: (
    <>
      <path d="M3 20c5-3.5 9-3.5 14 0s9 3.5 14 0 9-3.5 14 0" />
      <path d="M3 28c5-3.5 9-3.5 14 0s9 3.5 14 0 9-3.5 14 0" />
      <path d="M3 36c5-3.5 9-3.5 14 0s9 3.5 14 0 9-3.5 14 0" />
    </>
  ),
  pier: (
    <>
      <path d="M4 22h34M4 26h34" />
      <path d="M10 26v12M21 26v12M32 26v12" />
      <path d="M2 40c4-2 7-2 11 0s7 2 11 0 7-2 11 0 7 2 11 0" />
    </>
  ),
  parking: (
    <>
      <rect x="7" y="7" width="34" height="34" />
      <path d="M19 34V14h7.5a5.5 5.5 0 0 1 0 11H19" />
    </>
  ),
  area: (
    <>
      <path d="M6 42V6h36v36z" />
      <path d="M6 22h14v20M20 6v8M30 22h12" />
    </>
  ),
  garage: (
    <>
      <path d="M4 20 24 6l20 14v22H4z" />
      <path d="M12 42V26h24v16M12 31h24M12 36h24" />
    </>
  ),
  spa: (
    <>
      <path d="M6 26h36v6a10 10 0 0 1-10 10H16A10 10 0 0 1 6 32z" />
      <path d="M17 20c-2-3 2-5 0-9M24 20c-2-3 2-5 0-9M31 20c-2-3 2-5 0-9" />
    </>
  ),
  fireplace: (
    <>
      <path d="M6 42V12h36v30" />
      <path d="M2 12h44M14 42V22h20v20" />
      <path d="M24 38c-4 0-5-3-3-6 1 2 3 1 2-2 3 2 5 5 4 7-.5.7-1.5 1-3 1z" />
    </>
  ),
  pin: (
    <>
      <path d="M24 44s14-13 14-24a14 14 0 0 0-28 0c0 11 14 24 14 24z" />
      <circle cx="24" cy="20" r="5" />
    </>
  ),
} as const;

/* =========================== 1. HERO =========================== */
const HERO_FACTS = [
  { value: "16", label: "domów jednorodzinnych" },
  { value: m2(totals.total), label: "pow. użytkowa domu 1a" },
  { value: "Pomost", label: "dla każdego domu" },
  { value: "Jagodne", label: "wspólna linia brzegowa" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-h" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-smola text-jasny">
      <Image
        src={images.wizualizacja}
        alt="Wizualizacja domu typu 1a od strony ogrodu: ciemne drewniane deskowanie, wysokie przeszklenie salonu, taras z leżakami i wanną ogrodową wśród zieleni"
        fill
        preload
        quality={85}
        sizes="100vw"
        placeholder="blur"
        className="-z-10 animate-settle object-cover object-[60%_45%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_14_13/0.72)_0%,rgb(14_14_13/0.38)_35%,rgb(14_14_13/0.45)_62%,rgb(14_14_13/0.92)_100%)]" />

      <div className="wrap flex flex-1 flex-col items-center justify-center pt-[140px] pb-16 text-center">
        <LogoMark className="mb-8 size-14 animate-rise text-mosiadz" />
        <p className="eyebrow animate-rise text-jasny! [animation-delay:120ms] before:hidden">Prażmowo · Jezioro Jagodne · Mazury</p>
        <h1 id="hero-h" className="display mt-7 max-w-[18ch] animate-rise text-[clamp(2.3rem,6.6vw,5.6rem)] leading-[1.08] [animation-delay:240ms]">
          Twoje miejsce. Twój rytm. <span className="serif-accent text-mosiadz">Mazury.</span>
        </h1>
        <p className="mt-8 max-w-[40em] animate-rise text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed font-light text-jasny/85 [animation-delay:380ms]">
          Kameralna inwestycja 16 domów jednorodzinnych w Prażmowie. Bliskość jeziora, wspólny dostęp do linii brzegowej i przestrzeń do życia w rytmie natury.
        </p>
        <div className="mt-11 flex animate-rise flex-wrap justify-center gap-4 [animation-delay:500ms]">
          <a href="#inwestycja" className="btn btn-light">
            Poznaj inwestycję <Arrow />
          </a>
          <a href="#domy" className="btn btn-ghost">
            Sprawdź dostępne domy
          </a>
        </div>
      </div>

      <a
        href="#inwestycja"
        aria-label="Przewiń do opisu inwestycji"
        className="absolute right-[max(20px,env(safe-area-inset-right,0px))] bottom-[clamp(140px,16vh,170px)] hidden flex-col items-center gap-3 text-[0.62rem] font-medium tracking-[0.3em] text-jasny/70 uppercase no-underline [writing-mode:vertical-rl] md:right-12 xl:flex"
      >
        Przewiń w dół
        <i aria-hidden="true" className="scroll-cue-line block h-14 w-px bg-mosiadz" />
      </a>

      <div className="border-t border-jasny/15 bg-smola/40 backdrop-blur-sm">
        <ul className="wrap grid grid-cols-2 md:grid-cols-4">
          {HERO_FACTS.map((f, i) => (
            <li key={f.label} className="border-jasny/15 py-5 md:py-7 [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-5 [&:nth-child(n+3)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8 md:[&:nth-child(n+3)]:border-t-0">
              <span className="block text-[clamp(1.15rem,1.8vw,1.6rem)] font-light tracking-[0.06em] uppercase">{f.value}</span>
              <span className="mt-1 block text-[0.64rem] font-medium tracking-[0.24em] text-jasny-2 uppercase">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================== 2. IDEA =========================== */
export function Vision() {
  return (
    <section id="inwestycja" aria-labelledby="idea-h" className="band bg-smola">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6" data-reveal>
            <span className="eyebrow">Idea inwestycji</span>
            <h2 id="idea-h" className="display h-xl mt-8">
              Nie więcej. <br />
              <span className="serif-accent text-[1.12em] text-mosiadz">Lepiej.</span>
            </h2>
          </div>
          <div className="grid content-end gap-7 lg:col-span-5 lg:col-start-8" data-reveal>
            <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-relaxed font-light">
              Lake View Prażmowo to kameralna inwestycja zaprojektowana wokół tego, co naprawdę ważne: bliskości natury, przestrzeni i możliwości korzystania z uroków życia nad jeziorem.
            </p>
            <p className="lead">
              Szesnaście domów tworzy miejsce, w którym mazurski krajobraz staje się częścią codzienności. Od strony Jeziora Jagodnego plan zagospodarowania przewiduje teren przy jeziorze z plażą dostępną dla mieszkańców osiedla.
            </p>
            <a href="#dom" className="text-link w-fit text-mosiadz">
              Poznaj dom typu 1a <Arrow />
            </a>
          </div>
        </div>

        <div className="mt-[clamp(72px,9vw,140px)] grid gap-6 md:grid-cols-12 md:gap-8">
          <figure className="md:col-span-5" data-reveal="img">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={images.detalPrzeszklenie} alt="Wizualizacja: dwukondygnacyjne przeszklenie szczytu salonu domu typu 1a" fill sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" className="object-cover object-[50%_40%]" />
            </div>
            <figcaption className="figcap mt-4">Przeszklony szczyt salonu</figcaption>
          </figure>
          <div className="grid content-between gap-10 md:col-span-6 md:col-start-7 md:pt-[22%]">
            <figure data-reveal="img">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image src={images.detalElewacja} alt="Wizualizacja: detal ciemnego, pionowego i ukośnego deskowania szczytu" fill sizes="(min-width: 768px) 48vw, 100vw" placeholder="blur" className="object-cover object-[50%_35%]" />
              </div>
              <figcaption className="figcap mt-4">Smołowane deskowanie i cegła</figcaption>
            </figure>
            <blockquote className="border-l border-mosiadz/60 pl-6" data-reveal>
              <p className="serif-accent text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug">Mazurski krajobraz jako część codzienności, nie widok zza płotu.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== 3. DOM TYPU 1A – blok projektu =========================== */
const HOUSE_FACTS = [
  { icon: "area" as const, value: m2(totals.total), label: "Powierzchnia użytkowa" },
  { icon: "fireplace" as const, value: "Salon z kominkiem", label: "+ 4 pokoje" },
  { icon: "spa" as const, value: "Sauna i jacuzzi", label: "Strefa spa w domu" },
  { icon: "garage" as const, value: "Garaż", label: m2(totals.garage) },
];

export function FeaturedHouse() {
  return (
    <section id="dom" aria-labelledby="dom-h" className="relative bg-grafit">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[62vw] lg:col-span-7 lg:min-h-[86vh]" data-reveal="img">
          <Image src={images.wizualizacja} alt="Wizualizacja domu typu 1a w ogrodzie" fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" className="object-cover object-[64%_50%]" />
          <span className="absolute top-6 left-[max(20px,env(safe-area-inset-left,0px))] bg-smola/70 px-3 py-2 text-[0.62rem] font-medium tracking-[0.24em] uppercase backdrop-blur-sm md:left-12">
            Wizualizacja
          </span>
        </div>
        <div className="flex flex-col justify-center px-[max(20px,env(safe-area-inset-left,0px))] py-[clamp(64px,8vw,120px)] md:px-12 lg:col-span-5 xl:px-20">
          <div data-reveal>
            <span className="eyebrow">Projekt domu</span>
            <h2 id="dom-h" className="display h-xl mt-7">
              Dom <span className="serif-accent text-mosiadz">typu</span> 1a
            </h2>
            <p className="mt-5 flex items-center gap-2.5 text-[0.72rem] font-medium tracking-[0.24em] text-jasny-2 uppercase">
              <Icon name="pin" className="size-5 text-mosiadz" /> {investment.locality}, gmina {investment.commune}
            </p>
            <p className="lead mt-7">
              Dwie dwuspadowe bryły połączone łącznikiem. Ceglane ściany zestawione z ciemnym drewnem, salon otwarty na ogród wysokim przeszkleniem szczytu.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-jasny/12 pt-10" data-reveal>
            {HOUSE_FACTS.map((f) => (
              <li key={f.value} className="grid gap-3">
                <Icon name={f.icon} className="size-11 text-mosiadz" />
                <span className="text-[1.05rem] font-normal tracking-[0.04em]">{f.value}</span>
                <span className="text-[0.64rem] font-medium tracking-[0.22em] text-jasny-2 uppercase">{f.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4" data-reveal>
            <a href="#architektura" className="btn btn-accent">
              Sprawdź rzuty <Arrow />
            </a>
            <a href="#galeria" className="btn btn-ghost">
              Galeria
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== 4. ATUTY – blok na fotografii =========================== */
const FEATURES = [
  { icon: "houses" as const, title: "16 domów", text: "Kameralny charakter inwestycji i ograniczona liczba budynków." },
  { icon: "lake" as const, title: "Bliskość jeziora", text: "Wspólny dostęp mieszkańców do linii brzegowej Jeziora Jagodnego." },
  { icon: "pier" as const, title: "Pomost dla każdego domu", text: "Dostęp do pomostu przypisany do każdego domu, zgodnie z warunkami inwestycji." },
  { icon: "parking" as const, title: "Prywatne miejsce postojowe", text: "Jedno miejsce postojowe przypisane do każdego domu." },
];

export function Features() {
  return (
    <section id="atuty" aria-labelledby="atuty-h" className="relative isolate overflow-hidden py-[clamp(96px,13vw,200px)] text-jasny">
      <Image src={images.detalTaras} alt="" fill sizes="100vw" placeholder="blur" className="-z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-smola/82" />
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <span className="eyebrow before:hidden">Najważniejsze atuty</span>
          <h2 id="atuty-h" className="display h-l mt-7">
            Cztery rzeczy, <span className="serif-accent text-mosiadz">które definiują</span> to miejsce
          </h2>
        </div>
        <ul className="mt-[clamp(56px,7vw,100px)] grid gap-px bg-jasny/12 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {FEATURES.map((f) => (
            <li key={f.title} className="grid content-start justify-items-center gap-5 bg-smola/60 px-6 py-12 text-center backdrop-blur-[2px]">
              <Icon name={f.icon} className="size-14 text-mosiadz" />
              <h3 className="text-[0.95rem] font-normal tracking-[0.2em] uppercase">{f.title}</h3>
              <p className="max-w-[24em] text-sm leading-relaxed font-light text-jasny/75">{f.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-xs tracking-[0.04em] text-jasny/65">Szczegółowe zasady korzystania z pomostów i linii brzegowej przekażemy wraz z ofertą.</p>
      </div>
    </section>
  );
}

/* =========================== 6. LOKALIZACJA =========================== */
export function Location() {
  const mapHref = investment.coordinates
    ? `https://www.openstreetmap.org/?mlat=${investment.coordinates.lat}&mlon=${investment.coordinates.lng}#map=15/${investment.coordinates.lat}/${investment.coordinates.lng}`
    : "https://www.openstreetmap.org/search?query=Pra%C5%BCmowo%2C%20gmina%20Ryn";
  const facts: [string, ReactNode][] = [
    ["Miejscowość", "Prażmowo, gmina Ryn, woj. warmińsko-mazurskie"],
    ["Jezioro", "Jezioro Jagodne, przy południowo-wschodniej granicy inwestycji"],
    ["Dojazd", "Istniejący zjazd z drogi wojewódzkiej nr 643"],
    ["W okolicy", <Todo key="t">Miejscowości, mariny i atrakcje – do uzupełnienia zweryfikowanymi danymi</Todo>],
  ];
  return (
    <section id="lokalizacja" aria-labelledby="loc-h" className="band relative overflow-hidden bg-ton">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-reveal>
          <span className="eyebrow">Lokalizacja</span>
          <h2 id="loc-h" className="display h-xl mt-8">
            Mazury <br />
            <span className="serif-accent text-mosiadz">zaczynają się</span> tutaj
          </h2>
          <p className="lead mt-8">
            Lake View Prażmowo to propozycja dla tych, którzy chcą mieć naturę bliżej siebie. Jezioro, mazurski krajobraz i kameralny charakter inwestycji tworzą przestrzeń sprzyjającą odpoczynkowi.
          </p>
          <dl className="mt-12 grid border-t border-jasny/12">
            {facts.map(([dt, dd]) => (
              <div key={dt} className="grid grid-cols-[8.5em_minmax(0,1fr)] gap-5 border-b border-jasny/12 py-4">
                <dt className="pt-0.5 text-[0.64rem] font-medium tracking-[0.22em] text-mosiadz uppercase">{dt}</dt>
                <dd className="text-[0.95rem] font-light">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid content-center gap-5 lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="border border-jasny/12 bg-smola/40 p-[clamp(16px,2.5vw,32px)]">
            <svg viewBox="0 0 400 300" role="img" aria-labelledby="locmap-t" className="h-auto w-full">
              <title id="locmap-t">Schemat położenia inwestycji między drogą wojewódzką nr 643 a Jeziorem Jagodnym</title>
              <defs>
                <pattern id="loc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" fill="none" stroke="#f2f0eb" strokeOpacity=".06" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#loc-grid)" />
              <path d="M250 300 C 270 250 300 225 340 205 C 370 190 400 185 400 185 L400 300Z" fill="#2c3a43" />
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${282 + i * 30} ${282 - i * 14} q12 -5 24 0 t24 0`} fill="none" stroke="#f2f0eb" strokeOpacity=".3" />
              ))}
              <path d="M-10 128 L 250 -10" stroke="#f2f0eb" strokeOpacity=".22" strokeWidth="12" fill="none" />
              <path d="M-10 128 L 250 -10" stroke="#f2f0eb" strokeOpacity=".5" strokeDasharray="5 6" fill="none" />
              <polygon points="60,150 180,80 230,130 200,160 270,225 235,245 90,170" fill="#c3a273" fillOpacity=".16" stroke="#c3a273" strokeWidth="1.4" />
              <circle cx="252" cy="236" r="4.5" fill="#c3a273" />
              <circle cx="252" cy="236" r="10" fill="none" stroke="#c3a273" strokeOpacity=".5" />
              <text x="22" y="94" fontFamily="Jost, sans-serif" fontSize="8.5" letterSpacing="2" fill="#a6a29a" transform="rotate(-28 22 94)">
                DROGA WOJEWÓDZKA NR 643
              </text>
              <text x="98" y="140" fontFamily="Jost, sans-serif" fontSize="11" letterSpacing="3" fill="#f2f0eb">
                LAKE VIEW
              </text>
              <text x="300" y="268" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="17" fill="#f2f0eb" fontStyle="italic">
                Jez. Jagodne
              </text>
            </svg>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="note max-w-md">
              Schemat poglądowy, bez skali. {investment.coordinates ? "Link prowadzi do dokładnej lokalizacji inwestycji." : "Dokładny punkt na mapie po podaniu współrzędnych inwestycji."}
            </p>
            <a className="text-link text-mosiadz" href={mapHref} target="_blank" rel="noopener noreferrer">
              Odkryj lokalizację <Arrow dir="↗" />
              <span className="sr-only">(otwiera się w nowej karcie)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== 7. ŻYCIE NAD JEZIOREM =========================== */
function PhotoSlot({ label, className }: { label: string; className: string }) {
  return (
    <figure className={`grid min-h-[200px] place-content-center gap-3 border border-dashed border-jasny/20 p-6 text-center ${className}`}>
      <Icon name="lake" className="mx-auto size-10 text-jasny/40" />
      <figcaption className="max-w-[18em] text-[0.64rem] font-medium tracking-[0.2em] text-jasny/60 uppercase">{label}</figcaption>
    </figure>
  );
}

function Shot({ src, alt, caption, className, sizes, position }: { src: (typeof images)[keyof typeof images]; alt: string; caption: string; className: string; sizes: string; position?: string }) {
  return (
    <figure className={`group relative min-h-[200px] overflow-hidden ${className}`} data-reveal="img">
      <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04]" style={position ? { objectPosition: position } : undefined} />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-smola/80 to-transparent px-5 pt-10 pb-4 text-[0.62rem] font-medium tracking-[0.22em] text-jasny/90 uppercase">{caption}</figcaption>
    </figure>
  );
}

export function LakeLife() {
  return (
    <section id="zycie" aria-labelledby="lake-h" className="band relative overflow-hidden bg-smola">
      <WaterCanvas />
      <div className="wrap relative">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <span className="eyebrow before:hidden">Życie nad jeziorem</span>
          <h2 id="lake-h" className="display h-xl mt-8">
            Zwolnij. <span className="serif-accent text-mosiadz">Jesteś na Mazurach.</span>
          </h2>
          <p className="lead mx-auto mt-8">Miejsce, do którego wracasz po spokój. Gdzie dzień może zacząć się nad wodą, a wieczór kończy się wśród mazurskiej natury.</p>
        </div>
        <div className="mt-[clamp(56px,7vw,100px)] grid grid-cols-2 gap-4 md:auto-rows-[clamp(120px,12vw,190px)] md:grid-cols-12 md:gap-5">
          <Shot src={images.wizualizacja} alt="Wizualizacja: dom typu 1a w ogrodzie, popołudniowe światło na tarasie" caption="Popołudnie w ogrodzie · wizualizacja" sizes="(min-width: 768px) 58vw, 100vw" position="70% 50%" className="col-span-2 aspect-[4/3] md:col-span-7 md:row-span-3 md:aspect-auto" />
          <PhotoSlot label="Miejsce na fotografię: poranna tafla Jeziora Jagodnego" className="md:col-span-5 md:row-span-2" />
          <Shot src={images.detalLezaki} alt="Wizualizacja: leżaki na tarasie przed przeszklonym salonem" caption="Taras przed salonem · wizualizacja" sizes="(min-width: 768px) 42vw, 50vw" className="md:col-span-5 md:row-span-2" />
          <Shot src={images.detalTaras} alt="Wizualizacja: drewniana wanna ogrodowa na tarasie" caption="Jacuzzi ogrodowe · wizualizacja" sizes="(min-width: 768px) 34vw, 100vw" className="col-span-2 md:col-span-4 md:row-span-2" />
          <PhotoSlot label="Miejsce na fotografię: pomost" className="md:col-span-3" />
          <PhotoSlot label="Miejsce na fotografię: mazurska zieleń" className="md:col-span-3" />
        </div>
      </div>
    </section>
  );
}

/* =========================== 10. KONTAKT – część informacyjna =========================== */
export function ContactInfo() {
  return (
    <div className="grid content-start gap-8" data-reveal>
      <span className="eyebrow">Kontakt</span>
      <h2 id="kontakt-h" className="display h-xl">
        Poznaj Lake View <span className="serif-accent text-mosiadz">bliżej</span>
      </h2>
      <p className="lead">Porozmawiajmy o domach, dostępności i możliwościach zakupu. Poznaj szczegóły inwestycji i wybierz miejsce dla siebie.</p>
      <div className="grid gap-6 border-t border-jasny/15 pt-8 sm:grid-cols-2">
        <div className="grid content-start gap-2">
          <span className="text-[0.64rem] font-medium tracking-[0.24em] text-mosiadz uppercase">Telefon</span>
          {contact.phone ? (
            <a className="w-fit text-xl font-light tracking-[0.06em] no-underline hover:text-mosiadz" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
              {contact.phone}
            </a>
          ) : (
            <Todo>Telefon – do uzupełnienia</Todo>
          )}
        </div>
        <div className="grid content-start gap-2">
          <span className="text-[0.64rem] font-medium tracking-[0.24em] text-mosiadz uppercase">E-mail</span>
          {contact.email ? (
            <a className="w-fit text-xl font-light no-underline hover:text-mosiadz" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          ) : (
            <Todo>E-mail – do uzupełnienia</Todo>
          )}
        </div>
        {contact.officeNote && <p className="text-sm text-jasny-2 sm:col-span-2">{contact.officeNote}</p>}
      </div>
    </div>
  );
}

/* =========================== 11. STOPKA =========================== */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-jasny/10 bg-smola pt-[clamp(72px,9vw,120px)] pb-[calc(36px+env(safe-area-inset-bottom,0px))] text-sm">
      <div className="wrap">
        <div className="flex flex-col items-center text-center">
          <a href="#start" className="flex flex-col items-center gap-5 no-underline" aria-label="Lake View Prażmowo – początek strony">
            <LogoMark className="size-14 text-mosiadz" />
            <span className="text-[1.25rem] font-light tracking-[0.5em] uppercase">Lake View</span>
            <span className="-mt-3 text-[0.62rem] font-medium tracking-[0.5em] text-jasny-2 uppercase">Prażmowo · Mazury</span>
          </a>
          <p className="mt-7 max-w-md font-light text-jasny-2">Kameralna inwestycja 16 domów jednorodzinnych nad Jeziorem Jagodnym w Prażmowie, gmina Ryn.</p>
          <nav aria-label="Stopka – sekcje" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[
                ["#inwestycja", "Inwestycja"],
                ["#dom", "Dom 1a"],
                ["#lokalizacja", "Lokalizacja"],
                ["#domy", "Dostępne domy"],
                ["#galeria", "Galeria"],
                ["#kontakt", "Kontakt"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-block py-2 text-[0.7rem] font-medium tracking-[0.24em] uppercase no-underline opacity-80 hover:text-mosiadz hover:opacity-100">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 grid gap-8 border-t border-jasny/10 pt-10 text-[0.82rem] font-light text-jasny-2 md:grid-cols-3">
          <div className="grid content-start gap-1.5">
            <span className="mb-1 text-[0.62rem] font-medium tracking-[0.24em] text-mosiadz uppercase">Kontakt</span>
            <span>{contact.phone ?? <Todo>Telefon – do uzupełnienia</Todo>}</span>
            <span>{contact.email ?? <Todo>E-mail – do uzupełnienia</Todo>}</span>
          </div>
          <div className="grid content-start gap-1.5">
            <span className="mb-1 text-[0.62rem] font-medium tracking-[0.24em] text-mosiadz uppercase">Sprzedający</span>
            <span>{seller.name ?? <Todo>Nazwa podmiotu</Todo>}</span>
            <span>{seller.address ?? <Todo>Adres siedziby</Todo>}</span>
            <span>{seller.registry ?? <Todo>NIP · KRS / CEIDG</Todo>}</span>
          </div>
          <div className="grid content-start gap-1.5 md:text-right">
            <span className="mb-1 text-[0.62rem] font-medium tracking-[0.24em] text-mosiadz uppercase">Informacje</span>
            <a href="/polityka-prywatnosci" className="underline-offset-4 hover:text-jasny hover:underline md:justify-self-end">
              Polityka prywatności
            </a>
            <span>Wizualizacje i rysunki: Studio Form Architektonicznych PANTEL</span>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-jasny/10 pt-6 text-[0.72rem] leading-relaxed text-jasny-2/80 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            Informacje i materiały prezentowane na stronie nie stanowią oferty w rozumieniu art. 66 § 1 Kodeksu cywilnego. Wizualizacje mają charakter poglądowy. Wiążące są dokumenty przekazywane w procesie sprzedaży.
          </p>
          <p className="whitespace-nowrap tracking-[0.16em] uppercase">© {year} Lake View Prażmowo</p>
        </div>
      </div>
    </footer>
  );
}
