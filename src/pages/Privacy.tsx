import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    items: [
      "Contact information such as name, email address, organisation, and phone number",
      "Project details that you voluntarily share through forms, consultations, or support channels",
      "Usage data including pages visited, interactions, and technical diagnostics gathered through analytics tools"
    ]
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "To respond to enquiries and provide requested services",
      "To improve our website experience, content relevance, and customer support",
      "To send important updates about our services, policies, or security matters",
      "To comply with legal obligations and enforce our agreements"
    ]
  },
  {
    title: "3. Data Retention & Security",
    items: [
      "We store personal information only for as long as necessary to deliver services or meet legal requirements",
      "Access to data is restricted to authorised team members who are bound by confidentiality",
      "We employ industry-standard safeguards to prevent unauthorised access, disclosure, alteration, or destruction"
    ]
  },
  {
    title: "4. Your Rights",
    items: [
      "Request access to the personal information we hold about you",
      "Ask us to correct, update, or delete your information where applicable",
      "Withdraw consent for marketing communications at any time"
    ]
  },
  {
    title: "5. Contact Us",
    items: [
      "Email: ai.nirikshan@gmail.com",
      "Phone: +91 9410 992204",
      "Address: Nirikshan AI Pvt. Ltd., Noida, Uttar Pradesh, India"
    ]
  },
  {
    title: "6. Disclaimer",
    items: [
      "Niraskhan AI Private Limited is the legally registered company under CIN U62091HR2025PTC134110.",
      "Please note that our products, services, and digital platforms may use the brand name \"Niirikshan AI\" for marketing, product identity, and public communication purposes.",
      "Both names refer to the same business entity, and all activities under the brand \"Niirikshan AI\" are fully owned, managed, and operated by Niraskhan AI Private Limited.",
      "For any official clarification or communication, please contact: Anshul, Co-Founder & COO, Phone: +91 94101 47660, Email: kanshulmussoorie@gmail.com"
    ]
  }
];

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-16 pb-20">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Last updated: 24 April 2025. We respect your privacy and are committed to protecting the
            personal information you share with Nirikshan AI Private Limited.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="p-6 md:p-8 rounded-2xl border border-border bg-secondary/20">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            We may update this policy from time to time. Material updates will be communicated on this page, and we
            encourage you to review it periodically to stay informed about how we protect your information.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Privacy;
