"use client";

import { EnquireDialog } from "@/components/EnquireDialog";
import { formatKes, getDestination, type DestinationCard } from "@/data/site";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type Props = {
  card: DestinationCard;
  badge: string;
  onClose: () => void;
};

export function DetailDialog({ card, badge, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const destination = getDestination(card.slug);
  const photos = destination?.gallery ?? [{ src: card.image, alt: card.alt }];
  const start = Math.max(
    0,
    photos.findIndex((photo) => photo.src === card.image),
  );
  const [active, setActive] = useState(start);
  const [enquire, setEnquire] = useState(false);
  const photo = photos[active] ?? photos[0];

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const enquireRef = useRef(false);
  enquireRef.current = enquire;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (enquireRef.current) {
        setEnquire(false);
        return;
      }
      onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="detail-modal" onClick={onClose}>
      <div
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="detail-photos">
          <div className="detail-main">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 760px) 46vw, 100vw" />
          </div>
          <div className="detail-thumbs">
            {photos.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={index === active ? "is-active" : undefined}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                <Image src={item.src} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <button
            ref={closeRef}
            className="detail-close"
            type="button"
            aria-label="Close details"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
          <p className="detail-badge">{badge}</p>
          <h2 id={titleId}>{card.title}</h2>
          <p className="detail-pills">
            <span>
              <PinIcon />
              {card.place}
            </span>
            <span>
              <PeopleIcon />
              {card.group}
            </span>
          </p>
          <h3>Overview</h3>
          <p className="detail-overview">{card.overview}</p>
          <p className="detail-included">
            <CheckIcon />
            {card.included}
          </p>
          <div className="detail-price">
            <span>Total price</span>
            <strong>{formatKes(card.price)}</strong>
          </div>
          <button className="btn btn-gold" type="button" onClick={() => setEnquire(true)}>
            Book / Enquire now
          </button>
        </div>
      </div>
      {enquire ? <EnquireDialog card={card} onClose={() => setEnquire(false)} /> : null}
    </div>
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
        d="M1.8 11.2c.4-1.8 1.8-2.7 3.2-2.7s2.8.9 3.2 2.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5.2 9.2 7.6 11.5 12.8 6.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
