import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import StructuredData from "@/components/StructuredData";

const Explorer = () => {
  useSEO({
    title: "GCC Explorer | India GCC Intelligence & Market Discovery | Bamboo Reports",
    description: "Explore 2400+ Global Capability Centers across India with GCC Explorer. Discover India GCC opportunities, market intelligence, and GTM insights for strategic expansion planning.",
    keywords: "GCC Explorer, India GCC Intelligence, GCC India discovery, Global Capability Centers Explorer, India GCC market discovery, GCC Intelligence tool, GTM intelligence India, India GCC opportunities, GCC market intelligence India",
    canonicalUrl: "https://www.bambooreports.com/products/explorer",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData
        type="product"
        data={{
          name: "GCC Explorer - India GCC Intelligence Platform",
          description: "Explore and discover Global Capability Centers across India with comprehensive market intelligence and GTM insights.",
          features: [
            "2400+ GCC Database Access",
            "India GCC Market Intelligence",
            "GTM Research Tools",
            "GCC Discovery Platform",
            "Real-time India GCC Insights"
          ]
        }}
      />
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Explorer</h1>
          <p className="text-lg text-muted-foreground">Content coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explorer;
