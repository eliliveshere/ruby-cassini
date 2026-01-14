
'use client';

import { useStore } from '@/store/useStore';
import { Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function NextStepButton() {
    const [isOpen, setIsOpen] = useState(false);
    const projects = useStore((state) => state.projects);
    const workCards = useStore((state) => state.workCards);

    // Mock AI Logic based on state
    const recommendations = [];

    const activeProjects = projects.filter(p => p.status === 'active');
    const pendingReviewCards = workCards.filter(c => c.status === 'review');

    if (pendingReviewCards.length > 0) {
        recommendations.push({
            id: 'rec-1',
            text: `Review and approve "${pendingReviewCards[0].title}" to keep production moving.`,
            type: 'approval',
            priority: 'high'
        });
    }

    if (activeProjects.length > 0 && recommendations.length < 3) {
        recommendations.push({
            id: 'rec-2',
            text: 'Traffic is steady on "Q1 Growth Scaling". Consider enabling Retargeting to capture leads.',
            type: 'strategy',
            priority: 'medium'
        });
    }

    if (recommendations.length === 0) {
        recommendations.push({
            id: 'rec-default',
            text: 'Everything is on track. No immediate actions required.',
            type: 'info',
            priority: 'low'
        });
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95 font-medium"
            >
                <Lightbulb className="h-4 w-4" />
                What should we do next?
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-3 w-80 z-50 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-4 bg-zinc-950/50 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                AI Recommendations
                            </h3>
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                            {recommendations.map(rec => (
                                <div key={rec.id} className="p-4 hover:bg-zinc-800/30 transition-colors">
                                    <p className="text-sm text-zinc-300 mb-2 leading-relaxed">
                                        {rec.text}
                                    </p>
                                    {rec.type !== 'info' && (
                                        <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group">
                                            Action this
                                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-zinc-950/30 text-center border-t border-zinc-800">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Based on your project state</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
