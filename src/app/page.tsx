import { DestinationCarousel } from "@/components/DestinationCarousel";
import { OfferCards } from "@/components/OfferCards";
import { Reasons } from "@/components/Reasons";
import { StayCarousel } from "@/components/StayCarousel";
import { Hero } from "@/components/Hero";
import { destinations, planHref, siteUrl } from "@/data/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const homeDescription =
  "Offduty Explorers takes people out in groups to unwind. Kenya and beyond, beginning with Lamu and Arusha. Cofounded by Kibandi Esther.";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Offduty Explorers",
      url: siteUrl,
      description: homeDescription,
    },
    {
      "@type": "WebPage",
      name: "Offduty Explorers",
      url: siteUrl,
      description: homeDescription,
      isPartOf: {
        "@type": "WebSite",
        name: "Offduty Explorers",
        url: siteUrl,
      },
    },
    {
      "@type": "ItemList",
      name: "Places already walked",
      itemListElement: destinations.map((place, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${place.name}, ${place.country}`,
        url: `${siteUrl}/destinations/${place.slug}`,
        description: place.summary,
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: {
    absolute: "Offduty Explorers — Group journeys in Kenya and beyond",
  },
  description: homeDescription,
  keywords: [
    "Offduty Explorers",
    "group trips",
    "Lamu",
    "Arusha",
    "Kenya and beyond",
    "Kibandi Esther",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Offduty Explorers — Group journeys in Kenya and beyond",
    description: homeDescription,
    url: "/",
    images: [
      {
        url: "/photos/hero-plane.jpg",
        alt: "View from an aircraft above the clouds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offduty Explorers — Group journeys in Kenya and beyond",
    description: homeDescription,
    images: ["/photos/hero-plane.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <DestinationCarousel />
      <StayCarousel />
      <section className="invite" aria-labelledby="invite-heading">
        <Image
          src="/photos/hero-plane.jpg"
          alt="View from an aircraft above the clouds"
          fill
          sizes="100vw"
          className="invite-photo"
        />
        <div className="invite-shade" />
        <div className="wrap">
          <div className="invite-copy">
            <h2 id="invite-heading">Planning a group trip?</h2>
            <p>
              Tell us who is coming and where you want to unwind. We shape the
              days in places already walked, in Kenya and beyond.
            </p>
            <Link className="btn btn-gold" href={planHref()}>
              Plan a group trip
            </Link>
          </div>
        </div>
      </section>
      <OfferCards />
      <Reasons />
    </>
  );
}
