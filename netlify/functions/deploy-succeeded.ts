import { SITE_URL, indexablePaths } from "../../src/lib/seo";

// Netlify runs a function with this exact name after every successful
// deploy. On production deploys it tells IndexNow (Bing, Yandex, Seznam,
// Naver) that the site's indexable pages changed, so they recrawl them
// without waiting. ChatGPT search and Copilot draw on Bing's index.
//
// The key is public by design: IndexNow checks ownership by fetching
// /<key>.txt from the site, which lives in public/.
const INDEXNOW_KEY = "66044b44755742638e48fa94d852be7a";
const HOST = new URL(SITE_URL).host;

export default async (req: Request) => {
  const body = await req.json().catch(() => ({}));
  const context = body?.payload?.context;

  // Deploy previews and branch deploys are not the live site.
  if (context !== "production") {
    return new Response(`IndexNow skipped for ${context ?? "unknown"} deploy`);
  }

  // Same list as the sitemap: every page in PAGE_META without noindex.
  const urlList = indexablePaths().map((path) => `${SITE_URL}${path}`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  // 200 and 202 both mean accepted. Failures are logged, not thrown: a
  // failed ping must never look like a failed deploy.
  const message = `IndexNow ${res.status} for ${urlList.length} URLs`;
  if (!res.ok) console.warn(message, await res.text());
  return new Response(message);
};
