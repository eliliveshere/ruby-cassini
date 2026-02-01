'use client';

import { Zap, TrendingUp, Lightbulb, BarChart, Tag, ArrowUp, ArrowDown, Activity, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

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
        <div className="max-w-[1600px] mx-auto p-8 lg:p-12 animate-in fade-in duration-700 space-y-8">
            <header className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">Morning Briefing</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Daily insights and trends tailored for your channel.</p>
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </header>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Predicted Views" value="45.2K" diff="+12%" icon={Activity} />
                <StatCard label="Subscriber Growth" value="+185" diff="+5%" icon={TrendingUp} />
                <StatCard label="Avg. Retention" value="42%" diff="-2%" icon={BarChart} negative />
                <StatCard label="Comment Velocity" value="12/hr" diff="+8%" icon={MessageSquare} />
            </div>

            {/* Trending Topics Expanded */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="bg-yellow-500/10 text-yellow-400 p-1.5 rounded-lg">
                            <Zap className="h-4 w-4" />
                        </span>
                        Trending Topics
                    </h2>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300">View All Trends</button>
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
