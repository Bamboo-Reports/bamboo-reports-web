import { RiCheckLine } from "@remixicon/react";
import indiaMap from "@/assets/india-map.svg";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const categories = [
  {
    title: "Industries",
    description: "Comprehensive data on companies in India, segmented across 30+ categories, 110+ industries, and 813+ sub-industries."
  },
  {
    title: "Functions",
    description: "Analysis of all capability centre types, including R&D, Engineering, IT, Manufacturing, GBS, GCC/GIC, SSC, and Sales & Marketing."
  },
  {
    title: "Geographies",
    description: "A unified platform covering Global Capability Centres (GCCs) from multinational corporations headquartered in 50+ countries."
  }
];

const IntelligenceSpans = () => (
  <Section>
    <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div className="flex flex-col gap-10">
        <SectionHeading title="Our intelligence spans" />
        <ul className="border-b border-line">
          {categories.map((item) => (
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

      <div className="flex justify-center">
        <img
          src={indiaMap.src}
          alt="GCC Intelligence Coverage"
          width="2280"
          height="2282"
          loading="lazy"
          className="h-auto w-[88%] max-w-sm sm:w-full lg:max-w-2xl"
        />
      </div>
    </Container>
  </Section>
);

export default IntelligenceSpans;
