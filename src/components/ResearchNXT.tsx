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
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">Bamboo Reports is built by Research NXT</h2>
        <p className="text-muted-foreground mb-12">
          a market intelligence firm trusted by 50+ global tech companies.
        </p>
        
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-16 object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ResearchNXT;
