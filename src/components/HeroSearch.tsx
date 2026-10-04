"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const PRICE_MIN = 20000;
const PRICE_MAX = 500000;
const services = ["Packages", "Group trips", "Day trips"];

export function HeroSearch() {
  const router = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);
  const [service, setService] = useState(services[0]);
  const [where, setWhere] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState("1");
  const [price, setPrice] = useState(PRICE_MAX);

  const fill = ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function openDate() {
    const input = dateRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        input.focus();
      }
    }
    input.focus();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({
      service,
      where,
      date,
      people: pax || "1",
      maxPrice: String(price),
    });
    router.push(`/plan?${params.toString()}`);
  }

  return (
    <form className="hero-search" onSubmit={onSubmit}>
      <label className="search-field">
        <span className="search-label">
          <SearchIcon />
          Service type
        </span>
        <span className="search-control">
          <select
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            {services.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </span>
      </label>

      <label className="search-field">
        <span className="search-label">
          <PinIcon />
          Destination
        </span>
        <span className="search-control">
          <input
            value={where}
            onChange={(event) => setWhere(event.target.value)}
            placeholder="Where to?"
            list="destinations"
            autoComplete="off"
          />
          <datalist id="destinations">
            <option value="Arusha, Tanzania" />
            <option value="Lamu, Kenya" />
            <option value="Kenya" />
          </datalist>
        </span>
      </label>

      <label className="search-field search-field-date">
        <span className="search-label">
          <CalendarIcon />
          Date
        </span>
        <span className="search-control">
          <input
            readOnly
            value={formatDate(date)}
            placeholder="dd - mm - yyyy"
            onClick={openDate}
          />
          <button
            type="button"
            className="search-calendar"
            aria-label="Choose a date"
            onClick={openDate}
          >
            <CalendarIcon />
          </button>
          <input
            ref={dateRef}
            className="search-date-native"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            tabIndex={-1}
          />
        </span>
      </label>

      <label className="search-field search-field-pax">
        <span className="search-label">
          <PersonIcon />
          Pax
        </span>
        <span className="search-control">
          <input
            type="number"
            min={1}
            max={60}
            value={pax}
            onChange={(event) => setPax(event.target.value)}
          />
        </span>
      </label>

      <label className="search-field search-field-price">
        <span className="search-label">
          <MarkIcon />
          Max price
        </span>
        <span className="search-control price-control">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10000}
            value={price}
            style={{ ["--fill" as string]: `${fill}%` }}
            aria-valuetext={`KES ${price.toLocaleString("en-KE")}`}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
          <span className="price-value">
            KES {price.toLocaleString("en-KE")}
          </span>
        </span>
      </label>

      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return "";
  return `${day} - ${month} - ${year}`;
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.2 9.2 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 12.2S2.6 8.3 2.6 5.5a4.4 4.4 0 0 1 8.8 0c0 2.8-4.4 6.7-4.4 6.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="7" cy="5.4" r="1.3" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="1.8" y="2.6" width="10.4" height="9.2" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.8 5.6h10.4M4.4 1.6v2.2M9.6 1.6v2.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="4.4" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.8 12.1c.6-2.2 2.2-3.3 4.2-3.3s3.6 1.1 4.2 3.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1.6v10.8M9.6 3.4H5.7a1.8 1.8 0 0 0 0 3.6h2.6a1.8 1.8 0 0 1 0 3.6H4.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
