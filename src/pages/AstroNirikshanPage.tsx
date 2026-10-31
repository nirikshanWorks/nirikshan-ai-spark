import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AstroNirikshanShowcase } from "@/components/products/AstroNirikshanShowcase";
import { ChevronRight, Home, Compass } from "lucide-react";
import { ASTRO_NIRIKSHAN_META } from "@/data/astroNirikshanData";

export const AstroNirikshanPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory flex flex-col font-sans">
      <SEO
        title="Astro Nirikshan — Ancient Cosmic Sciences with AI Precision | Nirikshan AI Pvt. Ltd."
        description="Astro Nirikshan brings together classical Vedic Jyotish, Chaldean numerology, Vastu Shastra, Kundli Milan, and interactive Tarot through a modern digital platform by Nirikshan AI Pvt. Ltd."
        canonical="https://nirikshanai.com/products/astro-nirikshan"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: ASTRO_NIRIKSHAN_META.productName,
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
          publisher: {
            "@type": "Organization",
            name: ASTRO_NIRIKSHAN_META.parentCompany,
            url: "https://nirikshanai.com",
          },
        }}
      />

      <Navigation />

      <main className="flex-1 pt-16">
        {/* Technical Breadcrumb Strip */}
        <div className="border-b border-concrete/30 dark:border-charcoal-border bg-techlight dark:bg-charcoal-surface py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs font-mono text-concrete">
              <Link
                to="/"
                className="hover:text-burntamber transition-colors flex items-center gap-1 text-charcoal dark:text-ivory"
              >
                <Home className="w-3.5 h-3.5" />
                <span>ROOT</span>
              </Link>
              <span>/</span>
              <Link
                to="/products"
                className="hover:text-burntamber transition-colors text-charcoal dark:text-ivory"
              >
                PRODUCTS
              </Link>
              <span>/</span>
              <span className="text-burntamber font-bold flex items-center gap-1">
                <Compass className="w-3 h-3" />
                ASTRO_NIRIKSHAN
              </span>
            </nav>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-concrete">
              <span>ALGORITHM: 100% LOCAL BROWSER</span>
              <span>//</span>
              <span className="text-sage font-bold">CLIENT PRIVACY VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Full Featured Showcase */}
        <AstroNirikshanShowcase />
      </main>

      <Footer />
    </div>
  );
};

export default AstroNirikshanPage;
