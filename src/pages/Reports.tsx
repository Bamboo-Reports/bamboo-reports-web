import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
// import reportThumbnail from "@/assets/52-weeks-report-thumbnail.png";
import reportThumbnail52weeks from "@/assets/52-weeks-report-thumbnail.png";
import reportThumbnailgccsnapshot from "@/assets/indian-gcc-q2-report-thumbnail.png";

const reports = [
  {
    id: "52-weeks",
    title: "52 Weeks of GCC Momentum - Bamboo Reports",
    thumbnail: reportThumbnail52weeks,
    description: "India's Global Capability Centers (GCCs) have entered a phase of unprecedented growth.",
  },
  {
    id: "gcc-snapshot-q2",
    title: "India GCC Snapshot Q2 (FY25-26)",
    thumbnail: reportThumbnailgccsnapshot,
    description: "India's Global Capability Centers (GCCs) continue to be the engine room of multinational transformation.",
  },
];

const Reports = () => {
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
                <div className="overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={report.thumbnail} 
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
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
