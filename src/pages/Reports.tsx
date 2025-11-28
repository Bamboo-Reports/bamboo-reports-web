import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const reports = [
  {
    id: "52-weeks",
    title: "52 Weeks of GCC Momentum - Bamboo Reports",
    thumbnail: "https://files.catbox.moe/1brg2g.png",
    description: "India's Global Capability Centers (GCCs) have entered a phase of unprecedented growth.",
    altText: "52 Weeks of GCC Momentum Report - India Global Capability Centers Trends Analysis",
  },
  {
    id: "gcc-snapshot-q2",
    title: "India GCC Snapshot Q2 (FY25-26) - Bamboo Reports",
    thumbnail: "https://files.catbox.moe/r8f791.png",
    description: "India's Global Capability Centers (GCCs) continue to be the engine room of multinational transformation.",
    altText: "India GCC Q2 Snapshot Report - Quarterly Global Capability Centers Intelligence",
  },
];

const Reports = () => {
  useSEO({
    title: "India GCC Reports | GCC Intelligence & GTM Market Research | Bamboo Reports",
    description: "Comprehensive India GCC Intelligence reports with GTM market research. Access India Global Capability Centers trends, quarterly snapshots, and strategic intelligence for GCC expansion in India.",
    keywords: "India GCC Reports, GCC Intelligence India, India GCC research, GTM Intelligence India, Global Capability Centers India reports, India GCC Intelligence, GCC market intelligence India, India GCC trends, GTM market research India, GCC insights India, India GCC quarterly reports",
    canonicalUrl: "https://www.bambooreports.com/reports",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-12">Reports</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {reports.map((report) => (
              <Link
                key={report.id}
                to={`/reports/${report.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow duration-micro ease-smooth">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={report.thumbnail}
                      alt={report.altText}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-micro ease-smooth"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-micro ease-smooth">
                      {report.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {report.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
