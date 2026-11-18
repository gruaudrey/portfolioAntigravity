import React, { useMemo, useState } from 'react';
import { Tool, ToolCategory } from '../types';
import { Wrench } from 'lucide-react';

interface ToolsProps {
    tools: Tool[];
}

const ALL = 'all';

// Couleurs de catégories pour un design moderne
const getCategoryColor = (category: string) => {
    const colors: Record<string, { accent: string; border: string; dot: string }> = {
        [ToolCategory.AI_ML]: { accent: 'from-violet-500 to-purple-600', border: 'border-violet-200', dot: 'bg-violet-500' },
        [ToolCategory.AUTOMATION]: { accent: 'from-blue-500 to-cyan-600', border: 'border-blue-200', dot: 'bg-blue-500' },
        [ToolCategory.DATA]: { accent: 'from-emerald-500 to-teal-600', border: 'border-emerald-200', dot: 'bg-emerald-500' },
        [ToolCategory.DESIGN]: { accent: 'from-pink-500 to-rose-600', border: 'border-pink-200', dot: 'bg-pink-500' },
        [ToolCategory.PROJECT_MGMT]: { accent: 'from-amber-500 to-orange-600', border: 'border-amber-200', dot: 'bg-amber-500' },
        [ToolCategory.DEV]: { accent: 'from-indigo-500 to-blue-600', border: 'border-indigo-200', dot: 'bg-indigo-500' },
        [ToolCategory.OTHER]: { accent: 'from-slate-500 to-gray-600', border: 'border-slate-200', dot: 'bg-slate-500' },
    };
    return colors[category] || colors[ToolCategory.OTHER];
};

const Tools: React.FC<ToolsProps> = ({ tools }) => {
    const [active, setActive] = useState<string>(ALL);

    // Catégories réellement utilisées, dans l'ordre de l'énumération (les autres à la suite)
    const categories = useMemo(() => {
        const used = new Set(tools.map((t) => t.category || ToolCategory.OTHER));
        const ordered = (Object.values(ToolCategory) as string[]).filter((c) => used.has(c as ToolCategory));
        const extra = [...used].filter((c) => !ordered.includes(c as string)) as string[];
        return [...ordered, ...extra];
    }, [tools]);

    const countOf = (category: string) => tools.filter((t) => (t.category || ToolCategory.OTHER) === category).length;

    // Si la catégorie choisie n'existe plus (outil supprimé dans l'admin), on revient à "Tous"
    const current = active === ALL || categories.includes(active) ? active : ALL;
    const visibleTools = current === ALL ? tools : tools.filter((t) => (t.category || ToolCategory.OTHER) === current);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <style>{`
                @keyframes tools-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
                .tools-grid-anim > * { animation: tools-fade-in .45s ease-out both; }
                @media (prefers-reduced-motion: reduce) { .tools-grid-anim > * { animation: none; } }
            `}</style>

            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-3 rounded-full mb-6 border border-violet-100">
                    <Wrench className="text-violet-600" size={24} />
                    <span className="text-violet-600 font-bold uppercase tracking-wider text-sm">
                        Outils &amp; Technologies
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent mb-6">
                    Ma Boîte à Outils
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto rounded-full shadow-lg mb-6"></div>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Les technologies et outils que je maîtrise pour donner vie aux projets
                </p>
                {tools.length > 0 && (
                    <p className="mt-4 text-sm font-bold text-slate-400">
                        {tools.length} outil{tools.length > 1 ? 's' : ''}
                    </p>
                )}
            </div>

            {/* Filtres par catégorie */}
            {categories.length > 1 && (
                <div
                    role="tablist"
                    aria-label="Filtrer les outils par catégorie"
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {[ALL, ...categories].map((cat) => {
                        const isActive = current === cat;
                        const label = cat === ALL ? 'Tous' : cat;
                        const count = cat === ALL ? tools.length : countOf(cat);
                        return (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActive(cat)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                                    isActive
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-violet-500/20'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700'
                                }`}
                            >
                                {cat !== ALL && <span className={`h-2 w-2 rounded-full ${getCategoryColor(cat).dot}`}></span>}
                                {label}
                                <span className={`text-xs ${isActive ? 'text-violet-200' : 'text-slate-400'}`}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Tools Grid (2 colonnes sur mobile) */}
            <div
                key={current}
                className="tools-grid-anim grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6"
            >
                {visibleTools.map((tool, i) => {
                    const style = getCategoryColor(tool.category || ToolCategory.OTHER);
                    return (
                        <div
                            key={tool.id}
                            style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
                            className={`group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-sm border ${style.border} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center overflow-hidden`}
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${style.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                            {/* Logo */}
                            {tool.logoUrl ? (
                                <div className="relative w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 group-hover:scale-110 transition-all duration-300 shadow-inner">
                                    <img
                                        src={tool.logoUrl}
                                        alt={tool.name}
                                        className="max-w-full max-h-full object-contain p-1.5 sm:p-2"
                                    />
                                </div>
                            ) : (
                                <div className={`relative w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${style.accent} group-hover:scale-110 transition-all duration-300`}>
                                    <Wrench className="text-white" size={28} />
                                </div>
                            )}

                            {/* Tool Name */}
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1 sm:mb-2 relative z-10 group-hover:text-violet-700 transition-colors leading-tight">
                                {tool.name}
                            </h4>

                            {/* Description */}
                            {tool.description && (
                                <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 relative z-10">
                                    {tool.description}
                                </p>
                            )}

                            {/* Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 group-hover:left-full transition-all duration-700"></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {tools.length === 0 && (
                <div className="text-center py-32">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 mb-6">
                        <Wrench className="text-slate-400" size={64} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-400 mb-2">
                        Aucun outil configuré
                    </h3>
                    <p className="text-slate-400">
                        Ajoutez vos premiers outils depuis le panneau d'administration
                    </p>
                </div>
            )}
        </div>
    );
};

export default Tools;
