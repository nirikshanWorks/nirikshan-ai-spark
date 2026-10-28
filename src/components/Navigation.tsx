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
import { Link, useLocation } from "react-router-dom";

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
  { label: "Products", path: "/products" },
  { label: "10X AI Initiative", path: "/10x-ai-productivity" },
  { label: "Projects", path: "/projects" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "Who We Are", path: "/who-we-are" },
];

// Bottom nav height constant — keep in sync with MobileBottomNav.tsx
const BOTTOM_NAV_HEIGHT = 64; // px — roughly 4rem (icon + label + padding)

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [desktopMenuValue, setDesktopMenuValue] = useState<string | undefined>(undefined);
  const [scrolled, setScrolled] = useState(false);
  const desktopMenuOpen = Boolean(desktopMenuValue);
  const navRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(56); // default 14 = 56px
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

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll only when desktop dropdown is open; mobile drawer handles its own scroll
  useEffect(() => {
    if (desktopMenuOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [desktopMenuOpen]);

  useLayoutEffect(() => {
    const update = () => {
      const h = navRef.current?.getBoundingClientRect().height ?? 56;
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
      {/* ── Top nav bar ── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-background/70 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex h-14 sm:h-16 w-full items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0" onClick={closeMobileMenu}>
              <img
                src="/nirikshan-ai-logo.png"
                alt="Nirikshan AI Pvt. Ltd."
                className="h-9 sm:h-10 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-base sm:text-lg font-bold font-heading text-foreground select-none">
                Nirikshan <span className="text-gradient">AI</span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden lg:flex items-center gap-1">
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

            {/* ── Mobile right controls ── */}
            <div className="lg:hidden flex items-center gap-2">
              <SwitchToggleThemeDemo />
              <button
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-secondary/80 transition-colors"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── Mobile navigation drawer ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[45] lg:hidden bg-black/20 backdrop-blur-[2px]"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed left-0 right-0 z-[48] lg:hidden overflow-y-auto overscroll-contain bg-background border-b border-border shadow-xl animate-in fade-in slide-in-from-top-3 duration-200"
            style={{
              top: headerHeight,
              maxHeight: `calc(100dvh - ${headerHeight}px - ${BOTTOM_NAV_HEIGHT}px - env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <div className="px-4 pt-3 pb-5 space-y-2">

              {/* Quick CTA row */}
              <div className="grid grid-cols-2 gap-2 pb-1">
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl py-3 gradient-primary text-white text-sm font-semibold"
                >
                  Get in Touch
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl py-3 bg-secondary text-foreground text-sm font-semibold border border-border"
                >
                  About Us
                </Link>
              </div>

              <div className="border-t border-border/60" />

              {/* Expertise accordion */}
              <button
                className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold hover:bg-secondary transition-colors text-left"
                onClick={() => setMobileExpertiseOpen((prev) => !prev)}
              >
                <span>Expertise</span>
                <span
                  className={`text-muted-foreground transition-transform duration-200 ${
                    mobileExpertiseOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {mobileExpertiseOpen && (
                <div className="space-y-0.5 bg-secondary/40 rounded-xl p-2 mx-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {navigationCategories[0]?.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-background/70 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="border-t border-border/50 mt-1 pt-1">
                    <Link
                      to={`/expertise/${navigationCategories[0]?.slug}`}
                      className="block px-3 py-2.5 text-sm font-semibold text-primary rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      View All {navigationCategories[0]?.title} →
                    </Link>
                  </div>
                </div>
              )}

              {/* Nav links — 2-column grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/50 hover:bg-secondary text-foreground"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </>
      )}

      {/* Spacer so content doesn't hide under the fixed nav */}
      <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
};
