import Link from "next/link";

const offers = [
  {
    title: "Group trips",
    text: "Come with your people and unwind.",
    href: "/plan?service=Group+trips",
    icon: "group" as const,
  },
  {
    title: "Packages",
    text: "A route already walked, for the group.",
    href: "/plan?service=Packages",
    icon: "package" as const,
  },
  {
    title: "Day trips",
    text: "One day out, at a quiet pace.",
    href: "/plan?service=Day+trips",
    icon: "day" as const,
  },
];

export function OfferCards() {
  return (
    <section className="section offers" aria-labelledby="offers-heading">
      <div className="wrap">
        <h2 id="offers-heading" className="sr-only">
          Ways to enquire
        </h2>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <span className="offer-icon">
                <OfferIcon name={offer.icon} />
              </span>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
              <Link className="btn btn-gold" href={offer.href}>
                Enquire now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferIcon({ name }: { name: "group" | "package" | "day" }) {
  if (name === "group") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="2.2" />
        <circle cx="16" cy="9.2" r="1.7" />
        <path d="M4.6 18.2c.5-2.5 2.3-3.8 4.4-3.8s3.9 1.3 4.4 3.8" />
        <path d="M13.6 14.8c.7-.4 1.6-.6 2.5-.6 1.5 0 2.8.8 3.4 2.5" />
      </svg>
    );
  }

  if (name === "package") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5.5" y="8" width="13" height="10" rx="1.6" />
        <path d="M9 8V6.6A1.6 1.6 0 0 1 10.6 5h2.8A1.6 1.6 0 0 1 15 6.6V8" />
        <path d="M5.5 12.5h13" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 4.8v1.7M12 17.5v1.7M4.8 12h1.7M17.5 12h1.7M7 7l1.2 1.2M15.8 15.8 17 17M17 7l-1.2 1.2M8.2 15.8 7 17" />
    </svg>
  );
}
