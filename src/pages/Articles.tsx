import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Articles = () => {
  useSEO({
    title: "GCC Articles - Global Capability Centers News & Updates",
    description: "Read articles on Global Capability Centers, India GCC ecosystem, market trends, and industry analysis. Expert perspectives on GCC strategy, benchmarking, and GTM research.",
    keywords: "GCC Articles, Global Capability Centers News, GCC Industry Analysis, India GCC Updates, GCC Strategy, GCC benchmarking, GTM research India",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Articles</h1>
          <p className="text-2xl text-muted-foreground">Coming Soon</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
