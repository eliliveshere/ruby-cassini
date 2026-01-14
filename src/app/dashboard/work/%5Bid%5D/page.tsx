'use client';

import { useStore } from '@/store/useStore';
import { ArrowLeft, CheckCircle2, Clock, Upload, FileText, BarChart3, Paperclip, AlertTriangle, ShieldCheck, Ticket as TicketIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/Modal';
import CsvImporter from '@/components/CsvImporter';

export default function MeetingBriefPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const card = useStore((state) => state.workCards.find((c) => c.id === id));
    const tickets = useStore((state) => state.tickets.filter(t => t.linkedCardId === id));

    const [isImportOpen, setIsImportOpen] = useState(false);

    if (!card) return <div className="p-12 text-zinc-500">Work Brief not found.</div>;

    // Mocked fields for "Meeting Brief" experience
    const shippedThisWeek = card.status === 'delivered' ? ['Initial V1 Draft'] : [];
    const inProgressItems = card.status === 'in_production' ? ['Creative Execution', 'Internal QA'] : ['Pending Review'];
    const risks = card.status === 'clarifying' ? ['Waiting on asset inputs'] : ['None identified'];

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30 pb-20">

            {/* Header Section */}
            <div className="bg-zinc-900/50 border-b border-zinc-800 p-8">
                <div className="max-w-7xl mx-auto">
                    <Link href="/dashboard" className="inline-flex items-center text-xs text-zinc-500 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Back to Agency Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-xs font-semibold text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
                                    {card.serviceCategory}
                                </span>
                                <span className="text-zinc-500 text-xs">ID: {card.id.slice(-6)}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">{card.title}</h1>
                            <p className="text-zinc-400 text-lg">{card.serviceType}</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800">
                                <div className={`h-2.5 w-2.5 rounded-full ${['active', 'in_production', 'qa'].includes(card.status) ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
                                <span className="text-sm font-medium capitalize text-zinc-300">{card.status.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {card.serviceCategory === 'Paid Ads' && (
                                    <button
                                        onClick={() => setIsImportOpen(true)}
                                        className="flex items-center rounded-md bg-zinc-800 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-700 border border-zinc-700 transition-colors"
                                    >
                                        <Upload className="mr-2 h-3 w-3" />
                                        Import CSV
                                    </button>
                                )}
                                <Link href="/dashboard/tickets" className="flex items-center rounded-md bg-indigo-600/10 px-3 py-2 text-xs font-medium text-indigo-400 hover:bg-indigo-600/20 border border-indigo-500/20 transition-colors">
                                    <TicketIcon className="mr-2 h-3 w-3" />
                                    Open Ticket
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Brief Content */}
            <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Strategic Context */}
                <div className="space-y-8">
                    {/* Objective */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" /> Objective
                        </h3>
                        <p className="text-xl text-zinc-200 font-light leading-relaxed">
                            {card.inputs['Goal'] || card.inputs['Objective'] || "Execute deliverable according to brief."}
                        </p>
                    </div>

                    {/* Brief Details */}
                    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Input Brief
                        </h3>
                        <dl className="space-y-4">
                            {Object.entries(card.inputs).map(([key, value]) => (
                                <div key={key}>
                                    <dt className="text-xs text-zinc-500 uppercase text-[10px]">{key}</dt>
                                    <dd className="text-sm text-zinc-300 font-medium">{String(value)}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Paperclip className="h-4 w-4" /> Deliverables
                        </h3>
                        {card.deliverables ? (
                            <div className="space-y-2">
                                {Object.entries(card.deliverables).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 rounded bg-zinc-950 border border-zinc-800">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${value.status === 'ready' ? 'bg-green-500/20 border-green-500 text-green-500' : 'border-zinc-700 bg-zinc-900'}`}>
                                                {value.status === 'ready' && <CheckCircle2 className="h-3 w-3" />}
                                            </div>
                                            <span className={`text-sm ${value.status === 'ready' ? 'text-zinc-300' : 'text-zinc-500'}`}>{key}</span>
                                        </div>
                                        {value.url && (
                                            <a href={value.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                                View <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-500 italic">No deliverables tracked.</p>
                        )}
                    </div>

                    {/* Linked Tickets */}
                    {tickets.length > 0 && (
                        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <TicketIcon className="h-4 w-4" /> Recent Tickets
                            </h3>
                            <div className="space-y-2">
                                {tickets.map(t => (
                                    <div key={t.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded flex items-center justify-between">
                                        <div>
                                            <div className="text-xs text-zinc-400 font-medium mb-0.5">{t.title}</div>
                                            <div className="text-[10px] text-zinc-600 uppercase">{t.status} • {t.priority}</div>
                                        </div>
                                        <Link href="/dashboard/tickets" className="text-zinc-500 hover:text-white">
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Center/Right: Status & Intelligence */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 rounded-xl bg-green-950/20 border border-green-900/30">
                            <div className="flex items-center gap-2 mb-3 text-green-400">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">What Shipped</span>
                            </div>
                            <ul className="space-y-2">
                                {shippedThisWeek.length > 0 ? shippedThisWeek.map((item, i) => (
                                    <li key={i} className="text-sm text-green-100/80">• {item}</li>
                                )) : <span className="text-sm text-zinc-600 italic">Nothing shipped this week yet.</span>}
                            </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-indigo-950/20 border border-indigo-900/30">
                            <div className="flex items-center gap-2 mb-3 text-indigo-400">
                                <Clock className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
                            </div>
                            <ul className="space-y-2">
                                {inProgressItems.map((item, i) => (
                                    <li key={i} className="text-sm text-indigo-100/80">• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-5 rounded-xl bg-orange-950/20 border border-orange-900/30">
                            <div className="flex items-center gap-2 mb-3 text-orange-400">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Risks & Blockers</span>
                            </div>
                            <ul className="space-y-2">
                                {risks.map((item, i) => (
                                    <li key={i} className="text-sm text-orange-100/80">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* AI Executive Summary */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <FileText className="h-64 w-64" />
                        </div>
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                            Strategic Agent Update
                        </h2>
                        <p className="text-lg text-zinc-300 leading-relaxed font-light mb-6 max-w-2xl">
                            {card.aiSummary || "Reviewing latest performance data. Strategy update pending."}
                        </p>

                        <div className="mb-6">
                            <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest bg-zinc-900/50 px-2 py-1 rounded">AI-Assisted Summary</span>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Recommended Next Steps</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {card.nextSteps?.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xs font-bold border border-indigo-500/20">
                                            {i + 1}
                                        </div>
                                        <span className="text-sm text-zinc-300">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Performance Snapshot (Ads only) */}
                    {card.metrics && (
                        <div className="rounded-2xl bg-zinc-900/30 border border-zinc-800 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-emerald-500" /> Performance Snapshot
                                </h3>
                                <span className="text-xs text-zinc-500">Last 7 Days</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <div className="text-xs text-zinc-500 uppercase mb-1">Spend</div>
                                    <div className="text-xl font-bold text-white">${Number(card.metrics.spend).toLocaleString()}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <div className="text-xs text-zinc-500 uppercase mb-1">Impressions</div>
                                    <div className="text-xl font-bold text-white">{(Number(card.metrics.impressions) / 1000).toFixed(1)}k</div>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <div className="text-xs text-zinc-500 uppercase mb-1">ROAS</div>
                                    <div className="text-xl font-bold text-emerald-400">{card.metrics.roas}x</div>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <div className="text-xs text-zinc-500 uppercase mb-1">Clicks</div>
                                    <div className="text-xl font-bold text-white">{Number(card.metrics.clicks).toLocaleString()}</div>
                                </div>
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
