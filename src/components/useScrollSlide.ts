"use client";

import { useEffect, useRef } from "react";

export function useScrollSlide() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0 || reduced.matches) {
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      const trackTop = track.getBoundingClientRect().top;
      const view = window.innerHeight;
      const start = view * 0.95;
      const end = view * 0.2;
      const progress = Math.min(1, Math.max(0, (start - trackTop) / (start - end)));
      track.style.transform = `translate3d(${(-progress * max).toFixed(1)}px, 0, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reduced.addEventListener("change", update);
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return { sectionRef, trackRef };
}
