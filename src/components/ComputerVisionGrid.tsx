import { useEffect, useRef, useState } from "react";

export const ComputerVisionGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<{ x: number; y: number; label: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gridSize = 40;
    let scanLine = 0;
    let scanDirection = 1;
    let frameCount = 0;
    let animationId: number;
    
    // Initialize detections once
    const staticDetections = [
      { x: canvas.width * 0.3, y: canvas.height * 0.4, label: "Object Detected" },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, label: "Feature Found" },
      { x: canvas.width * 0.5, y: canvas.height * 0.3, label: "Pattern Match" },
    ];
    setDetections(staticDetections);

    const animate = () => {
      frameCount++;

      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(120, 119, 198, 0.15)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(120, 119, 198, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanLine);
      ctx.lineTo(canvas.width, scanLine);
      ctx.stroke();

      scanLine += scanDirection * 2;
      if (scanLine >= canvas.height || scanLine <= 0) {
        scanDirection *= -1;
      }

      const time = Date.now() * 0.001;
      const pulse = Math.sin(time) * 0.2 + 0.6;

      detections.forEach((detection) => {
        const boxSize = 80;

        ctx.strokeStyle = `rgba(120, 119, 198, ${pulse})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          detection.x - boxSize / 2,
          detection.y - boxSize / 2,
          boxSize,
          boxSize
        );

        const cornerSize = 10;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(detection.x - boxSize / 2, detection.y - boxSize / 2 + cornerSize);
        ctx.lineTo(detection.x - boxSize / 2, detection.y - boxSize / 2);
        ctx.lineTo(detection.x - boxSize / 2 + cornerSize, detection.y - boxSize / 2);
        ctx.moveTo(detection.x + boxSize / 2 - cornerSize, detection.y - boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y - boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y - boxSize / 2 + cornerSize);
        ctx.moveTo(detection.x - boxSize / 2, detection.y + boxSize / 2 - cornerSize);
        ctx.lineTo(detection.x - boxSize / 2, detection.y + boxSize / 2);
        ctx.lineTo(detection.x - boxSize / 2 + cornerSize, detection.y + boxSize / 2);
        ctx.moveTo(detection.x + boxSize / 2 - cornerSize, detection.y + boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y + boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y + boxSize / 2 - cornerSize);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-black/5 dark:bg-white/5 rounded-lg"
      style={{ minHeight: "400px" }}
    />
  );
};
