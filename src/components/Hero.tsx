import { Button } from "@/components/ui/button";
import gccIllustration from "@/assets/gcc-illustration.png";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative enterprise-section">
        <div className="max-w-7xl mx-auto">
          {/* Enterprise badge */}
          <div className="text-center mb-8">
            <span className="enterprise-badge">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Enterprise Intelligence Platform
            </span>
          </div>

          {/* Main headline */}
          <div className="text-center mb-10 max-w-4xl mx-auto">
            <h1 className="mb-6">
              <span className="text-foreground block mb-2">
                Actionable Insights On
              </span>
              <span className="enterprise-gradient-text block">
                Global Capability Centers
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The largest intelligence platform helping enterprise teams navigate
              India's thriving GCC ecosystem with verified, center-level data.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 rounded-lg font-semibold text-base shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/25 transition-all"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 rounded-lg font-semibold text-base border-border/80 hover:border-accent/40 hover:bg-accent/5 transition-all"
            >
              <Link to="/gcc-list">Explore the Data</Link>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-16">
            No credit card required. Get expert advice to supercharge your GCC strategy.
          </p>

          {/* Trust stats bar */}
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="enterprise-stat">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div className="enterprise-stat-value">2,400+</div>
                <div className="enterprise-stat-label">GCC Centers Tracked</div>
              </div>
              <div className="enterprise-stat">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-accent" />
                </div>
                <div className="enterprise-stat-value">55+</div>
                <div className="enterprise-stat-label">Countries Covered</div>
              </div>
              <div className="enterprise-stat">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="enterprise-stat-value">Weekly</div>
                <div className="enterprise-stat-label">Data Refreshes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What is GCC Intelligence - moved below with enterprise styling */}
      <div className="enterprise-section-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="enterprise-badge mb-6 inline-flex">About GCC Intelligence</span>
              <h2 className="mb-6">
                What is GCC Intelligence?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg">
                GCC Intelligence refers to the structured, data-driven
                understanding of Global Capability Centers (GCCs), also known as
                Global In-house Centers (GICs). These are offshore operations of
                multinational companies and handle a wide range of strategic,
                operational, and innovation-driven functions.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                India has become a key destination for these centers, thanks to
                its talent density, mature ecosystems, and infrastructure. The
                role of GCCs has expanded well beyond cost efficiency to driving
                innovation, agility, and business continuity.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl blur-xl" />
                <img
                  src={gccIllustration}
                  alt="GCC Intelligence Platform - Global Capability Centers Data Analytics and Market Intelligence Illustration"
                  className="relative w-full max-w-sm md:max-w-lg rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
