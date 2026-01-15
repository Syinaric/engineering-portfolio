import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { projects } from '../data/projects';

const PDFPortfolio: React.FC = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Filter out TasteR project
  const portfolioProjects = projects.filter(project => project.title !== 'TasteR');

  const generatePDF = async () => {
    if (!portfolioRef.current) return;

    try {
      // Create canvas from the portfolio content with optimized settings
      const canvas = await html2canvas(portfolioRef.current, {
        scale: 1.5, // Reduced from 2 to lower file size
        useCORS: true,
        logging: false,
        backgroundColor: '#0a0a0a',
        imageTimeout: 0,
        removeContainer: true
      });

      // Compress image to JPEG with quality setting for smaller file size
      const imgData = canvas.toDataURL('image/jpeg', 0.75); // JPEG with 75% quality for smaller file size
      
      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST'); // FAST compression
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('Mahir_Arora_Portfolio.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={generatePDF}
          className="bg-accent hover:bg-accent/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-target"
        >
          Generate PDF Portfolio
        </button>
      </div>

      {/* Hidden portfolio content for PDF generation */}
      <div 
        ref={portfolioRef} 
        className="bg-dark-bg text-white" 
        style={{ 
          padding: '40px', 
          maxWidth: '210mm',
          minHeight: '297mm',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {/* Header */}
        <div className="text-center mb-16 pb-8" style={{ borderBottom: '3px solid #a259ff' }}>
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#a259ff', letterSpacing: '-0.02em' }}>
            Mahir Arora
          </h1>
          <p className="text-2xl text-gray-300 mb-2 font-semibold">Nanotechnology Engineer</p>
          <p className="text-xl text-gray-400 mb-4">University of Waterloo</p>
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400 flex-wrap">
            <span>mahirarora.ca</span>
            <span>•</span>
            <span>mahirarora21@gmail.com</span>
            <span>•</span>
            <span>linkedin.com/in/mahir-arora</span>
            <span>•</span>
            <span>github.com/Syinaric</span>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-20">
          {portfolioProjects.map((project, index) => (
            <div key={project.id} className="mb-16" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-3 h-16" style={{ backgroundColor: '#a259ff' }}></div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-3" style={{ color: '#a259ff', lineHeight: '1.2' }}>
                      {project.title}
                    </h2>
                    <div className="w-32 h-1.5" style={{ backgroundColor: '#a259ff' }}></div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="grid grid-cols-2 gap-10 mb-8">
                {/* Left: Image */}
                <div className="flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-xl shadow-2xl"
                    style={{ 
                      maxHeight: '280px', 
                      objectFit: 'cover',
                      border: '2px solid rgba(162, 89, 255, 0.3)'
                    }}
                    crossOrigin="anonymous"
                    loading="eager"
                  />
                </div>

                {/* Right: Description and Details */}
                <div>
                  <p className="text-gray-300 text-base leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
                    {project.description}
                  </p>

                  {/* Achievements */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-semibold text-accent uppercase tracking-wide">ACHIEVED</span>
                        <div className="flex flex-wrap gap-2">
                          {project.achievements.map((achievement, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-sm font-bold"
                              style={{
                                backgroundColor: 'rgba(162, 89, 255, 0.2)',
                                border: '1px solid rgba(162, 89, 255, 0.5)',
                                color: '#a259ff'
                              }}
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs font-mono"
                            style={{
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #2a2a2a',
                              color: '#d1d5db'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Additional Images */}
              {project.images && project.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {project.images.slice(1, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${project.title} ${idx + 2}`}
                      className="w-full rounded-lg shadow-lg"
                      style={{ 
                        maxHeight: '140px', 
                        objectFit: 'cover',
                        border: '1px solid rgba(162, 89, 255, 0.2)'
                      }}
                      crossOrigin="anonymous"
                      loading="eager"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 text-center text-gray-400 text-sm" style={{ borderTop: '2px solid #a259ff' }}>
          <p className="mb-2">Engineering Portfolio</p>
          <p>Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

export default PDFPortfolio;


