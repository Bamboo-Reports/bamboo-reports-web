import gccIllustration from "@/assets/gcc-illustration.png";

const WhatIsGccIntelligence = () => (
  <section className="border-t bg-secondary/30 px-5 py-12 sm:px-4 md:py-20">
    <div className="mx-auto max-w-6xl">
      <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <img
          src={gccIllustration}
          alt="An analyst working with GCC market data, reports, and operational insights"
          width="1024"
          height="714"
          loading="lazy"
          className="order-2 mx-auto h-auto w-[92%] max-w-md sm:w-full sm:max-w-lg lg:order-1 lg:mx-0"
        />

        <div className="order-1 max-w-2xl lg:order-2">
          <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">
            What is GCC intelligence?
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            A quick primer on the market Bamboo Reports tracks every day.
          </p>

          <p className="mt-6 text-pretty text-lg font-medium leading-relaxed text-foreground sm:mt-8 md:text-xl">
            GCC Intelligence is the structured, data-driven understanding of
            Global Capability Centres (GCCs), also known as Global In-house
            Centres (GICs).
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground sm:mt-5">
            These centres are the offshore operations of multinational
            companies, handling a wide range of strategic, operational, and
            innovation-driven functions.
          </p>

          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground sm:mt-5">
            India has become a key destination for these centres, thanks to its
            talent density, mature ecosystems, and infrastructure. The role of
            GCCs has expanded well beyond cost efficiency to driving
            innovation, agility, and business continuity.
          </p>
        </div>

      </div>
    </div>
  </section>
);

export default WhatIsGccIntelligence;
