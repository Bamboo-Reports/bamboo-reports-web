"use client";

import { RiLinkedinBoxLine, RiMailLine } from "@remixicon/react";
import logo from "@/assets/bamboo-logo.svg";
import NavLink from "@/components/layout/NavLink";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LINKEDIN_URL, SITE_EMAIL, footerNav, legalNav } from "@/config/nav";
import { useInquiryForm } from "@/contexts/InquiryFormContext";

/** Site footer, laid out to match researchnxt.com. */
const Footer = ({ showCta = true }: { showCta?: boolean }) => {
  const { openInquiryForm } = useInquiryForm();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-subtle">
      <Container>
        {showCta ? (
          <div className="flex flex-col gap-8 border-b border-line py-14 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Book a demo"
              title="See what the data shows for your market."
              lede="We will walk you through verified GCC data, benchmarks and weekly updates for the sectors and cities your strategy, location or talent team covers."
              size="title"
              className="max-w-2xl"
            />
            <div className="flex flex-none flex-col gap-3 sm:flex-row">
              <Button asChild className="group">
                <CalSchedulingButton>
                  Get a demo
                  <TrailingArrow />
                </CalSchedulingButton>
              </Button>
              <Button variant="outline" onClick={openInquiryForm}>
                Pricing
              </Button>
            </div>
          </div>
        ) : null}

        <div className="grid gap-14 py-16 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
          {/* Identity and contact */}
          <div className="flex flex-col gap-6">
            <img src={logo.src} alt="Bamboo Reports" width={logo.width} height={logo.height} className="h-10 w-auto self-start" />
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Centre-level data and research on Global Capability Centres in India.
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="self-start text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
            >
              {SITE_EMAIL}
            </a>
            <ul className="flex items-center gap-x-5">
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in a new tab)"
                  className="-m-2.5 block p-2.5 text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  <RiLinkedinBoxLine className="size-5" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  aria-label={`Email ${SITE_EMAIL}`}
                  className="-m-2.5 block p-2.5 text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  <RiMailLine className="size-5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.label} className="flex flex-col gap-5">
                {/* Not a heading: extra h2s after the main content would
                    pollute the outline of every page. */}
                <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
                  {group.label}
                </p>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <NavLink
                        item={item}
                        className="text-sm text-ink-soft transition-colors duration-200 hover:text-primary"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          {/* The year is baked in at build time; the browser may disagree
              after New Year until the next deploy. */}
          <p suppressHydrationWarning>
            © {year} Bamboo Reports, a Research NXT product. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.label}>
                <NavLink item={item} className="transition-colors duration-200 hover:text-ink" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
