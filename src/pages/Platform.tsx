import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import TrustLogos from "@/components/TrustLogos";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { DemoCta } from "@/components/B2BMarketingPage";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

const LENSES = [
  {
    id: "charts",
    title: "Charts",
    desc: "The market, already visualised. Region, sector, function, headcount and revenue splits, boardroom-ready out of the box. Zero BI tickets, zero dashboard projects.",
    src: "/platform/charts-view.png",
    alt: "Bamboo Reports Account Analytics charts: region and primary nature breakdowns",
  },
  {
    id: "map",
    title: "Map",
    desc: "Watch India's GCC footprint light up. An interactive heatmap drillable from state to city to locality. Every centre geocoded, every account stitched to the places it operates.",
    src: "/platform/centers-map.png",
    alt: "Bamboo Reports Center Analytics map: India heatmap of GCC centres",
  },
  {
    id: "data",
    title: "Data",
    desc: "When it's time to ship the list, drop into the grid. Filter, sort and export the exact slice, straight into your CRM, Excel or analytics stack. No reformatting. No cleanup.",
    src: "/platform/accounts-grid.png",
    alt: "Bamboo Reports data grid view",
  },
];

const WORKFLOWS = [
  {
    title: "Quick search",
    desc: "Reach any account, centre or prospect in two keystrokes. Recent activity, fuzzy match and entity scoping, all without your hands leaving the keyboard.",
    src: "/platform/quick-search.png",
    alt: "Bamboo Reports quick search overlay with recently viewed records",
  },
  {
    title: "Saved filter sets",
    desc: "Build a target query once. Re-run, rename, share or fork it the moment your ICP shifts. Your best queries become reusable assets for your whole team, not throwaway clicks.",
    src: "/platform/saved-filters.png",
    alt: "Bamboo Reports saved filter sets manager",
  },
];

const CAPABILITIES = [
  { title: "Layered filters", desc: "Stack geography, sector, function, size and centre status to carve out the perfect segment in seconds." },
  { title: "Global search", desc: "Reach any account, centre or prospect with a single keystroke. The whole ecosystem at your fingertips." },
  { title: "Table & grid modes", desc: "Scan fast in grid view, analyse deep in table view. Same data, your way of working." },
  { title: "Linked entities", desc: "Accounts, centres, prospects and headcount cross-reference automatically. No reconciliation, no joins." },
  { title: "Clean exports", desc: "Push any slice straight into your CRM, Excel or analytics stack. Always tidy, always ready to ship." },
  { title: "Built centre by centre", desc: "Bottom-up research with 250+ structured data points per GCC centre. Current, centre-level data, not a 12-month-old published report." },
];

const PERSONAS = [
  { name: "GTM leaders & sellers", desc: "Surface ICP-fit accounts, prioritise the right centres and put a clean, ranked target list in every seller's hands every Monday morning." },
  { name: "GCC site & PMO leaders", desc: "Benchmark against the peer set, watch the ecosystem move in real time and walk into your next location decision with conviction." },
  { name: "Staffing, RPO & talent firms", desc: "Reach the right HR and function leaders across every growing centre in India, mapped by role, function and headcount." },
  { name: "CRE, facilities & infra", desc: "See new centres, expansions and relocations weeks before your competitors do, and turn signal into pipeline." },
];

