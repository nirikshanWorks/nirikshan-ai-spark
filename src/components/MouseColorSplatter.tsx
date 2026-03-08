import { useEffect, useRef } from "react";

export const MouseColorSplatter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
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
      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailRef.current.length > 30) trailRef.current.shift();
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = { x: t.clientX, y: t.clientY };
      trailRef.current.push({ x: t.clientX, y: t.clientY, alpha: 1 });
      if (trailRef.current.length > 30) trailRef.current.shift();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fading trail
      for (let i = 0; i < trailRef.current.length; i++) {
        const p = trailRef.current[i];
        p.alpha -= 0.025;
        if (p.alpha <= 0) continue;
        const size = p.alpha * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 80%, 65%, ${p.alpha * 0.5})`;
        ctx.fill();
      }
      trailRef.current = trailRef.current.filter((p) => p.alpha > 0);

      // Glow at cursor
      const { x, y } = mouseRef.current;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 18);
      grd.addColorStop(0, "hsla(210, 80%, 70%, 0.35)");
      grd.addColorStop(1, "hsla(210, 80%, 70%, 0)");
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

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
