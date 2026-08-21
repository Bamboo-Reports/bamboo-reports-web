import realtimeIllustration from "@/assets/realtime-data-illustration.svg";
import { Check } from "lucide-react";

const benefits = [
  {
    title: "Identify whitespace opportunities",
    description: "Spot untapped service offerings and geographies your business can expand into."
  },
  {
    title: "Assess market dynamics",
    description: "See how the market is shifting before you commit to an expansion or investment."
  },
  {
    title: "Understand competitor movements",
    description: "Track hiring trends, functional shifts, and strategic changes to stay ahead of your competition."
  },
  {
    title: "Mitigate risks",
    description: "Use the same data to spot risks early and plan around them."
  }
];

const RealTimeData = () => (
  <section className="bg-background px-5 py-12 sm:px-4 md:py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="order-last flex justify-center lg:order-first">
        <img
          src={realtimeIllustration}
          alt="Real-time Data Illustration"
          width="1080"
          height="754"
          loading="lazy"
          className="h-auto w-[92%] max-w-md sm:w-full lg:max-w-xl"
        />
      </div>

      <div>
        <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">
          Real-time data on GCCs can help you
        </h2>

        <div className="mt-6 border-t sm:mt-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="grid grid-cols-[1.5rem_1fr] gap-3 border-b py-4 sm:gap-4 sm:py-5"
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
