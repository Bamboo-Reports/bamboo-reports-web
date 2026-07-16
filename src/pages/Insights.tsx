import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MarketingHero } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";

const Insights = () => {
  useSEO({
    title: "GCC Insights | Global Capability Centers Analysis & Trends | Bamboo Reports",
    description: "Expert GCC insights and analysis on Global Capability Centers in India. Stay updated with the latest GCC trends, market intelligence, and strategic perspectives on India's GCC ecosystem.",
    keywords: "GCC Insights, GCC Analysis, Global Capability Centers Insights, GCC Trends, India GCC Intelligence, Market Intelligence India, GCC Research",
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <MarketingHero
          showAction={false}
          title="Insights"
          description={<p>Insights are coming soon.</p>}
        />
      </main>
      <Footer showCta={false} />
    </div>
  );
};

export default Insights;
