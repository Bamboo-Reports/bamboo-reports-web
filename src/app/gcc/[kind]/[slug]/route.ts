import { landingPage, loadGccSite } from "@/lib/server/gccPages";

// Industry and city landing pages (/gcc/industries/<slug>/, /gcc/cities/<slug>/)
// that keep the long tail behind the tracker's filter caps indexable.
// Prerendered at build time as standalone HTML; unknown kinds or slugs 404.
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const { sets } = await loadGccSite();
  return [...sets.industries, ...sets.cities].map((set) => ({ kind: set.kind, slug: set.slug }));
}

export async function GET(_request: Request, ctx: RouteContext<"/gcc/[kind]/[slug]">) {
  const { kind, slug } = await ctx.params;
  const site = await loadGccSite();
  const list = kind === "cities" ? site.sets.cities : site.sets.industries;
  const set = list.find((candidate) => candidate.slug === slug);
  const html = landingPage(set, site.sets, site.accounts, site.nameToSlug);
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
