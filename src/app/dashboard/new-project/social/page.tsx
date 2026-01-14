'use client';

import { useStore } from '@/store/useStore';
import { Project, WorkCard } from '@/types';
import { useState } from 'react';
import { Share2, MessageSquare, Target, Upload, Check, ChevronRight, Layout } from 'lucide-react';
import ProjectSuccessView from '@/components/ProjectSuccessView';

export default function SocialWizardPage() {
    const createWorkCard = useStore((state) => state.createWorkCard);
    const workspace = useStore((state) => state.workspace);

    const [step, setStep] = useState(1);

    // Form
    const [channels, setChannels] = useState<string[]>([]);
    const [goal, setGoal] = useState('Consistency');
    const [contentTypes, setContentTypes] = useState<string[]>([]);
    const [tone, setTone] = useState(workspace?.brandTone || 'Professional');
    const [frequency, setFrequency] = useState('3x/week');

    // Actions
    const handleChannelToggle = (c: string) => {
        if (channels.includes(c)) setChannels(channels.filter(i => i !== c));
        else setChannels([...channels, c]);
    };
    const handleContentToggle = (c: string) => {
        if (contentTypes.includes(c)) setContentTypes(contentTypes.filter(i => i !== c));
        else setContentTypes([...contentTypes, c]);
    };

    const handleCreateProject = () => {
        if (!workspace) return;
        const projectId = `proj-soc-${Date.now()}`;

        contentTypes.forEach((svc, index) => {
            const card: WorkCard = {
                id: `card-${projectId}-${index}`,
                workspaceId: workspace.id,
                projectId: projectId,
                serviceCategory: 'Social Media',
                serviceType: svc,
                title: `${svc} (${channels.join(', ')})`,
                status: 'in_production',
                revisionsAllowed: 1,
                inputs: { channels, goal, tone, frequency },
                creditsUsed: 5,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                aiSummary: "Content calendar initiation. Analyzing channel trends.",
                nextSteps: ["Draft Topic Clusters", "Review Content Pillars"]
            };
            createWorkCard(card);
        });
        setStep(5);
    };

    if (step === 5) return <ProjectSuccessView />;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 pb-32">
            <div className="max-w-4xl mx-auto mb-12 flex items-center gap-2 text-zinc-500 text-sm">
                <span className="text-zinc-500">Type</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-indigo-400 font-medium">Social Setup</span>
                <ChevronRight className="h-4 w-4" />
                <span>Live</span>
            </div>

            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Social Media</h1>
                    <p className="text-zinc-400">Scale your organic presence with consistent, high-quality content.</p>
                </div>

                {step === 1 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Share2 className="h-4 w-4 text-indigo-400" /> Channels & Goals</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Active Channels</label>
                            <div className="flex flex-wrap gap-2">
                                {['Instagram', 'TikTok', 'LinkedIn', 'X (Twitter)', 'Facebook'].map(c => (
                                    <button key={c} onClick={() => handleChannelToggle(c)} className={`px-4 py-2 rounded-full border text-sm ${channels.includes(c) ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>{c}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Primary Goal</label>
                            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none">
                                <option>Consistency</option>
                                <option>Audience Growth</option>
                                <option>Engagement</option>
                                <option>Sales / Promo</option>
                            </select>
                        </div>
                        <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl mt-4">Next: Content</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Layout className="h-4 w-4 text-indigo-400" /> Content Support</h3>
                        <div className="space-y-3">
                            {['Weekly Posting Plan', 'Caption + Hook Pack', 'Repurposing Existing Content', 'Community Management Guide'].map(svc => (
                                <label key={svc} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${contentTypes.includes(svc) ? 'bg-indigo-500/10 border-indigo-500' : 'bg-zinc-950 border-zinc-800'}`}>
                                    <div className={`h-5 w-5 rounded border flex items-center justify-center ${contentTypes.includes(svc) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-zinc-700'}`}>
                                        {contentTypes.includes(svc) && <Check className="h-3 w-3" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={contentTypes.includes(svc)} onChange={() => handleContentToggle(svc)} />
                                    <span className="text-sm">{svc}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={() => setStep(3)} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Next: Brand</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4 text-indigo-400" /> Brand & Tone</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Tone of Voice</label>
                            <input value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none" placeholder="e.g. Witty, Professional" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Inspiration Accounts (Optional)</label>
                            <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none h-24" placeholder="@example_account, @another_one" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={() => setStep(4)} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Next: Cadence</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Target className="h-4 w-4 text-indigo-400" /> Posting Cadence</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Frequency</label>
                            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none">
                                <option>3x/week</option>
                                <option>5x/week</option>
                                <option>Daily</option>
                                <option>Ad-hoc</option>
                            </select>
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
