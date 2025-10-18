import { Card } from "@/components/ui/card";
import { Shield, Zap, Target, HeartHandshake, Award, Clock } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Proven Expertise",
    description: "Years of experience delivering AI and software solutions across multiple industries"
  },
  {
    icon: Zap,
    title: "Fast Implementation",
    description: "Agile development approach ensures rapid deployment without compromising quality"
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Focused on delivering measurable outcomes that directly impact your bottom line"
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric",
    description: "Your success is our priority. We work as an extension of your team"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control at every stage of development"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated support team available round the clock to assist you"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wider">Why Partner With Us</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Nirikshan AI</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We combine technical excellence with business acumen to deliver solutions that truly make a difference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card key={index} className="p-8 card-hover group border-2 border-border hover:border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <benefit.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
