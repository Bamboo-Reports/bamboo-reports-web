import logo from "@/assets/bamboo-logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, User, LogOut, Package, Compass, Map, Building2, FileBarChart2, Lightbulb, FileText } from "lucide-react";
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { featureItems } from "@/lib/featuresData";
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
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const navigationMenuRef = useRef<HTMLDivElement | null>(null);
  const [menuOffset, setMenuOffset] = useState(0);
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

  useEffect(() => {
    const menuBounds = navigationMenuRef.current?.getBoundingClientRect();
    if (menuBounds) {
      setMenuOffset(menuBounds.width / 2);
    }
  }, []);

  const handleDesktopTriggerPosition = (event: MouseEvent<HTMLButtonElement>) => {
    const menuBounds = navigationMenuRef.current?.getBoundingClientRect();
    const triggerBounds = event.currentTarget.getBoundingClientRect();

    if (!menuBounds) return;

    const triggerCenter = triggerBounds.left - menuBounds.left + triggerBounds.width / 2;
    setMenuOffset(triggerCenter);
  };

  const menuOffsetStyle = { '--menu-trigger-offset': `${menuOffset}px` } as CSSProperties;
  const products = [
    { label: "Explorer", href: "/products/explorer", icon: Compass },
    { label: "Navigator", href: "/products/navigator", icon: Map },
    { label: "Enterprise", href: "/products/enterprise", icon: Building2 }
  ];

  const resources = [
    { label: "Reports", href: "/reports", icon: FileBarChart2 },
    { label: "Insights", href: "/insights", icon: Lightbulb },
    { label: "Articles", href: "/articles", icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 py-4 md:py-6 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform duration-micro ease-smooth hover:scale-[1.02]">
          <img src={logo} alt="Bamboo Reports" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu ref={navigationMenuRef} style={menuOffsetStyle}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onMouseEnter={handleDesktopTriggerPosition}
                  onFocus={handleDesktopTriggerPosition}
                >
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[260px] p-3 grid gap-2">
                    {featureItems.map((feature) => (
                      <Link key={feature.id} to={feature.href}>
                        <NavigationMenuLink className="flex items-center gap-3 rounded-full border bg-card px-3 py-2 transition-all duration-micro ease-smooth hover:border-primary/40 hover:shadow-sm">
                          <span className="rounded-full bg-primary/10 text-primary p-2">
                            <feature.icon className="h-4 w-4" />
                          </span>
                          <div className="text-sm leading-tight">{feature.title}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onMouseEnter={handleDesktopTriggerPosition}
                  onFocus={handleDesktopTriggerPosition}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[260px] p-3 grid gap-2">
                    {products.map((product) => (
                      <Link key={product.href} to={product.href}>
                        <NavigationMenuLink className="flex items-center gap-3 rounded-full border bg-card px-3 py-2 transition-all duration-micro ease-smooth hover:border-primary/40 hover:shadow-sm">
                          <span className="rounded-full bg-primary/10 text-primary p-2">
                            <product.icon className="h-4 w-4" />
                          </span>
                          <div className="text-sm font-semibold leading-tight">{product.label}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onMouseEnter={handleDesktopTriggerPosition}
                  onFocus={handleDesktopTriggerPosition}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[260px] p-3 grid gap-2">
                    {resources.map((resource) => (
                      <Link key={resource.href} to={resource.href}>
                        <NavigationMenuLink className="flex items-center gap-3 rounded-full border bg-card px-3 py-2 transition-all duration-micro ease-smooth hover:border-primary/40 hover:shadow-sm">
                          <span className="rounded-full bg-primary/10 text-primary p-2">
                            <resource.icon className="h-4 w-4" />
                          </span>
                          <div className="text-sm font-semibold leading-tight">{resource.label}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
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
                      onClick={() => setFeaturesOpen(!featuresOpen)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth"
                    >
                      Features
                      <ChevronRight className={`h-5 w-5 transition-transform duration-micro ease-smooth ${featuresOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {featuresOpen && (
                      <div className="pl-4 space-y-1">
                        {featureItems.map((feature) => (
                          <Link
                            key={feature.id}
                            to={feature.href}
                            className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <feature.icon className="h-4 w-4 text-primary" />
                            {feature.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-1">
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth"
                    >
                      Products
                      <ChevronRight className={`h-5 w-5 transition-transform duration-micro ease-smooth ${productsOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {productsOpen && (
                      <div className="pl-4 space-y-1">
                        {products.map((product) => (
                          <Link
                            key={product.href}
                            to={product.href}
                            className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <product.icon className="h-4 w-4 text-primary" />
                            {product.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

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
                        {resources.map((resource) => (
                          <Link
                            key={resource.href}
                            to={resource.href}
                            className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <resource.icon className="h-4 w-4 text-primary" />
                            {resource.label}
                          </Link>
                        ))}
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
