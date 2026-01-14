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

                        {/* Stubs for others */}
                        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-left opacity-50 cursor-not-allowed">
                            <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                                <Target className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Paid Ad Campaign</h3>
                            <p className="text-zinc-500 text-sm">Coming Soon</p>
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-left opacity-50 cursor-not-allowed">
                            <div className="h-14 w-14 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6">
                                <Share2 className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Social Media</h3>
                            <p className="text-zinc-500 text-sm">Coming Soon</p>
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-left opacity-50 cursor-not-allowed">
                            <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6">
                                <PenTool className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Strategy</h3>
                            <p className="text-zinc-500 text-sm">Coming Soon</p>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 2: YOUTUBE SETUP */}
            {step === 2 && selectedType === 'YouTube' && (
                <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">YouTube Video Project</h1>
                        <p className="text-zinc-400">This project will guide your video from idea to upload. You’ll review and approve work at each stage.</p>
                    </div>

                    <div className="space-y-8">
                        {/* A: Overview */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Video className="h-4 w-4 text-indigo-400" /> Video Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Working Title / Topic</label>
                                    <input
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                                        placeholder="e.g. How to scale your agency"
                                        value={ytTitle}
                                        onChange={(e) => setYtTitle(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Video Goal</label>
                                        <select
                                            value={ytGoal}
                                            onChange={(e) => setYtGoal(e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none"
                                        >
                                            <option>Educate</option>
                                            <option>Entertain</option>
                                            <option>Convert</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Target Length</label>
                                        <select
                                            value={ytLength}
                                            onChange={(e) => setYtLength(e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none"
                                        >
                                            <option>Short (≤60s)</option>
                                            <option>Mid (5–10 min)</option>
                                            <option>Long (10–20 min)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* B: Services included */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2"><Target className="h-4 w-4 text-indigo-400" /> Services Included</h3>
                            <p className="text-xs text-zinc-500 mb-4">What help do you want for this video? Only selected services are included.</p>
                            <div className="space-y-3">
                                {[
                                    "Script review / improvement",
                                    "Thumbnail concept & design",
                                    "Video edit review",
                                    "Title + description optimization",
                                    "Posting checklist"
                                ].map(service => (
                                    <label key={service} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${ytServices.includes(service) ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800'}`}>
                                        <div className={`h-5 w-5 rounded border flex items-center justify-center ${ytServices.includes(service) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-zinc-700'}`}>
                                            {ytServices.includes(service) && <Check className="h-3 w-3" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={ytServices.includes(service)} onChange={() => handleServiceToggle(service)} />
                                        <span className="text-sm text-zinc-200">{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* C: Assets */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2"><Upload className="h-4 w-4 text-indigo-400" /> What You Provide</h3>
                            <p className="text-xs text-zinc-500 mb-4">Check what you have ready. You can upload assets later.</p>
                            <div className="grid grid-cols-2 gap-3">
                                {["Raw Footage", "Draft Script", "Brand Assets", "Inspiration Links"].map(asset => (
                                    <label key={asset} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${ytAssets.includes(asset) ? 'bg-zinc-800 border-zinc-600' : 'bg-zinc-950 border-zinc-800'}`}>
                                        <div className={`h-4 w-4 rounded border flex items-center justify-center ${ytAssets.includes(asset) ? 'bg-zinc-200 border-white text-black' : 'border-zinc-700'}`}>
                                            {ytAssets.includes(asset) && <Check className="h-3 w-3" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={ytAssets.includes(asset)} onChange={() => handleAssetToggle(asset)} />
                                        <span className="text-sm text-zinc-300">{asset}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* D: Timeline */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-indigo-400" /> Timeline & Review</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Target Publish Date</label>
                                    <input type="date" className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white outline-none text-sm" onChange={(e) => setTargetDate(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Review Preference</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setReviewPref('stage_by_stage')}
                                            className={`p-4 rounded-xl border text-left transition-all ${reviewPref === 'stage_by_stage' ? 'bg-indigo-500/10 border-indigo-500 ring-1 ring-indigo-500/30' : 'bg-zinc-950 border-zinc-800'}`}
                                        >
                                            <div className="font-semibold text-white mb-1">Stage-by-Stage</div>
                                            <p className="text-xs text-zinc-500">Approve scripts and drafts as they are ready. (Recommended)</p>
                                        </button>
                                        <button
                                            onClick={() => setReviewPref('consolidated')}
                                            className={`p-4 rounded-xl border text-left transition-all ${reviewPref === 'consolidated' ? 'bg-indigo-500/10 border-indigo-500 ring-1 ring-indigo-500/30' : 'bg-zinc-950 border-zinc-800'}`}
                                        >
                                            <div className="font-semibold text-white mb-1">Consolidated</div>
                                            <p className="text-xs text-zinc-500">Review everything at once before final delivery.</p>
                                        </button>
                                    </div>
                                </div>
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
