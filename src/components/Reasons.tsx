const reasons = [
  {
    title: "24/7 Support",
    text: "Our team is always available to help you.",
    icon: "clock" as const,
  },
  {
    title: "Best Prices",
    text: "We negotiate the best deals for our clients.",
    icon: "award" as const,
  },
  {
    title: "Local Expertise",
    text: "In-depth knowledge of all our destinations.",
    icon: "headset" as const,
  },
];

export function Reasons() {
  return (
    <section className="section reasons" aria-labelledby="reasons-heading">
      <div className="wrap">
        <div className="reason-head">
          <h2 id="reasons-heading">Why Choose Us</h2>
          <p>Providing the best travel experiences since 2010</p>
        </div>
        <div className="reason-grid">
          {reasons.map((reason) => (
            <article className="reason-card" key={reason.title}>
              <span className="reason-icon">
                <ReasonIcon name={reason.icon} />
              </span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonIcon({ name }: { name: "clock" | "award" | "headset" }) {
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.2" />
        <path d="M12 8.2V12l2.8 1.8" />
      </svg>
    );
  }

  if (name === "award") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="9" r="4.2" />
        <path d="M9.2 12.4 8 19.2l4-2.1 4 2.1-1.2-6.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13a7 7 0 0 1 14 0" />
      <rect x="3.6" y="13" width="3.2" height="6.2" rx="1.4" />
      <rect x="17.2" y="13" width="3.2" height="6.2" rx="1.4" />
    </svg>
  );
}
