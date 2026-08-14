// The GCC tracker stays hidden unless explicitly enabled for a deployment.
export const GCC_TRACKER_ENABLED =
  import.meta.env.VITE_GCC_TRACKER_ENABLED === "true";

// Account creation stays hidden until the signup flow is ready for launch.
export const ACCOUNT_CREATION_ENABLED =
  import.meta.env.VITE_ACCOUNT_CREATION_ENABLED === "true";
