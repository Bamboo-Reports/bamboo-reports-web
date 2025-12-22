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
      { label: "Core decisions", value: "City / Capability / Budget", helper: "Benchmarked live for India GCCs" },
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
      { label: "Delivery focus", value: "Hiring / Vendors / Timelines", helper: "One verified source of truth" },
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
      { label: "Context depth", value: "City / Capability / Timing", helper: "Built into every pursuit" },
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
      { label: "Positioning inputs", value: "Capability / City / Partner fit", helper: "Grounded in GCC signals" },
      { label: "Outcome", value: "Higher win rates", helper: "Better alignment and early entry" }
    ]
  },
  {
    id: "gcc-site-leaders",
    title: "GCC Site Leaders",
    path: "/use-cases/gcc-site-leaders",
    badge: "ICP",
    headline: "Keep every site decision defensible with live GCC intelligence",
    description: "Make city, capability, and leadership decisions with confidence. Bamboo Reports gives site leaders a clear external view of how comparable GCCs are scaling, staffing, and evolving across India.",
    audience: "Site leaders and COOs balancing city, capability, and leadership choices with defensible evidence.",
    icon: Building2,
    objectives: [
      "Choose the right city and capability mix using peer benchmarks on talent depth, cost, and maturity.",
      "Defend hiring plans, leadership additions, and footprint changes with credible, externally validated data.",
      "Stay aligned with HQ and global leadership using transparent views of performance and plans."
    ],
    outcomes: [
      "Faster approvals for headcount and investments.",
      "Fewer escalations driven by data gaps.",
      "Stronger credibility in HQ and board discussions."
    ],
    playbook: [
      {
        title: "Quarterly business reviews",
        items: [
          "Bring hiring, leadership, and capability benchmarks into each review.",
          "Show how comparable GCCs are scaling across cities and functions.",
          "Highlight risks early so mitigations are aligned before escalation."
        ]
      },
      {
        title: "Annual planning and budget cycles",
        items: [
          "Size city and capability options with talent depth and cost signals.",
          "Back headcount and investment asks with verified external evidence.",
          "Export defensible briefs for finance, HR, and HQ stakeholders."
        ]
      },
      {
        title: "City and capability expansion proposals",
        items: [
          "Compare ramp timelines and maturity curves against true peers.",
          "Show leadership depth and succession risks before approvals.",
          "Package expansion narratives with clear 30/60/90 actions."
        ]
      }
    ],
    signals: [
      "Hiring velocity by function and city",
      "Leadership stability and succession risk",
      "Capability mix versus peer GCCs",
      "Expansion, consolidation, and exit activity"
    ],
    stats: [
      { label: "Decisions", value: "City / Capability / Leadership", helper: "Benchmarked against comparable GCCs" },
      { label: "Cadence", value: "QBRs + Annual plans", helper: "Exec-ready briefs on demand" },
      { label: "Signals", value: "Hiring / Leadership / Expansion", helper: "Continuously refreshed" }
    ]
  },
  {
    id: "ecosystem-sellers",
    title: "Ecosystem Sellers",
    path: "/use-cases/ecosystem-sellers",
    badge: "ICP",
    headline: "Show up early with the right partners and the proper GCC storyline",
    description: "Win relevance before shortlists form. Bamboo Reports helps ecosystem sellers identify GCCs with real intent, align the right partners, and lead with context buyers trust.",
    audience: "SaaS, IT services, HR tech, and mobility sellers building partner-led GCC pursuits.",
    icon: Briefcase,
    objectives: [
      "Prioritise accounts with live intent signals such as hiring momentum, leadership changes, or capability launches.",
      "Lead with buyer-relevant city, talent, and capability context instead of generic solution pitches.",
      "Build partner coalitions before RFPs by knowing which partners already have presence and credibility."
    ],
    outcomes: [
      "Higher response rates and earlier conversations.",
      "Stronger partner-led positioning.",
      "Better win rates through relevance and timing."
    ],
    playbook: [
      {
        title: "Territory and account prioritisation",
        items: [
          "Shortlist GCCs showing hiring momentum, leadership changes, or capability launches.",
          "Time outreach to intent signals instead of static account lists.",
          "Export CRM-ready lists with city and capability angles."
        ]
      },
      {
        title: "Pre-meeting and discovery prep",
        items: [
          "Lead with buyer-relevant city, talent, and capability context.",
          "Use leadership and sponsor changes to tailor the storyline.",
          "Walk in with live org and hiring focus rather than static decks."
        ]
      },
      {
        title: "Partner alignment and co-sell planning",
        items: [
          "Map delivery, staffing, or tech partners already present in target GCCs.",
          "Align coalition roles and value propositions before shortlists finalize.",
          "Go to market early with credible, data-backed positioning."
        ]
      }
    ],
    signals: [
      "Hiring velocity and role mix by city",
      "New capability launches and scale-up plans",
      "Leadership and sponsor changes",
      "Partner footprint and delivery depth by location"
    ],
    stats: [
      { label: "Engagement timing", value: "Pre-shortlist", helper: "Intent-led outreach windows" },
      { label: "Partner view", value: "Delivery / Staffing / Tech", helper: "Mapped by city and capability" },
      { label: "Prep time", value: "Minutes", helper: "Exportable briefs for co-sell teams" }
    ]
  },
  {
    id: "global-pmo",
    title: "Global PMO",
    path: "/use-cases/global-pmo",
    badge: "ICP",
    headline: "Keep global GCC programs on one verifiable spine",
    description: "Run India GCC programs with the same control, predictability, and visibility as any global hub. Bamboo Reports gives Global PMOs a single, trusted view of talent, partners, and progress across India.",
    audience: "Global and regional PMOs coordinating multi-site GCC programs with India as a core hub.",
    icon: Globe2,
    objectives: [
      "Anchor plans to India-specific reality by aligning global timelines to hiring velocity, partner capacity, and leadership depth across Indian cities.",
      "Reduce surprises across functions by tracking talent, vendors, and site readiness in one trusted place.",
      "Keep steering committees aligned with a unified, fact-based view of progress, risks, and dependencies."
    ],
    outcomes: [
      "Fewer last-minute escalations.",
      "More predictable program delivery.",
      "Stronger confidence in India as a scale hub."
    ],
    playbook: [
      {
        title: "Global program reviews",
        items: [
          "Anchor timelines to India-specific hiring pace and partner capacity.",
          "Show milestone health against peer timelines for similar transitions.",
          "Keep finance, HR, and facilities aligned to one verifiable spine."
        ]
      },
      {
        title: "Cross-region dependency planning",
        items: [
          "Track talent, vendor, and site readiness in one view instead of fragmented updates.",
          "Model alternates when constraints hit specific cities or capabilities.",
          "Share risk and dependency views across regions to prevent slippage."
        ]
      },
      {
        title: "Steering committee and exec updates",
        items: [
          "Present a unified, fact-based view of progress, risks, and dependencies.",
          "Include mitigation paths for hiring, vendor, or leadership slowdowns.",
          "Maintain predictability and confidence in India as a scale hub."
        ]
      }
    ],
    signals: [
      "Hiring pace and skill availability by city",
      "Partner footprint and delivery stability",
      "Leadership continuity and succession risk",
      "Program milestone health versus peer timelines"
    ],
    stats: [
      { label: "Control focus", value: "Talent / Partners / Milestones", helper: "One verifiable spine" },
      { label: "Cadence", value: "Global reviews", helper: "Exec-ready India signal packs" },
      { label: "Risk view", value: "Hiring / Vendor / Leadership", helper: "Early warnings baked in" }
    ]
  },
  {
    id: "india-leadership",
    title: "India Leadership",
    path: "/use-cases/india-leadership",
    badge: "ICP",
    headline: "India GCC clarity without hunting for slides",
    description: "Stay ahead of GCC momentum, city shifts, and capability ramps with decision-ready insight. Bamboo Reports gives India leadership a clear, current view of how GCCs are scaling across cities, sectors, and functions.",
    audience: "India country leaders, strategy teams, and finance partners supporting GCC growth and governance.",
    icon: Users,
    objectives: [
      "Get a single view of India GCC momentum - capacity, hiring, and capability shifts across Tier 1 and Tier 2 hubs.",
      "Ground investment, funding, and headcount decisions in verified benchmarks instead of fragmented inputs.",
      "Lead board, HQ, and steering reviews with fresh, defensible numbers that stand up to scrutiny."
    ],
    outcomes: [
      "Faster, cleaner leadership alignment.",
      "Stronger credibility in HQ and board forums.",
      "Better-timed investment and growth decisions."
    ],
    playbook: [
      {
        title: "Executive and board updates",
        items: [
          "Share India-wide GCC momentum across cities, sectors, and functions.",
          "Use verified benchmarks for maturity, growth, and cost instead of anecdote.",
          "Keep decks current without chasing multiple teams for data."
        ]
      },
      {
        title: "Annual operating plans and budgets",
        items: [
          "Anchor funding and headcount asks in benchmarked city and capability evidence.",
          "Size capacity across Tier 1 and Tier 2 hubs using hiring and cost signals.",
          "Export decision-ready packs for finance and HQ stakeholders."
        ]
      },
      {
        title: "Strategic reviews with global stakeholders",
        items: [
          "Align on risk, opportunity, and timing using fresh GCC signals.",
          "Track leadership and sponsor moves that shape governance.",
          "Keep scenario-ready alternates visible for capacity planning."
        ]
      }
    ],
    signals: [
      "City and capability momentum across India",
      "Leadership moves and sponsor changes",
      "Hiring velocity and cost pressure signals",
      "Expansion, consolidation, and exit activity"
    ],
    stats: [
      { label: "Coverage", value: "Tier 1 + Tier 2 hubs", helper: "City, sector, and capability shifts" },
      { label: "Leadership lens", value: "Sponsors and moves", helper: "Refreshed with current signals" },
      { label: "Decision rhythm", value: "Boards / HQ / AOP", helper: "Export-ready, defensible packs" }
    ]
  }
];
