import { Instagram, Linkedin, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Mobile-first: stack then grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

          {/* Company Info — full width on mobile */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/nirikshan-ai-logo.png" alt="Nirikshan AI" className="h-10 sm:h-11 w-auto" />
              <h3 className="text-base sm:text-lg font-bold">
                Nirikshan <span className="text-gradient">AI</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              AI &amp; Machine Learning solutions that turn complex data into actionable business insight.
              Specializing in Generative AI, Computer Vision, and Agentic AI.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/nirikshan-ai/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://www.instagram.com/nirikshan.ai/profilecard/?igsh=MXh4cWl3azdtbGQzaw%3D%3D"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-3 sm:mb-4 text-muted-foreground">Services</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm">
              <li><Link to="/expertise/artificial-intelligence/generative-ai" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Generative AI</Link></li>
              <li><Link to="/expertise/artificial-intelligence/computer-vision" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">OpenCV &amp; Computer Vision</Link></li>
              <li><Link to="/expertise/artificial-intelligence/machine-learning" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Machine Learning</Link></li>
              <li><Link to="/expertise/artificial-intelligence/ai-consulting" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">AI Consulting</Link></li>
              <li><Link to="/expertise/artificial-intelligence/ai-agent-development" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">AI Agent Development</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-3 sm:mb-4 text-muted-foreground">Company</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">About Us</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Products</Link></li>
              <li><Link to="/10x-ai-productivity" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">10X AI Initiative</Link></li>
              <li><Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Projects</Link></li>
              <li><Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Case Studies</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-3 sm:mb-4 text-muted-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@nirikshanai.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={13} className="text-primary" />
                  </span>
                  <span className="text-xs sm:text-sm">info@nirikshanai.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919410992204"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={13} className="text-primary" />
                  </span>
                  <span className="text-xs sm:text-sm">+91 9410 992204</span>
                </a>
              </li>
            </ul>

            {/* Mobile CTA */}
            <div className="mt-4 sm:mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold w-full sm:w-auto justify-center sm:justify-start"
              >
                Get in Touch
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© 2026 Nirikshan AI Private Limited. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
