import React from 'react';
import { Wrench } from 'lucide-react';
import { Tool } from '../types';

interface ToolsMarqueeProps {
  tools: Tool[];
}

const MIN_ITEMS = 12; // assez de photogrammes pour remplir un grand écran sans trou
const FRAME_WIDTH = 160; // doit rester un multiple de la largeur d'une perforation (40 px)

const scrollToTools = () => {
  const el = document.getElementById('tools');
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
};

/** Un photogramme de la pellicule = un outil. */
const Frame: React.FC<{ tool: Tool; number: number; hidden?: boolean }> = ({ tool, number, hidden }) => (
  <button
    type="button"
    onClick={scrollToTools}
    tabIndex={hidden ? -1 : 0}
    aria-hidden={hidden ? true : undefined}
    title={tool.name}
    style={{ width: FRAME_WIDTH }}
    className={`${hidden ? 'film-dup ' : ''}film-frame group shrink-0 h-28 p-2 box-border`}
  >
    <span className="relative flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-[3px] bg-stone-200 px-2 shadow-inner ring-1 ring-black/60 transition-colors duration-500 group-hover:bg-stone-50">
      <span className="absolute left-1.5 top-1 font-mono text-[9px] tracking-widest text-stone-500">
        {String(number).padStart(2, '0')}
      </span>
      {tool.logoUrl ? (
        <img
          src={tool.logoUrl}
          alt=""
          className="film-logo h-10 w-full object-contain"
        />
      ) : (
        <Wrench size={26} className="text-stone-500" />
      )}
      <span className="max-w-full truncate font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-stone-700">
        {tool.name}
      </span>
    </span>
  </button>
);

/**
 * Bande défilante des outils, sous l'accueil, en pellicule de film noir et blanc.
 * Alimentée par la section "Outils" de l'admin. Pause au survol ;
 * fixe si l'utilisateur demande de réduire les animations.
 */
const ToolsMarquee: React.FC<ToolsMarqueeProps> = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  // Répéter la liste jusqu'à avoir assez de photogrammes, puis la doubler pour une boucle sans coupure
  const repeats = Math.max(1, Math.ceil(MIN_ITEMS / tools.length));
  const base: Tool[] = Array.from({ length: repeats }, () => tools).flat();
  const duration = Math.max(24, base.length * 3);

  const holeTile =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24'%3E%3Crect x='11' y='6' width='18' height='12' rx='3' fill='%23e7e5e4'/%3E%3C/svg%3E\")";
  const grainTile =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")";

  return (
    <section aria-label="Outils et technologies" className="bg-white py-10">
      <style>{`
        @keyframes film-roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes film-grain { 0% { background-position: 0 0; } 20% { background-position: -37px 21px; } 40% { background-position: 53px -33px; } 60% { background-position: -71px -12px; } 80% { background-position: 19px 64px; } 100% { background-position: 0 0; } }
        @keyframes film-flicker { 0%, 100% { opacity: 1; } 45% { opacity: .96; } 50% { opacity: .9; } 55% { opacity: .97; } }
        .film-track { animation: film-roll ${duration}s linear infinite; width: max-content; }
        .film-wrap:hover .film-track { animation-play-state: paused; }
        .film-grain { animation: film-grain .6s steps(1) infinite; }
        .film-flicker { animation: film-flicker 1.4s steps(1) infinite; }
        .film-logo { filter: grayscale(1) contrast(1.15); mix-blend-mode: multiply; transition: filter .5s ease, transform .5s ease; }
        .film-frame:hover .film-logo { filter: grayscale(0) contrast(1); mix-blend-mode: normal; transform: scale(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .film-track { animation: none; width: auto; flex-wrap: wrap; justify-content: center; }
          .film-dup { display: none; }
          .film-grain, .film-flicker { animation: none; }
        }
      `}</style>

      <p className="mb-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400">
        ▶ Outils &amp; technologies
      </p>

      <div className="film-wrap film-flicker relative overflow-hidden bg-neutral-950 shadow-2xl shadow-black/20">
        <div className="film-track relative flex items-center py-6">
          {/* Perforations haut et bas : elles défilent avec la pellicule */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-6"
            style={{ backgroundImage: holeTile, backgroundRepeat: 'repeat-x' }}
          ></div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-6"
            style={{ backgroundImage: holeTile, backgroundRepeat: 'repeat-x' }}
          ></div>

          {base.map((tool, i) => (
            <Frame key={`a-${tool.id}-${i}`} tool={tool} number={(i % tools.length) + 1} />
          ))}
          {base.map((tool, i) => (
            <Frame key={`b-${tool.id}-${i}`} tool={tool} number={(i % tools.length) + 1} hidden />
          ))}
        </div>

        {/* Grain de pellicule */}
        <div
          aria-hidden="true"
          className="film-grain pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{ backgroundImage: grainTile }}
        ></div>
        {/* Vignettage : les bords s'assombrissent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0) 14%, rgba(10,10,10,0) 86%, #0a0a0a 100%)',
          }}
        ></div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
