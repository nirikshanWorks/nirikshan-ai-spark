import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Constants ─── */
const COL_PRIMARY = new THREE.Color("#00F0FF");
const COL_SECONDARY = new THREE.Color("#5B8CFF");
const COL_ACCENT = new THREE.Color("#A855F7");

/* ─── Mouse tracker (shared across scene) ─── */
const mouseState = { x: 0, y: 0 };

function useMouseTracker() {
  const { viewport } = useThree();
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return viewport;
}

/* ─── AI Eye ─── */
function AIEye() {
  const groupRef = useRef<THREE.Group>(null!);
  const irisRef = useRef<THREE.Mesh>(null!);
  const scanRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);
  useMouseTracker();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Slow rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 + mouseState.x * 0.2;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.08 + mouseState.y * 0.15;
    }
    // Iris follows mouse
    if (irisRef.current) {
      irisRef.current.position.x = THREE.MathUtils.lerp(irisRef.current.position.x, mouseState.x * 0.15, 0.05);
      irisRef.current.position.y = THREE.MathUtils.lerp(irisRef.current.position.y, mouseState.y * 0.1, 0.05);
    }
    // Scanning ring
    if (scanRef.current) {
      scanRef.current.rotation.z = t * 0.8;
      const scale = 1 + Math.sin(t * 2) * 0.1;
      scanRef.current.scale.set(scale, scale, 1);
    }
    // Glow pulse
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(t * 3) * 0.8;
    }
  });

  return (
    <group ref={groupRef} position={[-2.2, 0.3, 0]}>
      {/* Outer eye shape */}
      <mesh>
        <torusGeometry args={[0.8, 0.12, 16, 64]} />
        <meshStandardMaterial color={COL_PRIMARY} emissive={COL_PRIMARY} emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>

      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.04, 12, 48]} />
        <meshStandardMaterial color={COL_SECONDARY} emissive={COL_SECONDARY} emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>

      {/* Iris */}
      <mesh ref={irisRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <MeshDistortMaterial color={COL_ACCENT} emissive={COL_ACCENT} emissiveIntensity={1.2} distort={0.3} speed={3} transparent opacity={0.95} />
      </mesh>

      {/* Pupil */}
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000" emissive={COL_PRIMARY} emissiveIntensity={0.3} />
      </mesh>

      {/* Scanning ring */}
      <mesh ref={scanRef}>
        <ringGeometry args={[0.9, 1.0, 64]} />
        <meshStandardMaterial color={COL_PRIMARY} emissive={COL_PRIMARY} emissiveIntensity={0.5} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Scan lines */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3].map((rot, i) => (
        <mesh key={i} rotation={[0, 0, rot]}>
          <planeGeometry args={[2, 0.005]} />
          <meshStandardMaterial color={COL_PRIMARY} emissive={COL_PRIMARY} emissiveIntensity={0.8} transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <pointLight ref={glowRef} color={COL_PRIMARY} intensity={2} distance={5} />
    </group>
  );
}

/* ─── Neural Brain ─── */
const BRAIN_NODE_COUNT = 120;
const BRAIN_CONNECTION_COUNT = 180;

function generateBrainNodes() {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < BRAIN_NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 0.6 + Math.random() * 0.5;
    // Brain-like shape: slightly taller, wider at top
    const x = r * Math.sin(phi) * Math.cos(theta) * 1.2;
    const y = r * Math.cos(phi) * 0.9 + 0.1;
    const z = r * Math.sin(phi) * Math.sin(theta);
    nodes.push(new THREE.Vector3(x, y, z));
  }
  return nodes;
}

function generateConnections(nodes: THREE.Vector3[]) {
  const connections: [number, number][] = [];
  for (let i = 0; i < BRAIN_CONNECTION_COUNT; i++) {
    const a = Math.floor(Math.random() * nodes.length);
    let b = Math.floor(Math.random() * nodes.length);
    while (b === a) b = Math.floor(Math.random() * nodes.length);
    if (nodes[a].distanceTo(nodes[b]) < 1.2) {
      connections.push([a, b]);
    }
  }
  return connections;
}

