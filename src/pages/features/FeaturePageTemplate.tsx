import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { featureItems, FeatureItem } from "@/lib/featuresData";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";

type FeaturePageTemplateProps = {
  featureId: FeatureItem["id"];
};

const FeaturePageTemplate = ({ featureId }: FeaturePageTemplateProps) => {
  const feature = featureItems.find((item) => item.id === featureId);

  if (!feature) {
    return null;
  }

  useSEO({
    title: `${feature.title} | Bamboo Reports`,
    description: feature.summary,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-br from-background via-background to-muted/40">
          <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 text-primary px-4 py-2 font-semibold w-fit">
              <feature.icon className="h-5 w-5" />
              <span>Feature</span>
            </div>
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{feature.title}</h1>
              <p className="text-lg text-muted-foreground">{feature.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/pricing">See plans</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a demo</a>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {feature.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-2xl font-semibold mt-1">{stat.value}</div>
                  {stat.helper && <div className="text-sm text-muted-foreground mt-1">{stat.helper}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">What's inside</p>
            <h2 className="text-3xl font-bold">Built for teams that need clarity fast.</h2>
            <p className="text-base text-muted-foreground">{feature.summary}</p>
            <div className="space-y-3">
              {feature.highlights.map((item) => (
                <div key={item} className="flex gap-3 items-start rounded-2xl border bg-muted/40 px-4 py-3">
                  <span className="mt-1 rounded-full bg-primary/10 text-primary px-2 py-1 text-xs font-semibold">Key</span>
                  <p className="text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border bg-card/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Outcomes</p>
              <div className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1">GTM ready</div>
            </div>
            <div className="space-y-3">
              {feature.outcomes.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="text-primary mt-1">-</span>
                  <p className="text-base leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              Every feature is paired with analyst guidance so your teams can activate the insight immediately.
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 lg:p-10 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Next steps</p>
                <h3 className="text-2xl lg:text-3xl font-bold">See how {feature.title} fits your roadmap.</h3>
                <p className="text-base text-muted-foreground">Share your priority sectors, cities, and use cases - we'll tailor a walkthrough and leave you with an export-ready view.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Talk to us</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link to="/pricing">Compare plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturePageTemplate;
