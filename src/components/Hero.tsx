import { Button } from "@/components/ui/button";
import gccIllustration from "@/assets/gcc-illustration.png";

const Hero = () => {
  return (
    <section className="py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="leading-tight mb-4 md:mb-6">
            <span className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold block mb-2">
              Your Trusted Partner for
            </span>
            <span className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold block">
              GCC GTM Enablement
            </span>
          </h1>
          <ul className="text-muted-foreground mb-6 md:mb-8 font-bold text-sm sm:text-base md:text-lg px-2 max-w-3xl mx-auto leading-relaxed list-disc list-inside flex flex-col sm:flex-row sm:list-none gap-1 sm:gap-4 justify-center items-center">
            <li>GCC Prospect Data</li>
            <li className="hidden sm:block">•</li>
            <li>Account & Market Intelligence</li>
            <li className="hidden sm:block">•</li>
            <li>GCC Focused ABM</li>
          </ul>

          {/* --- Button Wrapper --- */}
          <div className="flex items-center justify-center gap-4 mb-3 md:mb-4">
            <Button
              asChild // Use asChild to render the anchor tag
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-5 md:px-8 md:py-6 rounded-full font-extrabold text-base md:text-xl"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Demo
              </a>
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground px-4">
            Get expert advice to supercharge your GCC strategy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-20">
          <div className="px-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              What is GCC Intelligence?
            </h2>
            <p className="text-justify leading-relaxed mb-4 text-sm md:text-base">
              GCC Intelligence refers to the structured, data-driven
              understanding of Global Capability Centers (GCCs), also known as
              Global In-house Centers (GICs). These are offshore operations of
              multinational companies and handle a wide range of strategic,
              operational, and innovation-driven functions.
            </p>
            <p className="text-justify leading-relaxed text-sm md:text-base">
              India has become a key destination for these centers, thanks to
              its talent density, mature ecosystems, and infrastructure. The
              role of GCCs has expanded well beyond cost efficiency to driving
              innovation, agility, and business continuity.
            </p>
          </div>
          <div className="flex justify-center px-2">
            <img
              src={gccIllustration}
              alt="GCC Intelligence Platform - Global Capability Centers Data Analytics and Market Intelligence Illustration"
              className="w-full max-w-sm md:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
