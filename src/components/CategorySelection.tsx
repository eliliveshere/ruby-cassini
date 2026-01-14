'use client';

import { ServiceCategory } from '@/types';
import { CATEGORY_DESCRIPTIONS } from '@/constants/services';
import { Video, Target, Instagram, Zap, Globe, Rocket, ArrowRight } from 'lucide-react';

interface CategorySelectionProps {
    onSelect: (category: ServiceCategory) => void;
}

const ICONS: Record<ServiceCategory, any> = {
    'Video & Production': Video,
    'Paid Growth': Target,
    'Social & Content': Instagram,
    'Strategy & Planning': Zap,
    'Conversion & Funnels': Globe,
    'Launch Support': Rocket
};

export default function CategorySelection({ onSelect }: CategorySelectionProps) {
    const categories = Object.keys(CATEGORY_DESCRIPTIONS) as ServiceCategory[];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
                const Icon = ICONS[cat];
                return (
                    <button
                        key={cat}
                        onClick={() => onSelect(cat)}
                        className="group relative flex flex-col p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-indigo-500/50 transition-all text-left overflow-hidden"
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex items-start justify-between w-full mb-6">
                            <div className="h-14 w-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-500/30 transition-all shadow-lg">
                                <Icon className="h-7 w-7 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                <ArrowRight className="h-5 w-5 text-indigo-500" />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-100 transition-colors">
                                {cat}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300">
                                {CATEGORY_DESCRIPTIONS[cat]}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
