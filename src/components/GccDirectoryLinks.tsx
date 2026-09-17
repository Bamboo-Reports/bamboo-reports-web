interface LinkItem {
  path: string;
  label: string;
}

interface GccDirectoryLinksProps {
  directoryPages: LinkItem[];
  industries: LinkItem[];
  cities: LinkItem[];
  publicCount: number;
}

// Plain <a>, not next/link: these are static HTML pages outside the app, so a
// client-side transition would only fall back to a full load.
const LinkList = ({ items }: { items: LinkItem[] }) => (
  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
    {items.map((item) => (
      <li key={item.path}>
        <a
          href={item.path}
          className="inline-flex min-h-8 items-center text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
);

/**
 * Crawlable entry points into the static GCC directory and landing pages.
 * Replaces the hidden snapshot the old build injected into /gcc: the same
 * links, but visible to everyone rather than wiped once JavaScript loads.
 */
const GccDirectoryLinks = ({
  directoryPages,
  industries,
  cities,
  publicCount,
}: GccDirectoryLinksProps) => (
  <section aria-labelledby="gcc-directory-heading" className="px-4 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <h2 id="gcc-directory-heading" className="text-2xl font-bold tracking-tight md:text-3xl">
        Browse the India GCC directory
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        All {publicCount.toLocaleString("en-US")} public GCC companies, 100 per page, plus
        every industry and major city.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Directory pages
          </h3>
          <LinkList items={directoryPages} />
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            By industry
          </h3>
          <LinkList items={industries} />
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            By city
          </h3>
          <LinkList items={cities} />
        </div>
      </div>
    </div>
  </section>
);

export default GccDirectoryLinks;
