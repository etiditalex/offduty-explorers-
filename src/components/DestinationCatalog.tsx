"use client";

import { DetailDialog } from "@/components/DetailDialog";
import {
  destinationCards,
  formatKes,
  stayCards,
  type DestinationCard,
} from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const PRICE_MIN = 5000;
const PRICE_MAX = 1000000;

type Kind = "destination" | "hotel";

type Listing = DestinationCard & {
  kind: Kind;
  badge: string;
};

const listings: Listing[] = [
  ...destinationCards.map((card) => ({
    ...card,
    kind: "destination" as const,
    badge: "Explored",
  })),
  ...stayCards.map((card) => ({
    ...card,
    kind: "hotel" as const,
    badge: "Shared stay",
  })),
];

export function DestinationCatalog() {
  const [kind, setKind] = useState<"all" | Kind>("all");
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState(PRICE_MAX);
  const [open, setOpen] = useState<Listing | null>(null);

  const fill = ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return listings.filter((item) => {
      if (kind !== "all" && item.kind !== kind) return false;
      if (item.price > price) return false;
      if (!needle) return true;
      return `${item.title} ${item.place} ${item.emphasis}`
        .toLowerCase()
        .includes(needle);
    });
  }, [kind, query, price]);

  return (
    <section className="catalog">
      <header className="catalog-hero">
        <div className="wrap">
          <h1>Discover your next journey</h1>
          <p>Hotels and destinations Offduty Explorers has already walked.</p>
        </div>
      </header>
      <div className="wrap-wide catalog-layout">
        <form className="catalog-filters" role="search" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span className="search-label">
              <FilterIcon />
              Service type
            </span>
            <span className="search-control">
              <select
                value={kind}
                onChange={(event) => setKind(event.target.value as "all" | Kind)}
                aria-label="Service type"
              >
                <option value="all">All</option>
                <option value="destination">Destinations</option>
                <option value="hotel">Hotels</option>
              </select>
            </span>
          </label>
          <label>
            <span className="search-label">
              <SearchIcon />
              Destination
            </span>
            <span className="search-control">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search destination..."
                aria-label="Destination"
                autoComplete="off"
              />
            </span>
          </label>
          <label>
            <span className="search-label">
              <SlidersIcon />
              Max price (KES)
            </span>
            <span className="price-control catalog-price">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={5000}
                value={price}
                aria-valuetext={`${formatPrice(price)} Kenyan shillings`}
                style={{ ["--fill" as string]: `${fill}%` }}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </span>
            <span className="catalog-price-scale">
              <span>KES 5k</span>
              <strong>{formatPrice(price)}</strong>
              <span>KES 1M</span>
            </span>
          </label>
        </form>
        <div className="catalog-grid">
          {visible.length === 0 ? (
            <p className="catalog-empty">
              Nothing matches that search. Try another place, or set the list
              back to All.
            </p>
          ) : (
            visible.map((item) => (
              <article
                className="dest-card"
                key={`${item.kind}-${item.slug}-${item.title}`}
              >
                <Link
                  href={`/destinations/${item.slug}`}
                  className="dest-card-media"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 900px) 34vw, 100vw"
                  />
                  {item.kind === "destination" ? (
                    <span className="dest-badge">{item.badge}</span>
                  ) : null}
                </Link>
                <div className="dest-card-body">
                  <h3>
                    <Link href={`/destinations/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="dest-meta">
                    <span>
                      <PinIcon />
                      {item.place}
                    </span>
                    <span>
                      {item.kind === "hotel" ? <BedIcon /> : <PeopleIcon />}
                      {item.group}
                    </span>
                  </p>
                  <p className="dest-kicker">{item.kicker}</p>
                  <p className="dest-emphasis">{item.emphasis}</p>
                  <p className="dest-price">
                    <span>Price</span>
                    {formatKes(item.price)}
                  </p>
                  <button
                    className="btn dest-card-btn"
                    type="button"
                    onClick={() => setOpen(item)}
                  >
                    View details
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
      {open ? (
        <DetailDialog
          card={open}
          badge={open.badge}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}

function formatPrice(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M2 3h10L8.2 7.4V11L5.8 12V7.4L2 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="6.2" cy="6.2" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.8 8.8 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2 4h10M2 10h10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="5" cy="4" r="1.4" fill="#fff" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="10" r="1.4" fill="#fff" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 12.2S2.8 8.4 2.8 5.6a4.2 4.2 0 0 1 8.4 0c0 2.8-4.2 6.6-4.2 6.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="5.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="5" cy="4.2" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9.2" cy="4.6" r="1.3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.8 11.2c.4-1.8 1.8-2.7 3.2-2.7s2.8.9 3.2 2.7M8.2 8.7c1.1-.2 2.2.2 2.8 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M1.6 11.2V6.2M1.6 8.2h10.8v3M12.4 8.2V5.4H7.2v2.8M3.4 6.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
