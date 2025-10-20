import { useEffect, useRef } from "react";

export const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Neural network layers
    const layers = [4, 6, 6, 3];
    const nodeRadius = 8;
    const layerSpacing = canvas.width / (layers.length + 1);
    
    let time = 0;

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const positions = getNodePositions();
      time += 0.02;

      // Draw connections
      for (let i = 0; i < positions.length - 1; i++) {
        positions[i].forEach((startNode) => {
          positions[i + 1].forEach((endNode) => {
            const opacity = (Math.sin(time + startNode.x + endNode.y) + 1) / 4 + 0.2;
            ctx.strokeStyle = `rgba(120, 119, 198, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(endNode.x, endNode.y);
            ctx.stroke();
          });
        });
      }

      // Draw nodes
      positions.forEach((layer, layerIndex) => {
        layer.forEach((node, nodeIndex) => {
          const pulse = Math.sin(time * 2 + layerIndex + nodeIndex) * 0.3 + 0.7;
          
          // Node glow
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius * 2);
          gradient.addColorStop(0, `rgba(120, 119, 198, ${pulse * 0.5})`);
          gradient.addColorStop(1, "rgba(120, 119, 198, 0)");
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Node core
          ctx.fillStyle = `rgba(120, 119, 198, ${pulse})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Node border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
