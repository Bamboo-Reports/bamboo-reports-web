import logo from "@/assets/bamboo-logo.svg";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInquiryForm } from "@/contexts/InquiryFormContext";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { GCC_TRACKER_ENABLED } from "@/lib/featureFlags";

const exploreLinks = [
  ...(GCC_TRACKER_ENABLED ? [{ label: "GCC Tracker", to: "/gcc" }] : []),
  { label: "About us", to: "/about" },
  { label: "Success stories", to: "/success-stories" },
  { label: "Resources", to: "/resources" },
];

const Footer = ({ showCta = true }: { showCta?: boolean }) => {
  const { openInquiryForm } = useInquiryForm();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t bg-background">

      <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-5 py-10 sm:px-4 md:space-y-12 md:py-12 lg:py-16">
        {showCta && <div className="border-y py-7 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-7">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Always-on GCC intelligence
              </p>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                  Ready to unlock GCC intelligence for your team?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                  See how Bamboo Reports keeps you ahead with verified GCC data, benchmarks, and weekly insight drops tailored to strategy, location, and talent teams.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:flex-col">
              <GoogleCalendarSchedulingButton
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-micro ease-smooth hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Get a demo
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </GoogleCalendarSchedulingButton>
              <button
                onClick={openInquiryForm}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-micro ease-smooth hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Pricing
              </button>
            </div>
          </div>
        </div>}

        {/* Main Footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="space-y-4 md:max-w-md">
            <img
              src={logo}
              alt="Bamboo Reports: GCC Intelligence Provider"
              className="h-12 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              The leading GCC intelligence platform for Global Capability Centres research, market intelligence, and executive-ready insights.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Explore</h2>
            <ul className="flex flex-wrap gap-x-6 text-sm text-muted-foreground md:flex-col md:gap-x-0">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-flex min-h-11 items-center transition-colors duration-micro ease-smooth hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Bamboo Reports - A Research NXT Product. All rights reserved.
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
