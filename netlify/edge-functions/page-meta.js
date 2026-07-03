// Rewrites title/meta tags in the SPA shell per route so link-preview
// crawlers (email, social) see page-specific metadata without running JS.
const PAGE_META = {
  "/map-your-gcc-opportunity": {
    title: "Map your India GCC opportunity | Bamboo Reports",
  },
};

export default async (request, context) => {
  const { pathname } = new URL(request.url);
  const meta = PAGE_META[pathname.replace(/\/$/, "") || "/"];
  if (!meta) return context.next();

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  const title = meta.title
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");

  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="title"\s+content=")[^"]*(")/i,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/i,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="twitter:title"\s+content=")[^"]*(")/i,
      `$1${title}$2`
    );

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(html, { status: response.status, headers });
};

export const config = {
  path: Object.keys(PAGE_META),
};
