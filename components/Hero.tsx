
import React from 'react';
import { ArrowRight, Sparkles, Linkedin, Github, Mail, Binary, Cpu, Network } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-44 pb-28 overflow-hidden bg-mesh">
      {/* Background Motifs */}
      <div className="absolute inset-0 bg-neural-grid opacity-[0.5] pointer-events-none"></div>
      
      {/* Localized digital glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-50/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      {/* Floating high-tech icons in lilac and gray */}
      <div className="absolute top-60 left-[15%] text-violet-200/40 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
        <Network size={80} strokeWidth={1} />
      </div>
      <div className="absolute top-40 right-[15%] text-slate-200/60 hidden lg:block animate-bounce" style={{ animationDuration: '6s' }}>
        <Cpu size={100} strokeWidth={1} />
      </div>
      <div className="absolute bottom-40 right-[10%] text-slate-100 hidden lg:block opacity-40">
        <Binary size={120} strokeWidth={1} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        
        {/* Profile Avatar */}
        <div className="mb-10 relative group">
          <div className="absolute inset-0 bg-gradient-primary rounded-[2.5rem] rotate-12 scale-105 opacity-10 group-hover:rotate-45 transition-all duration-1000"></div>
          
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] bg-white p-2 shadow-2xl border border-violet-50 relative z-10">
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-50">
              <img 
                src={profile.photoUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-violet-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
              <Sparkles size={16} />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur shadow-sm text-violet-600 font-bold text-[11px] uppercase tracking-[0.2em] mb-8 border border-slate-100">
          <span>Expertise IA & Stratégie Digitale</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter leading-[1] relative">
          <span className="relative z-10">{profile.name.split(' ')[0]}</span>
          <br className="md:hidden" />
          <span className="text-gradient-primary relative z-10 ml-0 md:ml-4">{profile.name.split(' ')[1]}</span>
          <div className="absolute -bottom-2 left-0 right-0 h-4 bg-slate-50 -z-10 rounded-full blur-sm opacity-50"></div>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          {profile.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group"
          >
            Explorer mes projets
            <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
             <a href={profile.linkedin} target="_blank" className="p-4 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all">
               <Linkedin size={20} />
             </a>
             <a href={profile.github} target="_blank" className="p-4 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
               <Github size={20} />
             </a>
             <button onClick={() => scrollToSection('contact')} className="p-4 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
               <Mail size={20} />
             </button>
          </div>
        </div>

        {/* Dynamic Stats/Tags */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
           {profile.heroTags?.map((tag, idx) => (
             <div key={idx} className="bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-7 border border-white/80 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:border-violet-100 hover:-translate-y-1 transition-all flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{tag.label}</span>
                <span className="text-slate-900 font-black text-base tracking-tight">{tag.value}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
