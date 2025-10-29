import { Check } from "lucide-react";
import indiaMap from "@/assets/india-map.png";

const categories = [
  {
    title: "Industries",
    description: "Comprehensive data on companies in India, segmented across 25+ categories, 85+ industries, and 380+ sub-industries."
  },
  {
    title: "Functions",
    description: "Analysis of all capability center types, including R&D, Engineering, IT, Manufacturing, GBS, GCC/GIC, SSC, and Sales & Marketing."
  },
  {
    title: "Geographies",
    description: "A unified platform mapping Global Capability Centers (GCCs) from multinational corporations headquartered in over 55 countries."
  }
];

const IntelligenceSpans = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-5">Our Intelligence Spans Across</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {categories.map((category, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <img src={indiaMap} alt="GCC Intelligence Coverage Map" className="w-full max-w-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceSpans;
