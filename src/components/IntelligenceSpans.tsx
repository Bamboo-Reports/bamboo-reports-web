import { Building2, Cpu, Globe } from "lucide-react";
import indiaMap from "@/assets/india-map.png";

const categories = [
  {
    icon: Building2,
    title: "Industries",
    description: "Comprehensive data on companies in India, segmented across 25+ categories, 85+ industries, and 380+ sub-industries.",
    stat: "380+",
    statLabel: "Sub-industries"
  },
  {
    icon: Cpu,
    title: "Functions",
    description: "Analysis of all capability center types, including R&D, Engineering, IT, Manufacturing, GBS, GCC/GIC, SSC, and Sales & Marketing.",
    stat: "8+",
    statLabel: "Center types"
  },
  {
    icon: Globe,
    title: "Geographies",
    description: "A unified platform mapping Global Capability Centers (GCCs) from multinational corporations headquartered in over 55 countries.",
    stat: "55+",
    statLabel: "Countries"
  }
];

const IntelligenceSpans = () => {
  return (
    <section className="enterprise-section-alt">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="enterprise-badge mb-6 inline-flex">Data Coverage</span>
            <h2 className="mb-10">Our Intelligence Spans Across</h2>

            <div className="space-y-6">
              {categories.map((category, index) => (
                <div key={index} className="enterprise-card flex gap-5 items-start">
                  <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                    <category.icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                      <div className="text-right">
                        <span className="text-xl font-bold text-accent">{category.stat}</span>
                        <span className="text-xs text-muted-foreground block">{category.statLabel}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 to-primary/5 rounded-3xl blur-2xl" />
              <img src={indiaMap} alt="GCC Intelligence Coverage Map - India" className="relative w-full max-w-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceSpans;