function AIBrain() {
  const groupRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef<THREE.InstancedMesh>(null!);
  const tempObj = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const { nodes, connections, lineGeom } = useMemo(() => {
    const n = generateBrainNodes();
    const c = generateConnections(n);
    // Build line geometry
    const points: number[] = [];
    c.forEach(([a, b]) => {
      points.push(n[a].x, n[a].y, n[a].z, n[b].x, n[b].y, n[b].z);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return { nodes: n, connections: c, lineGeom: g };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + mouseState.x * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1 + mouseState.y * 0.1;
    }

    if (nodesRef.current) {
      nodes.forEach((node, i) => {
        const pulse = Math.sin(t * 2 + i * 0.5) * 0.5 + 0.5;
        const s = 0.02 + pulse * 0.015;
        tempObj.position.copy(node);
        tempObj.scale.set(s, s, s);
        tempObj.updateMatrix();
        nodesRef.current.setMatrixAt(i, tempObj.matrix);

        // Color based on pulse
        tempColor.lerpColors(COL_SECONDARY, COL_PRIMARY, pulse);
        nodesRef.current.setColorAt(i, tempColor);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
      if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0.2, 0]}>
      {/* Nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, BRAIN_NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial emissive={COL_PRIMARY} emissiveIntensity={2} toneMapped={false} />
      </instancedMesh>

      {/* Connections */}
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={COL_SECONDARY} transparent opacity={0.15} />
      </lineSegments>

      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <MeshDistortMaterial
          color={COL_ACCENT}
          emissive={COL_ACCENT}
          emissiveIntensity={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.3}
        />
      </mesh>

      <pointLight color={COL_ACCENT} intensity={1.5} distance={4} />
    </group>
  );
}

/* ─── Flowing Particles (Eye → Brain) ─── */
const PARTICLE_COUNT = 200;

function DataParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempObj = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.006,
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.3
      ),
      size: 0.01 + Math.random() * 0.02,
    }));
  }, []);

  const curve = useMemo(() => {
    return new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.2, 0.3, 0),
      new THREE.Vector3(-0.5, 1.5, 0.5),
      new THREE.Vector3(0.5, -0.8, -0.5),
      new THREE.Vector3(2.2, 0.2, 0)
    );
  }, []);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const pos = curve.getPoint(p.progress);
      const wave = Math.sin(p.progress * Math.PI * 4) * 0.15;
      tempObj.position.set(
        pos.x + p.offset.x * (1 - Math.abs(p.progress - 0.5) * 2) + wave,
        pos.y + p.offset.y * (1 - Math.abs(p.progress - 0.5) * 2),
        pos.z + p.offset.z
      );
      const s = p.size * (0.5 + Math.sin(p.progress * Math.PI) * 0.5);
      tempObj.scale.set(s, s, s);
      tempObj.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObj.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={COL_PRIMARY}
        emissive={COL_PRIMARY}
        emissiveIntensity={3}
        toneMapped={false}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

/* ─── Background Stars ─── */
function BackgroundStars() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const positions = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.02} color={COL_SECONDARY} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─── Scanning Grid Lines ─── */
function ScanGrid() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = -2;
      const t = state.clock.elapsedTime;
      ref.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && "opacity" in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).opacity = 0.03 + Math.sin(t * 1.5 + i * 0.5) * 0.02;
        }
      });
    }
  });

  const lines = useMemo(() => {
    const arr = [];
    for (let i = -5; i <= 5; i++) {
      arr.push(
        { pos: [0, i * 0.6, 0] as [number, number, number], size: [12, 0.003, 0.001] as [number, number, number] },
        { pos: [i * 1.2, 0, 0] as [number, number, number], size: [0.003, 8, 0.001] as [number, number, number] }
      );
    }
    return arr;
  }, []);

  return (
    <group ref={ref}>
      {lines.map((l, i) => (
        <mesh key={i} position={l.pos}>
          <boxGeometry args={l.size} />
          <meshStandardMaterial color={COL_PRIMARY} emissive={COL_PRIMARY} emissiveIntensity={0.5} transparent opacity={0.04} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main Scene ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <fog attach="fog" args={["#0B0F19", 5, 15]} />

      <BackgroundStars />
      <ScanGrid />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <AIEye />
      </Float>

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
        <AIBrain />
      </Float>

      <DataParticles />
    </>
  );
}

/* ─── Exported Component ─── */
export default function Hero3DScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="absolute inset-0 z-0" style={{ background: "#0B0F19" }}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6 : 4.5], fov: 60 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#0B0F19" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
