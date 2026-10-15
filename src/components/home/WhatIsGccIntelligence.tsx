import gccIllustration from "@/assets/gcc-illustration.png";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const WhatIsGccIntelligence = () => (
  <Section>
    <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <img
        src={gccIllustration.src}
        alt="An analyst working with GCC market data, reports, and operational insights"
        width="1024"
        height="714"
        loading="lazy"
        className="order-2 mx-auto h-auto w-[92%] max-w-md sm:w-full sm:max-w-lg lg:order-1 lg:mx-0"
      />

      <div className="order-1 flex flex-col gap-6 lg:order-2">
        <SectionHeading
          title="What is GCC intelligence?"
          lede="A quick primer on the market Bamboo Reports tracks every day."
        />
        <p className="text-xl font-semibold leading-snug text-ink">
          GCC Intelligence is the structured, data-driven understanding of Global Capability Centres (GCCs), also
          known as Global In-house Centres (GICs).
        </p>
        <p className="text-lg leading-relaxed text-ink-soft">
          These centres are the offshore operations of multinational companies, handling a wide range of strategic,
          operational, and innovation-driven functions.
        </p>
        <p className="text-lg leading-relaxed text-ink-soft">
          India has become a key destination for these centres, thanks to its talent density, mature ecosystems, and
          infrastructure. The role of GCCs has expanded well beyond cost efficiency to driving innovation, agility,
          and business continuity.
        </p>
      </div>
    </Container>
  </Section>
);

export default WhatIsGccIntelligence;
