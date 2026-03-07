import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, BarChart3, Users, Share2, Monitor, CheckCircle2, Target, TrendingUp, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    id: 1,
    icon: Brain,
    title: "AI Campaign Strategy Intelligence",
    description: "We help organizations design data-driven campaign strategies using artificial intelligence. Our AI systems analyze large datasets to identify the most effective messaging and campaign direction.",
    subtitle: "What we analyze:",
    features: [
      "Public sentiment and trending issues",
      "Region-wise political and social priorities",
      "Strong vs weak constituencies",
      "Candidate perception and reputation analytics",
    ],
    narrativeTitle: "Example narratives AI may detect:",
    narratives: [
      "Development and infrastructure",
      "Employment opportunities",
      "Farmer welfare and agriculture support",
      "Youth and entrepreneurship",
    ],
    footer: "This allows campaigns to focus on the issues that actually matter to the public.",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "AI Data Analytics & Voter Insights",
    description: "Our platform works on real data, not assumptions. We combine multiple data sources and apply AI analytics to generate actionable insights.",
    subtitle: "Data sources include:",
    features: [
      "Voter demographics and census data",
      "Booth-level voting patterns",
      "Social media sentiment analysis",
      "Ground survey data collected from field teams",
    ],
    narrativeTitle: "Using AI, we identify:",
    narratives: [
      "Key communities and demographics influencing elections",
      "Geographic regions requiring stronger campaign focus",
      "Issue-based voter behavior patterns",
    ],
    footer: "This enables campaigns to make strategic decisions backed by data.",
  },
  {
    id: 3,
    icon: Users,
    title: "AI-Powered Ground Campaign Intelligence",
    description: "We build intelligent systems that help manage large volunteer networks and field operations.",
    subtitle: "Our AI-powered field intelligence platform supports:",
    features: [
      "Volunteer and booth-level workforce management",
      "Door-to-door campaign tracking",
      "Local event monitoring and reporting",
      "Field-level data collection and analysis",
    ],
    narrativeTitle: null,
    narratives: [],
    footer: "AI converts ground-level data into real-time dashboards and insights, helping campaign leaders understand what is happening at the grassroots level.",
  },
  {
    id: 4,
    icon: Share2,
    title: "AI Social Media & Digital Influence Monitoring",
    description: "Nirikshan AI provides advanced tools to monitor and optimize digital campaign performance.",
    subtitle: "Our AI analyzes:",
    features: [
      "Instagram, Facebook, and Twitter engagement trends",
      "Public opinion and sentiment shifts",
      "Viral topics and emerging narratives",
      "Performance of digital campaigns and advertisements",
    ],
    narrativeTitle: "Capabilities include:",
    narratives: [
      "AI-driven content performance analysis",
      "Target audience segmentation",
      "Digital influence monitoring",
      "Real-time perception tracking",
    ],
    footer: "This helps campaigns build stronger digital presence and understand public reactions instantly.",
  },
  {
    id: 5,
    icon: Monitor,
    title: "AI Campaign Technology Platforms",
    description: "We develop custom AI-powered technology platforms to support large-scale campaigns.",
    subtitle: "Our technology solutions include:",
    features: [
      "Volunteer management applications",
      "Campaign performance dashboards",
      "Public survey and feedback systems",
      "Voter data intelligence platforms",
    ],
    narrativeTitle: null,
    narratives: [],
    footer: "These platforms integrate AI, data analytics, and real-time monitoring to provide decision-makers with clear and actionable insights.",
  },
];

const stats = [
  { value: "150+", label: "Campaigns Supported", icon: Target },
  { value: "10M+", label: "Data Points Analyzed", icon: BarChart3 },
  { value: "98%", label: "Prediction Accuracy", icon: TrendingUp },
  { value: "12+", label: "States Covered", icon: Globe2 },
];

const CampaignIntelligence = () => {
  const heroRef = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero */}
        <section
          ref={heroRef.ref}
          className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10"
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${heroRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Nirikshan AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              AI-Powered Campaign{" "}
              <span className="text-gradient">Intelligence Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10">
              Data-driven campaign strategy, voter analytics, ground intelligence, and digital influence monitoring — powered by advanced artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="gradient-primary">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/expertise">
                <Button size="lg" variant="outline">
                  Explore All Expertise
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="mx-auto mb-2 text-primary" size={24} />
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Campaign Intelligence Services
              </h2>
              <p className="text-muted-foreground text-lg">
                End-to-end AI solutions for modern campaign management and strategic decision-making.
              </p>
            </div>

            <div className="space-y-16">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const isEven = idx % 2 === 1;
                return (
                  <Card
                    key={service.id}
                    className="relative overflow-hidden border-2 border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
                    <div className={`relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 ${isEven ? "md:direction-rtl" : ""}`}>
                      {/* Left / Content */}
                      <div className="space-y-6" style={{ direction: "ltr" }}>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                            <Icon className="text-white" size={28} />
                          </div>
                          <div>
                            <Badge variant="secondary" className="mb-1 text-xs">
                              Service {service.id}
                            </Badge>
                            <h3 className="text-2xl font-bold">{service.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <div>
                          <p className="font-semibold text-sm text-foreground mb-3">{service.subtitle}</p>
                          <ul className="space-y-2">
                            {service.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={16} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right / Extra */}
                      <div className="space-y-6" style={{ direction: "ltr" }}>
                        {service.narrativeTitle && service.narratives.length > 0 && (
                          <div className="rounded-xl bg-secondary/50 border border-border p-6">
                            <p className="font-semibold text-sm text-foreground mb-3">{service.narrativeTitle}</p>
                            <ul className="space-y-2">
                              {service.narratives.map((n) => (
                                <li key={n} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                  {n}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="rounded-xl bg-primary/5 border border-primary/10 p-6">
                          <p className="text-sm text-foreground leading-relaxed font-medium">
                            {service.footer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Campaign Strategy?
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
              <p className="text-lg text-muted-foreground mb-10">
                Let Nirikshan AI power your next campaign with data-driven intelligence and real-time insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gradient-primary">
                    Talk to an Expert <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button size="lg" variant="outline">View Case Studies</Button>
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

export default CampaignIntelligence;
