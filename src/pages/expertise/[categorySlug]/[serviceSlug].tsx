import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Workflow,
  Sparkles,
  Code2,
  Brain,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Compass,
  MapPin,
  Flag,
  Rocket
} from "lucide-react";
import { getCategoryBySlug, getServiceBySlug } from "@/pages/expertise/expertiseData";

const TECHNOLOGY_LOGOS: { keywords: string[]; logo: string }[] = [
  {
    keywords: ["openai"],
    logo: "https://www.svgrepo.com/show/306500/openai.svg",
  },
  {
    keywords: ["gpt"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
  },
  {
    keywords: ["google", "palm"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    keywords: ["hugging", "face"],
    logo: "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg",
  },
  {
    keywords: ["stable", "diffusion"],
    logo: "https://vectorseek.com/wp-content/uploads/2025/10/Stable-Diffusion-Logo-PNG-SVG-Vector.png",
  },
  {
    keywords: ["dall"],
    logo: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F936204593%2F2575765214351%2F1%2Foriginal.20250115-103506?crop=focalpoint&fit=crop&w=600&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=12881c1558050df435480d5d3732e4ae",
  },
  {
    keywords: ["langchain"],
    logo: "https://brandlogos.net/wp-content/uploads/2025/03/langchain-logo_brandlogos.net_9zgaw-512x512.png",
  },
  {
    keywords: ["tensorflow"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    keywords: ["pytorch"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    keywords: ["scikit"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  },
  {
    keywords: ["cuda"],
    logo: "https://goonline.io/assets/svg/technologies/cuda.svg",
  },
  {
    keywords: ["keras"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  },
  {
    keywords: ["spark"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
  },
  {
    keywords: ["mlflow"],
    logo: "https://mlflow.org/docs/2.12.2/_static/MLflow-logo-final-black.png",
  },
  {
    keywords: ["kubeflow"],
    logo: "https://image.pngaaa.com/258/4991258-middle.png",
  },
  {
    keywords: [".net"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    keywords: ["c#"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    keywords: ["asp.net"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    keywords: ["entity", "framework"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    keywords: ["blazor"],
    logo: "https://w7.pngwing.com/pngs/854/971/png-transparent-blazor-hd-logo-thumbnail.png",
  },
  {
    keywords: ["azure", "devops"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg",
  },
  {
    keywords: ["sql", "server"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  },
  {
    keywords: ["visual", "studio"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
  },
  {
    keywords: ["dynamics"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Microsoft_Dynamics_365_Logo_%282021%E2%80%93present%29.svg/2560px-Microsoft_Dynamics_365_Logo_%282021%E2%80%93present%29.svg.png",
  },
  {
    keywords: ["power", "platform"],
    logo: "https://www.vhv.rs/dpng/d/523-5239250_microsoft-power-platform-logo-hd-png-download.png",
  },
  {
    keywords: ["power", "bi"],
    logo: "https://images.seeklogo.com/logo-png/40/1/power-bi-microsoft-logo-png_seeklogo-400711.png",
  },
  {
    keywords: ["power", "automate"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Power_Automate_icon.svg",
  },
  {
    keywords: ["sharepoint"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sharepoint/sharepoint-original.svg",
  },
  {
    keywords: ["teams"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
  },
  {
    keywords: ["aws"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  {
    keywords: ["kubernetes"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    keywords: ["docker"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    keywords: ["python"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    keywords: ["mongodb"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    keywords: ["postgres"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    keywords: ["fastapi"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    keywords: ["opencv"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  },
  {
    keywords: ["spark", "ml"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
  },
  {
    keywords: ["mlops"],
    logo: "https://mlflow.org/docs/latest/_static/MLflow-logo-final-black.png",
  },
  {
    keywords: ["cloud", "ai"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    keywords: ["azure"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    keywords: ["sql"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    keywords: ["git"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    keywords: ["jira"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  },
];

const getTechnologyIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  if (techLower.includes('tensorflow') || techLower.includes('pytorch') || techLower.includes('ml')) return Brain;
  if (techLower.includes('azure') || techLower.includes('cloud') || techLower.includes('aws')) return Cloud;
  if (techLower.includes('database') || techLower.includes('sql') || techLower.includes('hana')) return Database;
  if (techLower.includes('mobile') || techLower.includes('app')) return Smartphone;
  if (techLower.includes('api') || techLower.includes('rest') || techLower.includes('web')) return Globe;
  if (techLower.includes('security') || techLower.includes('auth')) return Shield;
  if (techLower.includes('automation') || techLower.includes('devops')) return Zap;
  return Code2;
};

const getTechnologyLogo = (tech: string) => {
  const normalized = tech.toLowerCase();
  const match = TECHNOLOGY_LOGOS.find(({ keywords }) => keywords.every((keyword) => normalized.includes(keyword)));
  return match?.logo;
};

const ExpertiseServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const service = categorySlug && serviceSlug ? getServiceBySlug(categorySlug, serviceSlug) : null;

  const heroVideoPool = useMemo(
    () => [
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818146/Generative_AI_kcnnvm.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818131/Machine_Learning_gaw6th.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818138/AI_Consulting_agr0li.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818127/NET_Development_dmu07t.mp4",
      "https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818123/MS_Dynamics_qeap6i.mp4",
    ],
    [],
  );

  const heroVideoSrc = useMemo(() => {
    if (!service?.slug) {
      return undefined;
    }
    const hash = service.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return heroVideoPool[hash % heroVideoPool.length];
  }, [heroVideoPool, service?.slug]);

  const roadmapIcons = useMemo(() => [Compass, MapPin, Workflow, Target, Rocket, Flag], []);

  if (!category || !service) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16">
          <div className="container mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The requested service could not be found. Please check the URL and try again.
            </p>
            <Link
              to="/expertise"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2" size={16} />
              Return to Expertise
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          {heroVideoSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          ) : null}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-400 to-purple-500"
            style={heroVideoSrc ? { opacity: 0.6 } : undefined}
          />
          <div className="absolute -top-24 -left-16 w-64 h-64 bg-white/15 blur-3xl rounded-full" />
          <div className="absolute bottom-[-140px] right-[-40px] w-96 h-96 bg-white/10 blur-3xl rounded-full" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="fade-in-up">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link to={`/expertise/${category.slug}`}>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 cursor-pointer">
                    {category.title}
                  </Badge>
                </Link>
                <Link
                  to={`/expertise/${category.slug}`}
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors rounded-full border border-white/30 px-3 py-1.5 backdrop-blur-sm"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back to {category.title}
                </Link>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">{service.title}</h1>
              <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="#features" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
                  Explore capabilities
                  <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link to="#use-cases" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
                  Real-world use cases
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-primary" size={32} />
                <h2 className="text-3xl md:text-4xl font-display font-bold">Key Features</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive capabilities designed to deliver exceptional results
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <Card
                  key={feature}
                  className="p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group fade-in-up bg-gradient-to-br from-background to-secondary/20 border-2 border-transparent hover:border-primary/20"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-md">
                      <CheckCircle className="text-white" size={18} />
                    </div>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">{feature}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="text-accent" size={32} />
                <h2 className="text-3xl md:text-4xl font-display font-bold">Benefits You Get</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real value delivered through our {service.title} solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <Card
                  key={benefit}
                  className="p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer bg-card relative overflow-hidden group fade-in-up border-2 border-transparent hover:border-primary/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <CheckCircle className="text-white" size={28} />
                    </div>
                    <p className="font-semibold text-base group-hover:text-primary transition-colors duration-300">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        {service.methodology && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12 fade-in-up">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Workflow className="text-primary" size={32} />
                  <h2 className="text-3xl md:text-4xl font-display font-bold">
                    Delivery Roadmap for {service.title}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Follow the guided journey from discovery to scale with clearly defined milestones.
                </p>
              </div>
              <div className="max-w-6xl mx-auto rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent p-6 md:p-10">
                <div className="relative">
                  <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 border-t border-dashed border-primary/30" />
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 overflow-x-auto pb-6">
                    {service.methodology.map((step, index) => {
                      const StepIcon = roadmapIcons[index % roadmapIcons.length];
                      return (
                        <div
                          key={step.phase}
                          className="group relative flex-1 min-w-[260px] md:min-w-0"
                        >
                          <Card className="h-full p-6 text-center border border-primary/10 bg-background/80 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                            <div className="flex flex-col items-center gap-3 mb-4">
                              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 text-primary shadow-lg ring-2 ring-primary/20">
                                <StepIcon className="h-7 w-7" />
                              </div>
                              <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow">
                                Step {index + 1}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-snug">
                              {step.phase}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </Card>
                          {index < service.methodology.length - 1 && (
                            <div className="hidden md:flex items-center absolute top-1/2 right-[-48px] h-0.5 w-24 -translate-y-1/2">
                              <div className="flex-1 border-t border-dashed border-primary/40" />
                              <ArrowRight className="ml-2 h-4 w-4 text-primary/70" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technologies Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 fade-in-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Code2 className="text-primary" size={32} />
                <h2 className="text-3xl md:text-4xl font-display font-bold">Technologies We Use</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cutting-edge tools and platforms for optimal results
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {service.technologies.map((tech, index) => {
                const Icon = getTechnologyIcon(tech);
                const logoUrl = getTechnologyLogo(tech);
                return (
                  <Card
                    key={tech}
                    className="p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer group relative overflow-hidden fade-in-up border-2 border-transparent hover:border-primary/30"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`${tech} logo`}
                          className="mx-auto mb-3 h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6"
                          loading="lazy"
                        />
                      ) : (
                        <Icon className="w-12 h-12 mx-auto mb-3 text-primary group-hover:text-accent transition-all group-hover:scale-125 group-hover:rotate-6 transform duration-500" />
                      )}
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">{tech}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="text-purple-500" size={28} />
                <h2 className="text-3xl font-display font-bold">Use Cases</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how organizations leverage {service.title} to solve mission-critical challenges.
              </p>
            </div>
            <Card className="p-4 md:p-6 bg-secondary/30 border-secondary/40">
              <Accordion type="single" collapsible>
                {service.useCases.map((useCase, index) => (
                  <AccordionItem key={useCase} value={`use-case-${index}`}>
                    <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                      {useCase}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        {useCase} initiatives executed by Nirikshan AI blend strategy, experience design, and engineering excellence. Reach out to explore detailed case studies and engagement models tailored to your roadmap.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760818146/Generative_AI_kcnnvm.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/45 to-primary/30" />
          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center fade-in-up">
              <Lightbulb className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-white/100 mb-8 max-w-2xl mx-auto">
                Let's discuss how our {service.title} solutions can help you achieve your goals and drive innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 group">
                    Get Started Today
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                    View Success Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExpertiseServicePage;
