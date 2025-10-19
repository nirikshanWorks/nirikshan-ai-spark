import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CaseStudyCard } from "@/components/CaseStudyCard";

const caseStudies = [
  {
    title: "AI-Powered Quality Control System",
    description: "Implemented computer vision-based defect detection system that reduced quality control costs by 60% and improved product consistency for a leading automotive parts manufacturer.",
    category: "Manufacturing - Computer Vision",
    image: "https://www.solulab.com/wp-content/uploads/2023/12/Visual-Quality-Control-1024x684.jpg",
    metrics: [
      { label: "Defect Reduction", value: "85%" },
      { label: "Annual Savings", value: "$2.1M" },
      { label: "Inspection Speed", value: "3x" },
      { label: "ROI Timeline", value: "8 months" },
    ],
  },
  {
    title: "Healthcare Data Integration Platform",
    description: "Built HIPAA-compliant data management system connecting 50+ medical facilities, enabling real-time patient data access and improving care coordination across the network.",
    category: "Healthcare - Data Management",
    image: "https://learn.g2.com/hubfs/iStock-1127069581.jpg",
    metrics: [
      { label: "Facilities Connected", value: "50+" },
      { label: "Records Processed", value: "10M+" },
      { label: "Access Time Reduction", value: "78%" },
      { label: "Care Coordination Improvement", value: "45%" },
    ],
  },
  {
    title: "Retail Analytics & Personalization Engine",
    description: "Developed ML-powered analytics platform with real-time personalization capabilities, increasing conversion rates and customer lifetime value for major e-commerce retailer.",
    category: "Retail - AI & ML",
    image: "https://eagleeye.com/hubfs/images/featured/predictive-ai-and-retail-feature.jpg",
    metrics: [
      { label: "Conversion Increase", value: "32%" },
      { label: "Revenue Growth", value: "45%" },
      { label: "Customer LTV", value: "+28%" },
      { label: "Cart Abandonment", value: "-40%" },
    ],
  },
  {
    title: "Financial Fraud Detection System",
    description: "Created real-time fraud detection system using deep learning that processes millions of transactions daily, reducing fraud losses by 73% while minimizing false positives.",
    category: "Finance - AI & ML",
    image: "https://financialcrimeacademy.org/wp-content/uploads/2022/05/2-43-1024x576.jpg",
    metrics: [
      { label: "Fraud Reduction", value: "73%" },
      { label: "False Positives", value: "-62%" },
      { label: "Processing Speed", value: "<50ms" },
      { label: "Annual Savings", value: "$4.5M" },
    ],
  },
  {
    title: "Smart Warehouse Management System",
    description: "Implemented computer vision and IoT-based warehouse automation solution that optimized inventory management and reduced operational costs for logistics company.",
    category: "Logistics - Computer Vision",
    image: "https://www.lightguidesys.com/wp-content/uploads/2024/06/smart-warehouse-technology.png",
    metrics: [
      { label: "Inventory Accuracy", value: "99.7%" },
      { label: "Labor Cost Reduction", value: "35%" },
      { label: "Order Fulfillment", value: "2x faster" },
      { label: "Space Utilization", value: "+42%" },
    ],
  },
  {
    title: "Customer Service AI Assistant",
    description: "Built intelligent chatbot with natural language processing for telecommunications company, handling 70% of customer queries automatically and improving satisfaction scores.",
    category: "Telecom - AI & ML",
    image: "https://blog-assets.freshworks.com/freshdesk/wp-content/uploads/2020/05/07153328/BLog-cover-AI-CS.png",
    metrics: [
      { label: "Queries Automated", value: "70%" },
      { label: "Response Time", value: "-85%" },
      { label: "Customer Satisfaction", value: "+38%" },
      { label: "Support Cost Reduction", value: "52%" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-900">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <video
              src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826234/3_lvxy1u.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-slate-900/80" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-8 h-20 w-20 border border-white/15 rounded-2xl rotate-12" />
            <div className="absolute bottom-10 right-12 h-24 w-24 rounded-full border border-white/10" />
            <div className="absolute top-1/2 left-1/3 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-8">
              <div className="max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-5">
                  Proven Outcomes
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight md:leading-tight">
                  Success Stories Fueled by Intelligent Partnerships
                </h1>
                <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                  Real-world transformations delivered through AI, automation, and tailored engineering. Explore how teams like yours are achieving measurable impact.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
                {[
                  { label: "Industries Served", value: "6+" },
                  { label: "Average ROI", value: "3.2x" },
                  { label: "Client NPS", value: "92" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-white backdrop-blur-md"
                  >
                    <p className="text-sm text-white/70 mb-1">{item.label}</p>
                    <p className="text-2xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our solutions can drive measurable results for your business
            </p>
            <a href="/contact">
              <button className="gradient-primary px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all">
                Start Your Project
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
