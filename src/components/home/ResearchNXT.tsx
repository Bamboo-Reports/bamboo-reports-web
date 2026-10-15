import TrustLogos from "@/components/TrustLogos";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const ResearchNXT = () => (
  <Section surface="subtle" bordered>
    <Container className="flex flex-col gap-12">
      <SectionHeading
        title="Bamboo Reports is built by Research NXT"
        lede="A market intelligence firm trusted by 50+ global tech companies."
      />
      <div className="border-y border-line py-8">
        <TrustLogos eyebrow="" surface="subtle" />
      </div>
    </Container>
  </Section>
);

export default ResearchNXT;
