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
import StructuredData from "@/components/StructuredData";
import QuestionList, { type QuestionItem } from "@/components/marketing/QuestionList";
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
  { icon: RiUserStarLine, title: "Decision makers", desc: "Named C-suite, VPs, directors and function heads at GCCs across India." },
  { icon: RiBuilding2Line, title: "Centre-level mapping", desc: "Contacts tied to 6,100+ individual centres, not just parent companies." },
  { icon: RiStackLine, title: "Function coverage", desc: "Engineering, Product, Data, Finance, HR, Legal, Operations, IT, and more." },
  { icon: RiMapPin2Line, title: "Location data", desc: "Every centre geocoded across India's GCC cities and clusters." },
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
  { name: "Refreshed weekly with AI assistance. Leadership changes are detected automatically." },
  { name: "Each field has an AI agent that fills it in and checks it." },
];

const QUESTIONS: QuestionItem[] = [
  {
    question: "What is GCC Prospect Data?",
    answer:
      "GCC Prospect Data is a database of verified decision-makers at Global Capability Centres (GCCs) in India.",
  },
  {
    question: "What does the data include?",
    answer:
      "Named C-suite leaders, VPs, directors and function heads, across engineering, product, data, finance, HR, legal, operations, IT and more.",
  },
  {
    question: "How is the data collected and kept up to date?",
    answer:
      "Bamboo Reports researches the data itself instead of scraping it: 260+ man-months of structured research since 2022, with 250+ data points per GCC. It is refreshed weekly with AI assistance, and leadership changes are detected automatically.",
  },
  {
    question: "Who uses GCC Prospect Data?",
    answer:
      "Teams that sell into GCCs: SaaS and tech vendors, staffing and RPO firms, real estate and facilities providers, consulting and advisory firms, and event and community platforms.",
  },
];

const GCCProspectData = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="service"
        data={{ path: "/gcc-prospect-data", name: "GCC Prospect Data", serviceType: "Decision-maker data for India GCCs" }}
      />
      <Header />

      <MarketingHero
        backgroundImage="/hero-backgrounds/gcc-prospect-data.webp"
        eyebrow="What we offer"
        title="GCC Prospect Data"
        description="Verified decision-makers across 6,100+ India GCC centres, kept up to date for outreach."
      />

      <Section>
        <Container>
          <ProblemSpread
            eyebrow="The problem"
            title="Your outreach is only as good as your data."
            body="India's GCC market changes quickly. New centres open every quarter and leaders change roles. Scraped databases give you outdated contacts, wrong titles, records only at parent-company level and nothing about the centre itself."
            statement={
              <>
                Each contact is <span className="text-primary">mapped to the right centre and role</span>, along with
                that centre's services and tech stack, so you know what to open the conversation with.
              </>
            }
          />
        </Container>
      </Section>

      <Section surface="subtle" bordered>
        <Container className="flex flex-col gap-14">
          <SectionHeading eyebrow="What's inside" title="What the data includes." />
          <FeatureGrid items={COVERAGE} />
          <div className="flex flex-col gap-3 border-t border-line pt-8">
            <p className="text-lg leading-relaxed text-ink-soft">Built from Bamboo Reports' own database.</p>
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
                    Researched, not scraped. <span className="text-primary lg:block">Built centre by centre since 2022.</span>
                  </>
                }>
            <RuledList items={RESEARCH} max={2} />
          </Block>
        </Container>
      </Section>

      <QuestionList title="Questions about GCC Prospect Data" items={QUESTIONS} />

      <DemoCta title="Get custom GCC coverage built around your market." />

      <Footer showCta={false} />
    </div>
  );
};

export default GCCProspectData;
