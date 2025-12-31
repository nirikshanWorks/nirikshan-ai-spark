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

  const colors = {
    headquarters: '#10b981',
    office: '#3b82f6',
    client: '#f59e0b'
  };

  const color = colors[type];

  useFrame((state) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      pulseRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={markerRef} position={position}>
      {/* Pulse effect */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      
      {/* Core marker */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Beam of light */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.002, 0.01, 0.1, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html distanceFactor={3} style={{ pointerEvents: 'none' }}>
          <div className="glass-card px-3 py-2 rounded-lg min-w-[120px] text-center transform -translate-x-1/2">
            <p className="text-xs font-bold text-foreground">{label}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{type}</p>
            {description && (
              <p className="text-[10px] text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

export default GlobeMarker;
