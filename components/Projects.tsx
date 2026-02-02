
import React from 'react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
        Projects
        <span className="h-px flex-1 bg-neutral-800"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="glass rounded-3xl overflow-hidden group hover:border-white/20 transition-all hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
