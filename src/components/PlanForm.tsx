"use client";

import { destinationOptions, monthOptions } from "@/data/site";
import { FormEvent, useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "phone" | "people", string>>;

type Props = {
  destination: string;
  month: string;
  people: string;
  where?: string;
  date?: string;
  service?: string;
  maxPrice?: string;
};

export function PlanForm({
  destination,
  month,
  people,
  where = "",
  date = "",
  service = "",
  maxPrice = "",
}: Props) {
  const [done, setDone] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const safeDestination = resolveDestination(destination, where);
  const safeMonth = resolveMonth(month, date);
  const searchNote = searchDetails({ where, date, service, maxPrice });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const place = String(form.get("destination") ?? "");
    const when = String(form.get("month") ?? "");
    const group = String(form.get("people") ?? "").trim();
    const note = String(form.get("note") ?? "").trim();
    const nextErrors: Errors = {};

    if (name.length < 2) nextErrors.name = "Enter the name we should use.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (phone && phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Enter a phone number we can actually dial.";
    }
    const count = Number(group);
    if (!group || Number.isNaN(count) || count < 1 || count > 60) {
      nextErrors.people = "Enter how many people are coming.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const placeLabel =
      destinationOptions.find((option) => option.value === place)?.label ??
      place;
    const summary = [
      `Group enquiry for Offduty Explorers`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Destination: ${placeLabel}`,
      `When: ${when}`,
      `Group size: ${group}`,
      note ? `Note: ${note}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setDone(summary);
    setCopied(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function resolveDestination(destination: string, where: string) {
  if (destinationOptions.some((option) => option.value === destination)) {
    return destination;
  }
  const value = where.trim().toLowerCase();
  if (value.includes("lamu")) return "lamu";
  if (value.includes("arusha")) return "arusha";
  if (value) return "open";
  return "arusha";
}

function resolveMonth(month: string, date: string) {
  if (monthOptions.includes(month)) return month;
  const index = Number(date.split("-")[1]);
  return index >= 1 && index <= 12 ? monthOptions[index] : "Flexible";
}

function searchDetails({
  where,
  date,
  service,
  maxPrice,
}: {
  where: string;
  date: string;
  service: string;
  maxPrice: string;
}) {
  const lines = [
    service ? `Service: ${service}` : "",
    where ? `Searched for: ${where}` : "",
    date ? `Date: ${date.split("-").reverse().join(" - ")}` : "",
    maxPrice
      ? `Max price: KES ${Number(maxPrice).toLocaleString("en-KE")}`
      : "",
  ];
  return lines.filter(Boolean).join("\n");
}

async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(done);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (done) {
    return (
      <div className="form-card success">
        <h2 ref={headingRef} tabIndex={-1}>
          The enquiry is ready
        </h2>
        <p>
          Thank you. This is the note for the Offduty desk. Copy it and send it
          across, and Esther’s side will shape the days from here.
        </p>
        <pre className="enquiry">{done}</pre>
        <button className="btn" type="button" onClick={copyEnquiry}>
          {copied ? "Copied" : "Copy enquiry"}
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>Tell us who is coming</h2>
      <p className="form-note">Fields marked with * are required.</p>
      <div className="form-grid">
        <label className="field">
          <span>Full name *</span>
          <input name="name" autoComplete="name" required />
          {errors.name ? <small className="field-error">{errors.name}</small> : null}
        </label>
        <div className="form-row">
          <label className="field">
            <span>Email *</span>
            <input name="email" type="email" autoComplete="email" required />
            {errors.email ? (
              <small className="field-error">{errors.email}</small>
            ) : null}
          </label>
          <label className="field">
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" />
            {errors.phone ? (
              <small className="field-error">{errors.phone}</small>
            ) : null}
          </label>
        </div>
        <div className="form-row">
          <label className="field">
            <span>Destination *</span>
            <select name="destination" defaultValue={safeDestination}>
              {destinationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>When *</span>
            <select name="month" defaultValue={safeMonth}>
              {monthOptions.map((monthName) => (
                <option key={monthName} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="field">
          <span>Group size *</span>
          <input
            name="people"
            type="number"
            min={1}
            max={60}
            defaultValue={people || "1"}
            required
          />
          {errors.people ? (
            <small className="field-error">{errors.people}</small>
          ) : null}
        </label>
        <label className="field">
          <span>What kind of days do you want?</span>
          <textarea
            name="note"
            maxLength={600}
            defaultValue={searchNote}
            placeholder="A slow coast, time in town, a park day if the group wants it."
          />
        </label>
        <button className="btn" type="submit">
          Prepare enquiry
        </button>
      </div>
    </form>
  );
}
