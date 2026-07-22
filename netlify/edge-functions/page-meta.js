// Rewrites title/meta tags in the SPA shell per route so link-preview
// crawlers (email, social) see page-specific metadata without running JS.
const PAGE_META = {
  "/map-your-gcc-opportunity": {
    title: "Map your India GCC opportunity | Bamboo Reports",
    description: "Map your India GCC opportunity with Bamboo Reports.",
  },
  "/reports/india-gcc-report-q1-fy27": {
    title: "India GCC Quarterly Report, Q2 2026 (April to June) | Bamboo Reports",
    description:
      "The Q2 2026 India GCC Quarterly Report: 110 centres from 99 companies, mapped to corridor level. Free, publishing late July 2026. Register to receive it first.",
    image:
      "https://www.bambooreports.com/gcc/india-gcc-report-share-card-q2-2026.png",
    url: "https://www.bambooreports.com/reports/india-gcc-report-q1-fy27",
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
  const escape = (value) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");

  const title = escape(meta.title);
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="title"[\s\S]*?content=")[^"]*(")/i,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="og:title"[\s\S]*?content=")[^"]*(")/i,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="twitter:title"[\s\S]*?content=")[^"]*(")/i,
      `$1${title}$2`
    );

  if (meta.description) {
    const description = escape(meta.description);
    html = html
      .replace(
        /(<meta\s+name="description"[\s\S]*?content=")[^"]*(")/i,
        `$1${description}$2`
      )
      .replace(
        /(<meta\s+property="og:description"[\s\S]*?content=")[^"]*(")/i,
        `$1${description}$2`
      )
      .replace(
        /(<meta\s+property="twitter:description"[\s\S]*?content=")[^"]*(")/i,
        `$1${description}$2`
      );
  }

  if (meta.image) {
    const image = escape(meta.image);
    html = html
      .replace(
        /(<meta\s+property="og:image"[\s\S]*?content=")[^"]*(")/i,
        `$1${image}$2`
      )
      .replace(
        /(<meta\s+property="twitter:image"[\s\S]*?content=")[^"]*(")/i,
        `$1${image}$2`
      );
  }

  if (meta.url) {
    const url = escape(meta.url);
    html = html.replace(
      /(<meta\s+property="og:url"[\s\S]*?content=")[^"]*(")/i,
      `$1${url}$2`
    );
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(html, { status: response.status, headers });
};

export const config = {
  path: Object.keys(PAGE_META),
};
