import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap not-found">
      <p className="eyebrow">Missing page</p>
      <h1>That path has not been walked.</h1>
      <p className="lede">
        The page is not on this site. The journeys that are, begin on the
        destinations list.
      </p>
      <Link className="btn" href="/destinations">
        See destinations
      </Link>
    </div>
  );
}
