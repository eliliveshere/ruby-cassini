'use client';

import { useStore } from '@/store/useStore';
import { Project, ProjectType, WorkCard } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Video, Target, Share2, PenTool, Check, ChevronRight, Upload, Calendar, Play } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
    const router = useRouter();
    const createProject = useStore((state) => state.addProject); // Need to rename/expose this in store if different
    const createWorkCard = useStore((state) => state.createWorkCard);
    const workspace = useStore((state) => state.workspace);

    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState<ProjectType | null>(null);

    // YouTube Form State
    const [ytTitle, setYtTitle] = useState('');
    const [ytGoal, setYtGoal] = useState('Educate');
    const [ytLength, setYtLength] = useState('Mid (5–10 min)');
    const [ytServices, setYtServices] = useState<string[]>([]);
    const [ytAssets, setYtAssets] = useState<string[]>([]); // Tracking what they HAVE
    const [targetDate, setTargetDate] = useState('');
    const [reviewPref, setReviewPref] = useState<'consolidated' | 'stage_by_stage'>('stage_by_stage');

    const handleTypeSelect = (type: ProjectType) => {
        setSelectedType(type);
        setStep(2);
    };

    const handleServiceToggle = (service: string) => {
        if (ytServices.includes(service)) setYtServices(ytServices.filter(s => s !== service));
        else setYtServices([...ytServices, service]);
    };

    const handleAssetToggle = (asset: string) => {
        if (ytAssets.includes(asset)) setYtAssets(ytAssets.filter(a => a !== asset));
        else setYtAssets([...ytAssets, asset]);
    };

    const handleCreateProject = () => {
        if (!workspace || !selectedType) return;

        // 1. Create Project Container
        const projectId = `proj-${Date.now()}`;
        const newProject: Project = {
            id: projectId,
            workspaceId: workspace.id,
            name: ytTitle || 'Untitled Project',
            type: selectedType,
            status: 'active',
            reviewPreference: reviewPref,
            targetDate: targetDate,
            servicesIncluded: ytServices,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        // NOTE: In a real app we'd add this to store. Assuming store handles project creation.
        // For now we simulate it or need to add `addProject` to store.
        // I will rely on existing logic or Update Store later if missing.
        // *Let's dispatch work cards primarily as that's the view.*

        // 2. Create Work Cards for each Service
        ytServices.forEach((service, index) => {
            const card: WorkCard = {
                id: `card-${projectId}-${index}`,
                workspaceId: workspace.id,
                projectId: projectId,
                serviceCategory: 'Video', // Hardcoded for this flow
                serviceType: service,
                title: `${service} - ${ytTitle}`,
                status: 'in_production', // Start immediately
                revisionsAllowed: 1,
                inputs: {
                    goal: ytGoal,
                    length: ytLength,
                    projectType: selectedType,
                    reviewPreference: reviewPref
                },
                deliverables: {}, // Empty init
                creditsUsed: 10, // Mock cost
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                aiSummary: "Project initiated. Briefing creative team based on selected parameters.",
                nextSteps: ["Review initial brief", "Upload raw assets"]
            };
            createWorkCard(card);
        });

        setStep(3);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 pb-32">

            {/* Header / Nav */}
            <div className="max-w-4xl mx-auto mb-12 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <span className={step >= 1 ? "text-indigo-400 font-medium" : ""}>Type</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className={step >= 2 ? "text-indigo-400 font-medium" : ""}>Setup</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className={step >= 3 ? "text-indigo-400 font-medium" : ""}>Live</span>
                </div>
            </div>

            {/* STEP 1: SELECT TYPE */}
            {step === 1 && (
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-3xl font-bold mb-2">What would you like to work on?</h1>
                    <p className="text-zinc-400 mb-10">Select a project type to start briefing.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => handleTypeSelect('YouTube')}
                            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-zinc-900/80 p-8 rounded-2xl text-left transition-all group shadow-lg"
                        >
                            <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                                <Video className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">YouTube Video</h3>
                            <p className="text-zinc-400 text-sm">Full production support: Script, Edit, Thumbnail, and Optimization.</p>
                        </button>

                        <button
                            onClick={() => handleTypeSelect('Paid Ads')}
                            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-zinc-900/80 p-8 rounded-2xl text-left transition-all group shadow-lg"
                        >
                            <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Target className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Paid Ad Campaign</h3>
                            <p className="text-zinc-400 text-sm">Full funnel ad support: Creative, Copy, Targeting, and Pixel setup.</p>
                        </button>

                        <button
                            onClick={() => handleTypeSelect('Social Media')}
                            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-zinc-900/80 p-8 rounded-2xl text-left transition-all group shadow-lg"
                        >
                            <div className="h-14 w-14 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                                <Share2 className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Social Media</h3>
                            <p className="text-zinc-400 text-sm">Batch content creation: Carousels, Short-form, and Hashtags.</p>
                        </button>

                        <button
                            onClick={() => handleTypeSelect('Strategy')}
                            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-zinc-900/80 p-8 rounded-2xl text-left transition-all group shadow-lg"
                        >
                            <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                <PenTool className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Strategy</h3>
                            <p className="text-zinc-400 text-sm">Growth planning: Audits, Competitor Analysis, and Roadmaps.</p>
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: SETUP (Dynamic based on Type) */}
            {step === 2 && (
                <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-1">{selectedType} Setup</h1>
                        <p className="text-zinc-400 text-sm">Configure your request details below.</p>
                    </div>

                    <div className="space-y-6">
                        {/* A: Core Details */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">Core Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Project Name</label>
                                    <input
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                        placeholder="e.g. Q1 Growth Push"
                                        autoFocus
                                        value={ytTitle}
                                        onChange={(e) => setYtTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Primary Goal</label>
                                    <select
                                        value={ytGoal}
                                        onChange={(e) => setYtGoal(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                                    >
                                        <option>Educate</option>
                                        <option>Entertain</option>
                                        <option>Convert / Sales</option>
                                        <option>Brand Awareness</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Target Delivery</label>
                                    <input
                                        type="date"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                                        onChange={(e) => setTargetDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* B: Scope & Services */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">Scope of Work</h3>
                                <span className="text-xs text-indigo-400 font-medium">{ytServices.length} Selected</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {(selectedType === 'YouTube' ? [
                                    "Scripting", "Thumbnail Design", "Video Editing", "SEO Optimization", "Shorts Repurposing"
                                ] : selectedType === 'Paid Ads' ? [
                                    "Ad Creative", "Copywriting", "Audience Targeting", "Pixel Setup", "A/B Testing"
                                ] : selectedType === 'Social Media' ? [
                                    "Carousel Design", "Video Editing", "Caption Writing", "Hashtag Strategy", "Scheduling"
                                ] : [
                                    "Channel Audit", "Competitor Analysis", "Content Calendar", "Funnel Review", "Growth Strategy"
                                ]).map(service => (
                                    <label key={service} className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer group ${ytServices.includes(service) ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'}`}>
                                        <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${ytServices.includes(service) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-zinc-600 group-hover:border-zinc-500'}`}>
                                            {ytServices.includes(service) && <Check className="h-3 w-3" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={ytServices.includes(service)} onChange={() => handleServiceToggle(service)} />
                                        <span className={`text-sm ${ytServices.includes(service) ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-300'}`}>{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* C: Assets (Compact) */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">Available Assets</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Raw Footage", "Draft Script", "Brand Assets", "Inspiration Links"].map(asset => (
                                    <button
                                        key={asset}
                                        onClick={() => handleAssetToggle(asset)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${ytAssets.includes(asset) ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
                                    >
                                        {asset} {ytAssets.includes(asset) && "✓"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleCreateProject}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20"
                        >
                            Create Project
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: SUCCESS / EXPECTATION SETTING */}
            {step === 3 && (
                <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-500 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="text-center mb-12">
                        <div className="inline-flex h-16 w-16 rounded-full bg-green-500/10 items-center justify-center text-green-500 mb-6 border border-green-500/20">
                            <Check className="h-8 w-8" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Your project is live</h1>
                        <p className="text-lg text-zinc-400">Here is exactly how we will move forward.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">1</span>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Brief Finalization</h3>
                                    <p className="text-sm text-zinc-400">AI drafts a clear brief from your inputs. If we need clarification, we'll open a Ticket.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">2</span>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Production Stages</h3>
                                    <p className="text-sm text-zinc-400">Selected services (e.g. Script, Edit) appear as active Work Cards on your dashboard.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">3</span>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Review & Approval</h3>
                                    <p className="text-sm text-zinc-400">You'll approve work at each stage. Request revisions directly on the card—no emails needed.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm border border-zinc-700">4</span>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Completion</h3>
                                    <p className="text-sm text-zinc-400">Final assets are delivered with a posting checklist.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-950/50 rounded-xl p-4 mb-8 border border-zinc-800/50 flex items-start gap-3">
                        <Play className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-zinc-200">You’ll never need a meeting to know what’s happening.</p>
                            <p className="text-xs text-zinc-500 mt-1">Check your dashboard anytime for real-time status.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/dashboard" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl text-center transition-colors">
                            View Dashboard
                        </Link>
                        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl text-center transition-colors">
                            Upload Assets
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}
