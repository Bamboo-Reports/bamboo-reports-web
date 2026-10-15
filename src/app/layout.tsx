import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { InquiryFormProvider } from "@/contexts/InquiryFormContext";
import { SITE_URL } from "@/lib/seo";
import "@/index.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
  // The optical-size axis drives the display voice (.font-display).
  axes: ["opsz"],
  display: "swap",
  variable: "--font-dm-sans",
});

const GA_MEASUREMENT_ID = "G-5EPYMCWP8N";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Bamboo Reports" }],
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={dmSans.variable}>
    <body>
      <InquiryFormProvider>{children}</InquiryFormProvider>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </body>
  </html>
);

export default RootLayout;
