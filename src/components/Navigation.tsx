import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const expertiseItems = [
  { title: "AI & ML Solutions", href: "/expertise/ai-ml" },
  { title: "Computer Vision", href: "/expertise/computer-vision" },
  { title: "Custom Software Development", href: "/expertise/software-dev" },
  { title: "Web Development", href: "/expertise/web-dev" },
  { title: "UI/UX Design", href: "/expertise/ui-ux" },
  { title: "Data Management", href: "/expertise/data-management" },
  { title: "CRM Software", href: "/expertise/crm" },
];

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/Nirikshan_AI_Logo_new-removebg-preview.png"
              alt="Nirikshan AI Pvt. Ltd."
              className="h-10 w-auto"
            />
            <div className="text-xl font-bold text-gradient">Nirikshan AI Pvt. Ltd.</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Expertise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {expertiseItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/case-studies">
              <Button variant="ghost" className={isActive("/case-studies") ? "bg-muted" : ""}>
                Case Studies
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className={isActive("/about") ? "bg-muted" : ""}>
                About
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="ghost" className={isActive("/careers") ? "bg-muted" : ""}>
                Careers
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
            <div className="space-y-1">
              <button className="w-full text-left px-4 py-2 font-medium">
                Expertise
              </button>
              <div className="pl-4 space-y-1">
                {expertiseItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/case-studies"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/careers"
              className="block px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
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
