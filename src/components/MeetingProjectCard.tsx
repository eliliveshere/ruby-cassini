import { Campaign, Project } from '@/types';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, Target, Calendar } from 'lucide-react';

interface MeetingProjectCardProps {
    project: Project;
    campaigns: Campaign[];
}

export default function MeetingProjectCard({ project, campaigns }: MeetingProjectCardProps) {
    // Aggregate metrics
    const totalSpend = campaigns.reduce((acc, c) => acc + (c.metrics?.spend || 0), 0);
    const totalImpressions = campaigns.reduce((acc, c) => acc + (c.metrics?.impressions || 0), 0);
    const totalClicks = campaigns.reduce((acc, c) => acc + (c.metrics?.clicks || 0), 0);
    const avgRoas = campaigns.length > 0
        ? campaigns.reduce((acc, c) => acc + (c.metrics?.roas || 0), 0) / campaigns.length
        : 0;

    // Find latest summary
    const latestSummary = campaigns.find(c => c.aiSummary)?.aiSummary || "No active campaign analysis available currently. Please generate a summary from the dashboard.";

    return (
        <div className="flex h-full w-full min-w-[85vw] snap-center flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl lg:flex-row">

            {/* LEFT SIDE: Context & Summary */}
            <div className="flex flex-1 flex-col justify-between p-8 lg:p-12 lg:border-r border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`h-4 w-4 rounded-full ${project.status === 'Active' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]' : 'bg-zinc-500'}`} />
                        <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest">{project.status} Project</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{project.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.channels.map(channel => (
                            <span key={channel} className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-sm text-zinc-300">
                                {channel}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                                <Target className="h-4 w-4" /> Core Objective
                            </h3>
                            <p className="text-xl text-zinc-100 font-light leading-relaxed">
                                {project.goal}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-zinc-800/30 p-6 border border-zinc-700/50">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Executive Summary</h3>
                            <p className="text-lg text-zinc-300 leading-relaxed font-light">
                                {latestSummary}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center justify-between text-zinc-500 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Campaign Cycle: Q1 2024</span>
                    </div>
                    <div className="font-mono">ID: {project.id.split('-').slice(1).join('-')}</div>
                </div>
            </div>

            {/* RIGHT SIDE: Stats & Data */}
            <div className="flex-1 p-8 lg:p-12 bg-zinc-950/50">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-8">Performance Metrics</h3>

                <div className="grid grid-cols-2 gap-6">
                    {/* Metric Cards */}
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                            <DollarSign className="h-4 w-4 text-indigo-500" /> Total Spend
                        </div>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            ${totalSpend.toLocaleString()}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                            <Users className="h-4 w-4 text-purple-500" /> Impressions
                        </div>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            {(totalImpressions / 1000).toFixed(1)}k
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" /> Avg. ROAS
                        </div>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            {avgRoas.toFixed(2)}x
                        </div>
                        <div className="mt-2 text-xs text-emerald-400 font-medium">+12% vs last week</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                            <Target className="h-4 w-4 text-blue-500" /> Clicks
                        </div>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            {totalClicks.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Simulated Chart Area */}
                <div className="mt-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 h-48 flex items-end justify-between gap-2">
                    {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div key={i} className="w-full bg-indigo-500/20 rounded-t-sm relative group">
                            <div
                                style={{ height: `${h}%` }}
                                className="bg-indigo-500 w-full rounded-t-sm absolute bottom-0 transition-all group-hover:bg-indigo-400"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-zinc-600 mt-2 font-medium">Weekly Engagement Trend</p>
            </div>
        </div>
    );
}
