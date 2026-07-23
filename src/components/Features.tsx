import { featureItems } from "@/lib/featuresData";

const Features = () => (
  <section className="bg-background px-4 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <div>
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">
          Why Bamboo Reports
        </h2>
        <p className="mt-4 max-w-6xl text-muted-foreground">
          Bamboo Reports is a research-backed intelligence solution built to
          make the India GCC opportunity accessible and actionable.
        </p>
      </div>

      <div className="mt-10 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
        {featureItems.map((feature) => (
          <div key={feature.id} className="border-t py-6">
            <feature.icon className="h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-5 text-lg font-bold leading-snug">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {feature.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
