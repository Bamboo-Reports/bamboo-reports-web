import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GCC_TRACKER_ENABLED } from "@/lib/featureFlags";

const WhatIsGccIntelligence = () => (
  <section className="border-t bg-secondary/30 px-4 py-14 md:py-20">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <div>
        <h2 className="max-w-lg text-3xl font-bold leading-tight md:text-4xl">
          What is GCC intelligence?
        </h2>
        <p className="mt-4 max-w-sm text-muted-foreground">
          A quick primer on the market Bamboo Reports tracks every day.
        </p>
        {GCC_TRACKER_ENABLED && (
          <Link
            to="/gcc"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Explore the India GCC directory
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>

      <div>
        <p className="text-pretty text-lg font-medium leading-relaxed text-foreground md:text-xl">
          GCC Intelligence is the structured, data-driven understanding of
          Global Capability Centers (GCCs), also known as Global In-house
          Centers (GICs).
        </p>
        <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
          These centers are the offshore operations of multinational companies,
          handling a wide range of strategic, operational, and
          innovation-driven functions.
        </p>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold">Why India leads</h3>
          <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
            India has become a key destination for these centers, thanks to its
            talent density, mature ecosystems, and infrastructure. The role of
            GCCs has expanded well beyond cost efficiency to driving
            innovation, agility, and business continuity.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIsGccIntelligence;
