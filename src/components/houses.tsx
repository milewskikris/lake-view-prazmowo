"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { planMedia } from "@/content/media";
import { houses, statusLabels, type House, type HouseStatus } from "@/content/site.config";
import { beachArea, investmentOutline, lotShapes, PLAN_SIZE } from "@/content/site-plan";
import { useInquiry, useLightbox } from "./providers";

const STATUS_COLOR: Record<HouseStatus, string> = {
  dostepny: "var(--color-st-dostepny)",
  zarezerwowany: "var(--color-st-rezerwacja)",
  sprzedany: "var(--color-st-sprzedany)",
};
const { width: W, height: H } = PLAN_SIZE;

/** Plan zagospodarowania (rys. A-01) bez linii uzbrojenia, z klikalnymi obrysami 16 działek. */
function SitePlan({ selected, onSelect }: { selected: number; onSelect: (nr: number) => void }) {
  return (
    <div className="relative">
      <Image
        src={planMedia.src}
        alt={planMedia.alt}
        sizes="(min-width: 1024px) 60vw, 100vw"
        quality={85}
        placeholder="blur"
        className="block h-auto w-full"
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="group" aria-label="Działki na planie zagospodarowania">
        {/* Otoczenie poza terenem inwestycji – wyciszone */}
        <path d={`M0 0H${W}V${H}H0Z M${investmentOutline}Z`} fillRule="evenodd" fill="#f7f6f2" opacity=".7" />
        <polygon points={investmentOutline} fill="none" stroke="#1c1a18" strokeWidth="12" />
        {/* Teren przy jeziorze */}
        <polygon points={beachArea} fill="#a8865a" fillOpacity=".16" stroke="#8a6d43" strokeWidth="10" strokeDasharray="40 24" />
        <text x="3080" y="3700" textAnchor="middle" className="plan-label" fill="#8a6d43">
          <tspan x="3080">teren przy jeziorze</tspan>
          <tspan x="3080" dy="84">plaża dla mieszkańców</tspan>
        </text>
        <text x="3640" y="4150" textAnchor="end" className="plan-lake">
          Jezioro Jagodne ↘
        </text>
        {houses.map((h) => {
          const shape = lotShapes[h.nr];
          if (!shape) return null;
          const label = `Dom nr ${h.nr}${h.status ? `, ${statusLabels[h.status].toLowerCase()}` : ""}`;
          return (
            <g
              key={h.nr}
              className="house"
              data-status={h.status ?? undefined}
              tabIndex={0}
              role="button"
              aria-pressed={selected === h.nr}
              aria-label={label}
              onClick={() => onSelect(h.nr)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(h.nr);
                }
              }}
            >
              <polygon className="lot-area" points={shape.points} />
              <circle className="ring" cx={shape.label.x} cy={shape.label.y} r="78" />
              <text x={shape.label.x} y={shape.label.y + 29} textAnchor="middle">
                {h.nr}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Todo({ children }: { children: React.ReactNode }) {
  return <span className="todo">{children}</span>;
}

function HouseCard({ house }: { house: House }) {
  const { askAbout } = useInquiry();
  const nr = String(house.nr);
  return (
    <>
      <dl className="grid border-t border-jasny/12">
        <Row label="Status">
          {house.status ? (
            <span className="inline-flex items-center gap-2">
              <i className="inline-block size-2.5 rounded-full" style={{ background: STATUS_COLOR[house.status] }} aria-hidden="true" />
              {statusLabels[house.status]}
            </span>
          ) : (
            <span className="inline-flex items-start gap-2">
              <i className="mt-1.5 inline-block size-2.5 flex-none rounded-full border border-current" aria-hidden="true" />
              Status w aktualizacji – zapytaj o dostępność
            </span>
          )}
        </Row>
        <Row label="Typ domu">{house.type ?? <Todo>do potwierdzenia</Todo>}</Row>
        <Row label="Pow. użytkowa">{house.usableArea ? `${house.usableArea.toLocaleString("pl-PL")} m²` : <Todo>do uzupełnienia</Todo>}</Row>
        <Row label="Działka">
          {house.plotNumber || house.plotArea ? (
            [house.plotNumber && `nr ${house.plotNumber}`, house.plotArea && `${house.plotArea.toLocaleString("pl-PL")} m²`].filter(Boolean).join(" · ")
          ) : (
            <Todo>do uzupełnienia</Todo>
          )}
        </Row>
        {house.price && <Row label="Cena">{house.price}</Row>}
        <Row label="Pomost · parking">Dostęp do pomostu · 1 miejsce postojowe</Row>
      </dl>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a href="#kontakt" className="btn btn-light" onClick={() => askAbout(nr)}>
          Zapytaj o dom nr {house.nr} <span className="arrow" aria-hidden="true">→</span>
        </a>
        <a href="#architektura" className="text-link text-mosiadz">
          Rzut i karta typu 1a
        </a>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[9.5em_minmax(0,1fr)] gap-3 border-b border-jasny/12 py-3 text-[0.92rem] font-light">
      <dt className="pt-0.5 text-[0.62rem] font-medium tracking-[0.22em] text-mosiadz uppercase">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function Houses() {
  const [selected, setSelected] = useState(1);
  const lightbox = useLightbox();
  const house = houses.find((h) => h.nr === selected) ?? houses[0];

  const select = useCallback((nr: number) => {
    setSelected(nr);
    history.replaceState(null, "", `#dom-${nr}`);
  }, []);

  // Bezpośredni link do domu: /#dom-7
  useEffect(() => {
    const fromHash = () => {
      const m = /^#dom-(\d{1,2})$/.exec(location.hash);
      const nr = m ? Number(m[1]) : NaN;
      if (nr >= 1 && nr <= houses.length) {
        setSelected(nr);
        document.getElementById("domy")?.scrollIntoView();
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <section id="domy" aria-labelledby="domy-h" className="band light">
      <div className="wrap">
        <div className="mb-[clamp(48px,6vw,88px)] grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-6">
            <span className="eyebrow">Dostępne domy</span>
            <h2 id="domy-h" className="display h-xl mt-8">
              Wybierz <span className="serif-accent text-cegla">swój dom</span> na planie
            </h2>
          </div>
          <div className="grid gap-4 lg:col-span-5 lg:col-start-8">
            <p className="lead">Kliknij numer domu na planie zagospodarowania albo wybierz go z listy. W karcie domu sprawdzisz jego dane i wyślesz zapytanie.</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,1fr)] lg:items-stretch">
          <div className="min-w-0 border border-kreska bg-papier" data-reveal>
            <SitePlan selected={selected} onSelect={select} />
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-t border-kreska px-5 py-1.5">
              <p className="note">Rys. A-01 · plan zagospodarowania terenu · bez sieci uzbrojenia</p>
              <button type="button" className="text-link text-cegla" onClick={(e) => lightbox.open([planMedia], 0, e.currentTarget)}>
                Powiększ plan <span aria-hidden="true">↗</span>
              </button>
            </div>
            <ul aria-label="Legenda statusów" className="flex flex-wrap gap-x-6 gap-y-2 border-t border-kreska px-5 py-4 text-[0.66rem] font-medium tracking-[0.16em] text-ink-2 uppercase">
              {(Object.keys(statusLabels) as HouseStatus[]).map((s) => (
                <li key={s} className="inline-flex items-center gap-2">
                  <i className="inline-block size-3.5 border border-ink" style={{ background: STATUS_COLOR[s] }} aria-hidden="true" />
                  {statusLabels[s].toLowerCase()}
                </li>
              ))}
              <li className="inline-flex items-center gap-2">
                <i className="inline-block size-3.5 border border-dashed border-ink bg-papier" aria-hidden="true" />
                status w aktualizacji
              </li>
            </ul>
          </div>
          <aside aria-labelledby="hp-title" className="on-dark grid content-start gap-7 bg-smola p-[clamp(26px,3.5vw,48px)] text-jasny">
            <div className="grid gap-1.5" aria-live="polite">
              <span className="eyebrow">Karta domu</span>
              <h3 id="hp-title" className="mt-3 text-[clamp(2.2rem,3.8vw,3.4rem)] leading-none font-light tracking-[0.08em] uppercase">
                Dom nr {house.nr}
              </h3>
            </div>
            <HouseCard house={house} />
            <div>
              <p id="picker-l" className="eyebrow mb-2.5">
                Wszystkie domy
              </p>
              <div role="group" aria-labelledby="picker-l" className="grid grid-cols-8 gap-1.5">
                {houses
                  .slice()
                  .sort((a, b) => a.nr - b.nr)
                  .map((h) => (
                    <button
                      key={h.nr}
                      type="button"
                      aria-pressed={selected === h.nr}
                      aria-label={`Dom nr ${h.nr}`}
                      onClick={() => select(h.nr)}
                      className="min-h-11 cursor-pointer border border-jasny/20 text-sm font-normal transition-colors hover:border-mosiadz hover:text-mosiadz aria-pressed:border-mosiadz aria-pressed:bg-mosiadz aria-pressed:text-smola"
                    >
                      {h.nr}
                    </button>
                  ))}
              </div>
            </div>
            {houses.every((h) => h.status === null) && (
              <p className="border-l border-mosiadz pl-4 text-[0.78rem] leading-relaxed font-light text-jasny-2">
                Aktualne statusy dostępności zostaną opublikowane po potwierdzeniu przez biuro sprzedaży. Do tego czasu każdy dom ma oznaczenie „status w aktualizacji”.
              </p>
            )}
          </aside>
        </div>
        <p className="note mt-4">Podział na działki i numeracja wg planu zagospodarowania terenu (rys. A-01, 10.2026, Studio Form Architektonicznych PANTEL). Z planu usunięto przebieg sieci uzbrojenia.</p>
      </div>
    </section>
  );
}
