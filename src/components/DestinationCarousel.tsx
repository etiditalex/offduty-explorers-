"use client";

import { DetailDialog } from "@/components/DetailDialog";
import { useScrollSlide } from "@/components/useScrollSlide";
import { destinationCards, formatKes, type DestinationCard } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function DestinationCarousel() {
  const { sectionRef, trackRef } = useScrollSlide();
  const [open, setOpen] = useState<DestinationCard | null>(null);

  return (
    <section
      className="section dest-section"
      aria-labelledby="walked-heading"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="dest-head">
          <h2 id="walked-heading">The destinations</h2>
          <p>Group journeys Offduty Explorers has walked, in Kenya and beyond.</p>
        </div>
        <div className="dest-stage">
          <div className="dest-track" ref={trackRef} aria-label="Explored places">
            {destinationCards.map((card) => (
              <article
                className="dest-card"
                key={`${card.slug}-${card.title}`}
              >
                <Link
                  href={`/destinations/${card.slug}`}
                  className="dest-card-media"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 900px) 30vw, 100vw"
                  />
                  <span className="dest-badge">Explored</span>
                </Link>
                <div className="dest-card-body">
                  <h3>
                    <Link href={`/destinations/${card.slug}`}>{card.title}</Link>
                  </h3>
                  <p className="dest-meta">
                    <span>
                      <PinIcon />
                      {card.place}
                    </span>
                    <span>
                      <PeopleIcon />
                      {card.group}
                    </span>
                  </p>
                  <p className="dest-kicker">{card.kicker}</p>
                  <p className="dest-emphasis">{card.emphasis}</p>
                  <p className="dest-price">
                    <span>Price</span>
                    {formatKes(card.price)}
                  </p>
                  <button
                    className="btn dest-card-btn"
                    type="button"
                    onClick={() => setOpen(card)}
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      {open ? (
        <DetailDialog card={open} badge="Explored" onClose={() => setOpen(null)} />
      ) : null}
    </section>
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
