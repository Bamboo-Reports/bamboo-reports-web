import { Check } from "lucide-react";

const benefits = [
  {
    title: "Identify whitespace opportunities",
    description: "Discover untapped potential in service offerings or geographical regions to expand your business reach."
  },
  {
    title: "Assess market dynamics",
    description: "Gain critical insights before making strategic expansions or investments to ensure optimal outcomes."
  },
  {
    title: "Understand competitor movements",
    description: "Track hiring trends, functional shifts, and strategic changes to stay ahead of your competition."
  },
  {
    title: "Mitigate risks",
    description: "Plan with foresight and reduce potential threats using comprehensive, data-driven insights."
  }
];

const RealTimeData = () => (
  <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="flex justify-center">
        <img
          src="https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKv6x96AJVfJmWpqyeiMB7DU82nCjPtSuIkENHA"
          alt="Real-time Data Illustration"
          width="1080"
          height="754"
          loading="lazy"
          className="h-auto w-full max-w-xl"
        />
      </div>

      <div>
        <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">
          Real-time data on GCCs can help you
        </h2>

        <div className="mt-8 border-t">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="grid grid-cols-[1.5rem_1fr] gap-4 border-b py-5"
            >
              <Check className="mt-1 h-5 w-5 text-primary" aria-hidden />
              <div>
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default RealTimeData;
