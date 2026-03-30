import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

interface PrivacySection {
  title: string;
  points: string[];
}

const privacySections: PrivacySection[] = [
  {
    title: "Information We Collect",
    points: [
      "Account details: name, email, phone number, role, authentication data.",
      "Profile details: student, parent, and warden related profile metadata.",
      "Operational data: requests, messages, room assignments, and activity logs.",
      "Technical data: basic logs for security, diagnostics, and performance monitoring.",
    ],
  },
  {
    title: "How We Use Information",
    points: [
      "To authenticate users and enforce role-based permissions.",
      "To provide messaging, request handling, and dorm management features.",
      "To maintain platform security, reliability, and auditability.",
      "To support administrative and emergency response processes.",
    ],
  },
  {
    title: "Data Sharing",
    points: [
      "Data is shared only with authorized roles and institutional stakeholders based on access permissions.",
      "Data may be disclosed when legally required or to protect safety and system integrity.",
    ],
  },
  {
    title: "Data Retention",
    points: [
      "Data is retained as needed for operational, legal, security, and institutional requirements.",
      "Retention periods may vary by data type and institutional policy.",
    ],
  },
  {
    title: "Data Security",
    points: [
      "Authentication tokens and password hashing are used to protect accounts.",
      "Security controls such as validation, rate limiting, CORS, and secure headers are implemented.",
    ],
  },
  {
    title: "Your Rights",
    points: [
      "You may request updates or corrections to your profile information through authorized administrators.",
      "You may contact the institution or system administrator regarding privacy concerns.",
    ],
  },
  {
    title: "Privacy Notice Updates",
    points: [
      "This notice may be updated over time. Material changes should be communicated through official channels.",
    ],
  },
];

const ManoramaPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Manorama KrishiRakshak - Privacy Notice"
        description="Read the dedicated privacy notice for Manorama KrishiRakshak and how user data is collected, used, and protected."
        canonical="https://nirikshanai.com/projects/manorma-krishi-rakshak/privacy"
      />
      <Navigation />

      <main className="pt-16 pb-20">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <header>
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">Privacy and Data Use</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Manorama KrishiRakshak Privacy Notice</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Manorama KrishiRakshak values user privacy and applies role-based controls to limit access to sensitive
                information.
              </p>
              <p className="text-sm text-muted-foreground mt-3">Effective date: 30 March 2026</p>
            </header>

            <div className="space-y-5">
              {privacySections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3 text-primary">Related Policies</h2>
              <div className="flex flex-col gap-2">
                <Link to="/projects/manorma-krishi-rakshak/terms" className="text-primary font-semibold hover:underline">
                  Read Terms and Conditions
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

export default ManoramaPrivacy;
