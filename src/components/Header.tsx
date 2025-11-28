import logo from "@/assets/bamboo-logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, User, LogOut, Package } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { user, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const userFullName = user?.user_metadata?.full_name || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-40 py-4 md:py-6 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform duration-micro ease-smooth hover:scale-[1.02]">
          <img src={logo} alt="Bamboo Reports" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    <Link to="/products/explorer">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-full p-3 leading-none no-underline outline-none transition-all duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Explorer
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/products/navigator">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-full p-3 leading-none no-underline outline-none transition-all duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Navigator
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/products/custom">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-full p-3 leading-none no-underline outline-none transition-all duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Custom
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

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
                      <NavigationMenuLink className="block select-none space-y-1 rounded-full p-3 leading-none no-underline outline-none transition-all duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Reports
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/insights">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-full p-3 leading-none no-underline outline-none transition-all duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Insights
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/articles">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-full p-3 leading-none no-underline outline-none transition-all duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Articles
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
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
              <Link to="/gcc-list">Explore the Data</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt={userFullName} />}
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(userFullName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userFullName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/purchases" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      My Purchases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <div className="flex flex-col h-full">
              {/* Logo at top */}
              <div className="p-6 pb-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block transition-transform duration-micro ease-smooth hover:scale-[1.02]">
                  <img src={logo} alt="Bamboo Reports" className="h-10" />
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto">
                <div className="px-6 space-y-1">
                  <div className="border-b pb-1">
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth"
                    >
                      Products
                      <ChevronRight className={`h-5 w-5 transition-transform duration-micro ease-smooth ${productsOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {productsOpen && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to="/products/explorer"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Explorer
                        </Link>
                        <Link
                          to="/products/navigator"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Navigator
                        </Link>
                        <Link
                          to="/products/custom"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Custom
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/pricing"
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                    <ChevronRight className="h-5 w-5" />
                  </Link>

                  <div className="border-t pt-1">
                    <button
                      onClick={() => setResourcesOpen(!resourcesOpen)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth"
                    >
                      Resources
                      <ChevronRight className={`h-5 w-5 transition-transform duration-micro ease-smooth ${resourcesOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {resourcesOpen && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to="/reports"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Reports
                        </Link>
                        <Link
                          to="/insights"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Insights
                        </Link>
                        <Link
                          to="/articles"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Articles
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Separator */}
                <div className="my-6 border-t" />

                {/* CTAs */}
                <div className="px-6 space-y-3 pb-6">
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
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
                    className="w-full rounded-full font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/gcc-list">Explore the Data</Link>
                  </Button>

                  {user ? (
                    <>
                      <div className="border-t pt-3">
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full rounded-full font-semibold justify-start"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full rounded-full font-semibold justify-start"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link to="/purchases">
                            <Package className="mr-2 h-4 w-4" />
                            My Purchases
                          </Link>
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full rounded-full font-semibold"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="border-t pt-3">
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full rounded-full font-semibold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to="/signin">Sign In</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
