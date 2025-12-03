import { featureItems } from "@/lib/featuresData";

const Features = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Bamboo Reports</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Bamboo Reports is a research-backed intelligence solution designed to make the GCC opportunities in India more accessible and actionable.
        </p>
        {/* Added responsive padding for desktop */}
        <div className="grid md:grid-cols-2 gap-8 md:px-10 lg:px-20">
          {featureItems.map((feature) => (
            <div
              key={feature.id}
              className="flex gap-4 items-start group"
            >
              <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0 transition-transform duration-micro ease-smooth group-hover:scale-105">
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
