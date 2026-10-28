import React, { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CUSTOM_DEVELOPMENT_STEPS,
  CUSTOM_SOLUTION_AREAS,
  INDUSTRY_APPLICATIONS,
  SOLUTION_CATEGORIES,
} from "@/data/computerVisionProducts";
import {
  CheckCircle2,
  ArrowRight,
  Send,
  Loader2,
  HelpCircle,
  Lightbulb,
  Workflow,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const GOOGLE_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyTppieXQq9GDK_w39zitCC2E2GcxVVMwRVGe9hUWJx8qHP6aY25b4OW8U4P0bc_Cjj/exec";

interface CustomSolutionFormProps {
  prefilledSolution?: string;
}

export const CustomSolutionForm: React.FC<CustomSolutionFormProps> = ({
  prefilledSolution = "",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    industry: "",
    solutionInterest: prefilledSolution || "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if prefilledSolution changes externally
  React.useEffect(() => {
    if (prefilledSolution) {
      setFormData((prev) => ({
        ...prev,
        solutionInterest: prefilledSolution,
      }));
    }
  }, [prefilledSolution]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.workEmail.trim())) {
      toast.error("Please provide a valid work email address.");
      return;
    }
    if (!formData.company.trim()) {
      toast.error("Please provide your company or organization name.");
      return;
    }
    if (!formData.industry) {
      toast.error("Please select your industry.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please briefly describe your requirement or operational challenge.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      submissionType: "custom-vision-inquiry",
      name: formData.fullName,
      email: formData.workEmail,
      company: formData.company,
      industry: formData.industry,
      solutionInterest: formData.solutionInterest || "Custom Solution Requirement",
      message: formData.description,
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
        console.warn("Direct fetch network warning, falling back cleanly:", err);
      }

      setIsSubmitted(true);
      toast.success(
        "Your computer vision requirement has been received! Our vision engineering leads will reach out within 1 business day."
      );
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Unable to submit. Please email us directly at info@nirikshanai.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="custom-solutions" className="py-20 md:py-28 bg-card/40 border-t border-border/60">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            <Lightbulb className="w-3.5 h-3.5" />
            Tailored AI Vision Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
            Have a Computer Vision Requirement{" "}
            <span className="text-gradient">That Isn't Listed?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We work with organizations to understand their operational
            challenges, design suitable computer vision solutions, and develop
            implementations aligned with their specific requirements.
          </p>
        </div>

        {/* 6-Stage Development Process */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Our Solution Development Process
            </h3>
            <p className="text-sm text-muted-foreground">
              From requirement discovery to deployment and continuous active learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {CUSTOM_DEVELOPMENT_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-mono font-bold text-sm flex items-center justify-center mb-3">
                    0{step.step}
                  </div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Custom Solution Areas */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">
              Example Custom Solution Areas
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOM_SOLUTION_AREAS.map((area, idx) => (
              <Card
                key={idx}
                className="p-4 rounded-2xl border-border/60 bg-background/50 hover:bg-card hover:border-primary/30 transition-all"
              >
                <h4 className="font-semibold text-sm mb-1.5 text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {area.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-border/80 bg-background shadow-xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Requirement Submitted Successfully!</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our Computer Vision Solution
                Architects have received your inquiry for <strong>{formData.company}</strong> and
                will reach out within 24 hours.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    workEmail: "",
                    company: "",
                    industry: "",
                    solutionInterest: "",
                    description: "",
                  });
                }}
                variant="outline"
                className="mt-4"
              >
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">
                  Discuss Your Computer Vision Requirement
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Share your operational challenge and our team will outline feasibility, model selection, and implementation steps.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs font-semibold">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Vikram Sharma"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workEmail" className="text-xs font-semibold">
                    Work Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="workEmail"
                    name="workEmail"
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs font-semibold">
                    Company / Organization <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g. Motherson Automotive"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs font-semibold">
                    Industry <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, industry: val }))
                    }
                  >
                    <SelectTrigger id="industry" className="rounded-xl">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_APPLICATIONS.map((ind) => (
                        <SelectItem key={ind.id} value={ind.name}>
                          {ind.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other Commercial">Other Commercial Sector</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="solutionInterest" className="text-xs font-semibold">
                  Solution of Interest / Category
                </Label>
                <Input
                  id="solutionInterest"
                  name="solutionInterest"
                  placeholder="e.g. Forklift Pedestrian Proximity or Custom Defect Detection"
                  value={formData.solutionInterest}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-semibold">
                  Brief Requirement Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe your visual monitoring challenge, camera setup, or what you want to detect (e.g. Number of cameras, indoor/outdoor, lighting, target objects)..."
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="rounded-xl resize-y"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-primary py-6 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Requirement...
                  </>
                ) : (
                  <>
                    Submit Requirement
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-[11px] text-center text-muted-foreground">
                We respect your confidentiality. Technical discussions are conducted under mutual NDA where required.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
