"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryFilters, media, type MediaCategory } from "@/content/media";
import { useLightbox } from "./providers";

const SPAN: Record<string, string> = {
  wide: "col-span-2",
  tall: "md:row-span-2",
  big: "col-span-2 md:row-span-2",
};

export function Gallery() {
  const [filter, setFilter] = useState<MediaCategory | "all">("all");
  const { open } = useLightbox();
  const items = useMemo(() => media.filter((m) => filter === "all" || m.category === filter), [filter]);

  return (
    <section id="galeria" aria-labelledby="gal-h" className="band pt-0!">
      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,64px)] grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-12">
          <span className="eyebrow">Galeria</span>
          <h2 id="gal-h" className="text-h2">
            Wizualizacje, widoki i rysunki domu typu 1a.
          </h2>
        </div>
        <div role="group" aria-label="Filtruj galerię" className="mb-7 flex flex-wrap gap-2">
          {galleryFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className="min-h-[42px] cursor-pointer border border-kreska px-4 text-sm font-medium tracking-[0.02em] text-ink-2 hover:border-ink aria-pressed:border-smola aria-pressed:bg-smola aria-pressed:text-jasny"
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Wyświetlono {items.length} materiałów.
        </p>
        <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[clamp(150px,15vw,230px)] md:grid-cols-4">
          {items.map((m, i) => (
            <li key={m.id} className={`relative min-h-[150px] ${m.span ? SPAN[m.span] : ""}`}>
              <button
                type="button"
                onClick={(e) => open(items, i, e.currentTarget)}
                aria-label={`Otwórz w pełnym rozmiarze: ${m.caption}`}
                className={`group absolute inset-0 block cursor-zoom-in overflow-hidden ${m.drawing ? "bg-white" : "bg-papier"}`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes={m.span === "big" || m.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  placeholder={m.drawing ? "empty" : "blur"}
                  className={`transition-transform duration-[900ms] group-hover:scale-[1.04] ${m.drawing ? "object-contain p-2.5" : "object-cover"}`}
                />
                <span className="absolute bottom-2.5 left-2.5 bg-smola/80 px-2 py-1 font-mono text-[0.64rem] tracking-[0.06em] text-jasny">{m.caption.split(" · ")[0]}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="note mt-4">Fotografie jeziora i okolicy dodamy po wykonaniu sesji w Prażmowie. Wizualizacje mają charakter poglądowy.</p>
      </div>
    </section>
  );
}
