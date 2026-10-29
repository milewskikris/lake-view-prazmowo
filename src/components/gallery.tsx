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
    <section id="galeria" aria-labelledby="gal-h" className="band bg-smola">
      <div className="wrap">
        <div className="mb-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-8" data-reveal>
          <div>
            <span className="eyebrow">Galeria</span>
            <h2 id="gal-h" className="display h-xl mt-8">
              Wizualizacje <span className="serif-accent text-mosiadz">i rysunki</span>
            </h2>
          </div>
          <div role="group" aria-label="Filtruj galerię" className="flex flex-wrap gap-2">
          {galleryFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className="min-h-11 cursor-pointer border border-jasny/20 px-5 text-[0.68rem] font-medium tracking-[0.22em] text-jasny/75 uppercase transition-colors hover:border-jasny/60 hover:text-jasny aria-pressed:border-mosiadz aria-pressed:bg-mosiadz aria-pressed:text-smola"
            >
              {f.label}
            </button>
          ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Wyświetlono {items.length} materiałów.
        </p>
        <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[clamp(160px,16vw,250px)] md:grid-cols-4 md:gap-4">
          {items.map((m, i) => (
            <li key={m.id} className={`relative min-h-[150px] ${m.span ? SPAN[m.span] : ""}`}>
              <button
                type="button"
                onClick={(e) => open(items, i, e.currentTarget)}
                aria-label={`Otwórz w pełnym rozmiarze: ${m.caption}`}
                className={`group absolute inset-0 block cursor-zoom-in overflow-hidden ${m.drawing ? "bg-white" : "bg-grafit"}`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes={m.span === "big" || m.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  placeholder={m.drawing ? "empty" : "blur"}
                  className={`transition-transform duration-[900ms] group-hover:scale-[1.04] ${m.drawing ? "object-contain p-2.5" : "object-cover"}`}
                />
                <span className="absolute bottom-3 left-3 bg-smola/85 px-3 py-1.5 text-[0.6rem] font-medium tracking-[0.22em] text-jasny uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">{m.caption.split(" · ")[0]}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="note mt-4">Fotografie jeziora i okolicy dodamy po wykonaniu sesji w Prażmowie. Wizualizacje mają charakter poglądowy.</p>
      </div>
    </section>
  );
}
