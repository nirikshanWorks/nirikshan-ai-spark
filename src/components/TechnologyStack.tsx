import { Card } from "@/components/ui/card";

const technologies = [
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "Deep Learning" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Programming" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "PostgreSQL", category: "Database" },
  { name: "OpenCV", category: "Computer Vision" },
  { name: "FastAPI", category: "API" },
  { name: "MongoDB", category: "Database" },
  { name: "Kubernetes", category: "DevOps" },
];

export const TechnologyStack = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wider">Technology Stack</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Cutting-Edge Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We leverage the latest and most powerful technologies to build robust, scalable solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <Card 
              key={index} 
              className="p-6 text-center card-hover group cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{tech.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{tech.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
