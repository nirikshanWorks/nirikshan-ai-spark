import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TenXEnquiryForm } from "@/components/productivity/TenXEnquiryForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Database,
  Shield,
  Workflow,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  GitBranch,
  Building2,
  GraduationCap,
  Sparkles,
  Zap,
  BarChart3,
  FileCode,
  Laptop,
} from "lucide-react";

/* ── Track Data ── */
const tracks = [
  {
    id: "engineers",
    label: "Engineers & Developers",
    badge: "Technical Cohort",
    headline: "AI Pair-Programming & Full-Stack Agent Engineering",
    description:
      "Move beyond basic autocomplete. Learn how to scaffold microservices, generate comprehensive unit test suites, write RAG vector pipelines, and orchestrate autonomous multi-agent code reviewers using Cursor, Claude 3.5, and LangChain.",
    duration: "4 Weeks · 24 Lab Hours",
    stack: ["Cursor IDE", "Claude 3.5 Sonnet", "LangChain", "ChromaDB", "FastAPI", "Docker"],
    deliverable: "Production-ready containerized RAG service with 90%+ automated test coverage.",
    codeSnippet: `// 10X Developer Pipeline: Autonomous PR Reviewer Agent
import { AgentRunner } from "@nirikshan/agent-core";
import { ASTParser } from "@nirikshan/code-intel";

export async function reviewPullRequest(diffContext: Diff) {
  const ast = await ASTParser.analyze(diffContext);
  const securityAudit = await runSecurityHeuristics(ast);
  
  const testCoverage = await AgentRunner.generateUnitTests({
    spec: ast.targetFunctions,
    coverageTarget: 0.95,
  });

  return {
    riskScore: securityAudit.vulnerabilities.length === 0 ? "LOW" : "HIGH",
    synthesizedTests: testCoverage.files,
    prComment: generateReviewMarkdown(securityAudit, testCoverage),
  };
}`,
    curriculum: [
      { week: "Week 01", title: "Context Windows & Prompt Architecture", details: "System prompts, XML tagging, token management, few-shot conditioning." },
      { week: "Week 02", title: "Tool-Calling & Structured JSON Schemas", details: "Function calling, Pydantic schemas, validation loops, error-recovery." },
      { week: "Week 03", title: "RAG & Vector Retrieval Systems", details: "Chunking strategies, hybrid search, dense embeddings, re-ranking models." },
      { week: "Week 04", title: "Multi-Agent Pipelines & CI/CD Guardrails", details: "Stateful agents, Docker sandbox execution, evaluation test suites." },
    ],
  },
  {
    id: "operations",
    label: "Enterprise Operations",
    badge: "Operations & Product",
    headline: "Autonomous Document Triage & Workflow Automation",
    description:
      "Transform manual data entry, quotation generation, and cross-system data transfer into autonomous intelligent workflows. Connect LLMs to your ERP, CRM, and email pipelines with deterministic verification safeguards.",
    duration: "2 Weeks · 12 Lab Hours",
    stack: ["Claude Enterprise", "ChatGPT Team", "Make.com", "Postman", "PostgreSQL", "Notion AI"],
    deliverable: "Turnkey multi-step email & invoice triage pipeline with autonomous discrepancy flagging.",
    codeSnippet: `# 10X Operations Workflow: Document Parsing & Reconciliation
from nirikshan_pipeline import DocumentExtractor, SQLSync

def reconcile_vendor_invoice(invoice_pdf: bytes, purchase_order_id: str):
    extracted_data = DocumentExtractor.parse_structured(
        invoice_pdf,
        schema=["line_items", "tax_id", "total_due", "currency"]
    )
    po_record = SQLSync.fetch_order(purchase_order_id)
    variance = abs(extracted_data.total_due - po_record.total)
    
    if variance > 0.01:
        SQLSync.flag_discrepancy(po_record.id, reason="Price variance detected")
        return {"status": "FLAGGED_FOR_HUMAN_REVIEW", "delta": variance}
        
    SQLSync.approve_invoice(po_record.id)
    return {"status": "AUTO_APPROVED", "ref": po_record.id}`,
    curriculum: [
      { week: "Week 01", title: "Document Intelligence & OCR Extraction", details: "Parsing unstructured PDFs, invoices, contracts into clean tabular formats." },
      { week: "Week 02", title: "CRM & ERP Autonomous Syncing", details: "Eliminating manual data transcription with deterministic API connectors." },
    ],
  },
  {
    id: "leadership",
    label: "Executive & CXO",
    badge: "Executive Masterclass",
    headline: "Strategic AI Adoption, Governance & ROI Architecture",
    description:
      "Cut through vendor hype. Understand model economics, build-versus-buy valuations, enterprise data privacy boundaries, and organizational change management required to deploy AI safely.",
    duration: "1 Day Intensive · 6 Hours",
    stack: ["Security Architecture", "Zero-Trust Frameworks", "Vendor Scorecards", "ROI Models"],
    deliverable: "Executive AI Adoption Roadmap with quantified risk matrices and 12-month ROI forecasts.",
    codeSnippet: `/* Executive Decision Matrix: Build vs. Buy Evaluation */
const enterpriseAIModel = {
  internalCapability: "Custom RAG & Vision QA Pods",
  dataSecurityMode: "VPC Air-Gapped / Zero Data Retention",
  yearOneCostProjection: "$42,000 (Internal) vs $160,000 (Vendor SaaS)",
  projectedHoursSavedDept: 1420, // Hours annually per 20-person pod
  breakEvenTimeline: "3.4 Months post-deployment",
  governanceCompliance: ["SOC2 Type II", "GDPR", "HIPAA Compatible"],
};`,
    curriculum: [
      { week: "Morning", title: "State of Enterprise AI & Technical Landscape", details: "LLM capabilities, proprietary models vs open-weights, infra cost realities." },
      { week: "Afternoon", title: "Governance, Security & The 10X Blueprint", details: "Data leakage prevention, compliance guidelines, departmental pilot roadmaps." },
    ],
  },
  {
    id: "universities",
    label: "Higher Education & Research",
    badge: "Academic Curriculum",
    headline: "Credit-Bearing Applied AI, Edge Vision & Agent Electives",
    description:
      "Bridge textbook theory with production software standards. We partner with universities to deliver accredited modules where students build real-world computer vision systems and LLM applications.",
    duration: "Full Semester (8-16 Weeks)",
    stack: ["PyTorch", "OpenCV", "YOLOv11", "Jetson Orin", "Python", "Hugging Face"],
    deliverable: "Accredited student project portfolios deployed live on edge hardware and cloud servers.",
    codeSnippet: `// Applied University Lab: Edge Real-Time Object Detection
import cv2
from ultralytics import YOLO

model = YOLO('nirikshan-yolo11n.pt')
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    
    results = model.track(frame, persist=True, conf=0.85)
    annotated_frame = results[0].plot()
    
    cv2.imshow("Edge AI Lab: Real-Time Stream", annotated_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break`,
    curriculum: [
      { week: "Module 01", title: "Applied Neural Architectures", details: "CNNs, Vision Transformers, and modern foundational models." },
      { week: "Module 02", title: "Edge Hardware Optimization", details: "Quantization, TensorRT, and low-latency inference on Jetson boards." },
      { week: "Module 03", title: "Autonomous Agents & Research Tools", details: "Literature synthesis assistants and automated experimental data pipelines." },
      { week: "Module 04", title: "Capstone Project & Live Deployment", details: "Full production demonstration evaluated by industry practitioners." },
    ],
  },
];

