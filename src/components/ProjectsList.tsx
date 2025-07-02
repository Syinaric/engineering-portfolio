import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectsList: React.FC = () => {
  return (
    <div className="p-4 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Projects</h1>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          More projects coming soon...
        </p>
      </div>
    </div>
  );
};

export default ProjectsList; 