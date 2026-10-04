import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Write to Offduty Explorers about a group journey in Kenya and beyond.",
};

export default function ContactPage() {
  return (
    <>
      <header className="page-intro">
        <div className="wrap">
          <p className="eyebrow">Contact Us</p>
          <h1>A note to the desk.</h1>
          <p className="lede">
            Offduty Explorers was cofounded by Kibandi Esther. Write with a
            question about the company, or about taking a group out to unwind.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="wrap plan-layout">
          <ContactForm />
          <aside className="aside-card">
            <h2>Planning a group trip</h2>
            <p>
              A journey still starts with who is coming, and when. Use the
              trip form when you already have a place and a group in mind.
            </p>
            <Link className="btn" href="/plan">
              Plan a trip
            </Link>
            <ol className="aside-list">
              <li>
                <strong>Already walked</strong>
                Lamu, on the Kenyan coast, and Arusha, in northern Tanzania.
              </li>
              <li>
                <strong>What this page does</strong>
                It prepares your note. It does not send mail on its own.
              </li>
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
