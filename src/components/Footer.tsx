import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Image
            src="/logo.jpg"
            alt="Offduty Explorers"
            width={84}
            height={84}
          />
          <p>
            Group journeys to unwind, through Kenya and beyond. The days are
            hosted, shared, and left with enough quiet to actually arrive.
          </p>
        </div>
        <div>
          <h2>Visit</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/destinations">Destinations</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/plan">Plan a trip</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Already walked</h2>
          <ul>
            <li>
              <Link href="/destinations/arusha">Arusha, Tanzania</Link>
            </li>
            <li>
              <Link href="/destinations/lamu">Lamu, Kenya</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} Offduty Explorers</p>
        <p>Cofounded by Kibandi Esther</p>
      </div>
    </footer>
  );
}
