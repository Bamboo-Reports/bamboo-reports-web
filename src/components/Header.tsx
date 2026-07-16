import logo from "@/assets/bamboo-logo.svg";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getDisplayName } from "@/lib/auth";
import { useInquiryForm } from "@/contexts/InquiryFormContext";
import { GoogleCalendarSchedulingButton } from "@/components/GoogleCalendarSchedulingButton";
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
  const { user, signOut } = useAuth();
  const { openInquiryForm } = useInquiryForm();
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

  const userFullName = getDisplayName(user?.user_metadata);
  const avatarUrl = user?.user_metadata?.avatar_url;

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
                <Link to="/platform">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Platform
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>What we offer</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-2">
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

          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 rounded-full font-semibold">
                    <Avatar className="h-8 w-8">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt={userFullName} />}
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(userFullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-40 truncate">{userFullName}</span>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" className="rounded-full font-semibold">
                <Link to="/signin">My account</Link>
              </Button>
            )}
          </div>
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

                  <Link
                    to="/platform"
                    className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth border-b pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Platform
                    <ChevronRight className="h-5 w-5" />
                  </Link>

                  <details className="group border-b pb-2">
                    <summary className="flex items-center justify-between py-3 text-base font-medium hover:text-primary transition-colors duration-micro ease-smooth cursor-pointer list-none">
                      What we offer
                      <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="pl-4 space-y-1">
                      <Link
                        to="/gcc-prospect-data"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        GCC Prospect Data
                      </Link>
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
                  {!user && (
                    <Button
                      asChild
                      className="w-full rounded-full font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/signup?src=header">Sign up for free</Link>
                    </Button>
                  )}
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
                  {user ? (
                    <>
                      <div className="border-t pt-3">
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full font-semibold justify-start"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full font-semibold"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
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
                        <Link to="/signin">Sign in</Link>
                      </Button>
                    </div>
                  )}
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
