import ThankYou from "@/views/ThankYou";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Thank You | Bamboo Reports",
  path: "/thank-you",
  description: "Thank you for reaching out to Bamboo Reports. Our team will review your request and get in touch shortly.",
  robots: "noindex, follow",
});

export default ThankYou;
