// The GCC tracker stays hidden unless explicitly enabled for a deployment.
export const GCC_TRACKER_ENABLED =
  process.env.NEXT_PUBLIC_GCC_TRACKER_ENABLED === "true";
