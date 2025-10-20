import {
  Brain,
  Cpu,
  Boxes,
  Cloud,
  Code,
  Megaphone,
  Smartphone,
  CheckCircle,
  GitBranch,
  BarChart3,
  Zap,
  Database,
  Users,
  RefreshCw,
  Globe
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
        title: "OpenCV & Computer Vision",
        slug: "computer-vision",
        description: "Build intelligent visual systems that see, understand, and act on visual data — from real-time object detection to advanced image processing and automation.",
        features: [
          "Real-time object detection and tracking",
          "Image classification and segmentation",
          "Facial recognition systems",
          "Optical character recognition (OCR)",
          "Video analytics and processing",
          "3D reconstruction and depth estimation",
          "Motion detection and analysis",
          "Quality inspection automation"
        ],
        technologies: [
          "OpenCV 4.x",
          "YOLO (v8/v9)",
          "TensorFlow Object Detection API",
          "MediaPipe",
          "PyTorch Vision",
          "scikit-image",
          "PIL/Pillow",
          "CUDA for GPU acceleration"
        ],
        methodology: [
          {
            phase: "Vision Requirements Analysis",
            description: "Define visual recognition needs, identify key objects/patterns, and assess data requirements for optimal model training"
          },
          {
            phase: "Data Collection & Annotation",
            description: "Gather diverse image/video datasets, perform high-quality annotation, and prepare training data with proper labeling"
          },
          {
            phase: "Model Development & Training",
            description: "Design custom CNN architectures, train detection models, and optimize for real-time performance"
          },
          {
            phase: "Integration & Optimization",
            description: "Integrate with cameras/sensors, optimize for edge devices, and ensure low-latency real-time processing"
          },
          {
            phase: "Deployment & Monitoring",
            description: "Deploy to production environments, implement monitoring dashboards, and continuously improve accuracy"
          }
        ],
        useCases: [
          "Autonomous vehicle vision systems",
          "Industrial quality control",
          "Security and surveillance",
          "Medical image analysis",
          "Retail customer analytics",
          "Agricultural crop monitoring",
          "Smart city infrastructure",
          "Augmented reality applications"
        ],
        benefits: [
          "Automated visual inspection",
          "24/7 surveillance and monitoring",
          "Enhanced security systems",
          "Reduced human error",
          "Real-time decision making",
          "Cost-effective quality control",
          "Scalable visual intelligence"
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
      },
      {
        title: "AI Agent Development",
        slug: "ai-agent-development",
        description: "Build intelligent autonomous agents that can perform complex tasks, make decisions, and interact naturally with users and systems.",
        features: [
          "Multi-agent systems architecture",
          "Goal-oriented agent design",
          "Natural language understanding",
          "Autonomous decision-making",
          "Tool integration and API usage",
          "Memory and context management",
          "Multi-modal agent capabilities",
          "Agent orchestration and workflows"
        ],
        technologies: [
          "LangChain",
          "AutoGPT",
          "OpenAI Assistants API",
          "LlamaIndex",
          "Semantic Kernel",
          "Crew AI",
          "LangGraph",
          "Vector Databases"
        ],
        methodology: [
          {
            phase: "Agent Requirements Analysis",
            description: "Define agent capabilities, tasks, tools needed, and interaction patterns required for your use case"
          },
          {
            phase: "Architecture & Design",
            description: "Design agent architecture, select appropriate frameworks, and plan tool integration strategy"
          },
          {
            phase: "Agent Development",
            description: "Build agent logic, implement tool-use capabilities, and integrate with LLMs and external APIs"
          },
          {
            phase: "Testing & Refinement",
            description: "Test agent behavior, refine prompts and logic, ensure reliable autonomous operation"
          },
          {
            phase: "Deployment & Monitoring",
            description: "Deploy agents to production, implement monitoring, and continuously improve performance"
          }
        ],
        useCases: [
          "Intelligent customer service agents",
          "Research and data analysis agents",
          "Task automation assistants",
          "Code review and generation agents",
          "Personal productivity assistants",
          "Content moderation agents",
          "Sales and lead qualification",
          "Complex workflow orchestration"
        ],
        benefits: [
          "Autonomous task completion",
          "24/7 intelligent assistance",
          "Complex reasoning capabilities",
          "Multi-step problem solving",
          "Reduced manual intervention",
          "Scalable intelligence",
          "Natural user interaction"
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
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: Megaphone,
    description: "Amplify brand visibility, pipeline velocity, and customer engagement with data-driven digital marketing programs tailored to your growth goals.",
    highlights: [
      {
        stat: "5M+",
        label: "Monthly Impressions",
        description: "Paid and organic campaigns delivering consistent brand visibility across search and social channels"
      },
      {
        stat: "4x",
        label: "Pipeline Growth",
        description: "Average uplift in qualified opportunities after integrated marketing sprints"
      },
      {
        stat: "95%",
        label: "Client Retention",
        description: "Long-term partnerships sustained through performance transparency and ROI focus"
      }
    ],
    services: [
      {
        title: "Search Engine Optimization (SEO)",
        slug: "search-engine-optimization",
        description: "Increase organic visibility and qualified traffic through technical, on-page, and content optimization programs informed by deep analytics.",
        features: [
          "Comprehensive technical audits",
          "Keyword research and intent mapping",
          "On-page optimization and content alignment",
          "Structured data implementation",
          "Authority building and digital PR",
          "Content gap analysis and briefs",
          "Core Web Vitals optimization",
          "Analytics, reporting, and dashboards"
        ],
        technologies: [
          "Google Search Console",
          "Google Analytics 4",
          "Ahrefs",
          "SEMrush",
          "Screaming Frog",
          "PageSpeed Insights",
          "Schema.org",
          "SurferSEO"
        ],
        methodology: [
          {
            phase: "Discovery & Baseline",
            description: "Audit technical health, benchmark competitors, and define KPI targets for organic growth"
          },
          {
            phase: "Strategy & Roadmap",
            description: "Prioritize initiatives across technical, content, and authority pillars with sprint-level plans"
          },
          {
            phase: "Implementation",
            description: "Deploy technical fixes, optimize templates, and launch curated content campaigns"
          },
          {
            phase: "Measurement & Iteration",
            description: "Track ranking lifts, conversion impact, and iterate backlog based on data insights"
          },
          {
            phase: "Enablement & Scale",
            description: "Transfer playbooks, train internal teams, and operationalize ongoing SEO excellence"
          }
        ],
        useCases: [
          "Enterprise website migrations",
          "E-commerce search growth",
          "Local and multi-location SEO",
          "B2B lead generation programs",
          "SaaS product launches",
          "Content hub development",
          "Reputation management",
          "International SEO expansion"
        ],
        benefits: [
          "Higher organic visibility",
          "Sustained traffic growth",
          "Improved lead quality",
          "Reduced acquisition costs",
          "Faster search indexation",
          "Actionable performance insights",
          "Scalable SEO operations"
        ]
      },
      {
        title: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Grow brand affinity and conversion readiness with omnichannel social programs powered by creative storytelling and performance data.",
        features: [
          "Audience persona development",
          "Channel-specific content playbooks",
          "Creative asset production",
          "Paid and organic campaign orchestration",
          "Community management workflows",
          "Influencer and partner collaborations",
          "Real-time social listening",
          "Performance reporting and analytics"
        ],
        technologies: [
          "Meta Business Suite",
          "LinkedIn Campaign Manager",
          "TikTok Ads Manager",
          "X Ads",
          "Hootsuite",
          "Sprout Social",
          "Canva",
          "Brandwatch"
        ],
        methodology: [
          {
            phase: "Insight & Planning",
            description: "Analyze audience behaviors, audit existing channels, and define campaign objectives"
          },
          {
            phase: "Content & Creative",
            description: "Build storytelling frameworks, asset calendars, and paid media concepts mapped to KPIs"
          },
          {
            phase: "Activation",
            description: "Launch campaigns across prioritized networks with agile optimization cadences"
          },
          {
            phase: "Engagement & Listening",
            description: "Manage communities, monitor sentiment, and surface feedback for continuous enhancement"
          },
          {
            phase: "Reporting & Optimization",
            description: "Deliver insight-rich dashboards, attribute impact, and evolve strategy based on results"
          }
        ],
        useCases: [
          "Product and feature launches",
          "Employer branding initiatives",
          "Demand generation campaigns",
          "Executive thought leadership",
          "Community building programs",
          "Event amplification",
          "Customer success storytelling",
          "Crisis communications support"
        ],
        benefits: [
          "Expanded brand reach",
          "Higher engagement rates",
          "Improved lead nurturing",
          "Stronger community advocacy",
          "Data-backed creative decisions",
          "Consistent cross-channel voice",
          "Increased marketing ROI"
        ]
      }
    ]
  },
  {
    title: "Legacy Application Modernization",
    slug: "legacy-application-modernization",
    icon: RefreshCw,
    description: "Reinvent legacy estates into resilient, secure, and cloud-ready platforms that accelerate delivery while preserving mission-critical business logic.",
    highlights: [
      {
        stat: "200+",
        label: "Modernization Programs",
        description: "Large-scale legacy platforms transformed into cloud-native architectures since 2018"
      },
      {
        stat: "75%",
        label: "Release Cycle Acceleration",
        description: "Average reduction in release cadence achieved via modular refactoring and automation"
      },
      {
        stat: "99.5%",
        label: "Deployment Reliability",
        description: "Uptime maintained for mission-critical workloads during modernization journeys"
      }
    ],
    services: [
      {
        title: "Application Re-Engineering",
        slug: "application-re-engineering",
        description: "Revitalize legacy applications by refactoring core components into maintainable, high-performance services aligned with modern engineering standards.",
        features: [
          "Legacy codebase assessment",
          "Domain-driven decomposition",
          "Microservices and modular design",
          "Automated refactoring pipelines",
          "Test harness and regression suite creation",
          "API enablement and documentation",
          "Performance profiling and tuning",
          "CI/CD pipeline implementation"
        ],
        technologies: [
          ".NET 8",
          "Java Spring Boot",
          "Node.js",
          "Python FastAPI",
          "Docker",
          "Kubernetes",
          "Azure DevOps",
          "GitHub Actions"
        ],
        methodology: [
          {
            phase: "Current State Discovery",
            description: "Analyze architecture, dependencies, and technical debt to quantify modernization scope"
          },
          {
            phase: "Target Blueprint",
            description: "Define service boundaries, data strategy, and modernization backlog aligned to business goals"
          },
          {
            phase: "Incremental Refactoring",
            description: "Execute iterative modernization sprints with automated testing and observability"
          },
          {
            phase: "Quality Verification",
            description: "Validate functionality, performance, and resilience through layered testing"
          },
          {
            phase: "Transition & Support",
            description: "Deploy modernized components, train teams, and establish continuous improvement cycles"
          }
        ],
        useCases: [
          "Reviving core banking platforms",
          "Modernizing supply chain management systems",
          "Transforming manufacturing execution systems",
          "Upgrading government service portals",
          "Digitizing healthcare record platforms",
          "Enhancing travel reservation engines",
          "Rebuilding insurance policy administration",
          "Optimizing telecom billing suites"
        ],
        benefits: [
          "Improved code maintainability",
          "Higher deployment frequency",
          "Reduced operational risk",
          "Better developer productivity",
          "Future-ready architecture",
          "Enhanced performance",
          "Lower total cost of ownership"
        ]
      },
      {
        title: "Application Re-Architecture",
        slug: "application-re-architecture",
        description: "Design and implement modern architectural patterns that align legacy systems with cloud-native, scalable, and secure operating models.",
        features: [
          "Architecture health assessments",
          "Bounded context and domain modeling",
          "Microservices reference architectures",
          "Event-driven design patterns",
          "API gateway and service mesh strategy",
          "Resiliency and observability planning",
          "Security and compliance alignment",
          "Cloud-native governance frameworks"
        ],
        technologies: [
          "Event-Driven Architecture",
          "Apache Kafka",
          "RabbitMQ",
          "REST",
          "GraphQL",
          "Azure Well-Architected Framework",
          "AWS Well-Architected",
          "Terraform"
        ],
        methodology: [
          {
            phase: "Assessment & Vision",
            description: "Evaluate current architecture, pain points, and desired future state capabilities"
          },
          {
            phase: "Target Architecture Definition",
            description: "Model domain boundaries, integration patterns, and platform guardrails"
          },
          {
            phase: "Roadmap & Prioritization",
            description: "Sequence architectural change, migration waves, and enabling capabilities"
          },
          {
            phase: "Implementation",
            description: "Deploy architecture components with infrastructure-as-code and automated testing"
          },
          {
            phase: "Governance & Optimization",
            description: "Establish architectural runway, review boards, and continuous improvement processes"
          }
        ],
        useCases: [
          "Scaling fintech transaction processing",
          "Transforming public sector service delivery",
          "Modernizing airline reservation systems",
          "Re-architecting manufacturing ERP suites",
          "Building omnichannel retail experiences",
          "Replatforming telco mediation layers",
          "Digitizing insurance claims workflows",
          "Future-proofing logistics control towers"
        ],
        benefits: [
          "Cloud-ready architecture",
          "Elastic scalability",
          "Improved system resilience",
          "Streamlined integration",
          "Enhanced security posture",
          "Accelerated product delivery",
          "Strategic technology alignment"
        ]
      },
      {
        title: "Legacy Cloud Migration",
        slug: "legacy-cloud-migration",
        description: "Migrate mission-critical applications and data to cloud platforms with minimal disruption and maximum reliability.",
        features: [
          "Migration readiness assessment",
          "TCO and ROI business case",
          "Landing zone and network design",
          "Data migration strategy and tooling",
          "Wave-based migration execution",
          "Resiliency and DR implementation",
          "Security and compliance guardrails",
          "Cutover planning and hypercare"
        ],
        technologies: [
          "AWS Migration Hub",
          "Azure Migrate",
          "Google Cloud Migrate",
          "Terraform",
          "Ansible",
          "Kubernetes",
          "Azure SQL",
          "Amazon RDS"
        ],
        methodology: [
          {
            phase: "Strategy & Planning",
            description: "Assess portfolio, segment applications, and define migration pathways"
          },
          {
            phase: "Foundation Setup",
            description: "Provision secure landing zones, connectivity, and observability baselines"
          },
          {
            phase: "Migration Execution",
            description: "Run pilot waves, automate deploy pipelines, and harden environments"
          },
          {
            phase: "Validation & Optimization",
            description: "Benchmark performance, cost, and reliability to tune the target state"
          },
          {
            phase: "Operate & Enhance",
            description: "Establish cloud operations, guardrails, and continuous modernization backlog"
          }
        ],
        useCases: [
          "Mainframe workload offloading",
          "Datacenter exit programs",
          "Hybrid cloud operating models",
          "Global application consolidation",
          "Disaster recovery replatforming",
          "Data warehouse modernization",
          "Mission-critical ERP migration",
          "Compliance-driven infrastructure refresh"
        ],
        benefits: [
          "Reduced infrastructure costs",
          "Improved reliability",
          "Elastic scalability",
          "Accelerated delivery cycles",
          "Modern security posture",
          "Streamlined operations",
          "Business continuity assurance"
        ]
      },
      {
        title: "UI/UX Modernization",
        slug: "ui-ux-modernization",
        description: "Reimagine user experiences with intuitive interfaces, responsive design, and accessibility best practices tailored for modern platforms.",
        features: [
          "UX research and heuristic evaluation",
          "Design system creation",
          "Accessibility compliance remediation",
          "Responsive UI engineering",
          "Micro-interactions and motion design",
          "Performance optimization",
          "Progressive web app enablement",
          "Usability testing and feedback loops"
        ],
        technologies: [
          "Figma",
          "Storybook",
          "React",
          "Angular",
          "Vue.js",
          "Tailwind CSS",
          "Design Tokens",
          "Web Components"
        ],
        methodology: [
          {
            phase: "Research & Benchmarking",
            description: "Conduct user interviews, analytics reviews, and heuristic audits to identify experience gaps"
          },
          {
            phase: "Experience Strategy",
            description: "Define personas, journeys, and design principles aligned with business outcomes"
          },
          {
            phase: "Design & Prototype",
            description: "Craft component libraries, high-fidelity prototypes, and accessibility patterns"
          },
          {
            phase: "Implementation",
            description: "Build modular UI using modern frameworks with performance and quality guardrails"
          },
          {
            phase: "Validation & Launch",
            description: "Run usability testing, iterate with feedback, and guide rollout with change management"
          }
        ],
        useCases: [
          "Modernizing internal productivity tools",
          "Refreshing customer self-service portals",
          "Digitizing citizen services",
          "Enhancing e-commerce storefronts",
          "Reimagining analytics dashboards",
          "Improving partner enablement platforms",
          "Building design systems for scale",
          "Optimizing onboarding experiences"
        ],
        benefits: [
          "Improved user satisfaction",
          "Higher task completion rates",
          "Reduced support tickets",
          "Consistent brand experience",
          "Faster feature adoption",
          "Accessible digital products",
          "Increased conversion and retention"
        ]
      },
      {
        title: "API Integration",
        slug: "api-integration",
        description: "Unlock and extend legacy capabilities through secure, well-documented APIs that power modern channels and ecosystems.",
        features: [
          "API portfolio assessment",
          "Integration architecture design",
          "Gateway and security policy setup",
          "Adapter and connector development",
          "Event streaming and messaging",
          "Testing automation and mocking",
          "Developer portal and documentation",
          "Monitoring and lifecycle governance"
        ],
        technologies: [
          "Azure API Management",
          "Amazon API Gateway",
          "Kong",
          "MuleSoft",
          "REST",
          "GraphQL",
          "gRPC",
          "OAuth 2.0"
        ],
        methodology: [
          {
            phase: "Assessment & Use Case Prioritization",
            description: "Identify integration candidates, consumption models, and performance guardrails"
          },
          {
            phase: "Design & Standards",
            description: "Define API patterns, security policies, and documentation standards"
          },
          {
            phase: "Build & Test",
            description: "Implement APIs, connectors, and automated tests aligned with target SLAs"
          },
          {
            phase: "Publish & Enable",
            description: "Launch developer portal assets, onboarding guides, and sandbox environments"
          },
          {
            phase: "Monitor & Optimize",
            description: "Track consumption, enforce governance, and iterate on enhancements"
          }
        ],
        useCases: [
          "Partner ecosystem enablement",
          "Omnichannel customer experiences",
          "Legacy ERP integration",
          "Mobile app enablement",
          "Open banking compliance",
          "IoT data ingestion",
          "Platform monetization",
          "Analytics and reporting integration"
        ],
        benefits: [
          "Faster integration timelines",
          "Improved developer experience",
          "Secure data exchange",
          "Reusable service catalog",
          "Enhanced interoperability",
          "Future-proof connectivity",
          "Accelerated product innovation"
        ]
      },
      {
        title: "Maintenance Services",
        slug: "maintenance-services",
        description: "Ensure modernized applications remain stable, compliant, and continuously optimized through proactive managed services.",
        features: [
          "24/7 monitoring and incident response",
          "Service-level backed support",
          "Continuous performance tuning",
          "Security patching and compliance",
          "Backlog grooming and enhancements",
          "Automated regression testing",
          "Operational reporting and insights",
          "Release management and governance"
        ],
        technologies: [
          "ServiceNow",
          "Jira Service Management",
          "Dynatrace",
          "New Relic",
          "Azure Monitor",
          "Amazon CloudWatch",
          "PagerDuty",
          "Confluence"
        ],
        methodology: [
          {
            phase: "Onboarding & Knowledge Transfer",
            description: "Absorb functional context, runbooks, and SLAs to prepare support model"
          },
          {
            phase: "Stabilization",
            description: "Implement monitoring, automation, and incident workflows for steady operations"
          },
          {
            phase: "Optimization",
            description: "Continuously improve performance, security, and user experience based on KPIs"
          },
          {
            phase: "Innovation Backlog",
            description: "Prioritize enhancements, tech debt, and roadmap features with business stakeholders"
          },
          {
            phase: "Reporting & Governance",
            description: "Deliver operational insights, compliance updates, and strategic recommendations"
          }
        ],
        useCases: [
          "Post-modernization hypercare",
          "Run operations for re-platformed apps",
          "Security and compliance management",
          "Multi-region application support",
          "Continuous performance optimization",
          "End-user enablement and training",
          "Release and change management",
          "Cost optimization initiatives"
        ],
        benefits: [
          "Higher application availability",
          "Predictable support costs",
          "Improved user satisfaction",
          "Faster issue resolution",
          "Continuous improvement cadence",
          "Stronger security posture",
          "Strategic focus for internal teams"
        ]
      }
    ]
  },
  {
    title: "Web Development",
    slug: "web-development",
    icon: Globe,
    description: "Design and engineer high-performing web experiences that convert, scale, and evolve with your business objectives.",
    highlights: [
      {
        stat: "320+",
        label: "Launches Delivered",
        description: "Responsive websites and applications released for global brands across industries"
      },
      {
        stat: "98%",
        label: "Performance Scores",
        description: "Lighthouse benchmarks consistently above industry standards for speed and accessibility"
      },
      {
        stat: "40%",
        label: "Faster Iterations",
        description: "Component-driven design systems accelerating rollouts and experimentation"
      }
    ],
    services: [
      {
        title: "Website Design",
        slug: "website-design",
        description: "Craft visually compelling, user-centered web experiences grounded in brand strategy and accessibility principles.",
        features: [
          "Brand and UX discovery workshops",
          "Persona and journey mapping",
          "Information architecture design",
          "High-fidelity UI compositions",
          "Design system definition",
          "Interaction and motion guidelines",
          "Accessibility-first design standards",
          "Usability testing and validation"
        ],
        technologies: [
          "Figma",
          "Adobe XD",
          "Miro",
          "Zeplin",
          "Storybook",
          "Maze",
          "Design Tokens",
          "Lottie"
        ],
        methodology: [
          {
            phase: "Research & Insights",
            description: "Understand brand, audience, and competitive landscape to inform creative direction"
          },
          {
            phase: "Experience Strategy",
            description: "Define key journeys, content hierarchy, and design principles"
          },
          {
            phase: "Interface Design",
            description: "Produce responsive layouts, component libraries, and visual systems"
          },
          {
            phase: "Validation",
            description: "Test prototypes with target users and iterate based on evidence"
          },
          {
            phase: "Handover & Governance",
            description: "Document specifications, accessibility criteria, and evolution roadmap"
          }
        ],
        useCases: [
          "Corporate website redesigns",
          "E-commerce storefront refresh",
          "Product marketing sites",
          "Startup launch microsites",
          "Investor relations portals",
          "Higher education websites",
          "Healthcare information hubs",
          "Nonprofit storytelling platforms"
        ],
        benefits: [
          "Stronger brand perception",
          "Improved user engagement",
          "Higher conversion rates",
          "Accessible digital experiences",
          "Consistent design language",
          "Faster design-to-development handoff",
          "Evidence-backed creative decisions"
        ]
      },
      {
        title: "Web Application Development",
        slug: "web-application-development",
        description: "Build scalable, secure, and maintainable web applications optimized for performance and rapid iteration.",
        features: [
          "Full-stack architecture design",
          "Component-driven frontend engineering",
          "API and microservices integration",
          "Authentication and authorization",
          "Automated testing and QA",
          "Performance optimization",
          "Infrastructure as code",
          "CI/CD pipelines"
        ],
        technologies: [
          "React",
          "Next.js",
          "Node.js",
          "NestJS",
          "TypeScript",
          "GraphQL",
          "Tailwind CSS",
          "Vite"
        ],
        methodology: [
          {
            phase: "Discovery & Planning",
            description: "Gather requirements, map architecture, and define product backlog"
          },
          {
            phase: "Architecture & Setup",
            description: "Establish application scaffolding, development standards, and automation"
          },
          {
            phase: "Incremental Delivery",
            description: "Develop features in agile sprints with continuous integration and testing"
          },
          {
            phase: "Hardening & Launch",
            description: "Conduct performance, security, and user acceptance testing prior to release"
          },
          {
            phase: "Operate & Optimize",
            description: "Monitor usage, collect feedback, and iterate on product roadmap"
          }
        ],
        useCases: [
          "Customer self-service portals",
          "Subscription SaaS platforms",
          "B2B partner extranets",
          "Internal workflow automation",
          "Data visualization dashboards",
          "Marketplace applications",
          "Knowledge management systems",
          "Regulatory compliance portals"
        ],
        benefits: [
          "Rapid product iteration",
          "Robust security posture",
          "Optimized performance",
          "Future-proof architecture",
          "Seamless third-party integrations",
          "Improved developer velocity",
          "Actionable telemetry and insights"
        ]
      },
      {
        title: "Website Maintenance and Support",
        slug: "website-maintenance-support",
        description: "Keep digital properties secure, performant, and up to date through proactive maintenance and enhancement programs.",
        features: [
          "24/7 monitoring and alerting",
          "Security patching and hardening",
          "Content and CMS updates",
          "Backup and disaster recovery",
          "Performance optimization",
          "SEO and analytics tuning",
          "A/B testing and experimentation",
          "Roadmap enhancement sprints"
        ],
        technologies: [
          "Datadog",
          "Azure Monitor",
          "Amazon CloudWatch",
          "Cloudflare",
          "GitHub Actions",
          "Contentful",
          "WordPress",
          "Google Analytics 4"
        ],
        methodology: [
          {
            phase: "Onboarding & Audit",
            description: "Review codebase, infrastructure, and analytics to establish baselines"
          },
          {
            phase: "Stabilization",
            description: "Implement monitoring, SLAs, and incident workflows"
          },
          {
            phase: "Optimization",
            description: "Continuously enhance performance, security, and search visibility"
          },
          {
            phase: "Experimentation",
            description: "Run conversion experiments and UX improvements"
          },
          {
            phase: "Reporting & Governance",
            description: "Provide clear dashboards, roadmap recommendations, and quarterly planning"
          }
        ],
        useCases: [
          "Managed corporate websites",
          "Compliance-driven portals",
          "Demand generation landing pages",
          "Investor relations microsites",
          "Content heavy publications",
          "Membership and community sites",
          "Franchise and multi-brand networks",
          "Campaign and event hubs"
        ],
        benefits: [
          "Improved site reliability",
          "Consistently fresh content",
          "Stronger security posture",
          "Faster page performance",
          "Better marketing agility",
          "Transparent reporting",
          "Predictable operating costs"
        ]
      },
      {
        title: "WordPress Development",
        slug: "wordpress-development",
        description: "Deliver flexible, enterprise-grade WordPress solutions with custom themes, plugins, and integrations.",
        features: [
          "Custom theme engineering",
          "Gutenberg block development",
          "Headless WordPress architectures",
          "Multisite configuration",
          "Performance and caching optimization",
          "Security hardening",
          "Marketing automation integrations",
          "Content editor enablement"
        ],
        technologies: [
          "WordPress",
          "WP Engine",
          "GraphQL",
          "Next.js",
          "Tailwind CSS",
          "Advanced Custom Fields",
          "WooCommerce",
          "ElasticPress"
        ],
        methodology: [
          {
            phase: "Discovery & Architecture",
            description: "Define content models, integration touchpoints, and hosting strategy"
          },
          {
            phase: "Design & Theming",
            description: "Create custom themes and design systems aligned to brand standards"
          },
          {
            phase: "Development",
            description: "Build reusable blocks, integrations, and editorial workflows"
          },
          {
            phase: "Quality Assurance",
            description: "Validate accessibility, security, and performance across devices"
          },
          {
            phase: "Launch & Enablement",
            description: "Deploy to production, train content teams, and provide playbooks"
          }
        ],
        useCases: [
          "Enterprise marketing sites",
          "Global brand platforms",
          "Media and publishing hubs",
          "Membership communities",
          "Event management portals",
          "Product documentation centers",
          "Education and course portals",
          "Nonprofit advocacy sites"
        ],
        benefits: [
          "Rapid content publishing",
          "Flexible integrations",
          "Optimized performance",
          "Enterprise security controls",
          "Content team autonomy",
          "Lower maintenance overhead",
          "Future-ready architecture"
        ]
      }
    ]
  },
  {
    title: "Mobile Application Development",
    slug: "mobile-application-development",
    icon: Smartphone,
    description: "Create intuitive, high-performing mobile experiences across Android, iOS, and cross-platform ecosystems with an emphasis on security and scale.",
    highlights: [
      {
        stat: "150+",
        label: "Mobile Releases",
        description: "Consumer and enterprise apps launched across app stores and internal app catalogs"
      },
      {
        stat: "4.8",
        label: "Avg. App Rating",
        description: "Consistently high user satisfaction driven by UX research and rigorous testing"
      },
      {
        stat: "65%",
        label: "Faster Feature Cycles",
        description: "Accelerated delivery enabled by modular architectures and automated delivery pipelines"
      }
    ],
    services: [
      {
        title: "Android Application Development",
        slug: "android-application-development",
        description: "Build robust native Android experiences that leverage the full capabilities of the Android ecosystem.",
        features: [
          "Product discovery and UX research",
          "Native Kotlin development",
          "Material Design 3 implementation",
          "Offline-first data synchronization",
          "Device and API level compatibility",
          "Secure authentication and encryption",
          "Automated UI and instrumentation testing",
          "Play Store publishing and monitoring"
        ],
        technologies: [
          "Kotlin",
          "Android Jetpack",
          "Compose",
          "Room",
          "Retrofit",
          "Firebase",
          "App Center",
          "SonarQube"
        ],
        methodology: [
          {
            phase: "Product Discovery",
            description: "Clarify product vision, user needs, and success metrics"
          },
          {
            phase: "Architecture & Design",
            description: "Define app architecture, UI flows, and technical foundations"
          },
          {
            phase: "Development",
            description: "Implement features iteratively with code reviews and continuous integration"
          },
          {
            phase: "Quality Assurance",
            description: "Execute functional, performance, and device matrix testing"
          },
          {
            phase: "Launch & Growth",
            description: "Deploy to Play Store, monitor analytics, and iterate on roadmap"
          }
        ],
        useCases: [
          "Consumer engagement apps",
          "Field service mobility",
          "Retail and loyalty programs",
          "Healthcare patient apps",
          "Banking and fintech solutions",
          "Media streaming experiences",
          "Connected device controllers",
          "Enterprise productivity apps"
        ],
        benefits: [
          "Native performance",
          "Rich device integrations",
          "Enhanced security",
          "Optimized user experience",
          "Scalable architecture",
          "Faster release cadence",
          "Data-driven product evolution"
        ]
      },
      {
        title: "iOS Application Development",
        slug: "ios-application-development",
        description: "Deliver premium iOS applications that align with Apple design principles and enterprise grade standards.",
        features: [
          "Swift and SwiftUI engineering",
          "Human Interface Guidelines compliance",
          "Secure entitlements and keychain management",
          "CoreData and Realm persistence",
          "App performance optimization",
          "Integration with Apple services",
          "Automated UI testing with XCTest",
          "App Store submission and review support"
        ],
        technologies: [
          "Swift",
          "SwiftUI",
          "Combine",
          "CoreData",
          "Realm",
          "TestFlight",
          "Firebase",
          "Fastlane"
        ],
        methodology: [
          {
            phase: "Ideation & Planning",
            description: "Define product scope, user journeys, and compliance requirements"
          },
          {
            phase: "Experience Design",
            description: "Produce pixel-perfect interfaces and interactions for Apple devices"
          },
          {
            phase: "Development",
            description: "Implement features with modular architecture and automated build pipelines"
          },
          {
            phase: "Validation",
            description: "Test across device matrix, accessibility criteria, and performance benchmarks"
          },
          {
            phase: "Release & Optimization",
            description: "Navigate App Store submission, monitor telemetry, and evolve roadmap"
          }
        ],
        useCases: [
          "Premium consumer apps",
          "Wealth management platforms",
          "Healthcare provider solutions",
          "Digital commerce applications",
          "Connected home ecosystems",
          "Travel and lifestyle apps",
          "Enterprise executive dashboards",
          "Education and learning apps"
        ],
        benefits: [
          "Delightful user experiences",
          "Enterprise-grade security",
          "High App Store ratings",
          "Robust analytics and insights",
          "Seamless Apple ecosystem integration",
          "Optimized performance",
          "Scalable codebase"
        ]
      },
      {
        title: "Cross-Platform App Development",
        slug: "cross-platform-app-development",
        description: "Ship mobile experiences faster with shared codebases while maintaining native performance and user expectations.",
        features: [
          "Shared design systems",
          "Reusable business logic",
          "Native module integration",
          "Offline-ready architecture",
          "Automated testing and deployment",
          "Performance profiling",
          "App store compliance",
          "Analytics and product insights"
        ],
        technologies: [
          "React Native",
          "Flutter",
          "Kotlin Multiplatform",
          "GraphQL",
          "Firebase",
          "Expo",
          "Detox",
          "App Center"
        ],
        methodology: [
          {
            phase: "Alignment & Feasibility",
            description: "Evaluate product fit for cross-platform delivery and define success metrics"
          },
          {
            phase: "Architecture & Setup",
            description: "Establish shared workflows, tooling, and CI/CD pipelines"
          },
          {
            phase: "Iterative Delivery",
            description: "Develop features in sprints with integrated QA and release automation"
          },
          {
            phase: "Stabilization",
            description: "Conduct performance tuning, device testing, and accessibility validation"
          },
          {
            phase: "Scale & Optimize",
            description: "Monitor metrics, evolve features, and roll out continuous improvements"
          }
        ],
        useCases: [
          "Startup MVP launches",
          "Retail omnichannel experiences",
          "Logistics and fleet management",
          "Healthcare teleconsultation",
          "Media and publishing apps",
          "Employee engagement platforms",
          "Smart device companion apps",
          "Financial wellness solutions"
        ],
        benefits: [
          "Accelerated time to market",
          "Lower development costs",
          "Consistent experiences",
          "Simplified maintenance",
          "Native-like performance",
          "Shared delivery pipeline",
          "Rich product analytics"
        ]
      }
    ]
  },
  {
    title: "Digital Transformation",
    slug: "digital-transformation",
    icon: Zap,
    description: "Guide end-to-end transformation programs that blend strategy, design, data, and technology to unlock measurable business outcomes.",
    highlights: [
      {
        stat: "90+",
        label: "Enterprise Programs",
        description: "Complex transformation initiatives delivered across regulated and high-growth industries"
      },
      {
        stat: "30%",
        label: "Revenue Impact",
        description: "Average revenue uplift recorded across multi-year engagements"
      },
      {
        stat: "12",
        label: "Industries Served",
        description: "Cross-industry playbooks spanning BFSI, healthcare, retail, energy, and manufacturing"
      }
    ],
    services: [
      {
        title: "Business Growth with Digital Transformation",
        slug: "business-growth-digital-transformation",
        description: "Align digital investments to growth objectives by crafting a unified transformation strategy and roadmap.",
        features: [
          "Transformation maturity assessment",
          "North Star vision and KPI definition",
          "Customer journey and experience mapping",
          "Process reimagination workshops",
          "Digital capability roadmap",
          "Investment and ROI modeling",
          "Operating model redesign",
          "Change management playbooks"
        ],
        technologies: [
          "Miro",
          "Power BI",
          "Tableau",
          "Lucidchart",
          "Salesforce",
          "Dynamics 365",
          "ServiceNow",
          "Workday"
        ],
        methodology: [
          {
            phase: "Assessment & Benchmarking",
            description: "Evaluate current state, market position, and growth levers"
          },
          {
            phase: "Vision & Strategy",
            description: "Co-create business vision, customer promise, and measurable goals"
          },
          {
            phase: "Roadmap & Investment Plan",
            description: "Prioritize initiatives, dependencies, and funding requirements"
          },
          {
            phase: "Execution Enablement",
            description: "Stand up governance, talent, and delivery models to execute roadmap"
          },
          {
            phase: "Value Realization",
            description: "Track benefits, measure KPIs, and adjust initiatives for sustained impact"
          }
        ],
        useCases: [
          "Revenue diversification initiatives",
          "Customer experience transformation",
          "Digital operating model rollout",
          "New product and service launch",
          "Partner ecosystem enablement",
          "Market expansion strategies",
          "Subscription business models",
          "Data monetization programs"
        ],
        benefits: [
          "Aligned stakeholders",
          "Clear transformation roadmap",
          "Measurable business outcomes",
          "Optimized investment decisions",
          "Faster time to value",
          "Scalable operating model",
          "Continuous improvement culture"
        ]
      },
      {
        title: "Cloud-Enabled Digital Transformation",
        slug: "cloud-enabled-digital-transformation",
        description: "Accelerate innovation and resiliency by adopting cloud-native platforms, automation, and modern delivery practices.",
        features: [
          "Cloud strategy and business case",
          "Target operating model design",
          "Hybrid and multi-cloud architecture",
          "Automation and infrastructure as code",
          "Security and compliance frameworks",
          "Cloud center of excellence setup",
          "FinOps and cost governance",
          "Talent enablement and training"
        ],
        technologies: [
          "Microsoft Azure",
          "Amazon Web Services",
          "Google Cloud Platform",
          "Terraform",
          "Pulumi",
          "Azure DevOps",
          "GitHub",
          "Jenkins"
        ],
        methodology: [
          {
            phase: "Strategy & Alignment",
            description: "Define cloud vision, guiding principles, and success metrics"
          },
          {
            phase: "Foundation & Governance",
            description: "Establish landing zones, security, and FinOps frameworks"
          },
          {
            phase: "Migration & Modernization",
            description: "Execute application and data modernization aligned with business priorities"
          },
          {
            phase: "Operate & Automate",
            description: "Implement DevSecOps practices, SRE guardrails, and observability"
          },
          {
            phase: "Innovation & Scale",
            description: "Enable product teams, incubate accelerators, and expand capabilities"
          }
        ],
        useCases: [
          "Data center consolidation",
          "Cloud-native product launch",
          "Regulatory compliant platforms",
          "Disaster recovery modernization",
          "Global collaboration hubs",
          "Factory of the future initiatives",
          "Connected customer ecosystems",
          "Automation of core processes"
        ],
        benefits: [
          "Modernized infrastructure",
          "Increased agility",
          "Improved security posture",
          "Optimized costs",
          "Faster experimentation",
          "Operational resilience",
          "Innovation at scale"
        ]
      },
      {
        title: "AI-Powered Digital Transformation",
        slug: "ai-powered-digital-transformation",
        description: "Embed artificial intelligence across the enterprise to automate decisions, personalize experiences, and unlock new business models.",
        features: [
          "AI opportunity discovery",
          "Data readiness assessment",
          "Responsible AI governance",
          "Model experimentation labs",
          "Production-grade MLOps",
          "AI product incubation",
          "Change management and training",
          "Value realization dashboards"
        ],
        technologies: [
          "Azure AI",
          "AWS SageMaker",
          "Google Vertex AI",
          "Databricks",
          "MLflow",
          "LangChain",
          "Power Platform",
          "Grafana"
        ],
        methodology: [
          {
            phase: "Vision & Governance",
            description: "Define responsible AI charter, guardrails, and business impact hypotheses"
          },
          {
            phase: "Data & Platform Enablement",
            description: "Prepare data pipelines, infrastructure, and security for AI workloads"
          },
          {
            phase: "Use Case Delivery",
            description: "Prototype, validate, and productize AI solutions with cross-functional squads"
          },
          {
            phase: "Operationalization",
            description: "Launch AI services with monitoring, feedback loops, and governance"
          },
          {
            phase: "Scale & Innovation",
            description: "Expand AI adoption across business units and incubate new revenue streams"
          }
        ],
        useCases: [
          "Hyper-personalized customer journeys",
          "Predictive supply chain planning",
          "AI-assisted operations",
          "Intelligent process automation",
          "Risk scoring and compliance",
          "Revenue forecasting",
          "AI-driven product innovation",
          "AI-powered knowledge management"
        ],
        benefits: [
          "Automated decision making",
          "Greater customer intimacy",
          "Operational efficiency",
          "New revenue opportunities",
          "Improved forecasting accuracy",
          "Scalable AI governance",
          "Continuous learning ecosystem"
        ]
      },
      {
        title: "Agile and DevOps Implementation",
        slug: "agile-devops-implementation",
        description: "Enable high-velocity product delivery through agile coaching, DevSecOps automation, and culture transformation.",
        features: [
          "Agile maturity assessments",
          "Scaled agile framework rollout",
          "Product operating model design",
          "DevSecOps toolchain enablement",
          "Continuous testing frameworks",
          "Value stream mapping",
          "Site reliability engineering",
          "Coaching and change management"
        ],
        technologies: [
          "Azure DevOps",
          "GitHub",
          "Jira Align",
          "Atlassian Jira",
          "ServiceNow",
          "Harness",
          "SonarQube",
          "PagerDuty"
        ],
        methodology: [
          {
            phase: "Assessment & Alignment",
            description: "Determine current delivery maturity and align leadership on change vision"
          },
          {
            phase: "Operating Model Design",
            description: "Create product-centric structures, governance, and metrics"
          },
          {
            phase: "Enablement & Tooling",
            description: "Implement automation, pipelines, and guardrails for continuous delivery"
          },
          {
            phase: "Coaching & Adoption",
            description: "Coach teams, embed new rituals, and reinforce agile behaviors"
          },
          {
            phase: "Continuous Improvement",
            description: "Measure flow, eliminate bottlenecks, and scale practices across the enterprise"
          }
        ],
        useCases: [
          "Scaled agile transformations",
          "DevOps toolchain modernization",
          "Platform engineering enablement",
          "Continuous compliance automation",
          "SRE program rollout",
          "Value stream optimization",
          "Digital product factory setup",
          "Innovation lab incubation"
        ],
        benefits: [
          "Accelerated delivery cycles",
          "Improved product quality",
          "Higher team autonomy",
          "Continuous compliance",
          "Increased developer happiness",
          "Transparent performance metrics",
          "Sustainable transformation momentum"
        ]
      }
    ]
  },
  {
    title: "AWS Services",
    slug: "aws-services",
    icon: Cloud,
    description: "Plan, build, and operate secure AWS environments that unlock innovation, cost efficiency, and resilience across your enterprise portfolio.",
    highlights: [
      {
        stat: "400+",
        label: "AWS Certifications",
        description: "Deep bench of certified architects, developers, data, and security specialists"
      },
      {
        stat: "30%",
        label: "Cost Savings",
        description: "Average infrastructure savings achieved through modernization and FinOps programs"
      },
      {
        stat: "24/7",
        label: "Managed Coverage",
        description: "Follow-the-sun operations supporting mission-critical AWS workloads"
      }
    ],
    services: [
      {
        title: "AWS Cloud Strategy & Advisory",
        slug: "aws-cloud-strategy-advisory",
        description: "Define AWS adoption strategies aligned with business priorities, risk posture, and financial objectives.",
        features: [
          "Cloud readiness assessment",
          "Portfolio discovery and prioritization",
          "Business case and TCO modeling",
          "Landing zone architecture",
          "Security and compliance strategy",
          "Operating model design",
          "Talent and skills roadmap",
          "Change management enablement"
        ],
        technologies: [
          "AWS Well-Architected Tool",
          "AWS Control Tower",
          "AWS Organizations",
          "AWS Security Hub",
          "CloudCheckr",
          "Terraform",
          "ServiceNow",
          "Power BI"
        ],
        methodology: [
          {
            phase: "Discovery & Assessment",
            description: "Analyze current landscape, workloads, and readiness for AWS adoption"
          },
          {
            phase: "Strategy & Vision",
            description: "Establish cloud objectives, guardrails, and financial goals"
          },
          {
            phase: "Roadmap & Business Case",
            description: "Prioritize initiatives, calculate ROI, and outline investment plan"
          },
          {
            phase: "Operating Model Design",
            description: "Define governance, processes, and teaming required for AWS adoption"
          },
          {
            phase: "Enablement",
            description: "Upskill teams, set up tooling, and prepare for execution"
          }
        ],
        useCases: [
          "Cloud-first operating model",
          "Regulated industry adoption",
          "Global expansion programs",
          "Innovation labs on AWS",
          "IT portfolio optimization",
          "Digital product incubation",
          "Business continuity planning",
          "Cloud skills transformation"
        ],
        benefits: [
          "Strategic AWS roadmap",
          "Optimized investment decisions",
          "Risk-aware planning",
          "Accelerated adoption",
          "Stronger stakeholder alignment",
          "Governed cloud operations",
          "Improved financial visibility"
        ]
      },
      {
        title: "AWS Infrastructure Modernization",
        slug: "aws-infrastructure-modernization",
        description: "Modernize infrastructure using AWS-native services, automation, and resilience best practices.",
        features: [
          "Landing zone implementation",
          "Network and security architecture",
          "Containerization and orchestration",
          "Serverless enablement",
          "Infrastructure as code",
          "Observability and logging",
          "Resiliency and DR automation",
          "Compliance and governance automation"
        ],
        technologies: [
          "Amazon EC2",
          "Amazon ECS",
          "Amazon EKS",
          "AWS Lambda",
          "AWS CloudFormation",
          "Terraform",
          "AWS WAF",
          "AWS CloudTrail"
        ],
        methodology: [
          {
            phase: "Assessment & Planning",
            description: "Inventory workloads, classify modernization patterns, and define migration plan"
          },
          {
            phase: "Foundation Setup",
            description: "Establish secure landing zones, networking, and automation guardrails"
          },
          {
            phase: "Modernization Sprints",
            description: "Refactor, replatform, or rehost workloads with automated pipelines"
          },
          {
            phase: "Validation",
            description: "Test performance, security, and resilience against success criteria"
          },
          {
            phase: "Operate & Handover",
            description: "Transition to operations teams with runbooks, monitoring, and governance"
          }
        ],
        useCases: [
          "Datacenter exit",
          "SAP on AWS",
          "Container platform rollout",
          "High-availability architectures",
          "Serverless modernization",
          "VDI on AWS",
          "Disaster recovery automation",
          "Edge and IoT deployments"
        ],
        benefits: [
          "Reduced infrastructure costs",
          "Improved scalability",
          "Enhanced security controls",
          "Automated operations",
          "Higher system resilience",
          "Accelerated provisioning",
          "Future-ready platform"
        ]
      },
      {
        title: "AWS Data and Analytics",
        slug: "aws-data-analytics",
        description: "Unlock data-driven decision making with modern analytics platforms, AI, and governed data pipelines on AWS.",
        features: [
          "Data lake and warehouse architecture",
          "Real-time data ingestion",
          "Analytics and BI enablement",
          "Machine learning platform setup",
          "Data quality and governance",
          "Self-service analytics portals",
          "Cost and performance optimization",
          "Data product lifecycle management"
        ],
        technologies: [
          "Amazon S3",
          "AWS Glue",
          "Amazon Redshift",
          "Amazon Athena",
          "Amazon Kinesis",
          "Amazon QuickSight",
          "AWS Lake Formation",
          "AWS SageMaker"
        ],
        methodology: [
          {
            phase: "Strategy & Use Case Prioritization",
            description: "Define data vision, analytics objectives, and value hypotheses"
          },
          {
            phase: "Platform Foundation",
            description: "Set up data lake, security, and governance structures"
          },
          {
            phase: "Data Product Delivery",
            description: "Ingest, model, and deliver analytics products aligned to business needs"
          },
          {
            phase: "AI & Advanced Analytics",
            description: "Operationalize machine learning and predictive capabilities"
          },
          {
            phase: "Adoption & Optimization",
            description: "Enable business users, monitor usage, and refine data products"
          }
        ],
        useCases: [
          "Customer 360 analytics",
          "Real-time operational dashboards",
          "Predictive maintenance",
          "Demand forecasting",
          "Fraud detection",
          "Personalization engines",
          "Regulatory reporting",
          "Marketing performance optimization"
        ],
        benefits: [
          "Unified data platform",
          "Trusted insights",
          "Accelerated analytics delivery",
          "Advanced AI capabilities",
          "Improved governance",
          "Scalable data operations",
          "Increased business agility"
        ]
      },
      {
        title: "AWS Managed Services & FinOps",
        slug: "aws-managed-services-finops",
        description: "Maintain high-performing AWS environments with proactive operations, automation, and continuous cost optimization.",
        features: [
          "24/7 monitoring and incident response",
          "SRE-driven operations",
          "Security and compliance management",
          "Patch and vulnerability management",
          "Cost optimization and FinOps",
          "Backup and disaster recovery",
          "Release and change management",
          "Executive reporting and insights"
        ],
        technologies: [
          "Amazon CloudWatch",
          "AWS Config",
          "AWS Systems Manager",
          "AWS Trusted Advisor",
          "Datadog",
          "PagerDuty",
          "CloudHealth",
          "Splunk"
        ],
        methodology: [
          {
            phase: "Onboarding & Baseline",
            description: "Absorb environment context, SLAs, and compliance requirements"
          },
          {
            phase: "Stabilization",
            description: "Implement monitoring, automation, and incident workflows"
          },
          {
            phase: "Optimization",
            description: "Continuously improve cost, performance, and security posture"
          },
          {
            phase: "Innovation Backlog",
            description: "Prioritize enhancements, automation, and business-driven initiatives"
          },
          {
            phase: "Reporting & Governance",
            description: "Provide dashboards, executive briefings, and compliance reports"
          }
        ],
        useCases: [
          "Managed AWS operations",
          "Cost optimization programs",
          "Compliance and security monitoring",
          "Global application support",
          "Disaster recovery management",
          "Platform uptime assurance",
          "Release governance",
          "Cloud spend transparency"
        ],
        benefits: [
          "Predictable operations",
          "Improved reliability",
          "Ongoing cost savings",
          "Stronger security posture",
          "Comprehensive visibility",
          "Faster incident resolution",
          "Freed internal capacity"
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