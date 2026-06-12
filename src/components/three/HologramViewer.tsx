import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '../../data/projects';

/**
 * Holographic shader: purple fresnel rim + moving scanlines + flicker.
 * Used for both the placeholder shapes and (later) loaded GLB models.
 */
const createHologramMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#a259ff') },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vViewDir;
      uniform float uTime;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        // subtle vertical glitch jitter
        worldPos.x += sin(uTime * 18.0 + worldPos.y * 10.0) * 0.004;
        vWorldPos = worldPos.xyz;
        vec4 mv = viewMatrix * worldPos;
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vViewDir;
      uniform float uTime;
      uniform vec3 uColor;
      void main() {
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 2.0);
        float scan = sin(vWorldPos.y * 60.0 - uTime * 6.0) * 0.5 + 0.5;
        scan = scan * 0.25 + 0.75;
        float bands = step(0.5, fract(vWorldPos.y * 6.0 - uTime * 0.4)) * 0.08;
        float flicker = 0.92 + 0.08 * sin(uTime * 31.0) * sin(uTime * 13.7);
        float alpha = (0.18 + fresnel * 0.9) * scan * flicker + bands;
        gl_FragColor = vec4(uColor * (0.7 + fresnel), alpha);
      }
    `,
  });

const useHologramMaterial = () => {
  const material = useMemo(createHologramMaterial, []);
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return material;
};

/** Placeholder geometry until real GLB models are added. */
const PlaceholderShape: React.FC<{ shape: 'cube' | 'torus' | 'icosahedron' }> = ({
  shape,
}) => {
  const material = useHologramMaterial();
  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':
        return new THREE.TorusGeometry(1.1, 0.45, 24, 64);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1.4, 1);
      default:
        return new THREE.BoxGeometry(1.8, 1.8, 1.8, 4, 4, 4);
    }
  }, [shape]);

  return (
    <group>
      <mesh geometry={geometry} material={material} />
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#a259ff"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/** Loads a glTF/GLB and re-skins every mesh with the hologram material. */
const HoloModel: React.FC<{ url: string; rotation?: [number, number, number] }> = ({
  url,
  rotation,
}) => {
  const { scene } = useGLTF(url);
  const material = useHologramMaterial();

  const holoScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material = material;
      }
    });
    // Apply any orientation fix BEFORE measuring so it centers correctly.
    if (rotation) clone.rotation.set(rotation[0], rotation[1], rotation[2]);
    clone.updateMatrixWorld(true);

    // Normalize to ~2.4 units and center on origin. Uniform scale commutes
    // with the rotation above, so a single center*scale offset is exact.
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 2.4 / Math.max(size.x, size.y, size.z, 0.0001);
    clone.scale.setScalar(scale);
    clone.position.copy(center).multiplyScalar(-scale);
    return clone;
  }, [scene, material, rotation]);

  return <primitive object={holoScene} />;
};

/** Floating + slow spin wrapper. */
const Float: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.8) * 0.12 + 0.4;
    group.current.rotation.y = t * 0.35;
  });
  return <group ref={group}>{children}</group>;
};

/** Hologram projector base: glowing rings + light cone. */
const ProjectorBase: React.FC = () => {
  const cone = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (cone.current) {
      const m = cone.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.05 + 0.02 * Math.sin(state.clock.elapsedTime * 4);
    }
  });
  return (
    <group position={[0, -1.6, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.0, 64]} />
        <meshBasicMaterial color="#a259ff" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.18, 64]} />
        <meshBasicMaterial color="#a259ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* light cone */}
      <mesh ref={cone} position={[0, 1.5, 0]}>
        <coneGeometry args={[1.0, 3, 32, 1, true]} />
        <meshBasicMaterial
          color="#a259ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

interface HologramViewerProps {
  project: Project;
  onClose: () => void;
}

const HologramViewer: React.FC<HologramViewerProps> = ({ project, onClose }) => {
  // ESC closes, page scroll locked while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const holo = project.hologram;
  if (!holo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark-bg/90 backdrop-blur-md flex flex-col lg:flex-row animate-holo-in">
      {/* 3D viewport */}
      <div className="relative flex-1 min-h-[45vh]">
        <Canvas camera={{ position: [0, 0.6, 5.5], fov: 45 }} dpr={[1, 2]}>
          <Suspense
            fallback={
              <Float>
                <PlaceholderShape shape={holo.shape} />
              </Float>
            }
          >
            <Float>
              {holo.modelUrl ? (
                <HoloModel url={holo.modelUrl} rotation={holo.rotation} />
              ) : (
                <PlaceholderShape shape={holo.shape} />
              )}
            </Float>
          </Suspense>
          <ProjectorBase />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={9}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>

        <div className="absolute bottom-5 left-5 font-mono text-[10px] text-gray-500 tracking-[0.25em] pointer-events-none">
          DRAG TO ROTATE · SCROLL TO ZOOM
        </div>
        {/* corner brackets */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent/60 pointer-events-none" />
      </div>

      {/* Info panel */}
      <div className="relative w-full lg:w-[420px] xl:w-[480px] border-t lg:border-t-0 lg:border-l border-dark-border bg-dark-bg/80 overflow-y-auto">
        <button
          onClick={onClose}
          className="cursor-target absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-dark-border text-gray-400 hover:text-white hover:border-accent transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 lg:p-10">
          <h2 className="text-2xl xl:text-3xl font-bold text-white tracking-tight mb-3 pr-10">
            {project.title}
          </h2>
          <div className="w-16 h-1 bg-accent mb-6" />

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {project.achievements && project.achievements.length > 0 && (
            <div className="mb-6">
              <div className="font-mono text-[10px] text-accent tracking-[0.3em] mb-2">
                ACHIEVED
              </div>
              <div className="flex flex-wrap gap-2">
                {project.achievements.map((a, i) => (
                  <span
                    key={i}
                    className="bg-accent/15 border border-accent/50 text-accent px-3 py-1.5 text-sm font-bold font-mono"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.buttons && project.buttons.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.buttons
                .filter((b) => !b.url.startsWith('#'))
                .map((button, i) => (
                  <button
                    key={i}
                    onClick={() => window.open(button.url, '_blank')}
                    className="cursor-target border border-accent text-accent hover:bg-accent hover:text-white font-mono text-xs tracking-[0.15em] font-bold py-2.5 px-5 transition-colors duration-200"
                  >
                    {button.text.toUpperCase()}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HologramViewer;
