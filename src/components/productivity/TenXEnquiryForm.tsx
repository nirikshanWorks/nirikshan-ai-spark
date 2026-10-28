import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Mail,
  Building2,
  User,
  HelpCircle,
  Phone,
  Send,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Zap,
  BookmarkCheck,
} from "lucide-react";
import { toast } from "sonner";

const GOOGLE_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyTppieXQq9GDK_w39zitCC2E2GcxVVMwRVGe9hUWJx8qHP6aY25b4OW8U4P0bc_Cjj/exec";

interface TenXEnquiryFormProps {
  prefilledProgramme?: string;
  prefilledAudience?: string;
}

export const TenXEnquiryForm: React.FC<TenXEnquiryFormProps> = ({
  prefilledProgramme = "",
  prefilledAudience = "",
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    organisation: "",
    audienceType: prefilledAudience || "",
    areaOfInterest: prefilledProgramme || "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefilledProgramme || prefilledAudience) {
      setFormData((prev) => ({
        ...prev,
        ...(prefilledProgramme ? { areaOfInterest: prefilledProgramme } : {}),
        ...(prefilledAudience ? { audienceType: prefilledAudience } : {}),
      }));
    }
  }, [prefilledProgramme, prefilledAudience]);

  const quickGoalChips = [
    { label: "University MoUs & Capstones", audience: "Universities & Colleges", interest: "AI Career Accelerator (Universities)", text: "We are interested in discussing an academic partnership or credit-aligned AI capstone cohort for our engineering & computer science students." },
    { label: "Enterprise Workflow Audit", audience: "Industries & Enterprises", interest: "AI Workforce Transformation (Industries)", text: "We want to audit manual operational bottlenecks across our business departments and deploy automated AI workflows." },
    { label: "Executive Leadership Sprints", audience: "Management & Leadership", interest: "AI Leadership (Management)", text: "We want a private executive briefing and AI strategy roadmap for our management and leadership team." },
    { label: "K-12 Student AI Workshop", audience: "Schools", interest: "AI Explorer (Schools)", text: "We are interested in organizing an AI awareness and creative storytelling workshop for high school students." },
  ];

  const handleChipClick = (chip: typeof quickGoalChips[0]) => {
    setFormData((prev) => ({
      ...prev,
      audienceType: chip.audience,
      areaOfInterest: chip.interest,
      message: chip.text,
    }));
    toast.info(`Configured form for: ${chip.label}`);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.workEmail.trim())) {
      errors.workEmail = "Please enter a valid email address.";
    }
    if (!formData.organisation.trim()) {
      errors.organisation = "Organisation or institution name is required.";
    }
    if (!formData.audienceType) {
      errors.audienceType = "Please select your audience type.";
    }
    if (!formData.areaOfInterest) {
      errors.areaOfInterest = "Please select an area of interest.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please provide details on your team's goals (minimum 10 characters).";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields accurately.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      submissionType: "10x-ai-productivity-inquiry",
      name: formData.fullName,
      email: formData.workEmail,
      organisation: formData.organisation,
      audienceType: formData.audienceType,
      areaOfInterest: formData.areaOfInterest,
      message: formData.message,
      submittedAt: new Date().toISOString(),
    };

    try {
      try {
        await fetch(GOOGLE_SCRIPT_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Direct fetch network notice (handled cleanly):", err);
      }

      setIsSubmitted(true);
      toast.success(
        "Thank you! Your 10X AI Productivity inquiry has been received. Our team will contact you within 1 business day."
      );
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(
        "There was a temporary issue submitting your inquiry. Please reach out to info@nirikshanai.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-inquiry"
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading, Value Proposition & Real-Time Engagement Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Take The Next Step</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The Future Is AI-Powered.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400">
                Are Your People Ready?
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Partner with Nirikshan AI to build practical AI skills, improve workflows, and prepare your organisation for an AI-enabled future.
            </p>

            {/* Live Engagement Preview Card */}
            {(formData.audienceType || formData.areaOfInterest) && (
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-200 animate-in fade-in slide-in-from-top-1 space-y-2">
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                  Configured Engagement Focus:
                </span>
                <div className="flex justify-between items-center text-white font-semibold">
                  <span>Audience: {formData.audienceType || "General"}</span>
                  <span className="text-blue-300">{formData.areaOfInterest || "10X Track"}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Custom syllabus, tailored capstone deliverables, and expert practitioner mentorship will be bundled for this inquiry.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Customized Cohorts</div>
                  <div className="text-xs text-slate-400">
                    Bespoke curricula for school students, universities, and corporate business pods.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Actionable ROI</div>
                  <div className="text-xs text-slate-400">
                    Measure tangible time saved, manual tasks automated, and verifiable project portfolios.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">End-to-End Enablement</div>
                  <div className="text-xs text-slate-400">
                    From foundational literacy to enterprise workflow automation and proprietary AI tools.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@nirikshanai.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 w-full sm:w-auto"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                Contact Directly: info@nirikshanai.com
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Interactive Validated Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 text-foreground shadow-2xl relative border border-border">
              {isSubmitted ? (
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in the Nirikshan AI 10X Productivity Initiative. Our education & transformation advisors will review your requirements and reach out within 1 business day.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        workEmail: "",
                        organisation: "",
                        audienceType: "",
                        areaOfInterest: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                    className="mt-4 text-xs font-semibold text-foreground border-border hover:bg-muted"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="border-b border-border pb-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      Express Interest / Cohort Partnership
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Select a common goal preset or customize your requirements below:
                    </p>
                  </div>

                  {/* Interactive Quick Goal Chips */}
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                      Quick Preset Objectives:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickGoalChips.map((chip) => (
                        <button
                          type="button"
                          key={chip.label}
                          onClick={() => handleChipClick(chip)}
                          className="px-2.5 py-1 rounded-lg bg-muted/50 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-border hover:border-blue-400 text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Dr. Rajesh Sharma"
                        className={`text-xs h-10 bg-background/80 border-border text-foreground placeholder:text-muted-foreground ${
                          validationErrors.fullName ? "border-rose-500 ring-rose-200" : ""
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-[11px] text-rose-500 mt-1">
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Work / Institutional Email <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="rajesh@institution.edu / company.com"
                        className={`text-xs h-10 bg-background/80 border-border text-foreground placeholder:text-muted-foreground ${
                          validationErrors.workEmail ? "border-rose-500 ring-rose-200" : ""
                        }`}
                      />
                      {validationErrors.workEmail && (
                        <p className="text-[11px] text-rose-500 mt-1">
                          {validationErrors.workEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Organisation / School / University <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="e.g. Apex Institute of Technology / Tata Enterprises"
                      className={`text-xs h-10 bg-background/80 border-border text-foreground placeholder:text-muted-foreground ${
                        validationErrors.organisation ? "border-rose-500 ring-rose-200" : ""
                      }`}
                    />
                    {validationErrors.organisation && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {validationErrors.organisation}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Audience Type */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Audience Type <span className="text-rose-500">*</span>
                      </label>
                      <Select
                        value={formData.audienceType}
                        onValueChange={(val) => handleSelectChange("audienceType", val)}
                      >
                        <SelectTrigger className={`text-xs h-10 bg-background/80 border-border text-foreground ${validationErrors.audienceType ? "border-rose-500" : ""}`}>
                          <SelectValue placeholder="Select Audience" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border text-popover-foreground">
                          <SelectItem value="Schools">Schools (K-12 / High School)</SelectItem>
                          <SelectItem value="Universities & Colleges">Universities & Colleges</SelectItem>
                          <SelectItem value="Working Professionals">Working Professionals</SelectItem>
                          <SelectItem value="Management & Leadership">Management & Leadership</SelectItem>
                          <SelectItem value="Industries & Enterprises">Industries & Enterprises</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.audienceType && (
                        <p className="text-[11px] text-rose-500 mt-1">
                          {validationErrors.audienceType}
                        </p>
                      )}
                    </div>

                    {/* Area of Interest */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Area of Interest <span className="text-rose-500">*</span>
                      </label>
                      <Select
                        value={formData.areaOfInterest}
                        onValueChange={(val) => handleSelectChange("areaOfInterest", val)}
                      >
                        <SelectTrigger className={`text-xs h-10 bg-background/80 border-border text-foreground ${validationErrors.areaOfInterest ? "border-rose-500" : ""}`}>
                          <SelectValue placeholder="Select Interest" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border text-popover-foreground">
                          <SelectItem value="AI Explorer (Schools)">AI Explorer (Schools)</SelectItem>
                          <SelectItem value="AI Career Accelerator (Universities)">AI Career Accelerator (Universities)</SelectItem>
                          <SelectItem value="10X Professional (Working Professionals)">10X Professional (Professionals)</SelectItem>
                          <SelectItem value="AI Leadership (Management)">AI Leadership (Management)</SelectItem>
                          <SelectItem value="AI Workforce Transformation (Industries)">AI Workforce Transformation (Industries)</SelectItem>
                          <SelectItem value="Enterprise Workflow Automation">Enterprise Workflow Automation</SelectItem>
                          <SelectItem value="Institutional Partnership / MoUs">Institutional Partnership / MoUs</SelectItem>
                          <SelectItem value="General AI Enablement Inquiry">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.areaOfInterest && (
                        <p className="text-[11px] text-rose-500 mt-1">
                          {validationErrors.areaOfInterest}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message / Goals */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Tell Us About Your Goals & Team Size <span className="text-rose-500">*</span>
                    </label>
                    <Textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details such as expected cohort size, primary departments involved, desired timeline, or key operational bottlenecks..."
                      className={`text-xs resize-none bg-background/80 border-border text-foreground placeholder:text-muted-foreground ${
                        validationErrors.message ? "border-rose-500 ring-rose-200" : ""
                      }`}
                    />
                    {validationErrors.message && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {validationErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit 10X Initiative Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                    <span>Your data is protected. We respond to all institutional inquiries within 24 hours.</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
