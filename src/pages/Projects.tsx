import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const projects = [
  {
    title: "AI Inventory Management System",
    description: "Developing a smart inventory management system for one of South Africa's leading veterinary and pet product companies.",
    category: "AI Solution",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
    date: "December 15, 2024",
    status: "Ongoing",
    client: "Madapet, South Africa",
    tags: ["AI", "Inventory", "Management"],
  },
  {
    title: "Quality Control Automation",
    description: "AI-driven quality control and automation solutions for one of the world's largest automotive component manufacturers.",
    category: "Computer Vision",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    date: "January 10, 2025",
    status: "Ongoing",
    client: "Motherson Group, India",
    tags: ["AI", "Quality Control", "Automation"],
  },
  {
    title: "Custom CRM Development",
    description: "Building customized Customer Relationship Management systems that streamline communication and enhance customer satisfaction.",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    date: "February 22, 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "Software", "Development"],
  },
  {
    title: "Dorm Student Tracking System",
    description: "Building customized Dorm Student Tracking system that streamline Dorm management and enhance student and parent experience.",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    date: "June 11, 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "Software", "Development"],
  },
];

const categories = ["All", "AI Solution", "Computer Vision", "Software Development"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const projectsRef = useScrollAnimation(0.2);
  const filterRef = useScrollAnimation(0.1);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of innovative AI and software solutions transforming businesses across industries worldwide
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 container mx-auto px-6" ref={filterRef.ref}>
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 ${
            filterRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
            <div className="flex items-center gap-2 mr-4">
              <Filter size={20} className="text-blue-600" />
              <span className="font-semibold">Filter by:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "gradient-primary text-white shadow-lg"
                    : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 container mx-auto px-6" ref={projectsRef.ref}>
          <div className={`transition-all duration-1000 ${
            projectsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "4+", label: "Active Projects" },
                { value: "3", label: "Countries" },
                { value: "5+", label: "Team Members" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in a Project?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have an idea you'd like to transform into reality? Get in touch with our team and let's discuss how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  Start Your Project
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/expertise/ai-ml">
                <Button size="lg" variant="outline" className="hover:bg-secondary transition-all duration-300 transform hover:scale-105">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
