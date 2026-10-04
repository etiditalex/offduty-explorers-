import { AboutPlaces } from "@/components/AboutPlaces";
import { siteUrl } from "@/data/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const aboutDescription =
  "Offduty Explorers was cofounded by Kibandi Esther. Group journeys to unwind, through Kenya and beyond, beginning with Lamu and Arusha.";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Offduty Explorers",
      url: siteUrl,
      logo: `${siteUrl}/logo.jpg`,
      email: "offdutyexplorers@gmail.com",
      telephone: "+254706710371",
      founder: {
        "@type": "Person",
        name: "Kibandi Esther",
      },
      areaServed: ["Kenya", "Tanzania"],
    },
    {
      "@type": "AboutPage",
      name: "About Us",
      url: `${siteUrl}/about`,
      description: aboutDescription,
      isPartOf: {
        "@type": "WebSite",
        name: "Offduty Explorers",
        url: siteUrl,
      },
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
          name: "About Us",
          item: `${siteUrl}/about`,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "About Us",
  description: aboutDescription,
  keywords: [
    "Offduty Explorers",
    "Kibandi Esther",
    "group trips Kenya",
    "Lamu",
    "Arusha",
    "East Africa travel",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us · Offduty Explorers",
    description: aboutDescription,
    url: "/about",
    images: [
      {
        url: "/photos/arusha-safari.jpg",
        alt: "Safari vehicle in tall grass at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us · Offduty Explorers",
    description: aboutDescription,
    images: ["/photos/arusha-safari.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <header className="about-hero">
        <Image
          src="/photos/arusha-safari.jpg"
          alt="Safari vehicle in tall grass at sunset"
          fill
          priority
          sizes="100vw"
        />
        <div className="about-hero-shade" />
        <div className="about-hero-copy">
          <h1>
            Show the world
            <span>as it is,</span>
            <span>then stay and rest.</span>
          </h1>
          <p className="about-hero-note">
            Offduty Explorers was cofounded by Kibandi Esther. The company
            takes people out in groups, through Kenya and beyond, on trips
            built to unwind.
          </p>
          <Link className="btn btn-gold-line" href="/plan">
            Plan a group trip
          </Link>
        </div>
      </header>
      <section className="who" aria-labelledby="who-heading">
        <div className="wrap">
          <div className="who-head">
            <h2 id="who-heading">Who We Are</h2>
            <p>
              Offduty Explorers takes people out in groups to see a place
              properly, and to unwind in it. Kenya and beyond, beginning with
              Lamu and Arusha.
            </p>
          </div>
          <div className="who-layout">
            <div className="who-copy">
              <h3>Shared days, with room in them</h3>
              <p>
                The company was cofounded by Kibandi Esther so that seeing a
                place, and resting in it, could be the same trip. The days are
                hosted and shared. Nobody has to organise the quiet.
              </p>
              <p>
                Esther is a content creator, and she comes to the road with a
                background in international relations. The work is to show how
                a place actually is, and to take care with the people who host
                the group when it arrives.
              </p>
              <p>
                Two places are on the books. Lamu, at home on the Kenyan coast.
                Arusha, the first step beyond. A new route opens when it has
                been walked with a group, not before.
              </p>
              <Link href="/contact">Contact us</Link>
            </div>
            <figure className="who-photo">
              <Image
                src="/photos/arusha-mountain.jpg"
                alt="Snow-capped mountain above an open savanna"
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className="mission" aria-labelledby="mission-heading">
        <div className="wrap">
          <div className="mission-head">
            <h2 id="mission-heading">Mission and vision</h2>
            <span className="mission-rule" aria-hidden="true" />
            <p>What the trips are for, and how the list of places grows.</p>
          </div>
          <div className="mission-grid">
            <article>
              <span className="mission-icon" aria-hidden="true">
                <TargetIcon />
              </span>
              <h3>Our Mission</h3>
              <p>
                Take a group out, show them how a place actually is, and leave
                enough quiet in the days to unwind. The trip is hosted. The
                pace stays gentle. Nobody has to organise the rest.
              </p>
            </article>
            <article>
              <span className="mission-icon" aria-hidden="true">
                <EyeIcon />
              </span>
              <h3>Our Vision</h3>
              <p>
                Keep the map honest. A place is added after it has been walked
                with a group. Lamu and Arusha are the start. From there the
                road goes on, through Kenya and beyond.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="why-travel" aria-labelledby="why-travel-heading">
        <div className="wrap">
          <div className="why-travel-head">
            <h2 id="why-travel-heading">Why Travel With Us?</h2>
            <span className="mission-rule" aria-hidden="true" />
            <p>
              Discover what sets Offduty Explorers apart as your premier East
              African travel partner
            </p>
          </div>
          <div className="why-travel-grid">
            <article>
              <span className="why-travel-icon" aria-hidden="true">
                <PinMarkIcon />
              </span>
              <h3>Bespoke Itineraries</h3>
              <p>
                Your dream trip, designed by you and perfected by us. We
                specialize in tailoring every detail to reflect your personal
                travel style.
              </p>
            </article>
            <article>
              <span className="why-travel-icon" aria-hidden="true">
                <PeopleMarkIcon />
              </span>
              <h3>Unmatched Local Expertise</h3>
              <p>
                Intimate knowledge of East Africa&apos;s hidden gems, cultures,
                and logistics for authentic experiences you won&apos;t find
                elsewhere.
              </p>
            </article>
            <article>
              <span className="why-travel-icon" aria-hidden="true">
                <BellIcon />
              </span>
              <h3>Comprehensive Service</h3>
              <p>
                Your single point of contact for a flawless journey—from
                flights and accommodation to visas and transport.
              </p>
            </article>
            <article>
              <span className="why-travel-icon" aria-hidden="true">
                <AwardIcon />
              </span>
              <h3>Commitment to Excellence</h3>
              <p>
                Fully accredited with the highest service standards and
                commitment to sustainable, responsible tourism.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="solutions" aria-labelledby="solutions-heading">
        <div className="wrap">
          <div className="solutions-head">
            <h2 id="solutions-heading">What we host</h2>
            <span className="mission-rule" aria-hidden="true" />
            <p>Group trips, packages, and day trips, hosted so the group can unwind.</p>
          </div>
          <div className="solutions-grid">
            <article className="solution-card">
              <div className="solution-media">
                <Image
                  src="/photos/lamu-shore.jpg"
                  alt="Quiet shoreline with gentle waves at sunset"
                  fill
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
              </div>
              <div className="solution-copy">
                <h3>Group trips</h3>
                <p>
                  Come with your people and unwind. The days are hosted and
                  shared, with enough quiet left in them.
                </p>
                <Link href="/plan?service=Group+trips">Plan a group trip</Link>
              </div>
            </article>
            <article className="solution-card">
              <div className="solution-media">
                <Image
                  src="/photos/arusha-savanna.jpg"
                  alt="Acacia tree on a savanna plain at dusk"
                  fill
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
              </div>
              <div className="solution-copy">
                <h3>Packages</h3>
                <p>
                  A route already walked, for the group. Lamu and Arusha are
                  the places on the books.
                </p>
                <Link href="/plan?service=Packages">See packages</Link>
              </div>
            </article>
            <article className="solution-card">
              <div className="solution-media">
                <Image
                  src="/photos/lamu-water.jpg"
                  alt="Close water catching the light near a far shore"
                  fill
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
              </div>
              <div className="solution-copy">
                <h3>Day trips</h3>
                <p>
                  One day out, at a quiet pace. A single outing, still hosted,
                  still with the group.
                </p>
                <Link href="/plan?service=Day+trips">Plan a day trip</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="principles" aria-labelledby="principles-heading">
        <div className="wrap-wide">
          <div className="principles-head">
            <span className="mission-rule" aria-hidden="true" />
            <h2 id="principles-heading">
              The principles that guide every journey we create
            </h2>
          </div>
          <div className="principles-grid">
            <article>
              <span className="principles-icon" aria-hidden="true">
                <SmileIcon />
              </span>
              <h3>Customer Satisfaction</h3>
              <p>
                We strive to exceed client expectations by delivering
                exceptional service and unforgettable experiences.
              </p>
            </article>
            <article>
              <span className="principles-icon" aria-hidden="true">
                <HandshakeIcon />
              </span>
              <h3>Integrity & Transparency</h3>
              <p>
                Honest and clear communication forms the backbone of our
                business operations and client relationships.
              </p>
            </article>
            <article>
              <span className="principles-icon" aria-hidden="true">
                <MapIcon />
              </span>
              <h3>Local Expertise</h3>
              <p>
                Deep knowledge of East Africa&apos;s destinations, cultures,
                and travel logistics to create superior travel solutions.
              </p>
            </article>
            <article>
              <span className="principles-icon principles-icon-soft" aria-hidden="true">
                <LeafIcon />
              </span>
              <h3>Sustainability</h3>
              <p>
                Committed to responsible tourism that benefits local
                communities and protects the environment.
              </p>
            </article>
            <article>
              <span className="principles-icon principles-icon-soft" aria-hidden="true">
                <BulbIcon />
              </span>
              <h3>Innovation</h3>
              <p>
                Continuously improving services with creative and unique travel
                solutions to enhance client experiences.
              </p>
            </article>
          </div>
        </div>
      </section>
      <AboutPlaces />
      <section className="craft" aria-labelledby="craft-heading">
        <div className="wrap">
          <h2 id="craft-heading">Let&apos;s craft your journey</h2>
          <p>
            Ready to take a group out, through Kenya and beyond?
            <br />
            Write to the desk and start planning days built to unwind.
          </p>
          <div className="craft-actions">
            <a href="tel:+254706710371">
              <PhoneIcon />
              Call Us: +254 706 710 371
            </a>
            <a href="mailto:offdutyexplorers@gmail.com">
              <MailIcon />
              Email: offdutyexplorers@gmail.com
            </a>
          </div>
          <div className="craft-card">
            <h3>Where a trip begins</h3>
            <ul>
              <li>
                <PinIcon />
                <span>Lamu, Kenya and Arusha, Tanzania</span>
              </li>
              <li>
                <PhoneIcon />
                <a href="tel:+254706710371">+254 706 710 371</a>
              </li>
              <li>
                <MailIcon />
                <a href="mailto:offdutyexplorers@gmail.com">
                  offdutyexplorers@gmail.com
                </a>
              </li>
              <li>
                <GlobeIcon />
                <span>Kenya and beyond, after a place is walked</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.6" y="3.2" width="12.8" height="9.6" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.2 4.2 8 8.6l5.8-4.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4.2 2.6h2.1l.8 2.2-1.3 1a8 8 0 0 0 3.4 3.4l1-1.3 2.2.8v2.1c0 .6-.5 1.1-1.1 1.1A9.4 9.4 0 0 1 3.1 3.7c0-.6.5-1.1 1.1-1.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 14.2S3.4 9.6 3.4 6.4a4.6 4.6 0 0 1 9.2 0c0 3.2-4.6 7.8-4.6 7.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="6.3" r="1.3" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="8" cy="8" rx="2.4" ry="5.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.6 8h10.8M3.4 5.2h9.2M3.4 10.8h9.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="1.1" fill="currentColor" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="9.2" cy="11" r="1.1" fill="currentColor" />
      <circle cx="16.8" cy="11" r="1.1" fill="currentColor" />
      <path
        d="M8.6 15.2c1.1 1.6 2.4 2.3 4.4 2.3s3.3-.7 4.4-2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M4 13.2 8.2 9.4l3.2 2.6 2.2-2 4.2 3.2 4.2-3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 9.4 7 14.8l4.4 3.4 2.2-1.8 2.4 1.8 4.2-3.2-.8-5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M9.2 6.2 4.8 8v11.2l4.4-1.8 6.2 2.2 5.8-2.2V6.4l-5.8 1.8-6.2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.2 6.2v11.2M15.4 8.2v11.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M18.8 6.4C11 6.2 7 10.4 6.6 18.2c6.2.2 10.6-2.6 12.2-11.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.2 15.6c2.2-1.4 4.2-3.4 5.6-6.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M10 16.2a4.6 4.6 0 1 1 6 0c-.6.6-1 1.4-1 2.2h-4c0-.8-.4-1.6-1-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M11.2 20.2h3.6M12 21.8h2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PinMarkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M13 22.5S6.2 15.6 6.2 11a6.8 6.8 0 0 1 13.6 0c0 4.6-6.8 11.5-6.8 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="13" cy="10.8" r="2" fill="currentColor" />
    </svg>
  );
}

function PeopleMarkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="9.4" cy="8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.8" cy="9" r="1.9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.4 19.4c.8-3.2 3.1-4.8 5.2-4.8s4.4 1.6 5.2 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M15.4 15.2c1.6-.3 3.2.4 4.2 2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M8 18.5h10l-1.2-2.2V11a3.8 3.8 0 0 0-7.6 0v5.3L8 18.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M11.2 18.5a1.8 1.8 0 0 0 3.6 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 6.2V4.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="10" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.2 13.6 8 21.2l5-2.4 5 2.4-1.2-7.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d="M2.2 11S5.6 5.8 11 5.8 19.8 11 19.8 11 16.4 16.2 11 16.2 2.2 11 2.2 11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="11" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
