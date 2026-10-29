/** Adres bazowy strony – z NEXT_PUBLIC_SITE_URL albo automatycznie z Vercel. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return `https://${vercelProd}`;
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;
  return "http://localhost:3000";
}

/** Indeksujemy tylko produkcję – wdrożenia podglądowe Vercel dostają noindex. */
export function isIndexable(): boolean {
  const env = process.env.VERCEL_ENV;
  return !env || env === "production";
}

export const SITE_DESCRIPTION =
  "Lake View Prażmowo – kameralna inwestycja 16 domów jednorodzinnych nad Jeziorem Jagodnym w Prażmowie (gmina Ryn). Dom nad jeziorem na Mazurach: wspólny dostęp do linii brzegowej, pomost dla każdego domu, prywatne miejsce postojowe.";
