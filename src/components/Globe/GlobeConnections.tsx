import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Connection {
  start: [number, number, number];
  end: [number, number, number];
}

interface GlobeConnectionsProps {
  connections: Connection[];
}

// Animated data particle along the connection
const DataParticle = ({ curve, delay }: { curve: THREE.QuadraticBezierCurve3; delay: number }) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particleRef.current) {
      const time = (state.clock.elapsedTime + delay) % 3;
      const t = time / 3;
      const point = curve.getPoint(t);
      particleRef.current.position.copy(point);
      
      // Pulse effect
      const scale = 0.015 + Math.sin(state.clock.elapsedTime * 5) * 0.005;
      particleRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.9} />
    </mesh>
  );
};

const GlobeConnections = ({ connections }: GlobeConnectionsProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const curves = useMemo(() => {
    return connections.map(({ start, end }) => {
      const startVec = new THREE.Vector3(...start);
      const endVec = new THREE.Vector3(...end);
      
      // Calculate midpoint and raise it above the globe surface
      const midPoint = new THREE.Vector3()
        .addVectors(startVec, endVec)
        .multiplyScalar(0.5);
      
      const distance = startVec.distanceTo(endVec);
      // Higher arc for longer distances
      midPoint.normalize().multiplyScalar(1 + distance * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
      return curve;
    });
  }, [connections]);

  // Create dashed line effect
  const lineGeometries = useMemo(() => {
    return curves.map(curve => {
      const points = curve.getPoints(100);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [curves]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, index) => {
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <group key={index}>
            {/* Main connection line - gradient effect */}
            <line>
              <bufferGeometry attach="geometry" {...geometry} />
              <lineBasicMaterial
                attach="material"
                color="#10b981"
                transparent
                opacity={0.6}
                linewidth={2}
              />
            </line>
            
            {/* Glow effect line */}
            <line>
              <bufferGeometry attach="geometry" {...geometry} />
              <lineBasicMaterial
                attach="material"
                color="#34d399"
                transparent
                opacity={0.2}
                linewidth={4}
              />
            </line>
            
            {/* Animated data particles */}
            <DataParticle curve={curve} delay={index * 0.5} />
            <DataParticle curve={curve} delay={index * 0.5 + 1.5} />
          </group>
        );
      })}
      
      {/* Connection start point (India) - pulsing hub */}
      {connections.length > 0 && (
        <HubMarker position={connections[0].start} />
      )}
    </group>
  );
};

// Central hub marker for India
const HubMarker = ({ position }: { position: [number, number, number] }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.2);
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.5 + Math.sin(time * 2) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.scale.setScalar(1.3 + Math.sin(time * 2 + 1) * 0.2);
      const material = ring2Ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 2 + 1) * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.scale.setScalar(1.6 + Math.sin(time * 2 + 2) * 0.2);
      const material = ring3Ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 + Math.sin(time * 2 + 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      
      {/* Pulsing rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.05, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.07, 32]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.09, 32]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default GlobeConnections;
