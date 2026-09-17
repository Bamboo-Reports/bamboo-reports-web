import type { NextConfig } from "next";

// 301 (not Next's default 308) so responses match the old public/_redirects.
const redirect301 = (source: string, destination: string) => ({
  source,
  destination,
  statusCode: 301 as const,
});

const nextConfig: NextConfig = {
  // Canonicals and the sitemap mix /gcc/ (slash) with /about (no slash); the
  // default redirect would send /gcc/ to /gcc and contradict its canonical.
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },

  async redirects() {
    return [
      redirect301("/v2", "/"),
      redirect301("/reads", "/resources"),
      redirect301("/insights", "/resources"),
      redirect301("/reports/india-gcc-report-q1-fy27", "/reports/india-gcc-report-q2-2026"),
      redirect301("/reports/india-gcc-report-q1-fy27/thank-you", "/reports/india-gcc-report-q2-2026"),
      redirect301(
        "/reports/uploads/india-gcc-quarterly-report-q2-2026.pdf",
        "/reports/uploads/india-gcc-quarterly-report-q2-2026-v2.pdf",
      ),
      redirect301("/tracker", "/gcc/"),
      redirect301("/gcc-list", "/gcc/"),
      redirect301("/map-your-gcc-oppurtunity", "/map-your-gcc-opportunity"),
    ];
  },

  async rewrites() {
    return {
      // Company pages are prebuilt HTML under public/gcc/companies/<slug>/.
      // Next does not serve directory index.html files on its own.
      beforeFiles: [
        { source: "/gcc/companies/:slug", destination: "/gcc/companies/:slug/index.html" },
        { source: "/gcc/companies/:slug/", destination: "/gcc/companies/:slug/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
