import { ArrowRight, FileText, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

const ROUTES = [
  ["Platform", "Live GCC account intelligence", "/platform"],
  ["Resources", "Articles, reports, and insights", "/resources"],
  ["Success Stories", "How teams use Bamboo Reports", "/success-stories"],
] as const;

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 border-b bg-secondary/30 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent"><SearchX className="h-4 w-4" aria-hidden />404 - Signal not found</div>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-tight md:text-5xl">This GCC signal slipped off the map.</h1>
          <p className="mt-5 max-w-5xl text-lg leading-relaxed text-muted-foreground">The page you requested does not exist or has moved. Bamboo Reports still has the intelligence you need across GCC accounts, reports, and market activity.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/platform">Explore platform<ArrowRight className="h-4 w-4" aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/resources">View resources<FileText className="h-4 w-4" aria-hidden /></Link></Button>
          </div>

          <div className="mt-12 border-t">
            <p className="py-5 text-sm font-semibold text-accent">Route Check · Requested page unavailable</p>
            {ROUTES.map(([title, description, href]) => (
              <Link key={href} to={href} className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span><span className="block font-semibold">{title}</span><span className="mt-1 block text-sm text-muted-foreground">{description}</span></span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
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
