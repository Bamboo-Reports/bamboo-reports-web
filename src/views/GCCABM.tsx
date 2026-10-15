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
  { title: "Contact targeting", body: "From our verified decision-maker contact pool, we build your target list: the right function heads, at the right centres, in the right geographies, with duplicates removed." },
  { title: "Campaign execution", body: "We run multi-channel campaigns across LinkedIn, email, curated roundtables, and content syndication through the Bamboo Reports audience." },
  { title: "MQL handoff", body: "We hand over qualified leads: contacts who have engaged with your content, attended your events or asked to hear more. You do not get raw lists or cold traffic." },
];

const FORMATS: MatrixItem[] = [
  { icon: RiFocus3Line, title: "Focused ABM sprint", desc: "A short campaign aimed at a fixed list of accounts." },
  { icon: RiMapPinRangeLine, title: "City blitz", desc: "Concentrated push\nin one GCC cluster." },
  { icon: RiGroupLine, title: "Roundtable programme", desc: "Curated events with\nsenior GCC leaders." },
  { icon: RiMailSendLine, title: "Content + nurture", desc: "LinkedIn and email sequence across named accounts." },
  { icon: RiRocket2Line, title: "Full GTM programme", desc: "Several cities and channels over a longer period." },
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
  { name: "No third-party data: 260+ man-months of our own structured research, refreshed weekly with AI assistance." },
  { name: "Targeting based on how each centre is organised: its services, function split and tech stack." },
  { name: "21x more structured data per GCC than the nearest alternative, so you can build segments others cannot." },
  { name: "Messaging informed by the team that writes Bamboo Reports' India GCC research." },
];

const GCCABM = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        backgroundImage="/hero-backgrounds/gcc-abm.webp"
        eyebrow="What we offer"
        title="GCC ABM"
        description="Account-based campaigns for the India GCC market, run end to end on our own GCC data."
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
            body="India's GCC market works differently from the wider enterprise market. Decision-makers are often hard to identify, org charts are not public and titles vary from one company to the next. Most ABM platforms treat a GCC as part of its parent company."
            statement={
              <>
                Run campaigns here without GCC-specific data and you{" "}
                <span className="text-primary">spend money on the wrong accounts</span> and send messages to the
                wrong people.
              </>
            }
          />
        </Container>
      </Section>

      <Section id="how-it-works" surface="subtle" bordered className="scroll-mt-24">
        <Container className="flex flex-col gap-14">
          <SectionHeading eyebrow="How it works" title="From account list to qualified leads." />
          <ProcessRail steps={STEPS} />
        </Container>
      </Section>

      <Section>
        <Container>
          <Block eyebrow="Campaign formats" title="Choose a campaign format.">
            <OfferMatrix
              items={FORMATS}
              prompt="Not sure which format fits?"
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
                Results from <span className="lg:block">past campaigns.</span>
              </>
            }
            lede={
              <p>
                ABM campaigns for SaaS vendors, enterprise software and professional services firms across India's main
                GCC cities, with{" "}
                <span className="font-semibold text-primary">a guaranteed MQL number, not an impressions count.</span>
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
                    The data is ours. <span className="text-primary lg:block">We research it ourselves.</span>
                  </>
                }
                lede="Most ABM agencies license contact data from a third party. We build and maintain our own.">
            <RuledList items={REASONS} max={2} />
          </Block>
        </Container>
      </Section>

      <DemoCta title="Plan a GCC campaign with us." />
      <Footer showCta={false} />
    </div>
  );
};

export default GCCABM;
