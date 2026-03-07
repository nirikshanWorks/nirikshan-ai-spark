import { motion } from "framer-motion";

export const AICircuitLines = ({ className = "" }: { className?: string }) => {
  const lines = [
    { x1: "5%", y1: "20%", x2: "25%", y2: "20%", delay: 0 },
    { x1: "25%", y1: "20%", x2: "25%", y2: "50%", delay: 0.3 },
    { x1: "25%", y1: "50%", x2: "45%", y2: "50%", delay: 0.6 },
    { x1: "75%", y1: "15%", x2: "75%", y2: "45%", delay: 0.2 },
    { x1: "75%", y1: "45%", x2: "95%", y2: "45%", delay: 0.5 },
    { x1: "50%", y1: "70%", x2: "80%", y2: "70%", delay: 0.4 },
    { x1: "80%", y1: "70%", x2: "80%", y2: "90%", delay: 0.7 },
    { x1: "10%", y1: "80%", x2: "40%", y2: "80%", delay: 0.1 },
    { x1: "40%", y1: "80%", x2: "40%", y2: "60%", delay: 0.4 },
    { x1: "60%", y1: "30%", x2: "90%", y2: "30%", delay: 0.8 },
  ];

  const nodes = [
    { cx: "25%", cy: "20%", delay: 0.3 },
    { cx: "25%", cy: "50%", delay: 0.6 },
    { cx: "45%", cy: "50%", delay: 0.9 },
    { cx: "75%", cy: "15%", delay: 0.2 },
    { cx: "75%", cy: "45%", delay: 0.5 },
    { cx: "80%", cy: "70%", delay: 0.7 },
    { cx: "40%", cy: "80%", delay: 0.4 },
    { cx: "40%", cy: "60%", delay: 0.7 },
    { cx: "60%", cy: "30%", delay: 0.8 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="hsl(var(--primary) / 0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: line.delay, ease: "easeInOut" }}
          />
        ))}
        {/* Animated pulse along lines */}
        {lines.map((line, i) => (
          <motion.line
            key={`glow-${i}`}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, delay: line.delay + 1.5, repeat: Infinity, repeatDelay: 3 + i * 0.5 }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.cx} cy={node.cy} r="3"
            fill="hsl(var(--primary) / 0.4)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0.5] }}
            transition={{ duration: 0.6, delay: node.delay + 0.5 }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={node.cx} cy={node.cy} r="3"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 3], opacity: [0.4, 0] }}
            transition={{ duration: 2, delay: node.delay + 2, repeat: Infinity, repeatDelay: 4 }}
          />
        ))}
      </svg>
    </div>
  );
};
