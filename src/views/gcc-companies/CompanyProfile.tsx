import {
  RiAddLine,
  RiArrowRightLine,
  RiGlobalLine,
  RiLinkedinBoxLine,
  RiLockLine,
} from "@remixicon/react";
import Link from "next/link";
import { preconnect } from "react-dom";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import StructuredData from "@/components/StructuredData";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import CompanyCard from "./CompanyCard";
import CompanyLogo from "@/components/CompanyLogo";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE_URL } from "@/lib/seo";
import {
  formatBand,
  formatRevenue,
  relatedCompanies,
  toSummary,
  type GccCompany,
} from "@/lib/gccCompanies";

const possessive = (name: string) => (name.endsWith("s") ? `${name}'` : `${name}'s`);

const listJoin = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

const plural = (n: number, word: string, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;

/** Questions answered straight from the data, for readers and answer engines. */
export const profileFaqs = (c: GccCompany) => {
  const cities = c.india.cities.map((city) => city.name);
  const types = c.centreTypes.map((t) => t.type);
  const headcount = formatBand(c.india.headcount);

  return [
    {
      question: `Where are ${possessive(c.name)} centres in India?`,
      answer: `${c.name} has ${plural(c.centreCount, "centre")} in India, in ${listJoin(cities)}.`,
    },
    c.india.since && {
      question: `When did ${c.name} open its first centre in India?`,
      answer: `${possessive(c.name)} first centre in India opened in ${c.india.since}${
        c.india.firstCity ? `, in ${c.india.firstCity}` : ""
      }.`,
    },
    headcount && {
      question: `How many people does ${c.name} employ in India?`,
      answer: `Bamboo Reports puts ${possessive(c.name)} India headcount at ${headcount} across its centres.`,
    },
    {
      question: `What do ${possessive(c.name)} India centres do?`,
      answer: c.functions.length
        ? `The centres cover ${listJoin(c.functions)}. Centre types: ${listJoin(types)}.`
        : `Centre types: ${listJoin(types)}.`,
    },
  ].filter(Boolean) as { question: string; answer: string }[];
};

const Fact = ({ label, children }: { label: string; children: ReactNode }) =>
  children ? (
    <div className="flex justify-between gap-4 border-b border-line py-3 text-sm last:border-b-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{children}</dd>
    </div>
  ) : null;

/**
 * Centre types as horizontal bars in one hue: a part-to-whole read that a pie
 * can't give with up to 11 types and many one- or two-type companies. The
 * visible type and count labels double as the table view.
 */
const TypeBars = ({ types }: { types: GccCompany["centreTypes"] }) => {
  const max = Math.max(...types.map((t) => t.centres));
  return (
    <ul className="flex flex-col gap-4 sm:gap-3">
      {types.map((t) => (
        <li
          key={t.type}
          title={`${t.type}: ${plural(t.centres, "centre")}`}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[11rem_minmax(0,1fr)_6rem]"
        >
          <span className="truncate text-ink">{t.type}</span>
          <span aria-hidden className="col-span-2 row-start-2 h-2.5 sm:col-span-1 sm:row-start-auto">
            <span
              className="block h-full rounded-r-[4px] bg-primary"
              style={{ width: `${(t.centres / max) * 100}%` }}
            />
          </span>
          <span className="text-right tabular-nums text-ink-soft sm:col-start-3 sm:row-start-1">{plural(t.centres, "centre")}</span>
        </li>
      ))}
    </ul>
  );
};

const crumb =
  "rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const PREVIEW_COLUMNS = ["City and area", "Type", "Opened", "Headcount", "Functions"];

/**
 * A blurred stand-in for the centre-by-centre table. Placeholder bars only:
 * the real rows are never exported, so nothing sits behind the blur.
 */
const CentrePreview = () => (
  <div aria-hidden className="relative mt-5 overflow-hidden rounded-md border border-line bg-background">
    <div className="grid grid-cols-3 gap-4 border-b border-line px-4 py-2.5 text-xs font-medium text-ink-muted sm:grid-cols-5">
      {PREVIEW_COLUMNS.map((col, i) => (
        <span key={col} className={cn("truncate", i > 2 && "hidden sm:block")}>
          {col}
        </span>
      ))}
    </div>
    <div className="divide-y divide-line blur-[3px]">
      {[0.9, 0.6, 0.75].map((w, row) => (
        <div key={row} className="grid grid-cols-3 gap-4 px-4 py-3.5 sm:grid-cols-5">
          {PREVIEW_COLUMNS.map((col, i) => (
            <span
              key={col}
              className={cn("h-2.5 rounded-full bg-line-strong", i > 2 && "hidden sm:block")}
              style={{ width: `${w * (90 - i * 9)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const LOCKED = (c: GccCompany) => {
  const one = c.centreCount === 1;
  return [
    one
      ? `${possessive(c.name)} India centre, with its location, type, headcount and opening year`
      : `All ${c.centreCount} of ${possessive(c.name)} India centres, each with its location, type, headcount and opening year`,
    `The services ${one ? "the centre delivers" : "each centre delivers"}`,
    `The regions ${one ? "it supports" : "each centre supports"}, from global to India-only`,
    `The software ${one ? "the centre uses" : "each centre uses"}`,
  ];
};

const CompanyProfile = ({ company: c }: { company: GccCompany }) => {
  preconnect("https://cdn.brandfetch.io");
  const faqs = profileFaqs(c);
  // A to Z here; the directory cards keep the most common first.
  const functions = [...c.functions].sort((a, b) => a.localeCompare(b));
  const related = relatedCompanies(c);
  const url = `${SITE_URL}/gcc-companies/${c.slug}`;

  const stats = [
    { value: String(c.centreCount), label: "India centres" },
    { value: String(c.india.cities.length), label: c.india.cities.length === 1 ? "City" : "Cities" },
    { value: c.india.since ? String(c.india.since) : "–", label: "In India since" },
    { value: formatBand(c.india.headcount) ?? "–", label: "India headcount" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="faq" data={{ questions: faqs }} />
      <StructuredData
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: `${SITE_URL}/` },
            { name: "GCC companies", url: `${SITE_URL}/gcc-companies` },
            { name: c.name, url },
          ],
        }}
      />
      <Header />

      <main>
        <Section spacing="tight" className="hero-wash border-b border-line">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={crumb}>Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/gcc-companies" className={crumb}>GCC companies</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">{c.name}</li>
              </ol>
            </nav>

            <div className="flex flex-col gap-10 motion-safe:animate-rise-in">
              <div className="flex items-start gap-5">
                <CompanyLogo name={c.name} website={c.website} size="lg" className="mt-1 hidden sm:flex" />
                <SectionHeading
                  as="h1"
                  size="display-sm"
                  eyebrow={c.category}
                  title={`${c.name} in India`}
                  lede={c.about ?? undefined}
                  className="min-w-0 max-w-3xl flex-1"
                />
              </div>

              <dl className="grid grid-cols-2 border-y border-line sm:grid-cols-4 sm:[&>div:nth-child(3)]:border-l">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "flex flex-col-reverse gap-1 py-5 sm:px-6 sm:first:pl-0",
                      i < 2 && "border-b border-line sm:border-b-0",
                      i % 2 === 1 && "border-l border-line pl-5 sm:pl-6",
                    )}
                  >
                    <dt className="text-sm text-ink-soft">{s.label}</dt>
                    <dd className="text-figure-sm font-display-soft tabular-nums text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>

        <Section spacing="tight">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
              <div className="order-2 flex min-w-0 flex-col gap-16 lg:order-1">
                <section aria-labelledby="centre-types" className="flex flex-col gap-6">
                  <SectionHeading
                    as="h2"
                    size="title"
                    title={<span id="centre-types">Types of centre</span>}
                    lede={`${possessive(c.name)} ${plural(c.centreCount, "centre")} in India, by what each is set up to do.`}
                  />
                  {c.centreTypes.length > 1 ? (
                    <TypeBars types={c.centreTypes} />
                  ) : (
                    <p className="text-ink-soft">
                      {c.centreCount === 1
                        ? `${possessive(c.name)} one India centre is classed as ${c.centreTypes[0].type}.`
                        : `All ${c.centreCount} of ${possessive(c.name)} India centres are classed as ${c.centreTypes[0].type}.`}
                    </p>
                  )}
                </section>

                {functions.length ? (
                  <section aria-labelledby="functions" className="flex flex-col gap-6">
                    <SectionHeading as="h2" size="title" title={<span id="functions">What the India centres work on</span>} />
                    <ul className="flex flex-wrap gap-2">
                      {functions.map((f) => (
                        <li key={f} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-ink">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <section aria-labelledby="locked" className="rounded-lg border border-line bg-surface-subtle p-6 sm:p-8">
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <RiLockLine aria-hidden className="size-4" />
                    In the Bamboo Reports platform
                  </p>
                  <h2 id="locked" className="mt-3 text-title font-display-soft text-ink">
                    {possessive(c.name)} centres, one by one
                  </h2>
                  <CentrePreview />
                  <ul className="mt-6 flex flex-col gap-3 text-ink-soft">
                    {LOCKED(c).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-[1px] bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="mt-7">
                    <CalSchedulingButton>
                      Book a demo
                      <RiArrowRightLine aria-hidden />
                    </CalSchedulingButton>
                  </Button>
                </section>

                <section aria-labelledby="faq" className="flex flex-col gap-6">
                  <SectionHeading as="h2" size="title" title={<span id="faq">{c.name} in India: common questions</span>} />
                  <div className="divide-y divide-line border-y border-line">
                    {faqs.map((f, i) => (
                      <details key={f.question} open={i === 0} className="group py-4">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                          {f.question}
                          <RiAddLine
                            aria-hidden
                            className="mt-0.5 size-5 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                          />
                        </summary>
                        <p className="mt-2 max-w-[65ch] pr-9 leading-relaxed text-ink-soft">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              </div>

              {/* Parent company comes first on phones, beside the content from lg up. */}
              <aside className="order-1 flex flex-col gap-10 self-start lg:sticky lg:top-24 lg:order-2">
                <div>
                  <h2 className="border-b border-ink pb-2 text-base font-semibold text-ink">Parent company</h2>
                  <dl>
                    <Fact label="Legal name">{c.legalName}</Fact>
                    <Fact label="Headquarters">{[c.hq.city, c.hq.country].filter(Boolean).join(", ")}</Fact>
                    <Fact label="Industry">{c.industry}</Fact>
                    <Fact label="Sub-industry">{c.subIndustry}</Fact>
                    <Fact label="Ownership">{c.ownership}</Fact>
                    <Fact label="Revenue">{formatRevenue(c.revenueRange)}</Fact>
                    <Fact label="Global employees">{formatBand(c.employeeRange)}</Fact>
                    <Fact label="Forbes Global 2000">{c.forbes2000Rank ? `#${c.forbes2000Rank}` : null}</Fact>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.website ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={c.website} target="_blank" rel="noopener noreferrer nofollow">
                          <RiGlobalLine aria-hidden />
                          Website
                        </a>
                      </Button>
                    ) : null}
                    {c.linkedin ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={c.linkedin} target="_blank" rel="noopener noreferrer nofollow">
                          <RiLinkedinBoxLine aria-hidden />
                          LinkedIn
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>

                {c.offerings.length ? (
                  <div>
                    <h2 className="border-b border-ink pb-2 text-base font-semibold text-ink">What {c.name} sells</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.offerings.join(", ")}</p>
                  </div>
                ) : null}

                <p className="text-sm text-ink-muted">
                  Source: Bamboo Reports. Last updated{" "}
                  <time dateTime={c.updated}>
                    {new Date(c.updated).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                  </time>
                  .
                </p>
              </aside>
            </div>
          </Container>
        </Section>

        {related.length ? (
          <Section spacing="tight" surface="subtle" bordered>
            <Container>
              <SectionHeading
                as="h2"
                size="title"
                title="Similar companies with GCCs in India"
                lede={`Also in ${c.category}.`}
              />
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <CompanyCard c={toSummary(r)} headingLevel="h3" />
                  </li>
                ))}
              </ul>
              <Link
                href="/gcc-companies"
                className="group mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See all GCC companies
                <TrailingArrow />
              </Link>
            </Container>
          </Section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default CompanyProfile;
