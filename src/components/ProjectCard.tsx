import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageRefs = useRef<{ [key: string]: HTMLImageElement }>({});
  
  // Get all images for this project
  const allImages = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];
  
  // Preload all images when component mounts
  useEffect(() => {
    const loadPromises = allImages.map((imageSrc) => {
      return new Promise<string>((resolve, reject) => {
        // Check if already loaded
        if (imagesLoaded.has(imageSrc)) {
          resolve(imageSrc);
          return;
        }

        // Check if image is already in cache
        const img = new Image();
        img.onload = () => {
          setImagesLoaded((prev) => new Set(prev).add(imageSrc));
          imageRefs.current[imageSrc] = img;
          resolve(imageSrc);
        };
        img.onerror = reject;
        img.src = imageSrc;
      });
    });

    // Preload all images
    Promise.all(loadPromises).catch(console.error);
  }, [project.id]); // Only run when project changes
  
  const handleButtonClick = () => {
    if (project.demoUrl) {
      window.open(project.demoUrl, '_blank');
    } else if (project.externalUrl) {
      window.open(project.externalUrl, '_blank');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  const changeImage = (newIndex: number) => {
    if (isTransitioning) return; // Prevent rapid clicking
    
    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const nextImage = () => {
    if (allImages.length > 1) {
      const newIndex = (currentImageIndex + 1) % allImages.length;
      changeImage(newIndex);
    }
  };

  const prevImage = () => {
    if (allImages.length > 1) {
      const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
      changeImage(newIndex);
    }
  };

  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[currentImageIndex];
  const isImageLoaded = imagesLoaded.has(currentImage) || imageRefs.current[currentImage]?.complete;

  return (
    <div className="bg-dark-card border border-dark-border overflow-hidden hover:border-accent/50 transition-colors duration-300 cursor-target">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* Left Side - Text Content */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Project Title */}
            <div className="mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 tracking-tight">
                {project.title}
              </h3>
              <div className="w-16 h-0.5 bg-accent"></div>
            </div>

            {/* Project Description */}
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-dark-bg border border-dark-border text-gray-300 px-2 py-1 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            {project.buttons && project.buttons.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {project.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (button.url.startsWith('#')) {
                        // Handle hash-based URLs (internal navigation)
                        window.location.hash = button.url;
                      } else {
                        // Handle external URLs (open in new tab)
                        window.open(button.url, '_blank');
                      }
                    }}
                    className="bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-4 transition-colors duration-200 flex items-center space-x-2 group cursor-target"
                  >
                    <span>{button.text}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : project.buttonText ? (
              <button
                onClick={handleButtonClick}
                className="bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-4 transition-colors duration-200 flex items-center space-x-2 group cursor-target"
              >
                <span>{project.buttonText}</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2 relative flex">
          <div className="relative overflow-hidden h-48 lg:h-full lg:min-h-[20rem] w-full">
            {/* Render all images with opacity transitions */}
            {allImages.map((imageSrc, index) => {
              const isActive = index === currentImageIndex;
              const isLoaded = imagesLoaded.has(imageSrc) || imageRefs.current[imageSrc]?.complete;
              
              return (
                <img
                  key={imageSrc}
                  src={imageSrc}
                  alt={`${project.title} - Image ${index + 1}`}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300 object-cover ${
                    isActive && isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    willChange: isActive ? 'opacity' : 'auto',
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              );
            })}
            
            {/* Loading placeholder */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-dark-bg/50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Carousel Navigation Arrows */}
            {hasMultipleImages && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={prevImage}
                  disabled={isTransitioning}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 transition-all duration-200 z-10 cursor-target"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Right Arrow */}
                <button
                  onClick={nextImage}
                  disabled={isTransitioning}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 transition-all duration-200 z-10 cursor-target"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 font-mono">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 