import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Nav from './components/Nav';
import SceneBackground from './components/three/SceneBackground';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import AboutSection from './components/sections/AboutSection';
import TargetCursor from './components/TargetCursor';
import PingPongCode from './components/PingPongCode';
import RoboticArmDetails from './components/RoboticArmDetails';
import SumoBotCode from './components/SumoBotCode';
import LineFollowerDetails from './components/LineFollowerDetails';
import Terminal from './components/Terminal';

const DETAIL_PAGES = [
  '#ping-pong-code',
  '#robotic-arm-details',
  '#sumo-bot-code',
  '#line-follower-details',
];

function App() {
  const [currentSection, setCurrentSection] = useState('projects');
  const [detailPage, setDetailPage] = useState<string | null>(
    DETAIL_PAGES.includes(window.location.hash) ? window.location.hash : null
  );
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (DETAIL_PAGES.includes(hash)) {
        setDetailPage(hash);
      } else {
        setDetailPage(null);
        if (hash === '#about' || hash === '#experience') {
          setCurrentSection(hash.slice(1));
        } else {
          setCurrentSection('projects');
        }
      }
      window.scrollTo(0, 0);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcuts (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;

      // Projects: Cmd/Ctrl+K
      if (modifierKey && !event.shiftKey && event.key === 'k') {
        event.preventDefault();
        window.location.hash = 'projects';
      }

      // Resume: Cmd/Ctrl+Shift+R
      if (modifierKey && event.shiftKey && event.key === 'r') {
        event.preventDefault();
        window.open(
          'https://drive.google.com/file/d/1YvcjrFxJHk6EH1VouLGam7_pzL7KyXbU/view?usp=sharing',
          '_blank'
        );
      }

      // Terminal: Cmd/Ctrl+Shift+M
      if (modifierKey && event.shiftKey && event.key === 'm') {
        event.preventDefault();
        setIsTerminalOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isMac, isMobile]);

  return (
    <div className="min-h-screen bg-dark-bg relative">
      <SceneBackground />
      <TargetCursor spinDuration={3.6} hideDefaultCursor={true} />
      <Analytics />

      <div className="relative z-10">
        <Nav currentSection={currentSection} />

        <main className="pt-16">
          {detailPage === '#ping-pong-code' ? (
            <PingPongCode />
          ) : detailPage === '#robotic-arm-details' ? (
            <RoboticArmDetails />
          ) : detailPage === '#sumo-bot-code' ? (
            <SumoBotCode />
          ) : detailPage === '#line-follower-details' ? (
            <LineFollowerDetails />
          ) : currentSection === 'about' ? (
            <AboutSection />
          ) : currentSection === 'experience' ? (
            <ExperienceSection />
          ) : (
            <ProjectsSection />
          )}
        </main>
      </div>

      {isTerminalOpen && <Terminal onExit={() => setIsTerminalOpen(false)} />}
    </div>
  );
}

export default App;
