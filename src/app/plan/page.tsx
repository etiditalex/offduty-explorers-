import { PlanForm } from "@/components/PlanForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan a trip",
  description:
    "Tell Offduty Explorers who is coming. Group trips through Kenya and beyond are shaped around the people travelling.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function PlanPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <header className="page-intro">
        <div className="wrap">
          <p className="eyebrow">Plan a trip</p>
          <h1>Bring the group. We will shape the days.</h1>
          <p className="lede">
            Routes are made for the people travelling. There is no fixed price
            list on this page, because a coast week and a northern Tanzania
            week are not the same trip.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="wrap plan-layout">
          <PlanForm
            destination={readParam(params.destination)}
            month={readParam(params.month)}
            people={readParam(params.people)}
            where={readParam(params.where)}
            date={readParam(params.date)}
            service={readParam(params.service)}
            maxPrice={readParam(params.maxPrice)}
          />
          <aside className="aside-card">
            <h2>What happens next</h2>
            <ol className="aside-list">
              <li>
                <strong>You tell us who is coming</strong>
                Place, month, and the size of the group.
              </li>
              <li>
                <strong>Esther shapes a route</strong>
                Room for meals, walks, and rest. Parks or boats only where
                they belong.
              </li>
              <li>
                <strong>The group travels together</strong>
                Kenya and beyond, at a pace built to unwind.
              </li>
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
