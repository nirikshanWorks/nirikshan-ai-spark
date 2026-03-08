import SwitchToggleThemeDemo from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { Button23 } from "@/components/ui/marquee-hover-button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Menu, X, Info, FolderKanban, BookOpen, Brain, Briefcase, Users, Mail } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { expertiseCategories } from "@/pages/expertise/expertiseData";

const navigationCategories = expertiseCategories.map((category) => ({
  title: category.title.toUpperCase(),
  slug: category.slug,
  items: category.services.map((service) => ({
    title: service.title,
    href: `/expertise/${category.slug}/${service.slug}`,
  })),
}));

const expandableNavTabs = [
  { title: "About", icon: Info, path: "/about" },
  { title: "Projects", icon: FolderKanban, path: "/projects" },
  { type: "separator" as const },
  { title: "Case Studies", icon: BookOpen, path: "/case-studies" },
  { title: "AICI", icon: Brain, path: "/campaign-intelligence" },
  { type: "separator" as const },
  { title: "Careers", icon: Briefcase, path: "/careers" },
  { title: "Who We Are", icon: Users, path: "/who-we-are" },
  { title: "Contact", icon: Mail, path: "/contact" },
];

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "AICI", path: "/campaign-intelligence" },
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
  const navigate = useNavigate();

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

  const handleExpandableTabChange = (index: number | null) => {
    if (index === null) return;
    const nonSepTabs = expandableNavTabs.filter((t) => !("type" in t && t.type === "separator"));
    let count = 0;
    for (let i = 0; i < expandableNavTabs.length; i++) {
      const tab = expandableNavTabs[i];
      if ("type" in tab && tab.type === "separator") continue;
      if (count === index) break;
      count++;
    }
    const target = nonSepTabs[count];
    if (target && "path" in target && target.path) {
      navigate(target.path);
    }
  };

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
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="text-lg font-bold text-foreground">
                Nirikshan <span className="text-gradient">AI</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Expertise Mega Menu */}
              <NavigationMenu value={desktopMenuValue} onValueChange={setDesktopMenuValue}>
                <NavigationMenuList>
                  <NavigationMenuItem value="expertise">
                    <NavigationMenuTrigger className="bg-transparent text-sm font-bold text-muted-foreground hover:text-foreground h-9 px-3">
                      Expertise
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="md:w-screen md:max-w-none md:px-0 md:max-h-[75vh] md:overflow-y-auto animate-in slide-in-from-top-4 fade-in duration-300">
                      <div className="w-full px-4 py-6 md:px-10 lg:px-20 space-y-6">
                        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-secondary/50 p-6 md:flex-row md:items-center">
                          <div className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                              Explore Our Expertise
                            </span>
                            <h3 className="text-2xl font-semibold text-foreground">
                              Tailored solutions across industries and capabilities.
                            </h3>
                          </div>
                          <Link to="/expertise" className="shrink-0">
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                              View all expertise
                            </Button>
                          </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                          {navigationCategories.map((category, index) => (
                            <div
                              key={category.title}
                              className="group space-y-3 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <Link
                                to={`/expertise/${category.slug}`}
                                className="flex items-center gap-2 font-bold text-sm tracking-wider text-gradient transition-opacity group-hover:opacity-80"
                              >
                                {category.title}
                                <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
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

              {/* ExpandableTabs for other nav links */}
              <ExpandableTabs
                tabs={expandableNavTabs.map((t): { type: "separator" } | { title: string; icon: typeof Info } => {
                  if ("type" in t && t.type === "separator") return { type: "separator" };
                  return { title: t.title!, icon: t.icon! };
                })}
                onChange={handleExpandableTabChange}
                className="border-border/50 bg-background/60 backdrop-blur-sm shadow-none"
              />

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
              <div className="pl-4 space-y-4 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {navigationCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <Link
                      to={`/expertise/${category.slug}`}
                      className="block text-sm font-bold tracking-wider text-gradient"
                      onClick={closeMobileMenu}
                    >
                      {category.title}
                    </Link>
                    <div className="pl-2 space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="block px-4 py-1.5 text-sm text-muted-foreground hover:text-primary rounded-md transition-colors"
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
