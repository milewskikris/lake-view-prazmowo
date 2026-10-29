import { Architecture } from "@/components/architecture";
import { ContactForm } from "@/components/contact-form";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Houses } from "@/components/houses";
import { Providers } from "@/components/providers";
import { ContactInfo, Features, Footer, Hero, Idea, LakeLife, Location } from "@/components/sections";
import { investment } from "@/content/site.config";
import { getSiteUrl, SITE_DESCRIPTION } from "@/lib/site";

function JsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: investment.name,
        inLanguage: "pl-PL",
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: `${investment.name} – 16 domów nad jeziorem na Mazurach`,
        description: SITE_DESCRIPTION,
        inLanguage: "pl-PL",
        isPartOf: { "@id": `${url}/#website` },
        primaryImageOfPage: `${url}/opengraph-image.jpg`,
        about: { "@id": `${url}/#place` },
      },
      {
        "@type": "Place",
        "@id": `${url}/#place`,
        name: investment.name,
        description: "Kameralna inwestycja 16 domów jednorodzinnych przy Jeziorze Jagodnym.",
        address: {
          "@type": "PostalAddress",
          addressLocality: investment.locality,
          addressRegion: investment.region,
          addressCountry: "PL",
        },
        containedInPlace: { "@type": "AdministrativeArea", name: `Gmina ${investment.commune}` },
        ...(investment.coordinates
          ? { geo: { "@type": "GeoCoordinates", latitude: investment.coordinates.lat, longitude: investment.coordinates.lng } }
          : {}),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function Home() {
  return (
    <Providers>
      <JsonLd />
      <Header />
      <main id="tresc" tabIndex={-1} className="outline-none">
        <span id="start" />
        <Hero />
        <Idea />
        <Features />
        <Architecture />
        <Location />
        <LakeLife />
        <Houses />
        <Gallery />
        <section id="kontakt" aria-labelledby="kontakt-h" className="band on-dark bg-smola text-jasny">
          <div className="wrap grid gap-11 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </Providers>
  );
}
