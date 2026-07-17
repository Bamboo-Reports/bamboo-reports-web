import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AnnouncementBar = () => (
  <div className="bg-navy px-4 py-2 text-white">
    <div className="mx-auto flex min-h-8 max-w-7xl items-center justify-center gap-3 text-center text-sm font-semibold">
      <span className="hidden sm:inline">
        India GCC Quarterly Report, Q1 2026: free, publishing late July.
      </span>
      <span className="sm:hidden">India GCC Report, Q1 2026.</span>
      <Link
        to="/reports/india-gcc-report-q1-fy27?src=q1-announce"
        className="relative inline-flex min-h-8 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-navy transition-colors before:absolute before:-inset-y-2 before:-inset-x-1 before:content-[''] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:text-sm"
      >
        <span className="hidden sm:inline">Register for free</span>
        <span className="sm:hidden">Register</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  </div>
);

export default AnnouncementBar;
