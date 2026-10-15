"use client";

import logo from "@/assets/bamboo-logo.svg";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import NavLink from "@/components/layout/NavLink";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { isNavGroup, primaryNav } from "@/config/nav";
import { useInquiryForm } from "@/contexts/InquiryFormContext";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItemClass =
  "relative inline-flex h-9 items-center rounded-md px-3 text-sm font-semibold transition-colors duration-200";

/** The orange underline that marks the active nav item. */
const ActiveMark = ({ active }: { active: boolean }) => (
  <span
    aria-hidden="true"
    className={cn(
      "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-[1px] bg-accent transition-transform duration-200 ease-out-quart",
      active ? "scale-x-100" : "scale-x-0",
    )}
  />
);

/**
 * Site navbar, ported from researchnxt.com so the two sites share one
 * navigation pattern: label-only dropdowns on desktop, a full-height sheet
 * on mobile, and the campaign strip riding inside the sticky header.
 */
const Header = () => {
  const pathname = usePathname();
  const { openInquiryForm } = useInquiryForm();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  // The sheet starts where the header ends. The announcement bar can wrap,
  // so the header is measured rather than assumed.
  const [sheetTop, setSheetTop] = useState<number>();

  // A route change closes everything. Adjusted during render rather than in
  // an effect so menus never paint open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  // Escape closes whichever surface is open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenGroup(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock the page behind the mobile sheet and trap focus inside it.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const measure = () => setSheetTop(headerRef.current?.offsetHeight);
    measure();
    window.addEventListener("resize", measure);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    sheetRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", measure);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [mobileOpen]);

  // A short close delay keeps the dropdown usable while the pointer crosses
  // the gap between the trigger and the panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const openPricing = () => {
    setMobileOpen(false);
    openInquiryForm();
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-sticky">
      {/* The blur lives on this inner bar, not the header: a backdrop filter
          makes its element the containing block for fixed descendants, which
          would size the mobile sheet against the header. */}
      <div className="border-b border-line bg-background/85 backdrop-blur-md">
        <AnnouncementBar />
        <Container>
          <div className="flex h-16 items-center justify-between gap-6">
            <Link href="/" className="inline-flex min-h-11 flex-none items-center">
              <img src={logo.src} alt="Bamboo Reports" className="h-9 w-auto sm:h-10" />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((entry) => {
                  if (!isNavGroup(entry)) {
                    const active = isActive(entry.href);
                    return (
                      <li key={entry.label}>
                        <Link
                          href={entry.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(navItemClass, active ? "text-ink" : "text-ink-soft hover:text-ink")}
                        >
                          {entry.label}
                          <ActiveMark active={active} />
                        </Link>
                      </li>
                    );
                  }

                  const open = openGroup === entry.label;
                  const groupActive = entry.items.some((item) => !item.external && isActive(item.href));

                  return (
                    <li
                      key={entry.label}
                      className="relative"
                      onMouseEnter={() => {
                        cancelClose();
                        setOpenGroup(entry.label);
                      }}
                      onMouseLeave={scheduleClose}
                      onFocus={() => {
                        cancelClose();
                        setOpenGroup(entry.label);
                      }}
                      onBlur={scheduleClose}
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-haspopup="true"
                        onClick={() => setOpenGroup(open ? null : entry.label)}
                        className={cn(
                          navItemClass,
                          "gap-1.5",
                          open || groupActive ? "text-ink" : "text-ink-soft hover:text-ink",
                        )}
                      >
                        {entry.label}
                        <ActiveMark active={groupActive} />
                        <ChevronDown
                          aria-hidden
                          className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
                        />
                      </button>

                      {/* Dropdowns are label-only so the menu stays quick to scan. */}
                      {open ? (
                        <div className="absolute left-0 top-full z-dropdown w-max min-w-56 pt-2">
                          <ul className="origin-top-left rounded-lg border border-line bg-background p-1.5 shadow-xl shadow-black/10 motion-safe:animate-menu-in">
                            {entry.items.map((item) => (
                              <li key={item.label}>
                                <NavLink
                                  item={item}
                                  withIcon={false}
                                  className="group flex w-full justify-between gap-6 rounded-md px-3 py-2.5 transition-colors duration-200 hover:bg-surface-muted"
                                >
                                  <span className="text-sm font-semibold text-ink">{item.label}</span>
                                  <TrailingArrow className="text-ink-muted group-hover:text-primary" />
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button size="sm" className="hidden px-6 sm:inline-flex" onClick={openPricing}>
                Pricing
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                aria-expanded={mobileOpen}
                aria-controls={mobileOpen ? "mobile-nav" : undefined}
                className="relative inline-flex size-9 items-center justify-center rounded-md text-ink before:absolute before:-inset-1 before:content-[''] xl:hidden"
              >
                <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
                {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile sheet */}
      {mobileOpen ? (
        <div
          ref={sheetRef}
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-28 z-sheet overflow-y-auto border-t border-line bg-background motion-safe:animate-menu-in xl:hidden"
          style={sheetTop !== undefined ? { top: sheetTop } : undefined}
        >
          <Container className="py-8">
            <nav aria-label="Mobile" className="flex flex-col gap-8">
              {primaryNav.map((entry) => {
                if (!isNavGroup(entry)) {
                  return (
                    <Link key={entry.label} href={entry.href} className="-my-2 py-2 text-lg font-semibold text-ink">
                      {entry.label}
                    </Link>
                  );
                }

                return (
                  <div key={entry.label} className="flex flex-col gap-3">
                    <p className="flex items-center gap-2.5 text-sm font-semibold text-ink-muted">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[1px] bg-accent" />
                      {entry.label}
                    </p>
                    <ul className="flex flex-col gap-3 border-l border-line pl-4">
                      {entry.items.map((item) => (
                        <li key={item.label}>
                          <NavLink item={item} className="-my-1.5 flex py-1.5 text-base font-medium text-ink" />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <Button className="w-full" onClick={openPricing}>
                Pricing
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
