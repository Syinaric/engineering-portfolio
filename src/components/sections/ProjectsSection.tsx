import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, Project } from '../../data/projects';
import CurrentlyDoing from '../CurrentlyDoing';
import HologramViewer from '../three/HologramViewer';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Project card with tilt hover, image parallax + carousel             */
/* ------------------------------------------------------------------ */

interface CardProps {
  project: Project;
  index: number;
  onOpenHologram: (p: Project) => void;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, onOpenHologram }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const allImages =
    project.images && project.images.length > 0 ? project.images : [project.image];
  const flip = index % 2 === 1;

  // Subtle 3D tilt following the cursor.
  const handleMove = (e: React.MouseEvent) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 4,
      rotateX: -y * 4,
      transformPerspective: 1200,
      duration: 0.5,
      ease: 'power2.out',
    });
  };
  const handleLeave = () => {
    if (innerRef.current) {
      gsap.to(innerRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' });
    }
  };

  // Scroll entrance + image parallax.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
        }
      );
      if (imgWrapRef.current) {
        gsap.fromTo(
          imgWrapRef.current.querySelectorAll('img'),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="opacity-0">
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="cursor-target group relative bg-dark-card/80 backdrop-blur-sm border border-dark-border hover:border-accent/60 transition-colors duration-300 will-change-transform"
      >
        {/* index tag */}
        <div className="absolute -top-3 left-6 z-10 bg-dark-bg border border-dark-border group-hover:border-accent/60 px-3 py-1 font-mono text-xs text-accent tracking-[0.25em] transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className={`flex flex-col lg:flex-row ${flip ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text */}
          <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
                {project.title}
              </h3>
              <div className="w-16 h-0.5 bg-accent mb-5 group-hover:w-28 transition-all duration-500" />
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {project.achievements && project.achievements.length > 0 && (
                <div className="mb-6 flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[10px] text-accent tracking-[0.3em]">
                    ACHIEVED
                  </span>
                  {project.achievements.map((a, i) => (
                    <span
                      key={i}
                      className="bg-accent/15 border border-accent/50 text-accent px-3 py-1.5 text-sm font-bold font-mono"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              {project.hologram && (
                <button
                  onClick={() => onOpenHologram(project)}
                  className="cursor-target bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold tracking-[0.15em] py-2.5 px-5 transition-colors duration-200 flex items-center gap-2"
                >
                  {/* hologram icon */}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                    <path strokeLinecap="square" strokeWidth={2} d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
                  </svg>
                  VIEW IN 3D
                </button>
              )}
              {project.buttons?.map((button, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (button.url.startsWith('#')) {
                      window.location.hash = button.url;
                    } else {
                      window.open(button.url, '_blank');
                    }
                  }}
                  className="cursor-target border border-dark-border hover:border-accent text-gray-300 hover:text-accent font-mono text-xs font-bold tracking-[0.15em] py-2.5 px-5 transition-colors duration-200"
                >
                  {button.text.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Image w/ parallax + carousel */}
          <div className="lg:w-[45%] relative overflow-hidden h-56 lg:h-auto lg:min-h-[22rem]">
            <div ref={imgWrapRef} className="absolute inset-0">
              {allImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-[-10%] w-[120%] h-[120%] object-cover transition-opacity duration-300 ${
                    i === imageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            {/* purple scrim on hover */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 pointer-events-none" />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setImageIndex((imageIndex - 1 + allImages.length) % allImages.length)}
                  className="cursor-target absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-accent text-white p-2 transition-colors duration-200 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setImageIndex((imageIndex + 1) % allImages.length)}
                  className="cursor-target absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-accent text-white p-2 transition-colors duration-200 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 font-mono z-10">
                  {imageIndex + 1}/{allImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hologramProject, setHologramProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap.fromTo(
        '.hero-line',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );
      // Giant ghost title drifts slower than the page (parallax)
      gsap.to('.ghost-title', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      {/* Hero */}
      <div className="relative min-h-[88vh] flex flex-col justify-center px-6 lg:px-16 overflow-hidden">
        <div className="ghost-title absolute top-[12%] left-0 right-0 text-center font-bold tracking-tighter select-none pointer-events-none text-[22vw] leading-none text-transparent opacity-40" style={{ WebkitTextStroke: '1px rgba(162,89,255,0.25)' }}>
          PROJECTS
        </div>

        <div className="relative max-w-5xl">
          <div className="hero-line font-mono text-accent text-xs tracking-[0.4em] mb-6">
            NANOTECHNOLOGY ENGINEERING @ UNIVERSITY OF WATERLOO
          </div>
          <h1 className="hero-line text-5xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6">
            MAHIR
            <br />
            <span className="text-accent">ARORA</span>
          </h1>
          <p className="hero-line text-gray-400 text-base lg:text-lg max-w-xl mb-8">
            I design and build things that move, spin, sense and generate:
            robots, motors, nanogenerators and the software that drives them.
          </p>
          <div className="hero-line max-w-md text-left">
            <CurrentlyDoing />
          </div>
        </div>

        {/* scroll cue */}
        <div className="hero-line absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="font-mono text-[10px] tracking-[0.4em]">SCROLL</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </div>
      </div>

      {/* Cards */}
      <div className="relative px-4 lg:px-16 pb-24 space-y-14 lg:space-y-20 max-w-[1400px] mx-auto">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpenHologram={setHologramProject}
          />
        ))}

        <div className="text-center pt-8 border-t border-dark-border">
          <p className="text-gray-500 text-sm font-mono tracking-[0.2em]">
            [ MORE_PROJECTS_IN_DEVELOPMENT ]
          </p>
        </div>
      </div>

      {/* 3D hologram overlay */}
      {hologramProject && (
        <HologramViewer project={hologramProject} onClose={() => setHologramProject(null)} />
      )}
    </div>
  );
};

export default ProjectsSection;
