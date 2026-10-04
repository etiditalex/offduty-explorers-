"use client";

import { formatKes, type DestinationCard } from "@/data/site";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "phone" | "people", string>>;

type Props = {
  card: DestinationCard;
  onClose: () => void;
};

export function EnquireDialog({ card, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("1");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

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
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Errors = {};

    if (name.length < 2) nextErrors.name = "Enter the name we should use.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (phone && phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Enter a phone number we can actually dial.";
    }
    const count = Number(people);
    if (!people || Number.isNaN(count) || count < 1 || count > 60) {
      nextErrors.people = "Enter how many people are coming.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const summary = [
      `Package enquiry for Offduty Explorers`,
      `Package: ${card.title}`,
      `Place: ${card.place}`,
      `Price: ${formatKes(card.price)}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      date ? `Preferred date: ${formatDate(date)}` : null,
      `Number of pax: ${people}`,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setDone(summary);
    setCopied(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(done);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="enquire-modal" onClick={onClose}>
      <div
        className="enquire-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="enquire-close"
          type="button"
          aria-label="Close enquiry"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        {done ? (
          <div className="enquire-done">
            <h2 id={titleId} ref={headingRef} tabIndex={-1}>
              The enquiry is ready
            </h2>
            <p>
              Copy this note and send it across. Nothing is emailed from this
              page. Esther’s side will shape the days from here.
            </p>
            <pre>{done}</pre>
            <button className="btn enquire-send" type="button" onClick={copyEnquiry}>
              {copied ? "Copied" : "Copy enquiry"}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id={titleId}>Enquire About Package</h2>
            <p className="enquire-lead">
              Fill in the details below and we’ll prepare a custom quote.
            </p>
            <label>
              <span>Full name</span>
              <input name="name" autoComplete="name" required />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <div className="enquire-row">
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
                {errors.email ? <small>{errors.email}</small> : null}
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
                {errors.phone ? <small>{errors.phone}</small> : null}
              </label>
            </div>
            <div className="enquire-row">
              <label>
                <span>Preferred travel date</span>
                <span className="enquire-date">
                  <input
                    readOnly
                    value={formatDate(date)}
                    placeholder="dd - mm - yyyy"
                    onClick={openDate}
                  />
                  <button type="button" aria-label="Choose a date" onClick={openDate}>
                    <CalendarIcon />
                  </button>
                  <input
                    ref={dateRef}
                    className="enquire-date-native"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    tabIndex={-1}
                  />
                </span>
              </label>
              <label>
                <span>Number of pax</span>
                <input
                  name="people"
                  type="number"
                  min={1}
                  max={60}
                  value={people}
                  onChange={(event) => setPeople(event.target.value)}
                  required
                />
                {errors.people ? <small>{errors.people}</small> : null}
              </label>
            </div>
            <label>
              <span>Additional message</span>
              <textarea name="message" rows={4} maxLength={600} />
            </label>
            <button className="btn enquire-send" type="submit">
              <PlaneIcon />
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";
  return `${day} - ${month} - ${year}`;
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="2" y="3.2" width="12" height="10.2" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6.4h12M5.2 2v2.4M10.8 2v2.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M14.2 2.4 7.1 13.2l-1.5-4.2-4.2-1.5L14.2 2.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M5.6 9 9.4 5.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
