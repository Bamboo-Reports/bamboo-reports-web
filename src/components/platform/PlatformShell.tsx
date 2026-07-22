import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformBody, { PlatformHeroShot } from "./PlatformBody";

/**
 * Chrome shared by the platform page: header, the handoff product shot,
 * the whole body below it, and the footer. The caller supplies only the
 * hero as `children`.
 *
 * `overlapShot` controls whether the product shot pulls up into the
 * hero's bottom fade. A hero that ends on a hard edge rather than a fade
 * passes false and lets the shot sit in normal flow instead.
 */
const PlatformShell = ({
  children,
  overlapShot = true,
}: {
  children: React.ReactNode;
  overlapShot?: boolean;
}) => (
  <div className="platform-page min-h-screen bg-background">
    <Header />
    {children}
    <PlatformHeroShot overlap={overlapShot} />
    <PlatformBody />
    <Footer showCta={false} />
  </div>
);

export default PlatformShell;
