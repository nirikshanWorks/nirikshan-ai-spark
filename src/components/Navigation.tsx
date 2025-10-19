import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { expertiseCategories } from "@/pages/expertise/expertiseData";

const navigationCategories = expertiseCategories.map((category) => ({
  title: category.title.toUpperCase(),
  slug: category.slug,
  items: category.services.map((service) => ({
    title: service.title,
    href: `/expertise/${category.slug}/${service.slug}`,
  })),
}));

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [desktopMenuValue, setDesktopMenuValue] = useState<string | undefined>(undefined);
  const desktopMenuOpen = Boolean(desktopMenuValue);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) {
        setMobileExpertiseOpen(false);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpertiseOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen || desktopMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    document.body.style.overflow = "";
    return undefined;
  }, [mobileMenuOpen, desktopMenuOpen]);

  useEffect(() => {
    setDesktopMenuValue(undefined);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-border/60 shadow-sm transition-all duration-300">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex h-16 w-full items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/Nirikshan_AI_Logo_new-removebg-preview.png"
              alt="Nirikshan AI Pvt. Ltd."
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="text-xl font-bold text-gradient">Nirikshan AI Pvt. Ltd.</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ThemeToggle />
            <Link to="/about">
              <Button variant="ghost" className={isActive("/about") ? "bg-muted" : ""}>
                About
              </Button>
            </Link>
            <NavigationMenu value={desktopMenuValue} onValueChange={setDesktopMenuValue}>
              <NavigationMenuList>
                <NavigationMenuItem value="expertise">
                  <NavigationMenuTrigger className="bg-transparent">
                    Expertise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="md:w-screen md:max-w-none md:px-0 md:max-h-[75vh] md:overflow-y-auto">
                    <div className="w-full px-4 py-6 md:px-10 lg:px-20 space-y-6">
                      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border/60 bg-gradient-to-r from-white via-muted/30 to-white p-6 shadow-sm dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 md:flex-row md:items-center">
                        <div className="space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                            Explore Our Expertise
                          </span>
                          <h3 className="text-2xl font-semibold text-foreground">
                            Tailored solutions across industries and capabilities.
                          </h3>
                          <p className="max-w-2xl text-sm text-muted-foreground">
                            Navigate through our specialised services to discover how we architect products, platforms, and intelligence that accelerate your digital transformation journey.
                          </p>
                        </div>
                        <Link to="/expertise" className="shrink-0">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            View all expertise
                          </Button>
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {navigationCategories.map((category) => (
                          <div
                            key={category.title}
                            className="group space-y-3 rounded-xl border border-border/60 bg-muted/40 p-5 shadow-sm backdrop-blur transition hover:border-primary/60 hover:shadow-md dark:bg-slate-900/70"
                          >
                            <Link
                              to={`/expertise/${category.slug}`}
                              className="flex items-center gap-2 font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 transition-opacity group-hover:opacity-80"
                            >
                              {category.title}
                              <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 via-indigo-500/40 to-transparent" />
                            </Link>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={item.href}
                                      className="block rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
                                    >
                                      {item.title}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/projects">
              <Button variant="ghost" className={isActive("/projects") ? "bg-muted" : ""}>
                Projects
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="ghost" className={isActive("/case-studies") ? "bg-muted" : ""}>
                Case Studies
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="ghost" className={isActive("/careers") ? "bg-muted" : ""}>
                Careers
              </Button>
            </Link>
            <Link to="/who-we-are">
              <Button variant="ghost" className={isActive("/who-we-are") ? "bg-muted" : ""}>
                Who We Are
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="ml-4 gradient-primary">Get in Touch</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-6 py-6 shadow-lg md:hidden dark:bg-slate-900"
          >
            <Link
              to="/about"
              className="block rounded-md px-4 py-2 hover:bg-muted"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <div className="space-y-1">
              <button
                className="flex w-full items-center justify-between gap-2 rounded-md px-4 py-2 font-medium hover:bg-muted"
                onClick={() => setMobileExpertiseOpen((prev) => !prev)}
                aria-expanded={mobileExpertiseOpen}
                aria-controls="mobile-expertise"
              >
                Expertise
              </button>
              {mobileExpertiseOpen && (
                <div id="mobile-expertise" className="pl-4 space-y-4">
                  {navigationCategories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <Link
                        to={`/expertise/${category.slug}`}
                        className="block text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-80 transition-opacity"
                        onClick={closeMobileMenu}
                      >
                        {category.title}
                      </Link>
                      <div className="pl-2 space-y-1">
                        {category.items.map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="block px-4 py-1 text-sm text-muted-foreground hover:text-primary rounded-md"
                            onClick={closeMobileMenu}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/projects"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
            <Link
              to="/case-studies"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={closeMobileMenu}
            >
              Case Studies
            </Link>
            <Link
              to="/careers"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={closeMobileMenu}
            >
              Careers
            </Link>
            <Link
              to="/who-we-are"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={closeMobileMenu}
            >
              Who We Are
            </Link>
            <Link to="/contact" onClick={closeMobileMenu}>
              <Button className="w-full gradient-primary">Get in Touch</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
