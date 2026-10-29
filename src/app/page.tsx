import { Architecture } from "@/components/architecture";
import { ContactForm } from "@/components/contact-form";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Houses } from "@/components/houses";
import { Providers } from "@/components/providers";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ContactInfo, FeaturedHouse, Features, Footer, Hero, LakeLife, Location, Vision } from "@/components/sections";
import { images } from "@/content/media";
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
        <Vision />
        <FeaturedHouse />
        <Features />
        <Architecture />
        <Location />
        <LakeLife />
        <Houses />
        <Gallery />
        <section id="kontakt" aria-labelledby="kontakt-h" className="band on-dark relative isolate overflow-hidden text-jasny">
          <Image src={images.wizualizacja} alt="" fill sizes="100vw" className="-z-10 object-cover object-[60%_40%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(14_14_13/0.94)_0%,rgb(14_14_13/0.86)_45%,rgb(14_14_13/0.72)_100%)]" />
          <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="border border-jasny/12 bg-smola/70 p-[clamp(24px,3.5vw,52px)] backdrop-blur-md lg:col-span-6 lg:col-start-7" data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </Providers>
  );
}