const SectionIntro = ({
  label,
  title,
  children,
}: {
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-sm font-semibold text-accent">{label}</p>
    <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
    <div className="mt-4 max-w-6xl leading-relaxed text-muted-foreground">
      {children}
    </div>
  </div>
);

const Platform = () => {
  useSEO({
    title: "Platform | The Definitive India GCC Intelligence Workspace | Bamboo Reports",
    description:
      "The intelligence layer India's GCC ecosystem was missing. 2,650+ accounts, 6,200+ centres and 250K+ named decision-makers, explorable across charts, map and grid.",
    keywords:
      "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, center analytics",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <FadeIn>
      <section className="px-4 pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <h1 className="text-balance leading-tight">
              <span className="block text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                The entire India GCC universe.
              </span>
              <span className="mt-2 block text-4xl font-extrabold text-primary sm:text-5xl lg:text-6xl">
                One living workspace.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              One workspace where your team scopes accounts, tracks centre-level shifts, and
              pulls decision-maker lists. No more stitching intel together from fragmented
              sources.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="px-7 text-base font-semibold">
                <GoogleCalendarSchedulingButton>
                  Get a demo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </GoogleCalendarSchedulingButton>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-7 text-base font-semibold">
                <a href="#tour">
                  Take the tour
                  <ArrowDown className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md">
            <img
              src="/platform/accounts-grid.png"
              width="1920"
              height="1308"
              alt="Bamboo Reports platform: Account Analytics with filters and grid view"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="border-y px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <TrustLogos />
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section id="tour" className="scroll-mt-24 border-b bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Same data, three lenses"
            title="See the market through charts, map, and data without ever losing your thread."
          >
            <p>
              Every filter follows you across every view. Spot a hotspot on the map, pivot to
              charts for the sector mix, drop into the grid and export the exact target list, in
              under a minute, every time.
            </p>
          </SectionIntro>

          <div className="mt-10">
            {LENSES.map((lens, index) => (
              <div
                key={lens.id}
                className={`grid items-center gap-8 border-t py-10 lg:gap-14 ${
                  index % 2
                    ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
                    : "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
                }`}
              >
                <div className={index % 2 ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-bold">{lens.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{lens.desc}</p>
                </div>
                <div className={`overflow-hidden rounded-md ${index % 2 ? "lg:order-1" : ""}`}>
                  <img
                    src={lens.src}
                    alt={lens.alt}
                    width="1920"
                    height="1308"
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Linked intelligence"
            title={<>We go deeper. Right down to the <span className="text-primary">centre</span>.</>}
          >
            <p>
              Other databases stop at the logo. We don't. Every centre is mapped: its city,
              function, headcount and the leaders sitting inside it, all stitched back to its
              parent account. One click and the entire India footprint is on screen.
            </p>
          </SectionIntro>
          <div className="mt-10 overflow-hidden rounded-md">
            <img
              src="/platform/account-detail.png"
              width="1920"
              height="1308"
              alt="Account detail: 3M Co. with linked centres in Pune, Ahmedabad and Bengaluru"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Account record → linked centres across Pune, Ahmedabad and Bengaluru
          </p>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Operator velocity"
            title="Engineered for the speed your team actually moves at."
          >
            <p>
              Two keystrokes to any record. One click to re-run last quarter's territory list. A
              shared link instead of yet another CSV in someone's inbox. The platform keeps up, so
              your team can stop chasing data and start closing on it.
            </p>
          </SectionIntro>

          <div className="mt-10">
            {WORKFLOWS.map((workflow, index) => (
              <div
                key={workflow.title}
                className={`grid items-center gap-8 border-t py-10 lg:gap-14 ${
                  index % 2
                    ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
                    : "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
                }`}
              >
                <div className={index % 2 ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-bold">{workflow.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{workflow.desc}</p>
                </div>
                <div className={`overflow-hidden rounded-md ${index % 2 ? "lg:order-1" : ""}`}>
                  <img
                    src={workflow.src}
                    alt={workflow.alt}
                    width="1920"
                    height="1308"
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Capabilities"
            title="A workspace your team lives in. Not a report they forget."
          >
            <p>
              Every capability you need to find, qualify, segment and act on the India GCC
              opportunity, in one purpose-built environment.
            </p>
          </SectionIntro>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <div key={capability.title} className="border-t py-6">
                <h3 className="text-lg font-bold">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {capability.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="Who it's for"
            title="One platform. Every team that touches the GCC opportunity."
          >
            <p>
              From the seller building Monday's pipeline to the site head benchmarking against
              peers, Bamboo Reports is the workspace that puts every team on the same
              centre-level picture.
            </p>
          </SectionIntro>

          <div className="mt-10">
            {PERSONAS.map((persona) => (
              <GoogleCalendarSchedulingButton
                key={persona.name}
                className="group grid min-h-20 w-full grid-cols-[1fr_auto] items-center gap-4 border-t px-2 py-6 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-6"
                aria-label={`Get a demo: ${persona.name}`}
              >
                <span>
                  <span className="block text-lg font-bold">{persona.name}</span>
                  <span className="mt-1 block leading-relaxed text-muted-foreground">
                    {persona.desc}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden />
              </GoogleCalendarSchedulingButton>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      <FadeIn>
      <DemoCta title="Start operating on structured GCC intelligence." />
      </FadeIn>

      <Footer showCta={false} />
    </div>
  );
};

export default Platform;
