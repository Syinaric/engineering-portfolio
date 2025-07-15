import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectsList from './components/ProjectsList';
import Blog from './components/Blog';
import MobileMenu from './components/MobileMenu';
import Spotlight from './components/Spotlight';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('projects');

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

  return (
    <div className="min-h-screen bg-dark-bg relative">
      <Spotlight />
      <div className="relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-40 lg:hidden bg-dark-card border border-dark-border rounded-lg p-2 text-white hover:bg-dark-border transition-colors duration-200"
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
