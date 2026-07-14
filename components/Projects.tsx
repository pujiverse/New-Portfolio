
import React from 'react';
import { Project } from '../types';
import { ExternalLink, Code2 } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-neutral-900">
        Projects
        <span className="h-px flex-1 bg-neutral-100"></span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div key={i} className="group flex flex-col bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:border-blue-600/30 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden bg-neutral-100 relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-500 font-light leading-relaxed mb-6 flex-1">
                {project.description}
              </p>
              
              {project.tech && project.tech.length > 0 && (
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} className="text-neutral-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-lg text-neutral-600 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
