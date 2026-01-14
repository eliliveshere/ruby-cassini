'use client';

import { useStore } from '@/store/useStore';
import { Project, WorkCard } from '@/types';
import { useState } from 'react';
import { Target, BarChart, DollarSign, Calendar, Upload, Check, ChevronRight } from 'lucide-react';
import ProjectSuccessView from '@/components/ProjectSuccessView';

export default function AdsWizardPage() {
    const createWorkCard = useStore((state) => state.createWorkCard);
    const workspace = useStore((state) => state.workspace);

    const [step, setStep] = useState(1);

    // Form State
    const [platform, setPlatform] = useState('Meta (IG/FB)');
    const [goal, setGoal] = useState('Leads');
    const [offer, setOffer] = useState('');
    const [geo, setGeo] = useState('');

    const [support, setSupport] = useState<string[]>([]);

    const [budget, setBudget] = useState('');
    const [landingPage, setLandingPage] = useState('');
    const [assets, setAssets] = useState<string[]>([]);

    const [launchDate, setLaunchDate] = useState('');
    const [reviewPref, setReviewPref] = useState<'consolidated' | 'stage_by_stage'>('stage_by_stage');

    const handleSupportToggle = (item: string) => {
        if (support.includes(item)) setSupport(support.filter(i => i !== item));
        else setSupport([...support, item]);
    };

    const handleAssetToggle = (item: string) => {
        if (assets.includes(item)) setAssets(assets.filter(i => i !== item));
        else setAssets([...assets, item]);
    };

    const handleCreateProject = () => {
        if (!workspace) return;

        const projectId = `proj-ads-${Date.now()}`;

        support.forEach((svc, index) => {
            const card: WorkCard = {
                id: `card-${projectId}-${index}`,
                workspaceId: workspace.id,
                projectId: projectId,
                serviceCategory: 'Paid Ads',
                serviceType: svc,
                title: `${svc} - ${platform}`,
                status: 'in_production',
                revisionsAllowed: 2,
                inputs: {
                    platform,
                    goal,
                    offer,
                    budget,
                    landingPage
                },
                drivers: {}, // metrics placeholder
                creditsUsed: 15,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                aiSummary: "Campaign brief initialized. Awaiting creative strategy review.",
                nextSteps: ["Audit Landing Page", "Draft Hook Options"]
            };
            createWorkCard(card);
        });

        setStep(5); // Success
    };

    if (step === 5) return <ProjectSuccessView />;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 pb-32">
            <div className="max-w-4xl mx-auto mb-12 flex items-center gap-2 text-zinc-500 text-sm">
                <span className="text-zinc-500">Type</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-indigo-400 font-medium">Ads Setup</span>
                <ChevronRight className="h-4 w-4" />
                <span>Live</span>
            </div>

            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Paid Ad Campaign</h1>
                    <p className="text-zinc-400">Launch or scale your campaigns with data-driven creative.</p>
                </div>

                {step === 1 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Target className="h-4 w-4 text-indigo-400" /> Campaign Overview</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Platform</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Meta (IG/FB)', 'Google Ads', 'TikTok', 'YouTube'].map(p => (
                                    <button key={p} onClick={() => setPlatform(p)} className={`p-3 rounded-lg border text-sm text-left ${platform === p ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>{p}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Primary Goal</label>
                            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none">
                                <option>Leads</option>
                                <option>Sales / Conversions</option>
                                <option>Brand Awareness</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Offer / Product Focus</label>
                            <input value={offer} onChange={(e) => setOffer(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none" placeholder="e.g. Free Consultation, Winter Sale" />
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl">Next: Scope</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> What support do you need?</h3>
                        <div className="space-y-3">
                            {['Creative Strategy', 'Ad Creative (Hooks, Copy)', 'Campaign Setup Plan', 'Weekly Optimization'].map(svc => (
                                <label key={svc} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${support.includes(svc) ? 'bg-indigo-500/10 border-indigo-500' : 'bg-zinc-950 border-zinc-800'}`}>
                                    <div className={`h-5 w-5 rounded border flex items-center justify-center ${support.includes(svc) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-zinc-700'}`}>
                                        {support.includes(svc) && <Check className="h-3 w-3" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={support.includes(svc)} onChange={() => handleSupportToggle(svc)} />
                                    <span className="text-sm">{svc}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={() => setStep(3)} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Next: Inputs</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><DollarSign className="h-4 w-4 text-indigo-400" /> Inputs</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Monthly Budget Range</label>
                            <input value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none" placeholder="e.g. $5k - $10k" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Landing Page URL</label>
                            <input value={landingPage} onChange={(e) => setLandingPage(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none" placeholder="https://..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Assets Available</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Brand Guide', 'Product Photos', 'Video Raw Files', 'Past Ad Performance'].map(asset => (
                                    <label key={asset} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${assets.includes(asset) ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-950 border-zinc-800'}`}>
                                        <input type="checkbox" className="hidden" checked={assets.includes(asset)} onChange={() => handleAssetToggle(asset)} />
                                        <div className={`h-4 w-4 rounded border flex items-center justify-center ${assets.includes(asset) ? 'bg-white border-white text-black' : 'border-zinc-700'}`}>
                                            {assets.includes(asset) && <Check className="h-3 w-3" />}
                                        </div>
                                        <span className="text-xs text-zinc-300">{asset}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={() => setStep(4)} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Next: Timeline</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Calendar className="h-4 w-4 text-indigo-400" /> Timeline</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Target Launch Date</label>
                            <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Review Preference</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setReviewPref('stage_by_stage')} className={`p-4 rounded-xl border text-left ${reviewPref === 'stage_by_stage' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-zinc-950 border-zinc-800'}`}>
                                    <div className="font-semibold text-white mb-1">Stage-by-Stage</div>
                                    <p className="text-xs text-zinc-500">Approve hooks/copy as ready.</p>
                                </button>
                                <button onClick={() => setReviewPref('consolidated')} className={`p-4 rounded-xl border text-left ${reviewPref === 'consolidated' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-zinc-950 border-zinc-800'}`}>
                                    <div className="font-semibold text-white mb-1">Consolidated</div>
                                    <p className="text-xs text-zinc-500">Review full package at once.</p>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(3)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={handleCreateProject} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Create Project</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
