// Site-wide Q1 report announcement. Rendered by Header on every SPA page;
// the static GCC pages carry their own equivalent promo bar.
const AnnouncementBar = () => (
  <a
    href="/signup?src=q1-announce"
    className="block bg-navy px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm"
  >
    <span className="hidden sm:inline">
      The Q1 2026 India GCC Report drops this July.{" "}
      <span className="underline underline-offset-2">Sign up free for early access &rarr;</span>
    </span>
    <span className="sm:hidden">
      Q1 2026 GCC Report this July.{" "}
      <span className="underline underline-offset-2">Sign up free &rarr;</span>
    </span>
  </a>
);

export default AnnouncementBar;
