import { useState, useEffect } from "react";

import amperaLogo from "@/assets/logos/Ampera.png";
import cytviaLogo from "@/assets/logos/Cytvia.png";
import hcltechLogo from "@/assets/logos/HCL_Tech.png";
import harmanLogo from "@/assets/logos/Harman.png";
import mindTreeLogo from "@/assets/logos/MindTree.png";
import mothersonLogo from "@/assets/logos/Motherson.png";
import moveinsyncLogo from "@/assets/logos/Move_In_Sync.png";
import nasscomLogo from "@/assets/logos/Nasscom.png";
import pandoLogo from "@/assets/logos/Pando.png";
import qyrusLogo from "@/assets/logos/qyrus.png";
import ramcoLogo from "@/assets/logos/ramco.png";
import salesforceLogo from "@/assets/logos/salesforce.png";
import slkLogo from "@/assets/logos/slk.png";
import thoughtworksLogo from "@/assets/logos/thoughtworks.png";
import yethiLogo from "@/assets/logos/Ythi.png";
import zohoLogo from "@/assets/logos/Zoho.png";
import zycusLogo from "@/assets/logos/Zycus.png";

const logos = [
  { src: amperaLogo, alt: "Ampera" },
  { src: cytviaLogo, alt: "Cytvia" },
  { src: hcltechLogo, alt: "HCLTech" },
  { src: harmanLogo, alt: "Harman" },
  { src: mindTreeLogo, alt: "MindTree" },
  { src: mothersonLogo, alt: "Motherson" },
  { src: moveinsyncLogo, alt: "MoveInSync" },
  { src: nasscomLogo, alt: "Nasscom" },
  { src: pandoLogo, alt: "Pando" },
  { src: qyrusLogo, alt: "Qyrus" },
  { src: ramcoLogo, alt: "Ramco" },
  { src: salesforceLogo, alt: "Salesforce" },
  { src: slkLogo, alt: "SLK" },
  { src: thoughtworksLogo, alt: "Thoughtworks" },
  { src: yethiLogo, alt: "Yethi" },
  { src: zohoLogo, alt: "Zoho" },
  { src: zycusLogo, alt: "Zycus" },
];

const ResearchNXT = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-3">
            Bamboo Reports is built by Research NXT
          </h2>
          <p className="text-muted-foreground mb-12">
            a market intelligence firm trusted by 50+ global tech companies.
          </p>
        </div>

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
    </section>
  );
};

export default ResearchNXT;
