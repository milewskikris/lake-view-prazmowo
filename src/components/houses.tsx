"use client";

import { useCallback, useEffect, useState } from "react";
import { houses, statusLabels, type House, type HouseStatus } from "@/content/site.config";
import { useInquiry } from "./providers";

const STATUS_COLOR: Record<HouseStatus, string> = {
  dostepny: "var(--color-st-dostepny)",
  zarezerwowany: "var(--color-st-rezerwacja)",
  sprzedany: "var(--color-st-sprzedany)",
};
const MONO = "IBM Plex Mono, monospace";
const SERIF = "Libre Caslon Display, Georgia, serif";

const TREES: [number, number][] = [
  [250, 688], [310, 652], [372, 614], [432, 578], [492, 542], [552, 505], [612, 468], [712, 405], [772, 368], [832, 331], [892, 294], [952, 258], [1012, 222], [1072, 186],
  [340, 862], [410, 928], [482, 995], [570, 1078], [660, 1162], [750, 1246], [842, 1332], [932, 1414], [1022, 1494], [1112, 1572], [1202, 1652],
  [1215, 780], [1330, 650], [1408, 566], [575, 960], [712, 1070], [828, 1160], [1150, 860], [1420, 520],
];
const ROADS = ["M560 836 Q595 812 640 790 L1285 412", "M625 382 L790 690 L1000 1010 L1385 1420", "M625 382 L585 310"];

