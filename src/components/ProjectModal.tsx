import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface HologramConfig {
  shape: 'cube' | 'torus' | 'icosahedron';
  modelUrl?: string;
  // Orientation fix in radians [x, y, z] for models authored Z-up, etc.
  rotation?: [number, number, number];
}

export interface ProjectInfo {
  title: string;
  description: string;
  // Longer write-up shown in the detail view; falls back to description.
  details?: string;
  images?: string[];
  achievements?: string[];
  links?: { label: string; url: string }[];
  hologram?: HologramConfig;
}

/**
 * Holographic shader: grey fresnel rim + moving scanlines + flicker.
 * Rendered light-on-dark; the container is CSS-inverted in light mode.
 */
const createHologramMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#d4d4d4') },
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

/** Placeholder geometry for projects without a scanned model. */
const PlaceholderShape: React.FC<{ shape: HologramConfig['shape'] }> = ({ shape }) => {
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
          color="#bfbfbf"
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
        <meshBasicMaterial color="#d4d4d4" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.18, 64]} />
        <meshBasicMaterial color="#d4d4d4" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* light cone */}
      <mesh ref={cone} position={[0, 1.5, 0]}>
        <coneGeometry args={[1.0, 3, 32, 1, true]} />
        <meshBasicMaterial
          color="#d4d4d4"
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

interface ProjectModalProps {
  project: ProjectInfo;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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

  const info = (
    <div className="p-8 lg:p-10">
      <h2 className="mb-4 pr-10 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 xl:text-3xl">
        {project.title}
      </h2>

      <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {project.details ?? project.description}
      </p>

      {project.achievements && project.achievements.length > 0 && (
        <div className="mb-6">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Achieved
          </div>
          <div className="flex flex-wrap gap-2">
            {project.achievements.map((a, i) => (
              <span
                key={i}
                className="border border-neutral-300 px-3 py-1.5 font-mono text-sm font-bold text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.images && project.images.length > 0 && (
        <div className="mb-6 space-y-3">
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} ${i + 1}`}
              loading="lazy"
              className="w-full border border-neutral-200 dark:border-neutral-800"
            />
          ))}
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-50/95 backdrop-blur-md dark:bg-neutral-950/95 lg:flex-row">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {holo ? (
        <>
          {/* 3D viewport; rendered light-on-dark and CSS-inverted in light mode */}
          <div className="relative min-h-[45vh] flex-1">
            <div className="absolute inset-0 invert dark:invert-0">
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
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
              DRAG TO ROTATE · SCROLL TO ZOOM
            </div>
          </div>

          {/* Info panel */}
          <div className="relative w-full overflow-y-auto border-t border-neutral-200 dark:border-neutral-800 lg:w-[420px] lg:border-l lg:border-t-0 xl:w-[480px]">
            {info}
          </div>
        </>
      ) : (
        <div className="relative mx-auto w-full max-w-2xl overflow-y-auto pt-16">
          {info}
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
