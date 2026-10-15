import amperaLogo from "@/assets/logos/ampera.webp";
import cytivaLogo from "@/assets/logos/cytiva.webp";
import hcltechLogo from "@/assets/logos/hcltech.webp";
import harmanLogo from "@/assets/logos/harman.webp";
import mindTreeLogo from "@/assets/logos/mindtree.webp";
import mothersonLogo from "@/assets/logos/motherson.webp";
import moveinsyncLogo from "@/assets/logos/moveinsync.webp";
import nasscomLogo from "@/assets/logos/nasscom.webp";
import pandoLogo from "@/assets/logos/pando.webp";
import qyrusLogo from "@/assets/logos/qyrus.webp";
import ramcoLogo from "@/assets/logos/ramco.webp";
import salesforceLogo from "@/assets/logos/salesforce.webp";
import slkLogo from "@/assets/logos/slk.webp";
import thoughtworksLogo from "@/assets/logos/thoughtworks.webp";
import yethiLogo from "@/assets/logos/yethi.webp";
import zohoLogo from "@/assets/logos/zoho.webp";
import zycusLogo from "@/assets/logos/zycus.webp";

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

type Props = {
  eyebrow?: string;
  /** The band the strip sits on. The logo files carry white backgrounds and
   *  blend (multiply) into the track, which is animated and therefore its own
   *  layer, so the track takes the band's colour for the blend to read it. */
  surface?: "default" | "subtle";
};

const TrustLogos = ({ eyebrow = "Used by teams across India's GCC market", surface = "default" }: Props) => (
  <div className="trust-logos">
    {eyebrow ? (
      <div className="mb-8 text-center text-sm font-semibold text-ink-muted">
        {eyebrow}
      </div>
    ) : null}
    <div className="trust-logos-track-wrap">
      <div className={`trust-logos-track ${surface === "subtle" ? "bg-surface-subtle" : "bg-background"}`}>
        {logos.map((logo) => (
          <div key={logo.alt} className="trust-logos-item">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-[4.5rem] object-contain mix-blend-multiply"
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
                className="h-[4.5rem] object-contain mix-blend-multiply"
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
