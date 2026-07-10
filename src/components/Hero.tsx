import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import { useAuth } from "@/contexts/AuthContext";
import gccIllustration from "@/assets/gcc-illustration.png";

const CAPABILITIES = [
  "GCC Prospect Data",
  "Account & Market Intelligence",
  "GCC Focused ABM",
];

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="px-4 pb-12 pt-10 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <h1 className="text-balance leading-tight">
              <span className="mb-2 block text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                Your Trusted Partner for
              </span>
              <span className="block text-4xl font-extrabold text-primary sm:text-5xl lg:text-6xl">
                GCC GTM Enablement
              </span>
            </h1>

            <ul className="mt-7 space-y-3">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-muted-foreground sm:text-base"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {!user && (
                <Button
                  asChild
                  size="lg"
                  className="px-7 text-base font-semibold"
                >
                  <Link to="/signup?src=home-hero">Sign up free</Link>
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

            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              Free access to the India GCC directory, plus expert advice to
              supercharge your GCC strategy
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={gccIllustration}
              alt="GCC Intelligence Platform - Global Capability Centers Data Analytics and Market Intelligence Illustration"
              width="1024"
              height="714"
              fetchPriority="high"
              className="h-auto w-full max-w-2xl"
            />
          </div>
        </div>

        <div className="mt-16 border-t pt-10 md:mt-20 md:pt-12">
          <h2 className="text-2xl font-bold leading-tight md:text-3xl">
            What is GCC Intelligence?
          </h2>
          <div className="mt-5 max-w-6xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              GCC Intelligence refers to the structured, data-driven
              understanding of Global Capability Centers (GCCs), also known as
              Global In-house Centers (GICs). These are offshore operations of
              multinational companies and handle a wide range of strategic,
              operational, and innovation-driven functions.
            </p>
            <p>
              India has become a key destination for these centers, thanks to
              its talent density, mature ecosystems, and infrastructure. The
              role of GCCs has expanded well beyond cost efficiency to driving
              innovation, agility, and business continuity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
