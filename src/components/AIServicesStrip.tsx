import { motion } from "framer-motion";
import {
  Eye,
  Brain,
  Bot,
  Cpu,
  Scan,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Object detection, visual inspection & real-time image analysis",
    color: "from-violet-500/20 to-fuchsia-500/20",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-400",
    glowColor: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Brain,
    title: "Generative AI",
    desc: "LLM integration, content generation & intelligent data synthesis",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    glowColor: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous multi-step workflows that reason, plan & execute",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: Cpu,
    title: "AI Automation",
    desc: "End-to-end process automation powered by machine learning",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    glowColor: "group-hover:shadow-amber-500/20",
  },
  {
    icon: Scan,
    title: "ML & Analytics",
    desc: "Predictive models, anomaly detection & data-driven insights",
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    glowColor: "group-hover:shadow-rose-500/20",
  },
  {
    icon: Sparkles,
    title: "AI Consulting",
    desc: "Strategic AI roadmaps, readiness audits & transformation plans",
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    glowColor: "group-hover:shadow-indigo-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AIServicesStrip() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.08),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
            What We Build
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            AI Solutions Across{" "}
            <span className="text-gradient">Every Dimension</span>
          </h2>
        </motion.div>

        {/* Pillar Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={itemVariants}
              className={`group relative rounded-xl border ${pillar.borderColor} bg-gradient-to-br ${pillar.color} backdrop-blur-sm p-4 md:p-5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${pillar.glowColor}`}
            >
              {/* Glow dot */}
              <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${pillar.iconColor} opacity-60 animate-pulse`} />

              <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center mb-3 bg-background/50 border border-white/10`}>
                <pillar.icon className={`w-5 h-5 md:w-5.5 md:h-5.5 ${pillar.iconColor}`} />
              </div>

              <h3 className="text-sm md:text-[15px] font-semibold mb-1.5 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-6"
        >
          <Link
            to="/expertise"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline underline-offset-4 transition-colors"
          >
            Explore All Capabilities →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
