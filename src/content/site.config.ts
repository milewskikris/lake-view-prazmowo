/**
 * Dane biznesowe strony – edytowane w repozytorium (nie są sekretami).
 * Pola ustawione na null wyświetlają się na stronie jako „do uzupełnienia”
 * albo nie są renderowane wcale (np. przycisk telefonu bez numeru).
 */

export type HouseStatus = "dostepny" | "zarezerwowany" | "sprzedany";

export interface House {
  /** Numer domu zgodny z planem zagospodarowania (rys. A-01). */
  nr: number;
  /** Położenie markera na planie – współrzędne układu rysunku A-01. */
  x: number;
  y: number;
  /** null = status w aktualizacji (nie publikujemy fikcyjnej dostępności). */
  status: HouseStatus | null;
  /** Np. "Typ 1a" – po potwierdzeniu przypisania typu do działki. */
  type: string | null;
  /** Powierzchnia użytkowa domu w m². */
  usableArea: number | null;
  /** Powierzchnia działki w m². */
  plotArea: number | null;
  /** Numer ewidencyjny działki, np. "301/16". */
  plotNumber: string | null;
  /** Cena – zostaw null, jeśli cena ma nie być publikowana. */
  price: string | null;
}

const base = { status: null, type: null, usableArea: null, plotArea: null, plotNumber: null, price: null } as const;

export const houses: House[] = [
  { ...base, nr: 1, x: 690, y: 890 },
  { ...base, nr: 2, x: 845, y: 955 },
  { ...base, nr: 3, x: 945, y: 1062 },
  { ...base, nr: 4, x: 405, y: 800 },
  { ...base, nr: 5, x: 522, y: 702 },
  { ...base, nr: 6, x: 645, y: 632 },
  { ...base, nr: 7, x: 797, y: 515 },
  { ...base, nr: 8, x: 912, y: 440 },
  { ...base, nr: 9, x: 1035, y: 365 },
  { ...base, nr: 10, x: 1160, y: 300 },
  { ...base, nr: 11, x: 1318, y: 452 },
  { ...base, nr: 12, x: 1192, y: 572 },
  { ...base, nr: 13, x: 1112, y: 722 },
  { ...base, nr: 14, x: 967, y: 792 },
  { ...base, nr: 15, x: 930, y: 1272 },
  { ...base, nr: 16, x: 1040, y: 1190 },
];

export const statusLabels: Record<HouseStatus, string> = {
  dostepny: "Dostępny",
  zarezerwowany: "Zarezerwowany",
  sprzedany: "Sprzedany",
};

export const contact = {
  /** Telefon biura sprzedaży w formacie do wyświetlenia, np. "+48 600 000 000". */
  phone: null as string | null,
  /** Publiczny adres e-mail biura sprzedaży. */
  email: null as string | null,
  /** Adres biura sprzedaży lub godziny pracy. */
  officeNote: null as string | null,
};

export const seller = {
  /** Pełna nazwa podmiotu oferującego nieruchomości (dewelopera / sprzedającego). */
  name: null as string | null,
  address: null as string | null,
  /** Np. "NIP 000-000-00-00 · KRS 0000000000". */
  registry: null as string | null,
};

export const investment = {
  name: "Lake View Prażmowo",
  locality: "Prażmowo",
  commune: "Ryn",
  region: "warmińsko-mazurskie",
  lake: "Jezioro Jagodne",
  houseCount: 16,
  /** Współrzędne inwestycji – po uzupełnieniu strona pokaże link do mapy z dokładnym punktem. */
  coordinates: null as { lat: number; lng: number } | null,
};
