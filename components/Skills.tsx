
import React from 'react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
        Skills
        <span className="h-px flex-1 bg-neutral-800"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Fix: Cast Object.entries to the expected type to resolve 'unknown' error on items.map */}
        {(Object.entries(groupedSkills) as [string, Skill[]][]).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-neutral-400 mb-6 capitalize">{category}</h3>
            <div className="space-y-6">
              {items.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-neutral-500">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
