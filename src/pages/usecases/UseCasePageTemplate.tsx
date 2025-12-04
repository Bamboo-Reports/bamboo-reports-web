import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useCaseItems, UseCaseItem } from "@/lib/useCasesData";
import { Link } from "react-router-dom";

type UseCasePageTemplateProps = {
  useCaseId: UseCaseItem["id"];
};

const UseCasePageTemplate = ({ useCaseId }: UseCasePageTemplateProps) => {
  const useCase = useCaseItems.find((item) => item.id === useCaseId);

  if (!useCase) {
    return null;
  }

  useSEO({
    title: `Use Case: ${useCase.title} | Bamboo Reports`,
    description: useCase.description,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-br from-background via-background to-muted/40">
          <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <useCase.icon className="h-4 w-4" />
                <span>{useCase.badge || "Use Case"}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{useCase.headline}</h1>
                <p className="text-lg text-muted-foreground max-w-3xl">{useCase.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Book a demo</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link to="/gcc-list">Explore the data</Link>
                </Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {useCase.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-2xl font-semibold mt-1">{stat.value}</div>
                  {stat.helper && <div className="text-sm text-muted-foreground mt-1">{stat.helper}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Who it is for</p>
            <h2 className="text-3xl font-bold">What this team needs from Bamboo Reports</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{useCase.audience}</p>
            <div className="space-y-3">
              {useCase.objectives.map((item) => (
                <div key={item} className="flex gap-3 items-start rounded-2xl border bg-muted/40 px-4 py-3">
                  <span className="mt-1 text-primary">-</span>
                  <p className="text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border bg-card/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Outcomes</p>
              <div className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1">Ready to ship</div>
            </div>
            <div className="space-y-3">
              {useCase.outcomes.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="mt-1 text-primary">•</span>
                  <p className="text-base leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              Every use case pairs data with analyst guidance so teams can activate the insight immediately.
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-14 lg:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Playbook</p>
              <h3 className="text-2xl lg:text-3xl font-bold">How we run this with you</h3>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Schedule a walkthrough</a>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {useCase.playbook.map((card, index) => (
              <div key={card.title} className="rounded-2xl border bg-gradient-to-br from-muted/70 via-muted/40 to-background p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">{card.title}</p>
                  <span className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1">Step {index + 1}</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Signals we track</p>
            <h3 className="text-2xl lg:text-3xl font-bold">Stay ahead of every move.</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {useCase.signals.map((signal) => (
                <div key={signal} className="rounded-2xl border bg-muted/50 px-4 py-3 text-sm font-medium leading-relaxed">
                  {signal}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Next step</p>
              <div className="text-xs rounded-full bg-primary text-primary-foreground px-3 py-1">Low lift</div>
            </div>
            <p className="text-base text-muted-foreground">Share your priority sectors, cities, and workflows. We will tailor a walkthrough of Bamboo Reports for your team and leave you with an export-ready view.</p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full" asChild>
                <a href="https://meetings-na2.hubspot.com/anam-khoja" target="_blank" rel="noopener noreferrer">Talk to us</a>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/pricing">Compare plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UseCasePageTemplate;
