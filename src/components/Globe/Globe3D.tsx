import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import GlobeSphere from './GlobeSphere';
import GlobeMarker from './GlobeMarker';
import GlobeConnections from './GlobeConnections';

// Convert lat/lon to 3D coordinates
const latLonToVector3 = (lat: number, lon: number, radius: number = 1.02): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
};

const locations = [
  // Registered Office — Mahendragarh, Haryana
  { lat: 28.0811, lon: 76.1536, label: 'Mahendragarh, Haryana', type: 'headquarters' as const, description: 'Registered Office — 166A, Village Malra Sarai, Lawan' },

  // Chair Office — Noida, UP
  { lat: 28.4744, lon: 77.504, label: 'Noida, Uttar Pradesh', type: 'office' as const, description: 'Chair Office — 14th Avenue, Gaur City' },

  // Chair Office — Kolkata
  { lat: 22.5726, lon: 88.3639, label: 'Kolkata, West Bengal', type: 'office' as const, description: 'Chair Office — 69, S K Deb Road, Ujjas Condovelle' },

  // Client Locations
  { lat: -26.2041, lon: 28.0473, label: 'Johannesburg, South Africa', type: 'client' as const, description: 'Madapet — AI Inventory Management' },
  { lat: 28.6139, lon: 77.209, label: 'New Delhi, India', type: 'client' as const, description: 'Motherson Group — Quality Control' },
  { lat: 30.3165, lon: 78.0322, label: 'Dehradun, India', type: 'client' as const, description: 'Dev Bhoomi University — Hackathon System' },
];

const Globe3D = () => {
  const markers = useMemo(() => {
    return locations.map(loc => ({
      ...loc,
      position: latLonToVector3(loc.lat, loc.lon)
    }));
  }, []);

  const headquarters = markers.find(m => m.type === 'headquarters');
  
  const connections = useMemo(() => {
    if (!headquarters) return [];
    return markers
      .filter(m => m.label !== headquarters.label)
      .map(location => ({
        start: headquarters.position,
        end: location.position
      }));
  }, [markers, headquarters]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-primary/5" />
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <GlobeSphere />
            <GlobeConnections connections={connections} />
            {markers.map((marker, index) => (
              <GlobeMarker
                key={index}
                position={marker.position}
                label={marker.label}
                type={marker.type}
                description={marker.description}
              />
            ))}
          </Float>
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-card p-4 rounded-xl backdrop-blur-md border border-primary/20">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Nirikshan AI Offices
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            <span className="text-xs text-muted-foreground">Registered Office — Haryana</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            <span className="text-xs text-muted-foreground">Chair Offices — Noida & Kolkata</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
            <span className="text-xs text-muted-foreground">Client Locations</span>
          </div>
        </div>
      </div>
      
      {/* Stats overlay */}
      <div className="absolute top-4 right-4 glass-card p-4 rounded-xl text-right backdrop-blur-md border border-primary/20">
        <div className="text-3xl font-bold text-gradient">3</div>
        <div className="text-xs text-muted-foreground">Office Locations</div>
        <div className="text-3xl font-bold text-gradient mt-2">3+</div>
        <div className="text-xs text-muted-foreground">Countries Served</div>
        <div className="text-3xl font-bold text-gradient mt-2">7+</div>
        <div className="text-xs text-muted-foreground">Active Projects</div>
      </div>
    </div>
  );
};

export default Globe3D;
