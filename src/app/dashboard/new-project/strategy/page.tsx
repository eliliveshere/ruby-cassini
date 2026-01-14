'use client';

import { useStore } from '@/store/useStore';
import { Project, WorkCard } from '@/types';
import { useState } from 'react';
import { PenTool, Search, FileText, Check, ChevronRight } from 'lucide-react';
import ProjectSuccessView from '@/components/ProjectSuccessView';

export default function StrategyWizardPage() {
    const createWorkCard = useStore((state) => state.createWorkCard);
    const workspace = useStore((state) => state.workspace);

    const [step, setStep] = useState(1);

    // Form
    const [stratType, setStratType] = useState('Campaign Audit');
    const [audience, setAudience] = useState('');
    const [challenge, setChallenge] = useState('');
    const [links, setLinks] = useState('');

    const handleCreateProject = () => {
        if (!workspace) return;
        const projectId = `proj-strat-${Date.now()}`;

        const card: WorkCard = {
            id: `card-${projectId}-0`,
            workspaceId: workspace.id,
            projectId: projectId,
            serviceCategory: 'Strategy',
            serviceType: stratType,
            title: `${stratType} - ${workspace.brandName}`,
            status: 'in_production',
            revisionsAllowed: 1,
            inputs: { audience, challenge, links },
            creditsUsed: 25,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            aiSummary: "Strategy project initialized. Research phase started.",
            nextSteps: ["Competitor Analysis", "Initial Findings Report"]
        };
        createWorkCard(card);
        setStep(4);
    };

    if (step === 4) return <ProjectSuccessView />;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 pb-32">
            <div className="max-w-4xl mx-auto mb-12 flex items-center gap-2 text-zinc-500 text-sm">
                <span className="text-zinc-500">Type</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-indigo-400 font-medium">Strategy Setup</span>
                <ChevronRight className="h-4 w-4" />
                <span>Live</span>
            </div>

            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Strategy & Planning</h1>
                    <p className="text-zinc-400">Deep dives, audits, and roadmaps to guide your growth.</p>
                </div>

                {step === 1 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><PenTool className="h-4 w-4 text-indigo-400" /> Strategy Type</h3>
                        <div className="space-y-3">
                            {['Creative Strategy Roadmap', 'Campaign Audit', 'Funnel Review', 'Brand Positioning'].map(t => (
                                <button key={t} onClick={() => { setStratType(t); setStep(2) }} className="w-full text-left p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-indigo-500 transition-all flex justify-between group">
                                    <span className="font-medium">{t}</span>
                                    <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-indigo-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Search className="h-4 w-4 text-indigo-400" /> Business Context</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Target Audience</label>
                            <input value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none" placeholder="Who are we talking to?" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Current Challenge</label>
                            <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none h-32" placeholder="What problem are we solving?" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={() => setStep(3)} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Next: Inputs</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><FileText className="h-4 w-4 text-indigo-400" /> Inputs</h3>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Links & Docs</label>
                            <textarea value={links} onChange={(e) => setLinks(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none h-32" placeholder="Links to past campaigns, drive folders, etc." />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-xl">Back</button>
                            <button onClick={handleCreateProject} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl">Start Strategy Project</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
