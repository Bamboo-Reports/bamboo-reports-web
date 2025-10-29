import { Button } from "@/components/ui/button";
import gccIllustration from "@/assets/gcc-illustration.png";

const Hero = () => {
  return (
    <section className="py-10 px-4 sm:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Copy block */}
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow */}
          <p className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-muted-foreground/90">
            Actionable Insights On
          </p>

          {/* Mobile-first heading with deliberate breaks */}
          <h1 className="mt-4 font-extrabold tracking-tight leading-[1.1]">
            <span className="block text-4xl sm:text-5xl">
              Global Capability
            </span>
            <span className="block text-4xl sm:text-5xl text-primary">
              Centers
            </span>
          </h1>

          {/* Subhead */}
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A platform with the largest repository to help you navigate the
            thriving GCC/GIC opportunity
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Button className="rounded-full px-7 py-6 text-base sm:text-lg font-extrabold bg-accent hover:bg-accent/90 text-accent-foreground">
              Get a Demo
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Get expert advice to supercharge your GCC strategy
            </p>
          </div>
        </div>

        {/* Illustration — stacked on mobile, side-by-side on md+ */}
        <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              What is GCC Intelligence?
            </h2>
            <p className="leading-relaxed mb-3">
              GCC Intelligence is a structured, data-driven view of Global
              Capability Centers — also known as Global In-house Centers —
              covering strategic, operational, and innovation functions.
            </p>
            <p className="leading-relaxed">
              India’s talent density and mature ecosystem make it a hub.
              Modern GCCs go beyond cost to drive innovation, agility, and
              business continuity.
            </p>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={gccIllustration}
              alt="Illustration explaining GCC Intelligence"
              className="w-full max-w-sm sm:max-w-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
