import { featureItems } from "@/lib/featuresData";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Features = () => {
  return (
    <section className="enterprise-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="enterprise-badge mb-4 inline-flex">Platform Capabilities</span>
          <h2 className="mb-4">Why Bamboo Reports</h2>
          <div className="enterprise-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Research-backed intelligence designed to make GCC opportunities in India more accessible and actionable for enterprise teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featureItems.map((feature) => (
            <Link
              key={feature.id}
              to={feature.href}
              className="enterprise-card group cursor-pointer"
            >
              <div className="flex gap-5 items-start">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0 transition-all duration-200 group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/20">
                  <feature.icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.summary}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
