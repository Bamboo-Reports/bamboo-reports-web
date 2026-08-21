import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { DemoCta } from "@/components/B2BMarketingPage";
import { HERO_DESCRIPTION, HERO_SHOT, STAGES } from "@/components/platform/content";
import { useSEO } from "@/hooks/useSEO";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    copy: "5,900+ centres profiled across India, each held separately.",
  },
];

const ALTERNATIVES = [
  {
    title: "Published reports",
    copy: "Counts at parent company level, published annually, and 6 to 12 months out of date on release. No function breakdown.",
  },
  {
    title: "Contact databases",
    copy: "Names against a company, with no way to tell which centre a person sits in or what that centre is responsible for.",
  },
  {
    title: "Internal knowledge",
    copy: "Sharp on accounts a team has touched, blank everywhere else, and it decays as centres restructure.",
  },
];

const AUDIENCES = [
  {
    title: "Selling to GCCs",
    who: "Advisory firms, technology vendors, real estate, private equity",
    points: [
      { lead: "Origination", copy: "centres in build surface before the mandate goes to open pitch." },
      { lead: "Proposal strength", copy: "benchmarking anchored on current, centre-level data." },
      { lead: "Qualified pipeline", copy: "target universe through to consented leads via research-led ABM." },
    ],
  },
  {
    title: "Running a GCC",
    who: "Centre heads, chief operating officers, strategy and expansion teams",
    points: [
      { lead: "Peer benchmarking", copy: "how peer centres in the same sector, size and city are structured." },
      { lead: "Expansion planning", copy: "cities and functions for new capability centres, backed by real data." },
      { lead: "Board-level evidence", copy: "support for strategic proposals to global headquarters." },
    ],
  },
];

const ACCESS_TIERS = [
  { title: "Platform access", copy: "Dashboards, mapping and saved views" },
  { title: "Reports and data cuts", copy: "Standard, exclusive and on-demand slices" },
  { title: "Enterprise engagements", copy: "ICP scoping, ABM activation, analyst support" },
];

const SOURCING = [
  {
    title: "Where it comes from",
    copy: "A mix of primary and secondary research: public information validated by analysts, with primary layers from surveys and leadership interviews.",
  },
  {
    title: "How current it stays",
    copy: "Every field carries a defined weekly, monthly or quarterly refresh cycle. Contact records hold 95%+ accuracy on business email and title.",
  },
  {
    title: "How consent is handled",
    copy: "For intelligence and data, consent ownership sits with the client under prevailing privacy laws. For ABM, explicit consent is captured before any lead is passed on.",
  },
  {
    title: "What procurement needs",
    copy: "Non-disclosure and data processing agreements supported, with corporate credentials available for internal approval processes.",
  },
];

// All optimised stills from past roundtables, shown as a scrolling strip
// in a fresh order on every visit.
const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const ROUNDTABLE_PHOTOS = Array.from(
  { length: 18 },
  (_, i) => `/roundtables/${i + 1}-960.webp`,
);

/* ------------------------------------------------------------------ */
/* Local building blocks                                               */
/* ------------------------------------------------------------------ */

/**
 * The page's one section grammar: a label seated on a hairline rule,
 * the way a research report divides its chapters. Replaces the
 * floating-eyebrow-per-section pattern.
 */
