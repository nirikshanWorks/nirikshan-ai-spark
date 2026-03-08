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
import { Menu, X, Info, FolderKanban, BookOpen, Brain, Briefcase, Users, Lightbulb, Mail } from "lucide-react";
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
  { title: "Expertise", icon: Lightbulb, path: "/expertise" },
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
  const [scrolled, setScrolled] = useState(false);
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
    if (mobileMenuOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [mobileMenuOpen]);

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

  const handleExpandableTabChange = (index: number | null) => {
    if (index === null) return;
    // Filter to only non-separator tabs to find the right path
    const nonSepTabs = expandableNavTabs.filter((t) => !("type" in t && t.type === "separator"));
    // Map the visual index back — count separators before this index
    let nonSepIndex = 0;
    let count = 0;
    for (let i = 0; i < expandableNavTabs.length; i++) {
      const tab = expandableNavTabs[i];
      if ("type" in tab && tab.type === "separator") continue;
      if (count === index) {
        nonSepIndex = count;
        break;
      }
      count++;
    }
    const target = nonSepTabs[nonSepIndex];
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
                src="/Nirikshan_AI_Logo_new-removebg-preview.png"
                alt="Nirikshan AI Pvt. Ltd."
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="text-lg font-bold text-foreground">
                Nirikshan <span className="text-gradient">AI</span>
              </div>
            </Link>

            {/* Desktop Navigation — ExpandableTabs */}
            <div className="hidden lg:flex items-center gap-3">
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
