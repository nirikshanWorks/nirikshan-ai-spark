import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Clock, ArrowRight, TrendingUp, Eye, Brain, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = ["All", "Computer Vision", "Generative AI", "Agentic AI", "Industry Insights", "Tutorials"];

const articles = [
  {
    id: 1,
    title: "How Computer Vision is Revolutionizing Quality Control in Manufacturing",
    excerpt: "Discover how AI-powered visual inspection systems are detecting defects with 99.9% accuracy, reducing waste and increasing production efficiency by 40%.",
    category: "Computer Vision",
    readTime: "8 min read",
    date: "Mar 5, 2026",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=340&fit=crop",
    icon: Eye,
    featured: true,
  },
  {
    id: 2,
    title: "Building Autonomous AI Agents: A Complete Architecture Guide",
    excerpt: "Learn the core principles behind designing multi-agent AI systems that can reason, plan, and execute complex business workflows independently.",
    category: "Agentic AI",
    readTime: "12 min read",
    date: "Mar 2, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=340&fit=crop",
    icon: Bot,
    featured: true,
  },
  {
    id: 3,
    title: "Generative AI for Enterprise: Beyond ChatGPT",
    excerpt: "Explore how enterprises are leveraging fine-tuned LLMs, RAG architectures, and custom generative models to transform their operations.",
    category: "Generative AI",
    readTime: "10 min read",
    date: "Feb 28, 2026",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Real-Time Object Detection: YOLO vs Transformer-Based Models",
    excerpt: "A technical comparison of modern object detection architectures, their trade-offs, and when to use each approach in production systems.",
    category: "Computer Vision",
    readTime: "15 min read",
    date: "Feb 24, 2026",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop",
    icon: Eye,
  },
  {
    id: 5,
    title: "AI in Healthcare: Computer Vision for Medical Imaging",
    excerpt: "How deep learning models are assisting radiologists in detecting anomalies in X-rays, MRIs, and CT scans with superhuman accuracy.",
    category: "Industry Insights",
    readTime: "9 min read",
    date: "Feb 20, 2026",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=340&fit=crop",
    icon: TrendingUp,
  },
  {
    id: 6,
    title: "Getting Started with OpenCV and Python: Hands-on Tutorial",
    excerpt: "A beginner-friendly guide to building your first computer vision application with OpenCV, including face detection, edge detection, and image segmentation.",
    category: "Tutorials",
    readTime: "20 min read",
    date: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910auj9?w=600&h=340&fit=crop",
    icon: Brain,
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <>
      <SEO title="AI Knowledge Hub | Blog | Nirikshan AI" description="Expert insights on Computer Vision, Generative AI, and Agentic AI. Stay updated with the latest trends, tutorials, and industry use cases." />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="w-3 h-3 mr-1" /> Knowledge Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              AI Insights &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Research</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dives into computer vision, generative AI, and autonomous systems — from our team of experts.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "gradient-primary" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
              {featured.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Rest of Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                      <span className="text-xs text-primary font-medium flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
