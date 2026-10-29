/** Zestawienie powierzchni użytkowej domu typu 1a – projekt budowlany, rys. A-03 i A-04 (10.2026). */

export interface Room {
  no: string;
  name: string;
  area: number;
}

export const groundFloor: Room[] = [
  { no: "1.1", name: "Salon z kominkiem", area: 23.67 },
  { no: "1.2", name: "Kuchnia", area: 14.99 },
  { no: "1.3", name: "Komunikacja", area: 8.0 },
  { no: "1.4", name: "Korytarz", area: 5.09 },
  { no: "1.6", name: "Pokój", area: 12.59 },
  { no: "1.7", name: "Łazienka", area: 6.36 },
  { no: "1.8", name: "Wiatrołap", area: 11.6 },
  { no: "1.9", name: "Garaż", area: 24.45 },
  { no: "1.10", name: "Pomieszczenie techniczne", area: 4.01 },
  { no: "1.11", name: "Sauna", area: 3.21 },
  { no: "1.12", name: "Jacuzzi / spa", area: 4.83 },
  { no: "1.13", name: "Zaplecze higieniczno-sanitarne", area: 2.47 },
];

export const attic: Room[] = [
  { no: "2.1", name: "Sypialnia", area: 18.18 },
  { no: "2.2", name: "Garderoba", area: 3.97 },
  { no: "2.3", name: "Łazienka", area: 4.34 },
  { no: "2.4", name: "Pokój", area: 8.55 },
  { no: "2.5", name: "Pokój", area: 8.55 },
  { no: "2.6", name: "Komunikacja", area: 7.0 },
];

/** Sumy wg projektu (podawane w dokumentacji – nie przeliczamy, aby uniknąć różnic zaokrągleń). */
export const totals = { ground: 121.26, attic: 50.6, total: 171.87, garage: 24.45 };

export const m2 = (v: number) =>
  `${v.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`;
