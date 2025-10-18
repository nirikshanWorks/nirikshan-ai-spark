import { useState, useEffect } from "react";
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

import { expertiseCategories } from "@/pages/expertise/expertiseData";

const navigationCategories = expertiseCategories.map(category => ({
  title: category.title.toUpperCase(),
  items: category.services.map(service => ({
    title: service.title,
    href: `/expertise/${category.slug}/${service.slug}`
  }))
}));

const expertise = [
  {
    title: "ARTIFICIAL INTELLIGENCE",
    items: navigationCategories[0]?.items || [],
  },
  {
    title: "MICROSOFT SERVICES",
    items: [
      { title: ".NET Development", href: "/expertise/microsoft/dotnet" },
      { title: "MS Dynamics", href: "/expertise/microsoft/dynamics" },
      { title: "Legacy Application Migration to .NET", href: "/expertise/microsoft/migration" },
      { title: "Azure Cloud", href: "/expertise/microsoft/azure" },
    ],
  },
  {
    title: "SAP BTP SOLUTIONS",
    items: [
      { title: "SAP Integration Suite", href: "/expertise/sap/integration" },
      { title: "Application Development Automation", href: "/expertise/sap/automation" },
      { title: "SAP BTP Data and Analytics", href: "/expertise/sap/analytics" },
      { title: "AI on SAP BTP", href: "/expertise/sap/ai" },
    ],
  },
  {
    title: "MANAGED SERVICES",
    items: [
      { title: "Application Managed Services", href: "/expertise/managed-services" },
    ],
  },
  {
    title: "DIGITAL MARKETING",
    items: [
      { title: "Search Engine Optimization (SEO)", href: "/expertise/marketing/seo" },
      { title: "Social Media Marketing", href: "/expertise/marketing/social" },
    ],
  },
  {
    title: "QUALITY ASSURANCE",
    items: [
      { title: "Software Testing", href: "/expertise/qa/software" },
      { title: "Functional Testing", href: "/expertise/qa/functional" },
      { title: "Automation Testing", href: "/expertise/qa/automation" },
    ],
  },
  {
    title: "LEGACY APPLICATION MODERNIZATION",
    items: [
      { title: "Application Re-Engineering", href: "/expertise/modernization/reengineering" },
      { title: "Application Re-Architecture", href: "/expertise/modernization/rearchitecture" },
      { title: "Legacy Cloud Migration", href: "/expertise/modernization/cloud-migration" },
      { title: "UI/UX Modernization", href: "/expertise/modernization/ui-ux" },
      { title: "API Integration", href: "/expertise/modernization/api" },
      { title: "Maintenance Services", href: "/expertise/modernization/maintenance" },
    ],
  },
  {
    title: "WEB DEVELOPMENT",
    items: [
      { title: "Website Design", href: "/expertise/web/design" },
      { title: "Web Application Development", href: "/expertise/web/application" },
      { title: "Website Maintenance and Support", href: "/expertise/web/maintenance" },
      { title: "WordPress Development", href: "/expertise/web/wordpress" },
    ],
  },
  {
    title: "MOBILE APPLICATION DEVELOPMENT",
    items: [
      { title: "Android Application Development", href: "/expertise/mobile/android" },
      { title: "iOS Application Development", href: "/expertise/mobile/ios" },
      { title: "Cross-Platform App Development", href: "/expertise/mobile/cross-platform" },
    ],
  },
  {
    title: "DIGITAL TRANSFORMATION",
    items: [
      { title: "Business Growth with Digital Transformation", href: "/expertise/transformation/business" },
      { title: "Cloud-Enabled Digital Transformation", href: "/expertise/transformation/cloud" },
      { title: "AI-Powered Digital Transformation", href: "/expertise/transformation/ai" },
      { title: "Agile and DevOps Implementation", href: "/expertise/transformation/agile-devops" },
    ],
  },
  {
    title: "AWS SERVICES",
    items: [
      { title: "AWS Cloud Migration", href: "/expertise/aws/migration" },
      { title: "AWS Lambda & Serverless", href: "/expertise/aws/serverless" },
      { title: "AWS EC2 & Infrastructure", href: "/expertise/aws/infrastructure" },
      { title: "AWS DevOps Solutions", href: "/expertise/aws/devops" },
    ],
  },
];

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
