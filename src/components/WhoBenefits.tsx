import { TrendingUp, Users, FileText, Briefcase } from "lucide-react";

const beneficiaries = [
  {
    icon: TrendingUp,
    title: "Marketing & GTM leaders",
    description: "Size your market, sharpen your targeting, and time campaigns to real GCC activity."
  },
  {
    icon: Users,
    title: "Enterprise & tech sales teams",
    description: "Find the accounts that are ready to buy and reach the leaders who decide."
  },
  {
    icon: FileText,
    title: "Investment & strategy groups",
    description: "Spot emerging opportunities early and back every decision with verified data."
  },
  {
    icon: Briefcase,
    title: "Consulting & advisory firms",
    description: "Ground client recommendations in evidence from the ecosystem, not estimates."
  }
];

const WhoBenefits = () => (
  <section className="bg-background px-5 py-12 sm:px-4 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div>
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">
          Who benefits from Bamboo Reports?
        </h2>
        <p className="mt-4 max-w-6xl text-muted-foreground">
          Bamboo Reports serves stakeholders across industries who need more
          than dashboards to make decisions.
        </p>
      </div>

      <div className="mt-8 grid gap-x-8 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
        {beneficiaries.map((beneficiary) => (
          <div key={beneficiary.title} className="border-t py-5 sm:py-6">
            <beneficiary.icon className="h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-4 text-lg font-bold leading-snug sm:mt-5">
              {beneficiary.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3">
              {beneficiary.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoBenefits;
