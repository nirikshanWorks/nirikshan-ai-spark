import { useEffect, useRef } from "react";

const holiColors = [
  "#FF6B9D", "#F97316", "#FACC15", "#4ADE80", "#6366F1",
  "#22D3EE", "#A855F7", "#F43F5E", "#34D399", "#FB923C",
];

interface Splat {
  x: number;
  y: number;
  r: number;
  color: string;
  alpha: number;
  born: number;
}

export const MouseColorSplatter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splatsRef = useRef<Splat[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastSplatRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (now - lastSplatRef.current > 40) {
        lastSplatRef.current = now;
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) {
          splatsRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 30,
            y: e.clientY + (Math.random() - 0.5) * 30,
            r: Math.random() * 18 + 6,
            color: holiColors[Math.floor(Math.random() * holiColors.length)],
            alpha: 0.6 + Math.random() * 0.3,
            born: now,
          });
        }
      }
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = { x: t.clientX, y: t.clientY };
      const now = Date.now();
      if (now - lastSplatRef.current > 40) {
        lastSplatRef.current = now;
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) {
          splatsRef.current.push({
            x: t.clientX + (Math.random() - 0.5) * 30,
            y: t.clientY + (Math.random() - 0.5) * 30,
            r: Math.random() * 18 + 6,
            color: holiColors[Math.floor(Math.random() * holiColors.length)],
            alpha: 0.6 + Math.random() * 0.3,
            born: now,
          });
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Draw cursor glow
      const grd = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 25
      );
      const cursorColor = holiColors[Math.floor(now / 200) % holiColors.length];
      grd.addColorStop(0, cursorColor + "55");
      grd.addColorStop(1, cursorColor + "00");
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 25, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Draw splats
      splatsRef.current.forEach((s) => {
        const age = (now - s.born) / 2500; // fade over 2.5s
        const a = Math.max(0, s.alpha * (1 - age));
        if (a <= 0) return;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.8 + age * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Cleanup old splats
      splatsRef.current = splatsRef.current.filter((s) => now - s.born < 2500);

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};
