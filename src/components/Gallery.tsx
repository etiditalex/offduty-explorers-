"use client";

import type { GalleryImage } from "@/data/site";
import Image from "next/image";
import { useState } from "react";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="gallery">
      <div className="wrap">
        <h2>A look at the place</h2>
        <div className="gallery-main">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 900px) 1120px, 100vw"
          />
        </div>
        <div className="thumbs">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={index === active ? "is-active" : undefined}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <Image src={image.src} alt="" fill sizes="200px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
