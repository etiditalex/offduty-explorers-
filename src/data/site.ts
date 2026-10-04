/**
 * Placeholder photography lives in /public/photos.
 * Replace those files one by one as real Offduty Explorers pictures come in.
 * Keep the same filename, or update the path here.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  placeLabel: string;
  hero: GalleryImage;
  gallery: GalleryImage[];
  cardLine: string;
  heroSubtitle: string;
  summary: string;
  story: string[];
  days: { title: string; text: string }[];
};

export const destinations: Destination[] = [
  {
    slug: "arusha",
    name: "Arusha",
    country: "Tanzania",
    placeLabel: "Northern Tanzania",
    hero: {
      src: "/photos/arusha-mountain.jpg",
      alt: "Snow-capped mountain above an open savanna",
    },
    gallery: [
      {
        src: "/photos/arusha-mountain.jpg",
        alt: "Snow-capped mountain above an open savanna",
      },
      {
        src: "/photos/arusha-safari.jpg",
        alt: "Safari vehicle in tall grass at sunset",
      },
      {
        src: "/photos/arusha-savanna.jpg",
        alt: "Acacia tree on a savanna plain at dusk",
      },
    ],
    cardLine: "Hills, markets, and a pace with room in it.",
    heroSubtitle: "Already explored — hills, markets, and open sky",
    summary:
      "The first journey beyond Kenya. Arusha was walked as a place to unwind, not as a stop on the way to somewhere else.",
    story: [
      "Arusha sits in northern Tanzania, under Mount Meru, with Kilimanjaro in the wider view and the great parks beyond the town. Offduty Explorers went there with a group, and stayed with the town itself.",
      "The days were built to unwind. Time in the market. Coffee. A long look at the hills when the light dropped. Meals that were allowed to take as long as they took. People travelled together, which is the point of the company: not a private rush, and not a coach with a whistle.",
      "Northern Tanzania is full of itineraries that try to see everything. This one left space. The parks can be part of the conversation if a group wants them. They are not the only reason to come.",
    ],
    days: [
      {
        title: "Arrive, and land the pace",
        text: "The first hours are for settling the group. A walk, a meal, a view of the hills. Nothing is stacked on top of the arrival.",
      },
      {
        title: "The town, slowly",
        text: "Market, coffee, and the ordinary life of Arusha. This is the part most itineraries skip, and the part the group came for.",
      },
      {
        title: "The wider light",
        text: "Meru in the distance, and time outside the town. A park day only if the group has asked for one.",
      },
      {
        title: "Leave lighter",
        text: "A last unhurried morning, then the road out. The group travels home together.",
      },
    ],
  },
  {
    slug: "lamu",
    name: "Lamu",
    country: "Kenya",
    placeLabel: "The Swahili coast",
    hero: {
      src: "/photos/lamu-shore.jpg",
      alt: "Quiet shoreline with gentle waves at sunset",
    },
    gallery: [
      {
        src: "/photos/lamu-shore.jpg",
        alt: "Quiet shoreline with gentle waves at sunset",
      },
      {
        src: "/photos/lamu-evening.jpg",
        alt: "A slow wave under an evening sky",
      },
      {
        src: "/photos/lamu-water.jpg",
        alt: "Close water catching the light near a far shore",
      },
    ],
    cardLine: "Stone alleys, dhow water, and evenings with nothing owed.",
    heroSubtitle: "Already explored — the slow Swahili coast",
    summary:
      "Lamu Old Town still moves by foot and by boat. The group followed that pace, and rested in it.",
    story: [
      "Lamu is a Swahili town on the Kenyan coast, and it asks you to slow down before you have agreed to. The old town is walked. Boats do the work that cars do elsewhere. Carved doors, the sea wall, and the water set the hours.",
      "The group went to unwind, so the plan followed the island. A dhow when the tide was right. Shade in the heat of the day. An evening on the waterfront with nowhere else to be. Shela’s beach sits in that same stretch of coast, wide enough for a group that came to rest.",
      "Lamu Old Town has been lived in for centuries, and it is a UNESCO World Heritage site. The trip is a guest in that, not a performance of it. The group stays small enough that the town does not have to shout over it.",
    ],
    days: [
      {
        title: "Cross to the island",
        text: "The boat is the front door. The week you left can wait on the other shore.",
      },
      {
        title: "Walk the old town",
        text: "Alleys, doors, and the life of the street. The distances are short. The attention is not.",
      },
      {
        title: "Take the water",
        text: "A dhow, or a quiet hour toward Shela. The day bends to the heat and the tide.",
      },
      {
        title: "An evening with nothing owed",
        text: "The waterfront. The group stays together. That is the unwind.",
      },
    ],
  },
];

export type DestinationCard = {
  slug: string;
  title: string;
  place: string;
  group: string;
  kicker: string;
  emphasis: string;
  image: string;
  alt: string;
  overview: string;
  included: string;
  /** Price in Kenyan shillings. */
  price: number;
};

export function formatKes(amount: number) {
  const grouped = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `KES ${grouped}`;
}

