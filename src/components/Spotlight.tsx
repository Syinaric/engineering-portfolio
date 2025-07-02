import React, { useEffect, useRef } from 'react';

const SPOTLIGHT_SIZE = 500;

const Spotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Animate the spotlight position with lag
  useEffect(() => {
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${pos.current.x - SPOTLIGHT_SIZE / 2}px`;
        spotlightRef.current.style.top = `${pos.current.y - SPOTLIGHT_SIZE / 2}px`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // Update target position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // CSS dot grid background
  const gridStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 0,
    backgroundImage:
      'radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
    backgroundSize: '28px 28px',
    opacity: 1,
  };

  // The purple spotlight (faint, smaller, no white mask)
  const purpleStyle: React.CSSProperties = {
    position: 'fixed',
    width: SPOTLIGHT_SIZE,
    height: SPOTLIGHT_SIZE,
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(162,89,255,0.18) 0%, rgba(162,89,255,0.08) 60%, transparent 100%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    zIndex: 1,
    left: pos.current.x - SPOTLIGHT_SIZE / 2,
    top: pos.current.y - SPOTLIGHT_SIZE / 2,
  };

  return (
    <>
      <div style={gridStyle} />
      <div ref={spotlightRef} style={purpleStyle} />
    </>
  );
};

export default Spotlight; 