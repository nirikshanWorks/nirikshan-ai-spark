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
  TrendingUp,
  Cpu,
  Cloud,
  Smartphone,
  BarChart3,
  CheckCircle,
  GitBranch,
  Boxes
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroAI from "@/assets/hero-ai.jpg";

const servicesData = [
  {
    icon: Brain,
    title: "Artificial Intelligence & Machine Learning",
    shortDesc: "Advanced AI solutions and ML models",
    fullDesc: "Transform your business with cutting-edge AI and machine learning solutions. From generative AI to predictive analytics, we develop intelligent systems that learn and adapt to your specific needs.",
    features: [
      "Generative AI models and LLM implementations",
      "Custom machine learning models",
      "Predictive analytics and forecasting",
      "Natural language processing (NLP)",
      "AI consulting and strategy",
      "Intelligent automation systems",
      "Recommendation engines",
      "Anomaly detection systems"
    ],
    benefits: [
      "Automate complex processes",
      "Gain actionable insights from data",
      "Reduce operational costs by 40%+",
      "Improve decision-making accuracy",
      "Scale operations efficiently",
      "Stay ahead of competition"
    ],
    useCases: [
      "Customer behavior prediction",
      "Fraud detection systems",
      "Demand forecasting",
      "Quality assurance automation",
      "Natural language understanding",
      "Conversational AI chatbots"
    ]
  },
  {
    icon: Cpu,
    title: "Microsoft Services & .NET Solutions",
    shortDesc: "Enterprise Microsoft ecosystem services",
    fullDesc: "Leverage Microsoft's enterprise ecosystem with our comprehensive services. From .NET development to Azure cloud solutions, MS Dynamics, and legacy application migration, we deliver enterprise-grade solutions.",
    features: [
      ".NET framework development",
      "MS Dynamics CRM implementations",
      "MS Dynamics ERP solutions",
      "Legacy application migration to .NET",
      "Azure cloud infrastructure",
      "Azure DevOps and CI/CD",
      "Microsoft 365 integration",
      "Enterprise security solutions"
    ],
    benefits: [
      "Seamless enterprise integration",
      "Improved business processes",
      "Enhanced security and compliance",
      "Scalable cloud infrastructure",
      "Cost-effective solutions",
      "Expert Microsoft partnership"
    ],
    useCases: [
      "Enterprise resource planning",
      "Customer relationship management",
      "Legacy system modernization",
      "Cloud migration projects",
      "Business process automation",
      "Enterprise application development"
    ]
  },
  {
    icon: Boxes,
    title: "SAP BTP Solutions",
    shortDesc: "Business Technology Platform services",
    fullDesc: "Unlock the full potential of SAP Business Technology Platform. We provide comprehensive solutions for integration, application development, data management, and AI-powered insights on SAP BTP.",
    features: [
      "SAP Integration Suite implementations",
      "Low-code/No-code application development",
      "SAP BTP data and analytics",
      "Application Development Automation",
      "AI capabilities on SAP BTP",
      "SAP Analytics Cloud",
      "Data modeling and ETL",
      "Custom API development"
    ],
    benefits: [
      "Faster application development",
      "Reduced integration complexity",
      "Real-time data insights",
      "Scalable on-demand infrastructure",
      "Cost optimization",
      "Future-ready platform"
    ],
    useCases: [
      "Enterprise data integration",
      "Real-time reporting dashboards",
      "Supply chain optimization",
      "Customer analytics platforms",
      "Business process automation",
      "Intelligent forecasting"
    ]
  },
  {
    icon: Cloud,
    title: "AWS & Cloud Services",
    shortDesc: "Amazon Web Services infrastructure",
    fullDesc: "Harness the power of AWS cloud with our comprehensive services. We help you migrate, optimize, and innovate on the AWS platform with expert architecture and best practices.",
    features: [
      "AWS infrastructure design and setup",
      "Cloud migration services",
      "AWS cost optimization",
      "Serverless application development",
      "Cloud security and compliance",
      "AWS DevOps and automation",
      "Database migration services",
      "Disaster recovery solutions"
    ],
    benefits: [
      "Global infrastructure availability",
      "Pay-as-you-go pricing model",
      "High scalability and reliability",
      "Enhanced security and compliance",
      "Reduced operational overhead",
      "Innovation at scale"
    ],
    useCases: [
      "Web application hosting",
      "Big data analytics",
      "Real-time streaming applications",
      "Enterprise data backup",
      "IoT platform development",
      "Mobile app backend services"
    ]
  },
  {
    icon: Code,
    title: "Web Development",
    shortDesc: "Modern responsive web applications",
    fullDesc: "We create high-performance, responsive web applications that deliver exceptional user experiences. Using React, Next.js, and modern frameworks, we build progressive web apps for any scale.",
    features: [
      "Responsive web design",
      "Progressive web apps (PWA)",
      "E-commerce platforms",
      "Content management systems",
      "Real-time applications",
      "Single page applications (SPA)",
      "WordPress development",
      "Performance optimization"
    ],
    benefits: [
      "Works on all devices",
      "Fast loading times",
      "SEO friendly",
      "Improved user engagement",
      "Better conversion rates",
      "Cross-browser compatibility"
    ],
    useCases: [
      "Online stores and marketplaces",
      "Business portals",
      "Social platforms",
      "Analytics dashboards",
      "Content platforms",
      "Booking systems"
    ]
  },
  {
    icon: Smartphone,
    title: "Mobile Application Development",
    shortDesc: "Native and cross-platform mobile apps",
    fullDesc: "Build powerful mobile applications for iOS, Android, or both platforms. Our expert team creates native and cross-platform solutions that provide exceptional mobile experiences.",
    features: [
      "Native Android development",
      "Native iOS development",
      "Cross-platform development (React Native, Flutter)",
      "Mobile UI/UX design",
      "App store optimization",
      "Push notifications",
      "Offline functionality",
      "Mobile analytics integration"
    ],
    benefits: [
      "Native performance",
      "Code reusability",
      "Faster time to market",
      "Cost-effective development",
      "Better user experience",
      "Regular updates and support"
    ],
    useCases: [
      "Consumer apps",
      "Enterprise mobile solutions",
      "Location-based services",
      "Social networking apps",
      "E-commerce mobile apps",
      "Healthcare applications"
    ]
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance & Testing",
    shortDesc: "Comprehensive QA and testing services",
    fullDesc: "Ensure your software meets the highest quality standards with our comprehensive testing services. From functional testing to automation testing, we provide thorough quality assurance across all platforms.",
    features: [
      "Manual software testing",
      "Functional testing",
      "Automation testing",
      "Performance testing",
      "Security testing",
      "Regression testing",
      "User acceptance testing",
      "Test management and reporting"
    ],
    benefits: [
      "Reduce defects and bugs",
      "Improve software reliability",
      "Faster release cycles",
      "Cost-effective testing",
      "Enhanced user satisfaction",
      "Continuous quality improvement"
    ],
    useCases: [
      "Software release validation",
      "Regression test automation",
      "Performance benchmarking",
      "Security vulnerability testing",
      "Compliance verification",
      "Continuous integration testing"
    ]
  },
  {
    icon: GitBranch,
    title: "Legacy Application Modernization",
    shortDesc: "Transform legacy systems for modern era",
    fullDesc: "Breathe new life into your legacy applications with comprehensive modernization strategies. From re-engineering to cloud migration, we help you transform outdated systems into modern, efficient solutions.",
    features: [
      "Application re-engineering",
      "Application re-architecture",
      "Legacy cloud migration",
      "UI/UX modernization",
      "API integration",
      "Database modernization",
      "Performance optimization",
      "Maintenance services"
    ],
    benefits: [
      "Extended system lifespan",
      "Improved performance",
      "Reduced maintenance costs",
      "Better scalability",
      "Modern user interface",
      "Cloud-ready architecture"
    ],
    useCases: [
      "Mainframe modernization",
      "Desktop to web transformation",
      "Legacy to cloud migration",
      "Database upgrades",
      "API-first transformation",
      "Microservices migration"
    ]
  },
  {
    icon: BarChart3,
    title: "Digital Marketing Services",
    shortDesc: "Grow your online presence and reach",
    fullDesc: "Expand your digital footprint with our comprehensive marketing services. From SEO to social media marketing, we help you reach and engage your target audience effectively.",
    features: [
      "Search engine optimization (SEO)",
      "Social media marketing",
      "Content marketing",
      "Paid advertising campaigns",
      "Email marketing",
      "Marketing analytics",
      "Brand strategy",
      "Digital consulting"
    ],
    benefits: [
      "Increased online visibility",
      "Higher conversion rates",
      "Better customer engagement",
      "Measurable ROI",
      "Cost-effective marketing",
      "Brand awareness growth"
    ],
    useCases: [
      "E-commerce visibility",
      "Lead generation",
      "Brand awareness campaigns",
      "Social media engagement",
      "Search rankings improvement",
      "Customer retention"
    ]
  },
  {
    icon: Zap,
    title: "Digital Transformation Services",
    shortDesc: "End-to-end digital transformation",
    fullDesc: "Navigate your digital transformation journey with our expert guidance. We help organizations modernize operations, embrace new technologies, and drive business growth in the digital age.",
    features: [
      "Digital transformation strategy",
      "Business process automation",
      "Cloud migration planning",
      "AI-powered transformation",
      "Agile and DevOps implementation",
      "Change management",
      "Technology assessment",
      "Innovation workshops"
    ],
    benefits: [
      "Accelerated business growth",
      "Operational efficiency",
      "Cost reduction",
      "Enhanced customer experience",
      "Employee productivity",
      "Competitive advantage"
    ],
    useCases: [
      "Enterprise digital transformation",
      "Business process optimization",
      "Customer experience enhancement",
      "Operational efficiency",
      "New product development",
      "Market expansion"
    ]
  },
  {
    icon: Database,
    title: "Data Management & Analytics",
    shortDesc: "Comprehensive data solutions",
    fullDesc: "Turn your data into actionable insights with our comprehensive data management and analytics solutions. From database design to advanced analytics, we help you leverage your data for business growth.",
    features: [
      "Database design and optimization",
      "ETL pipelines and data integration",
      "Data warehousing",
      "Business intelligence systems",
      "Analytics platforms",
      "Data governance",
      "Big data solutions",
      "Real-time analytics"
    ],
    benefits: [
      "Better data insights",
      "Faster query performance",
      "Scalable infrastructure",
      "Improved data quality",
      "Regulatory compliance",
      "Data-driven decisions"
    ],
    useCases: [
      "Business analytics platforms",
      "Real-time dashboards",
      "Data migration projects",
      "Big data solutions",
      "Customer analytics",
      "Operational intelligence"
    ]
  },
  {
    icon: Users,
    title: "CRM & Managed Services",
    shortDesc: "Customer solutions and ongoing support",
    fullDesc: "Streamline customer relationships and ensure smooth operations with our CRM and managed services. We provide both custom CRM solutions and continuous application management services.",
    features: [
      "Custom CRM development",
      "Customer database management",
      "Sales pipeline automation",
      "Marketing automation",
      "Customer service tools",
      "Application managed services",
      "24/7 monitoring and support",
      "Performance optimization"
    ],
    benefits: [
      "Improved customer relationships",
      "Increased sales efficiency",
      "Better customer retention",
      "Enhanced collaboration",
      "Data-driven decisions",
      "Reduced IT overhead"
    ],
    useCases: [
      "Sales force automation",
      "Customer support systems",
      "Marketing automation",
      "Application support services",
      "System monitoring",
      "Performance maintenance"
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
