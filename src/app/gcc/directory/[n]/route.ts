import { buildDirectoryPage, loadGccSite } from "@/lib/server/gccPages";

// Paginated, crawlable list of every public GCC company (100 per page).
// Prerendered at build time as standalone HTML; any other page number 404s.
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const { directoryPages } = await loadGccSite();
  return directoryPages.map(({ n }) => ({ n: String(n) }));
}

export async function GET(_request: Request, ctx: RouteContext<"/gcc/directory/[n]">) {
  const { n } = await ctx.params;
  const site = await loadGccSite();
  const pageNumber = Number(n);
  const html = buildDirectoryPage(
    pageNumber,
    site.pageCount,
    site.pageSlice(pageNumber),
    site.pub,
    site.accounts,
    site.nameToSlug,
  );
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
