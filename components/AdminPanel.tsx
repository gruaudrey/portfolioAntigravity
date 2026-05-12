
import React, { useState, useRef } from 'react';
import {
  LogOut, Plus, Trash2, Mail, User, Briefcase, CheckCircle, Sparkles,
  Info, Database, Image as ImageIcon, Cpu, CloudUpload, Upload,
  Linkedin, Github, Globe, Download, BookOpen, Wrench
} from 'lucide-react';
import { PortfolioData, Profile, Project, Skill, SkillLevel, SkillCategory, ContactMessage, Tool, ToolCategory } from '../types';

interface AdminPanelProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  messages: ContactMessage[];
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, setData, messages, onExit }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'tools' | 'profile' | 'about' | 'messages' | 'guide'>('projects');
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Fonction utilitaire pour mettre à jour les données de manière persistante
  const syncData = (newData: PortfolioData) => {
    setIsSaving(true);
    setData(newData);
    setTimeout(() => setIsSaving(false), 800);
  };

  // Fonction de sauvegarde des données dans Supabase
  const handleExportData = async () => {
    setIsExporting(true);

    try {
      // Import dynamique du service Supabase
      const { savePortfolioData } = await import('../lib/supabaseService');

      const success = await savePortfolioData(data);

      if (success) {
        alert('✅ Modifications sauvegardées dans Supabase !\n\nVos changements sont maintenant permanents.');
      } else {
        alert('❌ Erreur lors de la sauvegarde dans Supabase.\n\nVérifiez votre connexion et les paramètres Supabase.');
      }
    } catch (error: any) {
      const isEnvError = error.message?.includes('manquantes') || error.message?.includes('undefined');
      alert(
        '❌ Erreur de connexion Supabase\n\n' +
        (isEnvError
          ? 'Les variables d\'environnement VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY ne sont pas définies dans Render.\n\nAjoutez-les dans Dashboard Render → Environment.'
          : 'Détail : ' + error.message
        )
      );
    }

    setTimeout(() => setIsExporting(false), 1500);
  };

  // Gestion de l'upload d'image vers Base64
  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- LOGIQUE PROJETS ---
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Nouveau Projet IA',
      badge: 'IA | Automatisation',
      shortDescription: 'Résumé accrocheur du projet...',
      problem: 'Quel était le défi à relever ?',
      solution: 'Comment l\'IA a-t-elle résolu le problème ?',
      technologies: ['Python', 'LLM'],
      impact: 'ROI : Gain de productivité de X%',
      timeline: '2025',
      imageUrl: 'https://picsum.photos/seed/new/800/600',
      link: '#'
    };
    syncData({ ...data, projects: [newProject, ...data.projects] });
  };

  const updateProjectField = (id: string, field: keyof Project, value: any) => {
    const updatedProjects = data.projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    syncData({ ...data, projects: updatedProjects });
  };

  const deleteProject = (id: string) => {
    if (confirm("Confirmer la suppression de ce projet ?")) {
      const updatedProjects = data.projects.filter(p => p.id !== id);
      syncData({ ...data, projects: updatedProjects });
    }
  };

  // --- LOGIQUE COMPÉTENCES ---
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'Nouvelle expertise',
      level: SkillLevel.BEGINNER,
      category: SkillCategory.TECHNICAL
    };
    syncData({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkillField = (id: string, field: keyof Skill, value: any) => {
    const updatedSkills = data.skills.map(s => s.id === id ? { ...s, [field]: value } : s);
    syncData({ ...data, skills: updatedSkills });
  };

  const deleteSkill = (id: string) => {
    const updatedSkills = data.skills.filter(s => s.id !== id);
    syncData({ ...data, skills: updatedSkills });
  };

  // --- LOGIQUE PROFIL & HERO ---
  const updateProfileField = (field: keyof Profile, value: any) => {
    syncData({ ...data, profile: { ...data.profile, [field]: value } });
  };

  const updateHeroTag = (index: number, field: 'label' | 'value', val: string) => {
    const newTags = [...data.profile.heroTags];
    newTags[index] = { ...newTags[index], [field]: val };
    updateProfileField('heroTags', newTags);
  };

  // --- LOGIQUE OUTILS ---
  const addTool = () => {
    const newTool: Tool = {
      id: Date.now().toString(),
      name: 'Nouvel Outil',
      category: ToolCategory.DEV,
      description: 'Description de l\'outil...',
      logoUrl: ''
    };
    syncData({ ...data, tools: [...data.tools, newTool] });
  };

  const updateToolField = (id: string, field: keyof Tool, value: any) => {
    const updatedTools = data.tools.map(t => t.id === id ? { ...t, [field]: value } : t);
    syncData({ ...data, tools: updatedTools });
  };

  const deleteTool = (id: string) => {
    if (confirm("Confirmer la suppression de cet outil ?")) {
      const updatedTools = data.tools.filter(t => t.id !== id);
      syncData({ ...data, tools: updatedTools });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
              <Database size={22} className="text-blue-600" />
              CONSOLE PORTFOLIO
            </h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Éditeur Audrey Gruneisen</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all ${isSaving ? 'text-blue-600 bg-blue-50' : 'text-slate-300'}`}>
            <CloudUpload size={16} className={isSaving ? 'animate-bounce' : ''} />
            {isSaving ? 'SAUVEGARDE EN COURS...' : 'MODIFICATIONS ENREGISTRÉES'}
          </div>

          <button
            onClick={handleExportData}
            disabled={isExporting}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${isExporting
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
              }`}
          >
            <Download size={18} className={isExporting ? 'animate-bounce' : ''} />
            {isExporting ? 'SAUVEGARDÉ ✓' : 'SAUVEGARDER LES MODIFICATIONS'}
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            <LogOut size={18} /> QUITTER L'ÉDITEUR
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-80 bg-white border-r border-slate-200 p-8 flex flex-col gap-2">
          {[
            { id: 'projects', label: 'Mes Projets', icon: <Briefcase size={20} />, count: data.projects.length },
            { id: 'skills', label: 'Compétences', icon: <Cpu size={20} />, count: data.skills.length },
            { id: 'tools', label: 'Outils', icon: <Wrench size={20} />, count: data.tools.length },
            { id: 'profile', label: 'Hero & Identité', icon: <User size={20} /> },
            { id: 'about', label: 'À Propos', icon: <Info size={20} /> },
            { id: 'messages', label: 'Messages', icon: <Mail size={20} />, count: messages.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black transition-all ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <div className="flex items-center gap-4">
                {tab.icon}
                <span className="tracking-tight">{tab.label}</span>
              </div>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-2 py-1 rounded-md ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto p-12">
          {activeTab === 'projects' && (
            <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
              <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter">Gestion des Projets</h2>
                  <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Uploadez vos photos de projets directement</p>
                </div>
                <button onClick={addProject} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                  <Plus size={20} /> NOUVEAU PROJET
                </button>
              </div>

              <div className="grid gap-12">
                {data.projects.map((project) => (
                  <div key={project.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative group hover:shadow-xl transition-all">
                    <button onClick={() => deleteProject(project.id)} className="absolute top-8 right-8 p-3 text-red-200 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={24} />
                    </button>
                    <div className="grid lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-4 space-y-6">
                        {/* Image de couverture */}
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Image de couverture</label>
                          <div className="aspect-video rounded-3xl overflow-hidden bg-slate-50 border-4 border-slate-100 shadow-inner relative group/img">
                            <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
                            <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer text-white font-bold text-sm">
                              <Upload size={24} className="mb-2" />
                              CHANGER L'IMAGE
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleImageUpload(e.target.files[0], (b64) => updateProjectField(project.id, 'imageUrl', b64));
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Photos supplémentaires */}
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Photos supplémentaires</label>
                          <div className="grid grid-cols-3 gap-2">
                            {(project.images || []).map((img, idx) => (
                              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group/thumb">
                                <img src={img} className="w-full h-full object-cover" alt={`photo ${idx + 1}`} />
                                <button
                                  onClick={() => {
                                    const updated = (project.images || []).filter((_, i) => i !== idx);
                                    updateProjectField(project.id, 'images', updated);
                                  }}
                                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                            <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-500">
                              <Plus size={20} />
                              <span className="text-[10px] font-bold mt-1">AJOUTER</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleImageUpload(e.target.files[0], (b64) => {
                                      const updated = [...(project.images || []), b64];
                                      updateProjectField(project.id, 'images', updated);
                                    });
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Badge</label>
                          <input type="text" value={project.badge} onChange={e => updateProjectField(project.id, 'badge', e.target.value)} className="w-full border border-slate-200 rounded-xl p-4 font-black text-blue-600 focus:border-blue-500 outline-none" />
                        </div>
                      </div>
                      <div className="lg:col-span-8 space-y-8">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Titre du Projet</label>
                            <input type="text" value={project.title} onChange={e => updateProjectField(project.id, 'title', e.target.value)} className="w-full border border-slate-200 rounded-xl p-5 font-black text-2xl outline-none" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Période</label>
                            <input type="text" value={project.timeline} onChange={e => updateProjectField(project.id, 'timeline', e.target.value)} className="w-full border border-slate-200 rounded-xl p-5 font-bold outline-none" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description Courte</label>
                          <textarea rows={2} value={project.shortDescription} onChange={e => updateProjectField(project.id, 'shortDescription', e.target.value)} className="w-full border border-slate-200 rounded-xl p-5 font-medium outline-none resize-none" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Le Problème</label>
                            <textarea rows={4} value={project.problem} onChange={e => updateProjectField(project.id, 'problem', e.target.value)} className="w-full border border-slate-200 rounded-xl p-5 text-sm outline-none resize-none bg-slate-50/50" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-500">La Solution</label>
                            <textarea rows={4} value={project.solution} onChange={e => updateProjectField(project.id, 'solution', e.target.value)} className="w-full border border-slate-200 rounded-xl p-5 text-sm outline-none resize-none bg-blue-50/20" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-green-600">Impact & ROI</label>
                          <input type="text" value={project.impact} onChange={e => updateProjectField(project.id, 'impact', e.target.value)} className="w-full border-2 border-green-100 bg-green-50/10 rounded-xl p-5 font-black text-lg text-green-900 outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
              <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter">Compétences</h2>
                  <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Mise à jour en temps réel</p>
                </div>
                <button onClick={addSkill} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                  <Plus size={20} /> AJOUTER
                </button>
              </div>
              <div className="grid gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-blue-200 transition-all">
                    <input type="text" value={skill.name} onChange={e => updateSkillField(skill.id, 'name', e.target.value)} className="flex-1 border border-slate-100 bg-slate-50 rounded-xl px-6 py-4 font-black focus:bg-white focus:border-blue-500 outline-none transition-all" />
                    <select value={skill.category} onChange={e => updateSkillField(skill.id, 'category', e.target.value as SkillCategory)} className="border border-slate-100 bg-slate-50 rounded-xl px-4 py-4 font-bold text-slate-500 outline-none">
                      {Object.values(SkillCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={skill.level} onChange={e => updateSkillField(skill.id, 'level', e.target.value as SkillLevel)} className="border border-slate-100 bg-slate-50 rounded-xl px-4 py-4 font-black text-blue-600 outline-none">
                      {Object.values(SkillLevel).map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <button onClick={() => deleteSkill(skill.id)} className="p-4 text-red-200 hover:text-red-600 transition-colors"><Trash2 size={24} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
              <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter flex items-center gap-3">
                    <Wrench className="text-blue-600" size={40} />
                    Outils & Technologies
                  </h2>
                  <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Ajoutez vos logos pour un rendu professionnel</p>
                </div>
                <button onClick={addTool} className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                  <Plus size={20} /> NOUVEL OUTIL
                </button>
              </div>

              <div className="grid gap-6">
                {data.tools.map((tool) => (
                  <div key={tool.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-sm hover:shadow-xl transition-all relative group">
                    <button onClick={() => deleteTool(tool.id)} className="absolute top-6 right-6 p-3 text-red-200 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>

                    <div className="grid md:grid-cols-12 gap-6">
                      {/* Logo Upload Section */}
                      <div className="md:col-span-3 space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logo de l'outil</label>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-4 border-slate-200 shadow-inner relative group/logo">
                          {tool.logoUrl ? (
                            <img src={tool.logoUrl} className="w-full h-full object-contain p-4" alt={tool.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Wrench className="text-slate-300" size={48} />
                            </div>
                          )}
                          <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity cursor-pointer text-white font-bold text-xs">
                            <Upload size={24} className="mb-2" />
                            {tool.logoUrl ? 'CHANGER LE LOGO' : 'AJOUTER UN LOGO'}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleImageUpload(e.target.files[0], (b64) => updateToolField(tool.id, 'logoUrl', b64));
                                }
                              }}
                            />
                          </label>
                        </div>
                        {tool.logoUrl && (
                          <button
                            onClick={() => updateToolField(tool.id, 'logoUrl', '')}
                            className="w-full text-xs text-red-500 hover:text-red-700 font-bold py-2"
                          >
                            Supprimer le logo
                          </button>
                        )}
                      </div>

                      {/* Tool Information */}
                      <div className="md:col-span-9 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom de l'outil</label>
                            <input
                              type="text"
                              value={tool.name}
                              onChange={e => updateToolField(tool.id, 'name', e.target.value)}
                              className="w-full border-2 border-slate-200 bg-white rounded-xl px-5 py-4 font-black text-xl focus:border-blue-500 outline-none transition-all"
                              placeholder="Ex: Python, Figma, Docker..."
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</label>
                            <select
                              value={tool.category}
                              onChange={e => updateToolField(tool.id, 'category', e.target.value as ToolCategory)}
                              className="w-full border-2 border-slate-200 bg-white rounded-xl px-5 py-4 font-bold text-blue-600 outline-none appearance-none cursor-pointer hover:border-blue-300 transition-all"
                            >
                              {Object.values(ToolCategory).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description courte (optionnelle)</label>
                          <textarea
                            rows={2}
                            value={tool.description || ''}
                            onChange={e => updateToolField(tool.id, 'description', e.target.value)}
                            className="w-full border-2 border-slate-200 bg-slate-50 rounded-xl px-5 py-4 font-medium text-sm outline-none resize-none focus:bg-white focus:border-blue-500 transition-all"
                            placeholder="Ex: Langage de programmation pour l'IA et le data science..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.tools.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-violet-50 mb-4">
                    <Wrench className="text-blue-400" size={40} />
                  </div>
                  <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">Aucun outil</h3>
                  <p className="text-slate-400 mt-2">Cliquez sur "Nouvel Outil" pour commencer</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in pb-20">
              <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <User size={32} className="text-blue-600" /> Identité & Titres
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group/profile">
                  <div className="relative w-40 h-40 shrink-0">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-200">
                      <img src={data.profile.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <label className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/profile:opacity-100 transition-opacity cursor-pointer text-white font-bold text-xs">
                      <Upload size={24} className="mb-2" />
                      MODIFIER
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0], (b64) => updateProfileField('photoUrl', b64));
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom Complet</label>
                      <input type="text" value={data.profile.name} onChange={e => updateProfileField('name', e.target.value)} className="w-full border border-slate-200 bg-white rounded-xl p-4 font-black text-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Titre Professionnel</label>
                      <input type="text" value={data.profile.title} onChange={e => updateProfileField('title', e.target.value)} className="w-full border border-slate-200 bg-white rounded-xl p-4 font-black text-xl text-blue-600 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio / Introduction</label>
                  <textarea rows={4} value={data.profile.bio} onChange={e => updateProfileField('bio', e.target.value)} className="w-full border border-slate-200 rounded-xl p-5 font-medium outline-none" />
                </div>
              </section>

              {/* SECTION SOCIAL LINKS */}
              <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <Globe size={32} className="text-blue-600" /> Liens Sociaux & Contact
                </h2>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={12} /> Email de contact
                    </label>
                    <input type="email" value={data.profile.email} onChange={e => updateProfileField('email', e.target.value)} className="w-full border border-slate-200 rounded-xl p-4 font-bold outline-none focus:border-blue-500" placeholder="votre@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Linkedin size={12} /> URL LinkedIn
                    </label>
                    <input type="url" value={data.profile.linkedin} onChange={e => updateProfileField('linkedin', e.target.value)} className="w-full border border-slate-200 rounded-xl p-4 font-bold outline-none focus:border-blue-500" placeholder="https://linkedin.com/..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Github size={12} /> URL GitHub
                    </label>
                    <input type="url" value={data.profile.github} onChange={e => updateProfileField('github', e.target.value)} className="w-full border border-slate-200 rounded-xl p-4 font-bold outline-none focus:border-blue-500" placeholder="https://github.com/..." />
                  </div>
                </div>
              </section>

              <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <Sparkles size={32} className="text-blue-600" /> Hero Tags (Chiffres clés)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.profile.heroTags.map((tag, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                      <input type="text" value={tag.label} onChange={e => updateHeroTag(i, 'label', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-black uppercase tracking-widest" />
                      <input type="text" value={tag.value} onChange={e => updateHeroTag(i, 'value', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in pb-20">
              <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <Info size={32} className="text-blue-600" /> Philosophie Métier
                </h2>
                <textarea rows={6} value={data.profile.approach} onChange={e => updateProfileField('approach', e.target.value)} className="w-full border border-slate-200 rounded-xl p-6 font-medium italic text-slate-700 outline-none" />
              </section>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-4xl mx-auto animate-in fade-in">
              <h2 className="text-4xl font-black tracking-tighter mb-10">Messages Reçus</h2>
              {messages.length === 0 ? (
                <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 font-black uppercase tracking-widest">Aucun message</div>
              ) : (
                <div className="space-y-6">
                  {messages.map((m) => (
                    <div key={m.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                      <div className="flex justify-between mb-6">
                        <h3 className="font-black text-2xl">{m.name}</h3>
                        <span className="text-xs text-slate-400 font-bold">{m.date}</span>
                      </div>
                      <p className="bg-slate-50 p-8 rounded-2xl italic">"{m.message}"</p>
                      <a href={`mailto:${m.email}`} className="mt-6 inline-block text-blue-600 font-bold hover:underline">{m.email}</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
