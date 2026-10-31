import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TenXEnquiryForm } from "@/components/productivity/TenXEnquiryForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  Compass,
  Laptop,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
  Brain,
  Zap,
  Code2,
  BarChart3,
  Cpu,
  BookOpen,
  ArrowUpRight,
  Terminal,
  Activity,
  ShieldCheck,
  Check,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   1. MAJOR TRAINING VERTICALS DATA
────────────────────────────────────────────────────────────── */
const verticals = [
  {
    number: "01",
    id: "schools",
    audienceLabel: "Schools & K-12",
    code: "VER_01 // K12_CURRICULUM",
    heading: "Inspiring the Next Generation of AI Innovators.",
    shortDesc:
      "Introducing young minds to Artificial Intelligence through creative, interactive, and responsible AI learning. Tailored for CBSE, ICSE, and international school standards.",
    tags: ["AI Awareness", "Creative AI Learning", "Student Workshops", "Digital Ethics"],
    cta: "Configure School Programme",
    programmeName: "AI Explorer (Schools)",
    audienceType: "Schools",
    mainImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    stats: "Ages 10–18 // Hands-on projects & ethics-first curriculum",
    bulletPoints: [
      "Age-tailored interactive storytelling & prompt art workshops",
      "Demystifying AI, algorithms & safety guidelines for youth",
      "Teacher enablement & classroom AI integration toolkits",
    ],
  },
  {
    number: "02",
    id: "universities",
    audienceLabel: "Universities & Colleges",
    code: "VER_02 // HIGHER_ED_LABS",
    heading: "Bridging Academic Theory with Production AI Skills.",
    shortDesc:
      "Preparing engineering, BCA, MCA, and management students for high-demand AI industry roles through hands-on coding, live model training, and verified GitHub project portfolios.",
    tags: ["Student Bootcamps", "Faculty Development (FDP)", "Computer Vision", "RAG Pipelines"],
    cta: "Configure University MoU",
    programmeName: "AI Career Accelerator (Universities)",
    audienceType: "Universities & Colleges",
    mainImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    stats: "B.Tech & CS // Accredited modules & live hackathon bootcamps",
    bulletPoints: [
      "Credit-aligned AI modules in Computer Vision, LLMs & RAG",
      "Faculty Development Programmes (FDP) on contemporary toolstacks",
      "Real industry capstones with deployment-ready GitHub portfolios",
    ],
  },
  {
    number: "03",
    id: "corporates",
    audienceLabel: "Corporate & Enterprises",
    code: "VER_03 // WORKFORCE_AUTOMATION",
    heading: "Transforming Enterprise Workforces with Applied AI.",
    shortDesc:
      "Helping knowledge workers, managers, and CXOs deploy AI tools to eliminate administrative overhead, automate data extraction, and streamline multi-department operations.",
    tags: ["Corporate AI Workshops", "Executive Masterclasses", "Workflow Automation", "Zero PII Leakage"],
    cta: "Configure Corporate Sprint",
    programmeName: "10X Professional (Professionals)",
    audienceType: "Management & Leadership",
    mainImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    stats: "Enterprise // Measurable work hour savings & executive alignment",
    bulletPoints: [
      "Cross-departmental productivity automation sprints",
      "Executive governance, build-vs-buy models & zero data leakage",
      "Custom internal prompt vaults & safe multi-agent pipelines",
    ],
  },
  {
    number: "04",
    id: "industries",
    audienceLabel: "Industries & Manufacturing",
    code: "VER_04 // INDUSTRIAL_EDGE",
    heading: "Building AI-Ready Industrial & Shopfloor Operators.",
    shortDesc:
      "Equipping plant engineers, quality inspectors, and maintenance technicians with practical knowledge in computer vision, edge telemetry, and automated anomaly diagnostics.",
    tags: ["Industrial AI Training", "Edge Vision", "Plant Floor Automation", "SCADA Integration"],
    cta: "Configure Industrial Workshop",
    programmeName: "AI Workforce Transformation (Industries)",
    audienceType: "Industries & Enterprises",
    mainImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    accentImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    stats: "Industrial // On-site factory floor & edge vision enablement",
    bulletPoints: [
      "Shopfloor defect inspection & computer vision operator workshops",
      "Predictive maintenance & sensor telemetry automation training",
      "Empowering plant engineers with low-code AI diagnostic tools",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   2. WHAT WE TEACH (6 COMPACT TECHNICAL MODULES)
────────────────────────────────────────────────────────────── */
const teachingDomains = [
  {
    code: "MOD_01",
    title: "AI Productivity",
    tagline: "Work Smarter",
    desc: "Autonomous email synthesis, automated spreadsheet formulas, structured document triage, and calendar intelligence.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    icon: Zap,
  },
  {
    code: "MOD_02",
    title: "Generative AI",
    tagline: "Create with Intelligence",
    desc: "Prompt engineering, token economics, context window management, multimodality, and synthetic dataset drafting.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    icon: Brain,
  },
  {
    code: "MOD_03",
    title: "AI for Developers",
    tagline: "Build Faster",
    desc: "AI coding copilots, automated unit testing, RAG vector pipelines, and full-stack AI application deployment.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    icon: Code2,
  },
  {
    code: "MOD_04",
    title: "AI for Business",
    tagline: "Make Better Decisions",
    desc: "Executive decision frameworks, predictive forecasting, customer intelligence pipelines, and build-vs-buy ROI calculus.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    icon: BarChart3,
  },
  {
    code: "MOD_05",
    title: "AI for Education",
    tagline: "Teach and Learn Better",
    desc: "Curriculum co-design, automated grading assistants, adaptive personalized student tutoring, and research acceleration.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    icon: BookOpen,
  },
  {
    code: "MOD_06",
    title: "Advanced AI",
    tagline: "Explore What's Next",
    desc: "Edge computer vision (YOLO/TensorRT), autonomous agent workflows, local LLM quantization, and air-gapped deployments.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    icon: Cpu,
  },
];

/* ──────────────────────────────────────────────────────────────
   3. OUR TRAINING EXPERIENCE (8 REAL TRAINING ENVIRONMENTS)
────────────────────────────────────────────────────────────── */
const experienceGallery = [
  {
    title: "Expert-Led Classroom Sessions",
    caption: "Deep conceptual clarity paired with live interactive walkthroughs and architectural breakdowns.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    category: "CLASSROOM",
    code: "ENV_01",
  },
  {
    title: "Hands-On Computer Lab Training",
    caption: "Every learner writes, tests, and validates AI tools at their own terminal station.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    category: "LABS",
    code: "ENV_02",
  },
  {
    title: "Live AI Tool Demonstrations",
    caption: "Real-time demonstration of prompt techniques, model inference, and RAG retrieval pipelines.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    category: "WORKSHOPS",
    code: "ENV_03",
  },
  {
    title: "Group Projects & Collaboration",
    caption: "Cross-functional student and professional squads co-creating deployable solutions.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    category: "COLLABORATION",
    code: "ENV_04",
  },
  {
    title: "Student Capstone Presentations",
    caption: "Learners present their AI prototypes to industry practitioners and receive structured engineering feedback.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    category: "SHOWCASE",
    code: "ENV_05",
  },
  {
    title: "Corporate AI Workshops",
    caption: "Empowering business analysts, managers, and operational teams to automate friction.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    category: "ENTERPRISE",
    code: "ENV_06",
  },
  {
    title: "Faculty Development Sessions (FDP)",
    caption: "Upskilling educators and professors to deliver modern, industry-aligned AI syllabi.",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80",
    category: "ACADEMIC",
    code: "ENV_07",
  },
  {
    title: "Industry Technical Demos",
    caption: "Demonstrating edge hardware, smart vision relays, and plant floor anomaly intelligence.",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    category: "INDUSTRY",
    code: "ENV_08",
  },
];

/* ──────────────────────────────────────────────────────────────
   4. SIGNATURE 10X 5-STAGE PROGRESSION
────────────────────────────────────────────────────────────── */
const fiveStages = [
  {
    step: "01",
    name: "DISCOVER",
    headline: "Identify High-Leverage AI Opportunities.",
    desc: "Map operational friction points, audit repetitive workflows, and pinpoint where modern foundation models yield immediate 10X efficiency.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "02",
    name: "LEARN",
    headline: "Master Production Toolchains & Foundations.",
    desc: "Hands-on guided terminal labs covering token economics, prompt architectures, embedding spaces, and computer vision backbones.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "03",
    name: "APPLY",
    headline: "Build Live Capstones on Real Data.",
    desc: "Learners immediately execute active assignments — developing live RAG bots, vision inspection prototypes, or executive dashboards.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "04",
    name: "AUTOMATE",
    headline: "Deploy Autonomous Operational Pipelines.",
    desc: "Connect models directly to document queues, ERP/CRM databases, and edge cameras with deterministic safety verification gates.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "05",
    name: "SCALE",
    headline: "Institutionalize Knowledge & Governance.",
    desc: "Establish reusable prompt repositories, data privacy compliance guardrails, and certify internal champion practitioners.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  },
];

/* ──────────────────────────────────────────────────────────────
   5. FIVE TRAINING PROGRAMMES TILES
────────────────────────────────────────────────────────────── */
const programmes = [
  {
    id: "prog-schools",
    name: "AI Explorer",
    target: "School Students",
    badge: "K-12 & HIGH SCHOOL",
    code: "PROG_01",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    description:
      "Foundational workshops introducing school students to AI concepts, creative storytelling, digital safety, and future technology habits through hands-on fun.",
    highlights: ["Interactive AI storytelling", "Prompt art & creativity", "Digital ethics & safety"],
    formInterest: "AI Explorer (Schools)",
    formAudience: "Schools",
  },
  {
    id: "prog-university",
    name: "AI Career Accelerator",
    target: "University Students",
    badge: "HIGHER EDUCATION",
    code: "PROG_02",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    description:
      "Intensive student bootcamps bridging academia and industry with real-world computer vision, generative AI apps, RAG pipelines, and verified GitHub project portfolios.",
    highlights: ["RAG & vector assistants", "Computer vision with OpenCV", "Verified capstone portfolio"],
    formInterest: "AI Career Accelerator (Universities)",
    formAudience: "Universities & Colleges",
  },
  {
    id: "prog-pro",
    name: "10X Professional",
    target: "Working Professionals",
    badge: "CORPORATE UPSKILLING",
    code: "PROG_03",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    description:
      "Accelerated training for working knowledge workers to automate document drafting, data extraction, presentation synthesis, and day-to-day workflow friction.",
    highlights: ["Advanced prompt frameworks", "Spreadsheet & data intelligence", "Automated document triage"],
    formInterest: "10X Professional (Professionals)",
    formAudience: "Working Professionals",
  },
  {
    id: "prog-leadership",
    name: "AI Leadership",
    target: "Management Teams",
    badge: "CXO & DIRECTORS",
    code: "PROG_04",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    description:
      "Strategic masterclasses designed for business leaders to evaluate AI adoption roadmaps, govern organizational data security, and make smart build-vs-buy decisions.",
    highlights: ["AI adoption canvas", "Data governance & privacy", "ROI valuation models"],
    formInterest: "AI Leadership (Management)",
    formAudience: "Management & Leadership",
  },
  {
    id: "prog-industry",
    name: "AI Workforce Transformation",
    target: "Industries & Plants",
    badge: "TECHNICAL & MANUFACTURING",
    code: "PROG_05",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description:
      "End-to-end industrial upskilling tailored for manufacturing, logistics, and plant operations to adopt computer vision quality inspection and operational automation.",
    highlights: ["Vision inspection systems", "Telemetry & anomaly diagnostics", "Custom departmental pods"],
    formInterest: "AI Workforce Transformation (Industries)",
    formAudience: "Industries & Enterprises",
  },
];

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
export const TenXProductivity: React.FC = () => {
  const [prefilledProgramme, setPrefilledProgramme] = useState("");
  const [prefilledAudience, setPrefilledAudience] = useState("");
  const [activeModalProgramme, setActiveModalProgramme] = useState<typeof programmes[0] | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectVertical = (progName: string, audName: string) => {
    setPrefilledProgramme(progName);
    setPrefilledAudience(audName);
    scrollTo("contact-inquiry");
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-amber selection:text-white font-sans antialiased">
      <SEO
        title="10X AI Productivity & Workforce Enablement | Nirikshan AI"
        description="Practical hands-on Artificial Intelligence training, university MoUs, faculty development, and enterprise workflow automation with Nirikshan AI."
        keywords="AI Training India, 10X AI Productivity, Corporate AI Workshops, University AI Bootcamps, School AI Workshops, Nirikshan AI Enablement"
        canonicalUrl="https://nirikshanai.com/10x-ai-productivity"
      />
      <Navigation />

      <main className="relative">
        {/* ══════════════════════════════════════════════════════
            0. TOP TELEMETRY BAR
        ══════════════════════════════════════════════════════ */}
        <div className="bg-techlight/80 dark:bg-charcoal-surface border-b border-concrete/30 dark:border-charcoal-border py-2 text-[11px] font-mono tracking-widest text-charcoal/70 dark:text-ivory/70 pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-sage rounded-full animate-pulse" />
              <span className="font-bold text-charcoal dark:text-ivory">INITIATIVE // 10X AI PRODUCTIVITY</span>
              <span className="text-concrete/40 dark:text-charcoal-border">|</span>
              <span className="text-concrete">ACADEMIC &amp; WORKFORCE ENABLEMENT</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-concrete">
              <span>STATUS: 10,000+ LEARNERS</span>
              <span>•</span>
              <span>CURRICULUM: NEP 2020 &amp; INDUSTRY 4.0</span>
              <span>•</span>
              <span className="text-amber font-semibold">COHORTS OPEN</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            1. HERO SECTION — EDITORIAL BRUTALIST
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-16 lg:py-24 border-b border-concrete/30 dark:border-charcoal-border bg-ivory dark:bg-charcoal overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Breadcrumb + Tag */}
            <div className="flex items-center gap-2 font-mono text-xs text-concrete uppercase tracking-wider mb-6">
              <span>NIRIKSHAN AI</span>
              <span>/</span>
              <span>INITIATIVES</span>
              <span>/</span>
              <span className="text-sage font-bold">10X_PRODUCTIVITY</span>
            </div>

            {/* Split Screen Hero Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Editorial Headline & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-concrete/40 dark:border-charcoal-border bg-techlight/50 dark:bg-charcoal-surface font-mono text-[11px] uppercase tracking-wider text-charcoal dark:text-ivory">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  <span>NATIONAL AI READINESS MISSION</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal dark:text-ivory leading-[1.08]">
                  Making India AI-Ready.
                  <br />
                  <span className="italic font-normal text-concrete dark:text-concrete-light">
                    One Practical Skill
                  </span>{" "}
                  at a Time.
                </h1>

                <p className="text-base sm:text-lg text-charcoal/80 dark:text-ivory/80 font-sans leading-relaxed max-w-2xl">
                  Moving beyond theoretical slide decks. Nirikshan AI engineers immersive, code-first learning environments for schools, engineering colleges, enterprise teams, and industrial plants — equipping participants with tangible AI capabilities from foundation models to edge computer vision.
                </p>

                {/* Four Audience Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {[
                    { label: "01 SCHOOLS (K-12)", target: "schools" },
                    { label: "02 UNIVERSITIES", target: "universities" },
                    { label: "03 ENTERPRISES", target: "corporates" },
                    { label: "04 INDUSTRIES", target: "industries" },
                  ].map((aud) => (
                    <button
                      key={aud.label}
                      onClick={() => scrollTo("training-verticals")}
                      className="text-left p-2.5 border border-concrete/30 dark:border-charcoal-border bg-white/70 dark:bg-charcoal-surface font-mono text-[10px] tracking-wider text-charcoal/80 dark:text-ivory/80 hover:border-amber hover:text-amber transition-colors"
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <Button
                    size="lg"
                    onClick={() => scrollTo("programmes")}
                    className="rounded-none bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal hover:bg-amber dark:hover:bg-amber hover:text-white dark:hover:text-white font-mono text-xs uppercase tracking-wider px-8 py-6 transition-colors shadow-none flex items-center justify-center gap-2 group"
                  >
                    <span>EXPLORE PROGRAMMES</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollTo("contact-inquiry")}
                    className="rounded-none border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory hover:bg-concrete/20 dark:hover:bg-charcoal-surface font-mono text-xs uppercase tracking-wider px-8 py-6 transition-colors"
                  >
                    CONFIGURE COHORT
                  </Button>
                </div>
              </div>

              {/* Right Column: Technical Photo Showcase with HUD Telemetry */}
              <div className="lg:col-span-5 relative">
                <div className="border border-concrete/40 dark:border-charcoal-border bg-charcoal p-1 relative">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-charcoal">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"
                      alt="Nirikshan AI Enablement Lab"
                      className="w-full h-full object-cover grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />

                    {/* Reticle Brackets */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sage" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sage" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sage" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sage" />

                    {/* Telemetry Header */}
                    <div className="absolute top-3 left-8 right-8 flex items-center justify-between font-mono text-[9px] text-ivory/80 uppercase tracking-widest bg-charcoal/80 px-2 py-1 border border-concrete/20 backdrop-blur-sm">
                      <span className="flex items-center gap-1.5 text-sage">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-ping" />
                        SESSION // 084_ACTIVE
                      </span>
                      <span>IN-PERSON WORKSHOP</span>
                    </div>

                    {/* Bottom Telemetry HUD */}
                    <div className="absolute bottom-4 left-4 right-4 text-ivory space-y-1">
                      <div className="font-mono text-[10px] text-sage font-bold tracking-wider uppercase">
                        HANDS-ON COMPUTER LAB COHORT
                      </div>
                      <div className="font-serif text-lg font-bold leading-tight">
                        Real learners, live terminals, production problem-solving.
                      </div>
                      <div className="flex items-center justify-between font-mono text-[9px] text-concrete pt-1 border-t border-concrete/20">
                        <span>DEPT: CS / IT / MANAGEMENT</span>
                        <span>CAPSTONE: VERIFIED GITHUB REPO</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Card: Institutional Accreditation */}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="border border-concrete/30 dark:border-charcoal-border p-3 bg-white/70 dark:bg-charcoal-surface">
                    <div className="font-mono text-[10px] text-concrete uppercase tracking-wider">ALIGNMENT</div>
                    <div className="font-mono text-xs font-bold text-charcoal dark:text-ivory mt-0.5">NEP 2020 &amp; UGC</div>
                  </div>
                  <div className="border border-concrete/30 dark:border-charcoal-border p-3 bg-white/70 dark:bg-charcoal-surface">
                    <div className="font-mono text-[10px] text-concrete uppercase tracking-wider">LAB TOPOLOGY</div>
                    <div className="font-mono text-xs font-bold text-charcoal dark:text-ivory mt-0.5">1:1 Terminal Stations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brutalist 3-Column Metrics Strip */}
            <div className="mt-14 pt-10 border-t border-concrete/30 dark:border-charcoal-border grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-concrete/30 dark:border-charcoal-border p-6 bg-white/50 dark:bg-charcoal-surface">
                <div className="font-mono text-[10px] uppercase tracking-widest text-concrete mb-1">
                  METRIC_01 // REACH
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
                  10,000+
                </div>
                <div className="font-serif text-sm font-semibold text-charcoal dark:text-ivory mt-2">
                  Learners Upskilled Pan-India
                </div>
                <p className="text-xs text-concrete mt-1">
                  School students, university engineering graduates, and corporate professionals trained in modern AI workflows.
                </p>
              </div>

              <div className="border border-concrete/30 dark:border-charcoal-border p-6 bg-white/50 dark:bg-charcoal-surface">
                <div className="font-mono text-[10px] uppercase tracking-widest text-concrete mb-1">
                  METRIC_02 // ADOPTION
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
                  50+
                </div>
                <div className="font-serif text-sm font-semibold text-charcoal dark:text-ivory mt-2">
                  Institutions &amp; Enterprises
                </div>
                <p className="text-xs text-concrete mt-1">
                  Partner schools, universities, and industrial enterprises conducting structured hackathons &amp; MoUs.
                </p>
              </div>

              <div className="border border-concrete/30 dark:border-charcoal-border p-6 bg-white/50 dark:bg-charcoal-surface">
                <div className="font-mono text-[10px] uppercase tracking-widest text-concrete mb-1">
                  METRIC_03 // RIGOR
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-sage">
                  100%
                </div>
                <div className="font-serif text-sm font-semibold text-charcoal dark:text-ivory mt-2">
                  Hands-On Capstone Portfolios
                </div>
                <p className="text-xs text-concrete mt-1">
                  Every participant builds, runs, and demonstrates live AI applications rather than passively viewing lectures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. FOUR MAJOR TRAINING VERTICALS (THE CORE SECTION)
        ══════════════════════════════════════════════════════ */}
        <section id="training-verticals" className="py-20 lg:py-28 bg-techlight/30 dark:bg-charcoal-surface border-b border-concrete/30 dark:border-charcoal-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="border-b border-concrete/30 dark:border-charcoal-border pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-widest text-sage font-semibold uppercase">
                    SEC_02 // TARGETED ENABLEMENT VERTICALS
                  </span>
                  <span className="text-concrete/40 dark:text-charcoal-border font-mono">/</span>
                  <span className="font-mono text-xs text-concrete">FOUR DEDICATED TRACKS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory">
                  Tailored AI Learning Ecosystems.
                </h2>
              </div>
              <p className="font-sans text-sm text-concrete max-w-md">
                Customized curricula engineered specifically for the distinct operational goals of schools, universities, enterprise teams, and industrial shopfloors.
              </p>
            </div>

            {/* Verticals List with Staggered Editorial Layout */}
            <div className="space-y-16 lg:space-y-24">
              {verticals.map((vert, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div
                    key={vert.id}
                    className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal p-6 sm:p-10"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Photo Container */}
                      <div className={`lg:col-span-6 relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="relative border border-concrete/40 dark:border-charcoal-border bg-charcoal aspect-[16/10] overflow-hidden group">
                          <img
                            src={vert.mainImage}
                            alt={vert.heading}
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                          
                          {/* Corner Reticles */}
                          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-sage" />
                          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-sage" />

                          <div className="absolute top-4 left-4">
                            <span className="font-mono text-3xl sm:text-4xl font-bold text-white/30">
                              {vert.number}
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-4 right-4 text-white font-mono text-[10px] tracking-wider uppercase flex items-center justify-between">
                            <span className="text-sage">{vert.audienceLabel}</span>
                            <span className="text-concrete">{vert.stats}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className={`lg:col-span-6 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-amber">
                            {vert.code}
                          </span>
                          <span className="text-concrete/40 dark:text-charcoal-border font-mono">•</span>
                          <span className="font-mono text-[10px] text-concrete uppercase tracking-widest">
                            {vert.audienceLabel}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal dark:text-ivory leading-tight">
                          {vert.heading}
                        </h3>

                        <p className="text-sm sm:text-base text-charcoal/80 dark:text-ivory/80 leading-relaxed font-sans">
                          {vert.shortDesc}
                        </p>

                        {/* Bullet Points */}
                        <div className="space-y-2 pt-1 border-t border-concrete/20 dark:border-charcoal-border">
                          {vert.bulletPoints.map((pt) => (
                            <div key={pt} className="flex items-start gap-2.5 text-xs text-charcoal/80 dark:text-ivory/80">
                              <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {vert.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-concrete/30 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal-surface text-charcoal/70 dark:text-ivory/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-3">
                          <Button
                            onClick={() => handleSelectVertical(vert.programmeName, vert.audienceType)}
                            className="rounded-none bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal hover:bg-amber dark:hover:bg-amber hover:text-white dark:hover:text-white font-mono text-xs uppercase tracking-wider px-6 py-5 transition-colors shadow-none flex items-center gap-2 group"
                          >
                            <span>{vert.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            3. WHAT WE TEACH (6 COMPACT TECHNICAL MODULES)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-ivory dark:bg-charcoal border-b border-concrete/30 dark:border-charcoal-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="border-b border-concrete/30 dark:border-charcoal-border pb-8 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-widest text-sage font-semibold uppercase">
                    SEC_03 // CORE CURRICULUM ARCHITECTURE
                  </span>
                  <span className="text-concrete/40 dark:text-charcoal-border font-mono">/</span>
                  <span className="font-mono text-xs text-concrete">SIX PEDAGOGICAL DOMAINS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory">
                  What We Teach.
                </h2>
              </div>
              <p className="font-sans text-sm text-concrete max-w-md">
                Production AI engineering skills taught with hands-on practice, real toolchains, zero marketing filler, and verified technical outcomes.
              </p>
            </div>

            {/* 6 Modular Brutalist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachingDomains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <div
                    key={domain.code}
                    className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface p-6 flex flex-col justify-between group hover:border-amber transition-colors"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative h-40 border border-concrete/30 dark:border-charcoal-border overflow-hidden bg-charcoal mb-5">
                        <img
                          src={domain.image}
                          alt={domain.title}
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-charcoal/90 border border-concrete/20 font-mono text-[9px] text-sage font-bold uppercase tracking-wider">
                          {domain.code}
                        </div>
                        
                        <div className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white dark:bg-charcoal border border-concrete/30 flex items-center justify-center text-charcoal dark:text-ivory">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="font-mono text-[10px] text-amber font-semibold uppercase tracking-wider mb-1">
                        {domain.tagline}
                      </div>
                      <h4 className="font-serif text-xl font-bold text-charcoal dark:text-ivory mb-2">
                        {domain.title}
                      </h4>
                      <p className="text-xs text-charcoal/70 dark:text-ivory/70 leading-relaxed font-sans">
                        {domain.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between font-mono text-[10px] text-concrete">
                      <span>MODULE: ACCREDITED</span>
                      <span className="text-sage flex items-center gap-1">
                        PRACTICAL LAB <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. OUR TRAINING EXPERIENCE (IMAGE-LED GALLERY)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-techlight/30 dark:bg-charcoal-surface border-b border-concrete/30 dark:border-charcoal-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="border-b border-concrete/30 dark:border-charcoal-border pb-8 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-widest text-sage font-semibold uppercase">
                    SEC_04 // PHYSICAL &amp; VIRTUAL ENVIRONMENTS
                  </span>
                  <span className="text-concrete/40 dark:text-charcoal-border font-mono">/</span>
                  <span className="font-mono text-xs text-concrete">FIELD EVIDENCE</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory">
                  Hands-On Learning In Action.
                </h2>
              </div>
              <p className="font-sans text-sm text-concrete max-w-md">
                Classroom lectures, dedicated 1:1 hardware terminal stations, executive sprints, and industrial floor testing.
              </p>
            </div>

            {/* Asymmetrical Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {experienceGallery.map((exp, idx) => (
                <div
                  key={exp.title}
                  className={`group relative border border-concrete/40 dark:border-charcoal-border bg-charcoal overflow-hidden ${
                    idx === 0 || idx === 7 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3] sm:aspect-square"
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                  
                  {/* Reticle Marker */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-charcoal/90 border border-concrete/30 font-mono text-[9px] text-ivory font-bold uppercase tracking-wider">
                    {exp.code} // {exp.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-ivory">
                    <h4 className="font-serif text-sm sm:text-base font-bold leading-snug">
                      {exp.title}
                    </h4>
                    <p className="font-sans text-[11px] text-concrete-light mt-1 line-clamp-2">
                      {exp.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            5. SIGNATURE 10X INITIATIVE (5 STAGES)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-ivory dark:bg-charcoal border-b border-concrete/30 dark:border-charcoal-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="border-b border-concrete/30 dark:border-charcoal-border pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-widest text-sage font-semibold uppercase">
                    SEC_05 // METHODOLOGICAL ROADMAP
                  </span>
                  <span className="text-concrete/40 dark:text-charcoal-border font-mono">/</span>
                  <span className="font-mono text-xs text-concrete">FIVE REPEATABLE STAGES</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory">
                  From Awareness to 10X Output.
                </h2>
              </div>
              <p className="font-sans text-sm text-concrete max-w-md">
                Our proven engineering progression takes participants from basic discovery to automated production pipelines.
              </p>
            </div>

            {/* 5 Connected Stages Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {fiveStages.map((stg, idx) => (
                <div
                  key={stg.step}
                  className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface p-5 flex flex-col justify-between group hover:border-amber transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-concrete/20 dark:border-charcoal-border pb-3 mb-4">
                      <span className="font-mono text-xs font-bold text-amber">
                        STAGE // {stg.step}
                      </span>
                      {idx < 4 && (
                        <ArrowRight className="w-3.5 h-3.5 text-concrete hidden lg:block" />
                      )}
                    </div>

                    <div className="relative h-28 border border-concrete/30 dark:border-charcoal-border overflow-hidden mb-4 bg-charcoal">
                      <img
                        src={stg.image}
                        alt={stg.name}
                        className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="font-mono text-[10px] text-sage font-bold tracking-wider uppercase mb-1">
                      {stg.name}
                    </div>
                    <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory mb-2">
                      {stg.headline}
                    </h4>
                    <p className="text-xs text-charcoal/70 dark:text-ivory/70 leading-relaxed font-sans">
                      {stg.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-concrete/20 dark:border-charcoal-border font-mono text-[9px] text-concrete">
                    PHASE COMPLETE CRITERIA VERIFIED
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            6. OUR TRAINING PROGRAMMES (5 TILES)
        ══════════════════════════════════════════════════════ */}
        <section id="programmes" className="py-20 lg:py-28 bg-techlight/30 dark:bg-charcoal-surface border-b border-concrete/30 dark:border-charcoal-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="border-b border-concrete/30 dark:border-charcoal-border pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-widest text-sage font-semibold uppercase">
                    SEC_06 // STANDARDIZED PROGRAMME CATALOGUE
                  </span>
                  <span className="text-concrete/40 dark:text-charcoal-border font-mono">/</span>
                  <span className="font-mono text-xs text-concrete">FIVE STRUCTURED TRACKS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory">
                  Explore Structured Programmes.
                </h2>
              </div>
              <p className="font-sans text-sm text-concrete max-w-md">
                Select a flagship programme to view detailed syllabus deliverables, prerequisites, and cohort scheduling options.
              </p>
            </div>

            {/* 5 Programme Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmes.map((prog, idx) => (
                <div
                  key={prog.id}
                  className={`border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal flex flex-col justify-between group hover:border-amber transition-colors ${
                    idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    {/* Visual Header */}
                    <div className="relative h-48 border-b border-concrete/30 dark:border-charcoal-border overflow-hidden bg-charcoal">
                      <img
                        src={prog.image}
                        alt={prog.name}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-charcoal/90 border border-concrete/30 font-mono text-[9px] text-sage font-bold uppercase tracking-wider">
                        {prog.code} // {prog.badge}
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="font-mono text-[10px] text-concrete-light uppercase tracking-wider">
                          TARGET: {prog.target}
                        </div>
                        <h3 className="font-serif text-xl font-bold leading-tight">
                          {prog.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs sm:text-sm text-charcoal/80 dark:text-ivory/80 leading-relaxed font-sans">
                        {prog.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-concrete/20 dark:border-charcoal-border">
                        {prog.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-charcoal/80 dark:text-ivory/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tile CTA */}
                  <div className="p-6 pt-0">
                    <Button
                      onClick={() => setActiveModalProgramme(prog)}
                      className="w-full rounded-none border border-concrete/40 dark:border-charcoal-border bg-techlight/50 dark:bg-charcoal-surface text-charcoal dark:text-ivory hover:bg-amber dark:hover:bg-amber hover:text-white dark:hover:text-white font-mono text-xs uppercase tracking-wider py-5 transition-colors shadow-none flex items-center justify-between"
                    >
                      <span>INSPECT PROGRAMME SPEC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            7. DARK TECHNICAL SECTION — ACCELERATION CALL
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 bg-charcoal text-ivory border-b border-concrete/30 dark:border-charcoal-border relative overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-concrete/30 bg-charcoal-surface font-mono text-[11px] text-sage uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              <span>COHORT ONBOARDING // 2025–2026</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Ready to Upgrade Your Institution's AI Capabilities?
            </h2>

            <p className="font-sans text-base sm:text-lg text-concrete-light max-w-2xl mx-auto leading-relaxed">
              Whether you are a university dean looking for credit-aligned AI bootcamps, a school principal introducing ethical technology, or an enterprise executive automating workflow overhead.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => {
                  setPrefilledProgramme("AI Workshop & Training Enquiry");
                  scrollTo("contact-inquiry");
                }}
                className="w-full sm:w-auto rounded-none bg-amber hover:bg-amber-hover text-white font-mono text-xs uppercase tracking-wider px-8 py-6 transition-colors shadow-none flex items-center justify-center gap-2"
              >
                <span>COMMENCE COHORT ENGAGEMENT</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setPrefilledProgramme("Institutional Academic / Corporate Partnership");
                  scrollTo("contact-inquiry");
                }}
                className="w-full sm:w-auto rounded-none border border-concrete/40 text-ivory hover:bg-charcoal-surface font-mono text-xs uppercase tracking-wider px-8 py-6 transition-colors"
              >
                REQUEST ACADEMIC MOU BRIEF
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            8. WORKING ENQUIRY FORM SECTION
        ══════════════════════════════════════════════════════ */}
        <TenXEnquiryForm
          prefilledProgramme={prefilledProgramme}
          prefilledAudience={prefilledAudience}
        />

        {/* Programme Detail Dialog Modal */}
        <Dialog open={!!activeModalProgramme} onOpenChange={(open) => !open && setActiveModalProgramme(null)}>
          <DialogContent className="max-w-xl rounded-none bg-ivory dark:bg-charcoal border border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory p-6 sm:p-8">
            {activeModalProgramme && (
              <>
                <DialogHeader className="border-b border-concrete/20 dark:border-charcoal-border pb-4">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-sage uppercase tracking-wider">
                    <span>{activeModalProgramme.code}</span>
                    <span>•</span>
                    <span>{activeModalProgramme.badge}</span>
                  </div>
                  <DialogTitle className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                    {activeModalProgramme.name}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-charcoal/70 dark:text-ivory/70 pt-1 leading-relaxed font-sans">
                    {activeModalProgramme.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  <div className="border border-concrete/30 dark:border-charcoal-border overflow-hidden h-44 bg-charcoal">
                    <img
                      src={activeModalProgramme.image}
                      alt={activeModalProgramme.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>

                  <div>
                    <h5 className="font-mono text-[10px] font-bold uppercase tracking-wider text-concrete mb-2">
                      CURRICULUM DELIVERABLES &amp; PRACTICE FOCUS:
                    </h5>
                    <div className="space-y-2">
                      {activeModalProgramme.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-charcoal/80 dark:text-ivory/80 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveModalProgramme(null)}
                    className="rounded-none font-mono text-xs uppercase tracking-wider text-concrete hover:text-charcoal dark:hover:text-ivory"
                  >
                    CLOSE
                  </Button>
                  <Button
                    onClick={() => {
                      setPrefilledProgramme(activeModalProgramme.formInterest);
                      setPrefilledAudience(activeModalProgramme.formAudience);
                      setActiveModalProgramme(null);
                      scrollTo("contact-inquiry");
                    }}
                    className="rounded-none bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal hover:bg-amber dark:hover:bg-amber hover:text-white dark:hover:text-white font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-colors"
                  >
                    ENQUIRE FOR THIS TRACK
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default TenXProductivity;
