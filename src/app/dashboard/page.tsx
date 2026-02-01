'use client';

import ProjectCard from '@/components/ProjectCard';
import { useStore } from '@/store/useStore';
import { ServiceCategory } from '@/types';
import { Filter, Layout, Plus, Search, FileText, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DEMO_DATASETS } from '@/lib/demo-datasets';
import { Eye, MonitorPlay } from 'lucide-react';
import NextStepButton from '@/components/NextStepButton';
import AgencyConfidenceIndicator from '@/components/AgencyConfidenceIndicator';
import CreatorStudio from '@/components/creator/CreatorStudio';
import KickstarterDashboard from '@/components/kickstarter/KickstarterDashboard';

export default function Dashboard() {
    const projects = useStore((state) => state.projects);
    const workCards = useStore((state) => state.workCards);
    const workspace = useStore((state) => state.workspace);
    const demoArchetype = useStore((state) => state.demoArchetype);
    const setDemoArchetype = useStore((state) => state.setDemoArchetype);

    const router = useRouter();
    const [filter, setFilter] = useState<ServiceCategory | 'All'>('All');

    // DEMO MODE STATE
    const [isDemoMode, setIsDemoMode] = useState(false);

    // Derived Data based on Demo Mode
    const displayProjects = isDemoMode ? DEMO_DATASETS[demoArchetype].projects : projects;
    // Mock pending count for demo
    const displayPendingCount = isDemoMode ? 2 : workCards.filter(c => c.status === 'review').length;

    // Guard: Redirect to project selection if no projects exist (only if not in demo mode)
    useEffect(() => {
        if (!isDemoMode && projects.length === 0) {
            router.replace('/onboarding/projects');
        }
    }, [projects, router, isDemoMode]);

    // NEW: Streamlined Creator Mode
    if (demoArchetype === 'youtube') {
        return <CreatorStudio />;
    }

    // Filter cards
    const filteredProjects = displayProjects;

    return (
        <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto">
            {/* Top Bar: Context & Demo Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Agency Home</h1>
                    <p className="mt-2 text-base text-zinc-400 max-w-2xl">
                        Orchestrating {displayProjects.length} active projects and {workCards.length} tasks across your portfolio.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800/80 backdrop-blur-sm">
                    <button
                        onClick={() => setIsDemoMode(!isDemoMode)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDemoMode
                            ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/20'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
                    >
                        <MonitorPlay className="h-4 w-4" />
                        Demo Mode
                    </button>

                    {isDemoMode && (
                        <>
                            <div className="h-4 w-px bg-zinc-800" />
                            <div className="relative group">
                                <div className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 cursor-pointer hover:text-white transition-colors">
                                    <Eye className="h-4 w-4 text-indigo-400" />
                                    <span>{(demoArchetype as any) === 'shopify' ? 'Shopify Brand' : (demoArchetype as any) === 'youtube' ? 'YouTube Creator' : (demoArchetype as any) === 'kickstarter' ? 'Kickstarter Launch' : 'Lead Gen'}</span>
                                </div>
                                {/* Dropdown implementation would usually go here or be a native select hidden on top */}
                                <select
                                    value={demoArchetype}
                                    onChange={(e) => setDemoArchetype(e.target.value as any)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                >
                                    <option value="shopify">Shopify + Paid Ads</option>
                                    <option value="youtube">YouTube Creator</option>
                                    <option value="kickstarter">Kickstarter Launch</option>
                                    <option value="leads">Leads / Sales Funnel</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Action Bar & Stats */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 pb-8 border-b border-zinc-900">
                <div className="flex items-center gap-8">
                    <AgencyConfidenceIndicator
                        workspace={workspace}
                        projectCount={displayProjects.length}
                        pendingCount={displayPendingCount}
                    />
                    <div className="h-8 w-px bg-zinc-800/50 hidden md:block" />
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">Weekly Report</div>
                            <button
                                onClick={() => router.push('/dashboard/review')}
                                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline decoration-indigo-500/30 underline-offset-4 transition-all"
                            >
                                Generate Draft
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <NextStepButton />

                    <button
                        onClick={() => router.push('/requests/new/category')}
                        className="flex-1 xl:flex-none flex items-center justify-center rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-white hover:scale-[1.02] transition-all duration-200"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Request
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                <button
                    onClick={() => setFilter('All')}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${filter === 'All'
                        ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                        : 'bg-zinc-900/50 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                        }`}
                >
                    All Projects
                </button>
                {['Video & Production', 'Paid Growth', 'Social & Content', 'Strategy & Planning', 'Conversion & Funnels'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as ServiceCategory | 'All')}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${filter === cat
                            ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                            : 'bg-zinc-900/50 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Kickstarter Analytics Dashboard (Only for Kickstarter Archetype) */}
            {demoArchetype === 'kickstarter' && (
                <div className="mb-12">
                    <KickstarterDashboard isDemoMode={isDemoMode} />
                </div>
            )}

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}

                {filteredProjects.length === 0 && (
                    <div className="col-span-full py-24 text-center border border-dashed border-zinc-800/50 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 mb-4 shadow-sm">
                            <Search className="h-6 w-6 text-zinc-500" />
                        </div>
                        <h3 className="text-zinc-300 font-medium mb-1">No projects found</h3>
                        <p className="text-sm text-zinc-500">Try adjusting your filters or create a new request.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
