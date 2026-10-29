# Lake View Prażmowo

Strona inwestycji 16 domów jednorodzinnych nad Jeziorem Jagodnym w Prażmowie (gmina Ryn).

**Stos:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · fonty self-hosted (Fontsource) · `next/image`.

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env.local   # uzupełnij wartości (opcjonalne lokalnie)
npm run dev                  # http://localhost:3000
npm run build && npm start   # sprawdzenie wersji produkcyjnej
```

Wymagany Node.js 20.9 lub nowszy.

## Wdrożenie na Vercel

1. Utwórz repozytorium na GitHub i wypchnij kod:
   ```bash
   git init && git add . && git commit -m "Lake View Prażmowo"
   git branch -M main
   git remote add origin git@github.com:<konto>/lake-view-prazmowo.git
   git push -u origin main
   ```
2. W Vercel: **Add New → Project → Import** repozytorium. Framework zostanie rozpoznany automatycznie (Next.js), nie zmieniaj poleceń build.
3. W **Settings → Environment Variables** ustaw zmienne z tabeli poniżej (Production, a w razie potrzeby Preview).
4. Podłącz domenę w **Settings → Domains** i ustaw `NEXT_PUBLIC_SITE_URL` na jej adres. Po zmianie zmiennych wykonaj ponowne wdrożenie (Redeploy).

### Zmienne środowiskowe

| Zmienna | Wymagana | Opis |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | zalecana | Adres produkcyjny, np. `https://twoja-domena.pl`. Używany w canonical, Open Graph, sitemap i robots. Bez niej używany jest adres produkcyjny Vercel. |
| `RESEND_API_KEY` | do wysyłki formularza | Klucz API z [resend.com](https://resend.com). **Sekret** – tylko w panelu Vercel, nigdy w repozytorium. |
| `CONTACT_FROM_EMAIL` | do wysyłki formularza | Nadawca w domenie zweryfikowanej w Resend, np. `Lake View Prażmowo <formularz@twoja-domena.pl>`. |
| `CONTACT_TO_EMAIL` | do wysyłki formularza | Odbiorca zapytań (biuro sprzedaży). Kilka adresów oddziel przecinkami. |

Dopóki trzy zmienne formularza nie są ustawione, formularz waliduje dane, ale **nie udaje wysyłki**: informuje użytkownika, że wysyłka nie jest jeszcze uruchomiona, i pozwala skopiować treść zapytania.

## Formularz kontaktowy

- `POST /api/inquiry` – walidacja (wspólna z formularzem: `src/lib/inquiry.ts`), pole-pułapka na boty, minimalny czas wypełnienia, limit 5 zapytań / 10 min na adres IP, kontrola nagłówka `Origin`, limit rozmiaru treści.
- Wysyłka przez Resend REST API (`src/lib/mailer.ts`), z `reply_to` ustawionym na adres klienta.
- `GET /api/inquiry` – zwraca tylko informację, czy wysyłka jest skonfigurowana.
- Limiter działa w pamięci instancji funkcji. Do twardego limitu globalnego podłącz np. Upstash Redis z Vercel Marketplace.
- Aby użyć innej usługi (SMTP, CRM, HubSpot), podmień implementację `sendInquiryEmail` – reszta aplikacji się nie zmienia.

## Treści do uzupełnienia

Wszystkie dane biznesowe są w **`src/content/site.config.ts`**:

- `houses` – dla każdego z 16 domów: `status` (`"dostepny" | "zarezerwowany" | "sprzedany"`), `type`, `usableArea`, `plotArea`, `plotNumber`, `price`. Pola `null` wyświetlają się jako „do uzupełnienia”; brak statusu oznacza „status w aktualizacji” (strona nie publikuje fikcyjnej dostępności).
- `contact` – telefon, e-mail, adres biura. Po uzupełnieniu pojawią się jako klikalne linki.
- `seller` – nazwa, adres i dane rejestrowe sprzedającego (stopka, polityka prywatności).
- `investment.coordinates` – po podaniu link „Odkryj lokalizację na mapie” wskaże dokładny punkt, a dane strukturalne otrzymają współrzędne.

Pozostałe miejsca oznaczone w interfejsie przerywanym podkreśleniem (klasa `todo`): sekcja „W okolicy” (`src/components/sections.tsx`), okres przechowywania danych i odbiorcy w polityce prywatności (`src/app/polityka-prywatnosci/page.tsx`).

Zdjęcia jeziora, pomostu i okolicy: dodaj pliki do `src/assets/img/`, wpisz je w `src/content/media.ts` (galeria otrzyma je automatycznie) i zastąp elementy `PhotoSlot` w sekcji „Życie nad jeziorem”.

## Struktura

```
src/
  app/                      # App Router: strona, polityka prywatności, API, sitemap, robots, OG
  components/               # sekcje i komponenty interaktywne
  content/                  # dane: domy, kontakt, materiały, zestawienie pomieszczeń
  lib/                      # walidacja, wysyłka, limiter, adres strony
  assets/img/               # obrazy źródłowe (optymalizowane przez next/image do AVIF/WebP)
```

## SEO

Metadane i Open Graph w `src/app/layout.tsx`, obraz OG `src/app/opengraph-image.jpg`, dane strukturalne JSON-LD (WebSite, WebPage, Place) w `src/app/page.tsx`, `sitemap.xml` i `robots.txt` generowane z `src/app/sitemap.ts` i `robots.ts`. Wdrożenia podglądowe Vercel (Preview) automatycznie dostają `noindex`.

## Prawa do materiałów

Wizualizacje i rysunki: Studio Form Architektonicznych PANTEL (Olsztyn). Rysunki zawierają zastrzeżenie o zakazie udostępniania bez pisemnej zgody pracowni – przed publicznym uruchomieniem strony należy ją uzyskać.
