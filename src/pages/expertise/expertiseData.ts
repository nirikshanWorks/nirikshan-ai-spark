import {
  Brain,
  Cpu,
  Boxes,
  Cloud,
  Code,
  Smartphone,
  CheckCircle,
  GitBranch,
  BarChart3,
  Zap,
  Database,
  Users
} from "lucide-react";

export const expertiseCategories = [
  {
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: Brain,
    description: "Transform your business with cutting-edge AI and machine learning solutions that drive innovation and efficiency.",
    services: [
      {
        title: "Generative AI",
        slug: "generative-ai",
        description: "Harness the power of generative models and large language models for content creation, chatbots, and innovative AI solutions.",
        features: [
          "State-of-the-art large language models",
          "Custom model fine-tuning and training",
          "Content generation and synthesis",
          "Conversational AI systems",
          "Image and video generation",
          "Text-to-speech and speech-to-text",
          "Code generation and automation",
          "Data augmentation and synthesis"
        ],
        technologies: [
          "OpenAI GPT-4",
          "Google PaLM",
          "Hugging Face Transformers",
          "Stable Diffusion",
          "DALL-E",
          "TensorFlow",
          "PyTorch",
          "LangChain"
        ],
        useCases: [
          "AI-powered content creation",
          "Intelligent customer service chatbots",
          "Automated code generation",
          "Virtual assistants",
          "Creative design automation",
          "Data synthesis for testing",
          "Language translation services",
          "Educational content generation"
        ],
        benefits: [
          "Accelerated content creation",
          "24/7 automated customer support",
          "Reduced development time",
          "Enhanced creativity and innovation",
          "Improved user engagement",
          "Cost-effective scaling",
          "Consistent output quality"
        ]
      },
      {
        title: "Machine Learning",
        slug: "machine-learning",
        description: "Build intelligent systems that learn and adapt from data to solve complex business problems and drive decision-making.",
        features: [
          "Custom ML model development",
          "Deep learning solutions",
          "Neural network architectures",
          "Predictive analytics systems",
          "Computer vision applications",
          "Natural Language Processing",
          "Automated model training",
          "MLOps and deployment"
        ],
        technologies: [
          "TensorFlow 2.x",
          "PyTorch",
          "scikit-learn",
          "CUDA",
          "Keras",
          "Apache Spark ML",
          "MLflow",
          "Kubeflow"
        ],
        useCases: [
          "Predictive maintenance",
          "Customer behavior analysis",
          "Fraud detection systems",
          "Image and video recognition",
          "Demand forecasting",
          "Recommendation engines",
          "Risk assessment",
          "Quality control automation"
        ],
        benefits: [
          "Data-driven decision making",
          "Automated pattern recognition",
          "Improved accuracy over time",
          "Scalable AI solutions",
          "Reduced operational costs",
          "Proactive problem solving",
          "Enhanced customer experience"
        ]
      },
      {
        title: "AI Consulting",
        slug: "ai-consulting",
        description: "Expert guidance on AI strategy, implementation, and optimization to ensure successful digital transformation.",
        features: [
          "AI readiness assessment",
          "Digital transformation strategy",
          "Implementation roadmap",
          "ROI analysis and planning",
          "Technology stack evaluation",
          "Team training and enablement",
          "Process optimization",
          "Change management"
        ],
        technologies: [
          "Business Intelligence Tools",
          "Data Analytics Platforms",
          "Cloud AI Services",
          "MLOps Tools",
          "Project Management Software",
          "Collaboration Platforms",
          "Documentation Tools"
        ],
        useCases: [
          "Digital transformation projects",
          "AI adoption planning",
          "Process automation strategy",
          "Technology modernization",
          "Data strategy development",
          "AI governance setup",
          "Team upskilling programs",
          "ROI optimization"
        ],
        benefits: [
          "Expert-guided transformation",
          "Risk mitigation",
          "Faster time to market",
          "Optimized resource utilization",
          "Clear implementation roadmap",
          "Maximized ROI",
          "Sustainable AI adoption"
        ]
      }
    ]
  },
  {
    title: "Microsoft Services",
    slug: "microsoft-services",
    icon: Cpu,
    description: "Comprehensive solutions leveraging Microsoft's enterprise ecosystem for digital transformation and business growth.",
    services: [
      {
        title: ".NET Development",
        slug: "dotnet-development",
        description: "Build robust, scalable enterprise applications with modern .NET framework and best practices.",
        features: [
          "Custom .NET application development",
          "Microservices architecture",
          "Cloud-native applications",
          "Enterprise API development",
          "Performance optimization",
          "Security implementation",
          "Database integration",
          "Testing and quality assurance"
        ],
        technologies: [
          ".NET 8",
          "C#",
          "ASP.NET Core",
          "Entity Framework Core",
          "Blazor",
          "Azure DevOps",
          "SQL Server",
          "Visual Studio"
        ],
        useCases: [
          "Enterprise web applications",
          "Microservices platforms",
          "Cloud-native solutions",
          "API gateways",
          "Real-time applications",
          "Data-intensive systems",
          "Integration services",
          "Mobile backends"
        ],
        benefits: [
          "Enterprise-grade reliability",
          "Cross-platform compatibility",
          "Improved performance",
          "Scalable architecture",
          "Modern development practices",
          "Secure by design",
          "Easy maintenance"
        ]
      },
      {
        title: "MS Dynamics",
        slug: "ms-dynamics",
        description: "Implement and customize Microsoft Dynamics 365 to streamline business processes and enhance customer relationships.",
        features: [
          "Dynamics 365 implementation",
          "Custom module development",
          "Process automation",
          "Integration services",
          "Data migration",
          "User training",
          "Support and maintenance",
          "Performance optimization"
        ],
        technologies: [
          "Dynamics 365",
          "Power Platform",
          "Power BI",
          "Power Automate",
          "Azure Services",
          "Common Data Service",
          "SharePoint",
          "Teams Integration"
        ],
        useCases: [
          "Sales automation",
          "Customer service",
          "Marketing automation",
          "Field service",
          "Project management",
          "Supply chain management",
          "Financial management",
          "Business analytics"
        ],
        benefits: [
          "Improved efficiency",
          "Enhanced collaboration",
          "Better customer insights",
          "Automated workflows",
          "Real-time analytics",
          "Unified platform",
          "Mobile accessibility"
        ]
      },
      {
        title: "Legacy Application Migration to .NET",
        slug: "legacy-migration",
        description: "Modernize legacy applications by migrating them to the latest .NET platform while preserving business logic.",
        features: [
          "Code analysis and assessment",
          "Architecture modernization",
          "Database migration",
          "UI/UX modernization",
          "Cloud migration",
          "Testing and validation",
          "Performance optimization",
          "Documentation"
        ],
        technologies: [
          ".NET 8",
          "Azure Cloud",
          "Entity Framework",
          "Modern UI Frameworks",
          "CI/CD Tools",
          "Testing Frameworks",
          "Monitoring Tools",
          "Legacy Integration Tools"
        ],
        useCases: [
          "Legacy system modernization",
          "Platform migration",
          "Cloud transformation",
          "Application enhancement",
          "Security upgrades",
          "Performance improvement",
          "Technology stack update",
          "Process automation"
        ],
        benefits: [
          "Reduced maintenance costs",
          "Improved performance",
          "Better security",
          "Modern user experience",
          "Cloud readiness",
          "Easier updates",
          "Future-proof architecture"
        ]
      },
      {
        title: "Azure Cloud",
        slug: "azure-cloud",
        description: "Leverage Microsoft Azure cloud services for scalable, secure, and reliable enterprise solutions.",
        features: [
          "Cloud architecture design",
          "Migration services",
          "DevOps implementation",
          "Security and compliance",
          "Monitoring and optimization",
          "Disaster recovery",
          "Cost management",
          "Performance tuning"
        ],
        technologies: [
          "Azure Services",
          "Azure DevOps",
          "Kubernetes",
          "Docker",
          "Azure Functions",
          "Azure SQL",
          "Azure AD",
          "Application Insights"
        ],
        useCases: [
          "Cloud migration",
          "Hybrid cloud solutions",
          "Serverless applications",
          "DevOps automation",
          "Disaster recovery",
          "Big data processing",
          "IoT solutions",
          "AI/ML deployment"
        ],
        benefits: [
          "Scalable infrastructure",
          "Cost optimization",
          "Enhanced security",
          "Global availability",
          "Automated deployment",
          "Integrated services",
          "Pay-as-you-go pricing"
        ]
      }
    ]
  },
  {
    title: "SAP BTP Solutions",
    slug: "sap-btp",
    icon: Boxes,
    description: "Unlock the full potential of SAP Business Technology Platform with our comprehensive integration and development services.",
    services: [
      {
        title: "SAP Integration Suite",
        slug: "integration-suite",
        description: "Connect and integrate your SAP and non-SAP systems seamlessly with SAP Integration Suite.",
        features: [
          "API management",
          "Integration flow design",
          "Cloud integration",
          "B2B integration",
          "Message processing",
          "Monitoring and analytics",
          "Security implementation",
          "Error handling"
        ],
        technologies: [
          "SAP Integration Suite",
          "SAP Cloud Platform",
          "API Management",
          "OpenAPI",
          "OData",
          "REST/SOAP",
          "SAP Cloud Connector",
          "Integration Advisor"
        ],
        useCases: [
          "System integration",
          "API management",
          "B2B connectivity",
          "Data synchronization",
          "Process integration",
          "Cloud integration",
          "Legacy system integration",
          "Real-time integration"
        ],
        benefits: [
          "Seamless connectivity",
          "Reduced complexity",
          "Improved efficiency",
          "Real-time integration",
          "Secure data exchange",
          "Scalable solution",
          "Cost optimization"
        ]
      },
      {
        title: "Application Development Automation",
        slug: "app-dev-automation",
        description: "Accelerate application development with SAP BTP's low-code/no-code tools and automation capabilities.",
        features: [
          "Low-code development",
          "Workflow automation",
          "UI development",
          "Business rules automation",
          "Process automation",
          "Testing automation",
          "Deployment automation",
          "Mobile development"
        ],
        technologies: [
          "SAP Business Application Studio",
          "SAP Fiori",
          "SAPUI5",
          "SAP Workflow",
          "SAP Process Automation",
          "SAP Mobile Services",
          "SAP Build",
          "SAP CAP"
        ],
        useCases: [
          "Process automation",
          "Custom app development",
          "Workflow digitization",
          "Forms automation",
          "Mobile apps",
          "Employee self-service",
          "Customer portals",
          "Business process apps"
        ],
        benefits: [
          "Faster development",
          "Reduced costs",
          "Consistent quality",
          "User-friendly solutions",
          "Easy maintenance",
          "Future-ready apps",
          "Improved productivity"
        ]
      },
      {
        title: "SAP BTP Data and Analytics",
        slug: "data-analytics",
        description: "Transform your data into actionable insights with SAP BTP's powerful analytics capabilities.",
        features: [
          "Data modeling",
          "Real-time analytics",
          "Predictive analytics",
          "Data visualization",
          "Big data processing",
          "Data integration",
          "Report automation",
          "Data governance"
        ],
        technologies: [
          "SAP Analytics Cloud",
          "SAP HANA",
          "SAP Data Warehouse Cloud",
          "SAP Data Intelligence",
          "SAP BusinessObjects",
          "SAP BW/4HANA",
          "SAP Datasphere",
          "Machine Learning"
        ],
        useCases: [
          "Business intelligence",
          "Financial planning",
          "Sales analytics",
          "Supply chain analytics",
          "Customer insights",
          "Predictive modeling",
          "Real-time reporting",
          "Performance monitoring"
        ],
        benefits: [
          "Data-driven decisions",
          "Real-time insights",
          "Improved accuracy",
          "Enhanced planning",
          "Better forecasting",
          "Competitive advantage",
          "Operational efficiency"
        ]
      }
    ]
  },
  {
    title: "Quality Assurance",
    slug: "quality-assurance",
    icon: CheckCircle,
    description: "Ensure software excellence with our comprehensive quality assurance and testing services.",
    services: [
      {
        title: "Software Testing",
        slug: "software-testing",
        description: "Comprehensive software testing services to ensure quality, reliability, and performance.",
        features: [
          "Test strategy development",
          "Test case design",
          "Manual testing",
          "Test automation",
          "Performance testing",
          "Security testing",
          "Integration testing",
          "User acceptance testing"
        ],
        technologies: [
          "Selenium",
          "JUnit",
          "TestNG",
          "Cypress",
          "JMeter",
          "Postman",
          "SonarQube",
          "Jenkins"
        ],
        useCases: [
          "Web applications",
          "Mobile applications",
          "Enterprise software",
          "Cloud applications",
          "E-commerce platforms",
          "API testing",
          "Database testing",
          "Security validation"
        ],
        benefits: [
          "Quality assurance",
          "Bug-free software",
          "Improved reliability",
          "Better user experience",
          "Reduced risks",
          "Faster releases",
          "Cost savings"
        ]
      },
      {
        title: "Functional Testing",
        slug: "functional-testing",
        description: "Ensure your software functions exactly as specified with our thorough functional testing services.",
        features: [
          "Requirements analysis",
          "Test planning",
          "Test execution",
          "Regression testing",
          "Integration testing",
          "System testing",
          "User acceptance testing",
          "Defect management"
        ],
        technologies: [
          "TestRail",
          "JIRA",
          "Cucumber",
          "Selenium",
          "TestComplete",
          "QTP/UFT",
          "Bugzilla",
          "Test Management Tools"
        ],
        useCases: [
          "Feature validation",
          "Business logic testing",
          "UI/UX testing",
          "Cross-browser testing",
          "Mobile testing",
          "Payment gateway testing",
          "Form validation",
          "Workflow testing"
        ],
        benefits: [
          "Verified functionality",
          "Requirements compliance",
          "Enhanced reliability",
          "User satisfaction",
          "Reduced defects",
          "Faster time to market",
          "Quality assurance"
        ]
      },
      {
        title: "Automation Testing",
        slug: "automation-testing",
        description: "Accelerate testing cycles and improve coverage with our test automation expertise.",
        features: [
          "Test automation strategy",
          "Framework development",
          "Script development",
          "CI/CD integration",
          "Cross-browser testing",
          "Mobile automation",
          "API automation",
          "Performance automation"
        ],
        technologies: [
          "Selenium WebDriver",
          "Appium",
          "Playwright",
          "TestCafe",
          "Robot Framework",
          "Katalon",
          "RestAssured",
          "Jenkins"
        ],
        useCases: [
          "Regression testing",
          "Continuous testing",
          "Cross-platform testing",
          "Data-driven testing",
          "API testing",
          "Performance testing",
          "Security testing",
          "UI automation"
        ],
        benefits: [
          "Faster testing cycles",
          "Increased coverage",
          "Consistent results",
          "Cost reduction",
          "24/7 testing",
          "Early defect detection",
          "Improved quality"
        ]
      }
    ]
  }
] as const;

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string) => {
  return expertiseCategories.find(category => category.slug === slug);
};

// Helper function to get service by slugs
export const getServiceBySlug = (categorySlug: string, serviceSlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  return category?.services.find(service => service.slug === serviceSlug);
};