import type { StaticImageData } from "next/image";

import wizualizacja from "@/assets/img/wizualizacja-1a.webp";
import detalPrzeszklenie from "@/assets/img/detal-przeszklenie.webp";
import detalLezaki from "@/assets/img/detal-lezaki.webp";
import detalTaras from "@/assets/img/detal-taras.webp";
import detalElewacja from "@/assets/img/detal-elewacja.webp";
import widok1 from "@/assets/img/widok-1.webp";
import widok2 from "@/assets/img/widok-2.webp";
import widok3 from "@/assets/img/widok-3.webp";
import widok4 from "@/assets/img/widok-4.webp";
import rzutParteru from "@/assets/img/rzut-parteru.webp";
import rzutPoddasza from "@/assets/img/rzut-poddasza.webp";
import elewacjaFrontowa from "@/assets/img/elewacja-frontowa.webp";
import elewacjaTylna from "@/assets/img/elewacja-tylna.webp";
import elewacjaBoczna1 from "@/assets/img/elewacja-boczna-1.webp";
import elewacjaBoczna2 from "@/assets/img/elewacja-boczna-2.webp";

export type MediaCategory = "wizualizacje" | "architektura" | "rzuty";

export interface MediaItem {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  category: MediaCategory;
  /** Rysunki i modele na białym tle wyświetlamy w całości (contain). */
  drawing?: boolean;
  span?: "wide" | "tall" | "big";
}

export const images = {
  wizualizacja,
  detalPrzeszklenie,
  detalLezaki,
  detalTaras,
  detalElewacja,
};

export const media: MediaItem[] = [
  { id: "wizualizacja-ogrod", src: wizualizacja, category: "wizualizacje", span: "big", caption: "Dom typu 1a od strony ogrodu · wizualizacja", alt: "Wizualizacja domu typu 1a od strony ogrodu z tarasem, leżakami i wanną ogrodową" },
  { id: "przeszklenie", src: detalPrzeszklenie, category: "wizualizacje", span: "tall", caption: "Przeszklony szczyt salonu · wizualizacja", alt: "Wizualizacja dwukondygnacyjnego przeszklenia szczytu salonu" },
  { id: "lezaki", src: detalLezaki, category: "wizualizacje", caption: "Taras przed salonem · wizualizacja", alt: "Wizualizacja tarasu z leżakami przed przeszklonym salonem" },
  { id: "widok-3", src: widok3, category: "architektura", drawing: true, span: "wide", caption: "Widok nr 3 · model projektowy", alt: "Model projektowy domu typu 1a, widok od strony ogrodu" },
  { id: "taras", src: detalTaras, category: "wizualizacje", caption: "Jacuzzi ogrodowe · wizualizacja", alt: "Wizualizacja drewnianej wanny ogrodowej na tarasie" },
  { id: "widok-1", src: widok1, category: "architektura", drawing: true, span: "wide", caption: "Widok nr 1 · model projektowy", alt: "Model projektowy domu typu 1a, widok od frontu" },
  { id: "elewacja-detal", src: detalElewacja, category: "wizualizacje", caption: "Detal deskowania · wizualizacja", alt: "Wizualizacja detalu ciemnego deskowania elewacji" },
  { id: "widok-4", src: widok4, category: "architektura", drawing: true, caption: "Widok nr 4 · model projektowy", alt: "Model projektowy domu typu 1a od strony wjazdu do garażu" },
  { id: "widok-2", src: widok2, category: "architektura", drawing: true, span: "wide", caption: "Widok nr 2 · model projektowy", alt: "Model projektowy domu typu 1a, widok boczny" },
  { id: "rzut-parteru", src: rzutParteru, category: "rzuty", drawing: true, span: "tall", caption: "Rzut parteru · rys. A-03 · 1:100", alt: "Rzut parteru domu typu 1a" },
  { id: "rzut-poddasza", src: rzutPoddasza, category: "rzuty", drawing: true, span: "tall", caption: "Rzut poddasza · rys. A-04 · 1:100", alt: "Rzut poddasza domu typu 1a" },
  { id: "elewacja-frontowa", src: elewacjaFrontowa, category: "architektura", drawing: true, span: "wide", caption: "Elewacja frontowa · rys. A-05 · 1:100", alt: "Elewacja frontowa domu typu 1a" },
  { id: "elewacja-tylna", src: elewacjaTylna, category: "architektura", drawing: true, span: "wide", caption: "Elewacja tylna · rys. A-06 · 1:100", alt: "Elewacja tylna domu typu 1a z przeszklonym szczytem" },
  { id: "elewacja-boczna-1", src: elewacjaBoczna1, category: "architektura", drawing: true, span: "wide", caption: "Elewacja boczna nr 1 · rys. A-05 · 1:100", alt: "Elewacja boczna nr 1 domu typu 1a" },
  { id: "elewacja-boczna-2", src: elewacjaBoczna2, category: "architektura", drawing: true, span: "wide", caption: "Elewacja boczna nr 2 · rys. A-06 · 1:100", alt: "Elewacja boczna nr 2 domu typu 1a" },
];

export const byId = (id: string) => {
  const m = media.find((x) => x.id === id);
  if (!m) throw new Error(`Brak materiału: ${id}`);
  return m;
};

export const floorPlans = [byId("rzut-parteru"), byId("rzut-poddasza")];
export const elevations = [
  "elewacja-frontowa",
  "elewacja-tylna",
  "elewacja-boczna-1",
  "elewacja-boczna-2",
  "widok-1",
  "widok-2",
  "widok-3",
  "widok-4",
].map(byId);

export const galleryFilters: { value: MediaCategory | "all"; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "wizualizacje", label: "Wizualizacje" },
  { value: "architektura", label: "Architektura" },
  { value: "rzuty", label: "Rzuty" },
];
