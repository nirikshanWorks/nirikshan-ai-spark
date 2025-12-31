import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// World map coordinates for continent outlines (simplified)
const continentData = {
  // North America
  northAmerica: [
    [-125, 48], [-122, 37], [-117, 32], [-105, 25], [-97, 25], [-97, 18],
    [-87, 21], [-80, 25], [-75, 35], [-70, 43], [-67, 45], [-65, 44],
    [-60, 47], [-55, 50], [-58, 55], [-65, 60], [-75, 65], [-85, 70],
    [-100, 72], [-120, 70], [-140, 70], [-165, 65], [-168, 55], [-150, 60],
    [-130, 55], [-125, 48]
  ],
  // South America
  southAmerica: [
    [-80, 10], [-75, 5], [-70, 5], [-55, 5], [-50, 0], [-45, -5],
    [-35, -5], [-35, -10], [-40, -22], [-50, -25], [-55, -35], [-65, -55],
    [-70, -55], [-75, -45], [-75, -30], [-70, -18], [-80, -5], [-80, 10]
  ],
  // Europe
  europe: [
    [-10, 36], [-5, 36], [0, 43], [5, 43], [10, 45], [15, 45],
    [20, 40], [25, 40], [30, 45], [35, 45], [40, 55], [30, 60],
    [25, 70], [15, 70], [10, 65], [5, 60], [-5, 55], [-10, 50], [-10, 36]
  ],
  // Africa
  africa: [
    [-17, 15], [-15, 10], [-5, 5], [10, 5], [15, 5], [25, 0],
    [35, -5], [40, -15], [35, -25], [25, -35], [20, -35], [15, -25],
    [10, -20], [5, -10], [-5, 5], [-10, 5], [-17, 10], [-17, 15]
  ],
  // Asia
  asia: [
    [25, 40], [35, 35], [45, 40], [55, 45], [60, 55], [70, 55],
    [80, 50], [90, 50], [100, 55], [110, 55], [120, 50], [130, 45],
    [140, 45], [145, 50], [145, 40], [140, 35], [130, 35], [120, 30],
    [110, 20], [100, 15], [95, 10], [100, 5], [105, 0], [95, 5],
    [80, 10], [72, 20], [65, 25], [55, 25], [45, 30], [35, 35], [25, 40]
  ],
  // Australia
  australia: [
    [115, -20], [120, -18], [130, -12], [140, -12], [145, -15],
    [150, -22], [153, -28], [150, -35], [145, -38], [135, -35],
    [125, -35], [115, -32], [115, -20]
  ],
  // India (detailed)
  india: [
    [68, 24], [70, 22], [72, 20], [72, 15], [77, 8], [80, 10],
    [83, 15], [88, 22], [92, 22], [97, 28], [95, 28], [90, 28],
    [88, 26], [85, 27], [82, 28], [78, 30], [75, 32], [72, 35],
    [68, 35], [68, 30], [68, 24]
  ]
};

const GlobeSphere = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.LineSegments>(null);
  const continentsRef = useRef<THREE.Group>(null);

  // Convert lat/lon to 3D position
  const latLonTo3D = (lat: number, lon: number, radius: number = 1.002): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Create continent outlines
  const continentGeometries = useMemo(() => {
    const geometries: { geometry: THREE.BufferGeometry; isIndia: boolean }[] = [];
    
    Object.entries(continentData).forEach(([name, coords]) => {
      const points: THREE.Vector3[] = [];
      
      coords.forEach(([lon, lat]) => {
        points.push(latLonTo3D(lat, lon, 1.003));
      });
      
      if (points.length > 0) {
        const curve = new THREE.CatmullRomCurve3(points, true);
        const curvePoints = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        geometries.push({ geometry, isIndia: name === 'india' });
      }
    });
    
    return geometries;
  }, []);

  // Create grid lines for the globe
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const radius = 1.001;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 15) {
      const latRad = (lat * Math.PI) / 180;
      for (let lon = 0; lon <= 360; lon += 3) {
        const lonRad = (lon * Math.PI) / 180;
        const nextLonRad = ((lon + 3) * Math.PI) / 180;
        
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
    for (let lon = 0; lon < 360; lon += 15) {
      const lonRad = (lon * Math.PI) / 180;
      for (let lat = -90; lat < 90; lat += 3) {
        const latRad = (lat * Math.PI) / 180;
        const nextLatRad = ((lat + 3) * Math.PI) / 180;
        
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

  // Create dots for major landmasses
  const landDots = useMemo(() => {
    const dots: { position: THREE.Vector3; size: number }[] = [];
    
    // Generate dots across landmasses
    const landPoints = [
      // North America
      ...Array.from({ length: 80 }, () => ({
        lat: 25 + Math.random() * 45,
        lon: -130 + Math.random() * 65
      })),
      // South America
      ...Array.from({ length: 50 }, () => ({
        lat: -50 + Math.random() * 55,
        lon: -80 + Math.random() * 40
      })),
      // Europe
      ...Array.from({ length: 40 }, () => ({
        lat: 35 + Math.random() * 30,
        lon: -10 + Math.random() * 50
      })),
      // Africa
      ...Array.from({ length: 60 }, () => ({
        lat: -30 + Math.random() * 55,
        lon: -15 + Math.random() * 55
      })),
      // Asia
      ...Array.from({ length: 100 }, () => ({
        lat: 5 + Math.random() * 55,
        lon: 40 + Math.random() * 105
      })),
      // Australia
      ...Array.from({ length: 30 }, () => ({
        lat: -38 + Math.random() * 25,
        lon: 115 + Math.random() * 38
      })),
      // India (extra density)
      ...Array.from({ length: 40 }, () => ({
        lat: 8 + Math.random() * 27,
        lon: 68 + Math.random() * 27
      })),
    ];
    
    landPoints.forEach(({ lat, lon }) => {
      const pos = latLonTo3D(lat, lon, 1.004);
      dots.push({ position: pos, size: 0.004 + Math.random() * 0.003 });
    });
    
    return dots;
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
    if (continentsRef.current) {
      continentsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#0a0a1a"
          transparent
          opacity={0.95}
          shininess={50}
        />
      </mesh>

      {/* Grid lines */}
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.08} />
      </lineSegments>

      {/* Continent outlines */}
      <group ref={continentsRef}>
        {continentGeometries.map(({ geometry, isIndia }, index) => (
          <line key={index}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color={isIndia ? "#10b981" : "#60a5fa"}
              transparent
              opacity={isIndia ? 0.9 : 0.5}
              linewidth={isIndia ? 2 : 1}
            />
          </line>
        ))}
        
        {/* Land dots */}
        {landDots.map((dot, index) => (
          <mesh key={`dot-${index}`} position={dot.position}>
            <sphereGeometry args={[dot.size, 6, 6]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow - emerald for India theme */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* India highlight glow */}
      <mesh position={latLonTo3D(20, 78, 1.01)} scale={0.25}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.15}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
};

export default GlobeSphere;
