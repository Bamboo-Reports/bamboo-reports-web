import logo from "@/assets/bamboo-logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, User, LogOut, Package, Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs md:text-sm font-medium">
        <span className="hidden md:inline">Trusted by 50+ enterprise teams worldwide</span>
        <span className="md:hidden">Trusted by 50+ enterprise teams</span>
        <span className="mx-2 opacity-40">|</span>
        <Link to="/gcc-list" className="underline underline-offset-2 hover:opacity-80 transition-opacity inline-flex items-center gap-1">
          Explore 2,400+ GCC centers
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Main navigation */}
      <header className={`sticky top-0 z-40 py-3 md:py-4 px-4 bg-background/98 backdrop-blur-md transition-all duration-200 ${scrolled ? 'shadow-sm border-b border-border/50' : 'border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="transition-opacity duration-micro ease-smooth hover:opacity-80">
            <img src={logo} alt="Bamboo Reports" className="h-9 md:h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                <NavigationMenuItem>
                  <Link to="/pricing">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-sm font-medium text-foreground/80 hover:text-foreground"}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/features">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-sm font-medium text-foreground/80 hover:text-foreground"}>
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/use-cases">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-sm font-medium text-foreground/80 hover:text-foreground"}>
                      Use Cases
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/icp">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-sm font-medium text-foreground/80 hover:text-foreground"}>
                      ICP
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/resources">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-sm font-medium text-foreground/80 hover:text-foreground"}>
                      Resources
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-lg font-medium text-sm h-9 border-border/80"
            >
              <Link to="/gcc-list">Explore Data</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium text-sm h-9 shadow-sm"
            >
              <a
                href="https://calendar.app.google/QNXWripJexzXLHqGA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Demo
              </a>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt={userFullName} />}
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
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
                  <DropdownMenuItem asChild>
                    <Link to="/download-history" className="cursor-pointer">
                      <Download className="mr-2 h-4 w-4" />
                      Download History
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
              <Button asChild variant="ghost" size="sm" className="rounded-lg font-medium text-sm h-9">
                <Link to="/signin">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 pb-4 border-b">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block">
                    <img src={logo} alt="Bamboo Reports" className="h-9" />
                  </Link>
                </div>

                <nav className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4 space-y-1">
                    {[
                      { to: "/pricing", label: "Pricing" },
                      { to: "/features", label: "Features" },
                      { to: "/use-cases", label: "Use Cases" },
                      { to: "/icp", label: "ICP" },
                      { to: "/resources", label: "Resources" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center justify-between py-3.5 text-base font-medium hover:text-accent transition-colors border-b border-border/40 last:border-0"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>

                  <div className="px-6 pt-2 pb-6 space-y-3">
                    <Button
                      asChild
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold h-11"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <a
                        href="https://calendar.app.google/QNXWripJexzXLHqGA"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get a Demo
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-lg font-semibold h-11"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/gcc-list">Explore the Data</Link>
                    </Button>

                    {user ? (
                      <>
                        <div className="border-t pt-4 mt-4 space-y-1">
                          {[
                            { to: "/profile", icon: User, label: "Profile" },
                            { to: "/purchases", icon: Package, label: "My Purchases" },
                            { to: "/download-history", icon: Download, label: "Download History" },
                          ].map((item) => (
                            <Button
                              key={item.to}
                              asChild
                              variant="ghost"
                              className="w-full rounded-lg font-medium justify-start h-10"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Link to={item.to}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                              </Link>
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full rounded-lg font-medium h-10"
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
                      <div className="border-t pt-4">
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full rounded-lg font-medium h-10"
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
    </>
  );
};

export default Header;
