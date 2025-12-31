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
      midPoint.normalize().multiplyScalar(1 + distance * 0.3);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
      return curve;
    });
  }, [connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, index) => {
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={index}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color="#10b981"
              transparent
              opacity={0.4}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
};

export default GlobeConnections;
