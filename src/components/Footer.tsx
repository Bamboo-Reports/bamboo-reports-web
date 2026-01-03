import logo from "@/assets/researchnxt-logo.png";
import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_30%)]" />

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
                  See how Research NXT keeps you ahead with verified GCC data, benchmarks, and weekly insight drops tailored to strategy, location, and talent teams.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">2k+ GCC profiles</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">Curated insights weekly</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">Analyst support included</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto">
              <a
                href="https://meetings-na2.hubspot.com/anam-khoja"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition duration-micro ease-smooth hover:shadow-md"
              >
                Book a demo
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition duration-micro ease-smooth hover:border-primary hover:text-primary"
              >
                View pricing
              </Link>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                <a href="mailto:hello@researchnxt.com" className="hover:text-primary">
                  hello@researchnxt.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <img
              src={logo}
              alt="Research NXT - GCC Intelligence Provider"
              className="h-12 w-auto transition-transform duration-micro ease-smooth hover:scale-[1.02]"
            />
            <p className="max-w-xl text-sm text-muted-foreground">
              Leading GCC Intelligence platform for Global Capability Centers research, market intelligence, and executive-ready insights.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/reports" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/insights" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/articles" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Get Started</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://meetings-na2.hubspot.com/anam-khoja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors duration-micro ease-smooth hover:text-primary"
                >
                  Book a Demo
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <Link to="/gcc-list" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Explore the Data
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/about-us" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="transition-colors duration-micro ease-smooth hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Research NXT. All rights reserved.
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
