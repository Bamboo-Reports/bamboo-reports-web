import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import JotFormEmbed from "@/components/JotFormEmbed";

const heroHighlights = [
  "Week-by-week view of new centers, expansions, and exits",
  "City and sector momentum tuned for GTM, strategy, and delivery",
  "Leadership and hiring signals you can action immediately"
];

const whatsInside = [
  "52-week timeline of every net-new center, expansion, and consolidation",
  "City heatmaps with talent depth, hiring velocity, and capability mix",
  "Leadership moves, succession signals, and role-level intent",
  "Sector-wise build themes, from product engineering to platform ops",
  "Export-ready slides and lists for board and steering updates"
];

const whoUsesIt = [
  "Strategy and PMO teams planning city-capability bets",
  "GTM leaders building territory and pursuit plays",
  "Delivery and COE leads tracking execution risk and talent",
  "Country leaders prepping exec and boardroom updates"
];

const Report52Weeks = () => {
  useSEO({
    title: "52 Weeks of GCC Momentum - India GCC Trends Report 2024-25",
    description: "Comprehensive 52-week analysis of India's Global Capability Centers growth. Track GCC trends, city-wise expansion, sector analysis, and MNC investment patterns across Bengaluru, Hyderabad, Pune, Chennai, and NCR.",
    keywords: "GCC Trends, India GCC Report, GCC Momentum, Global Capability Centers India, GCC Expansion, India GCC Research, GCC Market Intelligence, GCC benchmarking, MNC India Centers",
  });





  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Report • Updated weekly signals
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">52 Weeks of GCC Momentum</h1>
                <p className="text-lg text-muted-foreground">
                  A full year of India GCC movements—new centers, capability ramps, hiring velocity, and leadership shifts—packaged for GTM, strategy, and delivery teams.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Why this report</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {heroHighlights.map((item) => (
                    <div key={item} className="rounded-2xl border bg-card px-4 py-3 text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="#download-form">Download the report</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="https://calendar.app.google/QNXWripJexzXLHqGA" target="_blank" rel="noopener noreferrer">Walk me through it</a>
                </Button>
              </div>
            </div>

            <div id="download-form" className="lg:sticky lg:top-24">
              <div className="rounded-3xl border bg-card shadow-sm p-6">
                <h3 className="text-2xl font-bold mb-3">Download report</h3>
                <p className="text-sm text-muted-foreground mb-4">Get the full deck plus export-ready views.</p>
                <JotFormEmbed
                  formId="253031221972448"
                  title="[ BR ] - 52 Weeks Leads"
                />
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">What's inside</p>
              <h2 className="text-3xl font-bold">The definitive weekly pulse on India GCC momentum.</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {whatsInside.map((item) => (
                  <div key={item} className="rounded-2xl border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Who uses it</p>
              <h2 className="text-3xl font-bold">Built for teams that need defensible updates fast.</h2>
              <div className="space-y-3">
                {whoUsesIt.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl border bg-card px-4 py-3 text-sm leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Report52Weeks;
