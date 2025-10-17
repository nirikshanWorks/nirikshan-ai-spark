import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroTeam from "@/assets/hero-team.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[400px] overflow-hidden">
          <img src={heroTeam} alt="Our Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Who We Are</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Pioneering the future of AI-driven business transformation
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Target className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We're here to bring the power of AI to everyone, not just the big players. Think of us as your local AI partner – making smart technology simple, affordable, and actually useful for businesses like yours. Whether you're running a startup, a small business, or have a great idea you want to bring to life, we're here to help turn complex AI into practical solutions that make a real difference in our community. No corporate jargon, just real solutions for real people.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Eye className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the global leader in AI-powered business transformation, recognized for our ability to 
                    turn visionary ideas into tangible outcomes. We envision a future where every enterprise can 
                    harness the full potential of artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client-Centric</h3>
                <p className="text-muted-foreground">
                  Your success is our success. We prioritize understanding your unique challenges and delivering 
                  solutions that exceed expectations.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, from code quality to customer service, 
                  ensuring exceptional outcomes.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We stay at the forefront of technology, continuously exploring new ways to solve problems and 
                  create value for our clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a vision to democratize AI technology, Nirikshan AI Pvt. Ltd. bridges the gap between artificial intelligence and real-world business solutions. We're your local AI partner, making smart technology simple, affordable, and actually useful.
              </p>
              <p>
                Our journey began when we recognized that businesses wanted to leverage AI but struggled with complexity and cost. We set out to change that by building practical solutions that deliver real value.
              </p>
              <p>
                Today, we work with clients across various industries - from veterinary and pet products in South Africa to automotive manufacturing in India. Our team combines deep expertise in AI, machine learning, computer vision, and software development with a genuine commitment to understanding your business needs.
              </p>
              <p>
                What sets us apart is our approach: no corporate jargon, just real solutions for real people. We don't just build software - we build ideas and turn them into impactful digital solutions that make a difference.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us on This Journey</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking for a technology partner or want to be part of our team, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="gradient-primary">
                  Get in Touch
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/careers">
                <Button size="lg" variant="outline">
                  View Open Positions
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

export default About;
