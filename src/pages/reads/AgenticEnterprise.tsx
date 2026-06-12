import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import JotFormEmbed from "@/components/JotFormEmbed";
import "./AgenticEnterprise.css";

/**
 * "Interesting Reads" landing page — a faithful port of the standalone
 * Thoughtworks × Research NXT agentic-enterprise microsite. Self-contained,
 * co-branded, full-viewport. All styling is scoped under `.reads-page`
 * (see AgenticEnterprise.css) so the Thoughtworks brand look never leaks into the
 * rest of the Bamboo Reports app.
 */
const AgenticEnterprise = () => {
  useSEO({
    title: "The Agentic Enterprise · Thoughtworks × AWS Whitepaper",
    description:
      "Build an enterprise that adapts, not just automates. Download the Thoughtworks & AWS whitepaper on building an ecosystem of continuous evolution and reliable impact.",
  });

  // The microsite is a single full-viewport, no-scroll layout on desktop.
  // Lock body scroll while mounted and restore it on unmount so the rest
  // of the app is unaffected.
  useEffect(() => {
    const previous = document.body.style.overflow;
    const apply = () => {
      document.body.style.overflow = window.innerWidth > 860 ? "hidden" : "";
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      document.body.style.overflow = previous;
    };
  }, []);

  // The Thoughtworks brand type (Bitter Bold display + Inter variable for
  // slnt italics) isn't part of the global font load — inject it just for
  // this page and remove it on unmount.
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="reads-page">
      <div className="page">
        {/* LEFT PANEL */}
        <section className="panel panel--left">
          <header className="logos">
            <a
              href="https://www.thoughtworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Thoughtworks"
            >
              <img src="/logos/thoughtworks-logo.svg" alt="Thoughtworks" className="logo logo--tw" />
            </a>
          </header>

          <div className="content">
            <h1 className="headline">
              The agentic
              <br />
              enterprise<span className="headline__dot">.</span>
            </h1>
            <p className="subheadline">
              Stop building AI to a blueprint. <em>Start building for constant change.</em>
            </p>

            <p className="description">
              MIT found that 95% of generative AI pilots fail to deliver value. The problem isn't the
              technology, it's transformation built to a fixed end-state. This Thoughtworks and AWS
              report shows how a composable architecture of agents, data and governance lets your
              enterprise adapt as fast as AI evolves.
            </p>

            <ul className="pillars">
              <li className="pillar">
                <span className="pillar__num">01</span>
                <div className="pillar__text">
                  <strong>The new business architecture</strong>
                  <span>
                    Assemble agents, models and data products into capabilities you can recompose as
                    needs change
                  </span>
                </div>
              </li>
              <li className="pillar">
                <span className="pillar__num">02</span>
                <div className="pillar__text">
                  <strong>A framework for AI reliability</strong>
                  <span>
                    Five continuous stages, from evaluation to humans in the loop, built on 30+ years
                    of engineering rigor
                  </span>
                </div>
              </li>
              <li className="pillar">
                <span className="pillar__num">03</span>
                <div className="pillar__text">
                  <strong>The path to scaling agentic AI</strong>
                  <span>
                    Start with a thin slice that delivers value from day one, then expand across the
                    enterprise
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="panel panel--right">
          <div className="form-card">
            <span className="eyebrow eyebrow--pink">Free whitepaper</span>
            <h2 className="form-card__title">
              Build an enterprise where humans and AI evolve together.
            </h2>
            <p className="form-card__sub">
              Enter your details to get the full report. Free and instant.
            </p>

            <div className="form-embed">
              <JotFormEmbed
                formId="261590831475462"
                title="Thoughtworks x AWS - C1"
                height="780px"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AgenticEnterprise;
