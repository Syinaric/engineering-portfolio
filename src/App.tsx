import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Sidebar from './components/Sidebar';
import ProjectsList from './components/ProjectsList';
import Blog from './components/Blog';
import About from './components/About';
import MobileMenu from './components/MobileMenu';
import Spotlight from './components/Spotlight';
import TargetCursor from './components/TargetCursor';
import PingPongCode from './components/PingPongCode';
import RoboticArmDetails from './components/RoboticArmDetails';
import SumoBotCode from './components/SumoBotCode';
import Terminal from './components/Terminal';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('projects');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  // Check if we're on the ping pong code page
  const [isPingPongCodePage, setIsPingPongCodePage] = useState(window.location.hash === '#ping-pong-code');
  // Check if we're on the robotic arm details page
  const [isRoboticArmDetailsPage, setIsRoboticArmDetailsPage] = useState(window.location.hash === '#robotic-arm-details');
  // Check if we're on the sumo bot code page
  const [isSumoBotCodePage, setIsSumoBotCodePage] = useState(window.location.hash === '#sumo-bot-code');

  // Detect operating system
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isMobile = window.innerWidth < 1024; // lg breakpoint

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#blog' || hash === '#projects' || hash === '#about') {
        setCurrentSection(hash.slice(1));
      }
      // Update ping pong code page state
      setIsPingPongCodePage(hash === '#ping-pong-code');
      // Update robotic arm details page state
      setIsRoboticArmDetailsPage(hash === '#robotic-arm-details');
      // Update sumo bot code page state
      setIsSumoBotCodePage(hash === '#sumo-bot-code');
      // If navigating away from detail pages, set section to projects
      if (hash === '' || hash === '#projects') {
        setCurrentSection('projects');
      }
    };

    // Set initial section based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcuts for desktop users
  useEffect(() => {
    if (isMobile) return; // Don't add keyboard shortcuts on mobile

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key, 'Meta:', event.metaKey, 'Ctrl:', event.ctrlKey, 'Mac:', isMac); // Debug all key presses
      
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;
      
      if (modifierKey && event.key === 'k') {
        event.preventDefault();
        setCurrentSection('projects');
        window.location.hash = 'projects';
      }

      // Blog shortcut: Ctrl+B (Windows) or Cmd+B (Mac)
      if (modifierKey && event.key === 'b') {
        event.preventDefault();
        setCurrentSection('blog');
        window.location.hash = 'blog';
      }

      // Resume shortcut: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
      if ((isMac && event.metaKey && event.shiftKey && event.key === 'r') || 
          (!isMac && event.ctrlKey && event.shiftKey && event.key === 'r')) {
        event.preventDefault();
        window.open('https://drive.google.com/file/d/1EjlXD3IdxZ9oUwRscBJqBEAptuipYFZM/view', '_blank');
      }

      // Terminal shortcut: Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac)
      if ((isMac && event.metaKey && event.shiftKey && event.key === 'm') || 
          (!isMac && event.ctrlKey && event.shiftKey && event.key === 'm')) {
        event.preventDefault();
        console.log('Terminal shortcut triggered!'); // Debug log
        setIsTerminalOpen(!isTerminalOpen);
      }
    };

    // Use capture phase to ensure the event is caught
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [currentSection, isMac, isMobile, isTerminalOpen]);

            return (
            <div className="min-h-screen bg-dark-bg relative">
              <Spotlight />
              <TargetCursor 
                spinDuration={3.6}
                hideDefaultCursor={true}
              />
              <Analytics />
              <div className="relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-40 lg:hidden bg-dark-card border border-dark-border rounded-lg p-2 text-white hover:bg-dark-border transition-colors duration-200 cursor-target"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>





        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} currentSection={currentSection} />
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar currentSection={currentSection} />
        </div>
        
        {/* Main Content */}
        <div className="lg:ml-[30vw]">
          {isPingPongCodePage ? <PingPongCode /> : 
           isRoboticArmDetailsPage ? <RoboticArmDetails /> :
           isSumoBotCodePage ? <SumoBotCode /> : (
            currentSection === 'blog' ? <Blog /> : 
            currentSection === 'about' ? <About /> : 
            <ProjectsList />
          )}
        </div>
      </div>

      {/* Terminal Overlay */}
      {isTerminalOpen && (
        <Terminal onExit={() => setIsTerminalOpen(false)} />
      )}
    </div>
  );
}

export default App;
