// The GCC tracker stays hidden unless explicitly enabled for a deployment.
export const GCC_TRACKER_ENABLED =
  import.meta.env.VITE_GCC_TRACKER_ENABLED === "true";
