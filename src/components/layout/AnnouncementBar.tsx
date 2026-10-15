import { TrailingArrow } from "@/components/ui/button";
import Link from "next/link";

/** The campaign strip riding inside the sticky header, above the nav row. */
const AnnouncementBar = () => (
  <div className="bg-navy px-gutter py-2 text-white">
    <div className="mx-auto flex min-h-8 max-w-page items-center justify-center gap-3 text-center text-sm font-semibold">
      <span className="hidden sm:inline">
        The Q2 India GCC report: every GCC move, tracked.
      </span>
      <span className="sm:hidden">The Q2 India GCC report.</span>
      <Link
        href="/reports/india-gcc-report-q2-2026?src=q2-announce"
        className="group relative inline-flex min-h-8 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-navy transition-colors duration-200 before:absolute before:-inset-x-1 before:-inset-y-2 before:content-[''] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:text-sm"
      >
        <span className="hidden sm:inline">Download for free</span>
        <span className="sm:hidden">Download</span>
        <TrailingArrow />
      </Link>
    </div>
  </div>
);

export default AnnouncementBar;
