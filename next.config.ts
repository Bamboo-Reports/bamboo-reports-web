import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is static, so Netlify serves plain HTML from `out/` with no
  // server runtime. Redirects therefore live in public/_redirects.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
