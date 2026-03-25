import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";

interface TermsBlock {
  heading: string;
  body: string;
}

interface PrivacyPoint {
  title: string;
  detail: string;
}

const termsBlocks: TermsBlock[] = [
  {
    heading: "1. Lawful Agricultural Use",
    body: "The app is intended for lawful agricultural and allied activities. Users must not use the platform for fraudulent, abusive, or unlawful purposes.",
  },
  {
    heading: "2. Accurate User Information",
    body: "Users must provide accurate details during onboarding, profile setup, and support requests. Incorrect information may limit access to certain features.",
  },
  {
    heading: "3. Feature Availability",
    body: "The platform provides market updates, advisory content, government scheme information, and AI assistance. Feature availability may vary by region, language, and network conditions.",
  },
  {
    heading: "4. Content Accuracy Disclaimer",
    body: "Mandi prices, weather details, and advisory content are provided for guidance only. Users should verify critical decisions with local authorities or certified experts.",
  },
  {
    heading: "5. Privacy and Permissions",
    body: "Phone number, location, camera, storage, and optional microphone permissions may be requested to enable core features such as OTP login, local insights, crop image upload, and voice help.",
  },
  {
    heading: "6. AI and Community Conduct",
    body: "Users agree not to submit harmful, misleading, or offensive content in AI queries, stories, or feedback sections. Community submissions should follow respectful conduct.",
  },
  {
    heading: "7. Service Changes and Updates",
    body: "The app provider may improve, modify, or discontinue features, policies, and content to maintain service quality and compliance.",
  },
  {
    heading: "8. Liability Limitation",
    body: "To the maximum extent permitted by law, the app provider is not responsible for indirect or consequential losses arising from feature delays, third-party data interruptions, or user-side misuse.",
  },
  {
    heading: "9. Account and OTP Security",
    body: "Users are responsible for maintaining the confidentiality of OTP-based login access on their devices. Any activity performed through a verified account is treated as user-authorized unless reported as unauthorized.",
  },
  {
    heading: "10. Third-Party Data Sources",
    body: "Some market, weather, and public scheme information may be sourced from third-party providers or public datasets. Availability and correctness of such data can vary by source and update cycle.",
  },
  {
    heading: "11. Suspension and Termination",
    body: "The provider may temporarily suspend or permanently restrict access in cases of abuse, policy violations, malicious activity, or legal compliance requirements.",
  },
  {
    heading: "12. Grievance and Policy Updates",
    body: "Users may raise policy concerns through official support channels. Terms and notices may be updated over time, and continued use after updates indicates acceptance of revised terms.",
  },
];

const privacyPoints: PrivacyPoint[] = [
  {
    title: "Data We Collect",
    detail: "Phone number for authentication, language preference, profile details, and support interaction metadata.",
  },
  {
    title: "Location Information",
    detail: "Location may be used to provide local mandi prices, crop advisories, and weather context. Users can manage permissions in device settings.",
  },
  {
    title: "Images and Files",
    detail: "Images uploaded for crop analysis, documents, or profile updates are processed to deliver requested features and improve support quality.",
  },
  {
    title: "Microphone Access",
    detail: "Microphone permission is optional and only used when users choose voice-based assistance features.",
  },
  {
    title: "How Data Is Used",
    detail: "Data is used for authentication, personalization, advisory relevance, troubleshooting, service analytics, and feature improvement.",
  },
  {
    title: "Data Sharing",
    detail: "Personal data is not sold. Data may be shared with service providers strictly for platform operation, security, and support under contractual safeguards.",
  },
  {
    title: "Retention and Protection",
    detail: "Data is retained only as long as needed for service, compliance, or dispute resolution, and protected with reasonable technical and organizational safeguards.",
  },
  {
    title: "User Rights",
    detail: "Users may request profile correction, data access information, or account-related help through official support channels listed in the app.",
  },
];

const ManormaTerms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Manorma Krishi Rakshak - Terms & Conditions"
        description="Read the dedicated terms, conditions, and privacy notice for the Manorma Krishi Rakshak mobile application."
        canonical="https://nirikshanai.com/projects/manorma-krishi-rakshak/terms"
      />
      <Navigation />

      <main className="pt-16 pb-20">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                Dedicated Project Policy
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-5">Manorma Krishi Rakshak Terms & Conditions</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These terms apply specifically to the Manorma Krishi Rakshak mobile application and govern user access,
                responsibilities, and platform usage.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Effective date: 25 March 2026</p>

              <div className="mt-6 rounded-xl border border-border bg-secondary/30 p-4 md:p-5">
                <p className="text-sm md:text-base font-semibold text-foreground mb-3">
                  Available on Play Store and App Store soon.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src="https://img.shields.io/badge/Google%20Play-Coming%20Soon-34A853?style=for-the-badge&logo=google-play&logoColor=white"
                    alt="Coming soon on Google Play"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                  <img
                    src="https://img.shields.io/badge/App%20Store-Coming%20Soon-0D96F6?style=for-the-badge&logo=app-store-ios&logoColor=white"
                    alt="Coming soon on App Store"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </header>

            <div className="space-y-5">
              {termsBlocks.map((item) => (
                <article key={item.heading} className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-3">{item.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>

            <section className="mt-10 rounded-2xl border border-border bg-secondary/10 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-5">Privacy Notice</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This privacy notice explains how app data is handled to provide core services while protecting user information.
              </p>
              <div className="space-y-4">
                {privacyPoints.map((point) => (
                  <article key={point.title} className="rounded-xl border border-border bg-background p-4 md:p-5">
                    <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{point.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3 text-primary">Contact and Support</h2>
              <p className="text-muted-foreground leading-relaxed">
                For terms clarification, support requests, or policy concerns, users should contact official support channels
                provided inside the application.
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ManormaTerms;