function SitePlan({ selected, onSelect }: { selected: number; onSelect: (nr: number) => void }) {
  return (
    <svg viewBox="100 0 1740 1930" role="group" aria-label="Plan zagospodarowania inwestycji z 16 domami" className="block h-auto w-full">
      <defs>
        <pattern id="beach-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.2" fill="#9e5537" />
        </pattern>
      </defs>
      <rect x="100" y="0" width="1740" height="1930" fill="#f7f6f2" />
      {/* Jezioro Jagodne */}
      <path d="M1700 1560 C1745 1600 1800 1622 1840 1650 L1840 1930 L1170 1930 C1250 1880 1320 1832 1380 1800 C1470 1752 1590 1700 1660 1620 Z" fill="#22303a" />
      {[0, 1, 2, 3, 4].map((w) => (
        <path key={w} d={`M${1300 + w * 60} ${1870 - w * 40} q40 -12 80 0 t80 0`} fill="none" stroke="#ecebe3" strokeWidth="2" opacity=".35" />
      ))}
      <text x="1560" y="1830" fontFamily={SERIF} fontSize="46" fill="#ecebe3" fontStyle="italic">
        Jez. Jagodne
      </text>
      {/* Droga wojewódzka nr 643 */}
      <path d="M40 680 L1200 -40" stroke="#ddd9cf" strokeWidth="70" fill="none" />
      <path d="M40 680 L1200 -40" stroke="#8c8981" strokeWidth="2" strokeDasharray="18 16" fill="none" />
      <text x="760" y="236" fontFamily={MONO} fontSize="26" fill="#55534c" transform="rotate(-31.8 760 236)">
        droga wojewódzka nr 643
      </text>
      {/* Granica inwestycji */}
      <polygon points="195,712 1110,145 1470,545 1100,900 1010,990 1650,1610 1340,1790 300,820" fill="#dce0d2" stroke="#1c1a18" strokeWidth="3" strokeDasharray="22 10" />
      {/* Teren przy jeziorze */}
      <polygon points="1350,1598 1650,1612 1420,1772" fill="url(#beach-dots)" stroke="#9e5537" strokeWidth="2" />
      <text x="1190" y="1660" fontFamily={MONO} fontSize="22" fill="#9e5537">
        teren przy jeziorze
      </text>
      <text x="1190" y="1688" fontFamily={MONO} fontSize="22" fill="#9e5537">
        plaża dla mieszkańców
      </text>
      {/* Drogi wewnętrzne */}
      {ROADS.map((d) => (
        <g key={d}>
          <path d={d} stroke="#f7f6f2" strokeWidth="38" fill="none" strokeLinecap="round" />
          <path d={d} stroke="#bdb8ac" strokeWidth="2" fill="none" strokeDasharray="2 10" />
        </g>
      ))}
      <text x="640" y="350" fontFamily={MONO} fontSize="24" fill="#55534c">
        wjazd
      </text>
      {/* Zieleń wysoka */}
      {TREES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="20" fill="#4f5f4c" opacity=".55" />
      ))}
      {/* Domy */}
      {houses.map((h) => {
        const fill = h.status ? STATUS_COLOR[h.status] : "#f7f6f2";
        const dash = h.status ? undefined : "8 5";
        const label = `Dom nr ${h.nr}${h.status ? `, ${statusLabels[h.status].toLowerCase()}` : ""}`;
        return (
          <g
            key={h.nr}
            className="house"
            transform={`translate(${h.x} ${h.y})`}
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
            <g transform="rotate(-32)">
              <rect x="-74" y="-38" width="100" height="76" fill={fill} stroke="#1c1a18" strokeWidth="2.5" strokeDasharray={dash} />
              <rect x="16" y="-58" width="60" height="116" fill={fill} stroke="#1c1a18" strokeWidth="2.5" strokeDasharray={dash} />
            </g>
            <circle className="ring" r="36" />
            <text y="12" textAnchor="middle">
              {h.nr}
            </text>
          </g>
        );
      })}
    </svg>
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
      <dl className="grid border-t border-jasny/20">
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
        <a href="#dom-1a" className="text-link">
          Rzut i karta typu 1a
        </a>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[9em_minmax(0,1fr)] gap-3 border-b border-jasny/20 py-2.5 text-sm">
      <dt className="pt-0.5 font-mono text-xs tracking-[0.08em] text-jasny-2 uppercase">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function Houses() {
  const [selected, setSelected] = useState(1);
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
    <section id="domy" aria-labelledby="domy-h" className="band">
      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,64px)] grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-12">
          <span className="eyebrow">Dostępne domy</span>
          <div className="grid gap-4">
            <h2 id="domy-h" className="text-h2">
              Wybierz dom na planie.
            </h2>
            <p className="lead">Kliknij numer domu na planie zagospodarowania albo wybierz go z listy. W karcie domu sprawdzisz jego dane i wyślesz zapytanie.</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:items-start lg:gap-10">
          <div className="min-w-0 border border-kreska bg-papier">
            <SitePlan selected={selected} onSelect={select} />
            <ul aria-label="Legenda statusów" className="flex flex-wrap gap-x-5 gap-y-2 border-t border-kreska px-4 py-3.5 text-xs text-ink-2">
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
          <aside aria-labelledby="hp-title" className="on-dark lg:sticky lg:top-[calc(64px+env(safe-area-inset-top,0px)+16px)] grid gap-5 bg-smola p-[clamp(22px,3vw,34px)] text-jasny">
            <div className="grid gap-1.5" aria-live="polite">
              <span className="eyebrow">Karta domu</span>
              <h3 id="hp-title" className="text-[clamp(2rem,3.6vw,3rem)] leading-none">
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
                      className="min-h-11 cursor-pointer border border-jasny/30 font-mono text-sm font-medium transition-colors hover:bg-jasny/10 aria-pressed:bg-jasny aria-pressed:text-smola"
                    >
                      {h.nr}
                    </button>
                  ))}
              </div>
            </div>
            {houses.every((h) => h.status === null) && (
              <p className="border-l-2 border-cegla pl-2.5 font-mono text-[0.68rem] leading-normal tracking-[0.06em] text-jasny-2">
                Aktualne statusy dostępności zostaną opublikowane po potwierdzeniu przez biuro sprzedaży. Do tego czasu każdy dom ma oznaczenie „status w aktualizacji”.
              </p>
            )}
          </aside>
        </div>
        <p className="note mt-4">Plan uproszczony na podstawie planu zagospodarowania terenu (rys. A-01, 10.2026). Położenie budynków orientacyjne.</p>
      </div>
    </section>
  );
}
