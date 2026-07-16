import { Link } from "react-router-dom";
import { coverGradient } from "@/lib/coverGradients";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DemoCta, MarketingHero } from "@/components/B2BMarketingPage";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const interestingReads = [
  {
    to: "/reads/agentic-enterprise",
    title: "The Agentic Enterprise",
    summary:
      "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
    label: "Whitepaper",
  },
];

const Resources = () => {
  useSEO({
    title: "Resources | Bamboo Reports",
    description: "Explore the latest guides and insights from Bamboo Reports in one place.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero
          showAction={false}
          title={<><span className="block">Resources.</span><span className="block text-primary">Intelligence you can use.</span></>}
          description={<p>Guides and data-driven insights from the team building India's GCC intelligence layer.</p>}
        />

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">Resources</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Reports</h2>
              </div>
              <Button variant="outline" asChild>
                <Link to="/reports">View all</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/reports/india-gcc-report-q1-fy27"
                className="group overflow-hidden rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className={`relative flex aspect-video flex-col justify-end overflow-hidden p-6 ${coverGradient(0).base}`}>
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${coverGradient(0).hover}`}
                    aria-hidden
                  />
                  <div
                    className="gradient-noise pointer-events-none absolute inset-0 opacity-[0.06]"
                    aria-hidden
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold text-foreground">Quarterly report</p>
                    <h3 className="mt-2 text-lg font-bold leading-tight text-navy">The Q1 FY27 India GCC report</h3>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
                      <div className="overflow-hidden">
                        <p className="pt-2 text-sm leading-relaxed text-muted-foreground opacity-0 blur-[5px] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-hover:blur-none group-focus-visible:opacity-100 group-focus-visible:blur-none motion-reduce:blur-none motion-reduce:transition-none">
                          A centre-level read of who entered, who expanded, and where the next buying windows are opening.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-accent">Resources</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Interesting reads</h2>
              </div>
              <Button variant="outline" asChild>
                <Link to="/reads">View all</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {interestingReads.map((read, index) => (
                <Link
                  key={read.to}
                  to={read.to}
                  className="group overflow-hidden rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className={`relative flex aspect-video flex-col justify-end overflow-hidden p-6 ${coverGradient(index + 1).base}`}>
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${coverGradient(index + 1).hover}`}
                      aria-hidden
                    />
                    <div
                      className="gradient-noise pointer-events-none absolute inset-0 opacity-[0.06]"
                      aria-hidden
                    />
                    <div className="relative">
                      <p className="text-xs font-semibold text-foreground">{read.label}</p>
                      <h3 className="mt-2 text-lg font-bold leading-tight text-navy">{read.title}</h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
                        <div className="overflow-hidden">
                          <p className="pt-2 text-sm leading-relaxed text-muted-foreground opacity-0 blur-[5px] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:opacity-100 group-hover:blur-none group-focus-visible:opacity-100 group-focus-visible:blur-none motion-reduce:blur-none motion-reduce:transition-none">
                            {read.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <DemoCta title="Put GCC intelligence to work for your team." />

      <Footer showCta={false} />
    </div>
  );
};

export default Resources;
