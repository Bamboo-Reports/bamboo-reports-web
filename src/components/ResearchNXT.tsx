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
  { src: slkLogo, alt: "SLK" },
];

const ResearchNXT = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">
          Bamboo Reports is built by Research NXT
        </h2>
        <p className="text-muted-foreground mb-12">
          a market intelligence firm trusted by 50+ global tech companies.
        </p>

        {/* Continuous logo scroll */}
        <div className="logo-marquee" style={{ ["--marquee-duration"]: "22s" }}>
          <div className="logo-track">
            {logos.concat(logos).map((logo, i) => (
              <div className="logo-item" key={i}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchNXT;
