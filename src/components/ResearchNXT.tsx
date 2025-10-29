import { useState, useEffect } from "react";
import qyrusLogo from "@/assets/logos/qyrus.png";
import ramcoLogo from "@/assets/logos/ramco.png";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push(logos[(currentIndex + i) % logos.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">Bamboo Reports is built by Research NXT</h2>
        <p className="text-muted-foreground mb-12">
          a market intelligence firm trusted by 50+ global tech companies.
        </p>
        
        <div className="overflow-hidden">
          <div className="flex justify-center items-center gap-8 md:gap-12">
            {getVisibleLogos().map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="transition-all duration-1000 ease-in-out transform"
                style={{
                  opacity: index === 0 || index === 4 ? 0.3 : 1,
                  transform: `scale(${index === 0 || index === 4 ? 0.8 : 1})`
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all"
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
