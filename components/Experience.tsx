
import React from 'react';
import { Experience as ExpType } from '../types';

interface ExperienceProps {
  experience: ExpType[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-neutral-900">
        Experience
        <span className="h-px flex-1 bg-neutral-200"></span>
      </h2>
      <div className="space-y-16">
        {experience.map((item, index) => (
          <div key={index} className="relative pl-8 border-l border-neutral-200 group">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-neutral-200 group-hover:bg-blue-600 transition-colors"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">{item.role}</h3>
                <p className="text-blue-600 font-medium">{item.company}</p>
              </div>
              <span className="text-sm text-neutral-400 mt-1 md:mt-0 font-mono">{item.period}</span>
            </div>

            <p className="text-neutral-600 leading-relaxed mb-6">
              {item.description}
            </p>

            {item.responsibilities && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Key Responsibilities</h4>
                <ul className="space-y-2">
                  {item.responsibilities.split(/[;•\n]/).filter(r => r.trim()).map((resp, i) => (
                    <li key={i} className="text-sm text-neutral-500 flex gap-3">
                      <span className="text-blue-500 mt-1 font-bold">•</span>
                      <span>{resp.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.environment && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mr-2">Environment:</span>
                {item.environment.split(/[,/|]/).map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-neutral-100 shadow-sm rounded text-[11px] text-neutral-500 font-medium">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
