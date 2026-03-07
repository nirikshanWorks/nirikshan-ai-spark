import { useEffect, useRef } from "react";

interface StreamChar {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  fontSize: number;
}

export const AIDataStream = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const chars: StreamChar[] = [];
    const symbols = "01αβγδεζηθλμνπρστφψωΣΔΩ∞∫∂∇≈≠≤≥⊕⊗".split("");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initChars();
    };

    const initChars = () => {
      chars.length = 0;
      const columns = Math.floor(canvas.width / 20);
      for (let i = 0; i < columns; i++) {
        const streamLength = Math.floor(Math.random() * 15) + 5;
        for (let j = 0; j < streamLength; j++) {
          chars.push({
            x: i * 20 + Math.random() * 10,
            y: Math.random() * canvas.height - canvas.height,
            speed: Math.random() * 1.5 + 0.5,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            opacity: Math.random() * 0.3 + 0.05,
            fontSize: Math.random() * 6 + 10,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      chars.forEach((c) => {
        c.y += c.speed;
        if (c.y > canvas.height) {
          c.y = -20;
          c.char = symbols[Math.floor(Math.random() * symbols.length)];
        }

        ctx.font = `${c.fontSize}px monospace`;
        ctx.fillStyle = `rgba(120, 119, 198, ${c.opacity})`;
        ctx.fillText(c.char, c.x, c.y);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.4 }}
    />
  );
};
