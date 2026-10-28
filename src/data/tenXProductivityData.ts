export interface TargetAudience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
  accent: string;
  badge: string;
  ctaText: string;
}

export interface LearningDomain {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  topics: string[];
  icon: string;
  color: string;
}

export interface FrameworkStage {
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyActions: string[];
  deliverable: string;
}

export interface TaskComparison {
  id: string;
  name: string;
  category: string;
  traditionalHours: number;
  aiAssistedMinutes: number;
  traditionalSteps: string[];
  aiAssistedSteps: string[];
  toolsUsed: string[];
  productivityMultiplier: string;
}

export interface AIProgramme {
  id: string;
  name: string;
  audienceLabel: string;
  audienceType: "school" | "university" | "professional" | "leadership" | "industry";
  tagline: string;
  description: string;
  learningOutcomes: string[];
  curriculumHighlights: string[];
  deliverables: string[];
  badge: string;
  image: string;
}

export interface BeyondTrainingStage {
  step: string;
  title: string;
  action: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface TransformationCapability {
  title: string;
  description: string;
  highlights: string[];
  iconName: string;
}

export interface Differentiator {
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  iconName: string;
}

/* ──────────────────────────────────────────────────────────
   1. AUDIENCES (Source: PDF Page 5)
────────────────────────────────────────────────────────── */
export const TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: "schools",
    title: "Schools",
    subtitle: "K-12 & High Schools",
    description:
      "Cultivating early AI curiosity, creative problem solving, and responsible digital citizenship for tomorrow's thinkers.",
    points: [
      "Early foundational exposure to AI concepts & ethics",
      "Creative project-based learning with safe AI tools",
      "Practical digital literacy for academic research",
      "Building future-ready, agile student mindsets",
    ],
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    accent: "from-amber-500/20 to-orange-500/10",
    badge: "Curiosity Today",
    ctaText: "Explore School Programmes",
  },
  {
    id: "universities",
    title: "Universities & Colleges",
    subtitle: "Higher Education Institutions",
    description:
      "Bridging the academic curriculum with industry-grade AI skills, live capstones, and portfolio-ready engineering experience.",
    points: [
      "Hands-on learning with generative AI, LLMs & computer vision",
      "Real-world capstone projects solving actual industry challenges",
      "Recognized professional certifications & skill transcripts",
      "Direct internship pathways and technology industry exposure",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    accent: "from-blue-600/20 to-cyan-500/10",
    badge: "Careers Tomorrow",
    ctaText: "Explore University Initiatives",
  },
  {
    id: "professionals",
    title: "Working Professionals",
    subtitle: "Individual Upskilling",
    description:
      "Equipping knowledge workers with practical AI assistants, workflow automations, and data intelligence to produce 10X outputs.",
    points: [
      "Work smarter and reduce manual drafting & analysis time",
      "Master modern AI tools for daily research, coding & communication",
      "Increase workplace output quality without burnout",
      "Stay ahead in your career as an AI-augmented professional",
    ],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    accent: "from-purple-600/20 to-indigo-500/10",
    badge: "Professional Growth",
    ctaText: "Explore Professional Track",
  },
  {
    id: "leadership",
    title: "Management & Leadership",
    subtitle: "Founders, CXOs & Department Heads",
    description:
      "Guiding leadership teams to formulate strategic AI roadmaps, evaluate high-ROI automation, and foster an AI-first culture.",
    points: [
      "Strategic AI adoption frameworks aligned with business KPIs",
      "Data-driven executive decision-making and forecasting",
      "Empathetic change management and responsible AI policies",
      "High-level oversight of generative AI risks and governance",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    accent: "from-emerald-600/20 to-teal-500/10",
    badge: "Smarter Decisions",
    ctaText: "Explore Leadership Briefing",
  },
  {
    id: "industries",
    title: "Industries & Enterprises",
    subtitle: "Corporate Workforce Transformation",
    description:
      "Transforming entire enterprise workforces with department-specific AI training, workflow redesign, and custom AI implementations.",
    points: [
      "Cross-departmental AI literacy and role-specific workflows",
      "Process bottleneck discovery and robotic/AI automation",
      "Measurable operational efficiency and clear ROI tracking",
      "End-to-end integration with enterprise systems and ERPs",
    ],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    accent: "from-rose-600/20 to-red-500/10",
    badge: "Stronger Organisations",
    ctaText: "Explore Enterprise Solutions",
  },
];

/* ──────────────────────────────────────────────────────────
   2. AI LEARNING DOMAINS (Source: PDF Page 6)
────────────────────────────────────────────────────────── */
export const LEARNING_DOMAINS: LearningDomain[] = [
  {
    id: "domain-productivity",
    number: "01",
    title: "AI Productivity",
    tagline: "Work Smarter. Get More Done.",
    description:
      "Master everyday AI assistants, structured prompting, and personal automation frameworks to streamline communications, writing, and research.",
    topics: [
      "ChatGPT, Claude & Perplexity workflows",
      "Advanced prompt engineering principles",
      "AI research & information synthesis",
      "AI writing for emails, reports & proposals",
      "Executive presentations with AI slide decks",
      "Rapid data analysis & spreadsheet intelligence",
      "Personal productivity systems & task scheduling",
      "AI automation for repetitive daily routines",
    ],
    icon: "Zap",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "domain-genai",
    number: "02",
    title: "Generative AI",
    tagline: "Create. Innovate. Build.",
    description:
      "Explore the architecture of Large Language Models, autonomous agentic workflows, Retrieval-Augmented Generation (RAG), and multi-modal content creation.",
    topics: [
      "LLMs, context windows & token mechanics",
      "AI agents & multi-agent collaborative systems",
      "RAG (Retrieval-Augmented Generation) pipelines",
      "Multi-modal generation (Text, Image, Audio, Video)",
      "Knowledge assistants on private enterprise documents",
      "Custom business AI workflows & tool integration",
      "Multilingual translation and localized communications",
      "Deploying practical GenAI web applications",
    ],
    icon: "Sparkles",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "domain-developers",
    number: "03",
    title: "AI for Developers",
    tagline: "Build Faster. Code Smarter.",
    description:
      "Supercharge software development with AI-driven pair programming, automated test generation, code refactoring, and AI API integration.",
    topics: [
      "AI-assisted coding with GitHub Copilot & Cursor",
      "Code generation, architecture design & refactoring",
      "Automated unit testing, debugging & error resolution",
      "Instant code documentation & legacy codebase indexing",
      "Building with OpenAI, Anthropic & Hugging Face APIs",
      "Full-stack web & mobile development with AI tooling",
      "CI/CD, deployment automation & Docker containerization",
      "Evaluating open-source vs closed-source model weights",
    ],
    icon: "Code2",
    color: "from-cyan-500 to-teal-500",
  },
  {
    id: "domain-business",
    number: "04",
    title: "AI for Business",
    tagline: "Insights. Efficiency. Growth.",
    description:
      "Apply AI directly to revenue operations, competitive market intelligence, automated customer service, financial forecasting, and HR talent workflows.",
    topics: [
      "Competitor intelligence & market trend extraction",
      "Content strategy & omnichannel marketing campaigns",
      "Automated sales qualification & personalized outreach",
      "Customer support chatbots & sentiment monitoring",
      "Financial report analysis & scenario modeling",
      "Operations process mapping & bottleneck eradication",
      "HR resume parsing, talent screening & onboarding",
      "Measuring ROI on AI tool investments",
    ],
    icon: "BarChart3",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "domain-education",
    number: "05",
    title: "AI for Education",
    tagline: "Learn Better. Teach Better.",
    description:
      "Empower educators and academic institutions with personalized student tutoring, interactive lesson creation, and automated grading assistance.",
    topics: [
      "Personalized adaptive learning journeys for students",
      "Academic research synthesis & citation formatting",
      "Automated lesson planning, quizzes & rubric generation",
      "Interactive multi-modal teaching materials",
      "Student project mentorship with AI code/writing assistants",
      "Curriculum enhancement for AI-era competencies",
      "Institutional policies on academic integrity & responsible AI",
      "Tools for educators to reclaim 10+ administrative hours/week",
    ],
    icon: "GraduationCap",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "domain-advanced",
    number: "06",
    title: "Advanced AI",
    tagline: "From Concepts to Real-World Solutions.",
    description:
      "Deep dive into production machine learning, deep neural networks, computer vision, natural language processing, and real-time edge AI inference.",
    topics: [
      "Machine Learning & Deep Learning architectures",
      "Computer Vision for object detection & tracking",
      "Natural Language Processing (NLP) & vector embeddings",
      "Data science pipelines, ETL & feature engineering",
      "Predictive modeling & operational time-series forecasting",
      "Edge AI optimization on embedded devices (Jetson, mobile)",
      "Model fine-tuning, quantization (LoRA, QLoRA) & evaluation",
      "Domain-specific AI solution deployment & MLOps",
    ],
    icon: "Cpu",
    color: "from-blue-600 to-indigo-600",
  },
];

export const ADDITIONAL_TOPICS = [
  "AI Ethics & Responsible Use",
  "AI Tools Mastery",
  "No-Code AI Solutions",
  "Workflow Automation",
  "AI for Entrepreneurship",
  "AI in Research & Innovation",
  "Industry Use Cases",
  "Real-World Projects & Internships",
];

/* ──────────────────────────────────────────────────────────
   3. THE 10X PRODUCTIVITY FRAMEWORK (Source: PDF Page 7)
────────────────────────────────────────────────────────── */
export const FRAMEWORK_STAGES: FrameworkStage[] = [
  {
    number: "01",
    title: "DISCOVER",
    tagline: "Identify where AI creates impact",
    description:
      "Thoroughly analyze existing manual processes, map team bottlenecks, and discover high-leverage workflows ripe for AI assistance.",
    keyActions: [
      "Understand current operational processes and time drains",
      "Identify pain points where workers spend hours on repetition",
      "Discover automation and AI enhancement opportunities",
      "Explore relevant AI use cases specific to your domain",
      "Define measurable goals, baseline metrics & expected outcomes",
    ],
    deliverable: "AI Opportunity Canvas & Workflow Audit Report",
  },
  {
    number: "02",
    title: "LEARN",
    tagline: "Master the right tools and techniques",
    description:
      "Provide practical, hands-on training to build genuine confidence. Move beyond theory with real exercises using state-of-the-art tools.",
    keyActions: [
      "Learn relevant, production-grade AI tools and platforms",
      "Hands-on interactive practice with guided exercises",
      "Master prompt engineering frameworks and system instructions",
      "Establish responsible and ethical AI guidelines",
      "Build confidence through real-time feedback and practice",
    ],
    deliverable: "Hands-on Proficiency & Custom Prompt Library",
  },
  {
    number: "03",
    title: "APPLY",
    tagline: "Use AI on real-world daily tasks",
    description:
      "Directly integrate AI into active assignments, projects, and work deliverables. Measure tangible time saved and quality improvements.",
    keyActions: [
      "Apply AI to daily job deliverables and live assignments",
      "Create high-quality outputs (reports, code, designs, pitches)",
      "Solve actual departmental or academic problems",
      "Use AI across diverse operational tasks",
      "Measure hours saved and output accuracy improvements",
    ],
    deliverable: "Live Output Deliverables & Time Savings Log",
  },
  {
    number: "04",
    title: "AUTOMATE",
    tagline: "Reduce repetitive manual effort",
    description:
      "Construct automated workflows connecting AI models with emails, spreadsheets, CRM, and databases to eliminate recurring manual overhead.",
    keyActions: [
      "Automate routine, rule-based data transfers and summaries",
      "Set up multi-step AI workflows and tool integrations",
      "Integrate AI agents for autonomous task execution",
      "Dramatically reduce manual copy-paste effort",
      "Increase departmental consistency, turnaround speed and quality",
    ],
    deliverable: "Multi-Step Automated AI Workflow Pipeline",
  },
  {
    number: "05",
    title: "SCALE",
    tagline: "Drive long-term organizational transformation",
    description:
      "Standardize winning AI workflows across pods, departments, or campuses. Train champions and institutionalize an AI-empowered culture.",
    keyActions: [
      "Roll out standardized workflows across multiple teams",
      "Standardize enterprise prompt templates and tool access",
      "Train internal AI champions and department leads",
      "Continuously monitor productivity gains and system ROI",
      "Drive long-term competitive advantage through AI agility",
    ],
    deliverable: "Institutional AI Playbook & Continuous Scaling Roadmap",
  },
];

/* ──────────────────────────────────────────────────────────
   4. ILLUSTRATIVE PRODUCTIVITY TRANSFORMATION (PDF Page 8)
────────────────────────────────────────────────────────── */
export const TASK_COMPARISONS: TaskComparison[] = [
  {
    id: "report",
    name: "Comprehensive Research Report Creation",
    category: "Knowledge & Analysis",
    traditionalHours: 8,
    aiAssistedMinutes: 45,
    traditionalSteps: [
      "Manual search across search engines, reading dozens of tabs (2h)",
      "Writing and drafting structure manually from blank page (2h)",
      "Analyzing data tables and manually plotting insights (2h)",
      "Formatting presentation slides and styling layout (2h)",
    ],
    aiAssistedSteps: [
      "AI research gathers, summarizes, and cross-references source data (10m)",
      "AI-assisted drafting outlines and generates structured initial draft (15m)",
      "AI analysis extracts key trends and outputs data visualizations (10m)",
      "AI formats clean presentation and executive summary (5m)",
      "Human review, expert verification, and final customization (5m)",
    ],
    toolsUsed: ["Perplexity / Claude", "ChatGPT Data Analysis", "Gamma / Slide AI"],
    productivityMultiplier: "10X faster",
  },
  {
    id: "data",
    name: "Complex Data Analysis & Trend Extraction",
    category: "Business Intelligence",
    traditionalHours: 6,
    aiAssistedMinutes: 30,
    traditionalSteps: [
      "Manual cleaning of messy CSV files and spreadsheet data (2h)",
      "Writing manual Excel VLOOKUPs, pivot tables, and formulas (2h)",
      "Interpreting trends and manually drafting observations (2h)",
    ],
    aiAssistedSteps: [
      "AI data interpreter cleans data and handles nulls instantly (5m)",
      "Automated statistical analysis and correlation discovery (10m)",
      "Visual chart generation and natural language insight synthesis (10m)",
      "Human review and domain-specific context addition (5m)",
    ],
    toolsUsed: ["Advanced Data Analysis", "Python AI Libraries", "Tableau AI"],
    productivityMultiplier: "12X faster",
  },
  {
    id: "presentation",
    name: "Executive Strategy Presentation Deck",
    category: "Communication",
    traditionalHours: 4,
    aiAssistedMinutes: 20,
    traditionalSteps: [
      "Outlining narrative slide by slide on scratchpad (1h)",
      "Searching for icons, images, and formatting slide layouts (1.5h)",
      "Drafting speaker notes and refining bullet points (1.5h)",
    ],
    aiAssistedSteps: [
      "AI outlines structured 12-slide narrative from raw notes (5m)",
      "Generates clean slide layouts, diagrams, and iconography (10m)",
      "Produces talking points, speaker notes, and executive takeaways (5m)",
    ],
    toolsUsed: ["Gamma App", "Tome", "Custom PowerPoint AI Prompts"],
    productivityMultiplier: "12X faster",
  },
  {
    id: "communication",
    name: "High-Volume Email & Stakeholder Communication",
    category: "Daily Operations",
    traditionalHours: 2,
    aiAssistedMinutes: 15,
    traditionalSteps: [
      "Reading dozens of incoming emails and prioritizing threads (45m)",
      "Drafting individual contextual responses from scratch (1h)",
      "Proofreading, tone checking, and formatting replies (15m)",
    ],
    aiAssistedSteps: [
      "AI summarizes email threads and highlights urgent action items (5m)",
      "Generates polite, tailored, contextual reply drafts (5m)",
      "Human quick review, adjustment, and one-click dispatch (5m)",
    ],
    toolsUsed: ["Superhuman AI", "Mail AI", "Custom System Prompts"],
    productivityMultiplier: "8X faster",
  },
];

/* ──────────────────────────────────────────────────────────
   5. OUR AI PROGRAMMES (Source: PDF Page 9)
────────────────────────────────────────────────────────── */
export const AI_PROGRAMMES: AIProgramme[] = [
  {
    id: "ai-explorer",
    name: "AI Explorer",
    audienceLabel: "For School Students",
    audienceType: "school",
    tagline: "Discover. Create. Be Future-Ready.",
    description:
      "A creative, highly engaging programme introducing younger learners to AI awareness, creative expression, prompt fundamentals, and ethical principles.",
    learningOutcomes: [
      "Understanding what AI is, how it works, and how to use it safely",
      "Creative storytelling, digital art, and ideation using safe AI tools",
      "Practical research skills for school projects and presentations",
      "Ethical understanding of digital privacy, misinformation, and responsible AI",
    ],
    curriculumHighlights: [
      "Module 1: The Magic of AI — From Games to Self-Driving Cars",
      "Module 2: Creative AI — Generating Stories, Art & Concept Music",
      "Module 3: The Smart Student — AI for Homework, Science & Coding Basics",
      "Module 4: Responsible AI — Fact-Checking, Privacy & Safe Digital Habits",
    ],
    deliverables: [
      "Interactive Student AI Portfolio",
      "Certificate of AI Awareness & Creativity",
      "Take-Home Family AI Guide",
    ],
    badge: "Foundation Track",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-career-accelerator",
    name: "AI Career Accelerator",
    audienceLabel: "For University Students",
    audienceType: "university",
    tagline: "Learn. Build. Apply. Get Ahead.",
    description:
      "An intensive industry-aligned programme preparing college students to build real AI applications, automate development workflows, and stand out in the modern job market.",
    learningOutcomes: [
      "Mastery of Generative AI, LLM APIs, and agentic frameworks",
      "10X coding productivity with AI development tools and refactoring",
      "Hands-on capstone project addressing real enterprise and social problems",
      "Foundations of Computer Vision, Machine Learning, and API deployment",
    ],
    curriculumHighlights: [
      "Module 1: Modern AI Landscape & Advanced Prompt Architecture",
      "Module 2: Building with LLMs, RAG & Multi-Modal APIs",
      "Module 3: AI-Assisted Full-Stack Development & Debugging",
      "Module 4: Real-World Industry Project, GitHub Showcase & Interview Readiness",
    ],
    deliverables: [
      "Production-Ready Capstone Project on GitHub",
      "Professional Certificate Co-Signed by Nirikshan AI",
      "Internship & Mentorship Access Pathways",
    ],
    badge: "Career Booster",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10x-professional",
    name: "10X Professional",
    audienceLabel: "For Working Professionals",
    audienceType: "professional",
    tagline: "Work Smarter. Deliver Greater.",
    description:
      "Designed for busy professionals across marketing, sales, software, finance, and operations seeking to compress full workdays into hours.",
    learningOutcomes: [
      "Compressing 8-hour research and drafting workloads into 45 minutes",
      "Mastering advanced data analysis, visualization, and scenario modeling",
      "Automating repetitive emails, meeting summaries, and follow-up trackers",
      "Personal workflow automation using AI assistants and no-code tools",
    ],
    curriculumHighlights: [
      "Sprint 1: The 10X Toolkit — Deep Dive into State-of-the-Art Assistants",
      "Sprint 2: Executive Communications, Proposals & Rapid Content Creation",
      "Sprint 3: Advanced Data Intelligence & Automated Visual Reporting",
      "Sprint 4: No-Code AI Workflows & Autonomous Personal Agents",
    ],
    deliverables: [
      "Custom Personal Productivity System & Prompt Vault",
      "Professional 10X AI Certification",
      "Access to Nirikshan AI Alumni Community & Resource Updates",
    ],
    badge: "High Performance",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-leadership",
    name: "AI Leadership",
    audienceLabel: "For Management & Leadership",
    audienceType: "leadership",
    tagline: "Strategise. Transform. Lead with AI.",
    description:
      "Strategic executive briefings and masterclasses empowering CXOs, directors, and managers to govern AI adoption, manage risk, and identify high-value automation opportunities.",
    learningOutcomes: [
      "Formulating a pragmatic enterprise AI roadmap aligned with business objectives",
      "Evaluating build vs buy decisions for proprietary AI solutions",
      "Establishing responsible AI governance, copyright safety, and data security",
      "Leading organizational change management and upskilling talent pools",
    ],
    curriculumHighlights: [
      "Session 1: The AI Paradigm Shift — Industry Benchmarks & Disruption Risks",
      "Session 2: The Enterprise AI Opportunity Matrix — Identifying High-ROI Use Cases",
      "Session 3: Data Readiness, Security, Governance & Compliance Safeguards",
      "Session 4: Scaling Culture — Transitioning From Isolated Experiments to Enterprise Value",
    ],
    deliverables: [
      "Executive AI Strategic Canvas for Your Organization",
      "Policy Templates for Enterprise Data Security & Responsible AI",
      "1-on-1 Strategic Consultation with Nirikshan AI Leadership",
    ],
    badge: "Executive Strategy",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-workforce-transformation",
    name: "AI Workforce Transformation",
    audienceLabel: "For Industries & Enterprises",
    audienceType: "industry",
    tagline: "Upskill. Automate. Scale.",
    description:
      "An end-to-end organizational transformation engagement combining departmental workforce upskilling, workflow audits, and customized AI automation rollouts.",
    learningOutcomes: [
      "Upskilling full departments (Sales, Marketing, HR, Finance, Operations)",
      "Standardizing corporate prompt templates and security compliance",
      "Direct workflow redesign to eliminate structural operational bottlenecks",
      "Measurable employee productivity gains and tangible bottom-line ROI",
    ],
    curriculumHighlights: [
      "Phase 1: Departmental Workflow Audit & AI Readiness Diagnostics",
      "Phase 2: Customized Role-Based AI Masterclasses for Team Pods",
      "Phase 3: Co-Building Internal AI Workflows & Automation Assistants",
      "Phase 4: Scaling, Continuous Coaching & Executive Impact Dashboards",
    ],
    deliverables: [
      "Departmental AI Standard Operating Procedures (SOPs)",
      "Turnkey Automated Workflows & Document Knowledge Assistants",
      "Quarterly Productivity Impact & ROI Audit Reports",
    ],
    badge: "Enterprise Scale",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
];

/* ──────────────────────────────────────────────────────────
   6. BEYOND TRAINING: ENTERPRISE TRANSFORMATION (PDF Page 12)
────────────────────────────────────────────────────────── */
export const BEYOND_TRAINING_STAGES: BeyondTrainingStage[] = [
  {
    step: "01",
    title: "TRAIN",
    action: "Upskill people in AI",
    description:
      "Conduct customized, role-based AI training programs with hands-on practice using real production tools.",
    deliverables: ["Role-based learning paths", "Hands-on tool practice", "Continuous learning support"],
    iconName: "GraduationCap",
  },
  {
    step: "02",
    title: "ASSESS",
    action: "Identify AI readiness",
    description:
      "Audit team skills, existing software systems, data readiness, and organizational bottlenecks.",
    deliverables: ["Skills & tools audit", "Strength & gap identification", "Prioritized AI roadmap"],
    iconName: "FileCheck",
  },
  {
    step: "03",
    title: "TRANSFORM",
    action: "Redesign core workflows",
    description:
      "Analyze end-to-end operational workflows and pinpoint exact stages where AI removes manual overhead.",
    deliverables: ["Process re-engineering", "Automation blueprint", "Efficiency target mapping"],
    iconName: "RefreshCw",
  },
  {
    step: "04",
    title: "IMPLEMENT",
    action: "Build AI-powered solutions",
    description:
      "Develop custom AI tools, integrate models into existing software/CRMs, and pilot solutions safely.",
    deliverables: ["Custom AI integration", "Pilot deployment", "Technical maintenance & support"],
    iconName: "Cpu",
  },
  {
    step: "05",
    title: "INNOVATE",
    action: "Develop new AI products",
    description:
      "Explore novel use cases, build functional prototypes/MVPs, and co-create industry-specific applications.",
    deliverables: ["R&D prototypes", "MVP co-development", "Domain-specific model training"],
    iconName: "Lightbulb",
  },
  {
    step: "06",
    title: "SCALE",
    action: "Expand across teams",
    description:
      "Standardize validated AI workflows across departments, monitor quantitative impact, and ensure long-term ROI.",
    deliverables: ["Enterprise-wide rollout", "Standardized toolchains", "Measurable ROI tracking"],
    iconName: "TrendingUp",
  },
];

export const TRANSFORMATION_CAPABILITIES: TransformationCapability[] = [
  {
    title: "AI Workflow Automation",
    description:
      "Connect disparate business software through automated AI pipelines that process, route, and resolve tasks 24/7.",
    highlights: ["Zapier/Make AI connectors", "Webhook data triggers", "Zero-code process bridges"],
    iconName: "Workflow",
  },
  {
    title: "Generative AI Integration",
    description:
      "Embed state-of-the-art language and vision models directly into your internal applications, portals, and customer touchpoints.",
    highlights: ["Custom LLM API connectors", "Fine-tuned domain models", "Secure data boundaries"],
    iconName: "Sparkles",
  },
  {
    title: "AI Assistants & Chatbots",
    description:
      "Deploy intelligent conversational agents trained on your private knowledge base for instant employee and customer support.",
    highlights: ["RAG vector document indexing", "Multi-channel deployment", "Human-in-the-loop escalations"],
    iconName: "Bot",
  },
  {
    title: "AI-Powered Reporting & Analytics",
    description:
      "Transform raw operational data into natural language executive summaries, automated anomaly alerts, and KPI forecasts.",
    highlights: ["Natural language SQL queries", "Automated weekly brief generation", "Predictive trend alerts"],
    iconName: "BarChart3",
  },
  {
    title: "Workforce AI Upskilling",
    description:
      "Equip teams across functions with continuous micro-learning modules to keep pace with rapid generative AI advances.",
    highlights: ["Role-specific prompt libraries", "Monthly tool updates", "Employee skill assessments"],
    iconName: "Users",
  },
  {
    title: "Advanced AI & Computer Vision",
    description:
      "Leverage Nirikshan AI's flagship visual intelligence models for workplace safety, inspection, and security integration.",
    highlights: ["PPE & hazard zone detection", "Inline defect inspection", "Industrial vehicle tracking"],
    iconName: "Eye",
  },
];

/* ──────────────────────────────────────────────────────────
   7. WHY NIRIKSHAN AI (Source: PDF Page 10)
────────────────────────────────────────────────────────── */
export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Training",
    subtitle: "Structured & Practical",
    description:
      "Structured, outcome-oriented programs designed for actionable competence, not abstract academic theory.",
    bulletPoints: ["Role-specific curricula", "Hands-on guided practice", "Beginner to advanced tracks"],
    iconName: "GraduationCap",
  },
  {
    title: "Real Projects",
    subtitle: "Portfolio-Ready Experience",
    description:
      "Learners solve actual industry challenges using live data and produce verifiable project portfolios.",
    bulletPoints: ["Real enterprise datasets", "GitHub-ready capstones", "Mentorship from practitioners"],
    iconName: "Briefcase",
  },
  {
    title: "AI Technology",
    subtitle: "State-of-the-Art Tooling",
    description:
      "Direct access and exposure to cutting-edge models, LLMs, computer vision engines, and enterprise frameworks.",
    bulletPoints: ["Generative AI & LLM tooling", "Edge vision infrastructure", "Low-code automation suites"],
    iconName: "Cpu",
  },
  {
    title: "Industry Exposure",
    subtitle: "Real-World Context",
    description:
      "Direct interactions with industry leaders, practical site use cases, and mentorship from engineering veterans.",
    bulletPoints: ["Guest practitioner sessions", "Real operational case studies", "Career pathway guidance"],
    iconName: "Building2",
  },
  {
    title: "Research & Innovation",
    subtitle: "Building the Next Frontier",
    description:
      "Encouraging exploratory prototypes, patent-worthy applications, and original research in applied AI.",
    bulletPoints: ["Hackathon & innovation labs", "Prototype incubation", "Applied research publications"],
    iconName: "Lightbulb",
  },
];
