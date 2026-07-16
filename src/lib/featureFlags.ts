// Feature flags read from Vite env vars at build time.
// The GCC tracker is hidden unless VITE_GCC_TRACKER_ENABLED is exactly "true".
export const GCC_TRACKER_ENABLED =
  import.meta.env.VITE_GCC_TRACKER_ENABLED === "true";
