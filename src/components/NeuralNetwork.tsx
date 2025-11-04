import { useEffect, useRef } from "react";

export const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mousePosition = { current: null as { x: number; y: number } | null };

    const updateMousePosition = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mousePosition.current = {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      };
    };

    const clearMousePosition = () => {
      mousePosition.current = null;
    };

    canvas.addEventListener("mousemove", updateMousePosition);
    canvas.addEventListener("mouseleave", clearMousePosition);

    // Neural network layers
    const layers = [4, 6, 6, 3];
    const nodeRadius = 8;
    const nodeAnnotations: string[][][] = [
      [
        ["Sensor Video", "Streams"],
        ["Field Vision", "Imagery"],
        ["Operational", "Telemetry"],
        ["Customer", "Feedback"],
      ],
      [
        ["Object", "Tagging"],
        ["Pose", "Estimation"],
        ["Text", "Parsing"],
        ["Anomaly", "Scoring"],
        ["Sentiment", "Signals"],
        ["Temporal", "Context"],
      ],
      [
        ["Vision-Language", "Fusion"],
        ["Knowledge", "Graphs"],
        ["LLM", "Orchestration"],
        ["Policy", "Reasoning"],
        ["Scenario", "Simulation"],
        ["Risk", "Ranking"],
      ],
      [
        ["Quality", "Alerts"],
        ["Predictive", "Maintenance"],
        ["Customer", "Insights"],
      ],
    ];
    const labelOffsets: { x: number; align: CanvasTextAlign }[] = [
      { x: -90, align: "right" },
      { x: -70, align: "right" },
      { x: 70, align: "left" },
      { x: 90, align: "left" },
    ];

    const layerSpacing = canvas.width / (layers.length + 1);

    let time = 0;
    let frameCount = 0;
    let animationId: number;

    const getNodePositions = () => {
      const positions: { x: number; y: number }[][] = [];
      
      layers.forEach((nodeCount, layerIndex) => {
        const layerPositions: { x: number; y: number }[] = [];
        const x = layerSpacing * (layerIndex + 1);
        const verticalSpacing = canvas.height / (nodeCount + 1);
        
        for (let i = 0; i < nodeCount; i++) {
          const y = verticalSpacing * (i + 1);
          layerPositions.push({ x, y });
        }
        
        positions.push(layerPositions);
      });
      
      return positions;
    };

    const animate = () => {
      frameCount++;

      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const positions = getNodePositions();
      time += 0.02;
      const isDarkMode = document.documentElement.classList.contains("dark");
      const hoverColor = isDarkMode ? "rgba(251, 191, 36, 0.6)" : "rgba(79, 70, 229, 0.6)";
      const labelColor = isDarkMode ? "rgba(248, 250, 252, 0.95)" : "rgba(15, 23, 42, 0.9)";
      const hoverThreshold = nodeRadius * 2.5;
      const connectionColor = isDarkMode ? [148, 163, 255] : [79, 70, 229];
      const pulseColor = isDarkMode ? "rgba(248, 250, 252, 0.75)" : "rgba(79, 70, 229, 0.65)";
      const connectionSpeed = 0.45;
      const pulseRadius = 2.4;

      // Draw connections
      for (let i = 0; i < positions.length - 1; i++) {
        positions[i].forEach((startNode) => {
          positions[i + 1].forEach((endNode) => {
            const dx = endNode.x - startNode.x;
            const dy = endNode.y - startNode.y;
            const distance = Math.hypot(dx, dy) || 1;
            const baseOpacity = (Math.sin(time + startNode.x * 0.01 + endNode.y * 0.01) + 1) / 5 + 0.18;
            const lineWidth = 1.2 + Math.sin(time * 0.8 + distance * 0.02) * 0.4;

            const gradient = ctx.createLinearGradient(startNode.x, startNode.y, endNode.x, endNode.y);
            gradient.addColorStop(0, `rgba(${connectionColor[0]}, ${connectionColor[1]}, ${connectionColor[2]}, ${baseOpacity})`);
            gradient.addColorStop(0.5, `rgba(${connectionColor[0]}, ${connectionColor[1]}, ${connectionColor[2]}, ${baseOpacity + 0.12})`);
            gradient.addColorStop(1, `rgba(${connectionColor[0]}, ${connectionColor[1]}, ${connectionColor[2]}, ${baseOpacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(endNode.x, endNode.y);
            ctx.stroke();

            for (let pulse = 0; pulse < 2; pulse++) {
              const pulseProgress = (time * connectionSpeed + pulse * 0.45 + (startNode.x + endNode.y) * 0.0015) % 1;
              const px = startNode.x + dx * pulseProgress;
              const py = startNode.y + dy * pulseProgress;

              ctx.save();
              ctx.fillStyle = pulseColor;
              ctx.globalAlpha = 0.75;
              ctx.shadowColor = pulseColor;
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          });
        });
      }

      // Draw nodes
      positions.forEach((layer, layerIndex) => {
        layer.forEach((node, nodeIndex) => {
          const pulse = Math.sin(time * 2 + layerIndex + nodeIndex) * 0.3 + 0.7;
          const isHovered = mousePosition.current
            ? Math.hypot(mousePosition.current.x - node.x, mousePosition.current.y - node.y) <= hoverThreshold
            : false;
          const currentRadius = isHovered ? nodeRadius + 3 : nodeRadius;
          
          // Node glow
          const glowRadius = currentRadius * 2.5;
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          gradient.addColorStop(0, `rgba(120, 119, 198, ${pulse * 0.5})`);
          gradient.addColorStop(1, "rgba(120, 119, 198, 0)");
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Node core
          ctx.fillStyle = isHovered ? hoverColor : `rgba(120, 119, 198, ${pulse})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Node border
          ctx.strokeStyle = isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)";
          ctx.lineWidth = isHovered ? 2.5 : 2;
          ctx.stroke();

          const annotationLines = nodeAnnotations[layerIndex]?.[nodeIndex];
          if (annotationLines && isHovered) {
            const offset = labelOffsets[layerIndex] ?? { x: 0, align: "center" as CanvasTextAlign };
            ctx.save();
            ctx.font = "600 13px 'Inter', sans-serif";
            ctx.textAlign = offset.align;
            ctx.textBaseline = "middle";
            ctx.fillStyle = labelColor;

            annotationLines.forEach((line, lineIdx) => {
              const lineOffset = (lineIdx - (annotationLines.length - 1) / 2) * 16;
              ctx.fillText(line, node.x + offset.x, node.y + lineOffset);
            });

            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", updateMousePosition);
      canvas.removeEventListener("mouseleave", clearMousePosition);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ minHeight: "300px" }}
    />
  );
};
