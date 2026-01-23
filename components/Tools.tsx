import React from 'react';
import { Tool, ToolCategory } from '../types';
import { Wrench, Sparkles } from 'lucide-react';

interface ToolsProps {
    tools: Tool[];
}

const Tools: React.FC<ToolsProps> = ({ tools }) => {
    // Grouper les outils par catégorie
    const groupedTools = tools.reduce((acc, tool) => {
        const category = tool.category || ToolCategory.OTHER;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tool);
        return acc;
    }, {} as Record<string, Tool[]>);

    // Couleurs de catégories pour un design moderne
    const getCategoryColor = (category: string) => {
        const colors: Record<string, { accent: string; bg: string; border: string }> = {
            [ToolCategory.AI_ML]: { accent: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200' },
            [ToolCategory.AUTOMATION]: { accent: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', border: 'border-blue-200' },
            [ToolCategory.DATA]: { accent: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
            [ToolCategory.DESIGN]: { accent: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', border: 'border-pink-200' },
            [ToolCategory.PROJECT_MGMT]: { accent: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-200' },
            [ToolCategory.DEV]: { accent: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
            [ToolCategory.OTHER]: { accent: 'from-slate-500 to-gray-600', bg: 'bg-slate-50', border: 'border-slate-200' },
        };
        return colors[category] || colors[ToolCategory.OTHER];
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            {/* Header Section */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-violet-50 px-6 py-3 rounded-full mb-6 border border-blue-100">
                    <Wrench className="text-blue-600" size={24} />
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                        Outils &amp; Technologies
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent mb-6">
                    Ma Boîte à Outils
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Les technologies et outils que je maîtrise pour donner vie aux projets
                </p>
            </div>

            {/* Tools Grid */}
            <div className="space-y-16">
                {Object.entries(groupedTools).map(([category, categoryTools]) => {
                    const categoryStyle = getCategoryColor(category);
                    return (
                        <div key={category} className="relative">
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br ${categoryStyle.accent} flex items-center justify-center shadow-lg`}>
                                    <Sparkles className="text-white" size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-slate-800">
                                        {category}
                                    </h3>
                                    <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${categoryStyle.accent} mt-2`}></div>
                                </div>
                                <span className="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                                    {categoryTools.length} outil{categoryTools.length > 1 ? 's' : ''}
                                </span>
                            </div>

                            {/* Tools Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {categoryTools.map((tool) => (
                                    <div
                                        key={tool.id}
                                        className={`group relative bg-white rounded-3xl p-6 shadow-sm border ${categoryStyle.border} hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center overflow-hidden`}
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                                        {/* Logo */}
                                        {tool.logoUrl ? (
                                            <div className="relative w-20 h-20 mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                                                <img
                                                    src={tool.logoUrl}
                                                    alt={tool.name}
                                                    className="max-w-full max-h-full object-contain p-2"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`relative w-20 h-20 mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${categoryStyle.accent} group-hover:scale-110 transition-all duration-300`}>
                                                <Wrench className="text-white" size={32} />
                                            </div>
                                        )}

                                        {/* Tool Name */}
                                        <h4 className="font-bold text-slate-900 mb-2 relative z-10 group-hover:text-blue-600 transition-colors">
                                            {tool.name}
                                        </h4>

                                        {/* Description */}
                                        {tool.description && (
                                            <p className="text-xs text-slate-500 line-clamp-2 relative z-10">
                                                {tool.description}
                                            </p>
                                        )}

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 group-hover:left-full transition-all duration-700"></div>
                                        </div>
                                    </div>
                                ))}
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
