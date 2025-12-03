import logo from "@/assets/researchnxt-logo.png";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-gradient-to-b from-muted/40 via-background to-background">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="rounded-3xl border bg-card/80 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em]">Stay ahead</p>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">Get GCC signals, benchmarks, and play-ready intel.</h3>
            <p className="text-muted-foreground text-sm md:text-base">Share your sectors, cities, and timelines. We will tailor a walkthrough and leave you with export-ready views.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://meetings-na2.hubspot.com/anam-khoja"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors duration-150"
            >
              Book a demo
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold hover:border-primary/60 hover:text-primary transition-colors duration-150"
            >
              View pricing
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-block transition-transform duration-micro ease-smooth hover:scale-[1.02]">
              <img src={logo} alt="Research NXT - GCC Intelligence Provider" className="h-12" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Research NXT builds GCC intelligence trusted by GTM, strategy, and delivery teams to move faster with data-backed confidence.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Bengaluru, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@researchnxt.com" className="hover:text-primary transition-colors duration-150">
                info@researchnxt.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href="tel:+918042850311" className="hover:text-primary transition-colors duration-150">
                +91 80428 50311
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a
                href="https://www.linkedin.com/company/research-nxt/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:border-primary/60 hover:text-primary transition-colors duration-150"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  GCC Reports
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  GCC Insights
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://meetings-na2.hubspot.com/anam-khoja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                >
                  Book a Demo
                </a>
              </li>
              <li>
                <Link to="/gcc-list" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Explore the Data
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>(c) 2025 Research NXT. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-150">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-primary transition-colors duration-150">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
