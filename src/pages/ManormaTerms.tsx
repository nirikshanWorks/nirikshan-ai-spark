import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

interface TermsBlock {
  heading: string;
  points: string[];
}

const termsBlocks: TermsBlock[] = [
  {
    heading: "1. Eligibility",
    points: [
      "You must be authorized by your institution or dormitory administration to use this app.",
      "You are responsible for maintaining accurate account information.",
    ],
  },
  {
    heading: "2. Account Responsibility",
    points: [
      "You are responsible for safeguarding your login credentials.",
      "You must immediately report unauthorized access or suspicious account activity.",
    ],
  },
  {
    heading: "3. Acceptable Use",
    points: [
      "You must use the app only for lawful and institutional purposes.",
      "You must not misuse the messaging system for harassment, abuse, or spam.",
      "You must not attempt to disrupt, reverse engineer, or compromise system security.",
    ],
  },
  {
    heading: "4. Data Accuracy",
    points: [
      "Dormitory and user information is maintained by authorized staff and users.",
      "You agree not to intentionally provide false or misleading information.",
    ],
  },
  {
    heading: "5. Service Availability",
    points: [
      "The app may be updated, suspended, or modified for maintenance, security, or operational reasons.",
      "We do not guarantee uninterrupted availability at all times.",
    ],
  },
  {
    heading: "6. Limitation of Liability",
    points: [
      "To the extent permitted by law, the maintainers are not liable for indirect, incidental, or consequential damages resulting from app use.",
    ],
  },
  {
    heading: "7. Termination of Access",
    points: [
      "Access may be revoked for violations of these terms, policy breaches, or institutional instructions.",
    ],
  },
  {
    heading: "8. Changes to Terms",
    points: [
      "These terms may be updated periodically. Continued use after updates means you accept the revised terms.",
    ],
  },
];

const ManormaTerms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Manorama KrishiRakshak - Terms & Conditions"
        description="Read the dedicated terms and conditions for the Manorama KrishiRakshak mobile application."
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
              <h1 className="text-4xl md:text-5xl font-bold mb-5">Manorama KrishiRakshak Terms & Conditions</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By using the Manorama KrishiRakshak application and associated backend services, you agree to the
                following terms.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Effective date: 30 March 2026</p>

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
                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <section className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3 text-primary">Related Policies</h2>
              <p className="text-muted-foreground leading-relaxed">
                View the dedicated privacy notice and account deletion policy pages for full data handling details.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/projects/manorma-krishi-rakshak/privacy"
                  className="text-primary font-semibold hover:underline"
                >
                  Read Privacy Notice
                </Link>
                <Link
                  to="/projects/manorma-krishi-rakshak/account-deletion-policy"
                  className="text-primary font-semibold hover:underline"
                >
                  Read Account Deletion Policy
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ManormaTerms;
