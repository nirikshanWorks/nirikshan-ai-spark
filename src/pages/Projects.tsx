import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const projects = [
  {
    title: "AI Inventory Management System",
    description: "Developing a smart inventory management system for one of South Africa's leading pet Bottles product companies.",
    category: "AI Solution",
    image: "https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/09/05030019/AI-in-inventory-management.svg",
    date: "December 15, 2024",
    status: "Ongoing",
    client: "Madapet, South Africa",
    tags: ["AI", "Inventory", "Management"],
  },
  {
    title: "Quality Control Automation",
    description: "AI-driven quality control and automation solutions for one of the world's largest automotive component manufacturers.",
    category: "Computer Vision",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIRG1qRCwp_bsnMXyoYzljPWM1sMaTy56UIQ&s",
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
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760831949/ecfed79c-bc46-4cc8-a0e1-c88a9b71d385.png",
    date: "June 11, 2025",
    status: "Ongoing",
    client: "Multiple Clients",
    tags: ["CRM", "Software", "Development"],
  },
  {
    title: "Class Test Proctor",
    description: "An AI-powered online exam monitoring tool using OpenCV and Python to detect cheating with 95% accuracy. Features real-time student tracking, automated grading, and scheduling, cutting manual effort by 40%.",
    category: "AI Solution",
    image: "https://cdn-media-assets.socratease.co/autoproctor/marketing/landing-page/hero-section/ap-hero.svg",
    date: "March 04, 2025",
    status: "Ongoing",
    client: "Universities and Educational Institutions",
    tags: ["AI", "Proctoring", "Education"],
  },
  {
    title: "Hackathon Evaluation System",
    description: "A real-time hackathon management platform enabling multi-judge scoring, automated result calculation, and live leaderboards. Built with React.js, Supabase, and Docker, it reduced evaluation time by 50% and streamlined team registration and event coordination.",
    category: "Software Development",
    image: "https://blog.learnyst.com/hubfs/Imported_Blog_Media/Digital-evaluation-1-1.jpg",
    date: "April 18, 2025",
    status: "Completed",
    client: "Dev Bhoomi Uttarakhand University",
    tags: ["Automation", "Hackathon", "Analytics"],
  },
  {
    title: "PG-HOTEL Website",
    description: "Responsive web portal connecting PG operators with students, featuring availability search, bookings, and digital payments.",
    category: "Website Development",
    image: "https://res.cloudinary.com/dch0uyw8e/image/upload/v1760831341/b0a3ac2c-022b-41d7-8734-fe5e411bc0d8.png",
    date: "May 27, 2025",
    status: "Completed",
    client: "Ashiyana PG",
    tags: ["Web", "Booking", "Hospitality"],
  },
];

const uniqueCategories = new Set(projects.map((project) => project.category));
const totalDomains = uniqueCategories.size;
const ongoingProjectsCount = projects.filter((project) => project.status.toLowerCase() === "ongoing").length;
const uniqueTagCount = new Set(projects.flatMap((project) => project.tags)).size;

const heroHighlights = [
  { label: "Active Engagements", value: `${ongoingProjectsCount}+` },
  { label: "Solution Domains", value: totalDomains.toString() },
  { label: "Specialist Skills", value: uniqueTagCount.toString() },
];

const Projects = () => {
  const projectsRef = useScrollAnimation(0.2);
  const filteredProjects = projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-900 relative overflow-x-hidden">
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
          <section className="relative overflow-hidden">
            <div className="absolute inset-0">
              <video
                src="https://res.cloudinary.com/dch0uyw8e/video/upload/v1760826232/2_sxecvw.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-900/80" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 left-8 h-20 w-20 rounded-2xl border border-white/15 rotate-12" />
              <div className="absolute bottom-8 right-12 h-24 w-24 rounded-full border border-white/10" />
              <div className="absolute top-1/2 left-1/3 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-10">
                <div className="max-w-3xl mx-auto animate-fade-in-up">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-5">
                    Curated Transformation Stories
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Engineering Practical Impact, One Build at a Time
                  </h1>
                  <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                    Discover how AI, cloud, and full-stack engineering come together to unlock measurable outcomes across industries.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button size="lg" className="gradient-primary hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                        Start a Project
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                    <Link to="/case-studies">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white"
                      >
                        See Case Studies
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl">
                  {heroHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white text-center sm:text-left backdrop-blur-md"
                    >
                      <p className="text-sm text-white/70 mb-1">{item.label}</p>
                      <p className="text-2xl font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        {/* Projects Grid */}
        <section className="py-20 container mx-auto px-6 relative" ref={projectsRef.ref}>
          <div
            className={`transition-all duration-1000 ${
              projectsRef.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-10"
            }`}
          >
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
                <Link to="/expertise/artificial-intelligence">
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
