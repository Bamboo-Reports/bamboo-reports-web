import { Button } from "@/components/ui/button";
import gccIllustration from "@/assets/gcc-illustration.png";

const Hero = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-foreground">Actionable Insights On</span>
            <br />
            <span className="text-primary">Global Capability Centers</span>
            <span className="inline-block ml-4 border-b-4 border-dashed border-primary w-64 align-middle"></span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A Platform With the Largest Repository to Help You Navigate the Thriving GCC/GIC Opportunity
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-full mb-4">
            Get a demo →
          </Button>
          <p className="text-sm text-muted-foreground">
            Get expert advice to supercharge your GCC strategy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">What is GCC Intelligence?</h2>
            <p className="text-justify leading-relaxed mb-4">
              GCC Intelligence refers to the structured, data-driven understanding of Global Capability Centers (GCCs), also known as Global In-house Centers (GICs). These are offshore operations of multinational companies and handle a wide range of strategic, operational, and innovation-driven functions.
            </p>
            <p className="text-justify leading-relaxed">
              India has become a key destination for these centers, thanks to its talent density, mature ecosystems, and infrastructure. The role of GCCs has expanded well beyond cost efficiency to driving innovation, agility, and business continuity.
            </p>
          </div>
          <div className="flex justify-center">
            <img src={gccIllustration} alt="GCC Intelligence Illustration" className="w-full max-w-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
