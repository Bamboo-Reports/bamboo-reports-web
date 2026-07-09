import logo from "@/assets/bamboo-logo.svg";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useInquiryForm } from "@/contexts/InquiryFormContext";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";

const exploreLinks = [
  { label: "GCC Tracker", to: "/gcc" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Resources", to: "/resources" },
];

const Footer = () => {
  const { user } = useAuth();
  const { openInquiryForm } = useInquiryForm();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t bg-background">

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:py-16 space-y-12">
        {/* CTA Card */}
        <div className="rounded-2xl border bg-card/80 p-6 md:p-8 shadow-sm ring-1 ring-primary/10 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden />
                <span>Always-on GCC intelligence</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  Ready to unlock GCC intelligence for your team?
                </h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                  See how Bamboo Reports keeps you ahead with verified GCC data, benchmarks, and weekly insight drops tailored to strategy, location, and talent teams.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto">
              <GoogleCalendarSchedulingButton
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition duration-micro ease-smooth hover:shadow-md"
              >
                Get a demo
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </GoogleCalendarSchedulingButton>
              <button
                onClick={openInquiryForm}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition duration-micro ease-smooth hover:border-primary hover:text-primary"
              >
                Pricing
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <img
              src={logo}
              alt="Bamboo Reports - GCC Intelligence Provider"
              className="h-12 w-auto"
            />
            <p className="max-w-xl text-sm text-muted-foreground">
              Leading GCC Intelligence platform for Global Capability Centers research, market intelligence, and executive-ready insights.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors duration-micro ease-smooth hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Get Started</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {!user && (
                <li>
                  <Link to="/signup?src=footer" className="transition-colors duration-micro ease-smooth hover:text-primary">
                    Sign up free
                  </Link>
                </li>
              )}
              <li>
                <GoogleCalendarSchedulingButton
                  className="inline-flex items-center gap-1 transition-colors duration-micro ease-smooth hover:text-primary"
                >
                  Get a demo
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </GoogleCalendarSchedulingButton>
              </li>
              <li>
                <button onClick={openInquiryForm} className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Bamboo Reports &middot; A Research NXT Product. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="transition-colors duration-micro ease-smooth hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="transition-colors duration-micro ease-smooth hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
