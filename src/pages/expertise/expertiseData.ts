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
    highlights: [
      {
        stat: "45+",
        label: "AI Deployments",
        description: "Enterprise-grade AI products delivered across finance, manufacturing, and retail"
      },
      {
        stat: "120%",
        label: "ROI Acceleration",
        description: "Average improvement in decision-making speed for our AI-driven engagements"
      },
      {
        stat: "30+",
        label: "Domain Specialists",
        description: "Certified AI engineers, data scientists, and prompt engineers on the core team"
      }
    ],
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
        methodology: [
          {
            phase: "Discovery & Assessment",
            description: "Analyze your business needs, identify use cases, and evaluate data requirements for AI implementation"
          },
          {
            phase: "Solution Design",
            description: "Design custom AI architecture, select appropriate models, and plan integration with existing systems"
          },
          {
            phase: "Model Development",
            description: "Train and fine-tune models using your data, implement prompt engineering, and optimize performance"
          },
          {
            phase: "Integration & Deployment",
            description: "Seamlessly integrate AI solutions into your workflow with robust APIs and scalable infrastructure"
          },
          {
            phase: "Monitoring & Optimization",
            description: "Continuously monitor performance, gather feedback, and refine models for improved accuracy"
          }
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
        methodology: [
          {
            phase: "Data Collection & Preparation",
            description: "Gather relevant data, perform data cleaning, feature engineering, and prepare datasets for training"
          },
          {
            phase: "Model Selection & Development",
            description: "Choose appropriate algorithms, build neural networks, and develop custom ML models for your use case"
          },
          {
            phase: "Training & Validation",
            description: "Train models on your data, validate accuracy, and fine-tune hyperparameters for optimal performance"
          },
          {
            phase: "Deployment & MLOps",
            description: "Deploy models to production with monitoring, automated retraining, and version control"
          },
          {
            phase: "Continuous Improvement",
            description: "Monitor model performance, retrain with new data, and continuously improve accuracy over time"
          }
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
        methodology: [
          {
            phase: "AI Readiness Assessment",
            description: "Evaluate current capabilities, identify gaps, and assess organizational readiness for AI adoption"
          },
          {
            phase: "Strategy Development",
            description: "Create comprehensive AI roadmap aligned with business goals and define success metrics"
          },
          {
            phase: "Implementation Planning",
            description: "Design detailed implementation plan with timelines, resources, and risk mitigation strategies"
          },
          {
            phase: "Execution & Support",
            description: "Guide implementation, provide hands-on support, and ensure smooth transition to AI-driven operations"
          },
          {
            phase: "Measurement & Optimization",
            description: "Track ROI, measure outcomes against KPIs, and optimize for continuous improvement"
          }
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
    highlights: [
      {
        stat: "250+",
        label: ".NET Releases",
        description: "Secure, high-performance applications shipped on modern Microsoft stacks"
      },
      {
        stat: "98%",
        label: "Migration Success",
        description: "Legacy platforms transitioned to Azure with zero unplanned downtime"
      },
      {
        stat: "20+",
        label: "Industry Templates",
        description: "Reusable accelerators for BFSI, healthcare, manufacturing, and retail"
      }
    ],
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
        methodology: [
          {
            phase: "Requirements Analysis",
            description: "Understand business requirements, define technical specifications, and plan architecture"
          },
          {
            phase: "Design & Architecture",
            description: "Design scalable architecture, create database schema, and define API contracts"
          },
          {
            phase: "Development & Testing",
            description: "Implement features using .NET best practices, write unit tests, and ensure code quality"
          },
          {
            phase: "Integration & Deployment",
            description: "Integrate with existing systems, set up CI/CD pipelines, and deploy to cloud or on-premise"
          },
          {
            phase: "Maintenance & Support",
            description: "Provide ongoing support, performance monitoring, and regular updates"
          }
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
        methodology: [
          {
            phase: "Business Process Analysis",
            description: "Map current processes, identify pain points, and define requirements for Dynamics 365"
          },
          {
            phase: "Solution Configuration",
            description: "Configure Dynamics 365 modules, customize forms and workflows, and set up integrations"
          },
          {
            phase: "Data Migration",
            description: "Plan data migration strategy, cleanse data, and migrate from legacy systems"
          },
          {
            phase: "User Training & Go-Live",
            description: "Train users, conduct UAT, and execute smooth go-live with minimal disruption"
          },
          {
            phase: "Optimization & Support",
            description: "Monitor adoption, gather feedback, optimize processes, and provide ongoing support"
          }
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
        methodology: [
          {
            phase: "Assessment & Planning",
            description: "Analyze legacy codebase, document dependencies, and create detailed migration roadmap"
          },
          {
            phase: "Architecture Modernization",
            description: "Redesign architecture for .NET, refactor code, and plan database migration strategy"
          },
          {
            phase: "Incremental Migration",
            description: "Migrate in phases to minimize risk, ensure backward compatibility, and maintain business continuity"
          },
          {
            phase: "Testing & Validation",
            description: "Comprehensive testing at each phase, performance validation, and security assessment"
          },
          {
            phase: "Deployment & Transition",
            description: "Deploy to production, train teams, decommission legacy systems, and provide support"
          }
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
        methodology: [
          {
            phase: "Cloud Strategy & Assessment",
            description: "Evaluate current infrastructure, define cloud strategy, and assess migration readiness"
          },
          {
            phase: "Architecture Design",
            description: "Design cloud-native architecture, select Azure services, and plan security framework"
          },
          {
            phase: "Migration & Implementation",
            description: "Execute migration plan, set up DevOps pipelines, and configure monitoring"
          },
          {
            phase: "Optimization & Security",
            description: "Optimize costs, enhance performance, implement security best practices, and ensure compliance"
          },
          {
            phase: "Operations & Management",
            description: "Establish cloud operations, provide training, and ensure continuous optimization"
          }
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
    highlights: [
      {
        stat: "360°",
        label: "Integration View",
        description: "Unified control across SAP and non-SAP landscapes with real-time visibility"
      },
      {
        stat: "50%",
        label: "Build Speed",
        description: "Reduction in app development time using low-code accelerators on SAP BTP"
      },
      {
        stat: "99.9%",
        label: "Data Reliability",
        description: "Analytics pipelines maintained with enterprise-grade governance"
      }
    ],
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
        methodology: [
          {
            phase: "Integration Assessment",
            description: "Analyze integration requirements, map data flows, and identify systems to be connected"
          },
          {
            phase: "Solution Design",
            description: "Design integration architecture, define API specifications, and plan security measures"
          },
          {
            phase: "Development & Configuration",
            description: "Develop integration flows, configure adapters, and implement error handling"
          },
          {
            phase: "Testing & Deployment",
            description: "Perform end-to-end testing, validate data accuracy, and deploy to production"
          },
          {
            phase: "Monitoring & Support",
            description: "Monitor integration health, provide support, and optimize performance"
          }
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
        methodology: [
          {
            phase: "Process Discovery",
            description: "Identify automation opportunities, document current processes, and define requirements"
          },
          {
            phase: "Application Design",
            description: "Design user interfaces, create workflow diagrams, and plan integrations"
          },
          {
            phase: "Low-Code Development",
            description: "Build applications using SAP BTP tools, configure workflows, and implement business logic"
          },
          {
            phase: "Testing & Refinement",
            description: "Conduct user acceptance testing, gather feedback, and refine applications"
          },
          {
            phase: "Deployment & Training",
            description: "Deploy applications, train end-users, and establish maintenance procedures"
          }
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
        methodology: [
          {
            phase: "Data Strategy Definition",
            description: "Define analytics requirements, identify data sources, and plan data architecture"
          },
          {
            phase: "Data Modeling & Integration",
            description: "Design data models, integrate data sources, and establish data quality rules"
          },
          {
            phase: "Analytics Development",
            description: "Build dashboards and reports, implement predictive models, and create visualizations"
          },
          {
            phase: "Deployment & Training",
            description: "Deploy analytics solutions, train business users, and establish governance"
          },
          {
            phase: "Continuous Enhancement",
            description: "Monitor usage, gather requirements for new analytics, and refine models"
          }
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
    highlights: [
      {
        stat: "500k+",
        label: "Test Cases Executed",
        description: "Automation-led validation across web, mobile, and enterprise workloads"
      },
      {
        stat: "65%",
        label: "Faster Releases",
        description: "Time saved for product teams through continuous testing pipelines"
      },
      {
        stat: "24/7",
        label: "QA Coverage",
        description: "Global delivery teams ensuring round-the-clock quality assurance"
      }
    ],
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
        methodology: [
          {
            phase: "Test Planning",
            description: "Define test strategy, identify test scenarios, and establish quality metrics"
          },
          {
            phase: "Test Design",
            description: "Create test cases, design test data, and prepare test environments"
          },
          {
            phase: "Test Execution",
            description: "Execute manual and automated tests, log defects, and track test coverage"
          },
          {
            phase: "Defect Management",
            description: "Prioritize and track defects, verify fixes, and ensure resolution"
          },
          {
            phase: "Reporting & Improvement",
            description: "Generate test reports, analyze results, and recommend improvements"
          }
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
        methodology: [
          {
            phase: "Requirement Analysis",
            description: "Review requirements, create test scenarios, and identify acceptance criteria"
          },
          {
            phase: "Test Case Development",
            description: "Write detailed test cases, prepare test data, and set up test environment"
          },
          {
            phase: "Test Execution",
            description: "Execute test cases systematically, document results, and report defects"
          },
          {
            phase: "Regression Testing",
            description: "Re-test after fixes, verify no new defects, and ensure stability"
          },
          {
            phase: "Sign-off & Documentation",
            description: "Obtain stakeholder approval, document findings, and archive test artifacts"
          }
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
        methodology: [
          {
            phase: "Automation Assessment",
            description: "Evaluate automation feasibility, select tools, and define automation scope"
          },
          {
            phase: "Framework Development",
            description: "Build automation framework, establish coding standards, and set up version control"
          },
          {
            phase: "Script Development",
            description: "Create automated test scripts, implement page objects, and build test suites"
          },
          {
            phase: "CI/CD Integration",
            description: "Integrate with CI/CD pipelines, configure scheduled runs, and set up reporting"
          },
          {
            phase: "Maintenance & Enhancement",
            description: "Maintain test scripts, update for application changes, and expand coverage"
          }
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