export const destinationCards: DestinationCard[] = [
  {
    slug: "arusha",
    title: "Arusha",
    place: "Arusha, Tanzania",
    group: "A group",
    kicker: "The days",
    emphasis: "Unhurried",
    image: "/photos/arusha-mountain.jpg",
    alt: "Snow-capped mountain above an open savanna",
    overview:
      "The first journey beyond Kenya. Arusha was walked as a place to unwind: market, coffee, and the hills, with the group staying together.",
    included: "Time in town, and a long look at the hills",
    price: 25000,
  },
  {
    slug: "lamu",
    title: "Lamu",
    place: "Lamu, Kenya",
    group: "A group",
    kicker: "The days",
    emphasis: "On the water",
    image: "/photos/lamu-shore.jpg",
    alt: "Quiet shoreline with gentle waves at sunset",
    overview:
      "Lamu Old Town still moves by foot and by boat. The group followed that pace, and rested in it.",
    included: "The old town on foot, and the water when the tide is right",
    price: 25000,
  },
  {
    slug: "arusha",
    title: "Beyond the town",
    place: "Northern Tanzania",
    group: "A group",
    kicker: "Walked for",
    emphasis: "The hills",
    image: "/photos/arusha-savanna.jpg",
    alt: "Acacia tree on a savanna plain at dusk",
    overview:
      "Outside Arusha, the wider light under the hills. A park day only if the group has asked for one.",
    included: "Time outside the town, with Meru in the distance",
    price: 15000,
  },
  {
    slug: "lamu",
    title: "The waterfront",
    place: "The Swahili coast",
    group: "A group",
    kicker: "Walked for",
    emphasis: "A slow evening",
    image: "/photos/lamu-evening.jpg",
    alt: "A slow wave under an evening sky",
    overview:
      "An evening on the Lamu waterfront. The group stays together, with nowhere else to be.",
    included: "The waterfront, and an evening with nothing owed",
    price: 15000,
  },
];

export const stayCards: DestinationCard[] = [
  {
    slug: "lamu",
    title: "Shela's beach",
    place: "Lamu, Kenya",
    group: "Shared stay",
    kicker: "The rest",
    emphasis: "On the sand",
    image: "/photos/lamu-water.jpg",
    alt: "Close water catching the light near a far shore",
    overview:
      "Shela’s beach sits on the same stretch of coast as Lamu Old Town, wide enough for a group that came to rest.",
    included: "A shared stay on the sand",
    price: 18000,
  },
  {
    slug: "arusha",
    title: "Outside town",
    place: "Arusha, Tanzania",
    group: "Shared stay",
    kicker: "The rest",
    emphasis: "In the grass",
    image: "/photos/arusha-safari.jpg",
    alt: "Safari vehicle in tall grass at sunset",
    overview:
      "A stay outside Arusha, in the grass, with the hills in view. The days are paced so the group can unwind.",
    included: "Quiet ground outside the town",
    price: 18000,
  },
  {
    slug: "lamu",
    title: "The waterfront",
    place: "The Swahili coast",
    group: "Shared stay",
    kicker: "The rest",
    emphasis: "Nothing owed",
    image: "/photos/lamu-evening.jpg",
    alt: "A slow wave under an evening sky",
    overview:
      "A waterfront stay on the Swahili coast. The evening is the point, and the group stays together.",
    included: "Evenings with nothing owed",
    price: 18000,
  },
  {
    slug: "arusha",
    title: "Under the hills",
    place: "Northern Tanzania",
    group: "Shared stay",
    kicker: "The rest",
    emphasis: "A long look",
    image: "/photos/arusha-savanna.jpg",
    alt: "Acacia tree on a savanna plain at dusk",
    overview:
      "A stay under the northern Tanzania hills, with time to look and not move on.",
    included: "A long look, then rest",
    price: 18000,
  },
];

export const heroSlides = [
  {
    title: "Travel Stress Free",
    description:
      "Come out with your people and leave the week behind. The days are hosted, the route is one already walked, and the plan keeps enough quiet in it for a group to actually unwind.",
    subtitle: "Group journeys to unwind with us",
    cta: "Explore Now",
    href: "/destinations",
    image: "/photos/hero-plane.jpg",
    alt: "Passenger aircraft facing forward on an airport apron",
  },
  {
    title: "Arusha, Tanzania",
    description:
      "Arusha sits in northern Tanzania, under Mount Meru, with Kilimanjaro in the wider view. The group came to unwind in the town itself: the market, coffee, and a long look at the hills when the light dropped, not a rush through every park.",
    subtitle: destinations[0].heroSubtitle,
    cta: "See Arusha",
    href: "/destinations/arusha",
    image: destinations[0].hero.src,
    alt: destinations[0].hero.alt,
  },
  {
    title: "Lamu, Kenya",
    description:
      "Lamu Old Town still moves by foot and by boat, a Swahili town on the Kenyan coast that has been lived in for centuries. Carved doors, the sea wall, a dhow when the tide is right, and Shela’s beach, wide enough for a group that came to rest.",
    subtitle: destinations[1].heroSubtitle,
    cta: "See Lamu",
    href: "/destinations/lamu",
    image: destinations[1].hero.src,
    alt: destinations[1].hero.alt,
  },
];

export const destinationOptions = [
  { value: "arusha", label: "Arusha, Tanzania" },
  { value: "lamu", label: "Lamu, Kenya" },
  { value: "open", label: "Somewhere new — Kenya or beyond" },
];

export const monthOptions = [
  "Flexible",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function planHref(destination = "") {
  return destination ? `/plan?destination=${destination}` : "/plan";
}
