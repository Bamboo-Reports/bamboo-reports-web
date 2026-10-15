import { RiCheckLine } from "@remixicon/react";
import realtimeIllustration from "@/assets/realtime-data-illustration.svg";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const benefits = [
  {
    title: "Find gaps in the market",
    description: "See the services and locations your business has not reached yet."
  },
  {
    title: "Track how the market is changing",
    description: "See where centres are opening and growing before you commit to an expansion or investment."
  },
  {
    title: "Follow your competitors",
    description: "Track their hiring, the functions they add and where they open centres."
  },
  {
    title: "Spot risks early",
    description: "Use the same data to see risks before they affect your plans."
  }
];

const RealTimeData = () => (
  <Section>
    <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
      <div className="order-last flex justify-center lg:order-first">
        <img
          src={realtimeIllustration.src}
          alt="Illustration of GCC data charts"
          width="1080"
          height="754"
          loading="lazy"
          className="h-auto w-[92%] max-w-md sm:w-full lg:max-w-xl"
        />
      </div>

      <div className="flex flex-col gap-10">
        <SectionHeading title="What current GCC data helps you do" />
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
