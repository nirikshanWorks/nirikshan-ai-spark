import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TenXHero } from "@/components/productivity/TenXHero";
import { WorkflowComparison } from "@/components/productivity/WorkflowComparison";
import { AudienceSection } from "@/components/productivity/AudienceSection";
import { LearningDomainsGrid } from "@/components/productivity/LearningDomainsGrid";
import { ProductivityFramework } from "@/components/productivity/ProductivityFramework";
import { IllustrativeTransformation } from "@/components/productivity/IllustrativeTransformation";
import { ProgrammesSection } from "@/components/productivity/ProgrammesSection";
import { EnterpriseTransformation } from "@/components/productivity/EnterpriseTransformation";
import { EcosystemDiagram } from "@/components/productivity/EcosystemDiagram";
import { WhyNirikshanAI } from "@/components/productivity/WhyNirikshanAI";
import { TenXEnquiryForm } from "@/components/productivity/TenXEnquiryForm";

const TenXProductivity: React.FC = () => {
  const [prefilledProgramme, setPrefilledProgramme] = useState<string>("");
  const [prefilledAudience, setPrefilledAudience] = useState<string>("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreProgrammes = () => {
    scrollToSection("programmes");
  };

  const handlePartnerWithUs = () => {
    scrollToSection("contact-inquiry");
  };

  const handleSelectAudience = (audienceId: string) => {
    // Map audience ID to friendly form value
    const audienceMap: Record<string, string> = {
      schools: "Schools",
      universities: "Universities & Colleges",
      professionals: "Working Professionals",
      leadership: "Management & Leadership",
      industries: "Industries & Enterprises",
    };
    setPrefilledAudience(audienceMap[audienceId] || "");
    scrollToSection("programmes");
  };

  const handleInquireFromProgramme = (progName: string, audType: string) => {
    setPrefilledProgramme(progName);
    const audienceMap: Record<string, string> = {
      school: "Schools",
      university: "Universities & Colleges",
      professional: "Working Professionals",
      leadership: "Management & Leadership",
      industry: "Industries & Enterprises",
    };
    setPrefilledAudience(audienceMap[audType] || "");
    scrollToSection("contact-inquiry");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      <SEO
        title="10X AI Productivity Initiative — Building an AI-Ready Tomorrow | Nirikshan AI"
        description="Empowering students, educational institutions, professionals, management, and industries to learn, apply, automate, and scale AI for real-world impact with Nirikshan AI."
        keywords="10X AI Productivity, AI Training, Generative AI Education, AI for Developers, AI Workforce Transformation, Nirikshan AI, AI Automation, Enterprise AI"
        canonicalUrl="https://nirikshanai.com/10x-ai-productivity"
      />

      {/* Main Global Navigation */}
      <Navigation />

      <main className="relative">
        {/* 1. Hero Section */}
        <TenXHero
          onExploreProgrammes={handleExploreProgrammes}
          onPartnerWithUs={handlePartnerWithUs}
        />

        {/* 2. Introduction: The 10X AI Productivity Initiative (AI Is Changing How Work Gets Done) */}
        <WorkflowComparison />

        {/* 3. Who We Work With (5 Audiences) */}
        <AudienceSection onSelectAudience={handleSelectAudience} />

        {/* 4. AI Learning Domains (6 Core Domains) */}
        <LearningDomainsGrid />

        {/* 5. The 10X Productivity Framework (5 Connected Stages Timeline) */}
        <ProductivityFramework />

        {/* 6. Illustrative Productivity Transformation (Page 8 Showcase) */}
        <IllustrativeTransformation />

        {/* 7. Our AI Programmes (5 Programmes Cards & Detail Sheet) */}
        <ProgrammesSection onInquire={handleInquireFromProgramme} />

        {/* 8. AI Solutions & Enterprise Transformation (Beyond Training) */}
        <EnterpriseTransformation />

        {/* 9. The Nirikshan AI Ecosystem (Connected Diagram) */}
        <EcosystemDiagram />

        {/* 10. Why Nirikshan AI (5 Differentiators) */}
        <WhyNirikshanAI />

        {/* 11. Final Conversion Section & Validated Enquiry Form */}
        <TenXEnquiryForm
          prefilledProgramme={prefilledProgramme}
          prefilledAudience={prefilledAudience}
        />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default TenXProductivity;
