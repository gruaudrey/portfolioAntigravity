
import React from 'react';
import { Target, Cpu, Globe, Rocket, Terminal } from 'lucide-react';
import { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  const iconMap: any = {
    0: <Cpu className="text-violet-600" size={24} />,
    1: <Target className="text-slate-500" size={24} />,
    2: <Terminal className="text-slate-700" size={24} />,
    3: <Globe className="text-violet-400" size={24} />
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative dot background element */}
      <div className="absolute -left-20 top-0 w-64 h-64 bg-dot-pattern opacity-40 -z-10"></div>

      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Vision & <span className="text-gradient-primary">Approche</span></h2>
        <div className="w-16 h-2 bg-slate-900 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="p-8 md:p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 text-slate-200">
               <Rocket size={120} />
            </div>
            <p className="text-xl text-slate-600 leading-relaxed font-medium relative z-10">
              {profile.bio}
            </p>
          </div>
          <div className="p-8 md:p-10 bg-violet-50/50 rounded-[3rem] border border-violet-100/30">
            <p className="text-lg text-violet-900 leading-relaxed italic font-semibold">
              "{profile.approach}"
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1 transition-all flex flex-col gap-4"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
                {iconMap[index] || <Rocket className="text-violet-600" size={24} />}
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
