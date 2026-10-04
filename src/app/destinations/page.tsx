import { DestinationCatalog } from "@/components/DestinationCatalog";
import { destinationCards, formatKes, siteUrl, stayCards } from "@/data/site";
import type { Metadata } from "next";

const destinationsDescription =
  "Hotels and destinations Offduty Explorers has already walked. Lamu in Kenya and Arusha in Tanzania, with shared stays for a group.";

const listingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Destinations",
      url: `${siteUrl}/destinations`,
      description: destinationsDescription,
      isPartOf: {
        "@type": "WebSite",
        name: "Offduty Explorers",
        url: siteUrl,
      },
    },
    {
      "@type": "ItemList",
      name: "Places and stays already walked",
      itemListElement: [...destinationCards, ...stayCards].map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: card.title,
        url: `${siteUrl}/destinations/${card.slug}`,
        description: `${card.place}. ${card.emphasis}. ${formatKes(card.price)}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Destinations",
          item: `${siteUrl}/destinations`,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Destinations",
  description: destinationsDescription,
  keywords: [
    "Offduty Explorers destinations",
    "Lamu Kenya",
    "Arusha Tanzania",
    "group stays",
    "Kenya and beyond",
  ],
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Destinations · Offduty Explorers",
    description: destinationsDescription,
    url: "/destinations",
    images: [
      {
        url: "/photos/arusha-savanna.jpg",
        alt: "Acacia tree on a savanna plain at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destinations · Offduty Explorers",
    description: destinationsDescription,
    images: ["/photos/arusha-savanna.jpg"],
  },
};

export default function DestinationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <DestinationCatalog />
    </>
  );
}
