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
    <section className="py-20 px-4 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Built by Research NXT
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Trusted by 50+ Global Technology Companies
          </h2>
          <div className="enterprise-divider" />
        </div>

        {/* Logo carousel with fade edges */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-scroll items-center">
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 object-contain"
                />
              </div>
            ))}
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />
    </section>
  );
};

export default ResearchNXT;
