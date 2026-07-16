import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MarketingHero } from "@/components/B2BMarketingPage";
import {
  FeaturedResourceRow,
  ResourceCard,
  type ResourceItem,
} from "@/components/ResourceCards";
import { useSEO } from "@/hooks/useSEO";

const reads: ResourceItem[] = [
  {
    to: "/reads/agentic-enterprise",
    label: "Whitepaper",
    title: "The Agentic Enterprise",
    summary:
      "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
    gradientIndex: 1,
  },
];

const [latestRead, ...earlierReads] = reads;

const Reads = () => {
  useSEO({
    title: "Interesting Reads | Bamboo Reports",
    description:
      "Whitepapers and long-form reads on the ideas shaping the enterprise, curated for senior leaders by Bamboo Reports.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <MarketingHero showAction={false} title="Interesting reads" />

        <FadeIn>
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold text-accent">Latest read</p>
              <div className="mt-6">
                <FeaturedResourceRow item={latestRead} cta="Get the whitepaper" />
              </div>

              {earlierReads.length > 0 && (
                <>
                  <p className="mt-14 text-sm font-semibold text-accent">
                    More reads
                  </p>
                  <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {earlierReads.map((read) => (
                      <ResourceCard key={read.to} item={read} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
};

export default Reads;
