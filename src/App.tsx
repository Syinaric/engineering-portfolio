import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectsList from './components/ProjectsList';
import Blog from './components/Blog';
import MobileMenu from './components/MobileMenu';
import Spotlight from './components/Spotlight';
import TargetCursor from './components/TargetCursor';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('projects');

  // Detect operating system
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isMobile = window.innerWidth < 1024; // lg breakpoint

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'blog' || hash === 'projects') {
        setCurrentSection(hash);
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
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;
      
      if (modifierKey && event.key === 'k') {
        event.preventDefault();
        const newSection = currentSection === 'projects' ? 'blog' : 'projects';
        setCurrentSection(newSection);
        window.location.hash = newSection;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isMac, isMobile]);

  return (
    <div className="min-h-screen bg-dark-bg relative">
      <Spotlight />
      <TargetCursor 
        spinDuration={3.6}
        hideDefaultCursor={true}
      />
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
          {currentSection === 'blog' ? <Blog /> : <ProjectsList />}
        </div>
      </div>
    </div>
  );
}

export default App;
