import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const GA_MEASUREMENT_ID = "G-5EPYMCWP8N";
const DEFAULT_TITLE = "GCC GTM Enablement | Bamboo Reports";
const DEFAULT_DESCRIPTION =
  "Verified India GCC data, account intelligence, and analyst-led research for GTM teams building their India GCC opportunity.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bambooreports.com"),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  robots: "index, follow, max-image-preview:large",
  authors: [{ name: "Bamboo Reports" }],
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    type: "website",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <Providers>{children}</Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
