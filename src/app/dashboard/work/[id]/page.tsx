'use client';

import { useStore } from '@/store/useStore';
import { ArrowLeft, CheckCircle2, Clock, Upload, FileText, BarChart3, Paperclip, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/Modal';
import CsvImporter from '@/components/CsvImporter';

const STATUS_STEPS = [
    { id: 'submitted', label: 'Brief Submitted' },
    { id: 'clarifying', label: 'Clarifying' },
    { id: 'in_production', label: 'In Production' },
    { id: 'qa', label: 'QA / Review' },
    { id: 'delivered', label: 'Delivered' },
];

export default function WorkCardPage() {
    const params = useParams();
    const id = params.id as string;
    const card = useStore((state) => state.workCards.find((c) => c.id === id));
    const updateWorkCard = useStore((state) => state.updateWorkCard);
    const [isImportOpen, setIsImportOpen] = useState(false);

    if (!card) return <div className="p-12 text-zinc-500">Work Card not found.</div>;

    const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === card.status);

    return (
        <div className="min-h-screen bg-zinc-950 p-8 pb-32">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard" className="mb-4 inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{card.serviceCategory}</span>
                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400 border border-zinc-700">{card.serviceType}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">{card.title}</h1>
                    </div>
                    {card.serviceCategory === 'Paid Ads' && (
                        <button
                            onClick={() => setIsImportOpen(true)}
                            className="flex items-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 border border-zinc-700 transition-colors"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Import Performance CSV
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Team, Brief, Deliverables */}
                <div className="space-y-6">
                    {/* TEAM SECTION (NEW) */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100 mb-4">
                            <Users className="h-4 w-4 text-indigo-400" />
                            Your Team
                        </h3>
                        {card.team && card.team.length > 0 ? (
                            <div className="space-y-3">
                                {card.team.map((member, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="relative">
                                            {member.avatarUrl ? (
                                                <img src={member.avatarUrl} alt={member.name} className="h-8 w-8 rounded-full border border-zinc-700" />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-400">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                            {member.type === 'ai' && (
                                                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-indigo-500 rounded-full border border-zinc-900 flex items-center justify-center">
                                                    <Sparkles className="h-2 w-2 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white leading-none">{member.name}</p>
                                            <p className="text-xs text-zinc-500 mt-1">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-zinc-500 text-sm italic">
                                <Sparkles className="h-4 w-4" />
                                <span>Assigning creative team...</span>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100 mb-4">
                            <FileText className="h-4 w-4 text-indigo-400" />
                            Original Brief
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(card.inputs).map(([key, value]) => (
                                <div key={key}>
                                    <p className="text-xs font-medium text-zinc-500 uppercase">{key}</p>
                                    <p className="text-sm text-zinc-300 mt-1">{String(value)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100 mb-4">
                            <Paperclip className="h-4 w-4 text-indigo-400" />
                            Deliverables
                        </h3>
                        {card.deliverables ? (
                            <div className="space-y-3">
                                {Object.entries(card.deliverables).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 rounded bg-zinc-950 border border-zinc-800">
                                        <span className="text-sm text-zinc-300 capitalize">{key}</span>
                                        <a href="#" className="text-xs text-indigo-400 hover:underline truncate max-w-[150px]">{String(value)}</a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-500 italic">No deliverables yet.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Status & Intelligence */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Bar */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
                        <div className="relative flex items-center justify-between">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10" />
                            {STATUS_STEPS.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;
                                return (
                                    <div key={step.id} className="flex flex-col items-center gap-2 bg-zinc-900 px-2">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : 'bg-zinc-950 border-zinc-700 text-zinc-600'
                                            }`}>
                                            {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                        </div>
                                        <span className={`text-xs font-medium ${isCurrent ? 'text-white' : 'text-zinc-500'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* AI GUIDANCE & SUGGESTED ACTIONS (NEW) */}
                    <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="h-32 w-32" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-semibold text-indigo-300 mb-2 uppercase tracking-wider flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                AI Guidance
                            </h3>
                            <p className="text-lg text-zinc-200 leading-relaxed font-light mb-6">
                                {card.aiSummary || "Analysing latest project data..."}
                            </p>

                            {card.suggestedActions && card.suggestedActions.length > 0 ? (
                                <div className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                                    <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                        <h4 className="text-xs font-medium text-zinc-400 uppercase">Suggested Actions</h4>
                                        <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Auto-Generated</span>
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        {card.suggestedActions.map((action) => (
                                            <div key={action.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${action.status === 'completed' ? 'bg-emerald-500' : action.owner === 'client' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                                    <div>
                                                        <p className={`text-sm font-medium ${action.status === 'completed' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{action.title}</p>
                                                        <p className="text-xs text-zinc-500 pt-0.5">
                                                            {action.owner === 'client' ? 'Waiting on you' : 'IMPCTFUL Team'} • {action.trigger}
                                                        </p>
                                                    </div>
                                                </div>
                                                {action.owner === 'client' && action.status !== 'completed' && (
                                                    <button className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                        Review
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-3 bg-zinc-950/30 text-center">
                                        <p className="text-xs text-zinc-600">No tickets needed. We'll verify completion automatically.</p>
                                    </div>
                                </div>
                            ) : (
                                card.nextSteps && (
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <ul className="space-y-2">
                                            {card.nextSteps.map((step, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-none" />
                                                    {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Metrics (Only if populated) */}
                    {card.metrics && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100 mb-6">
                                <BarChart3 className="h-4 w-4 text-emerald-400" />
                                Performance Data
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.entries(card.metrics).map(([key, value]: [string, any]) => (
                                    <div key={key} className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{key}</p>
                                        <p className="text-xl font-mono text-white">{Number(value).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} title="Import Performance CSV">
                <CsvImporter onComplete={() => setIsImportOpen(false)} />
            </Modal>
        </div>
    );
}
