import logo from "@/assets/bamboo-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, User, ShoppingBag, LogOut } from "lucide-react";
import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 py-4 md:py-6 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform duration-300 hover:scale-105">
          <img src={logo} alt="Bamboo Reports" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
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
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground">
                        Reports
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/insights">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground">
                        Insights
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/articles">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 focus:bg-accent focus:text-accent-foreground">
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
              <Link to="/gcc-list">Get Free GCC Data</Link>
            </Button>

            {/* User Authentication */}
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'My Account'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/purchases" className="flex items-center cursor-pointer">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>My Purchases</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-bamboo hover:bg-bamboo-dark rounded-full">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )
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
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block transition-transform duration-300 hover:scale-105">
                  <img src={logo} alt="Bamboo Reports" className="h-10" />
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto">
                <div className="px-6 space-y-1">
                  <Link
                    to="/pricing"
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                    <ChevronRight className="h-5 w-5" />
                  </Link>

                  <div className="border-t pt-1">
                    <button
                      onClick={() => setResourcesOpen(!resourcesOpen)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors"
                    >
                      Resources
                      <ChevronRight className={`h-5 w-5 transition-transform ${resourcesOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {resourcesOpen && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to="/reports"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Reports
                        </Link>
                        <Link
                          to="/insights"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Insights
                        </Link>
                        <Link
                          to="/articles"
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                    <Link to="/gcc-list">Get Free GCC Data</Link>
                  </Button>

                  {/* Mobile User Authentication */}
                  {!loading && (
                    user ? (
                      <>
                        <div className="border-t pt-3 mt-3">
                          <p className="text-sm font-medium mb-2 px-2">{user.user_metadata?.full_name || 'My Account'}</p>
                          <p className="text-xs text-muted-foreground mb-3 px-2">{user.email}</p>
                          <div className="space-y-2">
                            <Button
                              asChild
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Link to="/profile">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                              </Link>
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Link to="/purchases">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                My Purchases
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                handleSignOut();
                              }}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Sign Out
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border-t pt-3 mt-3 space-y-2">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-full"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Link to="/signin">Sign In</Link>
                          </Button>
                          <Button
                            asChild
                            className="w-full bg-bamboo hover:bg-bamboo-dark rounded-full"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Link to="/signup">Sign Up</Link>
                          </Button>
                        </div>
                      </>
                    )
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
