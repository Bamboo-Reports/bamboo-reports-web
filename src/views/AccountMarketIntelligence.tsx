import {
  RiBarChartGroupedLine,
  RiBookmark3Line,
  RiBriefcase4Line,
  RiBuilding2Line,
  RiCompass3Line,
  RiFundsLine,
  RiPresentationLine,
  RiCommunityLine,
  RiDashboard3Line,
  RiFileList3Line,
  RiMap2Line,
  RiOrganizationChart,
  RiPieChart2Line,
  RiQuestionLine,
  RiUserSettingsLine,
} from "@remixicon/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoCta, MarketingHero } from "@/components/layout/B2BMarketingPage";
import {
  FeatureGrid,
  ProblemSpread,
  Block,
  OfferMatrix,
  ProofLedger,
  RuledList,
  type Feature,
  type OfferItem,
  type Proof,
} from "@/components/marketing/OfferBlocks";
import OfferIndex from "@/components/marketing/OfferIndex";
import Link from "next/link";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const EXCLUSIVE = "Exclusive to Bamboo Reports";

const PRODUCTS: OfferItem[] = [
  { icon: RiCommunityLine, title: "City GCC intelligence reports", body: "Deep-dives into India's top GCC cities. Each edition covers active and upcoming centre counts, workforce composition, sector and function mix, micro-geography clustering, and growth signals. Delivered as interactive reports built for executive audiences." },
  { icon: RiPieChart2Line, title: "Sector snapshot reports", body: "Fast intelligence on high-priority verticals: BFSI, Technology, Pharma, Retail, Manufacturing. Covers centre counts, top employers, function breakdown, and city spread. Ideal for product teams, sales leaders, and consultants targeting a specific vertical." },
  { icon: RiOrganizationChart, title: "Function-mix intelligence", badge: EXCLUSIVE, body: "Understand how GCCs are staffing themselves across functions: Engineering vs. Finance vs. Legal vs. HR. Identify white spaces. Benchmark your accounts. No one else produces this." },
  { icon: RiBarChartGroupedLine, title: "Software vendor market share reports", badge: EXCLUSIVE, body: "Which ERP, HCM, or IT platforms dominate inside India GCCs? Track adoption by sector, size, and city. Built from thousands of verified tech and software records." },
  { icon: RiFileList3Line, title: "Custom research briefs", body: "Need a bespoke market view? We build custom intelligence packs for specific account clusters, geographies, or competitive questions." },
];

const PLATFORM_CAPABILITIES: Feature[] = [
  { icon: RiDashboard3Line, title: "Interactive dashboards", desc: "Real-time analytics across accounts, centres, and functions with instant filtering." },
  { icon: RiMap2Line, title: "Geospatial intelligence", desc: "See Global Capability\ncentres by location,\ncluster and state." },
  { icon: RiBookmark3Line, title: "Saved filters", desc: "Save any search, reopen\nit in one click and share\nit with your team." },
  { icon: RiUserSettingsLine, title: "My Bamboo Reports©", desc: "Personalised workspace: your target accounts, your ICP, your watermarked views." },
];

const WHAT_IF = [
  "How do we compare against peer GCCs in our sector and size band?",
  "Which cities offer the right talent for a new capability centre?",
  "What functions are peers expanding or consolidating right now?",
  "Where should we add a new practice, and what does hiring look like?",
];

const IMPACT: Proof[] = [
  { value: "6 months → under 1 month", label: "GCC discovery cycle for a leading global IT services firm." },
  { value: "₹30–50L saved", label: "vs. stitching GCC intelligence from fragmented sources." },
];

const USERS = [
  { icon: RiBriefcase4Line, name: "Enterprise sales teams", desc: "Account prioritisation and territory planning." },
  { icon: RiCompass3Line, name: "Product & strategy leaders", desc: "Market sizing and white-space identification." },
  { icon: RiFundsLine, name: "Private equity & investors", desc: "GCC ecosystem mapping\nfor due diligence." },
  { icon: RiPresentationLine, name: "Consulting firms", desc: "Client-facing intelligence with differentiated data." },
  { icon: RiBuilding2Line, name: "GCC leaders themselves", desc: "Benchmark against peers, track market shifts." },
];

const DIFFERENCES = [
  { name: "Built bottom-up from 2,400+ accounts and 6,000+ centres. 260+ man-months of structured research." },
  { name: "Sliceable by city, sector, function, size, tech stack, and centre status." },
  { name: "AI-augmented weekly refresh,\nnot an annual publishing cycle." },
  { name: "Exclusive coverage: service-mix, function-mix, and software vendor market share at centre level." },
];

const AccountMarketIntelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        backgroundImage="/hero-backgrounds/account-market-intelligence.webp"
        eyebrow="What we offer"
        title="Account & Market Intelligence"
        description="Centre-level GCC intelligence you can filter by city, sector, function or company, with three years of history."
      />

      <Section>
        <Container>
          <ProblemSpread
            eyebrow="The problem"
            title="GCC strategy without data is just guesswork."
            body="Published reports track GCCs at parent-company level and go stale in months. Consulting decks arrive weeks later as 80-page PDFs. Neither answers what a specific centre actually does, or how your sector is moving right now."
            statement={
              <>
                You need ground-truth intelligence:{" "}
                <span className="text-primary">centre-level, structured, and queryable.</span>
              </>
            }
          />
        </Container>
      </Section>

      <Section surface="subtle" bordered>
        <Container>
          <Block eyebrow="Product suite" title="Intelligence products for every stage of strategy.">
            <OfferIndex
              label="Product suite"
              items={PRODUCTS.map(({ icon: Icon, ...product }) => ({
                ...product,
                icon: Icon ? <Icon className="size-6" aria-hidden /> : null,
              }))}
            />
          </Block>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Platform in action"
              title="Live intelligence, not static PDFs."
              lede="Filter to Pharma + Hyderabad and see 41 accounts, 57 centres in seconds. Click into Bayer AG and drill into its 18 centres across India: headcount, full tech stack, and 3 years of historical movement. This is what centre-level, queryable intelligence looks like."
            />
            <div>
              <Button asChild variant="outline" className="group">
                <Link href="/platform">
                  Explore the platform
                  <TrailingArrow />
                </Link>
              </Button>
            </div>
          </div>

          <FeatureGrid items={PLATFORM_CAPABILITIES} />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-primary">What-if scenario intelligence</p>
              <ul className="border-b border-line">
                {WHAT_IF.map((question) => (
                  <li key={question} className="flex gap-3 border-t border-line py-5">
                    <RiQuestionLine className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-lg leading-relaxed text-ink">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-primary">Measurable impact</p>
              <ProofLedger items={IMPACT} compact fill />
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="tight">
        <Container>
          <Block eyebrow="Who uses this" title="Intelligence for the decisions that matter.">
            <OfferMatrix
              items={USERS.map(({ name, desc, ...rest }) => ({ ...rest, title: name, desc }))}
              prompt="Don't see your team here?" surface="subtle"
            />
          </Block>
        </Container>
      </Section>

      <Section>
        <Container>
          <Block
                eyebrow="Why it's different"
                title={
                  <>
                    Structured data. <span className="text-primary lg:block">Not another survey report.</span>
                  </>
                }
                lede="Most GCC market reports are survey-based, delayed by months, and impossible to slice. Bamboo Reports' intelligence is:">
            <RuledList items={DIFFERENCES} max={2} />
          </Block>
        </Container>
      </Section>

      <DemoCta title="Ready to see what your market really looks like?" />
      <Footer showCta={false} />
    </div>
  );
};

export default AccountMarketIntelligence;
