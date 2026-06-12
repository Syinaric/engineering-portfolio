import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = new THREE.Color('#a259ff');
const WHITE = new THREE.Color('#ffffff');

// Shared mutable input state (window scroll + pointer), read each frame.
const input = {
  mouseX: 0,
  mouseY: 0,
  scrollY: 0,
};

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    input.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    input.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  window.addEventListener('scroll', () => {
    input.scrollY = window.scrollY;
  });
}

const Particles: React.FC = () => {
  const points = useRef<THREE.Points>(null);
  const count = 900;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
      const c = Math.random() < 0.25 ? ACCENT : WHITE;
      const dim = 0.25 + Math.random() * 0.75;
      colors[i * 3] = c.r * dim;
      colors[i * 3 + 1] = c.g * dim;
      colors[i * 3 + 2] = c.b * dim;
      sizes[i] = 0.5 + Math.random();
    }
    return { positions, colors, sizes };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          attribute float aSize;
          varying vec3 vColor;
          uniform float uTime;
          void main() {
            vColor = color;
            vec3 p = position;
            p.y += sin(uTime * 0.25 + position.x * 0.5) * 0.4;
            p.x += cos(uTime * 0.2 + position.y * 0.4) * 0.3;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aSize * 4.0 * (10.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(vColor, a * 0.8);
          }
        `,
        vertexColors: true,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={points} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
};

const GridFloor: React.FC = () => {
  const grid = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (grid.current) {
      // Slow conveyor drift toward the camera.
      grid.current.position.z = (state.clock.elapsedTime * 0.4) % 2;
    }
  });
  return (
    <gridHelper
      ref={grid}
      args={[80, 40, '#a259ff', '#1c1428']}
      position={[0, -7, 0]}
    />
  );
};

const CameraRig: React.FC = () => {
  const { camera } = useThree();
  useFrame(() => {
    // Mouse parallax + scroll parallax, eased.
    const targetX = input.mouseX * 1.2;
    const targetY = input.mouseY * 0.8 - input.scrollY * 0.0025;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, -input.scrollY * 0.0015, -5);
  });
  return null;
};

const SceneBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#0a0a0a', 12, 38]} />
        <Particles />
        <GridFloor />
        <CameraRig />
      </Canvas>
      {/* Vignette so content stays readable over the scene */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,0.85) 100%)',
        }}
      />
    </div>
  );
};

export default SceneBackground;
