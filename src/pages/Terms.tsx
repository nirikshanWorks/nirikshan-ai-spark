import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface Section {
  title: string;
  description: string;
  isHighlighted?: boolean;
}

const sections: Section[] = [
  {
    title: "1. Acceptance of Terms",
    description:
      "By accessing or using the Nirikshan AI Pvt. Ltd. website and services, you agree to comply with these terms of service and all applicable laws."
  },
  {
    title: "2. Services",
    description:
      "We provide consulting, engineering, and managed services related to artificial intelligence, software development, and cloud transformation. Service agreements and statements of work define the full scope, deliverables, and commercial terms for each engagement."
  },
  {
    title: "3. Use of Content",
    description:
      "All trademarks, logos, and content on this website remain the property of Nirikshan AI Pvt. Ltd. or its licensors. You may not reproduce, modify, or distribute any content without prior written consent."
  },
  {
    title: "4. Confidentiality",
    description:
      "Information exchanged during discovery sessions, proposals, or project delivery is treated as confidential. Both parties agree to protect proprietary information and use it only for the intended engagement."
  },
  {
    title: "5. Limitation of Liability",
    description:
      "To the fullest extent permitted by law, Nirikshan AI Pvt. Ltd. shall not be liable for indirect, incidental, or consequential damages arising from the use of our website or services."
  },
  {
    title: "6. Governing Law",
    description:
  "These terms are governed by the laws of India and the jurisdiction of the courts in Noida, Uttar Pradesh. Any disputes will be resolved through good-faith negotiations before legal action is pursued."
  },
  {
    title: "7. Updates",
    description:
      "We may revise these terms periodically. Updates will be posted on this page with a revised effective date, and continued use of our services constitutes acceptance of the updated terms."
  },
  {
    title: "8. Disclaimer",
    isHighlighted: true,
    description:
      "Niraskhan AI Private Limited is the legally registered company under CIN U62091HR2025PTC134110. Please note that our products, services, and digital platforms may use the brand name \"Nirikshan AI\" for marketing, product identity, and public communication purposes. Both names refer to the same business entity, and all activities under the brand \"Nirikshan AI\" are fully owned, managed, and operated by Niraskhan AI Private Limited. For any official clarification or communication, please contact: Anshul — Co-Founder & COO, Phone: +91 94101 47660, Email: kanshulmussoorie@gmail.com"
  }
];

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-16 pb-20">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <header>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Effective date: 24 April 2025. Please read these terms carefully before using our website or engaging our services.
            </p>
          </header>

          {sections.map((section) => (
            <article 
              key={section.title} 
              className={`p-6 md:p-8 rounded-2xl border ${
                section.isHighlighted 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border bg-secondary/20'
              }`}
            >
              <h2 className={`text-2xl font-semibold mb-4 ${section.isHighlighted ? 'text-primary' : ''}`}>
                {section.title}
              </h2>
              <p className={`leading-relaxed ${
                section.isHighlighted ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}>
                {section.description}
              </p>
            </article>
          ))}

          <footer className="text-sm text-muted-foreground">
            <p>
              For questions regarding these terms, please contact us at
              <span className="font-medium"> ai.nirikshan@gmail.com</span> or call <span className="font-medium">+91 9410 992204</span>.
            </p>
          </footer>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Terms;
