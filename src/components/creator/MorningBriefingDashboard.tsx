'use client';

import { Zap, TrendingUp, Lightbulb, BarChart, Tag, ArrowUp, ArrowDown, Activity, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

export const MOCK_TRENDS = [
    {
        topic: "AI Agents in 2024",
        relevance: "High",
        reason: "Matches your tech/coding niche. +200% search volume this week.",
        type: "Tech",
        volume: "125K",
        trend: "up"
    },
    {
        topic: "Cursor vs VS Code",
        relevance: "Medium",
        reason: "Audience asking for comparison in 3 recent videos.",
        type: "Tools",
        volume: "85K",
        trend: "up"
    },
    {
        topic: "Minimal Desk Setup",
        relevance: "Low",
        reason: "Good evergreen content for Q1 refresh.",
        type: "Lifestyle",
        volume: "300K",
        trend: "stable"
    },
    {
        topic: "Next.js 14 vs 15",
        relevance: "High",
        reason: "Breaking changes discussion trending on X.",
        type: "Tech",
        volume: "45K",
        trend: "up"
    },
    {
        topic: "Mechanical Keyboards",
        relevance: "Low",
        reason: "Consistent volume, good for affiliate revenue.",
        type: "Tech",
        volume: "2.1M",
        trend: "down"
    }
];

export default function MorningBriefingDashboard() {
    const creatorProfile = useStore((state) => state.creatorProfile);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto p-4 pb-32 lg:p-12 animate-in fade-in duration-700 space-y-8">
            <header className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">Morning Briefing</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Daily insights and trends tailored for your channel.</p>
                </div>
                {/* Theme toggle is hidden on mobile, but if we add more controls they should stack */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="hidden md:block p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <StatCard label="Videos" value="45.2K" diff="+12%" icon={Activity} />
                <StatCard label="Subs" value="+185" diff="+5%" icon={TrendingUp} />
                <StatCard label="Retention" value="42%" diff="-2%" icon={BarChart} negative />
                <StatCard label="Velocity" value="12/hr" diff="+8%" icon={MessageSquare} />
            </div>

            {/* 1. Feedback -> Idea Loop */}
            <section>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg">
                            <Lightbulb className="h-4 w-4" />
                        </span>
                        What to Make Today
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Idea 1 */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-zinc-900 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded">High Confidence</span>
                            {creatorProfile?.niche && (
                                <span className="text-[10px] text-zinc-400" title={`Matches your ${creatorProfile.niche} niche`}>Why?</span>
                            )}
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">"Is Cursor the End of VS Code?"</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Your "{creatorProfile?.niche || 'Tech'}" cluster has 2x higher velocity than average. Viewers stopped scrolling at "VS Code" in last week's hook.
                        </p>
                        <div className="flex items-center gap-2 pt-3 border-t border-indigo-100 dark:border-indigo-500/10">
                            <span className="text-[10px] text-zinc-500">Based on:</span>
                            <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">Last 2 Videos</span>
                        </div>
                    </div>

                    {/* Idea 2 */}
                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Trending Format</span>
                            {creatorProfile?.formats?.[0] && (
                                <span className="text-[10px] text-zinc-400" title={`Matches your interest in ${creatorProfile.formats[0]}s`}>Why?</span>
                            )}
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">"Day in the Life: {creatorProfile?.niche || 'Senior'} Expert"</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            {creatorProfile?.contentTypes?.includes('vlog') ? 'Vlog' : 'Lifestyle'} videos are seeing +45% retention uptick on weekends. Your audience is asking for "Routine" content.
                        </p>
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                            <span className="text-[10px] text-zinc-500">Based on:</span>
                            <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">Comment Sentiment</span>
                        </div>
                    </div>

                    {/* Idea 3 */}
                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">Gap Fill</span>
                            {creatorProfile?.primaryGoal && (
                                <span className="text-[10px] text-zinc-400" title={`Helps your goal of ${creatorProfile.primaryGoal}`}>Why?</span>
                            )}
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">"{creatorProfile?.niche || 'React'} 19: Everything Changed"</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            You haven't covered {creatorProfile?.niche || 'React'} core updates in 45 days. Competitors are gaining rank on this keyword.
                        </p>
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                            <span className="text-[10px] text-zinc-500">Based on:</span>
                            <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">Gap Analysis</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Production Intelligence (Bottlenecks) */}
            <section>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="bg-red-500/10 text-red-500 p-1.5 rounded-lg">
                        <Activity className="h-4 w-4" />
                    </span>
                    Production Intelligence
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4 flex items-start gap-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg text-red-600 dark:text-red-400">
                            <Zap className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">Editor Idle for 48h</h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">"My Coding Setup 2024" has been in Editing with no activity. Poke editor?</p>
                            <button className="mt-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">Send Reminder →</button>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4 flex items-start gap-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
                            <Lightbulb className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">Production Gap Detected</h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">You have nothing scheduled for next Tuesday. Script "Next.js 15 Tutorial" today to be on time.</p>
                            <button className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">Open Script →</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Topics Expanded */}
            <section>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 p-1.5 rounded-lg">
                            <TrendingUp className="h-4 w-4" />
                        </span>
                        Market Trends
                    </h2>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 w-full md:w-auto text-left md:text-right">View All Trends</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_TRENDS.map((trend, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group flex flex-col h-full shadow-sm dark:shadow-none">
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                                    {trend.type}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                                        <BarChart className="h-3 w-3" />
                                        {trend.volume}
                                    </div>
                                    {trend.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                                    {trend.trend === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
                                    {trend.trend === 'stable' && <div className="h-0.5 w-2 bg-zinc-600" />}
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                                {trend.topic}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                                {trend.reason}
                            </p>

                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tag className="h-3 w-3 text-zinc-400 dark:text-zinc-600" />
                                    <span className="text-xs text-zinc-500">{trend.relevance} Relevance</span>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-medium text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Lightbulb className="h-3 w-3" />
                                    Generate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function StatCard({ label, value, diff, icon: Icon, negative }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
                <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            </div>
            <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</span>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${negative ? 'text-red-400 bg-red-900/20' : 'text-emerald-400 bg-emerald-900/20'}`}>
                    {diff}
                </span>
            </div>
        </div>
    );
}
import { MessageSquare } from 'lucide-react';
