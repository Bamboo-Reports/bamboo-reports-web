import logo from "@/assets/bamboo-logo.svg";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useInquiryForm } from "@/contexts/InquiryFormContext";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GCC_TRACKER_ENABLED } from "@/lib/featureFlags";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openInquiryForm } = useInquiryForm();

  return (
    <>
    <div className="sticky top-0 z-40">
    <AnnouncementBar />
    <header className="border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="inline-flex min-h-11 items-center">
          <img src={logo} alt="Bamboo Reports" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 xl:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {GCC_TRACKER_ENABLED && (
                <NavigationMenuItem>
                  <Link to="/gcc">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      GCC Tracker
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <NavigationMenuTrigger>What we offer</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/account-market-intelligence"
                          className="block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
                        >
                          Account and Market Intelligence
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/gcc-abm"
                          className="block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
                        >
                          GCC ABM
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/gcc-prospect-data"
                          className="block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
                        >
                          GCC Prospect Data
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/platform"
                          className="block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
                        >
                          Platform
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/success-stories">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Success stories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/resources">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Resources
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button
                    type="button"
                    className={navigationMenuTriggerStyle()}
                    onClick={() => openInquiryForm()}
                  >
                    Pricing
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Open navigation menu">
              <Menu className="h-6 w-6" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <div className="flex flex-col h-full">
              {/* Logo at top */}
              <div className="p-6 pb-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block">
                  <img src={logo} alt="Bamboo Reports" className="h-10" />
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto">
                <div className="px-6 space-y-1">
                  {GCC_TRACKER_ENABLED && (
                    <Link
                      to="/gcc"
                      className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth border-b pb-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      GCC Tracker
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  )}

                  <details className="group border-b pb-2">
                    <summary className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth cursor-pointer list-none">
                      What we offer
                      <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="pl-4 space-y-1">
                      <Link
                        to="/account-market-intelligence"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Account and Market Intelligence
                      </Link>
                      <Link
                        to="/gcc-abm"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        GCC ABM
                      </Link>
                      <Link
                        to="/gcc-prospect-data"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        GCC Prospect Data
                      </Link>
                      <Link
                        to="/platform"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Platform
                      </Link>
                    </div>
                  </details>

                  <Link
                    to="/success-stories"
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth border-b pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Success stories
                    <ChevronRight className="h-5 w-5" />
                  </Link>

                  <Link
                    to="/resources"
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth border-b pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                    <ChevronRight className="h-5 w-5" />
                  </Link>

                  <Link
                    to="/about"
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth border-b pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About us
                    <ChevronRight className="h-5 w-5" />
                  </Link>

                  <button
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openInquiryForm();
                    }}
                  >
                    Pricing
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Separator */}
                <div className="my-6 border-t" />

                {/* CTAs */}
                <div className="px-6 space-y-3 pb-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <GoogleCalendarSchedulingButton>
                      Get a demo
                    </GoogleCalendarSchedulingButton>
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet >
      </div >
    </header >
    </div>
    </>
  );
};

export default Header;
