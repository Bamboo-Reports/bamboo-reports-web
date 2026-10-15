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
          lede="A short primer on the market Bamboo Reports tracks."
        />
        <p className="text-xl font-semibold leading-snug text-ink">
          GCC intelligence is structured data about Global Capability Centres (GCCs), also called Global In-house
          Centres (GICs).
        </p>
        <p className="text-lg leading-relaxed text-ink-soft">
          GCCs are offshore units that multinational companies own and run. They handle work ranging from IT and
          engineering to finance, operations and R&D.
        </p>
        <p className="text-lg leading-relaxed text-ink-soft">
          Many of these centres are in India, which has the talent, suppliers and infrastructure to run them.
          Companies once set up GCCs mainly to cut costs. Many now also use them for product development, R&D and
          business continuity.
        </p>
      </div>
    </Container>
  </Section>
);

export default WhatIsGccIntelligence;
