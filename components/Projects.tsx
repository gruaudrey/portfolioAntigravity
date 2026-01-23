
import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Code2, Rocket, ListTodo } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-500 group flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-white/95 backdrop-blur rounded-2xl text-[10px] font-black text-violet-600 border border-violet-50 uppercase tracking-widest shadow-sm">
            {project.badge}
          </span>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{project.title}</h3>
          <span className="text-xs font-bold text-slate-400">{project.timeline}</span>
        </div>
        
        <p className="text-slate-500 leading-relaxed font-medium mb-8">
          {project.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 mb-8">
           {project.technologies.slice(0, 3).map((tech, i) => (
             <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
               {tech}
             </span>
           ))}
           {project.technologies.length > 3 && <span className="text-[10px] font-bold text-slate-300">+{project.technologies.length - 3}</span>}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-center py-4 rounded-2xl font-bold transition-all border-2 ${
            isExpanded ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-900 border-slate-100 hover:border-violet-600'
          }`}
        >
          {isExpanded ? 'Fermer les détails' : 'Détails du projet'}
          {isExpanded ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
        </button>

        {isExpanded && (
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <ListTodo size={14} /> Le Problème
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.problem}</p>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-600">
                    <Rocket size={14} /> La Solution
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.solution}</p>
               </div>
            </div>

            <div className="bg-violet-50/50 p-6 rounded-[2rem] border border-violet-100/50">
              <span className="block text-[10px] font-black uppercase tracking-widest text-violet-600 mb-2">Impact Direct</span>
              <p className="text-violet-900 font-bold leading-relaxed">{project.impact}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Projets Sélectionnés</h2>
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
          Focus sur l'intégration des LLM et la création de systèmes RAG pour optimiser les processus métiers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
