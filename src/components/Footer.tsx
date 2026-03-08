import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/nirikshan-ai-logo.png" alt="Nirikshan AI" className="h-11 w-auto" />
              <h3 className="text-lg font-bold">
                Nirikshan <span className="text-gradient">AI</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI & Machine Learning solutions that turn complex data into actionable business insight. Specializing in Generative AI, Computer Vision, and Agentic AI.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/nirikshan-ai/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/nirikshan.ai/profilecard/?igsh=MXh4cWl3azdtbGQzaw%3D%3D"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/expertise/artificial-intelligence/generative-ai" className="text-muted-foreground hover:text-foreground transition-colors">Generative AI</Link></li>
              <li><Link to="/expertise/artificial-intelligence/machine-learning" className="text-muted-foreground hover:text-foreground transition-colors">Predictive Analytics</Link></li>
              <li><Link to="/expertise/microsoft-services/dotnet-development" className="text-muted-foreground hover:text-foreground transition-colors">.NET Modernization</Link></li>
              <li><Link to="/expertise/microsoft-services/azure-cloud" className="text-muted-foreground hover:text-foreground transition-colors">Azure Cloud</Link></li>
              <li><Link to="/expertise/quality-assurance/software-testing" className="text-muted-foreground hover:text-foreground transition-colors">Quality Engineering</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/employee/login" className="text-muted-foreground hover:text-foreground transition-colors">Employee Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={14} className="text-primary" />
                <a href="mailto:ai.nirikshan@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@nirikshanai.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={14} className="text-primary" />
                <a href="tel:+919410992204" className="text-muted-foreground hover:text-foreground transition-colors">
                  +91 9410 992204
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© 2026 Nirikshan AI Private Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
