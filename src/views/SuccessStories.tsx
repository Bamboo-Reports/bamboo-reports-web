import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoCta, MarketingHero } from "@/components/layout/B2BMarketingPage";
import { ProblemSpread, ProcessRail, ProofLedger, type Proof } from "@/components/marketing/OfferBlocks";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const CASE_ONE_RESULTS: Proof[] = [
  { value: "1,050", label: "Prospect universe: global customers with India GCCs + look-alike accounts" },
  { value: "70+", label: "BFSI accounts shortlisted for strategic GTM fit" },
  { value: "44", label: "Drill-down reports: vendor, tech, entry points, decision-makers" },
  { value: "364", label: "Decision-makers mapped across BFSI shortlist" },
];

const ENGAGEMENT_ARC = [
  { title: "Discovery", body: "India GCC overview + peer company profiles in the sector." },
  { title: "Analysis", body: "Talent benchmarking, RA services landscape, peer comparisons." },
  { title: "Ongoing", body: "Customised dashboard + capacity planning + ecosystem monitoring." },
  { title: "Outcome", body: "Findings presented to the company's global leadership." },
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MarketingHero
        backgroundImage="/hero-backgrounds/success-stories.webp"
        eyebrow="Resources"
        title="Success stories"
        description="Two long-running client engagements and what each one produced."
      />

      <Section>
        <Container className="flex flex-col gap-12">
          <ProblemSpread
            eyebrow="Leading global IT services firm"
            title="BFSI GCC strategy & intelligence"
            meta="4 years · Ongoing"
            body="A global technology and consulting firm needed to expand its India BFSI GCC pipeline. The mandate: map global customers with India GCC presence, add look-alike accounts beyond their book, then go deep on the BFSI strategic shortlist."
            statement="The programme is still running 4 years on."
          />
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold text-primary">What we delivered</p>
            <ProofLedger items={CASE_ONE_RESULTS} />
          </div>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="tight">
        <Container>
          <SectionHeading
            eyebrow="Two sides of the same ecosystem"
            title={
              <>
                One dataset. Two kinds of client.{" "}
                <span className="text-primary lg:block">
                  Vendors use it to win mandates. GCCs use it to build business cases.
                </span>
              </>
            }
          />
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <ProblemSpread
            eyebrow="Global medical device company GCC"
            title="GCC benchmarking, talent & expansion"
            meta="Fortune 500 · Phased · Strategic"
            body="A Fortune 500 medical device company setting up its India GCC needed structured data on peer GCCs and the talent market, plus a benchmarking framework for its business case to the board."
            statement="The findings were presented to the company's global leadership."
          />
          <div className="flex flex-col gap-8">
            <p className="text-sm font-semibold text-primary">The engagement arc</p>
            <ProcessRail steps={ENGAGEMENT_ARC} surface="default" />
          </div>
        </Container>
      </Section>

      <DemoCta title="Talk to us about your own GCC project." />

      <Footer showCta={false} />
    </div>
  );
};

export default SuccessStories;
