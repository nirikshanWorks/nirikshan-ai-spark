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
    description: "Developing a smart inventory management system for one of South Africa's leading pet Bottles product companies.",
    category: "AI Solution",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760795655/12e3dde7-bc13-486f-af71-fa585cf8a57c.png",
    date: "December 15, 2024",
    status: "Ongoing",
    client: "Madapet, South Africa",
    tags: ["AI", "Inventory", "Management"],
  },
  {
    title: "Quality Control Automation",
    description: "AI-driven quality control and automation solutions for one of the world's largest automotive component manufacturers.",
    category: "Computer Vision",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760795913/Gemini_Generated_Image_ys6oz3ys6oz3ys6o_qk9jag.png",
    date: "January 10, 2025",
    status: "Ongoing",
    client: "Motherson Group, India",
    tags: ["AI", "Quality Control", "Automation"],
  },
  {
    title: "Custom CRM Development",
    description: "Building customized Customer Relationship Management systems that streamline communication and enhance customer satisfaction.",
    category: "Software Development",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760796015/941ffcc7-5bc0-4448-b651-df0720eb136f.png",
    date: "February 22, 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "Software", "Development"],
  },
  {
    title: "Hostel Student Tracking System",
    description: "Building customized Hostel Student Tracking system that streamline Hostel management and enhance student and parent experience.",
    category: "Software Development",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760796015/941ffcc7-5bc0-4448-b651-df0720eb136f.png",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Blob 1 */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        {/* Gradient Blob 2 */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        {/* Gradient Blob 3 */}
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />

        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-20 md:py-32 bg-gradient-to-br from-blue-100/40 via-purple-100/20 to-blue-50/40 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-slate-900/50 backdrop-blur-sm border-b border-blue-200/20 dark:border-blue-900/20">
            <div className="container mx-auto px-6 text-center relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 border border-blue-200/30 dark:border-blue-800/30 rounded-lg rotate-45"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 border border-purple-200/20 dark:border-purple-800/20 rounded-full"></div>
              </div>

              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">
                  Our Projects
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6 shadow-lg"></div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Explore our portfolio of innovative AI and software solutions transforming businesses across industries worldwide
                </p>
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section className="py-12 container mx-auto px-6 relative" ref={filterRef.ref}>
            <div className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 ${
              filterRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}>
              <div className="flex items-center gap-2 mr-4">
                <Filter size={20} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Filter by:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "gradient-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                      : "bg-white dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-700/50 text-foreground border border-blue-200/50 dark:border-blue-900/50 hover:border-blue-400/50 dark:hover:border-blue-700/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

        {/* Projects Grid */}
        <section className="py-20 container mx-auto px-6 relative" ref={projectsRef.ref}>
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
        <section className="py-20 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-blue-600/5 border-y border-blue-200/30 dark:border-blue-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "4+", label: "Active Projects" },
                { value: "3", label: "Countries" },
                { value: "5+", label: "Team Members" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, idx) => (
                <div key={idx} className="group p-6 rounded-xl bg-white/50 dark:bg-slate-800/30 border border-blue-200/20 dark:border-blue-900/20 hover:border-blue-400/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 group-hover:drop-shadow-lg transition-all duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-blue-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-slate-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Interested in a Project?
              </h2>
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
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  );
};

export default Projects;
