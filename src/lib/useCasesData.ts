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
    headline: "De-risk India GCC growth with live benchmarks",
    description: "Make expansion, capability, and location decisions with confidence. Bamboo Reports gives GCC leaders a real-time view of how peer centres are building, scaling, and evolving across India.",
    audience: "GCC leaders steering expansion, capability mix, and board-aligned investments.",
    icon: Target,
    objectives: [
      "Choose the right city and capability mix with live peer benchmarks across talent depth, cost bands, and maturity signals.",
      "Justify budgets for headcount, leadership, and investments with credible, externally validated data.",
      "Stay aligned with leadership and boards using clear benchmarks and a shared fact base instead of assumptions."
    ],
    outcomes: [
      "Faster, more confident expansion decisions.",
      "Fewer surprises post-investment.",
      "Stronger alignment across COO, HR, and finance teams."
    ],
    playbook: [
      {
        title: "Monthly leadership reviews",
        items: [
          "Bring defensible benchmarks into reviews instead of static decks.",
          "Show peer expansion, capability mix, and maturity signals by city.",
          "Keep board discussions grounded in a shared fact base everyone trusts."
        ]
      },
      {
        title: "Quarterly expansion planning",
        items: [
          "Validate city and capability bets with talent, cost, and maturity signals.",
          "Test alternate ramp options using peer timelines and hiring momentum.",
          "Export expansion-ready briefs for finance and HR stakeholders."
        ]
      },
      {
        title: "Board and steering committee discussions",
        items: [
          "Lead with leadership moves, hiring momentum, and consolidation signals.",
          "Surface risks early so mitigation plans are ready before approvals.",
          "Align cross-functional owners on the next 30/60/90 actions."
        ]
      }
    ],
    signals: [
      "Peer expansion and new centre launches",
      "Capability mix by city and maturity stage",
      "Leadership moves and hiring momentum",
      "Consolidation, exits, and risk indicators"
    ],
    stats: [
      { label: "Core decisions", value: "City · Capability · Budget", helper: "Benchmarked live for India GCCs" },
      { label: "Review rhythms", value: "Monthly + Quarterly", helper: "Leadership and board ready" },
      { label: "Updates", value: "Real-time signals", helper: "Hiring, leadership, expansion" }
    ]
  },
  {
    id: "pmo",
    title: "PMO Teams",
    path: "/use-cases/pmo",
    badge: "Use Case",
    headline: "Run GCC programs on one intelligence spine",
    description: "Coordinate hiring, vendors, and timelines using a single, verified source of truth. Bamboo Reports helps PMOs keep complex GCC programs on track without chasing updates across teams.",
    audience: "Program management offices coordinating builds, transitions, and vendor workstreams across HR, IT, and partners.",
    icon: Route,
    objectives: [
      "Align everyone on one version of progress by tracking hiring pace, capability build-up, and partner readiness with live benchmarks.",
      "Plan programs with realistic timelines anchored to how similar GCCs actually scaled, not optimistic assumptions.",
      "Spot risks early by catching slowdowns in hiring, leadership gaps, or vendor dependency before they impact delivery."
    ],
    outcomes: [
      "Fewer last-minute escalations.",
      "Clear ownership across HR, IT, and vendors.",
      "Predictable delivery against committed timelines."
    ],
    playbook: [
      {
        title: "Weekly program reviews",
        items: [
          "Track hiring pace, capability build-up, and partner readiness in one place.",
          "Blend internal milestones with live market and peer benchmarks.",
          "Keep every function aligned on the same status and risks."
        ]
      },
      {
        title: "Cross-functional syncs",
        items: [
          "Coordinate hiring, IT, and vendor timelines using realistic ramp curves.",
          "Anchor decisions to how similar GCCs actually scaled.",
          "Spot dependency risks before they impact delivery."
        ]
      },
      {
        title: "Leadership updates and steering reads",
        items: [
          "Deliver defensible updates without chasing multiple teams for numbers.",
          "Show mitigation plans for hiring, leadership, or vendor slowdowns.",
          "Give leadership forecastable delivery dates with buffers built in."
        ]
      }
    ],
    signals: [
      "Hiring velocity by city and capability",
      "Vendor and ecosystem readiness by location",
      "Leadership stability and transition risk",
      "Program milestone health against peer timelines"
    ],
    stats: [
      { label: "Delivery focus", value: "Hiring · Vendors · Timelines", helper: "One verified source of truth" },
      { label: "Cadence", value: "Weekly reviews", helper: "Program + leadership ready" },
      { label: "Risk view", value: "Early signals", helper: "Hiring, leadership, vendor dependency" }
    ]
  },
  {
    id: "gtm-sellers",
    title: "GTM Sellers",
    path: "/use-cases/gtm-sellers",
    badge: "Use Case",
    headline: "Win GCC pursuits with buyer context built in",
    description: "Walk into every GCC conversation knowing what the buyer is building, where they are hiring, and why now matters. Bamboo Reports gives sellers a live GCC context so outreach and pursuits feel timely, relevant, and credible.",
    audience: "Enterprise sellers, pursuit teams, and ABM pods targeting GCC accounts with timely buyer context.",
    icon: Briefcase,
    objectives: [
      "Target accounts at the right moment by focusing on GCCs showing active hiring, leadership changes, or capability expansion.",
      "Personalise outreach beyond the pitch deck using city, capability, and scale context buyers care about.",
      "Align pursuits with real buying signals so solutions match what the GCC is building today."
    ],
    outcomes: [
      "Higher quality meetings with relevant context.",
      "Faster pursuit alignment and follow-through.",
      "Stronger credibility in early conversations."
    ],
    playbook: [
      {
        title: "Account planning before outreach",
        items: [
          "Prioritise accounts showing hiring velocity, leadership changes, or capability expansion.",
          "Time outreach to when buying signals are visible, not after momentum slows.",
          "Export ready-to-use shortlists with the right city and capability angles."
        ]
      },
      {
        title: "Meeting prep and discovery",
        items: [
          "Lead with the city, capability, and scale context each buyer cares about.",
          "Use leadership moves and hiring focus to tailor the storyline.",
          "Walk in with live org context instead of static decks."
        ]
      },
      {
        title: "ABM and territory prioritisation",
        items: [
          "Align pursuit teams on who to target, with what story, and when.",
          "Match solutions to what the GCC is building today, not last year.",
          "Refresh shortlists as signals update to stay relevant."
        ]
      }
    ],
    signals: [
      "Hiring velocity by function and city",
      "New capability launches and expansions",
      "Leadership appointments and transitions",
      "Second-city and scale-up activity"
    ],
    stats: [
      { label: "Context depth", value: "City · Capability · Timing", helper: "Built into every pursuit" },
      { label: "Signal focus", value: "Hiring & leadership", helper: "Used to time outreach" },
      { label: "Prep time", value: "Minutes", helper: "Export-ready briefs and lists" }
    ]
  },
  {
    id: "ecosystem-partners",
    title: "Ecosystem Partners",
    path: "/use-cases/ecosystem-partners",
    badge: "Use Case",
    headline: "Pair with GCCs and vendors before the RFP drops",
    description: "Get into the deal before it becomes a deal. Bamboo Reports helps ecosystem partners identify where GCCs are forming delivery coalitions and position themselves early.",
    audience: "Consulting firms, staffing partners, and delivery allies building GCC-focused plays.",
    icon: Network,
    objectives: [
      "Sense demand before it formalises by tracking capability expansion, hiring intent, and leadership changes that signal upcoming vendor needs.",
      "Form the right coalitions early by identifying which partners already operate in the target city or capability.",
      "Enter conversations with credibility using real GCC data, peer benchmarks, and observed delivery patterns."
    ],
    outcomes: [
      "Earlier entry into high-quality pursuits.",
      "More substantial partner alignment before RFPs.",
      "Higher win rates through better positioning."
    ],
    playbook: [
      {
        title: "Partner strategy and planning",
        items: [
          "Sense capability expansion, hiring intent, and leadership changes early.",
          "Map where GCCs are forming delivery coalitions before RFPs are public.",
          "Shortlist cities and capabilities where your partners already operate."
        ]
      },
      {
        title: "Pre-RFP opportunity sensing",
        items: [
          "Track expansion timelines to time outreach with credibility.",
          "Use leadership moves to identify executive sponsors early.",
          "Anchor conversations in peer benchmarks and observed delivery patterns."
        ]
      },
      {
        title: "Coalition building and co-sell alignment",
        items: [
          "Identify which partners already have presence in the target city or capability.",
          "Align on roles and proposals before shortlists are finalised.",
          "Enter pursuits early with data-backed positioning."
        ]
      }
    ],
    signals: [
      "Capability launches and expansion timelines",
      "Leadership changes tied to delivery decisions",
      "Partner presence by city and function",
      "Talent depth and hiring momentum by capability"
    ],
    stats: [
      { label: "Engagement timing", value: "Pre-RFP", helper: "Show up before shortlists form" },
      { label: "Positioning inputs", value: "Capability · City · Partner fit", helper: "Grounded in GCC signals" },
      { label: "Outcome", value: "Higher win rates", helper: "Better alignment and early entry" }
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
