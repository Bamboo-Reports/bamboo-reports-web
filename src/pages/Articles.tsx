import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Articles = () => {
  usePageTitle("Articles");

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
