import { Card } from "@/components/ui/card";
import { Lightbulb, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Discovery & Strategy",
    description: "We analyze your business needs and design a customized AI strategy that aligns with your goals."
  },
  {
    icon: Code2,
    step: "02",
    title: "Development & Integration",
    description: "Our expert team builds and integrates cutting-edge solutions seamlessly into your existing systems."
  },
  {
    icon: Rocket,
    step: "03",
    title: "Deployment & Launch",
    description: "We ensure smooth deployment with rigorous testing and quality assurance before going live."
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Optimize & Scale",
    description: "Continuous monitoring and optimization to maximize performance and drive sustainable growth."
  }
];

export const ProcessSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wider">Our Process</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How We Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, we follow a proven methodology to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 card-hover relative group border-2 border-border hover:border-primary/50">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-xl">
                {step.step}
              </div>
              <div className="mb-6 mt-4">
                <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <step.icon className="text-white" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
