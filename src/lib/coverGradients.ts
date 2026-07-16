// Pastel gradient pairs for content-card cover tiles. `base` is the resting
// wash, `hover` the slightly deeper version eased in on hover. Cards pick by
// index so neighbours never share a gradient.
export const COVER_GRADIENTS = [
  {
    base: "bg-gradient-to-br from-sky-100 via-indigo-50 to-rose-100",
    hover: "bg-gradient-to-br from-sky-200 via-indigo-100 to-rose-200",
  },
  {
    base: "bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-100",
    hover: "bg-gradient-to-br from-emerald-200 via-teal-100 to-sky-200",
  },
  {
    base: "bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100",
    hover: "bg-gradient-to-br from-amber-200 via-orange-100 to-rose-200",
  },
  {
    base: "bg-gradient-to-br from-violet-100 via-purple-50 to-sky-100",
    hover: "bg-gradient-to-br from-violet-200 via-purple-100 to-sky-200",
  },
];

export const coverGradient = (index: number) =>
  COVER_GRADIENTS[index % COVER_GRADIENTS.length];
