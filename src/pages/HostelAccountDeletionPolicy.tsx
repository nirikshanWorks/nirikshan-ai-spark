import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const HostelAccountDeletionPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hostel Student Tracking System - Account Deletion Policy"
        description="Learn how users can request account deletion and data removal for the Hostel Student Tracking System application."
        canonical="https://nirikshanai.com/projects/hostel-student-tracking-system/account-deletion-policy"
      />
      <Navigation />

      <main className="pt-16 pb-20">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <header>
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                User Data Rights
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hostel Student Tracking System Account Deletion Policy</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This policy explains how users can request deletion of their account and related personal data from the
                Hostel Student Tracking System app and associated backend services.
              </p>
              <p className="text-sm text-muted-foreground mt-3">Effective date: 30 March 2026</p>
            </header>

            <section className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">1. Deletion Request Methods</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Users can request account deletion through official support channels or authorized administrators. The
                request must include enough details to verify account ownership.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Registered email or phone number linked to the account</li>
                <li>Role and basic profile identifier (student, parent, warden, or chief warden)</li>
                <li>Optional reason for deletion (for service improvement only)</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">2. Verification and Processing Timeline</h2>
              <p className="text-muted-foreground leading-relaxed">
                For security, deletion requests are processed only after identity verification. Verified requests are
                typically processed within 7 to 15 business days, subject to legal and technical requirements.
              </p>
            </section>

            <section className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">3. Data That Will Be Deleted</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                On successful deletion, the following user-linked data is removed or irreversibly anonymized where
                applicable:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Profile details and app preferences</li>
                <li>Messages and operational records linked to personal identifiers where legally permissible</li>
                <li>User-submitted requests and account-linked activity data</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">4. Data That May Be Retained</h2>
              <p className="text-muted-foreground leading-relaxed">
                Certain records may be retained for limited periods when required for legal compliance, fraud prevention,
                dispute resolution, or security audit obligations. Retained records are access-restricted and used only
                for these lawful purposes.
              </p>
            </section>

            <section className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">5. Important Notes Before Deletion</h2>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Deletion is generally irreversible once completed.</li>
                <li>Access to role-based dashboards and related services will be removed.</li>
                <li>Users may register again later using a fresh onboarding flow.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3 text-primary">Support and Related Policies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any account deletion request or status update, contact official in-app support channels.
              </p>
              <Link
                to="/projects/hostel-student-tracking-system/terms"
                className="text-primary font-semibold hover:underline"
              >
                View Terms and Conditions
              </Link>
              <Link
                to="/projects/hostel-student-tracking-system/privacy"
                className="text-primary font-semibold hover:underline block mt-2"
              >
                View Privacy Notice
              </Link>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HostelAccountDeletionPolicy;
