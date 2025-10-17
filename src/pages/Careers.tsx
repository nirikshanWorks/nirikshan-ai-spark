import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const openings = [
  {
    title: "Senior AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    description: "Lead development of cutting-edge machine learning models and AI solutions for enterprise clients.",
  },
  {
    title: "Computer Vision Specialist",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    description: "Design and implement advanced computer vision systems for quality control and automation projects.",
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote / Pune",
    type: "Full-time",
    description: "Build scalable web applications using React, Node.js, and modern cloud technologies.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful, user-centered designs for web and mobile applications serving millions of users.",
  },
  {
    title: "Data Scientist",
    department: "Data",
    location: "Bangalore / Remote",
    type: "Full-time",
    description: "Extract insights from complex datasets and build predictive models to drive business decisions.",
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Manage cloud infrastructure, CI/CD pipelines, and ensure reliability of production systems.",
  },
];

const benefits = [
  "Competitive salary and equity",
  "Health insurance for you and family",
  "Flexible work arrangements",
  "Learning & development budget",
  "Latest tech equipment",
  "Annual team retreats",
];

const Careers = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build the future of AI-powered business solutions with passionate engineers, designers, 
              and innovators from around the world.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Nirikshan AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building something special, and we want you to be part of it
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Impactful Work</h3>
              <p className="text-muted-foreground">
                Work on projects that make a real difference. Our solutions impact millions of 
                users and transform entire industries.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Growth & Learning</h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities, mentorship from experts, and access to cutting-edge 
                technologies and training resources.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Great Culture</h3>
              <p className="text-muted-foreground">
                Collaborative, inclusive environment where your ideas matter. We celebrate diversity 
                and value every team member's perspective.
              </p>
            </Card>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground">
                Find your next challenge
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {openings.map((job, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin size={16} className="mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock size={16} className="mr-1" />
                              {job.type}
                            </div>
                            <Badge variant="secondary">{job.department}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to="/contact">
                      <Button className="gradient-primary whitespace-nowrap">
                        Apply Now
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take care of our team
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See the Right Role?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let's talk 
              about how you can contribute to our mission.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-primary">
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
