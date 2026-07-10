import { ArrowRight } from "lucide-react";

const AnnouncementBar = () => (
  <div className="bg-navy px-4 py-2 text-white">
    <div className="mx-auto flex min-h-8 max-w-7xl items-center justify-center gap-3 text-center text-sm font-semibold">
      <span className="hidden sm:inline">
        The Q1 2026 India GCC Report drops this July.
      </span>
      <span className="sm:hidden">Q1 2026 GCC Report this July.</span>
      <a
        href="/signup?src=q1-announce"
        className="inline-flex min-h-8 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-navy transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:text-sm"
      >
        <span className="hidden sm:inline">Sign up free for early access</span>
        <span className="sm:hidden">Sign up free</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  </div>
);

export default AnnouncementBar;
