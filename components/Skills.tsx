
import React from 'react';
import { Skill, SkillCategory, SkillLevel } from '../types';
import { Brain, Sparkles, Zap } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.ADVANCED: return 'from-violet-500 to-purple-600';
      case SkillLevel.INTERMEDIATE: return 'from-blue-500 to-cyan-600';
      case SkillLevel.BEGINNER: return 'from-slate-400 to-slate-500';
      default: return 'from-slate-300 to-slate-400';
    }
  };

  const getLevelWidth = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.ADVANCED: return '100%';
      case SkillLevel.INTERMEDIATE: return '65%';
      case SkillLevel.BEGINNER: return '35%';
      default: return '0%';
    }
  };

  return (
    <div className="group relative bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:scale-105 hover:border-violet-300 transition-all duration-300 overflow-hidden">
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(skill.level)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

      <div className="relative z-10 flex justify-between items-center">
        <span className="font-bold text-slate-800 group-hover:text-violet-700 transition-colors text-lg">
          {skill.name}
        </span>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {skill.level}
          </span>
          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)} transition-all duration-500 shadow-md`}
              style={{ width: getLevelWidth(skill.level) }}
            ></div>
          </div>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform -skew-x-12 group-hover:left-full transition-all duration-700"></div>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const categories = [
    {
      name: SkillCategory.AI_ML,
      color: 'from-violet-500 to-purple-600',
      icon: <Brain size={24} className="text-white" />
    },
    {
      name: SkillCategory.TECHNICAL,
      color: 'from-blue-500 to-cyan-600',
      icon: <Zap size={24} className="text-white" />
    },
    {
      name: SkillCategory.PROJECT_MGMT,
      color: 'from-amber-500 to-orange-600',
      icon: <Sparkles size={24} className="text-white" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-3 rounded-full mb-6 border border-violet-100">
          <Brain className="text-violet-600" size={24} />
          <span className="text-violet-600 font-bold uppercase tracking-wider text-sm">
            Expertise &amp; Compétences
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent mb-6">
          Mes Compétences
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto rounded-full shadow-lg"></div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-16">
        {categories.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat.name);

          if (categorySkills.length === 0) return null;

          return (
            <div key={cat.name} className="relative">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-800">
                    {cat.name}
                  </h3>
                  <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${cat.color} mt-2`}></div>
                </div>
                <span className="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                  {categorySkills.length} compétence{categorySkills.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Skills Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categorySkills.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <div className="text-center py-32">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-violet-100 to-purple-200 mb-6">
            <Brain className="text-violet-500" size={64} />
          </div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">
            Aucune compétence configurée
          </h3>
          <p className="text-slate-400">
            Ajoutez vos premières compétences depuis le panneau d'administration
          </p>
        </div>
      )}
    </div>
  );
};

export default Skills;

