import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CaseStudyCard } from "@/components/CaseStudyCard";

const caseStudies = [
  {
    title: "AI-Powered Quality Control System",
    description: "Implemented computer vision-based defect detection system that reduced quality control costs by 60% and improved product consistency for a leading automotive parts manufacturer.",
    category: "Manufacturing - Computer Vision",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
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
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
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
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
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
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
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
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
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
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
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
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real partnerships. See how we've helped businesses transform 
              with AI and innovative technology solutions.
            </p>
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
