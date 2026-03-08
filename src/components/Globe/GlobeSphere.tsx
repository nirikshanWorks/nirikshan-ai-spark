import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate Earth texture procedurally on a canvas
const createEarthTexture = (width = 2048, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a1628');
  oceanGrad.addColorStop(0.3, '#0d1f3c');
  oceanGrad.addColorStop(0.5, '#0f2847');
  oceanGrad.addColorStop(0.7, '#0d1f3c');
  oceanGrad.addColorStop(1, '#0a1628');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Helper: convert lat/lon to canvas x/y
  const toXY = (lon: number, lat: number): [number, number] => {
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return [x, y];
  };

  // Draw a filled landmass polygon
  const drawLand = (coords: [number, number][], fillColor: string, strokeColor: string, lineWidth = 1) => {
    if (coords.length < 3) return;
    ctx.beginPath();
    const [sx, sy] = toXY(coords[0][0], coords[0][1]);
    ctx.moveTo(sx, sy);
    for (let i = 1; i < coords.length; i++) {
      const [x, y] = toXY(coords[i][0], coords[i][1]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const landColor = '#0f3d2e';
  const landLight = '#145a3a';
  const borderColor = '#1abc7c';
  const indiaColor = '#10b981';
  const indiaBorder = '#34d399';

  // North America
  drawLand([
    [-130,50],[-125,48],[-124,42],[-122,37],[-117,32],[-110,32],[-105,30],[-100,28],[-97,26],[-97,18],
    [-92,18],[-87,21],[-82,24],[-80,25],[-81,31],[-75,35],[-70,41],[-70,43],[-67,45],[-64,44],
    [-60,47],[-55,47],[-55,52],[-58,55],[-63,58],[-68,60],[-75,62],[-80,64],[-85,66],[-90,68],
    [-95,70],[-105,72],[-115,72],[-125,70],[-135,68],[-140,65],[-145,62],[-150,60],[-155,58],
    [-160,60],[-165,62],[-168,58],[-165,55],[-160,56],[-150,58],[-145,57],[-140,58],[-135,56],
    [-130,50]
  ], landColor, borderColor);

  // Central America
  drawLand([
    [-97,18],[-96,17],[-92,15],[-88,16],[-86,14],[-84,11],[-82,9],[-80,8],[-78,9],[-80,10],
    [-84,14],[-87,16],[-90,17],[-93,18],[-97,18]
  ], landColor, borderColor);

  // South America
  drawLand([
    [-80,10],[-77,8],[-73,7],[-70,7],[-65,5],[-58,5],[-52,3],[-48,0],[-45,-2],[-40,-3],
    [-37,-5],[-35,-8],[-35,-12],[-38,-15],[-40,-18],[-42,-22],[-45,-23],[-48,-25],[-50,-28],
    [-53,-32],[-57,-35],[-60,-38],[-63,-42],[-65,-46],[-67,-50],[-68,-53],[-70,-52],[-72,-48],
    [-74,-42],[-73,-38],[-71,-33],[-71,-28],[-70,-22],[-70,-18],[-75,-15],[-76,-10],[-78,-5],
    [-80,0],[-80,5],[-80,10]
  ], landColor, borderColor);

  // Europe
  drawLand([
    [-10,36],[-8,38],[-9,40],[-8,43],[0,43],[2,46],[5,44],[7,46],[10,46],[13,45],
    [15,46],[16,48],[14,50],[12,52],[10,54],[9,55],[12,56],[12,58],[10,58],[8,57],
    [5,58],[5,60],[8,62],[10,63],[12,64],[15,66],[18,68],[20,70],[22,70],[25,71],
    [28,71],[30,70],[32,68],[35,65],[38,62],[40,60],[42,58],[40,56],[35,55],[30,55],
    [28,52],[24,50],[22,48],[20,46],[22,44],[24,42],[26,40],[22,38],[20,36],[15,38],
    [12,38],[10,37],[5,43],[0,43],[-5,36],[-10,36]
  ], landColor, borderColor);

  // Africa
  drawLand([
    [-17,15],[-16,12],[-15,10],[-12,8],[-8,5],[-5,5],[0,5],[5,5],[10,4],[15,5],
    [20,5],[25,2],[30,0],[33,-3],[35,-6],[38,-10],[40,-15],[38,-20],[35,-25],[33,-28],
    [30,-30],[28,-33],[25,-34],[22,-34],[20,-33],[18,-30],[16,-28],[15,-25],[12,-20],
    [12,-15],[10,-10],[8,-5],[5,0],[2,5],[0,5],[-5,5],[-8,8],[-12,10],[-15,12],[-17,15]
  ], landColor, borderColor);

  // Asia (mainland)
  drawLand([
    [25,40],[30,42],[35,40],[38,38],[42,38],[45,40],[50,42],[55,45],[58,50],[60,55],
    [65,55],[70,55],[75,55],[80,52],[85,50],[90,48],[95,50],[100,52],[105,55],[110,55],
    [115,53],[120,50],[125,48],[130,45],[135,42],[140,42],[142,45],[145,50],[145,45],
    [143,40],[140,38],[137,35],[132,33],[128,33],[125,30],[122,28],[118,25],[112,20],
    [108,18],[105,15],[102,12],[100,10],[100,5],[103,2],[105,0],[100,2],[97,5],[95,8],
    [92,10],[88,15],[85,18],[82,20],[78,22],[75,24],[72,25],[68,26],[65,28],[60,30],
    [55,30],[50,32],[45,35],[40,38],[35,40],[30,42],[25,40]
  ], landColor, borderColor);

  // India (highlighted)
  drawLand([
    [68,24],[70,22],[72,20],[72,18],[73,16],[75,13],[76,11],[77,8],[79,8],[80,10],
    [80,12],[82,14],[83,16],[85,18],[87,20],[88,22],[89,22],[90,24],[92,24],[92,26],
    [90,27],[88,27],[86,27],[84,28],[82,28],[80,30],[78,31],[76,32],[74,34],[72,35],
    [70,35],[68,34],[68,30],[68,24]
  ], indiaColor, indiaBorder, 2);

  // Australia
  drawLand([
    [115,-20],[118,-18],[122,-17],[125,-15],[128,-14],[132,-12],[136,-12],[140,-12],
    [143,-13],[145,-15],[148,-18],[150,-22],[152,-25],[153,-28],[152,-32],[150,-35],
    [148,-37],[145,-38],[142,-38],[138,-36],[135,-35],[132,-33],[128,-32],[125,-33],
    [122,-34],[118,-33],[115,-32],[114,-28],[114,-24],[115,-20]
  ], landColor, borderColor);

  // Japan
  drawLand([
    [130,31],[131,33],[133,34],[135,35],[137,36],[139,37],[140,39],[141,41],[142,43],
    [143,44],[145,45],[145,43],[143,42],[142,40],[140,38],[138,36],[136,34],[134,33],
    [132,31],[130,31]
  ], landColor, borderColor);

  // UK/Ireland
  drawLand([
    [-6,50],[-5,51],[-4,53],[-3,55],[-4,56],[-5,57],[-5,58],[-3,58],[-1,58],[0,57],
    [1,55],[2,53],[1,51],[0,50],[-2,50],[-4,50],[-6,50]
  ], landColor, borderColor);
  drawLand([
    [-10,52],[-9,53],[-8,54],[-7,55],[-8,55],[-10,54],[-10,52]
  ], landColor, borderColor);

  // Add subtle grid lines over ocean
  ctx.strokeStyle = 'rgba(59,130,246,0.06)';
  ctx.lineWidth = 0.5;
  for (let lat = -80; lat <= 80; lat += 10) {
    ctx.beginPath();
    const [, y] = toXY(0, lat);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 10) {
    ctx.beginPath();
    const [x] = toXY(lon, 0);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Add glow dots for cities
  const cities = [
    [77, 28.6], [88.4, 22.6], [77.5, 30.3], // Indian offices + clients
    [28, -26.2], // Johannesburg
    [-74, 40.7], [-87.6, 41.9], [-118.2, 34], // US cities
    [-0.1, 51.5], [2.3, 48.9], [13.4, 52.5], // European cities
    [139.7, 35.7], [121.5, 31.2], [103.8, 1.4], // Asian cities
    [151.2, -33.9], // Sydney
  ];

  cities.forEach(([lon, lat]) => {
    const [x, y] = toXY(lon, lat);
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 6);
    grad.addColorStop(0, 'rgba(96, 165, 250, 0.9)');
    grad.addColorStop(0.5, 'rgba(96, 165, 250, 0.3)');
    grad.addColorStop(1, 'rgba(96, 165, 250, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - 6, y - 6, 12, 12);
  });

  // Brighter dots for Nirikshan offices
  const offices = [
    [76.15, 28.08], // Mahendragarh
    [77.5, 28.47],  // Noida
    [88.36, 22.57], // Kolkata
  ];
  offices.forEach(([lon, lat]) => {
    const [x, y] = toXY(lon, lat);
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
    grad.addColorStop(0, 'rgba(16, 185, 129, 1)');
    grad.addColorStop(0.3, 'rgba(16, 185, 129, 0.6)');
    grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.2)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - 10, y - 10, 20, 20);
  });

  return new THREE.CanvasTexture(canvas);
};

const createBumpTexture = (width = 2048, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // Add noise for terrain
  const imageData = ctx.getImageData(0, 0, width, height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = Math.random() * 15;
    imageData.data[i] = noise;
    imageData.data[i + 1] = noise;
    imageData.data[i + 2] = noise;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  return new THREE.CanvasTexture(canvas);
};

const createCloudTexture = (width = 1024, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, width, height);

  // Sparse cloud wisps
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 10 + Math.random() * 40;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(255,255,255,${0.02 + Math.random() * 0.04})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  return new THREE.CanvasTexture(canvas);
};

const GlobeSphere = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const earthTexture = useMemo(() => createEarthTexture(), []);
  const bumpTexture = useMemo(() => createBumpTexture(), []);
  const cloudTexture = useMemo(() => createCloudTexture(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0008;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0012;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0004;
    }
    if (glowRef.current) {
      (glowRef.current.material as THREE.ShaderMaterial).uniforms.time.value = t;
    }
  });

  const atmosphereShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        vec3 blue = vec3(0.23, 0.51, 0.96);
        vec3 teal = vec3(0.06, 0.73, 0.51);
        vec3 color = mix(blue, teal, sin(time * 0.5) * 0.5 + 0.5);
        gl_FragColor = vec4(color, intensity * 0.6);
      }
    `,
  }), []);

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.02}
          specular={new THREE.Color('#1a3a5c')}
          shininess={15}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudRef} scale={1.008}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={cloudTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere rim glow (shader) */}
      <mesh ref={glowRef} scale={1.06}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          attach="material"
          args={[atmosphereShader]}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer soft glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Second outer glow - emerald tint */}
      <mesh scale={1.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default GlobeSphere;
