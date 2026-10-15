import { RiArrowRightLine, RiFileTextLine, RiSearchLine } from "@remixicon/react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const ROUTES = [
  ["Platform", "Search GCC accounts and centres", "/platform"],
  ["Resources", "GCC market reports", "/resources"],
  ["Success Stories", "How teams use Bamboo Reports", "/success-stories"],
] as const;

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 border-b bg-secondary/30 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent"><RiSearchLine className="h-4 w-4" aria-hidden />404: Page not found</div>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-tight md:text-5xl">We cannot find that page.</h1>
          <p className="mt-5 max-w-5xl text-lg leading-relaxed text-muted-foreground">The page you requested does not exist or has moved. Try one of these instead.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/platform">Explore platform<RiArrowRightLine className="h-4 w-4" aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/resources">View resources<RiFileTextLine className="h-4 w-4" aria-hidden /></Link></Button>
          </div>

          <div className="mt-12 border-t">
            <p className="py-5 text-sm font-semibold text-accent">Other pages</p>
            {ROUTES.map(([title, description, href]) => (
              <Link key={href} href={href} className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span><span className="block font-semibold">{title}</span><span className="mt-1 block text-sm text-muted-foreground">{description}</span></span>
                <RiArrowRightLine className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer showCta={false} />
    </div>
  );
};

export default NotFound;
