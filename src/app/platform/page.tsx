import Platform from "@/views/Platform";
import { PLATFORM_SEO } from "@/components/platform/content";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: PLATFORM_SEO.title,
  path: "/platform",
  description: PLATFORM_SEO.description,
});

export default Platform;
