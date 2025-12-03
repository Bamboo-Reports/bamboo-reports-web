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
    summary: "Our platform provides significantly more detailed information than most competitors, ensuring you have the complete picture.",
    description: "Get the fullest GCC view in India with verified, site-level intelligence so GTM, strategy, and delivery teams can move faster with confidence.",
    icon: TrendingUp,
    href: "/features/coverage",
    highlights: [
      "Site-level visibility across Tier 1 and Tier 2 hubs",
      "Leadership, hiring, and capability depth in one view",
      "Change timelines to spot expansions, pivots, and exits"
    ],
    outcomes: [
      "Prioritize accounts with the richest context available",
      "Equip executives with reliable, defensible narratives",
      "Spot gaps in competitor coverage before they do"
    ],
    stats: [
      { label: "Centers tracked", value: "2,400+", helper: "Verified India GCC locations" },
      { label: "Datapoints / center", value: "30+", helper: "Leadership, hiring, capabilities" },
      { label: "Signal refresh", value: "Weekly", helper: "Hiring and leadership moves" }
    ]
  },
  {
    id: "what-if-scenarios",
    title: "What If Scenarios",
    summary: "Simulate market shifts to forecast potential business impacts and opportunities.",
    description: "Stress-test your GCC plans against market movement scenarios so you can make the right bets before budgets lock.",
    icon: Lightbulb,
    href: "/features/what-if-scenarios",
    highlights: [
      "Model headcount shifts by city, sector, or capability",
      "See talent and hiring ripple effects in real time",
      "Run expansion, consolidation, and risk simulations"
    ],
    outcomes: [
      "Choose city plays with clearer upside and risk visibility",
      "Sequence GTM and delivery moves with data-backed confidence",
      "Frame board conversations with forward-looking options"
    ],
    stats: [
      { label: "Scenario run time", value: "< 2 min", helper: "Pre-built templates for common moves" },
      { label: "Variables to tweak", value: "15+", helper: "Cities, roles, sectors, growth curves" },
      { label: "Export-ready views", value: "Slides & Sheets", helper: "Share outcomes instantly" }
    ]
  },
  {
    id: "proprietary-tam-slicers",
    title: "Proprietary TAM Slicers",
    summary: "Align with your Go-to-Market strategies through highly customizable data filters.",
    description: "Cut TAM the way your GTM motion works with filters tuned for India GCC reality - not generic templates.",
    icon: Filter,
    href: "/features/proprietary-tam-slicers",
    highlights: [
      "Layer sector, capability, and maturity signals together",
      "Instant shortlists for ABM, pursuits, or partner plays",
      "Benchmark cities and sectors with apples-to-apples logic"
    ],
    outcomes: [
      "Land targeted plays with qualified account lists faster",
      "Align marketing, sales, and delivery on the same TAM view",
      "Swap filters to keep pace with shifting market focus"
    ],
    stats: [
      { label: "Preset filters", value: "25+", helper: "Built for GCC-specific GTM motions" },
      { label: "Custom fields", value: "Unlimited", helper: "Save and reuse slices per team" },
      { label: "Export formats", value: "CSV & CRM", helper: "Push lists where teams work" }
    ]
  },
  {
    id: "tailor-made-market-insights",
    title: "Tailor Made Market Insights",
    summary: "Customized intelligence aligned to your unique industry and growth strategy.",
    description: "Pair our data with analyst support to answer the exact questions your leadership, GTM, and delivery teams are asking.",
    icon: Target,
    href: "/features/tailor-made-market-insights",
    highlights: [
      "Analyst-crafted briefs on your target sectors and cities",
      "Side-by-side competitor and capability comparisons",
      "Executive-ready narratives with evidence trails"
    ],
    outcomes: [
      "Show up with sharper stories in stakeholder and board reviews",
      "De-risk expansion bets with context no one else surfaces",
      "Turn bespoke asks into repeatable, data-backed workflows"
    ],
    stats: [
      { label: "Turnaround", value: "72 hrs", helper: "On custom research asks" },
      { label: "Analyst touchpoints", value: "Bi-weekly", helper: "Working sessions included" },
      { label: "Delivery format", value: "Decks & dashboards", helper: "Ready for leadership" }
    ]
  }
];