/* ── Benchmark Diffs ── */
const workflowDiffs = [
  {
    task: "Competitive Market Research & Executive Briefing",
    manualHours: "8.0 hrs",
    aiHours: "0.5 hrs",
    reduction: "94%",
    manualSteps: "25+ browser tabs, manual note consolidation, typing summaries, manual chart formatting.",
    aiWorkflow: "Autonomous synthesis across 15+ verified filings via Claude 3.5, structured markdown tables, citation cross-check.",
  },
  {
    task: "Full-Stack API Scaffolding & Unit Test Coverage",
    manualHours: "12.0 hrs",
    aiHours: "1.2 hrs",
    reduction: "90%",
    manualSteps: "Writing boilerplate routes, manual mock setups, typing 40+ repetitive test assertions by hand.",
    aiWorkflow: "Spec-driven schema generation via Cursor, edge-case test synthesis, automated container configuration.",
  },
  {
    task: "Financial Anomaly Audit & P&L Variance Extraction",
    manualHours: "5.5 hrs",
    aiHours: "0.4 hrs",
    reduction: "92%",
    manualSteps: "Cross-referencing 4 ERP CSV files, hunting for broken VLOOKUP formulas, manually drafting variance notes.",
    aiWorkflow: "Automated ingestion pipeline, anomaly detection script, instant executive summary output.",
  },
];

