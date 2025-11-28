import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Navigator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Navigator</h1>
          <p className="text-lg text-muted-foreground">Content coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Navigator;
