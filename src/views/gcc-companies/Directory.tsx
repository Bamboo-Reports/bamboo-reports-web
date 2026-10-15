import { preconnect } from "react-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RiArrowRightLine } from "@remixicon/react";
import { MarketingHero } from "@/components/layout/B2BMarketingPage";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE_URL } from "@/lib/seo";
import { companies, databaseTotals, directoryStats, toSummary } from "@/lib/gccCompanies";
import DirectoryList from "./DirectoryList";

const BREADCRUMB_SCHEMA = {
  items: [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "GCC companies", url: `${SITE_URL}/gcc-companies` },
  ],
};

const n = (value: number) => value.toLocaleString("en-IN");

const Directory = () => {
  // Logos load from Brandfetch's CDN; open the connection early.
  preconnect("https://cdn.brandfetch.io");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="breadcrumb" data={BREADCRUMB_SCHEMA} />
      <Header />

      <main>
        <MarketingHero
          eyebrow="GCC companies"
          title="India GCC companies directory"
          description="Global companies with capability centres in India: where their centres are, what each one does and when it opened."
        />

        <Section spacing="tight">
          <Container>
            <DirectoryList companies={companies.map(toSummary)} totals={databaseTotals} />

            <p className="mt-12 max-w-[64ch] text-sm text-ink-muted">
              Source: Bamboo Reports. This directory lists {n(directoryStats.companies)} of the {n(databaseTotals.companies)}{" "}
              companies tracked in the platform.
            </p>
          </Container>
        </Section>

        <Section spacing="tight" surface="subtle" bordered>
          <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="In the platform"
              title="Every centre, its functions and the people who run it"
              lede="See all 2,400+ companies and 6,100+ centres, filter by city, function and size, and find the decision-makers behind each centre."
              size="title"
              className="max-w-2xl"
            />
            <Button asChild size="lg">
              <CalSchedulingButton>
                Get a demo
                <RiArrowRightLine aria-hidden />
              </CalSchedulingButton>
            </Button>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Directory;
