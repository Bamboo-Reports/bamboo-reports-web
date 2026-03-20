import { Search, BarChart3, Eye, Shield } from "lucide-react";
import dataHelpIllustration from "@/assets/data-help-illustration.png";

const benefits = [
  {
    icon: Search,
    title: "Identify Whitespace Opportunities",
    description: "Discover untapped potential in service offerings or geographical regions to expand your business reach."
  },
  {
    icon: BarChart3,
    title: "Assess Market Dynamics",
    description: "Gain critical insights before making strategic expansions or investments to ensure optimal outcomes."
  },
  {
    icon: Eye,
    title: "Understand Competitor Movements",
    description: "Track hiring trends, functional shifts, and strategic changes to stay ahead of your competition."
  },
  {
    icon: Shield,
    title: "Mitigate Risks",
    description: "Plan with foresight and reduce potential threats by leveraging comprehensive data-driven insights."
  }
];

const RealTimeData = () => {
  return (
    <section className="enterprise-section-alt">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="enterprise-badge mb-4 inline-flex">Strategic Advantage</span>
          <h2 className="mb-4">Real-time Data on GCCs Can Help You</h2>
          <div className="enterprise-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((benefit, index) => (
              <div key={index} className="enterprise-card group">
                <div className="bg-accent/10 text-accent p-3 rounded-xl mb-4 w-fit transition-all duration-200 group-hover:bg-accent group-hover:text-white">
                  <benefit.icon size={20} />
                </div>
                <h3 className="font-semibold text-base mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center order-first lg:order-last">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/8 to-primary/8 rounded-2xl blur-xl" />
              <img src={dataHelpIllustration} alt="Real-time GCC Data Intelligence" className="relative w-full max-w-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeData;
