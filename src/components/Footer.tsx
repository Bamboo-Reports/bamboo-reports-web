import logo from "@/assets/researchnxt-logo.png";
import { ArrowUpRight, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
                Always-on GCC intelligence
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to unlock GCC intelligence for your team?
              </h3>
              <p className="text-white/60 text-base">
                See how Research NXT keeps you ahead with verified GCC data, benchmarks, and weekly insight drops.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:min-w-[220px]">
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:bg-accent/90"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="space-y-5 md:col-span-2">
            <img
              src={logo}
              alt="Research NXT - GCC Intelligence Provider"
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
            <p className="max-w-sm text-sm text-white/50 leading-relaxed">
              Leading GCC Intelligence platform for Global Capability Centers research, market intelligence, and executive-ready insights.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              <a href="mailto:enquiry@researchnxt.com" className="hover:text-white transition-colors">
                enquiry@researchnxt.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/reports" className="text-white/60 hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-white/60 hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-white/60 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Get Started</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://calendar.app.google/QNXWripJexzXLHqGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                >
                  Book a Demo
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                </a>
              </li>
              <li>
                <Link to="/gcc-list" className="text-white/60 hover:text-white transition-colors">
                  Explore the Data
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/60 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about-us" className="text-white/60 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-white/60 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 mt-12 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/40">
            &copy; {currentYear} Research NXT. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-white/70 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
