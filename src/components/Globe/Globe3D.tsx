import { Suspense, useMemo, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, ExternalLink, X, Navigation, Building2, Users } from 'lucide-react';
import GlobeSphere from './GlobeSphere';
import GlobeMarker from './GlobeMarker';
import GlobeConnections from './GlobeConnections';

const latLonToVector3 = (lat: number, lon: number, radius: number = 1.02): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
};

interface LocationData {
  lat: number;
  lon: number;
  label: string;
  type: 'headquarters' | 'office' | 'client';
  description: string;
  fullAddress: string;
  mapsQuery: string;
}

const locations: LocationData[] = [
  {
    lat: 28.0811, lon: 76.1536,
    label: 'Mahendragarh, Haryana',
    type: 'headquarters',
    description: 'Registered Office',
    fullAddress: '166A, Village Malra Sarai, Lawan, Mahendragarh - 123029, Haryana, India',
    mapsQuery: '166A+Village+Malra+Sarai+Lawan+Mahendragarh+123029+Haryana+India',
  },
  {
    lat: 30.3782, lon: 78.0882,
    label: 'Dehradun, Uttarakhand',
    type: 'office',
    description: 'Chair Office — Dehradun',
    fullAddress: 'Sahastradhara Rd, Doon IT Park, Aman Vihar, Dehradun, Uttarakhand 248013, India',
    mapsQuery: 'Sahastradhara+Rd+Doon+IT+Park+Aman+Vihar+Dehradun+Uttarakhand+248013+India',
  },
  {
    lat: 22.5726, lon: 88.3639,
    label: 'Kolkata, West Bengal',
    type: 'office',
    description: 'Chair Office — Kolkata',
    fullAddress: '69, S K Deb Road, Ujjas Condovelle, Building 20, Flat 101, Kolkata - 700048, West Bengal, India',
    mapsQuery: '69+S+K+Deb+Road+Ujjas+Condovelle+Kolkata+700048+India',
  },
  {
    lat: -26.2041, lon: 28.0473,
    label: 'Johannesburg, South Africa',
    type: 'client',
    description: 'Madapet — AI Inventory Management',
    fullAddress: 'Johannesburg, Gauteng, South Africa',
    mapsQuery: 'Johannesburg+South+Africa',
  },
  {
    lat: 28.6139, lon: 77.209,
    label: 'New Delhi, India',
    type: 'client',
    description: 'Motherson Group — Quality Control',
    fullAddress: 'New Delhi, Delhi, India',
    mapsQuery: 'New+Delhi+India',
  },
  {
    lat: 30.3165, lon: 78.0322,
    label: 'Dehradun, India',
    type: 'client',
    description: 'Dev Bhoomi University — Hackathon System',
    fullAddress: 'Dehradun, Uttarakhand, India',
    mapsQuery: 'Dev+Bhoomi+University+Dehradun+India',
  },
];

const typeConfig = {
  headquarters: { icon: Building2, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', label: 'Registered Office' },
  office: { icon: Navigation, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', label: 'Chair Office' },
  client: { icon: Users, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', label: 'Client Location' },
};

const Globe3D = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const markers = useMemo(() => locations.map(loc => ({
    ...loc,
    position: latLonToVector3(loc.lat, loc.lon)
  })), []);

  const headquarters = markers.find(m => m.type === 'headquarters');

  const connections = useMemo(() => {
    if (!headquarters) return [];
    return markers
      .filter(m => m.label !== headquarters.label)
      .map(location => ({ start: headquarters.position, end: location.position }));
  }, [markers, headquarters]);

  const handleMarkerClick = useCallback((index: number) => {
    setSelectedLocation(locations[index]);
  }, []);

  const config = selectedLocation ? typeConfig[selectedLocation.type] : null;
  const IconComponent = config?.icon;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-primary/5" />

      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: 'transparent' }}>
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
                onClick={() => handleMarkerClick(index)}
              />
            ))}
          </Float>
          <OrbitControls enableZoom enablePan={false} minDistance={2} maxDistance={5} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLocation && config && IconComponent && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute top-4 right-4 w-[300px] rounded-2xl overflow-hidden backdrop-blur-xl z-20"
            style={{
              background: 'rgba(10, 10, 26, 0.92)',
              border: `1px solid ${config.border}`,
              boxShadow: `0 0 40px ${config.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-start justify-between gap-2" style={{ borderBottom: `1px solid ${config.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: config.bg }}>
                  <IconComponent size={20} style={{ color: config.color }} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: config.color }}>{config.label}</p>
                  <p className="text-sm font-bold text-white">{selectedLocation.label}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description</p>
                <p className="text-sm text-gray-300">{selectedLocation.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Full Address</p>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedLocation.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📍 {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lon.toFixed(4)}°E</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4" style={{ borderTop: `1px solid ${config.border}` }}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ background: config.color }}
              >
                <ExternalLink size={14} />
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Hint when no panel open */}
      {!selectedLocation && (
        <div className="absolute top-4 right-4 glass-card p-4 rounded-xl text-right backdrop-blur-md border border-primary/20">
          <div className="text-3xl font-bold text-gradient">3</div>
          <div className="text-xs text-muted-foreground">Office Locations</div>
          <div className="text-3xl font-bold text-gradient mt-2">3+</div>
          <div className="text-xs text-muted-foreground">Countries Served</div>
          <div className="text-3xl font-bold text-gradient mt-2">7+</div>
          <div className="text-xs text-muted-foreground">Active Projects</div>
          <p className="text-[10px] text-muted-foreground mt-3 italic">Click a marker for details</p>
        </div>
      )}
    </div>
  );
};

export default Globe3D;
