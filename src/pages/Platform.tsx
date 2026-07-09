import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustLogos from "@/components/TrustLogos";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  BarChart3,
  Map as MapIcon,
  Table as TableIcon,
  LayoutGrid,
  Filter,
  Search,
  Layers,
  Sparkles,
  Database,
  Bookmark,
  Command,
} from "lucide-react";
import "./platform.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const LENSES = [
  {
    id: "charts",
    index: "01",
    icon: BarChart3,
    title: "Charts",
    desc: "The market, already visualised. Region, sector, function, headcount and revenue splits, boardroom-ready out of the box. Zero BI tickets, zero dashboard projects.",
    src: "/platform/charts-view.png",
    alt: "Bamboo Reports Account Analytics charts: region and primary nature breakdowns",
  },
  {
    id: "map",
    index: "02",
    icon: MapIcon,
    title: "Map",
    desc: "Watch India's GCC footprint light up. An interactive heatmap drillable from state to city to locality. Every centre geocoded, every account stitched to the places it operates.",
    src: "/platform/centers-map.png",
    alt: "Bamboo Reports Center Analytics map: India heatmap of GCC centres",
  },
  {
    id: "data",
    index: "03",
    icon: TableIcon,
    title: "Data",
    desc: "When it's time to ship the list, drop into the grid. Filter, sort and export the exact slice, straight into your CRM, Excel or analytics stack. No reformatting. No cleanup.",
    src: "/platform/accounts-grid.png",
    alt: "Bamboo Reports data grid view",
  },
];

const WORKFLOWS = [
  {
    icon: Command,
    index: "01",
    title: "Quick search",
    desc: "Reach any account, centre or prospect in two keystrokes. Recent activity, fuzzy match and entity scoping, all without your hands leaving the keyboard.",
    src: "/platform/quick-search.png",
    alt: "Bamboo Reports quick search overlay with recently viewed records",
  },
  {
    icon: Bookmark,
    index: "02",
    title: "Saved filter sets",
    desc: "Build a target query once. Re-run, rename, share or fork it the moment your ICP shifts. Your best queries become reusable assets your team compounds, not throwaway clicks.",
    src: "/platform/saved-filters.png",
    alt: "Bamboo Reports saved filter sets manager",
  },
];

const CAPABILITIES = [
  { icon: Filter, title: "Layered filters", desc: "Stack geography, sector, function, size and centre status to carve out the perfect segment in seconds." },
  { icon: Search, title: "Global search", desc: "Reach any account, centre or prospect with a single keystroke. The whole ecosystem at your fingertips." },
  { icon: LayoutGrid, title: "Table & Grid modes", desc: "Scan fast in grid view, analyse deep in table view. Same data, your way of working." },
  { icon: Layers, title: "Linked entities", desc: "Accounts, centres, prospects and headcount cross-reference automatically. No reconciliation, no joins." },
  { icon: Database, title: "Clean exports", desc: "Push any slice straight into your CRM, Excel or analytics stack. Always tidy, always ready to ship." },
  { icon: Sparkles, title: "Built centre by centre", desc: "Bottom-up research with 250+ structured data points per GCC centre. Current, centre-level data, not a 12-month-old published report." },
];

const PERSONAS = [
  { tag: "01", name: "GTM Leaders & Sellers", desc: "Surface ICP-fit accounts, prioritise the right centres and put a clean, ranked target list in every seller's hands every Monday morning." },
  { tag: "02", name: "GCC Site & PMO Leaders", desc: "Benchmark against the peer set, watch the ecosystem move in real time and walk into your next location decision with conviction." },
  { tag: "03", name: "Staffing, RPO & Talent Firms", desc: "Reach the right HR and function leaders across every growing centre in India, mapped by role, function and headcount." },
  { tag: "04", name: "CRE, Facilities & Infra", desc: "See new centres, expansions and relocations weeks before your competitors do, and turn signal into pipeline." },
];

