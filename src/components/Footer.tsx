import { Instagram, Linkedin, Mail, Phone, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-concrete/40 dark:border-charcoal-border bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-sage selection:text-charcoal">
      {/* Top Technical Telemetry Strip */}
      <div className="border-b border-concrete/20 dark:border-charcoal-border py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono tracking-widest text-concrete-dark dark:text-concrete uppercase">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-sage inline-block" />
            <span>NIRIKSHAN AI PRIVATE LIMITED</span>
            <span>//</span>
            <span>CIN: U72900UR2023PTC015792</span>
          </div>
          <div className="flex items-center gap-4">
            <span>R&amp;D LABS: HARIDWAR &amp; DEHRADUN</span>
            <span>//</span>
            <span className="text-sage">STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-charcoal/30 dark:border-concrete/40 flex items-center justify-center bg-white dark:bg-charcoal-surface">
                <img src="/favicon.png" alt="Nirikshan AI" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-charcoal dark:text-ivory">
                NIRIKSHAN <span className="text-sage dark:text-sage-light">AI</span>
              </span>
            </div>

            <p className="text-xs font-mono text-concrete-dark dark:text-concrete leading-relaxed max-w-sm">
              Advanced AI technology, research and product engineering company. Developing autonomous computer vision, generative intelligence, and agentic workflows for real-world enterprise deployment.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/nirikshan-ai/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-concrete/40 dark:border-charcoal-border flex items-center justify-center text-charcoal dark:text-ivory hover:bg-burntamber hover:text-white hover:border-burntamber transition-colors"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://www.instagram.com/nirikshan.ai/profilecard/?igsh=MXh4cWl3azdtbGQzaw%3D%3D"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-concrete/40 dark:border-charcoal-border flex items-center justify-center text-charcoal dark:text-ivory hover:bg-burntamber hover:text-white hover:border-burntamber transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href="mailto:info@nirikshanai.com"
                aria-label="Email"
                className="w-8 h-8 border border-concrete/40 dark:border-charcoal-border flex items-center justify-center text-charcoal dark:text-ivory hover:bg-burntamber hover:text-white hover:border-burntamber transition-colors"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Solutions (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-concrete-dark dark:text-concrete">
              // SOLUTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/expertise/artificial-intelligence/computer-vision" className="hover:text-sage transition-colors block py-0.5">
                  Computer Vision
                </Link>
              </li>
              <li>
                <Link to="/expertise/artificial-intelligence/generative-ai" className="hover:text-sage transition-colors block py-0.5">
                  Generative AI
                </Link>
              </li>
              <li>
                <Link to="/expertise/artificial-intelligence/ai-agent-development" className="hover:text-sage transition-colors block py-0.5">
                  Agentic AI
                </Link>
              </li>
              <li>
                <Link to="/expertise/artificial-intelligence/ai-consulting" className="hover:text-sage transition-colors block py-0.5">
                  Industrial AI
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-sage transition-colors block py-0.5">
                  All Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products (3 cols) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-concrete-dark dark:text-concrete">
              // PRODUCTS &amp; LABS
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/products/vision-systems" className="hover:text-sage transition-colors block py-0.5">
                  01 Nirikshan Vision Systems
                </Link>
              </li>
              <li>
                <Link to="/products/astro-nirikshan" className="hover:text-burntamber transition-colors block py-0.5">
                  02 Astro Nirikshan (Holistic AI)
                </Link>
              </li>
              <li>
                <Link to="/products/10x-ai-productivity" className="hover:text-sage transition-colors block py-0.5">
                  03 10X AI Productivity Training
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-sage transition-colors block py-0.5">
                  04 All Products &amp; Registry
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-sage transition-colors block py-0.5">
                  05 Research &amp; Deployments
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="hover:text-sage transition-colors block py-0.5">
                  06 Who We Are &amp; Leadership
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sage transition-colors block py-0.5">
                  07 Company Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coordination (3 cols) */}
          <div className="col-span-2 md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-concrete-dark dark:text-concrete">
              // HEADQUARTERS
            </h4>
            <div className="space-y-2 text-xs font-mono text-concrete-dark dark:text-concrete">
              <p>Nirikshan AI Private Limited</p>
              <p>Haridwar &amp; Dehradun R&amp;D Hub, Uttarakhand, India</p>
              <div className="pt-2 space-y-1">
                <a href="mailto:info@nirikshanai.com" className="block text-charcoal dark:text-ivory hover:text-sage">
                  info@nirikshanai.com
                </a>
                <a href="tel:+919410992204" className="block text-charcoal dark:text-ivory hover:text-sage">
                  +91 9410 992204
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/contact">
                <button className="w-full bg-charcoal text-ivory border border-charcoal-border hover:bg-burntamber hover:border-burntamber hover:text-white text-xs font-mono uppercase tracking-wider py-2.5 px-4 font-bold transition-all">
                  Start Technical Conversation →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Technical Grid & Legal */}
        <div className="border-t border-concrete/30 dark:border-charcoal-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-concrete-dark dark:text-concrete">
          <div>
            © 2026 NIRIKSHAN AI PRIVATE LIMITED. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link to="/privacy" className="hover:text-charcoal dark:hover:text-ivory transition-colors">
              PRIVACY POLICY
            </Link>
            <Link to="/terms" className="hover:text-charcoal dark:hover:text-ivory transition-colors">
              TERMS OF SERVICE
            </Link>
            <Link to="/projects/hostel-student-tracking-system/privacy" className="hover:text-charcoal dark:hover:text-ivory transition-colors">
              APP COMPLIANCE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
