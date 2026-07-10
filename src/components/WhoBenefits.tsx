import { TrendingUp, Users, FileText, TrendingDown } from "lucide-react";

const beneficiaries = [
  {
    icon: TrendingUp,
    title: "Marketing & GTM Leaders",
    description: "Navigate market dynamics with precision and foresight"
  },
  {
    icon: Users,
    title: "Enterprise & Tech Sales Teams",
    description: "Accelerate sales strategies with targeted market insights"
  },
  {
    icon: FileText,
    title: "Investment & Strategy Groups",
    description: "Identify emerging opportunities and make informed decisions"
  },
  {
    icon: TrendingDown,
    title: "Consulting & Advisory firms",
    description: "Strategic insights for advisory and consulting professionals"
  }
];

const WhoBenefits = () => (
  <section className="bg-background px-4 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div>
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">
          Who Benefits from Bamboo Reports?
        </h2>
        <p className="mt-4 max-w-6xl text-muted-foreground">
          Bamboo Reports serves stakeholders across industries who require more than just dashboards
        </p>
      </div>

      <div className="mt-10 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
        {beneficiaries.map((beneficiary) => (
          <div key={beneficiary.title} className="border-t py-6">
            <beneficiary.icon className="h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-5 text-lg font-bold leading-snug">
              {beneficiary.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {beneficiary.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoBenefits;