/* ── Engagement Models ── */
const engagementModels = [
  {
    level: "Tier 01",
    name: "Executive Strategy Sprint",
    timing: "1 Day Intensive",
    audience: "C-Level, VP of Engineering, Operations Directors",
    focus: "Strategic positioning, vendor evaluation, compliance, and departmental roadmapping.",
    features: [
      "AI Readiness & Infrastructure Audit",
      "Enterprise Build-vs-Buy Model",
      "Data Isolation & Security Architecture",
      "Executive Playbook & 12-Month Plan",
    ],
  },
  {
    level: "Tier 02",
    name: "Practitioner Acceleration Sprint",
    timing: "2 to 4 Weeks",
    audience: "Software Engineers, Product Managers, Operations Teams",
    focus: "Deep hands-on tooling: prompt engineering, API integration, and personal workflow automation.",
    features: [
      "16–24 Hours of Live Hands-On Labs",
      "Custom Internal Prompt Vaults",
      "Multi-Agent Workflow Scaffolding",
      "Personalized Efficiency Benchmarks",
    ],
    popular: true,
  },
  {
    level: "Tier 03",
    name: "Turnkey Enterprise Transformation",
    timing: "8 to 12 Weeks",
    audience: "Cross-Departmental Business Pods & Academic Institutions",
    focus: "End-to-end integration: custom private RAG deployment, workflow audits, and team-wide certification.",
    features: [
      "Departmental Process Bottleneck Audit",
      "Custom Model Fine-Tuning & Integration",
      "Private Enterprise Knowledge Assistant",
      "Continuous Monitoring & Monthly Updates",
    ],
  },
];

