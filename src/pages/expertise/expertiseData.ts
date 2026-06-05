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