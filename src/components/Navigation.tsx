import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
  items: category.services.map(service => ({
    title: service.title,
    href: `/expertise/${category.slug}/${service.slug}`
  }))
}));

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-background border-b border-border shadow-md transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
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
            <Link to="/about">
              <Button variant="ghost" className={isActive("/about") ? "bg-muted" : ""}>
                About
              </Button>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Expertise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-screen max-w-6xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {navigationCategories.map((category) => (
                          <div key={category.title} className="space-y-3">
                            <h3 className="font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                              {category.title}
                            </h3>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={item.href}
                                      className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
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
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="space-y-1">
              <button className="w-full text-left px-4 py-2 font-medium">
                Expertise
              </button>
              <div className="pl-4 space-y-4">
                {navigationCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <div className="text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                      {category.title}
                    </div>
                    <div className="pl-2 space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="block px-4 py-1 text-sm text-muted-foreground hover:text-primary rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/projects"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/case-studies"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              to="/careers"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              to="/who-we-are"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Who We Are
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full gradient-primary">Get in Touch</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
