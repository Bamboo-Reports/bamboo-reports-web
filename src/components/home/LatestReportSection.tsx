import Link from "next/link";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const LatestReportSection = () => (
  <Section spacing="tight" bordered>
    <Container className="flex flex-wrap items-end justify-between gap-x-14 gap-y-8">
      <SectionHeading
        eyebrow="Q2 2026"
        title={
          <>
            The GCC market moved. <span className="text-primary">See where.</span>
          </>
        }
        lede="New centres, expansions, hiring and new locations in India's GCC market, in one free quarterly report."
        className="max-w-3xl flex-1"
      />

      <Button asChild size="lg" className="group w-full sm:w-auto">
        <Link href="/reports/india-gcc-report-q2-2026?src=home-q2report">
          Download the report
          <TrailingArrow />
        </Link>
      </Button>
    </Container>
  </Section>
);

export default LatestReportSection;
