import SwitchToggleThemeDemo from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { expertiseCategories } from "@/pages/expertise/expertiseData";

const navigationCategories = expertiseCategories.map((category) => ({
  title: category.title,
  slug: category.slug,
  items: category.services.map((service) => ({
    title: service.title,
    description: service.description,
    href: `/expertise/${category.slug}/${service.slug}`,
  })),
}));

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "AICI", path: "/campaign-intelligence" },
  { label: "Blog", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "Who We Are", path: "/who-we-are" },
];

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [desktopMenuValue, setDesktopMenuValue] = useState<string | undefined>(undefined);
  const [scrolled, setScrolled] = useState(false);
  const desktopMenuOpen = Boolean(desktopMenuValue);
  const navRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setMobileExpertiseOpen(false);
      return next;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpertiseOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || desktopMenuOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [mobileMenuOpen, desktopMenuOpen]);

  useLayoutEffect(() => {
    const update = () => {
      const h = navRef.current?.getBoundingClientRect().height ?? 0;
      setHeaderHeight(h);
    };
    update();
    window.addEventListener("resize", update);
    let observer: MutationObserver | null = null;
    if (navRef.current && "MutationObserver" in window) {
      observer = new MutationObserver(update);
      observer.observe(navRef.current, { childList: true, subtree: true, attributes: true });
    }
    return () => {
      window.removeEventListener("resize", update);
      if (observer) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setDesktopMenuValue(undefined);
  }, [location.pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-background/60 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex h-16 w-full items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <img
                src="/nirikshan-ai-logo.png"
                alt="Nirikshan AI Pvt. Ltd."
                className="h-10 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="text-lg font-bold font-heading text-foreground">
                Nirikshan <span className="text-gradient">AI</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Expertise Dropdown */}
              <NavigationMenu value={desktopMenuValue} onValueChange={setDesktopMenuValue}>
                <NavigationMenuList>
                  <NavigationMenuItem value="expertise">
                    <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground h-9 px-3">
                      Expertise
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="animate-in slide-in-from-top-4 fade-in duration-300">
                      <div className="w-[320px] md:w-[500px] p-4">
                        <div className="mb-3 px-3 flex items-center justify-between">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {navigationCategories[0]?.title}
                          </h4>
                          <Link to={`/expertise/${navigationCategories[0]?.slug}`} className="text-xs text-primary hover:underline">
                            View All
                          </Link>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {navigationCategories[0]?.items.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none text-foreground">{item.title}</div>
                                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Simple nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/contact" className="ml-2">
                <Button size="sm" className="gradient-primary text-primary-foreground font-medium">
                  Contact
                </Button>
              </Link>

              <SwitchToggleThemeDemo />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <SwitchToggleThemeDemo />
              <button onClick={toggleMobileMenu} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="p-2 relative z-[80]">
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-16 bottom-0 z-[70] overflow-y-auto bg-background backdrop-blur-xl px-5 py-5 lg:hidden border-t border-border animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <Link
              to="/about"
              className="block rounded-lg px-4 py-3 text-base font-bold hover:bg-secondary transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            <button
              className="flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 text-base font-bold hover:bg-secondary transition-colors"
              onClick={() => setMobileExpertiseOpen((prev) => !prev)}
            >
              Expertise
              <span className={`transition-transform duration-200 ${mobileExpertiseOpen ? "rotate-180" : ""}`}>▾</span>
            </button>

            {mobileExpertiseOpen && (
              <div className="pl-4 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-1">
                  {navigationCategories[0]?.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Link
                    to={`/expertise/${navigationCategories[0]?.slug}`}
                    className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary/50 rounded-lg transition-colors mt-2"
                    onClick={closeMobileMenu}
                  >
                    View All {navigationCategories[0]?.title} →
                  </Link>
                </div>
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block rounded-lg px-4 py-3 text-base font-bold hover:bg-secondary transition-colors"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/contact" onClick={closeMobileMenu} className="block pt-3">
              <Button className="w-full gradient-primary text-primary-foreground text-base py-3 h-12">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
};
