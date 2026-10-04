import { Gallery } from "@/components/Gallery";
import { destinations, getDestination, planHref } from "@/data/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination" };
  return {
    title: `${destination.name}, ${destination.country}`,
    description: destination.summary,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <>
      <section className="banner">
        <Image
          src={destination.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="banner-scrim" />
        <div className="banner-copy">
          <p className="crumbs">
            <Link href="/destinations">Destinations</Link>
            <span aria-hidden="true">/</span>
            <span>
              {destination.name}, {destination.country}
            </span>
          </p>
          <p className="eyebrow on-dark">Explored</p>
          <h1>
            {destination.name}, {destination.country}
          </h1>
          <p className="lede">{destination.summary}</p>
        </div>
      </section>
      <article>
        <div className="wrap detail">
          <div className="story">
            {destination.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="facts">
            <h2>The shape of it</h2>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>Explored with a group</dd>
              </div>
              <div>
                <dt>Place</dt>
                <dd>
                  {destination.name}, {destination.country}
                </dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{destination.placeLabel}</dd>
              </div>
              <div>
                <dt>Pace</dt>
                <dd>Unhurried, hosted together</dd>
              </div>
            </dl>
            <Link className="btn" href={planHref(destination.slug)}>
              Plan this trip
            </Link>
          </aside>
        </div>
        <div className="wrap">
          <h2 style={{ fontSize: "2rem", marginBottom: 8 }}>How the days feel</h2>
          <ol className="days">
            {destination.days.map((day, index) => (
              <li key={day.title}>
                <p className="step-no">0{index + 1}</p>
                <div>
                  <h3>{day.title}</h3>
                  <p>{day.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Gallery images={destination.gallery} />
      </article>
    </>
  );
}
