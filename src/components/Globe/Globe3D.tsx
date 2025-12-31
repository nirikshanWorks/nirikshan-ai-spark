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

// Company locations and client reach data
const locations = [
  // Headquarters
  { lat: 17.385, lon: 78.4867, label: 'Hyderabad, India', type: 'headquarters' as const, description: 'Global Headquarters' },
  
  // Client locations
  { lat: 40.7128, lon: -74.006, label: 'New York, USA', type: 'client' as const, description: 'Enterprise Clients' },
  { lat: 51.5074, lon: -0.1278, label: 'London, UK', type: 'client' as const, description: 'Financial Services' },
  { lat: 35.6762, lon: 139.6503, label: 'Tokyo, Japan', type: 'client' as const, description: 'Manufacturing' },
  { lat: 1.3521, lon: 103.8198, label: 'Singapore', type: 'client' as const, description: 'APAC Hub' },
  { lat: 25.2048, lon: 55.2708, label: 'Dubai, UAE', type: 'client' as const, description: 'Middle East Operations' },
  { lat: -33.8688, lon: 151.2093, label: 'Sydney, Australia', type: 'client' as const, description: 'ANZ Region' },
  { lat: 52.52, lon: 13.405, label: 'Berlin, Germany', type: 'client' as const, description: 'EU Operations' },
  { lat: 37.7749, lon: -122.4194, label: 'San Francisco, USA', type: 'client' as const, description: 'Tech Industry' },
  { lat: 19.076, lon: 72.8777, label: 'Mumbai, India', type: 'office' as const, description: 'Regional Office' },
  { lat: 12.9716, lon: 77.5946, label: 'Bangalore, India', type: 'office' as const, description: 'Tech Center' },
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
      .filter(m => m.type === 'client')
      .map(client => ({
        start: headquarters.position,
        end: client.position
      }));
  }, [markers, headquarters]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-primary/5" />
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          {/* Stars background */}
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          <Float
            speed={1}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            {/* Globe */}
            <GlobeSphere />
            
            {/* Connection lines */}
            <GlobeConnections connections={connections} />
            
            {/* Location markers */}
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
          
          {/* Controls */}
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
      <div className="absolute bottom-4 left-4 glass-card p-4 rounded-xl">
        <h4 className="text-sm font-semibold text-foreground mb-3">Global Presence</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Headquarters</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">Regional Office</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-muted-foreground">Client Location</span>
          </div>
        </div>
      </div>
      
      {/* Stats overlay */}
      <div className="absolute top-4 right-4 glass-card p-4 rounded-xl text-right">
        <div className="text-2xl font-bold text-foreground">15+</div>
        <div className="text-xs text-muted-foreground">Countries Served</div>
        <div className="text-2xl font-bold text-foreground mt-2">50+</div>
        <div className="text-xs text-muted-foreground">Global Clients</div>
      </div>
    </div>
  );
};

export default Globe3D;
