import logo from "@/assets/bamboo-logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-40 py-6 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Bamboo Reports" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    <Link to="/reports">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Reports
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/insights">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Insights
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/articles">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Articles
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Desktop CTAs - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold"
          >
            <a
              href="https://meetings-na2.hubspot.com/anam-khoja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a Demo
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full font-semibold"
          >
            <Link to="/gcc-list">Get Free GCC Data</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-background z-50 overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
              <Link
                to="/pricing"
                className="text-lg font-medium py-3 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              
              <div className="border-b pb-3">
                <div className="text-lg font-medium mb-3">Resources</div>
                <div className="flex flex-col space-y-3 pl-4">
                  <Link
                    to="/reports"
                    className="text-base text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reports
                  </Link>
                  <Link
                    to="/insights"
                    className="text-base text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Insights
                  </Link>
                  <Link
                    to="/articles"
                    className="text-base text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Articles
                  </Link>
                </div>
              </div>
            </nav>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold w-full py-6"
              >
                <a
                  href="https://meetings-na2.hubspot.com/anam-khoja"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a Demo
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full font-semibold w-full py-6"
              >
                <Link to="/gcc-list" onClick={() => setMobileMenuOpen(false)}>
                  Get Free GCC Data
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
