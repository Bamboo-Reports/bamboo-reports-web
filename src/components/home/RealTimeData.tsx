import { RiCheckLine } from "@remixicon/react";
import realtimeIllustration from "@/assets/realtime-data-illustration.svg";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

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
  <Section>
    <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
      <div className="order-last flex justify-center lg:order-first">
        <img
          src={realtimeIllustration.src}
          alt="Real-time Data Illustration"
          width="1080"
          height="754"
          loading="lazy"
          className="h-auto w-[92%] max-w-md sm:w-full lg:max-w-xl"
        />
      </div>

      <div className="flex flex-col gap-10">
        <SectionHeading title="Real-time data on GCCs can help you" />
        <ul className="border-b border-line">
          {benefits.map((item) => (
            <li key={item.title} className="flex gap-4 border-t border-line py-5">
              <RiCheckLine className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </Section>
);

export default RealTimeData;
