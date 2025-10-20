import { useEffect, useRef, useState } from "react";

export const ComputerVisionGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<{ x: number; y: number; label: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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

    // Simulate object detections
    const simulateDetections = () => {
      const newDetections = [
        { x: canvas.width * 0.3, y: canvas.height * 0.4, label: "Object Detected" },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, label: "Feature Found" },
        { x: canvas.width * 0.5, y: canvas.height * 0.3, label: "Pattern Match" },
      ];
      setDetections(newDetections);
    };

    simulateDetections();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(120, 119, 198, 0.2)";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw scanning line
      ctx.strokeStyle = "rgba(120, 119, 198, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanLine);
      ctx.lineTo(canvas.width, scanLine);
      ctx.stroke();

      // Update scan line
      scanLine += scanDirection * 3;
      if (scanLine >= canvas.height || scanLine <= 0) {
        scanDirection *= -1;
      }

      // Draw detection boxes
      detections.forEach((detection) => {
        const boxSize = 80;
        const time = Date.now() * 0.002;
        const pulse = Math.sin(time) * 0.3 + 0.7;

        // Detection box
        ctx.strokeStyle = `rgba(120, 119, 198, ${pulse})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          detection.x - boxSize / 2,
          detection.y - boxSize / 2,
          boxSize,
          boxSize
        );

        // Corner markers
        const cornerSize = 10;
        ctx.lineWidth = 3;
        
        // Top-left
        ctx.beginPath();
        ctx.moveTo(detection.x - boxSize / 2, detection.y - boxSize / 2 + cornerSize);
        ctx.lineTo(detection.x - boxSize / 2, detection.y - boxSize / 2);
        ctx.lineTo(detection.x - boxSize / 2 + cornerSize, detection.y - boxSize / 2);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(detection.x + boxSize / 2 - cornerSize, detection.y - boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y - boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y - boxSize / 2 + cornerSize);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(detection.x - boxSize / 2, detection.y + boxSize / 2 - cornerSize);
        ctx.lineTo(detection.x - boxSize / 2, detection.y + boxSize / 2);
        ctx.lineTo(detection.x - boxSize / 2 + cornerSize, detection.y + boxSize / 2);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(detection.x + boxSize / 2 - cornerSize, detection.y + boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y + boxSize / 2);
        ctx.lineTo(detection.x + boxSize / 2, detection.y + boxSize / 2 - cornerSize);
        ctx.stroke();

        // Crosshair at center
        ctx.beginPath();
        ctx.moveTo(detection.x - 5, detection.y);
        ctx.lineTo(detection.x + 5, detection.y);
        ctx.moveTo(detection.x, detection.y - 5);
        ctx.lineTo(detection.x, detection.y + 5);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [detections]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-black/5 dark:bg-white/5 rounded-lg"
      style={{ minHeight: "400px" }}
    />
  );
};
