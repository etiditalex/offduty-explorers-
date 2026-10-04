"use client";

import { HeroSearch } from "@/components/HeroSearch";
import { heroSlides } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, [paused]);

  function go(direction: number) {
    setIndex(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured journeys"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setPaused(false);
        }
      }}
    >
      {heroSlides.map((item, itemIndex) => (
        <div
          key={item.title}
          className={
            itemIndex === index ? "hero-slide is-active" : "hero-slide"
          }
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={itemIndex === 0}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="hero-scrim" />
      <div className="hero-copy">
        <h1 className="hero-title">{slide.title}</h1>
        <p className="hero-lede">{slide.description}</p>
        <Link className="btn" href={slide.href}>
          {slide.cta}
        </Link>
      </div>
      <button
        type="button"
        className="hero-arrow prev"
        aria-label="Previous slide"
        onClick={() => go(-1)}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        className="hero-arrow next"
        aria-label="Next slide"
        onClick={() => go(1)}
      >
        <Chevron direction="right" />
      </button>
      <HeroSearch />
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d={direction === "left" ? "M11 3.5 5.5 9 11 14.5" : "M7 3.5 12.5 9 7 14.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