const Platform = () => {
  useSEO({
    title: "Platform | The Definitive India GCC Intelligence Workspace | Bamboo Reports",
    description:
      "The intelligence layer India's GCC ecosystem was missing. 2,650+ accounts, 6,200+ centres and 250K+ named decision-makers, explorable across charts, map and grid.",
    keywords:
      "GCC platform, India GCC intelligence, GCC analytics, GCC database, account analytics, center analytics",
  });

  const pageRef = useRef<HTMLDivElement>(null);
  const lensSTRef = useRef<ScrollTrigger | null>(null);
  const activeLensRef = useRef(0);
  const [activeLens, setActiveLens] = useState(0);

  const selectLens = (i: number) => {
    const st = lensSTRef.current;
    if (st) {
      const targets = [0.05, 0.5, 0.95];
      window.scrollTo({
        top: st.start + (st.end - st.start) * targets[i],
        behavior: "smooth",
      });
    } else {
      activeLensRef.current = i;
      setActiveLens(i);
    }
  };

  const scrollToTour = (e: React.MouseEvent) => {
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("tour")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ---------- motion-safe choreography ---------- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // hero entrance
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .from(".pf-hero-copy", { y: 24, autoAlpha: 0, duration: 0.8 }, 0.55)
          .from(".pf-hero-actions", { y: 24, autoAlpha: 0, duration: 0.8 }, 0.68)
          .fromTo(
            ".pf-shot-frame",
            { clipPath: "inset(0% 0% 100% 0%)", y: 60 },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.2, ease: "power4.out" },
            0.9
          );

        // hero headline: masked line reveal
        SplitText.create(".pf-hero-title", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.05,
              stagger: 0.09,
              ease: "power4.out",
              delay: 0.12,
            }),
        });

        // dashboard flattens as it scrolls into view
        gsap.fromTo(
          ".pf-shot-tilt",
          { rotateX: 9, scale: 0.99 },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".pf-shot",
              start: "top 92%",
              end: "top 38%",
              scrub: 0.6,
            },
          }
        );

        // generic scroll reveals
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 30,
            autoAlpha: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.querySelectorAll("[data-reveal-item]"), {
            y: 26,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
      });

      /* ---------- pinned lens scrollytelling (desktop, motion-safe) ---------- */
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>(".pf-lens-layer");
        if (layers.length < 3) return;

        gsap.set(layers[0], { autoAlpha: 1 });
        gsap.set(layers.slice(1), {
          autoAlpha: 0,
          scale: 1.03,
          clipPath: "inset(100% 0% 0% 0%)",
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".pf-lens-pin",
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = self.progress < 0.28 ? 0 : self.progress < 0.72 ? 1 : 2;
              if (idx !== activeLensRef.current) {
                activeLensRef.current = idx;
                setActiveLens(idx);
              }
            },
          },
        });
        lensSTRef.current = tl.scrollTrigger ?? null;

        tl.to({}, { duration: 0.4 })
          .add("a")
          .to(layers[0], { scale: 0.95, duration: 1 }, "a")
          .to(layers[1], { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "a")
          .to({}, { duration: 0.5 })
          .add("b")
          .to(layers[1], { scale: 0.95, duration: 1 }, "b")
          .to(layers[2], { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "b")
          .to({}, { duration: 0.4 });

        return () => {
          lensSTRef.current = null;
        };
      });

      // re-measure once webfonts and images have settled
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="pf min-h-screen bg-background">
      <Header />

      {/* ───────── 001 · HERO ───────── */}
      <section className="relative overflow-hidden">
        <div className="pf-hero-bg" aria-hidden="true" />
        <div className="pf-hero-grid" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 pb-16 md:pb-24">
          <div className="pf-hero-top">
            <h1 className="pf-hero-title max-w-5xl">
              <span className="block">The entire India GCC universe.</span>
              <span className="block pf-line-accent">One living workspace.</span>
            </h1>

            <div className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-6 items-center">
              <p className="pf-hero-copy lg:col-span-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                One workspace where your team scopes accounts, tracks centre-level shifts, and
                pulls decision-maker lists. No more stitching intel together from fragmented
                sources.
              </p>
              <div className="pf-hero-actions lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
                <GoogleCalendarSchedulingButton className="pf-btn-primary">
                  Get a demo
                  <ArrowRight className="pf-btn-arrow h-4 w-4" />
                </GoogleCalendarSchedulingButton>
                <a className="pf-btn-ghost" href="#tour" onClick={scrollToTour}>
                  Take the tour
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pf-shot">
            <div className="pf-shot-tilt">
              <div className="pf-shot-frame">
                <img
                  src="/platform/accounts-grid.png"
                  width={1920}
                  height={1308}
                  alt="Bamboo Reports platform: Account Analytics with filters and grid view"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TRUST LOGOS ───────── */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-7xl mx-auto" data-reveal>
          <TrustLogos />
        </div>
      </section>

      {/* ───────── 002 · THREE LENSES (pinned scrollytelling) ───────── */}
      <section id="tour" className="pf-section-wash relative">
        {/* Desktop: pinned stage */}
        <div className="pf-lens-pin hidden lg:flex items-center min-h-screen px-4">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="pf-label pf-label--accent mb-4">One dataset, three lenses</div>
              <h2 className="pf-h2 pf-h2--compact">
                See the market through Charts, Map and Data, without ever losing your thread.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every filter follows you across every view. Spot a hotspot on the map, pivot to
                charts for the sector mix, drop into the grid and export the exact target list, in
                under a minute, every time.
              </p>
              <div className="mt-8">
                {LENSES.map((l, i) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => selectLens(i)}
                    className={`pf-lens-item ${activeLens === i ? "is-active" : ""}`}
                    aria-current={activeLens === i}
                  >
                    <span className="pf-lens-item-head">
                      <span className="pf-lens-idx">{l.index}</span>
                      <span className="pf-lens-title">{l.title}</span>
                      <l.icon className="pf-lens-ico h-4 w-4" />
                    </span>
                    <span className="pf-lens-desc">
                      <span>
                        <span>{l.desc}</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="pf-lens-stage">
                {LENSES.map((l, i) => (
                  <div
                    key={l.id}
                    className={`pf-lens-layer ${activeLens === i ? "is-active" : ""}`}
                  >
                    <div className="pf-frame">
                      <img src={l.src} alt={l.alt} width={1920} height={1308} loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked */}
        <div className="lg:hidden px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div data-reveal>
              <div className="pf-label pf-label--accent mb-4">One dataset, three lenses</div>
              <h2 className="pf-h2 pf-h2--compact">
                See the market through Charts, Map and Data, without ever losing your thread.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every filter follows you across every view. Spot a hotspot on the map, pivot to
                charts for the sector mix, drop into the grid and export the exact target list, in
                under a minute, every time.
              </p>
            </div>
            {LENSES.map((l) => (
              <div key={l.id} className="mt-12" data-reveal>
                <div className="pf-label pf-label--accent">Lens {l.index}</div>
                <h3 className="pf-h3 mt-2">{l.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{l.desc}</p>
                <div className="pf-frame mt-5">
                  <img src={l.src} alt={l.alt} width={1920} height={1308} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 003 · LINKED INTELLIGENCE ───────── */}
      <section className="pf-section px-4">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 relative">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <div className="pf-label pf-label--accent mb-4" data-reveal>
                  Linked intelligence
                </div>
                <h2 className="pf-h2" data-reveal>
                  We go deeper. Right down to the <span className="pf-accent-text">centre</span>.
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed" data-reveal>
                  Other databases stop at the logo. We don't. Every centre is mapped: its city,
                  function, headcount and the leaders sitting inside it, all stitched back to its
                  parent account. One click and the entire India footprint is on screen.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <div className="pf-frame pf-frame--hover">
                <img
                  src="/platform/account-detail.png"
                  width={1920}
                  height={1308}
                  alt="Account detail: 3M Co. with linked centres in Pune, Ahmedabad and Bengaluru"
                  loading="lazy"
                />
              </div>
              <div className="pf-caption mt-3">
                Account record → linked centres across Pune, Ahmedabad and Bengaluru
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 004 · OPERATOR VELOCITY ───────── */}
      <section className="pf-section pf-section-wash px-4">
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl relative" data-reveal>
            <div className="pf-label pf-label--accent mb-4">Operator velocity</div>
            <h2 className="pf-h2">Engineered for the speed your team actually moves at.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Two keystrokes to any record. One click to re-run last quarter's territory list. A
              shared link instead of yet another CSV in someone's inbox. The platform keeps up, so
              your team can stop chasing data and start closing on it.
            </p>
          </div>

          <div className="mt-14 space-y-16 lg:space-y-24 relative">
            {WORKFLOWS.map((w, i) => (
              <div
                key={w.title}
                className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                data-reveal
              >
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="pf-label pf-label--accent">Workflow {w.index}</div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="pf-cap-icon !mb-0">
                      <w.icon className="h-5 w-5" />
                    </span>
                    <h3 className="pf-h3">{w.title}</h3>
                  </div>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`}>
                  <div className="pf-frame pf-frame--hover">
                    <img src={w.src} alt={w.alt} width={1920} height={1308} loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 005 · CAPABILITIES ───────── */}
      <section className="pf-section px-4">
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl relative" data-reveal>
            <div className="pf-label pf-label--accent mb-4">Capabilities</div>
            <h2 className="pf-h2">A workspace your team lives in. Not a report they forget.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every capability you need to find, qualify, segment and action the India GCC
              opportunity, in one purpose-built environment.
            </p>
          </div>

          <div
            className="pf-caps mt-12 grid md:grid-cols-2 lg:grid-cols-3 relative"
            data-reveal-group
          >
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="pf-cap" data-reveal-item>
                <div className="pf-cap-icon">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="pf-cap-title">{c.title}</h3>
                <p className="relative mt-2 text-muted-foreground leading-relaxed text-[0.95rem]">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 006 · WHO IT'S FOR ───────── */}
      <section className="pf-section pf-section-wash px-4">
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl relative" data-reveal>
            <div className="pf-label pf-label--accent mb-4">Who it's for</div>
            <h2 className="pf-h2">One platform. Every team that touches the GCC opportunity.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              From the seller building Monday's pipeline to the site head benchmarking against
              peers, Bamboo Reports is the workspace that puts every team on the same
              centre-level picture.
            </p>
          </div>

          <div className="mt-12 relative" data-reveal-group>
            {PERSONAS.map((p) => (
              <GoogleCalendarSchedulingButton
                key={p.tag}
                className="pf-persona"
                aria-label={`Get a demo: ${p.name}`}
                data-reveal-item
              >
                <span className="pf-persona-num">{p.tag}</span>
                <span>
                  <span className="pf-persona-name block">{p.name}</span>
                  <span className="block mt-1 text-muted-foreground leading-relaxed">
                    {p.desc}
                  </span>
                </span>
                <span className="pf-persona-arrow">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </GoogleCalendarSchedulingButton>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 007 · FINAL CTA ───────── */}
      <section className="pf-final">
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <h2 className="pf-h2" data-reveal>
            Stop stitching together PDFs and stale lists.
            <br />
            <span className="pf-accent-text">Start operating on structured GCC intelligence.</span>
          </h2>
          <p
            className="mt-6 mb-10 max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground"
            data-reveal
          >
            Book a focused 30-minute walkthrough. We'll tailor it to your ICP, territory or sector
            and send you off with a target list you can action the same afternoon.
          </p>
          <div data-reveal>
            <GoogleCalendarSchedulingButton className="pf-btn-primary">
              Get a demo
              <ArrowRight className="pf-btn-arrow h-4 w-4" />
            </GoogleCalendarSchedulingButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Platform;
