import { useState } from "react";

const holiColors = [
  "#FF6B9D", "#F97316", "#FACC15", "#4ADE80", "#6366F1",
  "#22D3EE", "#A855F7", "#F43F5E", "#34D399", "#FB923C",
];

export const HoliText = ({
  children,
  className = "",
  tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  tag?: string;
}) => {
  const Tag = tag as React.ElementType;
  const [hovered, setHovered] = useState(false);
  const [gradient] = useState(() => {
    const c1 = holiColors[Math.floor(Math.random() * holiColors.length)];
    const c2 = holiColors[Math.floor(Math.random() * holiColors.length)];
    const c3 = holiColors[Math.floor(Math.random() * holiColors.length)];
    return `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
  });

  return (
    <Tag
      className={`transition-all duration-700 cursor-default ${className}`}
      style={{
        ...(hovered
          ? {
              backgroundImage: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "saturate(1.4)",
            }
          : {
              filter: "grayscale(100%)",
              WebkitTextFillColor: "inherit",
            }),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Tag>
  );
};
