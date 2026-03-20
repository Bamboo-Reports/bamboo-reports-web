import { TrendingUp, Users, FileText, Briefcase } from "lucide-react";

const beneficiaries = [
  {
    icon: TrendingUp,
    title: "Marketing & GTM Leaders",
    description: "Navigate market dynamics with precision and foresight using verified GCC data and market signals.",
  },
  {
    icon: Users,
    title: "Enterprise & Tech Sales Teams",
    description: "Accelerate sales strategies with targeted market insights and center-level intelligence.",
  },
  {
    icon: FileText,
    title: "Investment & Strategy Groups",
    description: "Identify emerging opportunities and make informed decisions backed by comprehensive market data.",
  },
  {
    icon: Briefcase,
    title: "Consulting & Advisory Firms",
    description: "Deliver strategic insights to clients with credible, analyst-verified intelligence on the GCC ecosystem.",
  }
];

const WhoBenefits = () => {
  return (
    <section className="enterprise-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="enterprise-badge mb-4 inline-flex">Built For Teams</span>
          <h2 className="mb-4">Who Benefits from Bamboo Reports?</h2>
          <div className="enterprise-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Purpose-built for stakeholders who require defensible intelligence, not just dashboards.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficiaries.map((beneficiary, index) => (
            <div key={index} className="enterprise-card text-center group">
              <div className="flex justify-center mb-5">
                <div className="bg-accent/10 text-accent p-4 rounded-2xl transition-all duration-200 group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/20">
                  <beneficiary.icon size={28} />
                </div>
              </div>
              <h3 className="font-semibold text-base mb-3">{beneficiary.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {beneficiary.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoBenefits;
