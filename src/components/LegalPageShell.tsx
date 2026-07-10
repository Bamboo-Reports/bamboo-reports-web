import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LegalPageShell = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1">
      <section className="border-b bg-secondary/30 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <p className="mt-3 text-muted-foreground"><strong>Effective Date:</strong> [Insert Date]</p>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-4 py-12 text-muted-foreground md:py-16 [&_h2]:mt-10 [&_h2]:border-t [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:leading-relaxed [&_p]:leading-relaxed [&_strong]:text-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </article>
    </main>
    <Footer showCta={false} />
  </div>
);

export default LegalPageShell;
