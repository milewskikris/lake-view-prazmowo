"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { elevations, floorPlans } from "@/content/media";
import { attic, groundFloor, m2, totals, type Room } from "@/content/rooms";
import { AskLink } from "./ask-link";
import { useLightbox } from "./providers";

const LEVELS = [
  { id: "parter", label: "Parter", rooms: groundFloor, total: totals.ground, ref: "Rys. A-03 · rzut parteru · 1:100" },
  { id: "poddasze", label: "Poddasze", rooms: attic, total: totals.attic, ref: "Rys. A-04 · rzut poddasza · 1:100" },
] as const;

function RoomTable({ rooms, total, label }: { rooms: readonly Room[]; total: number; label: string }) {
  return (
    <table className="w-full border-collapse text-[0.95rem] font-light tabular-nums">
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
            <td className="w-14 py-2.5 text-xs font-medium tracking-[0.1em] text-cegla">{r.no}</td>
            <td className="py-2.5">{r.name}</td>
            <td className="py-2.5 text-right">{m2(r.area)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td className="pt-4 text-[0.7rem] font-medium tracking-[0.22em] uppercase">Razem {label.toLowerCase()}</td>
          <td className="pt-4 text-right font-normal">{m2(total)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

/** Rzuty, zestawienie pomieszczeń i elewacje domu typu 1a – jasna sekcja „rysunkowa”. */
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
    <section id="architektura" aria-labelledby="arch-h" className="band light">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-6">
            <span className="eyebrow">Architektura i domy</span>
            <h2 id="arch-h" className="display h-xl mt-8">
              Architektura, <span className="serif-accent text-cegla">która odnajduje się</span> w naturze
            </h2>
          </div>
          <div className="grid gap-5 lg:col-span-5 lg:col-start-8">
            <p className="lead">Przemyślana forma, otoczenie jeziora i mazurski krajobraz tworzą kontekst dla miejsca, które można nazwać swoim.</p>
            <p className="note">Dane wg projektu budowlanego domu typu 1a (Studio Form Architektonicznych PANTEL, 10.2026). Standard wykończenia zostanie przedstawiony w ofercie.</p>
          </div>
        </div>

        <div className="mt-[clamp(56px,7vw,96px)] grid lg:grid-cols-12" data-reveal>
          <div className="relative min-w-0 border border-kreska bg-white p-4 md:p-8 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[0.72rem] font-medium tracking-[0.24em] uppercase">Dom typu 1a · {LEVELS[level].label}</h3>
              <span className="text-[0.66rem] tracking-[0.16em] text-ink-2 uppercase">{LEVELS[level].ref}</span>
            </div>
            <button type="button" className="block w-full cursor-zoom-in" onClick={(e) => open(floorPlans, level, e.currentTarget)} aria-label={`Powiększ: ${plan.caption}`}>
              <Image src={plan.src} alt={plan.alt} sizes="(min-width: 1024px) 55vw, 100vw" quality={85} className="mx-auto h-auto w-full max-w-[640px]" />
            </button>
          </div>
          <div className="grid min-w-0 content-start gap-7 bg-smola p-[clamp(24px,3.5vw,48px)] text-jasny lg:col-span-5">
            <div role="tablist" aria-label="Kondygnacje domu typu 1a" className="flex gap-2">
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
                  className={`min-h-11 flex-1 cursor-pointer border text-[0.7rem] font-medium tracking-[0.24em] uppercase transition-colors ${
                    level === i ? "border-mosiadz bg-mosiadz text-smola" : "border-jasny/25 text-jasny/80 hover:border-jasny/60"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {LEVELS.map((l, i) => (
              <div key={l.id} role="tabpanel" id={`panel-${l.id}`} aria-labelledby={`tab-${l.id}`} hidden={level !== i} className="[&_tr]:border-jasny/12 [&_td:first-child]:text-mosiadz">
                <RoomTable rooms={l.rooms} total={l.total} label={l.label} />
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 border-t border-jasny/20 pt-6">
              {[
                [totals.total, "pow. użytkowa"],
                [totals.ground, "parter"],
                [totals.attic, "poddasze"],
              ].map(([v, l]) => (
                <div key={l} className="grid gap-1">
                  <b className="text-[clamp(1.3rem,2.2vw,1.9rem)] leading-tight font-light tabular-nums">{m2(v as number).replace(" m²", "")}</b>
                  <span className="text-[0.6rem] font-medium tracking-[0.2em] text-jasny-2 uppercase">m² {l}</span>
                </div>
              ))}
            </div>
            <p className="note">Powierzchnia użytkowa obejmuje garaż ({m2(totals.garage)}). Przypisanie typów domów do działek podamy w karcie każdego domu.</p>
            <AskLink hint="Interesuje mnie dom typu 1a." className="btn btn-ghost w-fit">
              Zapytaj o dom typu 1a <span className="arrow" aria-hidden="true">→</span>
            </AskLink>
          </div>
        </div>

        <div className="mt-[clamp(72px,8vw,120px)]">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h3 className="display h-m">Elewacje i widoki</h3>
            <p className="note max-w-md">Przewiń w bok, aby zobaczyć wszystkie rysunki. Kliknij, aby otworzyć w pełnym rozmiarze.</p>
          </div>
          <ul
            tabIndex={0}
            aria-label="Elewacje i widoki domu typu 1a"
            className="mt-8 grid snap-x snap-mandatory auto-cols-[min(84%,560px)] grid-flow-col gap-6 overflow-x-auto pb-5 [scrollbar-color:var(--color-cegla)_transparent] [scrollbar-width:thin]"
          >
            {elevations.map((m, i) => (
              <li key={m.id} className="grid snap-start gap-3">
                <button type="button" className="group block cursor-zoom-in overflow-hidden border border-kreska bg-white p-3" onClick={(e) => open(elevations, i, e.currentTarget)} aria-label={`Powiększ: ${m.caption}`}>
                  <Image src={m.src} alt={m.alt} sizes="(min-width: 768px) 560px, 84vw" className="aspect-[2/1] h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
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
