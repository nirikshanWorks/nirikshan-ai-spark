import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Eye, 
  Code, 
  Globe, 
  Palette, 
  Database, 
  Users,
  ArrowRight,
  Check,
  Zap,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroAI from "@/assets/hero-ai.jpg";

const servicesData = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    shortDesc: "Custom machine learning models and intelligent automation",
    fullDesc: "Our AI and Machine Learning solutions transform your business through intelligent automation, predictive analytics, and data-driven decision making. We develop custom ML models that learn from your data to solve complex business problems.",
    features: [
      "Custom machine learning models",
      "Predictive analytics and forecasting",
      "Natural language processing (NLP)",
      "Intelligent automation systems",
      "Recommendation engines",
      "Anomaly detection systems"
    ],
    benefits: [
      "Automate complex processes",
      "Gain actionable insights from data",
      "Reduce operational costs",
      "Improve decision-making accuracy",
      "Scale operations efficiently"
    ],
    useCases: [
      "Customer behavior prediction",
      "Fraud detection systems",
      "Demand forecasting",
      "Quality assurance automation"
    ]
  },
  {
    icon: Eye,
    title: "Computer Vision",
    shortDesc: "Advanced image recognition and visual intelligence",
    fullDesc: "Harness the power of computer vision to automate visual inspection, detection, and analysis tasks. Our deep learning models can recognize patterns, objects, and anomalies in images and video streams with high accuracy.",
    features: [
      "Image recognition and classification",
      "Object detection and tracking",
      "Facial recognition systems",
      "Quality control automation",
      "Visual inspection solutions",
      "Document analysis and OCR"
    ],
    benefits: [
      "Improve quality consistency",
      "Reduce manual inspections",
      "Enhance security systems",
      "Faster processing times",
      "Higher accuracy rates"
    ],
    useCases: [
      "Manufacturing quality control",
      "Medical image analysis",
      "Security and surveillance",
      "Retail inventory management"
    ]
  },
  {
    icon: Code,
    title: "Custom Software Development",
    shortDesc: "Enterprise-grade solutions tailored to your needs",
    fullDesc: "We build robust, scalable software applications from concept to deployment. Our team leverages modern technologies and best practices to create solutions that solve your unique business challenges.",
    features: [
      "Full-stack development",
      "Enterprise applications",
      "Mobile applications",
      "Desktop applications",
      "API development",
      "System integration"
    ],
    benefits: [
      "Tailored to your exact needs",
      "Scalable architecture",
      "High performance",
      "Easy maintenance",
      "Future-proof technology stack"
    ],
    useCases: [
      "Business management systems",
      "Supply chain applications",
      "Internal tools and dashboards",
      "Cross-platform solutions"
    ]
  },
  {
    icon: Globe,
    title: "Web Development",
    shortDesc: "Modern, responsive web applications",
    fullDesc: "We create high-performance web applications that deliver exceptional user experiences. Using React, Next.js, and other modern frameworks, we build progressive web apps that work seamlessly across all devices.",
    features: [
      "Responsive design",
      "Progressive web apps (PWA)",
      "E-commerce platforms",
      "Content management systems",
      "Real-time applications",
      "Performance optimization"
    ],
    benefits: [
      "Works on all devices",
      "Fast loading times",
      "SEO friendly",
      "Improved user engagement",
      "Better conversion rates"
    ],
    useCases: [
      "Online stores and marketplaces",
      "Business portals",
      "Social platforms",
      "Analytics dashboards"
    ]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    shortDesc: "User-centered design that delights",
    fullDesc: "We create beautiful, intuitive interfaces through user research, prototyping, and iterative testing. Our design process ensures that your users get an exceptional experience every time they interact with your product.",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design",
      "Interaction design",
      "Usability testing",
      "Design systems"
    ],
    benefits: [
      "Higher user satisfaction",
      "Better engagement rates",
      "Reduced support costs",
      "Increased user retention",
      "Brand consistency"
    ],
    useCases: [
      "Mobile app design",
      "Web platform design",
      "Enterprise software redesign",
      "Design system creation"
    ]
  },
  {
    icon: Database,
    title: "Data Management",
    shortDesc: "Comprehensive data solutions and analytics",
    fullDesc: "We design and implement comprehensive data solutions that turn raw data into actionable insights. From database design to analytics platforms, we help you harness the full power of your data.",
    features: [
      "Database design and optimization",
      "ETL pipelines",
      "Data warehousing",
      "Business intelligence systems",
      "Analytics platforms",
      "Data governance"
    ],
    benefits: [
      "Better data insights",
      "Faster query performance",
      "Scalable infrastructure",
      "Improved data quality",
      "Regulatory compliance"
    ],
    useCases: [
      "Business analytics platforms",
      "Real-time dashboards",
      "Data migration projects",
      "Big data solutions"
    ]
  },
  {
    icon: Users,
    title: "CRM Software",
    shortDesc: "Customer relationship management systems",
    fullDesc: "Custom CRM solutions that streamline customer relationships and automate sales processes. Our platforms provide actionable insights for business growth and improved customer satisfaction.",
    features: [
      "Customer database management",
      "Sales pipeline automation",
      "Marketing automation",
      "Customer service tools",
      "Reporting and analytics",
      "Integration capabilities"
    ],
    benefits: [
      "Improved customer relationships",
      "Increased sales efficiency",
      "Better customer retention",
      "Enhanced team collaboration",
      "Data-driven decisions"
    ],
    useCases: [
      "Sales force automation",
      "Customer support systems",
      "Marketing campaign management",
      "Client relationship tracking"
    ]
  }
];

const ServiceDetail = ({ service, index }: { service: typeof servicesData[0], index: number }) => {
  const contentRef = useScrollAnimation(0.2);

  return (
    <section className={`py-20 ${index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-secondary/30"}`}>
      <div className="container mx-auto px-6" ref={contentRef.ref}>
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
          contentRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Left side - Icon and description */}
          <div className={index % 2 === 1 ? "order-2" : ""}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
                <service.icon className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {service.fullDesc}
            </p>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side - Benefits and Use Cases */}
          <div className={index % 2 === 1 ? "order-1" : ""}>
            {/* Benefits */}
            <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800/50 dark:to-slate-800/30 border-blue-200/30 dark:border-slate-700/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                Benefits
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Use Cases */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/30 border-purple-200/30 dark:border-slate-700/50">
              <h3 className="text-xl font-semibold mb-4">Real-World Applications</h3>
              <ul className="space-y-3">
                {service.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const heroRef = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden group" ref={heroRef.ref}>
          <img 
            src={heroAI} 
            alt="Our Services" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className={`transition-all duration-1000 ${
              heroRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Our Services</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light">
                Comprehensive technology solutions powered by deep expertise and innovation across all domains
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail Sections */}
        {servicesData.map((service, index) => (
          <ServiceDetail key={index} service={service} index={index} />
        ))}

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground mb-10">
                Let's discuss how our services can help you achieve your business goals and drive innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    Get Started Today
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="hover:bg-secondary transition-all duration-300 transform hover:scale-105">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
