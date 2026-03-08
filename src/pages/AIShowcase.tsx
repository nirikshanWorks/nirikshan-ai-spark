import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ImageComparison } from "@/components/ImageComparison";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles, ScanLine, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const comparisons = [
  {
    title: "Defect Detection in Manufacturing",
    description: "AI identifies micro-defects invisible to the human eye on production lines.",
    before: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=700&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=700&h=400&fit=crop&sat=-100&con=1.3",
    category: "Manufacturing",
  },
  {
    title: "Medical Image Enhancement",
    description: "AI-powered enhancement reveals details in diagnostic imaging for better accuracy.",
    before: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&h=400&fit=crop&con=1.5&bri=10",
    category: "Healthcare",
  },
  {
    title: "Retail Heatmap Analysis",
    description: "Computer vision tracks customer movement patterns for optimized store layouts.",
    before: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=400&fit=crop&sat=50&con=1.2",
    category: "Retail",
  },
];

export default function AIShowcase() {
  return (
    <>
      <SEO title="AI Image Comparison Showcase | Nirikshan AI" description="See the power of AI-enhanced computer vision with interactive before/after comparisons across industries." />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" /> Interactive Showcase
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              See AI
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Transform</span> Reality
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drag the slider to compare original images with AI-enhanced results across different industries.
            </p>
          </motion.div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {comparisons.map((comp, i) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden border-2 border-border hover:border-primary/30 transition-colors">
                  <ImageComparison
                    beforeImage={comp.before}
                    afterImage={comp.after}
                    beforeLabel="Original"
                    afterLabel="AI Enhanced"
                    className="aspect-video"
                  />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{comp.category}</Badge>
                    <h3 className="text-xl font-bold mb-2">{comp.title}</h3>
                    <p className="text-muted-foreground">{comp.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <Eye className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Ready to See AI Work for You?</h2>
              <p className="text-muted-foreground mb-6">
                Our computer vision solutions are tailored to your specific industry and use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="gradient-primary">
                  <Link to="/contact">Get Started <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/object-detection-demo">Try Object Detection <ScanLine className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
