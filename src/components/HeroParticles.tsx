import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  floatOffset: number;
  floatSpeed: number;
  type: 'circle' | 'hexagon' | 'triangle';
}

export const HeroParticles = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let floatingElements: FloatingElement[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
      initFloatingElements();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 200, // Blue to purple range
        });
      }
    };

    const initFloatingElements = () => {
      floatingElements = [];
      const elementCount = 5;
      const types: FloatingElement['type'][] = ['circle', 'hexagon', 'triangle'];
      
      for (let i = 0; i < elementCount; i++) {
        floatingElements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: Math.random() * 0.02 + 0.01,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawTriangle = (x: number, y: number, size: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 / 3) * i + rotation - Math.PI / 2;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw floating geometric elements
      floatingElements.forEach((el, i) => {
        el.rotation += el.rotationSpeed;
        el.floatOffset += el.floatSpeed;
        
        const floatY = Math.sin(el.floatOffset) * 15;
        const floatX = Math.cos(el.floatOffset * 0.5) * 10;
        
        ctx.save();
        ctx.globalAlpha = 0.1;
        
        const gradient = ctx.createRadialGradient(
          el.x + floatX, el.y + floatY, 0,
          el.x + floatX, el.y + floatY, el.size
        );
        gradient.addColorStop(0, `hsla(${220 + i * 20}, 70%, 60%, 0.3)`);
        gradient.addColorStop(1, `hsla(${240 + i * 20}, 70%, 50%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = `hsla(${220 + i * 20}, 70%, 60%, 0.2)`;
        ctx.lineWidth = 1;
        
        if (el.type === 'circle') {
          ctx.beginPath();
          ctx.arc(el.x + floatX, el.y + floatY, el.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (el.type === 'hexagon') {
          drawHexagon(el.x + floatX, el.y + floatY, el.size, el.rotation);
          ctx.fill();
          ctx.stroke();
        } else {
          drawTriangle(el.x + floatX, el.y + floatY, el.size, el.rotation);
          ctx.fill();
          ctx.stroke();
        }
        
        ctx.restore();
      });

      // Draw and update particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 60%, 50%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
};
