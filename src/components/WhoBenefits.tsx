import { TrendingUp, Users, FileText, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const beneficiaries = [
  {
    icon: TrendingUp,
    title: "Marketing & GTM Leaders",
    description: "Navigate market dynamics with precision and foresight",
    bgColor: "bg-blue-50"
  },
  {
    icon: Users,
    title: "Enterprise & Tech Sales Teams",
    description: "Accelerate sales strategies with targeted market insights",
    bgColor: "bg-orange-50"
  },
  {
    icon: FileText,
    title: "Investment & Strategy Groups",
    description: "Identify emerging opportunities and make informed decisions",
    bgColor: "bg-blue-50"
  },
  {
    icon: TrendingDown,
    title: "Consulting & Advisory firms",
    description: "Strategic insights for advisory and consulting professionals",
    bgColor: "bg-orange-50"
  }
];

const WhoBenefits = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Who Benefits from Bamboo Reports?</h2>
        <p className="text-center text-muted-foreground mb-12">
          Bamboo Reports serves stakeholders across industries who require more than just dashboards
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficiaries.map((beneficiary, index) => (
            <Card key={index} className={`${beneficiary.bgColor} border-none`}>
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="flex justify-center mb-4">
                  <beneficiary.icon className="text-primary" size={40} />
                </div>
                <h3 className="font-bold text-lg mb-3">{beneficiary.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {beneficiary.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoBenefits;
