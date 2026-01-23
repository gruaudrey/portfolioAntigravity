
import React from 'react';
import { Skill, SkillCategory, SkillLevel } from '../types';

interface SkillsProps {
  skills: Skill[];
}

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.ADVANCED: return 'bg-violet-500';
      case SkillLevel.INTERMEDIATE: return 'bg-violet-300';
      case SkillLevel.BEGINNER: return 'bg-slate-300';
      default: return 'bg-slate-200';
    }
  };

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
      <span className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">{skill.name}</span>
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase tracking-tighter font-bold text-slate-400 mb-1">{skill.level}</span>
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${getLevelColor(skill.level)}`} style={{ width: skill.level === SkillLevel.ADVANCED ? '100%' : skill.level === SkillLevel.INTERMEDIATE ? '65%' : '35%' }}></div>
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const categories = [
    { name: SkillCategory.AI_ML, color: 'text-violet-600' },
    { name: SkillCategory.TECHNICAL, color: 'text-slate-600' },
    { name: SkillCategory.PROJECT_MGMT, color: 'text-slate-800' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Compétences</h2>
        <div className="w-20 h-1.5 bg-gradient-primary mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${cat.color}`}>
              {cat.name}
              <div className="flex-1 h-px bg-slate-200"></div>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills
                .filter((s) => s.category === cat.name)
                .map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
