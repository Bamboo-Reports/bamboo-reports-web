import { RiBriefcaseLine, RiFileTextLine, RiLineChartLine, RiTeamLine } from "@remixicon/react";
import { FeatureGrid } from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const beneficiaries = [
  {
    icon: RiLineChartLine,
    title: "Marketing & GTM leaders",
    description: "Size your market, narrow your target list and time campaigns to new centres and expansions."
  },
  {
    icon: RiTeamLine,
    title: "Enterprise & tech sales teams",
    description: "Find the right accounts and the leaders who make the buying decisions."
  },
  {
    icon: RiFileTextLine,
    title: "Investment & strategy groups",
    description: "See new centres and expansions early, with verified data behind each decision."
  },
  {
    icon: RiBriefcaseLine,
    title: "Consulting & advisory firms",
    description: "Base client recommendations on centre-level counts, not estimates."
  }
];

const WhoBenefits = () => (
  <Section surface="subtle" bordered>
    <Container className="flex flex-col gap-14">
      <SectionHeading
        title="Who benefits from Bamboo Reports?"
        lede="Teams that sell to, advise or invest in India's GCCs."
      />
      <FeatureGrid
        items={beneficiaries.map(({ icon, title, description }) => ({ icon, title, desc: description }))}
      />
    </Container>
  </Section>
);

export default WhoBenefits;
