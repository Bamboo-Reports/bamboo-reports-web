import { FeatureGrid } from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { featureItems } from "@/lib/featuresData";

const Features = () => (
  <Section surface="subtle" bordered>
    <Container className="flex flex-col gap-14">
      <SectionHeading
        title="Why Bamboo Reports"
        lede="A centre-level database of India's GCCs, backed by analyst research."
      />
      <FeatureGrid
        items={featureItems.map(({ icon, title, summary }) => ({ icon, title, desc: summary }))}
      />
    </Container>
  </Section>
);

export default Features;
