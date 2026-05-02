import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BarChart3, FileText, Home, SearchX } from "lucide-react";

import logo from "@/assets/bamboo-logo.svg";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page Not Found");
  const location = useLocation();

  useEffect(() => {
    // 404 errors are expected behavior - no logging needed
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="inline-flex transition-transform hover:scale-[1.02]">
            <img src={logo} alt="Bamboo Reports" className="h-10 md:h-12" />
          </Link>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_84%_20%,hsl(var(--accent)/0.18),transparent_34%),linear-gradient(140deg,hsl(var(--background))_0%,hsl(var(--secondary)/0.72)_100%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1fr_0.82fr] lg:px-6">
          <section className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <SearchX className="h-4 w-4" />
              404 - Signal not found
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              This GCC signal slipped off the map.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The page you requested does not exist or has moved. Bamboo Reports still
              has the intelligence you need across GCC accounts, reports, and market
              activity.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent px-7 font-semibold text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/platform">
                  Explore platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/reports">
                  View reports
                  <FileText className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          <aside className="rounded-3xl border bg-card/95 p-5 shadow-[0_24px_70px_-42px_hsl(var(--primary)/0.45)] backdrop-blur">
            <div className="rounded-2xl border bg-secondary/35 p-5">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Route Check
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Requested page unavailable
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Platform", "Live GCC account intelligence", "/platform"],
                  ["Resources", "Articles, reports, and insights", "/resources"],
                  ["Success Stories", "How teams use Bamboo Reports", "/success-stories"],
                ].map(([title, description, href]) => (
                  <Link
                    key={href}
                    to={href}
                    className="group flex items-center justify-between rounded-xl border bg-background p-4 transition-colors hover:border-primary/35 hover:bg-primary/5"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {title}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {description}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
