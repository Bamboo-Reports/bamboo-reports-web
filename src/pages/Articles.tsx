import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MarketingHero } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";

const blogs = [
  {
    slug: "h1b-shock-strategic-reset",
    title: "H-1B Shock or Strategic Reset? Bengaluru Roundtable",
    summary: "Leaders unpack how India is shifting from scalable execution to decision-grade capability as GCC operating models get rebuilt.",
    date: "13 November 2025",
    location: "Hilton Bengaluru",
    thumbnail: "https://files.catbox.moe/v7a2ub.jpg",
    tags: ["Roundtable", "GCC Strategy", "India"],
  },
];

const Articles = () => {
  useSEO({
    title: "GCC Roundtables | Bamboo Reports",
    description: "Explore roundtables hosted by Bamboo Reports on Global Capability Centers, India GCC ecosystem, strategy, and industry insights.",
    keywords: "GCC Roundtable, Bamboo Reports Roundtable, Global Capability Centers, GCC Strategy, GCC benchmarking, GTM research India",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <MarketingHero
          showAction={false}
          title="Roundtables"
          description={<p>Curated discussions with GCC leaders on strategy, operating models, and what's shaping the ecosystem.</p>}
        />
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-accent">Library</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Recent Roundtables</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {blogs.map((blog) => (
                <Link key={blog.slug} to={`/roundtables/${blog.slug}`} className="group overflow-hidden rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <div className="aspect-video overflow-hidden"><img src={blog.thumbnail} alt={blog.title} loading="lazy" className="h-full w-full object-cover" /></div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-primary">{blog.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <h3 className="mt-3 text-2xl font-bold leading-tight transition-colors group-hover:text-primary">{blog.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{blog.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-primary"><span>{blog.date}</span><span>{blog.location}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
