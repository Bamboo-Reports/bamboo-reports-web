import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { useAuth } from "@/contexts/AuthContext";
import gccIllustration from "@/assets/gcc-illustration.png";

const CAPABILITIES = [
  { title: "GCC Prospect Data", href: "/gcc-prospect-data" },
  { title: "Account & Market Intelligence", href: "/account-market-intelligence" },
  { title: "GCC Focused ABM", href: "/gcc-abm" },
];

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="overflow-hidden px-4 pb-14 pt-12 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <h1
              className="hero-rise text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0ms" }}
            >
              Your trusted partner for{" "}
              <span className="text-primary">GCC GTM enablement</span>
            </h1>

            <div
              className="hero-rise mt-9 max-w-md border-t"
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
              className="hero-rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "220ms" }}
            >
              {!user && (
                <Button
                  asChild
                  size="lg"
                  className="px-7 text-base font-semibold"
                >
                  <Link to="/signup?src=home-hero">Sign up for free</Link>
                </Button>
              )}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-7 text-base font-semibold"
              >
                <GoogleCalendarSchedulingButton>
                  Get a demo
                </GoogleCalendarSchedulingButton>
              </Button>
            </div>

            <p
              className="hero-rise mt-5 max-w-lg text-sm text-muted-foreground"
              style={{ animationDelay: "300ms" }}
            >
              Built and refreshed by analysts who track the India GCC market
              every day.
            </p>
          </div>

          <div
            className="hero-rise flex justify-center"
            style={{ animationDelay: "200ms" }}
          >
            <img
              src={gccIllustration}
              alt="GCC Intelligence Platform - Global Capability Centers Data Analytics and Market Intelligence Illustration"
              width="1024"
              height="714"
              fetchPriority="high"
              className="h-auto w-full max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
