import { TrendingUp, Filter, Target, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: TrendingUp,
    title: "90% More Center-Level Coverage",
    description: "Our platform provides significantly more detailed information than most competitors, ensuring you have the complete picture.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Lightbulb,
    title: "What If Scenarios",
    description: "Simulate market shifts to forecast potential business impacts and opportunities.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Filter,
    title: "Proprietary TAM Slicers",
    description: "Align with your Go-to-Market strategies through highly customizable data filters.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Target,
    title: "Tailor Made Market Insights",
    description: "Customized intelligence aligned to your unique industry and growth strategy.",
    gradient: "from-green-500 to-emerald-500"
  }
];

const Features = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Why Bamboo Reports
          </h2>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Bamboo Reports is a research-backed intelligence solution designed to make the GCC opportunities in India more accessible and actionable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass p-6 border-0 shadow-depth animate-hover-lift animate-press transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-4 items-start group">
                <div className={`bg-gradient-to-br ${feature.gradient} p-3 rounded-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
