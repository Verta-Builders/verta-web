import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#22d3ee"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Torus args={[2.5, 0.08, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#a855f7"
            metalness={0.9}
            roughness={0.1}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>

      {/* Second torus */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <Torus args={[3, 0.05, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#ec4899"
            metalness={0.9}
            roughness={0.1}
            emissive="#ec4899"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>

      {/* Small floating icosahedrons */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <Icosahedron args={[0.3]} position={[2.5, 1, 1]}>
          <meshStandardMaterial
            color="#10b981"
            metalness={0.8}
            roughness={0.2}
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.2}>
        <Icosahedron args={[0.2]} position={[-2, -1, 0.5]}>
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.8}
            roughness={0.2}
            emissive="#22d3ee"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
      </Float>

      <Float speed={2.8} rotationIntensity={1.8} floatIntensity={1.3}>
        <Icosahedron args={[0.25]} position={[-1.5, 2, -1]}>
          <meshStandardMaterial
            color="#a855f7"
            metalness={0.8}
            roughness={0.2}
            emissive="#a855f7"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

const PARTICLE_COUNT = 150;
const particleData = (() => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4 + Math.random() * 3;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const t = Math.random();
    colors[i * 3] = 0.133 + t * 0.527;
    colors[i * 3 + 1] = 0.827 - t * 0.493;
    colors[i * 3 + 2] = 0.933 - t * 0.035;
  }

  return { positions, colors };
})();

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particleData.positions}
          itemSize={3}
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={particleData.colors}
          itemSize={3}
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22d3ee" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#a855f7" />

        <FloatingShapes />
        <Particles />
      </Canvas>
    </div>
  );
}


