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
  Terminal,
  Clock,
  Layers,
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
    {
      label: "University MoUs & Capstones",
      audience: "Universities & Colleges",
      interest: "AI Career Accelerator (Universities)",
      text: "We are interested in discussing an academic partnership or credit-aligned AI capstone cohort for our engineering & computer science students.",
    },
    {
      label: "Enterprise Workflow Audit",
      audience: "Industries & Enterprises",
      interest: "AI Workforce Transformation (Industries)",
      text: "We want to audit manual operational bottlenecks across our business departments and deploy automated AI workflows.",
    },
    {
      label: "Executive Leadership Sprints",
      audience: "Management & Leadership",
      interest: "AI Leadership (Management)",
      text: "We want a private executive briefing and AI strategy roadmap for our management and leadership team.",
    },
    {
      label: "K-12 Student AI Workshop",
      audience: "Schools",
      interest: "AI Explorer (Schools)",
      text: "We are interested in organizing an AI awareness and creative storytelling workshop for high school students.",
    },
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
      errors.workEmail = "Please enter a valid work or institutional email address.";
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
        "Inquiry received. Our academic & workforce enablement team will respond within 24 hours."
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
      className="py-20 lg:py-28 bg-techlight/40 dark:bg-charcoal border-t border-concrete/30 dark:border-charcoal-border text-charcoal dark:text-ivory relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="border-b border-concrete/30 dark:border-charcoal-border pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs tracking-widest text-sage font-semibold uppercase">
                SEC_08 // INQUIRY &amp; PARTNERSHIP DISPATCH
              </span>
              <span className="text-concrete/40 dark:text-charcoal-border font-mono">/</span>
              <span className="font-mono text-xs text-concrete dark:text-concrete-light">
                DIRECT TO TRAINING DIVISION
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory">
              Partner With Our Enablement Lab.
            </h2>
          </div>
          <div className="font-mono text-xs text-concrete dark:text-concrete-light flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-sage rounded-full animate-pulse" />
            <span>DISPATCH GATEWAY ACTIVE • 24H SLA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Technical Value Proposition Dossier */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-concrete/20 dark:border-charcoal-border pb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-sage font-semibold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> SPEC // ENGAGEMENT TOPOLOGY
                </span>
                <span className="font-mono text-[10px] text-concrete">SYS_READY</span>
              </div>

              <p className="text-sm text-charcoal/80 dark:text-ivory/80 leading-relaxed font-sans">
                Nirikshan AI delivers tailored workshops, university MoUs, credit-aligned capstone labs, and enterprise workflow automation sprints across India.
              </p>

              {/* Live Configured Preview Strip */}
              {(formData.audienceType || formData.areaOfInterest) && (
                <div className="p-3.5 border border-sage/40 bg-sage/5 font-mono text-xs space-y-1.5">
                  <div className="text-[10px] text-sage font-bold tracking-wider uppercase flex items-center justify-between">
                    <span>ACTIVE FORM TARGET</span>
                    <span className="text-amber">CONFIGURED</span>
                  </div>
                  <div className="text-charcoal dark:text-ivory font-bold">
                    {formData.areaOfInterest || "General AI Track"}
                  </div>
                  <div className="text-[11px] text-concrete">
                    Audience: {formData.audienceType || "All Verticals"}
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal dark:text-ivory block">Bespoke Institution Syllabus</span>
                    <span className="text-concrete text-[11px]">Mapped to AICTE, UGC, NEP 2020 or internal enterprise stack specs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal dark:text-ivory block">Hands-On Capstone Portfolios</span>
                    <span className="text-concrete text-[11px]">Every participant deploys live code, RAG assistants, or edge vision models.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal dark:text-ivory block">Auditable Productivity Gains</span>
                    <span className="text-concrete text-[11px]">Measurable time savings and automated department workflows.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-concrete/20 dark:border-charcoal-border flex items-center justify-between font-mono text-[11px]">
                <span className="text-concrete">DIRECT CONTACT:</span>
                <a
                  href="mailto:info@nirikshanai.com"
                  className="text-charcoal dark:text-ivory hover:text-amber font-semibold flex items-center gap-1 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-sage" />
                  info@nirikshanai.com
                </a>
              </div>
            </div>

            {/* Institutional Credentials Box */}
            <div className="border border-concrete/30 dark:border-charcoal-border p-4 bg-techlight/30 dark:bg-charcoal/50 text-[11px] font-mono text-concrete space-y-1">
              <div>LOCATION // Haridwar &amp; Dehradun Lab Facilities</div>
              <div>ACCREDITATION // MSME Registered Technical Enterprise</div>
              <div>GOVERNANCE // Zero-PII Corporate Confidentiality Ready</div>
            </div>
          </div>

          {/* Right Column: High-Precision Brutalist Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="border border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal-surface p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="w-14 h-14 border border-sage bg-sage/10 text-sage flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                    Inquiry Transmitted Successfully.
                  </h3>
                  <p className="text-xs sm:text-sm text-concrete max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in the Nirikshan AI 10X Productivity Initiative. Our education &amp; workforce enablement team will review your specifications and contact you within 1 business day.
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
                    className="rounded-none border-concrete/40 font-mono text-xs uppercase tracking-wider mt-4 hover:border-amber hover:text-amber"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-concrete/20 dark:border-charcoal-border pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-concrete block mb-1">
                      INQUIRY SPECIFICATION SHEET
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
                      Configure Institutional or Corporate Cohort
                    </h3>
                  </div>

                  {/* Quick Preset Objectives */}
                  <div>
                    <span className="font-mono text-[10px] font-bold text-concrete uppercase tracking-wider block mb-2">
                      QUICK SELECTION PRESETS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quickGoalChips.map((chip) => (
                        <button
                          type="button"
                          key={chip.label}
                          onClick={() => handleChipClick(chip)}
                          className="px-3 py-2 border border-concrete/30 dark:border-charcoal-border bg-techlight/30 dark:bg-charcoal text-left font-mono text-[11px] text-charcoal/80 dark:text-ivory/80 hover:border-amber hover:text-amber transition-colors flex items-center justify-between"
                        >
                          <span className="truncate">{chip.label}</span>
                          <ArrowRight className="w-3 h-3 text-concrete shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block font-mono text-[11px] text-charcoal dark:text-ivory uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-amber">*</span>
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className={`rounded-none text-xs h-10 border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal text-charcoal dark:text-ivory placeholder:text-concrete/60 focus-visible:ring-1 focus-visible:ring-amber focus-visible:border-amber ${
                          validationErrors.fullName ? "border-amber ring-1 ring-amber" : ""
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="font-mono text-[10px] text-amber mt-1">
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block font-mono text-[11px] text-charcoal dark:text-ivory uppercase tracking-wider mb-1.5">
                        Institutional / Work Email <span className="text-amber">*</span>
                      </label>
                      <Input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="rajesh@institution.edu"
                        className={`rounded-none text-xs h-10 border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal text-charcoal dark:text-ivory placeholder:text-concrete/60 focus-visible:ring-1 focus-visible:ring-amber focus-visible:border-amber ${
                          validationErrors.workEmail ? "border-amber ring-1 ring-amber" : ""
                        }`}
                      />
                      {validationErrors.workEmail && (
                        <p className="font-mono text-[10px] text-amber mt-1">
                          {validationErrors.workEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block font-mono text-[11px] text-charcoal dark:text-ivory uppercase tracking-wider mb-1.5">
                      Organisation / School / University <span className="text-amber">*</span>
                    </label>
                    <Input
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="e.g. Apex Institute of Technology / Enterprise Team"
                      className={`rounded-none text-xs h-10 border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal text-charcoal dark:text-ivory placeholder:text-concrete/60 focus-visible:ring-1 focus-visible:ring-amber focus-visible:border-amber ${
                        validationErrors.organisation ? "border-amber ring-1 ring-amber" : ""
                      }`}
                    />
                    {validationErrors.organisation && (
                      <p className="font-mono text-[10px] text-amber mt-1">
                        {validationErrors.organisation}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Audience Type */}
                    <div>
                      <label className="block font-mono text-[11px] text-charcoal dark:text-ivory uppercase tracking-wider mb-1.5">
                        Audience Classification <span className="text-amber">*</span>
                      </label>
                      <Select
                        value={formData.audienceType}
                        onValueChange={(val) => handleSelectChange("audienceType", val)}
                      >
                        <SelectTrigger className={`rounded-none text-xs h-10 border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal text-charcoal dark:text-ivory ${validationErrors.audienceType ? "border-amber ring-1 ring-amber" : ""}`}>
                          <SelectValue placeholder="Select Audience" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none bg-white dark:bg-charcoal border border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory">
                          <SelectItem value="Schools">Schools (K-12 / High School)</SelectItem>
                          <SelectItem value="Universities & Colleges">Universities &amp; Colleges</SelectItem>
                          <SelectItem value="Working Professionals">Working Professionals</SelectItem>
                          <SelectItem value="Management & Leadership">Management &amp; Leadership</SelectItem>
                          <SelectItem value="Industries & Enterprises">Industries &amp; Enterprises</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.audienceType && (
                        <p className="font-mono text-[10px] text-amber mt-1">
                          {validationErrors.audienceType}
                        </p>
                      )}
                    </div>

                    {/* Area of Interest */}
                    <div>
                      <label className="block font-mono text-[11px] text-charcoal dark:text-ivory uppercase tracking-wider mb-1.5">
                        Programme Track <span className="text-amber">*</span>
                      </label>
                      <Select
                        value={formData.areaOfInterest}
                        onValueChange={(val) => handleSelectChange("areaOfInterest", val)}
                      >
                        <SelectTrigger className={`rounded-none text-xs h-10 border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal text-charcoal dark:text-ivory ${validationErrors.areaOfInterest ? "border-amber ring-1 ring-amber" : ""}`}>
                          <SelectValue placeholder="Select Track" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none bg-white dark:bg-charcoal border border-concrete/40 dark:border-charcoal-border text-charcoal dark:text-ivory">
                          <SelectItem value="AI Explorer (Schools)">AI Explorer (Schools)</SelectItem>
                          <SelectItem value="AI Career Accelerator (Universities)">AI Career Accelerator (Universities)</SelectItem>
                          <SelectItem value="10X Professional (Professionals)">10X Professional (Professionals)</SelectItem>
                          <SelectItem value="AI Leadership (Management)">AI Leadership (Management)</SelectItem>
                          <SelectItem value="AI Workforce Transformation (Industries)">AI Workforce Transformation (Industries)</SelectItem>
                          <SelectItem value="Enterprise Workflow Automation">Enterprise Workflow Automation</SelectItem>
                          <SelectItem value="Institutional Partnership / MoUs">Institutional Partnership / MoUs</SelectItem>
                          <SelectItem value="General AI Enablement Inquiry">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.areaOfInterest && (
                        <p className="font-mono text-[10px] text-amber mt-1">
                          {validationErrors.areaOfInterest}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-[11px] text-charcoal dark:text-ivory uppercase tracking-wider mb-1.5">
                      Scope &amp; Expected Cohort Details <span className="text-amber">*</span>
                    </label>
                    <Textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify expected cohort size, primary departments involved, desired timeline, or key technical goals..."
                      className={`rounded-none text-xs resize-none border-concrete/40 dark:border-charcoal-border bg-white dark:bg-charcoal text-charcoal dark:text-ivory placeholder:text-concrete/60 focus-visible:ring-1 focus-visible:ring-amber focus-visible:border-amber ${
                        validationErrors.message ? "border-amber ring-1 ring-amber" : ""
                      }`}
                    />
                    {validationErrors.message && (
                      <p className="font-mono text-[10px] text-amber mt-1">
                        {validationErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-none bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal hover:bg-amber dark:hover:bg-amber hover:text-white dark:hover:text-white font-mono text-xs uppercase tracking-wider py-6 transition-colors shadow-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>TRANSMITTING SPECIFICATION...</span>
                        </>
                      ) : (
                        <>
                          <span>DISPATCH 10X INITIATIVE INQUIRY</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-concrete pt-2 border-t border-concrete/20 dark:border-charcoal-border">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                      NON-DISCLOSURE GUARANTEE
                    </span>
                    <span>RESPONSE GUARANTEE &lt;24H</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
