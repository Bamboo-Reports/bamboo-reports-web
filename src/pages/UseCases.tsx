import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useCaseItems } from "@/lib/useCasesData";

const useCases = useCaseItems.filter((item) => item.badge === "Use Case");

const UseCases = () => {
  useSEO({
    title: "Use Cases | Bamboo Reports",
    description: "Explore four core Bamboo Reports use cases in one place.",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,hsl(var(--accent)/0.16),transparent_30%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--muted)/0.42)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(180deg,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 space-y-10">
            <div className="space-y-4 max-w-5xl">
              <h1 className="text-4xl lg:text-6xl font-black leading-[1.03] tracking-tight animate-fade-in">
                Real use cases. One decision spine.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl animate-fade-in">
                From leadership planning to pre-RFP ecosystem alignment, Bamboo Reports helps teams move earlier with stronger market context.
              </p>
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block" />
          <div className="space-y-8 lg:space-y-12">
            {useCases.map((useCase, index) => (
              <article
                key={useCase.id}
                className="group relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background to-muted/55 px-6 py-7 lg:px-8 lg:py-10 shadow-[0_12px_36px_-28px_hsl(var(--foreground)/0.28)] transition-all duration-micro ease-smooth hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_hsl(var(--primary)/0.38)] animate-fade-in"
                style={{
                  animationDelay: `${(index + 1) * 120}ms`,
                  transform: index % 2 === 0 ? "rotate(-0.2deg)" : "rotate(0.2deg)",
                }}
              >
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_top_right,hsl(var(--primary))_0%,transparent_45%)]" />
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />

                <div className="absolute -top-4 -right-3 lg:-top-6 lg:right-4 text-6xl lg:text-8xl font-black tracking-tight text-primary/15 select-none pointer-events-none">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <div className="relative flex items-start gap-4 lg:gap-6">
                  <div className="mt-1 rounded-2xl border bg-background/80 text-primary p-3.5 shrink-0 transition-transform duration-micro ease-smooth group-hover:scale-105 group-hover:-rotate-3">
                    <useCase.icon className="h-6 w-6 lg:h-7 lg:w-7" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{useCase.title}</p>
                    <h2 className="text-2xl lg:text-[2.1rem] font-black leading-tight max-w-4xl">{useCase.headline}</h2>
                    <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl">{useCase.description}</p>
                    <p className="text-sm lg:text-base text-foreground/80 border-l-2 border-primary/30 pl-3 lg:pl-4 max-w-4xl">
                      {useCase.audience}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;