export const TenXProductivity: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [prefilledProgramme, setPrefilledProgramme] = useState("");
  const [prefilledAudience, setPrefilledAudience] = useState("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInquireTrack = (trackLabel: string) => {
    setPrefilledProgramme(`${trackLabel} Cohort`);
    setPrefilledAudience(trackLabel);
    scrollTo("contact-inquiry");
  };

  const activeTrackData = tracks[selectedTrack];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <SEO
        title="10X AI Enablement & Engineering Cohorts | Nirikshan AI"
        description="Applied, project-driven AI training and workflow automation for software engineers, operations leaders, and universities. Real code, real pipelines, measurable ROI."
        canonicalUrl="https://nirikshanai.com/10x-ai-productivity"
      />
      <Navigation />

      <main>
        {/* ── 1. ENGINEERING HERO ─────────────────────────────── */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-border bg-gradient-to-b from-background via-card/50 to-background overflow-hidden">
          {/* Subtle architectural background grid */}
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            {/* Monospaced metadata badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs font-semibold px-3 py-1 rounded-md bg-secondary text-primary border border-primary/20">
                NIRIKSHAN 10X // COHORT SPEC v2.4
              </span>
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline-block">
                SYSTEM_MODE: PRODUCTION_ENABLEMENT
              </span>
            </div>

            {/* Core headline */}
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                Hands-On AI Training for Teams That Actually Ship Products.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                No high-level slides or generic prompts. We run applied cohorts that teach developers, operations leads, and enterprises how to integrate modern foundation models, build autonomous agent pipelines, and automate daily operational bottlenecks.
              </p>
            </div>

            {/* Primary actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
              <Button
                size="lg"
                onClick={() => scrollTo("tracks-workbench")}
                className="gradient-primary text-primary-foreground font-semibold px-7 h-12 rounded-xl border-0 shadow-lg"
              >
                Inspect Curriculum Tracks
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact-inquiry")}
                className="h-12 px-7 rounded-xl border-border hover:bg-secondary font-medium"
              >
                Schedule Team Consultation
              </Button>
            </div>

            {/* Technical stats strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-border/80 pt-6">
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Functional Code &amp; Pipelines Built</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">0%</div>
                <div className="text-xs text-muted-foreground">Generic Slide Deck Lectures</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">90%+</div>
                <div className="text-xs text-muted-foreground">Time Reduction on Repetitive Tasks</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">Air-Gapped</div>
                <div className="text-xs text-muted-foreground">Enterprise Data Isolation Standards</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. INTERACTIVE WORKBENCH & TRACK EXPLORER ──────── */}
        <section className="py-20 bg-background" id="tracks-workbench">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-border">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
                  [ SECTION 02 // CURRICULUM WORKBENCH ]
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  Choose Your Enablement Track
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Select your team profile below to inspect the actual syllabus, tools mastered, and the production deliverable you build.
              </p>
            </div>

            {/* Track Selector Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
              {tracks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(idx)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    selectedTrack === idx
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Active Track Terminal & Spec Panel */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <span className="font-mono text-muted-foreground ml-2">
                    nirikshan // {activeTrackData.id}-cohort-spec.ts
                  </span>
                </div>
                <span className="font-mono text-primary font-medium">
                  {activeTrackData.duration}
                </span>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
                {/* Left: Track Overview & Deliverables */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                      {activeTrackData.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3 leading-snug">
                      {activeTrackData.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activeTrackData.description}
                    </p>
                  </div>

                  {/* Capstone Deliverable Box */}
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Production Deliverable
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-foreground">
                      {activeTrackData.deliverable}
                    </div>
                  </div>

                  {/* Tool Stack Tags */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold mb-2">
                      Tools &amp; Frameworks
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTrackData.stack.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-xs px-2.5 py-1 rounded bg-secondary text-secondary-foreground border border-border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2">
                    <Button
                      onClick={() => handleInquireTrack(activeTrackData.label)}
                      className="w-full gradient-primary text-primary-foreground font-semibold h-11 rounded-xl"
                    >
                      Enquire for this Track
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Right: Code Sample & Week-by-Week Modules */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  {/* Code Editor View */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold mb-2 flex items-center justify-between">
                      <span>Hands-On Implementation Preview</span>
                      <span className="text-[10px] text-primary">REAL CODE</span>
                    </div>
                    <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 shadow-inner">
                      <pre className="leading-relaxed">
                        <code>{activeTrackData.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Modular Breakdown */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold mb-3">
                      Syllabus Breakdown
                    </div>
                    <div className="space-y-2">
                      {activeTrackData.curriculum.map((c) => (
                        <div
                          key={c.week}
                          className="p-3 rounded-xl border border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-primary">{c.week}</span>
                            <span className="font-semibold text-foreground">{c.title}</span>
                          </div>
                          <span className="text-muted-foreground text-[11px]">{c.details}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. WORKFLOW DELTA: TIME BENCHMARKS ─────────────── */}
        <section className="py-20 border-y border-border bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
                [ SECTION 03 // QUANTIFIED IMPACT ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                Measurable Efficiency Deltas
              </h2>
              <p className="text-sm text-muted-foreground">
                Audited workflow comparisons across actual enterprise tasks before and after integrating structured LLM pipelines.
              </p>
            </div>

            <div className="space-y-4">
              {workflowDiffs.map((diff) => (
                <div
                  key={diff.task}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="lg:w-1/3">
                    <h3 className="font-bold text-base text-foreground mb-1">
                      {diff.task}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Zap className="w-3.5 h-3.5" />
                      {diff.reduction} Execution Time Reduced
                    </div>
                  </div>

                  {/* Manual vs AI Comparison Bar */}
                  <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl border border-border bg-background">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-muted-foreground uppercase text-[10px] font-bold">Manual Process</span>
                        <span className="font-mono font-bold text-rose-500">{diff.manualHours}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {diff.manualSteps}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-primary uppercase text-[10px] font-bold">10X Pipeline</span>
                        <span className="font-mono font-bold text-emerald-500">{diff.aiHours}</span>
                      </div>
                      <p className="text-xs text-foreground font-medium leading-relaxed">
                        {diff.aiWorkflow}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. ENTERPRISE ENGAGEMENT TIERS ──────────────────── */}
        <section className="py-20 bg-background" id="engagement-tiers">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
                [ SECTION 04 // ENGAGEMENT STRUCTURE ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                Three Ways to Partner
              </h2>
              <p className="text-sm text-muted-foreground">
                Tailored for small leadership squads, engineering divisions, or full enterprise workforces.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {engagementModels.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                    tier.popular
                      ? "border-primary/50 bg-gradient-to-b from-card to-secondary/30 shadow-xl ring-1 ring-primary/20"
                      : "border-border bg-card shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-muted-foreground font-semibold">
                        {tier.level}
                      </span>
                      {tier.popular && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-primary-foreground font-bold">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                    <div className="font-mono text-xs text-primary font-semibold mb-4">
                      {tier.timing}
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                      {tier.focus}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setPrefilledProgramme(tier.name);
                      scrollTo("contact-inquiry");
                    }}
                    variant={tier.popular ? "default" : "outline"}
                    className="w-full font-semibold rounded-xl"
                  >
                    Select {tier.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. ENTERPRISE ENQUIRY FORM ─────────────────────── */}
        <TenXEnquiryForm
          prefilledProgramme={prefilledProgramme}
          prefilledAudience={prefilledAudience}
        />
      </main>

      <Footer />
    </div>
  );
};

export default TenXProductivity;
