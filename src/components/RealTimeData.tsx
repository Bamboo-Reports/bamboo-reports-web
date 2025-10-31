import { Check } from "lucide-react";
import dataHelpIllustration from "@/assets/data-help-illustration.png";

const benefits = [
  {
    title: "Identify Whitespace Opportunities",
    description: "Discover untapped potential in service offerings or geographical regions to expand your business reach."
  },
  {
    title: "Assess Market Dynamics",
    description: "Gain critical insights before making strategic expansions or investments to ensure optimal outcomes."
  },
  {
    title: "Understand Competitor Movements",
    description: "Track hiring trends, functional shifts, and strategic changes to stay ahead of your competition."
  },
  {
    title: "Mitigate Risks",
    description: "Plan with foresight and reduce potential threats by leveraging comprehensive data - driven insights."
  }
];

const RealTimeData = () => {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Real-time Data on GCCs Can Help You</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <img src={dataHelpIllustration} alt="Real-time Data Illustration" className="w-full max-w-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeData;
