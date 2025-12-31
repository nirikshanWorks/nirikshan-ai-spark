import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeMarkerProps {
  position: [number, number, number];
  label: string;
  type: 'headquarters' | 'office' | 'client';
  description?: string;
}

const GlobeMarker = ({ position, label, type, description }: GlobeMarkerProps) => {
  const markerRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const pulseRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const colors = {
    headquarters: '#10b981',
    office: '#3b82f6',
    client: '#f59e0b'
  };

  const glowColors = {
    headquarters: '#34d399',
    office: '#60a5fa',
    client: '#fbbf24'
  };

  const color = colors[type];
  const glowColor = glowColors[type];
  const isHeadquarters = type === 'headquarters';

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (pulseRef.current) {
      const scale = isHeadquarters 
        ? 1 + Math.sin(time * 3) * 0.5
        : 1 + Math.sin(time * 2) * 0.3;
      pulseRef.current.scale.setScalar(scale);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 
        isHeadquarters ? 0.4 - Math.sin(time * 3) * 0.2 : 0.3 - Math.sin(time * 2) * 0.15;
    }
    
    if (beamRef.current && isHeadquarters) {
      beamRef.current.scale.y = 1 + Math.sin(time * 2) * 0.3;
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(time * 4) * 0.2;
    }
  });

  return (
    <group ref={markerRef} position={position}>
      {/* Outer pulse effect */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[isHeadquarters ? 0.05 : 0.035, 16, 16]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.3} />
      </mesh>
      
      {/* Middle glow */}
      {isHeadquarters && (
        <mesh>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      )}
      
      {/* Core marker */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isHeadquarters ? 0.025 : 0.018, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Light beam for headquarters */}
      {isHeadquarters && (
        <mesh ref={beamRef} position={[0, 0.08, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.015, 0.15, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Small beam for other markers */}
      {!isHeadquarters && (
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.001, 0.008, 0.08, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      )}

      {/* Tooltip */}
      {hovered && (
        <Html distanceFactor={2.5} style={{ pointerEvents: 'none' }}>
          <div 
            className="px-4 py-3 rounded-xl min-w-[150px] text-center transform -translate-x-1/2 backdrop-blur-md border"
            style={{
              background: 'rgba(10, 10, 26, 0.9)',
              borderColor: color,
              boxShadow: `0 0 20px ${color}40`
            }}
          >
            <p className="text-sm font-bold text-white">{label}</p>
            <p 
              className="text-xs mt-1 capitalize font-medium"
              style={{ color }}
            >
              {type === 'headquarters' ? '🏢 Headquarters' : type === 'office' ? '🏛️ Regional Office' : '🤝 Client'}
            </p>
            {description && (
              <p className="text-xs text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

export default GlobeMarker;
