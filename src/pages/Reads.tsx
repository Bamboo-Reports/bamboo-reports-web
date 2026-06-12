import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import type { SyntheticEvent } from "react";

const READ_THUMBNAIL_FALLBACK = "/placeholder.svg";

const reads = [
  {
    slug: "agentic-enterprise",
    title: "The Agentic Enterprise · Thoughtworks × AWS",
    summary:
      "Build an enterprise that adapts, not just automates. A composable architecture of agents, data and governance that evolves as fast as AI does.",
    label: "Whitepaper",
    thumbnail: "https://3lqbm904a5.ufs.sh/f/qFKrZopOp2VTGMv7iissIv8NxSL4WbOHyQrMJZ3VzREBim0P",
  },
];

const Reads = () => {
  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.onerror = null;
    img.src = READ_THUMBNAIL_FALLBACK;
  };

  useSEO({
    title: "Interesting Reads | Bamboo Reports",
    description:
      "Curated whitepapers and long-form reads on AI, GCC strategy, and enterprise transformation from Bamboo Reports and partners.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,hsl(var(--accent)/0.16),transparent_30%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--muted)/0.42)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(180deg,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black leading-[1.03] tracking-tight animate-fade-in">Interesting Reads</h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl animate-fade-in">
              Curated whitepapers and long-form reads on AI, strategy, and what's shaping the enterprise.
            </p>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Library</p>
            <h2 className="text-3xl lg:text-4xl font-black">Recent Reads</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reads.map((read) => (
              <Link
                key={read.slug}
                to={`/reads/${read.slug}`}
                className="group relative h-full rounded-3xl border bg-gradient-to-br from-background to-muted/50 shadow-[0_12px_36px_-28px_hsl(var(--foreground)/0.28)] transition-all duration-micro ease-smooth hover:shadow-[0_20px_44px_-28px_hsl(var(--primary)/0.38)] hover:-translate-y-[2px] overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                <div className="aspect-video overflow-hidden">
                  <img
                    src={read.thumbnail}
                    alt={read.title}
                    onError={handleThumbnailError}
                    className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                  />
                </div>
                <div className="relative p-6 space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1">{read.label}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                    {read.title}
                  </h3>
                  <p className="text-base text-muted-foreground">{read.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reads;
