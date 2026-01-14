'use client';

import { useStore } from '@/store/useStore';
import { Project, WorkCard } from '@/types';
import { useState } from 'react';
import { Video, Target, Upload, Calendar, Check, ChevronRight } from 'lucide-react';
import ProjectSuccessView from '@/components/ProjectSuccessView';

export default function YouTubeWizardPage() {
    const createWorkCard = useStore((state) => state.createWorkCard);
    const workspace = useStore((state) => state.workspace);

    const [step, setStep] = useState(1);

    // Form State
    const [ytTitle, setYtTitle] = useState('');
    const [ytGoal, setYtGoal] = useState('Educate');
    const [ytLength, setYtLength] = useState('Mid (5–10 min)');
    const [ytServices, setYtServices] = useState<string[]>([]);
    const [ytAssets, setYtAssets] = useState<string[]>([]);
    const [targetDate, setTargetDate] = useState('');
    const [reviewPref, setReviewPref] = useState<'consolidated' | 'stage_by_stage'>('stage_by_stage');

    const handleServiceToggle = (service: string) => {
        if (ytServices.includes(service)) setYtServices(ytServices.filter(s => s !== service));
        else setYtServices([...ytServices, service]);
    };

    const handleAssetToggle = (asset: string) => {
        if (ytAssets.includes(asset)) setYtAssets(ytAssets.filter(a => a !== asset));
        else setYtAssets([...ytAssets, asset]);
    };

    const handleCreateProject = () => {
        if (!workspace) return;

        const projectId = `proj-${Date.now()}`;

        // Note: Project container creation is mocked/implied here. 
        // In real persistent state we'd save the Project object too.

        ytServices.forEach((service, index) => {
            const card: WorkCard = {
                id: `card-${projectId}-${index}`,
                workspaceId: workspace.id,
                projectId: projectId,
                serviceCategory: 'Video',
                serviceType: service,
                title: `${service} - ${ytTitle}`,
                status: 'in_production',
                revisionsAllowed: 1,
                inputs: {
                    goal: ytGoal,
                    length: ytLength,
                    assetsProvided: ytAssets,
                    reviewPreference: reviewPref
                },
                deliverables: {},
                creditsUsed: 10,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                aiSummary: "Project initiated. Creative team briefed.",
                nextSteps: ["Review initial brief", "Upload raw assets"]
            };
            createWorkCard(card);
        });

        setStep(2); // Show Success View
    };

    if (step === 2) return <ProjectSuccessView />;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 pb-32">

            {/* Nav Header */}
            <div className="max-w-4xl mx-auto mb-12 flex items-center gap-2 text-zinc-500 text-sm">
                <span className="text-zinc-500">Type</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-indigo-400 font-medium">YouTube Setup</span>
                <ChevronRight className="h-4 w-4" />
                <span>Live</span>
            </div>

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
        </div>
    );
}
