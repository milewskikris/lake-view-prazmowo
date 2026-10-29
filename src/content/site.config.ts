/**
 * Dane biznesowe strony – edytowane w repozytorium (nie są sekretami).
 * Pola ustawione na null wyświetlają się na stronie jako „do uzupełnienia”
 * albo nie są renderowane wcale (np. przycisk telefonu bez numeru).
 */

export type HouseStatus = "dostepny" | "zarezerwowany" | "sprzedany";

export interface House {
  /** Numer domu zgodny z planem zagospodarowania (rys. A-01). Obrys działki: src/content/site-plan.ts. */
  nr: number;
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
  { ...base, nr: 1 },
  { ...base, nr: 2 },
  { ...base, nr: 3 },
  { ...base, nr: 4 },
  { ...base, nr: 5 },
  { ...base, nr: 6 },
  { ...base, nr: 7 },
  { ...base, nr: 8 },
  { ...base, nr: 9 },
  { ...base, nr: 10 },
  { ...base, nr: 11 },
  { ...base, nr: 12 },
  { ...base, nr: 13 },
  { ...base, nr: 14 },
  { ...base, nr: 15 },
  { ...base, nr: 16 },
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
