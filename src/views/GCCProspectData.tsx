import {
  RiBuilding2Line,
  RiBuildingLine,
  RiCalendarEventLine,
  RiCloudLine,
  RiPresentationLine,
  RiUserSearchLine,
  RiMapPin2Line,
  RiPriceTag3Line,
  RiShapesLine,
  RiStackLine,
  RiUserStarLine,
} from "@remixicon/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoCta, MarketingHero } from "@/components/layout/B2BMarketingPage";
import {
  Block,
  FeatureGrid,
  OfferMatrix,
  ProblemSpread,
  RuledList,
  type Feature,
} from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const COVERAGE: Feature[] = [
  { icon: RiUserStarLine, title: "Decision makers", desc: "Named C-suite, VPs, directors, and function heads across the ecosystem." },
  { icon: RiBuilding2Line, title: "Centre-level mapping", desc: "Contacts tied to 6,000+ individual centres, not just parent companies." },
  { icon: RiStackLine, title: "Function coverage", desc: "Engineering, Product, Data, Finance, HR, Legal, Operations, IT, and more." },
  { icon: RiMapPin2Line, title: "Geospatial precision", desc: "Every centre geo-coded across India's GCC cities and clusters." },
  { icon: RiShapesLine, title: "Service-mix context", desc: "5–12 structured service classifications per centre: what each GCC actually does." },
  { icon: RiPriceTag3Line, title: "Sector & tech tagging", desc: "BFSI, Tech, Pharma, Retail, Manufacturing, with tech-stack signals layered in." },
];

const USERS = [
  { icon: RiCloudLine, name: "SaaS & tech vendors", desc: "Pipeline generation for\nIndia GCC accounts." },
  { icon: RiUserSearchLine, name: "Staffing & RPO firms", desc: "Reach HR and TA\nheads at scale." },
  { icon: RiBuildingLine, name: "Real estate & facilities", desc: "Connect with admin, CRE, and operations leaders." },
  { icon: RiPresentationLine, name: "Consulting &\nadvisory", desc: "Identify and prioritise target accounts fast." },
  { icon: RiCalendarEventLine, name: "Event & community platforms", desc: "Grow your GCC practitioner network." },
];

const RESEARCH = [
  { name: "260+ man-months of structured research since 2022, built centre by centre." },
  { name: "250+ structured data points per GCC across 6 interlinked data tables." },
  { name: "AI-augmented weekly refresh cycles with automated change detection as leaders move." },
  { name: "Every field mapped to an AI agent for enrichment, validation, and quality checks." },
];

const GCCProspectData = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        backgroundImage="/hero-backgrounds/gcc-prospect-data.webp"
        eyebrow="What we offer"
        title="GCC Prospect Data"
        description="Verified decision-makers across 6,000+ India GCC centres, continuously refreshed and ready for outreach."
      />

      <Section>
        <Container>
          <ProblemSpread
            eyebrow="The problem"
            title="Your outreach is only as good as your data."
            body="India's GCC market is moving fast. New centres open every quarter. Leaders change roles. Scraped databases hand you stale contacts, wrong titles, parent-company-only records, and zero centre-level context."
            statement={
              <>
                Most lists give you names. <span className="text-primary">We give you the right names</span>, mapped to
                the right centre, in the right role, with the service-mix and tech-stack context you need to start a
                conversation.
              </>
            }
          />
        </Container>
      </Section>

      <Section surface="subtle" bordered>
        <Container className="flex flex-col gap-14">
          <SectionHeading eyebrow="What's inside" title="Built for GCC go-to-market." />
          <FeatureGrid items={COVERAGE} />
          <div className="flex flex-col gap-3 border-t border-line pt-8">
            <p className="text-lg leading-relaxed text-ink-soft">Built from Bamboo Reports' proprietary database.</p>
            <p className="text-title font-display-soft text-ink">
              40% more accounts than NASSCOM, 3x more centres, and 21x more structured data per GCC than the nearest
              alternative.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <Block eyebrow="Who uses this" title="Built for teams that sell into GCCs.">
            <OfferMatrix
              items={USERS.map(({ name, desc, ...rest }) => ({ ...rest, title: name, desc }))}
              prompt="Don't see your team here?"
            />
          </Block>
        </Container>
      </Section>

      <Section surface="subtle" bordered>
        <Container>
          <Block
                eyebrow="Why Bamboo Reports"
                title={
                  <>
                    This isn't a scraped list. <span className="text-primary lg:block">This is a research asset.</span>
                  </>
                }>
            <RuledList items={RESEARCH} max={2} />
          </Block>
        </Container>
      </Section>

      <DemoCta title="Get custom GCC coverage built around your market." />

      <Footer showCta={false} />
    </div>
  );
};

export default GCCProspectData;
