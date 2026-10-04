"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="header-inner">
        <Link href="/" className="brand">
          <Image
            src="/logo.jpg"
            alt="Offduty Explorers"
            width={74}
            height={74}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="btn header-contact"
          aria-current={isActive("/contact") ? "page" : undefined}
        >
          Contact Us
        </Link>
        <button
          type="button"
          className={open ? "menu-toggle is-open" : "menu-toggle"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span />
          <span />
          <span />
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact Us
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
