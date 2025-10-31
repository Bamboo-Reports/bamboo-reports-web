import logo from "@/assets/bamboo-logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  return (
    <header className="sticky top-0 z-40 py-6 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logo} alt="Bamboo Reports" className="h-12" />
          </Link>
          
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
        
        {/* Right side - CTAs */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-full font-semibold"
          >
            <Link to="/gcc-list">Get Free GCC Data</Link>
          </Button>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
