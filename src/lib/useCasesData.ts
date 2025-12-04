import { Briefcase, Network, Route, Target, Globe2, Building2, Users, LucideIcon } from "lucide-react";

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
  },
  {
    id: "gcc-site-leaders",
    title: "GCC Site Leaders",
    path: "/use-cases/gcc-site-leaders",
    badge: "ICP",
    headline: "Keep every site decision defensible with live GCC intelligence.",
    description: "Site leaders use Bamboo Reports to balance capability mix, city choices, and leadership depth with credible, export-ready numbers.",
    audience: "India country heads, site leaders, and COOs balancing growth with operational resilience.",
    icon: Building2,
    objectives: [
      "Pick the right city-capability split with talent, cost, and risk signals.",
      "Benchmark operational footprint and leadership depth against peers.",
      "Give HQ and boards transparent updates without ad hoc data hunts."
    ],
    outcomes: [
      "Rationalize expansions with side-by-side peer benchmarks and hiring velocity.",
      "Spot leadership and delivery risks early with intent and rotation signals.",
      "Ship executive-ready briefs faster across finance, HR, and facilities."
    ],
    playbook: [
      {
        title: "City and capability planning",
        items: [
          "Layer sector and capability filters to size talent depth by hub.",
          "Model ramp timelines using peer maturity curves and hiring intent.",
          "Export defensible narratives for steering committee sign-off."
        ]
      },
      {
        title: "Leadership and delivery assurance",
        items: [
          "Track leadership rotations and succession risks by site.",
          "Benchmark team mix and capability maturity against nearest peers.",
          "Identify delivery hotspots before SLAs are at risk."
        ]
      },
      {
        title: "Quarterly reviews",
        items: [
          "Refresh KPIs with live signals—no spreadsheet merges.",
          "Share unified views for finance, HR, and global partners.",
          "Maintain a 30/60/90 action list that aligns every stakeholder."
        ]
      }
    ],
    signals: [
      "City and capability momentum across Tier 1 and Tier 2 hubs",
      "Leadership stability, rotations, and new appointments",
      "Hiring velocity by function, seniority, and skill mix",
      "Peer maturity, cost, and headcount benchmarks",
      "Expansion, consolidation, and exit timelines"
    ],
    stats: [
      { label: "Centers tracked", value: "2,400+", helper: "Verified India GCC coverage" },
      { label: "Leadership roster", value: "2,500+", helper: "With recency signals" },
      { label: "Signal refresh", value: "Weekly", helper: "Hiring and leadership moves" }
    ]
  },
  {
    id: "ecosystem-sellers",
    title: "Ecosystem Sellers",
    path: "/use-cases/ecosystem-sellers",
    badge: "ICP",
    headline: "Show up early with the right partners and GCC storyline.",
    description: "SaaS, IT services, HR tech, and mobility sellers use Bamboo Reports to prioritize accounts with intent, align partners, and land relevant pitches.",
    audience: "Regional and global sellers across SaaS, IT services, HR tech, and mobility targeting GCC accounts.",
    icon: Briefcase,
    objectives: [
      "Prioritize territories with live hiring intent and capability launches.",
      "Craft pitches anchored in city, talent, and capability context buyers trust.",
      "Coordinate partner coalitions before RFPs formalize."
    ],
    outcomes: [
      "Higher win rates with outreach timed to hiring and leadership moves.",
      "Proposal credibility built on talent depth, cost, and peer proof.",
      "Reusable GTM plays that marketing and delivery can activate together."
    ],
    playbook: [
      {
        title: "Territory and pursuit focus",
        items: [
          "Filter accounts by sector, city momentum, and capability ramps.",
          "Layer leadership moves to spot new sponsors for outreach.",
          "Export CRM-ready lists with signals and contact angles."
        ]
      },
      {
        title: "Partner-aligned proposals",
        items: [
          "Map ecosystem partners by capability and region coverage.",
          "Assemble joint value props tuned to target city and skill mix.",
          "Track partner wins, exits, or shifts to keep proposals fresh."
        ]
      },
      {
        title: "Meeting prep at speed",
        items: [
          "Pull org context, hiring focus, and capability mix per site.",
          "Anchor demos in the buyer’s city-capability constraints.",
          "Share action lists with marketing and solution teams instantly."
        ]
      }
    ],
    signals: [
      "Hiring velocity and role mix by capability and city",
      "Leadership and sponsor changes in target accounts",
      "Net-new centers and capability launches",
      "City momentum heatmaps and sector growth",
      "Partner ecosystem depth by capability and region"
    ],
    stats: [
      { label: "Accounts with live intent", value: "1,000+", helper: "Hiring or leadership movement" },
      { label: "Partner profiles", value: "150+", helper: "Delivery and ecosystem partners" },
      { label: "Time to shortlist", value: "< 10 min", helper: "Signals built for GCC GTM" }
    ]
  },
  {
    id: "global-pmo",
    title: "Global PMO",
    path: "/use-cases/global-pmo",
    badge: "ICP",
    headline: "Keep global GCC programs on one verifiable spine.",
    description: "Global PMO teams align multi-country GCC builds using live India signals—talent, partners, and peer timelines—to reduce slippage.",
    audience: "Global and regional PMOs coordinating multi-site GCC programs with India as a hub.",
    icon: Globe2,
    objectives: [
      "Anchor India workstreams to realistic talent and partner capacity.",
      "Sequence milestones with peer timelines and risk buffers.",
      "Give steering committees a unified view of progress and blockers."
    ],
    outcomes: [
      "Fewer surprises on hiring, vendor, and facility tracks with weekly refreshes.",
      "Steering decks grounded in market signals, not anecdote.",
      "Ready alternates for city or capability pivots when constraints hit."
    ],
    playbook: [
      {
        title: "Program orchestration",
        items: [
          "Tie milestones to hiring capacity and talent depth per city.",
          "Use peer ramp curves to set realistic transition and go-live dates.",
          "Share export-ready status with finance, HR, and facilities globally."
        ]
      },
      {
        title: "Vendor and partner governance",
        items: [
          "Assess suppliers by capability depth, region, and stability.",
          "Rationalize partner lists with evidence on delivery footprints.",
          "Track shifts, exits, or performance signals to stay ahead."
        ]
      },
      {
        title: "Risk and mitigation",
        items: [
          "Flag hiring slowdowns, leadership churn, and attrition signals.",
          "Model alternate city-capability paths with impact estimates.",
          "Maintain a 30/60/90 mitigation play visible to leadership."
        ]
      }
    ],
    signals: [
      "Talent depth and hiring pace by city and capability",
      "Partner and supplier footprint across regions",
      "Peer ramp timelines for similar transitions",
      "Leadership stability and succession signals",
      "Program milestone health with risk callouts"
    ],
    stats: [
      { label: "Programs guided", value: "200+", helper: "Global GCC builds and expansions" },
      { label: "Partners tracked", value: "150+", helper: "Ecosystem depth and stability" },
      { label: "Update cadence", value: "Weekly", helper: "Signals + milestone health" }
    ]
  },
  {
    id: "india-leadership",
    title: "India Leadership",
    path: "/use-cases/india-leadership",
    badge: "ICP",
    headline: "India leadership clarity without hunting for slides.",
    description: "Country leaders stay ahead of GCC momentum, city shifts, and capability ramps with export-ready briefs and peer benchmarks.",
    audience: "India country leaders, strategy, and finance partners supporting GCC growth.",
    icon: Users,
    objectives: [
      "Get an executive-ready view of GCC momentum across India.",
      "Benchmark growth, talent, and capability mix against peers.",
      "Equip leadership reviews with fresh, defensible numbers."
    ],
    outcomes: [
      "Board and steering updates land faster with credible sourcing.",
      "Budget and investment calls grounded in city-capability evidence.",
      "Sharper stakeholder narratives on risk, opportunity, and timing."
    ],
    playbook: [
      {
        title: "Executive briefing",
        items: [
          "Pull India-wide momentum heatmaps and sector trends.",
          "Show peer benchmarks for maturity, growth, and cost.",
          "Share concise briefs for finance, HR, and government partners."
        ]
      },
      {
        title: "Growth prioritization",
        items: [
          "Rank cities by talent depth, cost, and leadership availability.",
          "Spot capability launches and hiring spikes for next-wave bets.",
          "Align investments with verified peer trajectories."
        ]
      },
      {
        title: "Risk and governance",
        items: [
          "Track leadership churn, attrition signals, and delivery hotspots.",
          "Identify consolidation or exit timelines affecting ecosystems.",
          "Maintain scenario-ready alternates for capacity planning."
        ]
      }
    ],
    signals: [
      "City and sector momentum across India",
      "Leadership moves and sponsor changes",
      "Hiring velocity and capability mix trends",
      "Peer maturity and cost benchmarks",
      "Expansion, consolidation, and exit activity"
    ],
    stats: [
      { label: "Cities covered", value: "25+", helper: "Tier 1 and Tier 2 hubs" },
      { label: "Leadership roster", value: "2,500+", helper: "With recency and role signals" },
      { label: "Brief turnaround", value: "48 hrs", helper: "Analyst-backed exec packs" }
    ]
  }
];
