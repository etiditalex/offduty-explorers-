"use client";

import { useState } from "react";

const places = [
  {
    id: "lamu",
    tab: "Lamu",
    title: "Lamu – the slow coast",
    text: "Lamu Old Town still moves by foot and by boat. The group followed that pace, and rested in it.",
    notes: [
      {
        icon: "pin",
        text: "Walk the old town. Alleys, doors, and the life of the street. The distances are short.",
      },
      {
        icon: "wave",
        text: "Take the water when the tide is right. A dhow, or a quiet hour toward Shela.",
      },
      {
        icon: "sun",
        text: "Shela’s beach sits on the same stretch of coast, wide enough for a group that came to rest.",
      },
      {
        icon: "moon",
        text: "An evening on the waterfront, with nothing owed, and the group staying together.",
      },
    ],
  },
  {
    id: "arusha",
    tab: "Arusha",
    title: "Arusha – the first step beyond",
    text: "The first journey beyond Kenya. Arusha was walked as a place to unwind, not as a stop on the way to somewhere else.",
    notes: [
      {
        icon: "pin",
        text: "The town, slowly. Market, coffee, and the ordinary life most itineraries skip.",
      },
      {
        icon: "wave",
        text: "Arrive, and land the pace. A walk, a meal, a view of the hills. Nothing stacked on the arrival.",
      },
      {
        icon: "sun",
        text: "The wider light. Meru in the distance, and time outside the town.",
      },
      {
        icon: "moon",
        text: "A park day only if the group has asked for one. It is not the only reason to come.",
      },
    ],
  },
  {
    id: "beyond",
    tab: "Beyond",
    title: "Kenya and beyond",
    text: "The list stays honest. A place is added after it has been walked with a group, not before.",
    notes: [
      {
        icon: "pin",
        text: "Come with your people. Friends, family, a team. The days are shared.",
      },
      {
        icon: "wave",
        text: "Name the place. Esther will tell you whether the days can be shaped.",
      },
      {
        icon: "sun",
        text: "The pace stays gentle. Meals run long. Walks are short.",
      },
      {
        icon: "moon",
        text: "Two places are on the books so far: Lamu at home, and Arusha beyond.",
      },
    ],
  },
] as const;

export function AboutPlaces() {
  const [active, setActive] = useState<(typeof places)[number]["id"]>("lamu");
  const place = places.find((item) => item.id === active) ?? places[0];

  return (
    <section className="about-places" aria-labelledby="places-heading">
      <div className="wrap">
        <div className="about-places-head">
          <h2 id="places-heading">Places already walked</h2>
          <p>Lamu in Kenya, Arusha beyond, and a place still waiting to be walked.</p>
          <div className="about-places-tabs" role="tablist" aria-label="Places">
            {places.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === active}
                className={item.id === active ? "is-active" : undefined}
                onClick={() => setActive(item.id)}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>
        <h3>{place.title}</h3>
        <p className="about-places-lede">{place.text}</p>
        <div className="about-places-grid">
          {place.notes.map((note) => (
            <article key={note.text}>
              <NoteIcon name={note.icon} />
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoteIcon({ name }: { name: "pin" | "wave" | "sun" | "moon" }) {
  if (name === "pin") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M11 19S5.2 13.4 5.2 9.2a5.8 5.8 0 0 1 11.6 0c0 4.2-5.8 9.8-5.8 9.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="11" cy="9" r="1.6" fill="currentColor" />
      </svg>
    );
  }
  if (name === "wave") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M2.5 13.5c1.6 0 1.6-2 3.2-2s1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M2.5 17c1.6 0 1.6-2 3.2-2s1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "sun") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <circle cx="11" cy="11" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M11 3.4v2.1M11 16.5v2.1M3.4 11h2.1M16.5 11h2.1M5.6 5.6l1.5 1.5M14.9 14.9l1.5 1.5M16.4 5.6l-1.5 1.5M7.1 14.9l-1.5 1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d="M14.8 4.2a6.4 6.4 0 1 0 3 11.2 5.4 5.4 0 0 1-3-11.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
