import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TRACKER_COMBOS,
  TRACKER_TOP_CITIES,
  TRACKER_TOP_INDUSTRIES,
} from "@/lib/trackerStats";

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-64";

const nf = (n: number) => n.toLocaleString("en-US");
const ANY = "__any__";

// "Find GCCs in your market": the tracked-vs-shown mechanic on the homepage.
// Counts come from a build-time aggregate (top industries x top cities), so
// the widget is instant with no data fetch; the full calculator lives at /gcc.
const FindGccWidget = () => {
  const [industry, setIndustry] = useState(ANY);
  const [city, setCity] = useState(ANY);

  const key = `${industry === ANY ? "" : industry}|${city === ANY ? "" : city}`;
  const combo = TRACKER_COMBOS[key] ?? TRACKER_COMBOS["|"];

  const label = [
    industry === ANY ? "" : industry,
    city === ANY ? "" : `in ${city}`,
  ]
    .filter(Boolean)
    .join(" ") || "All India GCCs";

  const calculatorHref = `/gcc/?${new URLSearchParams({
    ...(industry !== ANY ? { industry } : {}),
    ...(city !== ANY ? { city } : {}),
  }).toString()}`.replace(/\?$/, "");

  return (
    <section className="px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Find GCCs in your market
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Pick an industry and a city to see how much of your market Bamboo
            Reports has already mapped.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <select
              aria-label="Industry"
              className={SELECT_CLASS}
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
            >
              <option value={ANY}>All industries</option>
              {TRACKER_TOP_INDUSTRIES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select
              aria-label="City"
              className={SELECT_CLASS}
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              <option value={ANY}>All cities</option>
              {TRACKER_TOP_CITIES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <p className="text-sm leading-relaxed md:text-base">
              <span className="font-semibold text-foreground">{label}: </span>
              {nf(combo.a)} {combo.a === 1 ? "company" : "companies"}, {nf(combo.c)}{" "}
              {combo.c === 1 ? "centre" : "centres"} and {nf(combo.p)} decision-makers
              tracked in Bamboo Reports. Sign up free to see who they are.
            </p>
            <Button asChild className="mt-4 shrink-0 rounded-full px-6 font-bold md:mt-0">
              <a href="/signup?src=home-find-gcc">Sign up free</a>
            </Button>
          </div>

          <div className="mt-4">
            <a
              href={calculatorHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Open in the full market size calculator
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindGccWidget;
