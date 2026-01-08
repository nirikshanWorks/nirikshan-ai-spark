import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Nirikshan AI Pvt. Ltd.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Nirikshan AI, we specialize in <span className="font-semibold text-foreground">OpenCV, Generative AI, and Agentic AI</span> — crafting intelligent systems that combine vision, reasoning, and autonomy. With expertise across Microsoft, SAP, and Cloud ecosystems, we deliver full-stack intelligent transformation for enterprises worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/nirikshan-ai/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Nirikshan AI on LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/nirikshan.ai/profilecard/?igsh=MXh4cWl3azdtbGQzaw%3D%3D"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Nirikshan AI on Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/expertise/artificial-intelligence/generative-ai" className="text-muted-foreground hover:text-primary transition-colors">
                  Generative AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/expertise/artificial-intelligence/machine-learning" className="text-muted-foreground hover:text-primary transition-colors">
                  Predictive Analytics
                </Link>
              </li>
              <li>
                <Link to="/expertise/microsoft-services/dotnet-development" className="text-muted-foreground hover:text-primary transition-colors">
                  .NET Modernization
                </Link>
              </li>
              <li>
                <Link to="/expertise/microsoft-services/azure-cloud" className="text-muted-foreground hover:text-primary transition-colors">
                  Azure Cloud Transformation
                </Link>
              </li>
              <li>
                <Link to="/expertise/quality-assurance/software-testing" className="text-muted-foreground hover:text-primary transition-colors">
                  Quality Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:ai.nirikshan@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  ai.nirikshan@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+919410992204" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 9410 992204
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 Nirikshan AI Private Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
