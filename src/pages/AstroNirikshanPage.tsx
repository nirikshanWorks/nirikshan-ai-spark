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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
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

      <main className="flex-1">
        {/* Breadcrumb strip */}
        <div className="border-b border-slate-800 bg-slate-900/60 pt-20 sm:pt-24 pb-4">
          <div className="container mx-auto px-6">
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link
                to="/"
                className="hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <Link
                to="/products"
                className="hover:text-amber-300 transition-colors"
              >
                Products
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <Compass className="w-3 h-3" />
                Astro Nirikshan
              </span>
            </nav>
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

