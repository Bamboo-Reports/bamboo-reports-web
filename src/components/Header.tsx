import logo from "@/assets/bamboo-logo.svg";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Import the Button component

const Header = () => {
  return (
    <header className="py-6 px-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Bamboo Reports" className="h-12" />
        </Link>

        {/* Wrapper for right-side elements */}
        <div className="flex items-center gap-4">
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
                    <Link to="/gcc-list">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        GCC List
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* --- New CTAs --- */}
          <Button asChild variant="outline">
            <Link to="/gcc-list">GCC Sample</Link>
          </Button>
          <Button asChild>
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
