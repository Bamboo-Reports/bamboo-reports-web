import { Briefcase, Network, Route, Target, LucideIcon } from "lucide-react";

export type UseCaseItem = {
  id: string;
  title: string;
  path: string;
  headline: string;
  description: string;
  audience: string;
  badge?: string;
  icon: LucideIcon;
  objectives: string[];
  outcomes: string[];
  playbook: { title: string; items: string[] }[];
  signals: string[];
  stats: { label: string; value: string; helper?: string }[];
};

export const useCaseItems: UseCaseItem[] = [
  {
    id: "gcc-leaders",
    title: "GCC Leaders",
    path: "/use-cases/gcc-leaders",
    badge: "Use Case",
    headline: "De-risk India GCC growth with live benchmarks.",
    description: "Site heads and strategy leaders use Bamboo Reports to pick the right city-capability bets, justify budgets, and keep leadership aligned with defensible numbers.",
    audience: "Site heads, strategy leaders, and COO offices steering India GCC growth.",
    icon: Target,
    objectives: [
      "Validate where to expand next with talent, cost, and capability signals.",
      "Benchmark footprint and leadership moves against immediate peers.",
      "Keep board and executive stakeholders aligned with credible updates."
    ],
    outcomes: [
      "Pick the right city-capability combo with evidence across hiring velocity and leadership moves.",
      "Walk into board and steering committee reviews with peer benchmarks everyone agrees on.",
      "Spot delivery and ramp risks weeks earlier through intent and hiring shifts."
    ],
    playbook: [
      {
        title: "Plan the next site or capability",
        items: [
          "Layer sector, capability, and city filters to size the talent pool and ramp speed.",
          "Surface peer builds to understand maturity curves and cost assumptions.",
          "Export stakeholder-ready briefs for finance, HR, and government partners."
        ]
      },
      {
        title: "Keep leadership reviews defensible",
        items: [
          "Benchmark headcount, leadership depth, and capability mix against true peers.",
          "Track leadership rotations and hiring slowdowns before they hit headlines.",
          "Refresh 30/60/90 updates without chasing multiple teams for numbers."
        ]
      },
      {
        title: "Run a live risk radar",
        items: [
          "Watch hiring and attrition signals to flag delivery risks early.",
          "Spot competitor pivots, exits, or consolidations that affect your roadmap.",
          "Create action lists for talent, compliance, and procurement teams."
        ]
      }
    ],
    signals: [
      "Leadership appointments and rotations by site",
      "Hiring velocity by capability, city, and seniority",
      "Net-new centers and capability launches in India",
      "Peer benchmark cards for maturity, scale, and mix",
      "Expansion, consolidation, and exit timelines"
    ],
    stats: [
      { label: "Centers benchmarked", value: "2,400+", helper: "Verified India GCC coverage" },
      { label: "Leadership moves", value: "350+/month", helper: "Refreshed weekly" },
      { label: "City refresh", value: "Weekly", helper: "Hiring and capability signals" }
    ]
  },
  {
    id: "pmo",
    title: "PMO",
    path: "/use-cases/pmo",
    badge: "Use Case",
    headline: "Run GCC programs on one intelligence spine.",
    description: "PMO teams keep multi-city builds aligned by pairing program plans with verified market data, vendor visibility, and early risk signals.",
    audience: "Program management offices coordinating builds, transitions, and vendor workstreams.",
    icon: Route,
    objectives: [
      "Align every stakeholder on a single, verified view of progress and blockers.",
      "Sequence hiring, facilities, and vendor decisions with market-backed timelines.",
      "Give leadership forecastable delivery dates with risk buffers built in."
    ],
    outcomes: [
      "Shorten decision cycles for vendor, hiring, and location choices with one source of truth.",
      "Keep steering committees aligned with status that blends internal plans and market signals.",
      "Reduce slippage by surfacing dependency risks across hiring and partner pipelines early."
    ],
    playbook: [
      {
        title: "Program orchestration",
        items: [
          "Tie milestones to live hiring capacity and talent availability by city.",
          "Pull peer timelines to set realistic ramp curves for new capabilities.",
          "Share export-ready status briefs with finance, HR, and facilities."
        ]
      },
      {
        title: "Vendor and partner decisions",
        items: [
          "Assess ecosystem partners by capability depth and regional strength.",
          "Rationalize supplier lists with verified delivery footprints and references.",
          "Track partner shifts or exits to keep transition plans ready."
        ]
      },
      {
        title: "Issue and risk management",
        items: [
          "Flag hiring slowdowns or leadership churn that jeopardize milestones.",
          "Model alternate city-capability paths when constraints hit.",
          "Keep a 30/60/90 mitigation plan visible to leadership."
        ]
      }
    ],
    signals: [
      "Talent depth and hiring pace by city and capability",
      "Partner and supplier footprint across regions",
      "Peer ramp timelines for similar capabilities",
      "Leadership stability and succession signals",
      "Program milestone health with risk callouts"
    ],
    stats: [
      { label: "Programs guided", value: "120+", helper: "GCC builds and expansions" },
      { label: "Partners tracked", value: "150+", helper: "Ecosystem and delivery depth" },
      { label: "Update cadence", value: "Weekly", helper: "Signals + milestone health" }
    ]
  },
  {
    id: "gtm-sellers",
    title: "GTM Sellers",
    path: "/use-cases/gtm-sellers",
    badge: "Use Case",
    headline: "Win GCC pursuits with buyer-context built in.",
    description: "Account teams and solution sellers get verified org maps, hiring intent, and pursuit-ready narratives built around India GCC momentum.",
    audience: "Enterprise sellers, pursuit teams, and ABM pods targeting GCC accounts.",
    icon: Briefcase,
    objectives: [
      "Prioritize accounts with expansion intent and live hiring momentum.",
      "Show up with relevant org, capability, and city context the buyer already cares about.",
      "Keep pursuit teams aligned on who to target, with what story, and when."
    ],
    outcomes: [
      "Sharper territory focus with shortlists aligned to hiring velocity and leadership moves.",
      "Higher meeting quality with org-ready briefs and city-capability angles.",
      "Faster pursuit spin-up with export-ready ABM and outreach lists."
    ],
    playbook: [
      {
        title: "Build winning pursuit lists",
        items: [
          "Filter accounts by sector, capability launches, and hiring spikes.",
          "Layer leadership moves to pinpoint who is likely to sponsor change.",
          "Export CRM-ready lists with intent and city context."
        ]
      },
      {
        title: "Meeting and deck prep",
        items: [
          "Pull leadership rosters, recent moves, and hiring focus per site.",
          "Shape the storyline around current capability mix and upcoming ramps.",
          "Arm marketing with city and capability angles for outreach."
        ]
      },
      {
        title: "Territory and quota planning",
        items: [
          "Benchmark whitespace by sector and city across the GCC landscape.",
          "Spot adjacent opportunities when prospects stall.",
          "Keep reps aligned with weekly signal refreshes."
        ]
      }
    ],
    signals: [
      "Hiring velocity and role mix by function",
      "Leadership changes and new decision makers",
      "Net-new centers and capability launches",
      "City and sector momentum heatmaps",
      "Exportable ABM slices with firmographics"
    ],
    stats: [
      { label: "Accounts with live signals", value: "900+", helper: "Hiring or leadership movement" },
      { label: "Leadership contacts", value: "2,500+", helper: "Verified with recency" },
      { label: "Time to shortlist", value: "< 10 min", helper: "Filters tuned for GCC GTM" }
    ]
  },
  {
    id: "ecosystem-partners",
    title: "Ecosystem Partners",
    path: "/use-cases/ecosystem-partners",
    badge: "Use Case",
    headline: "Pair with GCCs and vendors before the RFP drops.",
    description: "Advisors, staffing partners, and solution providers use Bamboo Reports to see where GCC demand is forming and show up with the right coalition.",
    audience: "Consulting firms, staffing partners, and delivery allies building GCC-focused plays.",
    icon: Network,
    objectives: [
      "Spot upcoming GCC demand and align the right partner mix ahead of time.",
      "Prove credibility with evidence on talent pools, capability maturity, and peers.",
      "Stay sticky in accounts with ongoing signal refreshes and actionable briefs."
    ],
    outcomes: [
      "Show up with the right partners and delivery angles before formal RFPs.",
      "Anchor proposals in city and capability data that reduces client risk perception.",
      "Create repeatable, account-specific plays that marketing and delivery can reuse."
    ],
    playbook: [
      {
        title: "Opportunity sensing",
        items: [
          "Track capability launches and hiring spikes to time outreach.",
          "Spot expansion-ready accounts by city and sector momentum.",
          "Use leadership moves to identify executive sponsors early."
        ]
      },
      {
        title: "Coalition building",
        items: [
          "Map ecosystem partners by capability depth and regional presence.",
          "Assemble joint value props tailored to the city and skill mix.",
          "Keep partner shifts, exits, and wins visible to everyone."
        ]
      },
      {
        title: "Proof and delivery confidence",
        items: [
          "Share talent depth and cost benchmarks that de-risk proposals.",
          "Provide change-ready playbooks with 30/60/90 actions.",
          "Refresh executive updates with live signals to stay top-of-mind."
        ]
      }
    ],
    signals: [
      "Capability launches and expansion timelines",
      "Leadership and sponsor moves within target accounts",
      "Partner ecosystem coverage by capability and city",
      "Talent depth and hiring intent for niche skills",
      "Competitive moves, exits, or consolidations"
    ],
    stats: [
      { label: "Partner profiles", value: "150+", helper: "Ecosystem and delivery partners" },
      { label: "Accounts with intent", value: "1,000+", helper: "Signals for outreach timing" },
      { label: "Brief turnaround", value: "48 hrs", helper: "Analyst-backed playbooks" }
    ]
  }
];
