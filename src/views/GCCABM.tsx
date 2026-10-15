import {
  RiBriefcase4Line,
  RiBuildingLine,
  RiCloudLine,
  RiFocus3Line,
  RiGlobalLine,
  RiUserSearchLine,
  RiGroupLine,
  RiMailSendLine,
  RiMapPinRangeLine,
  RiRocket2Line,
} from "@remixicon/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoCta, MarketingHero } from "@/components/layout/B2BMarketingPage";
import {
  Block,
  OfferMatrix,
  ProblemSpread,
  ProcessRail,
  ProofLedger,
  RuledList,
  type MatrixItem,
  type Proof,
} from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  { title: "Account selection", body: "We start with your ICP: sector, city, company size, function, tech stack. We pull the matching GCC accounts from our database, with full context on each centre's size, age, parent company, and leadership." },
  { title: "Contact targeting", body: "From our verified decision-maker contact pool, we build your target list: the right function heads, at the right centres, in the right geographies, with no duplication and no guesswork." },
  { title: "Campaign execution", body: "We run multi-channel campaigns across LinkedIn, email, curated roundtables, and content syndication through the Bamboo Reports audience." },
  { title: "MQL handoff", body: "We deliver qualified leads: contacts who've engaged with your content, attended your events, or raised their hand. Not raw lists. Not cold traffic." },
];

const FORMATS: MatrixItem[] = [
  { icon: RiFocus3Line, title: "Focused ABM sprint", desc: "Short, sharp campaign targeting a defined account list." },
  { icon: RiMapPinRangeLine, title: "City blitz", desc: "Concentrated push\nin one GCC cluster." },
  { icon: RiGroupLine, title: "Roundtable programme", desc: "Curated events with\nsenior GCC leaders." },
  { icon: RiMailSendLine, title: "Content + nurture", desc: "LinkedIn and email sequence across named accounts." },
  { icon: RiRocket2Line, title: "Full GTM programme", desc: "Multi-city, multi-channel, long-form engagement." },
];

const RESULTS: Proof[] = [
  { value: "250+", label: "MQLs, single campaign", detail: "One enterprise software client, one GCC-native ABM programme." },
  { value: "600+ / 40+", label: "MQLs / SQLs, enterprise client", detail: "Multi-quarter programme into a named GCC account list." },
  { value: "1,050 / 364", label: "BFSI GCCs profiled / contacts mapped", detail: "4-year ongoing BFSI GCC programme for a leading global IT services firm." },
];

// Each audience split at its natural point into who they are and what they
// do, matching the other offering pages.
const AUDIENCE = [
  { icon: RiCloudLine, name: "SaaS and Tech\nvendors", desc: "Entering or expanding in the India GCC market." },
  { icon: RiUserSearchLine, name: "Staffing, RPO, and\nHR tech firms", desc: "Targeting TA and HR\nleaders at scale." },
  { icon: RiBuildingLine, name: "Real estate and\nfacilities companies", desc: "Selling to GCC Admin\nand CRE heads." },
  { icon: RiBriefcase4Line, name: "Professional services firms", desc: "Building pipeline among GCC C-suite leaders." },
  { icon: RiGlobalLine, name: "Any B2B brand", desc: "Whose buyers sit inside\nGCC organisations." },
];

const REASONS = [
  { name: "No data middlemen and no stale records: 260+ man-months of structured research, AI-refreshed weekly." },
  { name: "Campaigns that reflect actual centre-level org structures: service-mix, function splits, tech stacks." },
  { name: "Audience segments no competitor can replicate. 21x more structured data per GCC than the nearest alternative." },
  { name: "Messaging context from the same team publishing the India GCC intelligence layer." },
];

const GCCABM = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        backgroundImage="/hero-backgrounds/gcc-abm.webp"
        eyebrow="What we offer"
        title="GCC ABM"
        description="Account-based campaigns for the India GCC market, run end to end on the best data in the business."
      />

      <Section>
        <Container>
          <ProblemSpread
            eyebrow="The problem"
            title={
              <>
                GCC buyers are hard to reach. <span className="lg:block">Generic ABM doesn't work here.</span>
              </>
            }
            body="India's GCC ecosystem doesn't behave like the broader enterprise market. Decision-makers aren't always visible. Org charts are opaque. Titles vary wildly. And most ABM platforms don't understand what a GCC actually is."
            statement={
              <>
                Running campaigns into this market without GCC-native data means{" "}
                <span className="text-primary">wasted spend, wrong targets,</span> and messaging that lands with the
                wrong people.
              </>
            }
          />
        </Container>
      </Section>

      <Section id="how-it-works" surface="subtle" bordered className="scroll-mt-24">
        <Container className="flex flex-col gap-14">
          <SectionHeading eyebrow="How it works" title="Full-funnel ABM, end to end." />
          <ProcessRail steps={STEPS} />
        </Container>
      </Section>

      <Section>
        <Container>
          <Block eyebrow="Campaign formats" title="Pick your play.">
            <OfferMatrix
              items={FORMATS}
              prompt="Not sure which play fits?"
            />
          </Block>
        </Container>
      </Section>

      <Section surface="subtle" bordered>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Proven results"
            title={
              <>
                Qualified pipeline. <span className="lg:block">Measurable outcomes.</span>
              </>
            }
            lede={
              <p>
                ABM campaigns for SaaS vendors, enterprise software, and professional services firms, delivered across
                India's top GCC cities with{" "}
                <span className="font-semibold text-primary">guaranteed MQL outcomes, not just impressions.</span>
              </p>
            }
          />
          <ProofLedger items={RESULTS} />
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <Block eyebrow="Who it's for" title="Built for B2B teams selling into GCCs.">
            <OfferMatrix
              items={AUDIENCE.map(({ name, desc, ...rest }) => ({ ...rest, title: name, desc }))}
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
                    We don't just run campaigns. <span className="text-primary lg:block">We know the market.</span>
                  </>
                }
                lede="Most ABM agencies build your list, send your emails, and call it done. We're different because the data is ours, built and maintained by us, not licensed from a third party.">
            <RuledList items={REASONS} max={2} />
          </Block>
        </Container>
      </Section>

      <DemoCta title="Let's build the pipeline your competitors can't." />
      <Footer showCta={false} />
    </div>
  );
};

export default GCCABM;
