import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

const LegalPageShell = ({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1">
      <PageHero eyebrow="Legal" title={title} lede={`Effective date: ${effectiveDate}`} />
      <article className="mx-auto max-w-4xl px-4 py-12 text-muted-foreground md:py-16 [&_h2]:mt-10 [&_h2]:border-t [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:leading-relaxed [&_p]:leading-relaxed [&_strong]:text-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </article>
    </main>
    <Footer showCta={false} />
  </div>
);

export default LegalPageShell;
