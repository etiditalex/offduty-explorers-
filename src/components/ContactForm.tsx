"use client";

import { FormEvent, useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export function ContactForm() {
  const [done, setDone] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

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
    if (message.length < 8) {
      nextErrors.message = "Write a short note so we know how to help.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const summary = [
      "Note for Offduty Explorers",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    setDone(summary);
    setCopied(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function copyNote() {
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
          The note is ready
        </h2>
        <p>
          Thank you. Copy this and send it to the Offduty desk. Nothing is
          emailed from this page.
        </p>
        <pre className="enquiry">{done}</pre>
        <button className="btn" type="button" onClick={copyNote}>
          {copied ? "Copied" : "Copy note"}
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>Write to the desk</h2>
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
        <label className="field">
          <span>Message *</span>
          <textarea
            name="message"
            maxLength={800}
            required
            placeholder="A question about a group trip, a place, or the company."
          />
          {errors.message ? (
            <small className="field-error">{errors.message}</small>
          ) : null}
        </label>
        <button className="btn" type="submit">
          Prepare note
        </button>
      </div>
    </form>
  );
}
