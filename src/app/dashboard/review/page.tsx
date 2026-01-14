
'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { DEMO_DATASETS } from '@/lib/demo-datasets';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Calendar, CheckCircle2, AlertCircle, TrendingUp, TrendingDown,
    ArrowRight, Printer, Download, Clock
} from 'lucide-react';
import { ServiceCategory } from '@/types';

export default function WeeklyReviewPage() {
    const router = useRouter();
    const demoArchetype = useStore((state) => state.demoArchetype);
    const setDemoArchetype = useStore((state) => state.setDemoArchetype);

    // DEMO MODE CHECK (Simplified: If URL param or Store says so. For now, assume global toggle isn't persisted well across reload, checking store default)
    // In a real app we'd persist "isDemoMode". For this prototype, we'll rely on the user having set the archetype in the dashboard.
    // Let's assume we are in Demo Mode if there are no real projects, OR just default to demo data for this view as requested "Use Demo datasets when Demo Mode = ON"

    // Actually, we need to know IF we are in demo mode. 
    // Since we didn't add "isDemoMode" to the store (it was local state in Dashboard), let's fix that pattern or 
    // just default to using the store's demoArchetype if the user "activated" it.
    // Better yet: Add a local toggle here too for seamless demo-ing.
    const [isDemoMode, setIsDemoMode] = useState(true); // Default to true for the "Master Weekly Dashboard" experience showcase

    const dataset = DEMO_DATASETS[demoArchetype];
    const metrics = dataset.metrics as any; // Type assertion for flexibility
    const projects = dataset.projects;
    const team = dataset.team;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 lg:p-12 print:p-0 print:bg-white print:text-black">
            {/* Navigation / Controls (Hidden in Print) */}
            <div className="mb-8 flex items-center justify-between print:hidden">
                <button onClick={() => router.back()} className="flex items-center text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </button>
                <div className="flex items-center gap-4">
                    {/* Archetype Switcher for Demo */}
                    <select
                        value={demoArchetype}
                        onChange={(e) => setDemoArchetype(e.target.value as any)}
                        className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                        <option value="shopify">Shopify + Paid Ads</option>
                        <option value="youtube">YouTube Creator</option>
                        <option value="kickstarter">Kickstarter Launch</option>
                        <option value="leads">Leads / Sales Funnel</option>
                    </select>

                    <button className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white">
                        <Printer className="h-5 w-5" onClick={() => window.print()} />
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        <Download className="h-4 w-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <span className="font-bold text-white">W</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white print:text-black">Weekly Agency Review</h1>
                    </div>
                    <p className="text-zinc-400 print:text-zinc-600">
                        Snapshot for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Client</div>
                    <div className="text-xl font-medium text-white print:text-black">Cyberdyne Systems</div>
                </div>
            </div>

            {/* SECTION 1: EXEC SNAPSHOT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Left: Momentum */}
                <div className="bg-zinc-900/50 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Momentum Score</div>
                            <div className="text-4xl font-bold text-white print:text-black mt-1">92<span className="text-lg text-zinc-500 font-normal">/100</span></div>
                        </div>
                        <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-xs font-bold border border-emerald-500/20">
                            ON TRACK
                        </div>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Execution velocity is high. All major deliverables for the week have been shipped or are in final review.
                    </p>
                </div>

                {/* Center: Output */}
                <div className="bg-zinc-900/50 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300 rounded-xl p-6 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-zinc-400">Deliverables Shipped</span>
                        <span className="text-lg font-bold text-white print:text-black">9</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-zinc-400">Avg Cycle Time</span>
                        <span className="text-lg font-bold text-white print:text-black">2.4 Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Est. Hours Saved</span>
                        <span className="text-lg font-bold text-indigo-400">18.5 Hrs</span>
                    </div>
                </div>

                {/* Right: Primary Metric (Adaptive) */}
                <div className="bg-gradient-to-br from-indigo-900/20 to-zinc-900 border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-xs text-indigo-300 uppercase tracking-widest font-bold mb-1">
                            {demoArchetype === 'shopify' ? 'Total Revenue (30d)' :
                                demoArchetype === 'youtube' ? 'Channel Views (30d)' :
                                    demoArchetype === 'kickstarter' ? 'Funds Raised' : 'Qualified Leads'}
                        </div>
                        <div className="text-3xl font-bold text-white print:text-black mb-4 flex items-baseline gap-2">
                            {demoArchetype === 'shopify' ? metrics.revenue :
                                demoArchetype === 'youtube' ? metrics.views :
                                    demoArchetype === 'kickstarter' ? metrics.funds : metrics.qualified}

                            <span className="text-sm text-emerald-400 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-0.5" />
                                {demoArchetype === 'shopify' ? metrics.revenueDiff : '+8%'}
                            </span>
                        </div>
                        <div className="text-xs text-zinc-400 border-t border-indigo-500/20 pt-3">
                            <span className="text-indigo-400 font-semibold">AI Insight: </span>
                            {dataset.insights[0]}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: SHIPPED LIST */}
            <div className="mb-10">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Shipped This Week
                </h3>
                <div className="bg-zinc-900 print:bg-white border border-zinc-800 print:border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-800 print:divide-zinc-200">
                    <div className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white print:text-black">
                                    {demoArchetype === 'shopify' ? 'Launched "Winter Sale" Ad Set' :
                                        demoArchetype === 'youtube' ? 'Published "Coding Agent" Tutorial' :
                                            'Campaign Assets Approved'}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    {demoArchetype === 'shopify' ? 'Paid Growth • Meta Ads' : 'Video Production • YouTube'}
                                </div>
                            </div>
                        </div>
                        <button className="text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded px-2 py-1">View Asset</button>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white print:text-black">
                                    {demoArchetype === 'shopify' ? 'Updated Landing Page Headline' :
                                        demoArchetype === 'youtube' ? 'Shorts #4, #5, #6 Generated' :
                                            'Influencer List Finalized'}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    Strategy • Optimization
                                </div>
                            </div>
                        </div>
                        <button className="text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded px-2 py-1">View Asset</button>
                    </div>
                </div>
            </div>

            {/* SECTION 3: PERFORMANCE DEEP DIVE (3 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Performance Factors</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="text-zinc-500 text-xs mb-1">
                                {demoArchetype === 'shopify' ? 'Ad Spend (7d)' : 'CTR'}
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {demoArchetype === 'shopify' ? metrics.spend : metrics.ctr}
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="text-zinc-500 text-xs mb-1">
                                {demoArchetype === 'shopify' ? 'ROAS' : 'Avg View Duration'}
                            </div>
                            <div className="text-2xl font-bold text-white flex items-center gap-2">
                                {demoArchetype === 'shopify' ? metrics.roas : metrics.avgViewDuration}
                                <span className="text-xs font-normal text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">High</span>
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="text-zinc-500 text-xs mb-1">
                                {demoArchetype === 'shopify' ? 'CPA' : 'Subscribers Gained'}
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {demoArchetype === 'shopify' ? metrics.cpa : '+840'}
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="text-zinc-500 text-xs mb-1">
                                {demoArchetype === 'shopify' ? 'Conversion Rate' : 'Comments'}
                            </div>
                            <div className="text-2xl font-bold text-white">
                                2.4%
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">What Mattered</h3>
                    <div className="space-y-4">
                        <div className="bg-zinc-900/50 p-4 border-l-2 border-indigo-500">
                            <h4 className="text-sm font-bold text-white mb-1">Strategic Unlock</h4>
                            <p className="text-sm text-zinc-400">
                                {demoArchetype === 'shopify' ? 'Testing UGC vs Static showed clear winner on TikTok.' :
                                    'Shorts are driving 60% of new traffic.'}
                            </p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 border-l-2 border-emerald-500">
                            <h4 className="text-sm font-bold text-white mb-1">Efficiency Win</h4>
                            <p className="text-sm text-zinc-400">
                                Repurposing workflow reduced editing time by 4 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5 & 6: BLOCKED & NEXT STEPS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 border-t border-zinc-800 pt-8">
                <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Needs Attention
                    </h3>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-500 mb-3">
                            <CheckCircle2 className="h-5 w-5" />
                        </span>
                        <h4 className="text-white font-medium">No critical blockers</h4>
                        <p className="text-sm text-zinc-500 mt-1">
                            The team has everything they need.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Recommended Next Steps</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left group bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-xl transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                                        {demoArchetype === 'shopify' ? 'Scale "Winter_Promo_v2" creative' : 'Repurpose Top Video to Blog'}
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-1">High Impact • Low Effort</div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-indigo-500" />
                            </div>
                        </button>
                        <button className="w-full text-left group bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-4 rounded-xl transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                                        Refresh Retargeting Audience
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-1">Medium Impact • Low Effort</div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-indigo-500" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* FOOTER: TEAM */}
            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex -space-x-3">
                    {team.map((m, i) => (
                        <div key={i} className="h-10 w-10 rounded-full ring-2 ring-zinc-950 bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 relative group cursor-default transition-transform hover:z-10 hover:scale-110 shadow-sm">
                            {/* In a real app, use <Image> here. For now, stylish initials. */}
                            <span className="text-zinc-300">{m.name[0]}</span>
                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity duration-200">
                                <span className="font-semibold block">{m.name}</span>
                                <span className="text-zinc-500 font-normal">{m.role} • Active 2h ago</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-right">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Report Generated By</div>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        IMPCTFUL AI & Senior Account Team
                    </div>
                </div>
            </div>
        </div>
    );
}
