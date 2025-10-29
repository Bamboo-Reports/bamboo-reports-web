import ramcoLogo from "@/assets/logos/ramco.png";
import qyrusLogo from "@/assets/logos/qyrus.png";
import salesforceLogo from "@/assets/logos/salesforce.png";
import slkLogo from "@/assets/logos/slk.png";
import thoughtworksLogo from "@/assets/logos/thoughtworks.png";
import vymoLogo from "@/assets/logos/vymo.png";

const logos = [
  { src: ramcoLogo, alt: "Ramco" },
  { src: qyrusLogo, alt: "Qyrus" },
  { src: salesforceLogo, alt: "Salesforce" },
  { src: vymoLogo, alt: "Vymo" },
  { src: thoughtworksLogo, alt: "Thoughtworks" },
  { src: slkLogo, alt: "SLK" }
];

const ResearchNXT = () => {
  // No useState or useEffect needed for a pure CSS animation

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">Bamboo Reports is built by Research NXT</h2>
        <p className="text-muted-foreground mb-12">
          a market intelligence firm trusted by 50+ global tech companies.
        </p>
        
        {/* This outer div is the "viewport" that hides the overflowing content.
          The mask-image provides a soft fade on the left and right edges 
          so logos smoothly appear and disappear.
        */}
        <div 
          className="w-full overflow-hidden"
          style={{ 
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          {/* This inner div contains both sets of logos. 
            'animate-scroll' is our custom animation.
            'whitespace-nowrap' prevents logos from wrapping to the next line.
          */}
          <div className="flex whitespace-nowrap animate-scroll">
            {/* We render the list of logos twice ([...logos, ...logos])
              to create the seamless, infinite looping effect.
            */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`} // Unique key for the duplicated list
                className="flex-shrink-0 mx-4 md:mx-6" // Use margin for spacing
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 object-contain grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchNXT;
