import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DemoCta, MarketingHero, SectionIntro } from "@/components/B2BMarketingPage";
import { useSEO } from "@/hooks/useSEO";
import {
  Briefcase,
  Building2,
  Database,
  Globe,
  Layers,
  MapPin,
  RefreshCw,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

const COVERAGE = [
  { icon: Users, title: "250K+ decision-makers", desc: "Named C-suite, VPs, Directors, and function heads across the ecosystem." },
  { icon: Building2, title: "Centre-level mapping", desc: "Contacts tied to 5,800+ individual centres, not just parent companies." },
  { icon: Briefcase, title: "Function coverage", desc: "Engineering, Product, Data, Finance, HR, Legal, Operations, IT, and more." },
  { icon: MapPin, title: "Geospatial precision", desc: "Every centre geo-coded across India's GCC cities and clusters." },
  { icon: Layers, title: "Service-mix context", desc: "5–12 structured service classifications per centre: what each GCC actually does." },
  { icon: Tag, title: "Sector & tech tagging", desc: "BFSI, Tech, Pharma, Retail, Manufacturing, with tech-stack signals layered in." },
];

const USERS = [
  { tag: "01", name: "SaaS & Tech Vendors", desc: "Pipeline generation for India GCC accounts." },
  { tag: "02", name: "Staffing & RPO Firms", desc: "Reach HR and TA heads at scale." },
  { tag: "03", name: "Real Estate & Facilities", desc: "Connect with Admin, CRE, and Operations leaders." },
  { tag: "04", name: "Consulting & Advisory", desc: "Identify and prioritise target accounts fast." },
  { tag: "05", name: "Event & Community Platforms", desc: "Grow your GCC practitioner network." },
];

const RESEARCH = [
  { icon: Database, text: "260+ man-months of structured research since 2022, built centre by centre, not scraped." },
  { icon: Globe, text: "250+ structured data points per GCC across 6 interlinked data tables." },
  { icon: RefreshCw, text: "AI-augmented weekly refresh cycles with automated change detection as leaders move." },
  { icon: Sparkles, text: "Every field mapped to an AI agent for enrichment, validation, and quality checks." },
];

const GCCProspectData = () => {
  useSEO({
    title: "GCC Prospect Data | Verified India GCC Decision-Makers | Bamboo Reports",
    description:
      "The most complete, structured contact intelligence on India's GCC ecosystem. Verified decision-makers across thousands of centres, ready to power your outreach.",
    keywords:
      "GCC prospect data, India GCC contacts, GCC decision makers, GCC contact database, India GCC leaders",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        title={
          <>
            <span className="block">Every GCC in India.</span>
            <span className="block text-primary">Every Decision-Maker Who Matters.</span>
          </>
        }
        description={
          <p>
            Bamboo Reports gives you the most complete, structured contact intelligence on India's
            Global Capability Centre ecosystem: 250K+ verified decision-makers across 5,800+
            centres, continuously refreshed and ready to power your outreach.
          </p>
        }
      />

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ The Problem" title="Your Outreach Is Only as Good as Your Data.">
            <div className="space-y-4">
              <p>
                India's GCC market is moving fast. New centres open every quarter. Leaders change
                roles. Scraped databases hand you stale contacts, wrong titles, parent-company-only
                records, and zero centre-level context.
              </p>
              <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">
                Most lists give you names. <span className="text-primary">We give you the right names</span>, mapped to the right
                centre, in the right role, with the service-mix and tech-stack context you need to
                start a conversation.
              </p>
            </div>
          </SectionIntro>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ What's Inside" title="Built for GCC Go-To-Market." />
          <div className="mt-10 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {COVERAGE.map((item) => (
              <div key={item.title} className="border-t py-6">
                <item.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-6xl border-t pt-6 text-lg text-muted-foreground">
            Built from Bamboo Reports' proprietary database. <span className="font-semibold text-foreground">40% more accounts than NASSCOM, 3x more centres, and 21x more structured data per GCC than the nearest alternative.</span>
          </p>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label="/ Who Uses This" title="Built for Teams That Sell Into GCCs." />
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {USERS.map((item) => (
              <div key={item.tag} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t py-6">
                <span className="text-sm font-semibold tabular-nums text-accent">{item.tag}</span>
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label="/ Why Bamboo Reports"
            title={<>This Isn't a Scraped List.<br /><span className="text-primary">This Is a Research Asset.</span></>}
          />
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {RESEARCH.map((item) => (
              <div key={item.text} className="grid grid-cols-[1.5rem_1fr] gap-4 border-t py-6">
                <item.icon className="mt-1 h-5 w-5 text-primary" aria-hidden />
                <p className="text-lg leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoCta
        title="Get a custom GCC dataset built around your market."
      />

      <Footer showCta={false} />
    </div>
  );
};

export default GCCProspectData;
