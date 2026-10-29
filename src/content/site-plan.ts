/** Geometria planu zagospodarowania (rys. A-01, 10.2026) w układzie obrazu plan-zagospodarowania.webp (3680 × 4200). */
export const PLAN_SIZE = { width: 3680, height: 4200 } as const;

export interface LotShape {
  /** Obrys działki – punkty w układzie obrazu planu. */
  points: string;
  /** Położenie numeru działki (jak na planie). */
  label: { x: number; y: number };
}

export const lotShapes: Record<number, LotShape> = {
  1: { points: "698,2035 1533,1518 1666,1735 1052,2381", label: { x: 860, y: 2080 } },
  2: { points: "1052,2381 1666,1735 1877,2078 1333,2656", label: { x: 1240, y: 2416 } },
  3: { points: "1333,2656 1877,2078 2090,2426 1612,2928", label: { x: 1532, y: 2692 } },
  4: { points: "66,1417 303,1272 868,1791 832,1813 698,2035", label: { x: 312, y: 1440 } },
  5: { points: "303,1272 755,997 1138,1622 868,1791", label: { x: 744, y: 1176 } },
  6: { points: "755,997 1088,793 1470,1416 1138,1622", label: { x: 1052, y: 992 } },
  7: { points: "1162,748 1462,565 1851,1178 1547,1368", label: { x: 1452, y: 736 } },
  8: { points: "1462,565 1768,378 2146,994 1851,1178", label: { x: 1640, y: 632 } },
  9: { points: "1768,378 2070,193 2447,807 2146,994", label: { x: 1936, y: 460 } },
  10: { points: "2070,193 2288,61 2819,576 2447,807", label: { x: 2228, y: 268 } },
  11: { points: "2553,885 2910,664 3186,932 2918,1238", label: { x: 3060, y: 972 } },
  12: { points: "2236,1081 2553,885 2918,1238 2572,1632", label: { x: 2788, y: 1260 } },
  13: { points: "1916,1280 2236,1081 2572,1632 2321,1919", label: { x: 2440, y: 1660 } },
  14: { points: "1611,1470 1916,1280 2321,1919 2069,2207", label: { x: 2188, y: 1948 } },
  15: { points: "1612,2928 1867,2661 2783,3545 2682,3654 3104,4047 2880,4168", label: { x: 2532, y: 3640 } },
  16: { points: "1867,2661 2122,2392 3037,3273 2783,3545", label: { x: 2880, y: 3320 } },
};

/** Granica terenu inwestycji. */
export const investmentOutline = "66,1417 2288,61 3186,932 2064,2212 3657,3748 2880,4168";

/** Teren przy jeziorze – plaża ogólnodostępna dla mieszkańców osiedla (wg legendy PZT). */
export const beachArea = "3315,3418 3657,3748 3104,4047 2894,3851";
