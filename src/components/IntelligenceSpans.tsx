import { Check } from "lucide-react";

const categories = [
  {
    title: "Industries",
    description: "Comprehensive data on companies in India, segmented across 30+ categories, 110+ industries, and 813+ sub-industries."
  },
  {
    title: "Functions",
    description: "Analysis of all capability center types, including R&D, Engineering, IT, Manufacturing, GBS, GCC/GIC, SSC, and Sales & Marketing."
  },
  {
    title: "Geographies",
    description: "A unified platform mapping Global Capability Centers (GCCs) from multinational corporations headquartered in 50+ countries."
  }
];

const IntelligenceSpans = () => (
  <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <div>
        <h2 className="max-w-lg text-3xl font-bold leading-tight md:text-4xl">
          Our intelligence spans
        </h2>

        <div className="mt-8 border-t">
          {categories.map((category) => (
            <div
              key={category.title}
              className="grid grid-cols-[1.5rem_1fr] gap-4 border-b py-5"
            >
              <Check className="mt-1 h-5 w-5 text-primary" aria-hidden />
              <div>
                <h3 className="text-lg font-bold">{category.title}</h3>
                <p className="mt-2 text-muted-foreground">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvtzygjYwUp8Nhz4JPlI9VjQ2s5H0dy6CEAk1g"
          alt="GCC Intelligence Coverage Map"
          width="2280"
          height="2282"
          loading="lazy"
          className="h-auto w-full max-w-2xl"
        />
      </div>
    </div>
  </section>
);

export default IntelligenceSpans;
