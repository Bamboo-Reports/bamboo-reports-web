import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { useAuth } from "@/contexts/AuthContext";
import { ACCOUNT_CREATION_ENABLED } from "@/lib/featureFlags";
import gccIllustration from "@/assets/gcc-hero-intelligence-v2.png";

const CAPABILITIES = [
  { title: "GCC Prospect Data", href: "/gcc-prospect-data" },
  { title: "Account & Market Intelligence", href: "/account-market-intelligence" },
  { title: "GCC Focused ABM", href: "/gcc-abm" },
];

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="overflow-hidden px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <h1
              className="hero-rise text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0ms" }}
            >
              Your trusted partner for{" "}
              <span className="text-primary">GCC GTM enablement</span>
            </h1>

            <div
              className="hero-rise mt-8 max-w-md border-t"
              style={{ animationDelay: "120ms" }}
            >
              {CAPABILITIES.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group flex items-center justify-between gap-4 border-b py-3.5 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:text-base"
                >
                  {item.title}
                  <ArrowRight
                    className="h-4 w-4 flex-none text-border transition-all group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>

            <div
              className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "220ms" }}
            >
              {!user && ACCOUNT_CREATION_ENABLED && (
                <Button
                  asChild
                  size="lg"
                  className="w-full px-7 text-base font-semibold sm:w-auto"
                >
                  <Link to="/signup?src=home-hero">Sign up for free</Link>
                </Button>
              )}
              <Button
                asChild
                size="lg"
                variant={ACCOUNT_CREATION_ENABLED ? "outline" : "default"}
                className="w-full px-7 text-base font-semibold sm:w-auto"
              >
                <GoogleCalendarSchedulingButton>
                  Get a demo
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </GoogleCalendarSchedulingButton>
              </Button>
            </div>
          </div>

          <div
            className="hero-rise flex justify-center"
            style={{ animationDelay: "200ms" }}
          >
            <img
              src={gccIllustration}
              alt="GCC Intelligence Platform - Global Capability Centres Data Analytics and Market Intelligence Illustration"
              width="1536"
              height="1024"
              fetchPriority="high"
              className="h-auto w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
