import { Card } from "@/components/ui/card";

const technologies = [
  {
    name: "TensorFlow",
    category: "AI/ML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    category: "Deep Learning",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "React",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    category: "Programming",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Docker",
    category: "DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    category: "Cloud",
    logo: "https://www.svgrepo.com/show/448299/aws.svg",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "OpenCV",
    category: "Computer Vision",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  },
  {
    name: "FastAPI",
    category: "API",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "MongoDB",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
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
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="flex flex-col items-center justify-center gap-3 p-6 text-center card-hover group cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300"
            >
              <img
                src={tech.logo}
                alt={`${tech.name} logo`}
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tech.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{tech.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
