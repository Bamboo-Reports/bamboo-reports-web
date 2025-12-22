import { Filter, Lightbulb, LucideIcon, Target, TrendingUp } from "lucide-react";

export type FeatureItem = {
  id: string;
  title: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  href: string;
  highlights: string[];
  outcomes: string[];
  stats: { label: string; value: string; helper?: string }[];
};

export const featureItems: FeatureItem[] = [
  {
    id: "coverage",
    title: "90% More Center-Level Coverage",
    summary: "Get the deepest view of GCCs in India with verified, site-level intelligence.",
    description: "Bamboo Reports tracks India's GCC ecosystem at the centre level, not just the company level. This gives you a clearer picture of where teams operate, how they are structured, and where real opportunities exist.",
    icon: TrendingUp,
    href: "/features/coverage",
    highlights: [
      "Site-level visibility across Tier 1 and Tier 2 hubs with clear context on location, size, and each city's role in the footprint.",
      "Leadership and capability depth in one view so you can track centre heads, functional leaders, and delivery strengths without stitching sources.",
      "Change timelines to spot expansions, pivots, and exits as centres expand, consolidate, add capabilities, or quietly scale down."
    ],
    outcomes: [
      "Prioritise accounts with the richest operational context.",
      "Equip sales and leadership teams with defensible narratives.",
      "Identify whitespace before competitors act.",
      "Analyst-guided, not just data-heavy - every insight is validated so teams can act immediately."
    ],
    stats: [
      { label: "Centers tracked", value: "2,400+", helper: "Verified GCC locations across India" },
      { label: "Datapoints per centre", value: "30+", helper: "Location, capabilities, functions, scale, operating model" },
      { label: "Signal refresh", value: "Weekly", helper: "Expansions, new additions, structural changes" }
    ]
  },
  {
    id: "what-if-scenarios",
    title: "What If Scenarios",
    summary: "Model GCC decisions before you make them.",
    description: "Run structured scenario comparisons using verified centre-level data so strategic decisions are grounded in reality, not spreadsheet assumptions or anecdotes.",
    icon: Lightbulb,
    href: "/features/what-if-scenarios",
    highlights: [
      "Compare city choices using real GCC precedents across Bengaluru, Hyderabad, Pune, NCR, Chennai, and Tier 2 hubs - including scale, functions, and how they evolved.",
      "Assess centre-type trade-offs between GCC, GBS, R&D, CoE, and hybrid setups to understand what each structure enables and constrains.",
      "Pressure-test expansion and diversification plans such as opening a second city, adding new functions, or shifting from delivery-heavy to capability-led centres.",
      "Identify hidden risks early by surfacing red flags on over-concentration, talent saturation, leadership dependency, or premature capability expansion."
    ],
    outcomes: [
      "Choose expansion paths backed by observed GCC behaviour, not assumptions.",
      "Align leadership, finance, and delivery teams on a shared fact base.",
      "Reduce execution risk by learning from how similar centres scaled.",
      "Analyst-contextualised scenarios with benchmarks and context that stand up in leadership and board discussions."
    ],
    stats: [
      { label: "Scenario build time", value: "Minutes", helper: "Analyst-curated inputs, no custom modelling required" },
      { label: "Decision variables", value: "15+ levers", helper: "City mix, centre type, function mix, scale bands, maturity stage" },
      { label: "Decision outputs", value: "Slides & tables", helper: "Narratives aligned to leadership expectations" }
    ]
  },
  {
    id: "proprietary-tam-slicers",
    title: "Proprietary TAM Slicers",
    summary: "Build your TAM the way India GCCs actually operate.",
    description: "Move from inflated top-down TAMs to precise, actionable account universes built on verified GCC presence, maturity, scale, and capability signals.",
    icon: Filter,
    href: "/features/proprietary-tam-slicers",
    highlights: [
      "Slice TAM by real GCC maturity, not revenue bands - filter by centre age, scale bands, operating model, and evolution stage to focus on accounts that can actually buy.",
      "Layer capability and function signals into one view using delivery mixes like IT, ER&D, CoEs, analytics, or platform teams instead of generic industry labels.",
      "Segment by centre type and intent to differentiate GCCs, GBS units, R&D hubs, and hybrid centres so plays match buying behaviour and decision cycles.",
      "Create GTM-ready shortlists in minutes to generate ABM, partner, or pursuit lists without manual stitching across spreadsheets or CRM exports."
    ],
    outcomes: [
      "Focus sales effort on accounts with real delivery depth and buying readiness.",
      "Align marketing, sales, and delivery teams on a single TAM definition.",
      "Refresh slices quickly as priorities shift across cities, sectors, or functions.",
      "Analyst-informed slicing - every slicer is grounded in how GCCs have historically built, scaled, and purchased similar solutions."
    ],
    stats: [
      { label: "Preset GCC slicers", value: "25+", helper: "Built specifically for India GCC GTM motions" },
      { label: "Custom slice logic", value: "Reusable", helper: "Create, save, and reuse slicers by team or region" },
      { label: "Export formats", value: "CRM & CSV", helper: "Push lists directly into sales and marketing workflows" }
    ]
  },
  {
    id: "tailor-made-market-insights",
    title: "Tailor Made Market Insights",
    summary: "Analyst-led intelligence shaped to your market and GTM motion, built around your question - not a template dashboard.",
    description: "Custom market insights designed around specific business questions using verified GCC data, analyst interpretation, and contextual narratives teams can act on immediately.",
    icon: Target,
    href: "/features/tailor-made-market-insights",
    highlights: [
      "Custom market cuts aligned to your GTM focus with sector, city, or capability-specific views built around your target customer profile rather than generic reports.",
      "Narratives that connect data to decisions with clear takeaways, implications, and recommended actions - not just charts and tables.",
      "Competitive and whitespace intelligence to show where similar vendors are active, where demand is saturated, and where underserved opportunities exist.",
      "Ongoing insight refinement as priorities shift without restarting or re-buying static reports."
    ],
    outcomes: [
      "Enter new sectors or cities with evidence-backed conviction.",
      "Sharpen GTM messaging using real GCC behaviour and language.",
      "Support board, investor, and leadership conversations with credible insight.",
      "Analyst-led, not template-driven - every insight is reviewed, contextualised, and validated by analysts tracking the India GCC ecosystem."
    ],
    stats: [
      { label: "Insight formats", value: "Flexible", helper: "Briefs, slides, tables, and narratives based on the use case" },
      { label: "Custom dimensions", value: "Unlimited", helper: "Sector, city, capability, maturity, scale, centre type" },
      { label: "Turnaround time", value: "Days, not quarters", helper: "Built for fast-moving GTM and strategy cycles" }
    ]
  }
];
