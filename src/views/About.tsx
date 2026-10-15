import {
  RiBookmark3Line,
  RiBriefcase4Line,
  RiBuilding2Line,
  RiContactsBook2Line,
  RiDashboard3Line,
  RiDatabase2Line,
  RiFileChart2Line,
  RiFileList3Line,
  RiFileTextLine,
  RiFilter3Line,
  RiMap2Line,
  RiRefreshLine,
  RiShieldCheckLine,
  RiTableLine,
  RiTeamLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import CentreCount from "@/components/about/CentreCount";
import RoundtableStrip from "@/components/about/RoundtableStrip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { DemoCta } from "@/components/layout/B2BMarketingPage";
import { Lines, OfferMatrix, ProblemSpread, type MatrixItem } from "@/components/marketing/OfferBlocks";
import OfferIndex from "@/components/marketing/OfferIndex";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { HERO_DESCRIPTION, STAGES } from "@/components/platform/content";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// The origin story is a real sequence, so it earns a timeline. Every
// fact here restates the prose beside it; nothing new is claimed.
const TIMELINE = [
  {
    year: "2018",
    copy: "The first structured GCC list, built for the NASSCOM GCC Forum.",
  },
  {
    year: "2022",
    copy: "The centre-level build starts. 260+ man-months before the first client saw it.",
  },
  {
    year: "Today",
    copy: "6,000+ centres profiled across India, each held separately.",
  },
];

const ALTERNATIVES: MatrixItem[] = [
  {
    icon: RiFileTextLine,
    title: "Published reports",
    desc: "Counts at parent company level, published annually, and 6 to 12 months out of date on release. No function breakdown.",
  },
  {
    icon: RiContactsBook2Line,
    title: "Contact databases",
    desc: "Names against a company, with no way to tell which centre a person sits in or what that centre is responsible for.",
  },
  {
    icon: RiTeamLine,
    title: "Internal knowledge",
    desc: "Sharp on accounts a team has touched, blank everywhere else, and it decays as centres restructure.",
  },
];

const AUDIENCES = [
  {
    title: "Selling to GCCs",
    who: "Advisory firms, technology vendors,\nreal estate, private equity",
    points: [
      { lead: "Origination", copy: "centres in build surface before the mandate goes to open pitch." },
      { lead: "Proposal strength", copy: "benchmarking anchored on current, centre-level data." },
      { lead: "Qualified pipeline", copy: "target universe through to consented leads via research-led ABM." },
    ],
  },
  {
    title: "Running a GCC",
    who: "Centre heads, chief operating officers,\nstrategy and expansion teams",
    points: [
      { lead: "Peer benchmarking", copy: "how peer centres in the same sector, size and city are structured." },
      { lead: "Expansion planning", copy: "cities and functions for new capability centres, backed by real data." },
      { lead: "Board-level evidence", copy: "support for strategic proposals to global headquarters." },
    ],
  },
];

const ACCESS_TIERS: MatrixItem[] = [
  { icon: RiDashboard3Line, title: "Platform access", desc: "Dashboards, mapping\nand saved views" },
  { icon: RiFileChart2Line, title: "Reports and data cuts", desc: "Standard, exclusive and\non-demand slices" },
  { icon: RiBriefcase4Line, title: "Enterprise engagements", desc: "ICP scoping, ABM activation,\nanalyst support" },
];

const SOURCING: MatrixItem[] = [
  {
    icon: RiDatabase2Line,
    title: "Where it comes from",
    desc: "A mix of primary and secondary research: public information validated by analysts, with primary layers from surveys and leadership interviews.",
  },
  {
    icon: RiRefreshLine,
    title: "How current it stays",
    desc: "Every field carries a defined weekly, monthly or quarterly refresh cycle. Contact records hold 95%+ accuracy on business email and title.",
  },
  {
    icon: RiShieldCheckLine,
    title: "How consent is handled",
    desc: "For intelligence and data, consent ownership sits with the client under prevailing privacy laws. For ABM, explicit consent is captured before any lead is passed on.",
  },
  {
    icon: RiFileList3Line,
    title: "What procurement needs",
    desc: "Non-disclosure and data processing agreements supported,\nwith corporate credentials available for internal\napproval processes.",
  },
];

// One icon per platform stage, keyed by the stage id in platform/content.ts.
const STAGE_ICONS: Record<string, RemixiconComponentType> = {
  filters: RiFilter3Line,
  map: RiMap2Line,
  "data-view": RiTableLine,
  "extended-data-view": RiBuilding2Line,
  "saved-filters": RiBookmark3Line,
};


/* ------------------------------------------------------------------ */
/* Local building blocks                                               */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        backgroundImage="/hero-backgrounds/about-v2.webp"
        title="About us"
        lede="The India GCC dataset that had to be built, not bought."
      />

      {/* ---------- The numbers ---------- */}
      <Section spacing="tight" bordered>
        <Container className="flex flex-col gap-3">
          <CentreCount />
          <p className="mt-2 text-title font-display-soft text-ink">individual centres, each profiled separately</p>
          <p className="text-lg leading-relaxed text-ink-soft">
            Against 2,400+ parent accounts. The gap matters because most companies run more than one centre.
          </p>
        </Container>
      </Section>

      {/* ---------- Why it exists ---------- */}
      <Section id="origin" surface="subtle" bordered className="scroll-mt-24">
        <Container className="flex flex-col gap-12">
          <ProblemSpread
            eyebrow="Why it exists"
            title="How the dataset started"
            body="Research NXT built the first structured GCC list for the NASSCOM GCC Forum in 2018. The requests that followed kept arriving in the same shape: not how many centres a company has, but what a specific centre in a specific city does, and who to speak to there."
            statement="No published source held that. So the answer had to be built rather than bought, starting in 2022. It took 260+ man-months before the first client saw it."
          />

          {/* The same story as three milestones: a real sequence. */}
          <ol className="grid gap-x-10 gap-y-10 md:grid-cols-3">
            {TIMELINE.map((moment) => (
              <li key={moment.year} className="flex flex-col gap-3 border-t border-line-strong pt-6">
                <span aria-hidden="true" className="block h-1 w-6 rounded-[1px] bg-accent" />
                <p className="font-display tabular-nums text-figure-sm text-ink">{moment.year}</p>
                <p className="leading-relaxed text-ink-soft">{moment.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------- What the alternatives miss ---------- */}
      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="What the alternatives miss" title="Why it had to be built" />

          <OfferMatrix items={ALTERNATIVES} />

          <p className="text-xl font-semibold leading-snug text-ink">
            Building from the ground up is also why the dataset holds{" "}
            <span className="text-primary">40% more accounts</span> and{" "}
            <span className="text-primary">3x more centres</span> than published industry figures.
          </p>
        </Container>
      </Section>

      {/* ---------- Inside the platform ---------- */}
      <Section surface="subtle" bordered>
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Inside the platform" title="What the platform does" lede={HERO_DESCRIPTION} />

          {/* The five stages in the order the work is done (copy shared with
              /platform), read one at a time like the product suite. The step
              number stays: it is the working sequence. */}
          <OfferIndex
            label="Inside the platform"
            items={STAGES.map((stage, index) => {
              const Icon = STAGE_ICONS[stage.id] ?? RiDashboard3Line;
              return {
                title: stage.headline,
                badge: `${index + 1} · ${stage.verb}`,
                body: stage.desc,
                icon: <Icon className="size-6" aria-hidden />,
              };
            })}
          />
          <div>
            <Link
              href="/platform"
              className="group inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
            >
              Walk through the platform
              <TrailingArrow />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ---------- Who uses it ---------- */}
      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Who uses it" title="Two audiences, one dataset" />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-line">
            {AUDIENCES.map((audience, index) => (
              <div key={audience.title} className={index === 0 ? "lg:pr-14" : "lg:pl-14"}>
                <h3 className="text-headline font-display-soft text-ink">{audience.title}</h3>
                <p className="mt-2 font-semibold text-ink-muted">
                  <Lines text={audience.who} />
                </p>
                <dl className="mt-6 border-b border-line">
                  {audience.points.map((point) => (
                    <div key={point.lead} className="border-t border-line py-5">
                      <dt className="text-lg font-semibold text-ink">{point.lead}</dt>
                      <dd className="mt-1 leading-relaxed text-ink-soft">{point.copy}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <OfferMatrix items={ACCESS_TIERS} />
        </Container>
      </Section>

      {/* ---------- Sourcing and compliance ---------- */}
      <Section surface="subtle" bordered>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Sourcing and compliance"
            title="What procurement asks for"
            lede="Enterprise buyers put this data through procurement and risk review. The four points below cover what those teams normally need on file."
          />
          <OfferMatrix items={SOURCING} columns={2} surface="subtle" />
        </Container>
      </Section>

      {/* ---------- Roundtables: the marquee carries the motion ---------- */}
      <Section bordered>
        <Container>
          <SectionHeading
            eyebrow="Beyond the platform"
            title="Roundtables"
            lede="The first roundtable ran in 2025. Since then the sessions have travelled across Mumbai, NCR and Bengaluru, putting centre heads in a room with the people building for them, client-hosted sessions alongside our own."
          />
        </Container>

        <RoundtableStrip className="mt-12" />
      </Section>

      <DemoCta
        label="See your slice of the data"
        title="Tell us the slice you need"
        description={
          <p>
            Send the sectors, cities, headcount bands and functions that matter, and we will run
            the filter on the call.
          </p>
        }
      />

      <Footer showCta={false} />
    </div>
  );
};

export default About;
