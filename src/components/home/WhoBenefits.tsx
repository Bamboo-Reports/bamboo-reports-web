import { RiBriefcaseLine, RiFileTextLine, RiLineChartLine, RiTeamLine } from "@remixicon/react";
import { FeatureGrid } from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const beneficiaries = [
  {
    icon: RiLineChartLine,
    title: "Marketing & GTM leaders",
    description: "Size your market, sharpen your targeting, and time campaigns to real GCC activity."
  },
  {
    icon: RiTeamLine,
    title: "Enterprise & tech sales teams",
    description: "Find the accounts that are ready to buy and reach the leaders who decide."
  },
  {
    icon: RiFileTextLine,
    title: "Investment & strategy groups",
    description: "Spot emerging opportunities early and back every decision with verified data."
  },
  {
    icon: RiBriefcaseLine,
    title: "Consulting & advisory firms",
    description: "Ground client recommendations in evidence from the ecosystem, not estimates."
  }
];

const WhoBenefits = () => (
  <Section surface="subtle" bordered>
    <Container className="flex flex-col gap-14">
      <SectionHeading
        title="Who benefits from Bamboo Reports?"
        lede="Bamboo Reports serves stakeholders across industries who need more than dashboards to make decisions."
      />
      <FeatureGrid
        items={beneficiaries.map(({ icon, title, description }) => ({ icon, title, desc: description }))}
      />
    </Container>
  </Section>
);

export default WhoBenefits;
