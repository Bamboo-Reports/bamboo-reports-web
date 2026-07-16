import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthPageShell = ({
  title,
  description,
  children,
  wide = false,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1 border-b bg-secondary/30 px-4 py-10 md:py-14">
      <div className={`mx-auto ${wide ? "max-w-4xl" : "max-w-xl"}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <div className="mt-3 text-muted-foreground">{description}</div>
        </div>
        <div className="rounded-md border bg-background p-6 sm:p-8">{children}</div>
      </div>
    </main>
    <Footer showCta={false} />
  </div>
);

export default AuthPageShell;
