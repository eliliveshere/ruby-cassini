import { Zap, TrendingUp, Lightbulb } from 'lucide-react';

export const MOCK_TRENDS = [
    {
        topic: "AI Agents in 2024",
        relevance: "High",
        reason: "Matches your tech/coding niche. +200% search volume this week.",
        type: "Tech",
        icon: TrendingUp
    },
    {
        topic: "Cursor vs VS Code",
        relevance: "Medium",
        reason: "Audience asking for comparison in 3 recent videos.",
        type: "Tools",
        icon: Zap
    },
    {
        topic: "Minimal Desk Setup",
        relevance: "Low",
        reason: "Good evergreen content for Q1 refresh.",
        type: "Lifestyle",
        icon: Lightbulb
    }
];

export default function MorningBrief() {
    return (
        <section className="mb-8 animate-in slide-in-from-top-4 duration-500">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="bg-yellow-500/10 text-yellow-400 p-1.5 rounded-lg">
                    <Zap className="h-4 w-4" />
                </span>
                Morning Briefing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_TRENDS.map((trend, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:bg-zinc-900 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                                {trend.type}
                            </span>
                            {/* <trend.icon className="h-4 w-4 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" /> */}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                            {trend.topic}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            {trend.reason}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            <Lightbulb className="h-3 w-3" />
                            Generate Content Script
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
