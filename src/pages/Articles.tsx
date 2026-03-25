import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const blogs = [
  {
    slug: "h1b-shock-strategic-reset",
    title: "H-1B Shock or Strategic Reset? Bengaluru Roundtable",
    summary:
      "Leaders unpack how India is shifting from scalable execution to decision-grade capability as GCC operating models get rebuilt.",
    date: "13 November 2025",
    location: "Hilton Bengaluru",
    thumbnail: "https://files.catbox.moe/v7a2ub.jpg",
    tags: ["Roundtable", "GCC Strategy", "India"],
  },
];

const Articles = () => {
  useSEO({
    title: "GCC Roundtable - Bamboo Reports",
    description:
      "Explore roundtables hosted by Bamboo Reports on Global Capability Centers, India GCC ecosystem, strategy, and industry insights.",
    keywords:
      "GCC Roundtable, Bamboo Reports Roundtable, Global Capability Centers, GCC Strategy, GCC benchmarking, GTM research India",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,hsl(var(--accent)/0.16),transparent_30%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--muted)/0.42)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(180deg,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black leading-[1.03] tracking-tight animate-fade-in">Roundtables</h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl animate-fade-in">
              Curated discussions with GCC leaders on strategy, operating models, and what's shaping the ecosystem.
            </p>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 py-14 lg:py-20 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Library</p>
            <h2 className="text-3xl lg:text-4xl font-black">Recent Roundtables</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                to={`/roundtables/${blog.slug}`}
                className="group relative h-full rounded-3xl border bg-gradient-to-br from-background to-muted/50 shadow-[0_12px_36px_-28px_hsl(var(--foreground)/0.28)] transition-all duration-micro ease-smooth hover:shadow-[0_20px_44px_-28px_hsl(var(--primary)/0.38)] hover:-translate-y-[2px] overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(120deg,hsl(var(--foreground))_0.6px,transparent_0.6px)] bg-[size:12px_12px]" />
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-micro ease-smooth group-hover:scale-[1.02]"
                  />
                </div>
                <div className="relative p-6 space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors duration-micro ease-smooth">
                    {blog.title}
                  </h3>
                  <p className="text-base text-muted-foreground">{blog.summary}</p>
                  <div className="flex flex-wrap gap-3 text-sm font-semibold text-primary">
                    <span className="rounded-full bg-primary/10 px-3 py-1 border border-primary/30">{blog.date}</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 border border-primary/30">{blog.location}</span>
                  </div>
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

export default Articles;
