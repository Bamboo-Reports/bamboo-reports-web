import { TrendingUp, Filter, Target, Lightbulb } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "90% More Center-Level Coverage",
    description: "Our platform provides significantly more detailed information than most competitors, ensuring you have the complete picture.",
    color: "text-blue-500"
  },
  {
    icon: Lightbulb,
    title: "What If Scenarios",
    description: "Simulate market shifts to forecast potential business impacts and opportunities.",
    color: "text-blue-500"
  },
  {
    icon: Filter,
    title: "Proprietary TAM Slicers",
    description: "Align with your Go-to-Market strategies through highly customizable data filters.",
    color: "text-blue-500"
  },
  {
    icon: Target,
    title: "Tailor Made Market Insights",
    description: "Customized intelligence aligned to your unique industry and growth strategy.",
    color: "text-blue-500"
  }
];

const Features = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Bamboo Reports</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Bamboo Reports is a research-backed intelligence solution designed to make the GCC opportunities in India more accessible and actionable.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className={`${feature.color} mt-1`}>
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
