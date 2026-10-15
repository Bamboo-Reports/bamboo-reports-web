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
import StructuredData from "@/components/StructuredData";
import QuestionList, { type QuestionItem } from "@/components/marketing/QuestionList";
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
  { icon: RiCommunityLine, title: "City GCC intelligence reports", body: "Detailed reports on India's main GCC cities. Each edition covers active and upcoming centres, workforce make-up, sector and function mix, clusters within the city, and growth trends. Delivered as interactive reports." },
  { icon: RiPieChart2Line, title: "Sector snapshot reports", body: "Short reports on single sectors: BFSI, Technology, Pharma, Retail and Manufacturing. Each covers centre counts, top employers, function breakdown and city spread. Useful for product, sales and consulting teams focused on one sector." },
  { icon: RiOrganizationChart, title: "Function-mix intelligence", badge: EXCLUSIVE, body: "How GCCs split their staff across functions such as Engineering, Finance, Legal and HR. Use it to find gaps and benchmark your accounts." },
  { icon: RiBarChartGroupedLine, title: "Software vendor market share reports", badge: EXCLUSIVE, body: "Which ERP, HCM and IT platforms India GCCs use, broken down by sector, size and city. Built from thousands of verified technology records." },
  { icon: RiFileList3Line, title: "Custom research briefs", body: "Research built to your brief: a set of accounts, a region or a competitive question." },
];

const PLATFORM_CAPABILITIES: Feature[] = [
  { icon: RiDashboard3Line, title: "Interactive dashboards", desc: "Filter accounts, centres and functions and see the results update as you go." },
  { icon: RiMap2Line, title: "Geospatial intelligence", desc: "See Global Capability\ncentres by location,\ncluster and state." },
  { icon: RiBookmark3Line, title: "Saved filters", desc: "Save any search, reopen\nit in one click and share\nit with your team." },
  { icon: RiUserSettingsLine, title: "My Bamboo Reports©", desc: "Your own workspace with your target accounts, ICP and watermarked views." },
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
  { icon: RiBuilding2Line, name: "GCC leaders", desc: "Benchmark against peers, track market shifts." },
];

const DIFFERENCES = [
  { name: "Built bottom-up from 2,400+ accounts and 6,100+ centres. 260+ man-months of structured research." },
  { name: "Sliceable by city, sector, function, size, tech stack, and centre status." },
  { name: "Refreshed weekly with AI assistance,\nnot published once a year." },
  { name: "Exclusive coverage: service-mix, function-mix, and software vendor market share at centre level." },
];

const QUESTIONS: QuestionItem[] = [
  {
    question: "What is Account & Market Intelligence?",
    answer:
      "Centre-level data and reports on India's GCCs, filterable by city, sector, function or company, with three years of history.",
  },
  {
    question: "What reports are included?",
    answer:
      "City reports, sector snapshots, function-mix intelligence, software vendor market share reports and custom research briefs.",
  },
  {
    question: "How is it different from other GCC market reports?",
    answer:
      "It is built up from individual centres, refreshed weekly and filterable, unlike survey-based reports that go out of date.",
  },
  {
    question: "Can I filter the data myself?",
    answer:
      "Yes. The platform has dashboards, a map of centres, saved filters and your own workspace for target accounts.",
  },
  {
    question: "Who uses it?",
    answer:
      "Enterprise sales, product and strategy teams, investors, consulting firms and GCC leaders.",
  },
];

const AccountMarketIntelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="service"
        data={{ path: "/account-market-intelligence", name: "Account & Market Intelligence", serviceType: "India GCC market research and reports" }}
      />
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
            title="Most GCC data is too coarse to act on."
            body="Published reports track GCCs at parent-company level and go stale in months. Consulting decks arrive weeks later as 80-page PDFs. Neither answers what a specific centre actually does, or how your sector is moving right now."
            statement={
              <>
                You need data on each centre,{" "}
                <span className="text-primary">structured so you can filter it.</span>
              </>
            }
          />
        </Container>
      </Section>

      <Section surface="subtle" bordered>
        <Container>
          <Block eyebrow="Product suite" title="Reports and research, from quick reads to custom work.">
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
              title="Filter the data yourself instead of reading a PDF."
              lede="Filter to Pharma and Hyderabad and you get 41 accounts and 57 centres in seconds. Open Bayer AG to see its 18 centres across India, with headcount, full tech stack and 3 years of history."
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
              <p className="text-sm font-semibold text-primary">Questions the data answers</p>
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
              <p className="text-sm font-semibold text-primary">Results</p>
              <ProofLedger items={IMPACT} compact fill />
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="tight">
        <Container>
          <Block eyebrow="Who uses this" title="Sales, strategy, investment and GCC teams.">
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
                lede="Most GCC market reports are survey-based, months out of date and cannot be filtered. Bamboo Reports data is:">
            <RuledList items={DIFFERENCES} max={2} />
          </Block>
        </Container>
      </Section>

      <QuestionList title="Questions about Account & Market Intelligence" items={QUESTIONS} />

      <DemoCta title="See your market in the platform." />
      <Footer showCta={false} />
    </div>
  );
};

export default AccountMarketIntelligence;
