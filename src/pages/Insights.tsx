import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Insights = () => {
  useSEO({
    title: "GCC Insights - Global Capability Centers Analysis & Trends",
    description: "Expert GCC insights and analysis on Global Capability Centers in India. Stay updated with the latest GCC trends, market intelligence, and strategic perspectives on India's GCC ecosystem.",
    keywords: "GCC Insights, GCC Analysis, Global Capability Centers Insights, GCC Trends, India GCC Intelligence, Market Intelligence India, GCC Research",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Insights</h1>
          <p className="text-2xl text-muted-foreground">Coming Soon</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
