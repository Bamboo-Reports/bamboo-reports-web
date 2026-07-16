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

      <div className="mt-10 grid gap-x-12 md:grid-cols-2">
        {featureItems.map((feature) => (
          <div
            key={feature.id}
            className="grid grid-cols-[1.5rem_1fr] gap-4 border-t py-6"
          >
            <feature.icon className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
            <div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
