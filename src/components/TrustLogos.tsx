import amperaLogo from "@/assets/logos/ampera.png";
import cytivaLogo from "@/assets/logos/cytiva.png";
import hcltechLogo from "@/assets/logos/hcltech.png";
import harmanLogo from "@/assets/logos/harman.png";
import mindTreeLogo from "@/assets/logos/mindtree.png";
import mothersonLogo from "@/assets/logos/motherson.png";
import moveinsyncLogo from "@/assets/logos/moveinsync.png";
import nasscomLogo from "@/assets/logos/nasscom.png";
import pandoLogo from "@/assets/logos/pando.png";
import qyrusLogo from "@/assets/logos/qyrus.png";
import ramcoLogo from "@/assets/logos/ramco.png";
import salesforceLogo from "@/assets/logos/salesforce.png";
import slkLogo from "@/assets/logos/slk.png";
import thoughtworksLogo from "@/assets/logos/thoughtworks.png";
import yethiLogo from "@/assets/logos/yethi.png";
import zohoLogo from "@/assets/logos/zoho.png";
import zycusLogo from "@/assets/logos/zycus.png";

const logos = [
  { src: amperaLogo.src, alt: "Ampera" },
  { src: cytivaLogo.src, alt: "Cytiva" },
  { src: hcltechLogo.src, alt: "HCLTech" },
  { src: harmanLogo.src, alt: "Harman" },
  { src: mindTreeLogo.src, alt: "MindTree" },
  { src: mothersonLogo.src, alt: "Motherson" },
  { src: moveinsyncLogo.src, alt: "MoveInSync" },
  { src: nasscomLogo.src, alt: "Nasscom" },
  { src: pandoLogo.src, alt: "Pando" },
  { src: qyrusLogo.src, alt: "Qyrus" },
  { src: ramcoLogo.src, alt: "Ramco" },
  { src: salesforceLogo.src, alt: "Salesforce" },
  { src: slkLogo.src, alt: "SLK" },
  { src: thoughtworksLogo.src, alt: "Thoughtworks" },
  { src: yethiLogo.src, alt: "Yethi" },
  { src: zohoLogo.src, alt: "Zoho" },
  { src: zycusLogo.src, alt: "Zycus" },
];

type Props = { eyebrow?: string };

const TrustLogos = ({ eyebrow = "Trusted by teams across India's GCC ecosystem" }: Props) => (
  <div className="trust-logos">
    {eyebrow ? (
      <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
        {eyebrow}
      </div>
    ) : null}
    <div className="trust-logos-track-wrap">
      <div className="trust-logos-track">
        {logos.map((logo) => (
          <div key={logo.alt} className="trust-logos-item">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-[4.5rem] object-contain"
              decoding="async"
            />
          </div>
        ))}
        <div className="contents" aria-hidden="true">
          {logos.map((logo) => (
            <div key={`duplicate-${logo.alt}`} className="trust-logos-item">
              <img
                src={logo.src}
                alt=""
                className="h-[4.5rem] object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TrustLogos;
