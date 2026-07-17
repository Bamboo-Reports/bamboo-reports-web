// Feature flags read from Vite env vars at build time.
// The GCC tracker is hidden unless VITE_GCC_TRACKER_ENABLED is exactly "true".
export const GCC_TRACKER_ENABLED =
  import.meta.env.VITE_GCC_TRACKER_ENABLED === "true";

// Q1 FY27 report figures (99 / 110 / 27 / 1 in 4 / 2,400+ / 5,900+) stay
// hidden until the count reconciliation is frozen. Flip
// VITE_Q1_REPORT_NUMBERS_CONFIRMED to "true" once the numbers are final.
export const Q1_REPORT_NUMBERS_CONFIRMED =
  import.meta.env.VITE_Q1_REPORT_NUMBERS_CONFIRMED === "true";
