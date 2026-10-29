"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { elevations, floorPlans, images } from "@/content/media";
import { attic, groundFloor, m2, totals, type Room } from "@/content/rooms";
import { AskLink } from "./ask-link";
import { useLightbox } from "./providers";

const LEVELS = [
  { id: "parter", label: "Parter", rooms: groundFloor, total: totals.ground, ref: "Rys. A-03 · rzut parteru · skala 1:100" },
  { id: "poddasze", label: "Poddasze", rooms: attic, total: totals.attic, ref: "Rys. A-04 · rzut poddasza · skala 1:100" },
] as const;

function RoomTable({ rooms, total, label }: { rooms: readonly Room[]; total: number; label: string }) {
  return (
    <table className="w-full border-collapse text-sm tabular-nums">
      <caption className="sr-only">Zestawienie powierzchni użytkowej – {label.toLowerCase()}</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Nr</th>
          <th scope="col">Pomieszczenie</th>
          <th scope="col">Powierzchnia</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((r) => (
          <tr key={r.no} className="border-b border-kreska">
            <td className="w-14 py-2 font-mono text-xs text-ink-2">{r.no}</td>
            <td className="py-2">{r.name}</td>
            <td className="py-2 text-right font-mono text-[0.82rem]">{m2(r.area)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td className="pt-3 font-semibold">Razem {label.toLowerCase()}</td>
          <td className="pt-3 text-right font-mono text-[0.82rem] font-semibold">{m2(total)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export function Architecture() {
  const [level, setLevel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { open } = useLightbox();
  const plan = floorPlans[level];

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (level + (e.key === "ArrowRight" ? 1 : -1) + LEVELS.length) % LEVELS.length;
    setLevel(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="architektura" aria-labelledby="arch-h" className="band">
      <div className="wrap">
        {/* Wprowadzenie */}
        <div className="mb-[clamp(56px,8vw,110px)] grid gap-7 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-14">
          <figure className="grid gap-2.5">
            <Image
              src={images.detalPrzeszklenie}
              alt="Wizualizacja: dwukondygnacyjne przeszklenie szczytu salonu w domu typu 1a, z tarasem i leżakami"
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder="blur"
              className="aspect-[4/5] w-full object-cover object-[50%_40%] md:aspect-[5/4]"
            />
            <figcaption className="figcap">Przeszklony szczyt salonu · wizualizacja domu typu 1a</figcaption>
          </figure>
          <div className="grid gap-5">
            <span className="eyebrow">Architektura i domy</span>
            <h2 id="arch-h" className="text-h2">
              Architektura, która odnajduje się w naturze.
            </h2>
            <p className="lead">Przemyślana forma, otoczenie jeziora i mazurski krajobraz tworzą kontekst dla miejsca, które można nazwać swoim.</p>
            <dl className="grid border-t border-kreska">
              {[
                ["Bryła", "Dwie dwuspadowe bryły połączone łącznikiem: część mieszkalna z poddaszem użytkowym i garaż."],
                ["Elewacje", "Ściany w cegle zestawione z ciemnym drewnianym deskowaniem, dach pokryty dachówką (wg rysunków elewacji)."],
                ["Ogród", "Salon otwarty na ogród wysokim przeszkleniem szczytu, taras na gruncie i jacuzzi ogrodowe."],
              ].map(([dt, dd]) => (
                <div key={dt} className="grid grid-cols-[7.5em_minmax(0,1fr)] gap-4 border-b border-kreska py-3.5 text-sm">
                  <dt className="pt-0.5 font-mono text-xs tracking-[0.1em] text-ink-2 uppercase">{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
            <p className="note">
              Opis dotyczy domu typu 1a na podstawie projektu budowlanego (Studio Form Architektonicznych PANTEL, 10.2026). Standard wykończenia zostanie przedstawiony w ofercie.
            </p>
          </div>
        </div>

        {/* Karta typu 1a */}
        <div id="dom-1a" className="grid scroll-mt-20 border border-kreska bg-papier lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="grid min-w-0 gap-3 border-b border-kreska p-4 lg:border-r lg:border-b-0">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[1.375rem]">Dom typu 1a</h3>
              <span className="note">{LEVELS[level].ref}</span>
            </div>
            <button type="button" className="block cursor-zoom-in bg-white" onClick={(e) => open(floorPlans, level, e.currentTarget)} aria-label={`Powiększ: ${plan.caption}`}>
              <Image src={plan.src} alt={plan.alt} sizes="(min-width: 1024px) 55vw, 100vw" quality={85} className="h-auto w-full" />
            </button>
          </div>
          <div className="grid min-w-0 content-start gap-5 p-[clamp(20px,3vw,36px)]">
            <div role="tablist" aria-label="Kondygnacje domu typu 1a" className="flex border-b border-kreska">
              {LEVELS.map((l, i) => (
                <button
                  key={l.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${l.id}`}
                  aria-selected={level === i}
                  aria-controls={`panel-${l.id}`}
                  tabIndex={level === i ? 0 : -1}
                  onClick={() => setLevel(i)}
                  onKeyDown={onTabKey}
                  className={`-mb-px mr-6 min-h-11 cursor-pointer border-b-2 px-0.5 text-sm font-medium tracking-[0.04em] ${level === i ? "border-ink text-ink" : "border-transparent text-ink-2"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {LEVELS.map((l, i) => (
              <div key={l.id} role="tabpanel" id={`panel-${l.id}`} aria-labelledby={`tab-${l.id}`} hidden={level !== i}>
                <RoomTable rooms={l.rooms} total={l.total} label={l.label} />
              </div>
            ))}
            <div className="grid grid-cols-3 gap-3 border-t border-ink pt-3.5">
              {[
                [totals.total, "pow. użytkowa"],
                [totals.ground, "parter"],
                [totals.attic, "poddasze"],
              ].map(([v, l]) => (
                <div key={l} className="grid gap-0.5">
                  <b className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-normal tabular-nums">{m2(v as number).replace(" m²", "")}</b>
                  <span className="font-mono text-[0.68rem] tracking-[0.08em] text-ink-2 uppercase">m² {l}</span>
                </div>
              ))}
            </div>
            <p className="note">
              Wg zestawienia powierzchni w projekcie budowlanym (rys. A-03, A-04, 10.2026). Powierzchnia użytkowa obejmuje garaż ({m2(totals.garage)}). Przypisanie typów domów do poszczególnych działek podamy w karcie każdego domu.
            </p>
            <AskLink hint="Interesuje mnie dom typu 1a." className="text-link w-fit">
              Zapytaj o dom typu 1a <span className="arrow" aria-hidden="true">→</span>
            </AskLink>
          </div>
        </div>

        {/* Elewacje i widoki */}
        <div className="mt-[clamp(56px,7vw,96px)]">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-12">
            <h3 className="eyebrow font-mono">Elewacje i widoki · skala 1:100</h3>
            <p className="note max-w-[40em]">Przewiń w bok, aby zobaczyć wszystkie elewacje. Kliknij rysunek, aby otworzyć go w pełnym rozmiarze.</p>
          </div>
          <ul
            tabIndex={0}
            aria-label="Elewacje i widoki domu typu 1a"
            className="mt-6 grid snap-x snap-mandatory auto-cols-[min(82%,520px)] grid-flow-col gap-5 overflow-x-auto pb-3.5 [scrollbar-width:thin]"
          >
            {elevations.map((m, i) => (
              <li key={m.id} className="grid snap-start gap-2.5">
                <button type="button" className="block cursor-zoom-in border border-kreska bg-white p-2" onClick={(e) => open(elevations, i, e.currentTarget)} aria-label={`Powiększ: ${m.caption}`}>
                  <Image src={m.src} alt={m.alt} sizes="(min-width: 768px) 520px, 82vw" className="aspect-[2/1] h-auto w-full object-contain" />
                </button>
                <span className="figcap">{m.caption}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
