import React from 'react';
import { Bot, Target, Wand2, Trophy } from 'lucide-react';
import { Assistant } from '../types';

interface AssistantsProps {
  assistants: Assistant[];
}

const splitTools = (text?: string) =>
  (text || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

/** Une ligne "étiquette + texte" de la carte. */
const Row: React.FC<{ icon: React.ReactNode; label: string; text: string }> = ({ icon, label, text }) => (
  <div className="flex gap-3">
    <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">{icon}</div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-1">{label}</div>
      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

/**
 * Section "Mes assistants IA sur mesure". Alimentée depuis l'admin (onglet Assistants).
 * Les champs vides ne sont pas affichés ; la section n'apparaît que s'il y a au moins un assistant.
 */
const Assistants: React.FC<AssistantsProps> = ({ assistants }) => {
  if (!assistants || assistants.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-50 to-purple-50 px-5 py-2.5 rounded-full mb-6 border border-violet-100">
          <Bot className="text-violet-600" size={20} />
          <span className="text-violet-600 font-bold uppercase tracking-wider text-xs">Assistants Claude</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Mes assistants IA sur mesure</h2>
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
          Des assistants spécialisés que j'ai conçus pour automatiser des tâches métier précises, avec une méthode claire et des résultats vérifiables.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {assistants.map((a, i) => {
          const tools = splitTools(a.tools);
          return (
            <article
              key={a.id}
              className="group flex flex-col rounded-[2rem] p-[2px] hover:-translate-y-2 transition-all duration-500 shadow-[0_14px_28px_-14px_rgba(40,25,80,0.3),0_4px_8px_-4px_rgba(0,0,0,0.18)] hover:shadow-[0_28px_48px_-16px_rgba(80,40,160,0.42),0_8px_14px_-6px_rgba(0,0,0,0.22)]"
              style={{ background: 'linear-gradient(135deg, #25252a 0%, #8a84a6 50%, #34343b 100%)' }}
            >
              <div className="flex flex-1 flex-col bg-white rounded-[calc(2rem-2px)] overflow-hidden">
                {/* En-tête sombre : numéro, nom, badge */}
                <div className="relative px-7 pt-6 pb-7 text-white" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #2a2540 60%, #4c3a8a 130%)' }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-violet-200/80">
                      ASSISTANT {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center">
                      <Bot size={20} className="text-violet-200" />
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight leading-tight">{a.name}</h3>
                  {a.badge && (
                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest text-violet-100">
                      {a.badge}
                    </span>
                  )}
                </div>

                {/* Capture d'écran facultative */}
                {a.imageUrl && (
                  <div className="aspect-video overflow-hidden bg-slate-50 border-b border-slate-100">
                    <img src={a.imageUrl} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1 p-7 space-y-5">
                  {a.problem && <Row icon={<Target size={16} />} label="Le problème" text={a.problem} />}
                  {a.description && <Row icon={<Wand2 size={16} />} label="Ce qu'il fait" text={a.description} />}
                  {a.result && (
                    <div className="flex gap-3 bg-violet-50/70 border border-violet-100/60 rounded-2xl p-4">
                      <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                        <Trophy size={16} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-600 mb-1">Résultat</div>
                        <p className="text-violet-900 text-sm font-bold leading-relaxed">{a.result}</p>
                      </div>
                    </div>
                  )}
                </div>

                {tools.length > 0 && (
                  <div className="px-7 pb-7 flex flex-wrap gap-2">
                    {tools.map((t, k) => (
                      <span key={k} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Assistants;
