import { useEffect, useState } from "react";

interface FloatingElementProps {
  count?: number;
  className?: string;
}

export const FloatingElements = ({ count = 6, className = "" }: FloatingElementProps) => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    type: 'orb' | 'ring' | 'dot';
    color: string;
  }>>([]);

  useEffect(() => {
    const colors = [
      'from-primary/30 to-accent/20',
      'from-accent/25 to-primary/15',
      'from-blue-500/20 to-purple-500/15',
      'from-purple-500/25 to-pink-500/15',
      'from-cyan-500/20 to-blue-500/15',
    ];
    
    const types: ('orb' | 'ring' | 'dot')[] = ['orb', 'ring', 'dot'];
    
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setElements(newElements);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 'orb' && (
            <div
              className={`rounded-full bg-gradient-to-br ${el.color} blur-2xl animate-float-slow`}
              style={{
                width: el.size,
                height: el.size,
                animationDuration: `${el.duration}s`,
              }}
            />
          )}
          {el.type === 'ring' && (
            <div
              className={`rounded-full border-2 border-primary/20 animate-spin-slow`}
              style={{
                width: el.size,
                height: el.size,
                animationDuration: `${el.duration * 2}s`,
              }}
            />
          )}
          {el.type === 'dot' && (
            <div
              className="rounded-full bg-primary/40 animate-pulse-slow"
              style={{
                width: el.size / 4,
                height: el.size / 4,
                animationDuration: `${el.duration / 2}s`,
              }}
            />
          )}
        </div>
      ))}
      
      {/* Static gradient orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/15 to-transparent blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-2xl" />
    </div>
  );
};