const SectionRule = ({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) => (
  <header>
    <div className="flex items-center gap-4">
      <p className="flex-shrink-0 text-sm font-semibold leading-none text-accent">{label}</p>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
    <h2 className="mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
      {title}
    </h2>
    {children && (
      <div className="mt-4 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
        {children}
      </div>
    )}
  </header>
);

/**
 * Counts from 0 to target when the element scrolls into view. Jumps
 * straight to the final figure under prefers-reduced-motion.
 */
const useCountUp = (target: number, durationMs = 1600) => {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }

    let frame: number;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return { ref, value };
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const About = () => {
  const photos = useMemo(() => shuffle(ROUNDTABLE_PHOTOS), []);
  const centres = useCountUp(5900);

  useSEO({
    title: "About Bamboo Reports | The India GCC dataset built centre by centre",
    description:
      "Bamboo Reports profiles 5,900+ individual India GCC centres against 2,400+ parent accounts: what each centre does, who runs it and what it runs on. A Research NXT product, built since 2022.",
    keywords:
      "about Bamboo Reports, Research NXT, India GCC dataset, GCC centre level data, GCC research methodology",
    canonicalUrl: "https://bambooreports.com/about",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ---------- Hero: headline left, argument right ---------- */}
      <section className="px-5 pb-14 pt-14 sm:px-4 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
            <h1
              className="hero-rise text-balance text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl"
              style={{ animationDelay: "20ms" }}
            >
              The GCC dataset that had to be built, not bought.
            </h1>

            <div>
              <p
                className="hero-rise text-pretty leading-relaxed text-muted-foreground md:text-lg"
                style={{ animationDelay: "100ms" }}
              >
                Published research counts GCCs at parent company level. In 2022 we started
                answering a different question: what each individual centre does, who runs it,
                and what it runs on. That answer now covers 5,900+ centres across India.
              </p>
              <a
                href="#origin"
                className="hero-rise group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors duration-micro ease-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ animationDelay: "180ms" }}
              >
                How the data is built
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- The numbers ---------- */}
      <section className="border-y px-5 py-14 sm:px-4 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p
            ref={centres.ref as React.RefObject<HTMLParagraphElement>}
            className="text-6xl font-bold tabular-nums tracking-tight text-primary sm:text-7xl md:text-8xl"
          >
            {formatCentres(centres.value)}
            <span className="text-accent">+</span>
          </p>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-snug md:text-2xl">
            individual centres, each profiled separately
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Against 2,400+ parent accounts. That gap is the whole point: most companies run more
            than one.
          </p>

        </div>
      </section>

      {/* ---------- Why it exists ---------- */}
      <FadeIn>
        <section id="origin" className="scroll-mt-24 px-5 py-14 sm:px-4 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionRule label="Why it exists" title="How the dataset started" />

            <div className="mt-10 space-y-5 leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Research NXT built the first structured GCC list for the NASSCOM GCC Forum in
                2018. The requests that followed kept arriving in the same shape: not how many
                centres a company has, but what a specific centre in a specific city does, and
                who to speak to there.
              </p>
              <p>
                No published source held that. So the answer had to be built rather than bought,
                starting in 2022. It took 260+ man-months before the first client saw it.
              </p>
            </div>

            {/* The same story as three ruled milestones. */}
            <ol className="mt-12 grid gap-x-12 gap-y-8 md:mt-16 md:grid-cols-3">
              {TIMELINE.map((moment) => (
                <li key={moment.year} className="border-t-2 border-accent pt-4">
                  <p className="text-2xl font-bold tabular-nums tracking-tight md:text-3xl">
                    {moment.year}
                  </p>
                  <p className="mt-2 max-w-[38ch] leading-relaxed text-muted-foreground">
                    {moment.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </FadeIn>

      {/* ---------- What the alternatives miss ---------- */}
      <FadeIn>
        <section className="border-y bg-secondary/30 px-5 py-14 sm:px-4 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionRule label="What the alternatives miss" title="Why it had to be built" />

            {/* A comparison reads best as a table, not a card grid. */}
            <div className="mt-10 border-t">
              {ALTERNATIVES.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-2 border-b py-6 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-10 md:py-7"
                >
                  <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="max-w-3xl leading-relaxed text-muted-foreground">{item.copy}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-pretty text-xl font-semibold leading-snug md:text-2xl">
              Building from the ground up is also why the dataset holds{" "}
              <span className="text-primary">40% more accounts</span> and{" "}
              <span className="text-primary">3x more centres</span> than published industry figures.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ---------- Inside the platform ---------- */}
      <FadeIn>
        <section className="px-5 py-14 sm:px-4 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionRule label="Inside the platform" title="What the platform does">
              <p>{HERO_DESCRIPTION}</p>
            </SectionRule>

            <div className="mt-10">
              <img
                src={HERO_SHOT.src}
                srcSet={HERO_SHOT.srcSet}
                sizes={HERO_SHOT.sizes}
                alt={HERO_SHOT.alt}
                width={HERO_SHOT.width}
                height={HERO_SHOT.height}
                loading="lazy"
                className="h-auto w-full rounded-md border bg-background shadow-sm"
              />
            </div>

            {/* The five stages, in the order the work is done. Copy is
                shared with /platform via components/platform/content.ts.
                The numbering is real: it is the working sequence. */}
            <ol className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {STAGES.map((stage, index) => (
                <li key={stage.id} className="border-t py-6">
                  <p className="text-sm font-semibold tabular-nums text-accent">
                    {index + 1} · {stage.verb}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{stage.headline}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {stage.desc}
                  </p>
                </li>
              ))}
              {/* The natural sixth step: go see it. Styled as one more
                  row of the sequence so the grid closes cleanly. */}
              <li className="border-t py-6">
                <p className="text-sm font-semibold tabular-nums text-accent">6 · Explore</p>
                <h3 className="mt-2 text-lg font-bold leading-snug">See it for yourself.</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The full product tour, one screen at a time.
                </p>
                <Link
                  to="/platform"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors duration-micro ease-smooth hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Walk through the platform
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            </ol>
          </div>
        </section>
      </FadeIn>

      {/* ---------- Who uses it ---------- */}
      <FadeIn>
        <section className="border-y bg-secondary/30 px-5 py-14 sm:px-4 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionRule label="Who uses it" title="Two audiences, one dataset" />

            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x">
              {AUDIENCES.map((audience, index) => (
                <div key={audience.title} className={index === 0 ? "lg:pr-14" : "lg:pl-14"}>
                  <h3 className="text-xl font-bold leading-snug md:text-2xl">{audience.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {audience.who}
                  </p>
                  <dl className="mt-6">
                    {audience.points.map((point) => (
                      <div key={point.lead} className="border-t py-4">
                        <dt className="font-semibold text-foreground">{point.lead}</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">{point.copy}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <dl className="mt-12 grid gap-x-10 border-t pt-2 md:mt-16 md:grid-cols-3">
              {ACCESS_TIERS.map((tier) => (
                <div key={tier.title} className="py-5">
                  <dt className="text-lg font-bold leading-snug">{tier.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {tier.copy}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </FadeIn>

      {/* ---------- Sourcing and compliance ---------- */}
      <FadeIn>
        <section className="px-5 py-14 sm:px-4 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionRule label="Sourcing and compliance" title="What procurement asks for">
              <p>
                Enterprise buyers put this data through procurement and risk review. The four
                points below cover what those teams normally need on file.
              </p>
            </SectionRule>

            <div className="mt-10 grid gap-x-16 md:grid-cols-2">
              {SOURCING.map((item) => (
                <div key={item.title} className="border-t py-6">
                  <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ---------- Roundtables: the marquee carries the motion ---------- */}
      <section className="border-t px-5 py-14 sm:px-4 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionRule label="Beyond the platform" title="Roundtables" />

          <p className="mt-4 leading-relaxed text-muted-foreground md:text-lg">
            The first roundtable ran in 2025. Since then the sessions have travelled across
            Mumbai, NCR and Bengaluru, putting centre heads in a room with the people building
            for them &mdash; client-hosted sessions alongside our own.
          </p>
        </div>

        <div
          className="roundtable-strip -mx-5 mt-10 sm:-mx-4 md:mt-12"
          role="img"
          aria-label="Photographs from past roundtable sessions, hosted by Bamboo Reports and by clients, across Mumbai, NCR and Bengaluru"
        >
          <div className="roundtable-strip-track">
            {photos.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
                className="h-40 w-auto flex-shrink-0 rounded-md border object-cover md:h-52"
              />
            ))}
            {/* Second copy of the strip so the loop wraps seamlessly. */}
            {photos.map((src) => (
              <img
                key={`${src}-dup`}
                src={src}
                alt=""
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
                aria-hidden
                className="h-40 w-auto flex-shrink-0 rounded-md border object-cover md:h-52"
              />
            ))}
          </div>
        </div>
      </section>

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

// 5900 -> "5,900": the ledger always shows the thousands separator.
const formatCentres = (n: number) => n.toLocaleString("en-US");

export default About;
