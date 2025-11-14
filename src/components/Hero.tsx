import { Button } from "@/components/ui/button";
import gccIllustration from "@/assets/gcc-illustration.png";
import { Link } from "react-router-dom"; // Import Link

const Hero = () => {
  return (
    <section className="relative py-8 md:py-16 px-4 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <h1 className="leading-tight mb-4 md:mb-6">
            <span className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold block mb-2 animate-fade-in-down">
              Actionable Insights On
            </span>
            <span className="text-gradient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold block animate-fade-in-up animate-delay-100">
              Global Capability Centers
            </span>
          </h1>
          <p className="text-muted-foreground mb-6 md:mb-8 font-normal text-sm sm:text-base md:text-lg px-2 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            A Platform With the Largest Repository to Help You Navigate the
            Thriving GCC/GIC Opportunity
          </p>

          {/* --- Button Wrapper --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3 md:mb-4 animate-fade-in-up animate-delay-300">
            <Button
              asChild
              className="gradient-accent hover:shadow-glow text-accent-foreground px-6 py-5 md:px-8 md:py-6 rounded-full font-extrabold text-base md:text-xl transition-all duration-300 animate-hover-lift animate-press shadow-elegant w-full sm:w-auto"
            >
              <a
                href="https://meetings-na2.hubspot.com/anam-khoja"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Demo
              </a>
            </Button>

            {/* --- New GCC Data Button --- */}
            <Button
              asChild
              variant="outline"
              className="px-6 py-5 md:px-8 md:py-6 rounded-full font-extrabold text-base md:text-xl border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 animate-hover-scale animate-press w-full sm:w-auto"
            >
              <Link to="/gcc-list">Get Free GCC Data</Link>
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground px-4 animate-fade-in animate-delay-500">
            Get expert advice to supercharge your GCC strategy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-20">
          <div className="px-2 animate-fade-in-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
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
          <div className="flex justify-center px-2 animate-fade-in-right">
            <img
              src={gccIllustration}
              alt="GCC Intelligence Illustration"
              className="w-full max-w-sm md:max-w-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
