import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const SuccessStories = () => {
  useSEO({
    title: "Success Stories | Bamboo Reports",
    description: "Success stories from Bamboo Reports customers.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-2xl text-muted-foreground">Coming Soon</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories;
