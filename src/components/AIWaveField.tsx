import { useEffect, useRef } from "react";

export const AIWaveField = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      const cols = 40;
      const rows = 20;
      const spacingX = canvas.width / cols;
      const spacingY = canvas.height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacingX + spacingX / 2;
          const y = j * spacingY + spacingY / 2;

          // 3D wave displacement
          const wave = Math.sin(i * 0.3 + time) * Math.cos(j * 0.3 + time * 0.7) * 8;
          const scale = (Math.sin(i * 0.2 + j * 0.2 + time * 0.5) + 1) / 2;
          const radius = 1 + scale * 2;
          const opacity = 0.1 + scale * 0.25;

          ctx.beginPath();
          ctx.arc(x, y + wave, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.fill();

          // Draw connections to neighbors
          if (i < cols - 1) {
            const nx = (i + 1) * spacingX + spacingX / 2;
            const nWave = Math.sin((i + 1) * 0.3 + time) * Math.cos(j * 0.3 + time * 0.7) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y + wave);
            ctx.lineTo(nx, y + nWave);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          if (j < rows - 1) {
            const ny = (j + 1) * spacingY + spacingY / 2;
            const nWave = Math.sin(i * 0.3 + time) * Math.cos((j + 1) * 0.3 + time * 0.7) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y + wave);
            ctx.lineTo(x, ny + nWave);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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
      style={{ opacity: 0.35 }}
    />
  );
};
