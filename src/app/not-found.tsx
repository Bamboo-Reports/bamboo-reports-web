import NotFound from "@/views/NotFound";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Page Not Found | Bamboo Reports",
  path: "/",
  description: "The requested Bamboo Reports page could not be found.",
  canonicalUrl: null,
  robots: "noindex, follow",
});

export default NotFound;
