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

type Props = { eyebrow?: string };

const TrustLogos = ({ eyebrow = "Trusted by teams across India's GCC ecosystem" }: Props) => (
  <div className="trust-logos">
    {eyebrow ? (
      <div className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">
        {eyebrow}
      </div>
    ) : null}
    <div className="trust-logos-track-wrap">
      <div className="trust-logos-track">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="trust-logos-item">
            <img src={logo.src} alt={logo.alt} className="h-9 md:h-11 object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustLogos;
