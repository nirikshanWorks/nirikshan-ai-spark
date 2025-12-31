import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlobeSphere = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.LineSegments>(null);

  // Create grid lines for the globe
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const radius = 1.001;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const latRad = (lat * Math.PI) / 180;
      for (let lon = 0; lon <= 360; lon += 5) {
        const lonRad = (lon * Math.PI) / 180;
        const nextLonRad = ((lon + 5) * Math.PI) / 180;
        
        vertices.push(
          radius * Math.cos(latRad) * Math.cos(lonRad),
          radius * Math.sin(latRad),
          radius * Math.cos(latRad) * Math.sin(lonRad)
        );
        vertices.push(
          radius * Math.cos(latRad) * Math.cos(nextLonRad),
          radius * Math.sin(latRad),
          radius * Math.cos(latRad) * Math.sin(nextLonRad)
        );
      }
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const lonRad = (lon * Math.PI) / 180;
      for (let lat = -90; lat < 90; lat += 5) {
        const latRad = (lat * Math.PI) / 180;
        const nextLatRad = ((lat + 5) * Math.PI) / 180;
        
        vertices.push(
          radius * Math.cos(latRad) * Math.cos(lonRad),
          radius * Math.sin(latRad),
          radius * Math.cos(latRad) * Math.sin(lonRad)
        );
        vertices.push(
          radius * Math.cos(nextLatRad) * Math.cos(lonRad),
          radius * Math.sin(nextLatRad),
          radius * Math.cos(nextLatRad) * Math.sin(lonRad)
        );
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.001;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#1a1a2e"
          transparent
          opacity={0.9}
          shininess={30}
        />
      </mesh>

      {/* Grid lines */}
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </lineSegments>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default GlobeSphere;
