"use client";

import { DetailDialog } from "@/components/DetailDialog";
import { useScrollSlide } from "@/components/useScrollSlide";
import { formatKes, stayCards, type DestinationCard } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function StayCarousel() {
  const { sectionRef, trackRef } = useScrollSlide();
  const [open, setOpen] = useState<DestinationCard | null>(null);

  return (
    <section
      className="section dest-section"
      aria-labelledby="stays-heading"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="dest-head">
          <h2 id="stays-heading">Featured hotels</h2>
          <p>Stays on the journeys already walked, quiet enough for a group to unwind.</p>
        </div>
        <div className="dest-stage">
          <div className="dest-track" ref={trackRef} aria-label="Featured hotels">
            {stayCards.map((card) => (
              <article className="dest-card" key={`${card.slug}-${card.title}`}>
                <Link href={`/destinations/${card.slug}`} className="dest-card-media">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 900px) 30vw, 100vw"
                  />
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
                      <BedIcon />
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
        <DetailDialog card={open} badge="Shared stay" onClose={() => setOpen(null)} />
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
