import About from "@/views/About";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "About Bamboo Reports | The India GCC dataset built centre by centre",
  path: "/about",
  description: "Bamboo Reports profiles 6,000+ individual India GCC centres against 2,400+ parent accounts: what each centre does, who runs it and what it runs on. A Research NXT product, built since 2022.",
  canonicalUrl: "https://bambooreports.com/about",
});

export default About;
