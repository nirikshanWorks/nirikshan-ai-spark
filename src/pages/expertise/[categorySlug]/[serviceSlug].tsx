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
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
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
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/huggingface/huggingface-original.svg",
  },
  {
    keywords: ["stable", "diffusion"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Stable_Diffusion_logo.png",
  },
  {
    keywords: ["dall"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
  },
  {
    keywords: ["langchain"],
    logo: "https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/langchain-h.svg",
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
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg",
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
    logo: "https://mlflow.org/docs/latest/_static/MLflow-logo-final-black.png",
  },
  {
    keywords: ["kubeflow"],
    logo: "https://www.kubeflow.org/images/logos/application.svg",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Blazor_Logo.png",
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
    logo: "https://seeklogo.com/images/M/microsoft-dynamics-365-logo-7A8C3FB9D2-seeklogo.com.png",
  },
  {
    keywords: ["power", "platform"],
    logo: "https://seeklogo.com/images/M/microsoft-power-platform-logo-08B94476B5-seeklogo.com.png",
  },
  {
    keywords: ["power", "bi"],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg",
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
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                {category.title}
              </Badge>
              <Link
                to={`/expertise/${category.slug}`}
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to {category.title}
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{service.title}</h1>
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
                <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive capabilities designed to deliver exceptional results
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <Card
                  key={feature}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-foreground">{feature}</span>
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
                <h2 className="text-3xl md:text-4xl font-bold">Benefits You Get</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real value delivered through our {service.title} solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <Card
                  key={benefit}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card relative overflow-hidden group fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <p className="font-medium">{benefit}</p>
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
                  <h2 className="text-3xl md:text-4xl font-bold">
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
                <h2 className="text-3xl md:text-4xl font-bold">Technologies We Use</h2>
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
                    className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden fade-in-up"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`${tech} logo`}
                          className="mx-auto mb-3 h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <Icon className="w-10 h-10 mx-auto mb-3 text-primary group-hover:text-accent transition-colors group-hover:scale-110 transform duration-300" />
                      )}
                      <span className="font-medium text-sm">{tech}</span>
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
                <h2 className="text-3xl font-bold">Use Cases</h2>
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
        <section className="py-20 bg-gradient-to-br from-primary to-accent">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center fade-in-up">
              <Lightbulb className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how our {service.title} solutions can help you achieve your goals and drive innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                    Get Started Today
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
