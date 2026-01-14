'use client';

import { useStore } from '@/store/useStore';
import { ArrowLeft, Clock, MonitorPlay, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WorkCard } from '@/types';

export default function MeetingPage() {
    const workCards = useStore((state) => state.workCards);
    const tickets = useStore((state) => state.tickets);
    const workspace = useStore((state) => state.workspace);
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    // Active cards only for the meeting
    const activeCards = workCards.filter(c => c.status !== 'completed' && c.status !== 'draft' && c.status !== 'staged'); // Show active work

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="flex-none px-8 py-6 flex items-center justify-between border-b border-zinc-800/50 bg-zinc-900/10 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                        title="Exit Presentation"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            <MonitorPlay className="h-5 w-5 text-indigo-500" />
                            Agency Briefing
                        </h1>
                        <p className="text-sm text-zinc-400">Executive Review • Replaces your weekly status meeting</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-4 py-1.5 shadow-sm">
                    <Clock className="h-4 w-4 text-indigo-400" />
                    <span className="text-sm font-mono text-zinc-300">{time}</span>
                </div>
            </header>

            {/* Main Vertical Scroll Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-12 space-y-12 pb-32">
                {activeCards.length > 0 ? (
                    activeCards.map((card) => {
                        // Count open tickets for this card
                        const linkedTicketCount = tickets.filter(t => t.linkedCardId === card.id && t.status !== 'closed' && t.status !== 'resolved').length;
                        return (
                            <div key={card.id} className="min-h-[70vh] flex flex-col justify-center snap-center">
                                <MeetingWorkSlide card={card} ticketCount={linkedTicketCount} />
                            </div>
                        );
                    })
                ) : (
                    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                        <p className="text-zinc-500 text-lg">No active work items to present.</p>
                    </div>
                )}

                <div className="h-32 flex items-center justify-center text-zinc-600">
                    <p>End of Briefing</p>
                </div>
            </main>
        </div>
    );
}

function MeetingWorkSlide({ card, ticketCount }: { card: WorkCard, ticketCount: number }) {
    return (
        <div className="w-full max-w-6xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl p-8 lg:p-12 flex flex-col lg:flex-row gap-12 ring-1 ring-white/5 backdrop-blur-xl">
            {/* LEFT SIDE: Narrative */}
            <div className="flex-1 space-y-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                            {card.serviceCategory}
                        </span>
                        <div className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${['delivered', 'active'].includes(card.status) ? 'text-green-400' : 'text-zinc-500'}`}>
                            <div className="h-2 w-2 rounded-full bg-current" />
                            {card.status.replace(/_/g, ' ')}
                        </div>
                        <span className="text-xs text-zinc-600 border-l border-zinc-800 pl-3 ml-1">
                            Updated {new Date(card.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{card.title}</h2>
                    <p className="text-xl text-zinc-400 font-light">{card.serviceType}</p>

                    {/* Key Info Row */}
                    <div className="flex items-center gap-6 mt-6">
                        {card.eta && (
                            <div className="flex items-center gap-2 text-sm text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
                                <Clock className="h-4 w-4 text-indigo-400" />
                                <span>ETA: {card.eta}</span>
                            </div>
                        )}
                        {ticketCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-orange-200 bg-orange-950/30 px-3 py-1.5 rounded-full border border-orange-900/40 animate-pulse">
                                <MessageSquare className="h-4 w-4 text-orange-400" />
                                <span>{ticketCount} Open Tickets</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MonitorPlay className="h-24 w-24 text-indigo-500" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Strategic Update
                    </h3>
                    <p className="text-lg text-zinc-200 leading-relaxed relative z-10">
                        {card.aiSummary || "No update available yet."}
                    </p>
                    <div className="mt-4 pt-4 border-t border-zinc-800/50">
                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">AI-Assisted Summary</span>
                    </div>
                </div>

                {card.nextSteps && (
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Next Steps</h4>
                        <ul className="space-y-2">
                            {card.nextSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                                    <span className="text-indigo-500 font-bold">•</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {card.team && card.team.length > 0 && (
                    <div className="pt-4 border-t border-zinc-800/50">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Team Assigned</h4>
                        <div className="flex -space-x-2 overflow-hidden">
                            {card.team.map((member, i) => (
                                <div key={i} className="relative inline-flex items-center justify-center w-8 h-8 rounded-full ring-2 ring-zinc-900 bg-zinc-800" title={`${member.name} (${member.role})`}>
                                    {member.avatarUrl ? (
                                        <img src={member.avatarUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-medium text-zinc-300">{member.name.charAt(0)}</span>
                                    )}
                                    {member.type === 'ai' && (
                                        <div className="absolute -bottom-0.5 -right-0.5 bg-indigo-500 rounded-full p-[2px] ring-1 ring-zinc-900">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex flex-col justify-center ml-4">
                                <span className="text-xs text-zinc-300 font-medium">
                                    {card.team.map(m => m.name).join(', ')}
                                </span>
                                <span className="text-[10px] text-zinc-500">
                                    {card.team.find(m => m.type === 'ai') ? 'AI-Augmented Team' : 'Human Team'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}




            </div>

            {/* RIGHT SIDE: Data / Visuals */}
            <div className="flex-1 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 p-8 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Brief & Metrics</h3>
                    <div className="space-y-4 mb-8">
                        {Object.entries(card.inputs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex justify-between border-b border-zinc-800 pb-2">
                                <span className="text-sm text-zinc-500 capitalize">{key}</span>
                                <span className="text-sm text-zinc-300 font-medium text-right max-w-[60%] truncate">{String(value)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {card.metrics ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                            <div className="text-xs text-zinc-500 uppercase mb-1">Spend</div>
                            <div className="text-2xl font-bold text-white">${Number(card.metrics.spend).toLocaleString()}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                            <div className="text-xs text-zinc-500 uppercase mb-1">ROAS</div>
                            <div className="text-2xl font-bold text-emerald-400">{card.metrics.roas}x</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-800 bg-zinc-900/20">
                        <p className="text-zinc-600 text-sm">No performance data linked</p>
                    </div>
                )}
            </div>
        </div>
    );
}
