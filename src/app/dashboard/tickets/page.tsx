'use client';

import { useStore } from '@/store/useStore';
import { Ticket, TicketMessage, TicketStatus, TicketType, TicketPriority } from '@/types';
import { AlertCircle, CheckCircle2, Clock, MessageSquare, Plus, Send, X, Filter, Link as LinkIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function TicketsPage() {
    const tickets = useStore((state) => state.tickets);
    const workCards = useStore((state) => state.workCards);
    const createTicket = useStore((state) => state.createTicket);
    const addTicketMessage = useStore((state) => state.addTicketMessage);
    const workspace = useStore((state) => state.workspace);

    // UI State
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

    // Filters
    const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');

    // New Ticket Form State
    const [newTicketTitle, setNewTicketTitle] = useState('');
    const [newTicketType, setNewTicketType] = useState<TicketType>('request');
    const [newTicketPriority, setNewTicketPriority] = useState<TicketPriority>('normal');
    const [newTicketMessage, setNewTicketMessage] = useState('');
    const [newTicketLinkedCard, setNewTicketLinkedCard] = useState('');

    // Reply State
    const [replyText, setReplyText] = useState('');

    const filteredTickets = tickets.filter(t =>
        statusFilter === 'all' ? true : t.status === statusFilter
    );

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);
    const linkedCard = selectedTicket?.linkedCardId ? workCards.find(c => c.id === selectedTicket.linkedCardId) : null;

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!workspace) return;

        const ticketId = `tick-${Date.now()}`;
        const newTicket: Ticket = {
            id: ticketId,
            workspaceId: workspace.id,
            title: newTicketTitle,
            type: newTicketType,
            status: 'open',
            priority: newTicketPriority,
            linkedCardId: newTicketLinkedCard || undefined,
            messages: [
                {
                    id: `msg-${Date.now()}`,
                    senderId: 'user', // mock
                    senderType: 'user',
                    text: newTicketMessage,
                    timestamp: new Date().toISOString(),
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        createTicket(newTicket);

        // Auto-reply based on Type
        let autoReplyText = "";
        switch (newTicketType) {
            case 'clarification': autoReplyText = "We need one quick confirmation before proceeding. Please check the thread."; break;
            case 'revision': autoReplyText = "Revision received. We’ll confirm scope and timing shortly."; break;
            case 'issue': autoReplyText = "Thanks for flagging this. We’re prioritizing it now."; break;
            case 'request': autoReplyText = "Request received. We’ll assess scope and credits if needed."; break;
            default: autoReplyText = "Update received. We will be in touch shortly.";
        }

        setTimeout(() => {
            addTicketMessage(ticketId, {
                id: `msg-sys-${Date.now()}`,
                senderId: 'agent',
                senderType: 'agent',
                text: autoReplyText,
                timestamp: new Date().toISOString(),
            });
        }, 1000);

        setIsNewTicketOpen(false);
        resetForm();
        setSelectedTicketId(ticketId);
    };

    const resetForm = () => {
        setNewTicketTitle('');
        setNewTicketMessage('');
        setNewTicketLinkedCard('');
        setNewTicketPriority('normal');
        setNewTicketType('request');
    };

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTicketId || !replyText.trim()) return;

        addTicketMessage(selectedTicketId, {
            id: `msg-${Date.now()}`,
            senderId: 'user',
            senderType: 'user',
            text: replyText,
            timestamp: new Date().toISOString(),
        });

        setReplyText('');
    };

    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
            case 'open': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'in_progress': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'waiting_on_client': return 'text-orange-400 bg-orange-400/10 border-orange-400/20 animate-pulse';
            case 'resolved': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'closed': return 'text-zinc-500 bg-zinc-800 border-zinc-700';
            default: return 'text-zinc-400';
        }
    };

    const getPriorityBadge = (p: TicketPriority) => {
        if (p === 'high') return <span className="text-[10px] font-bold uppercase text-red-400 bg-red-950/50 px-1.5 py-0.5 rounded border border-red-900/50">High</span>;
        return null;
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-zinc-950">

            {/* Sidebar List */}
            <div className={`w-full md:w-96 border-r border-zinc-800 flex flex-col bg-zinc-900/30 ${selectedTicketId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-zinc-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <h2 className="text-lg font-semibold text-white">Tickets</h2>
                        <button
                            onClick={() => setIsNewTicketOpen(true)}
                            className="p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors w-full md:w-auto flex justify-center"
                            title="New Ticket"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    {/* Filters */}
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 rounded px-2 py-1 flex-1"
                        >
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="waiting_on_client">Waiting on Client</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {filteredTickets.map(ticket => (
                        <button
                            key={ticket.id}
                            onClick={() => setSelectedTicketId(ticket.id)}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedTicketId === ticket.id
                                ? 'bg-zinc-800 border-indigo-500/50 shadow-md'
                                : 'bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-800'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase border ${getStatusColor(ticket.status)}`}>
                                        {ticket.status.replace(/_/g, ' ')}
                                    </span>
                                    {getPriorityBadge(ticket.priority)}
                                </div>
                                <span className="text-[10px] text-zinc-600">
                                    {new Date(ticket.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-white mb-1 truncate">{ticket.title}</h3>
                            <p className="text-xs text-zinc-400 truncate">
                                {ticket.messages[ticket.messages.length - 1]?.text}
                            </p>
                        </button>
                    ))}

                    {filteredTickets.length === 0 && (
                        <div className="text-center py-10 px-4">
                            <MessageSquare className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
                            <p className="text-zinc-500 text-sm">No tickets found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content: Conversation */}
            <div className={`flex-1 flex-col bg-zinc-950 z-0 ${selectedTicketId ? 'flex' : 'hidden md:flex'}`}>
                {selectedTicket ? (
                    <>
                        {/* Header */}
                        <div className="h-20 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-zinc-900/20">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSelectedTicketId(null)}
                                    className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                                <div>
                                    <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                                        {selectedTicket.title}
                                        {getPriorityBadge(selectedTicket.priority)}
                                    </h2>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 uppercase tracking-wider">
                                        <span>{selectedTicket.type}</span>
                                        <span>•</span>
                                        <span>ID: {selectedTicket.id}</span>
                                    </div>
                                </div>
                                {linkedCard && (
                                    <Link href={`/dashboard/work/${linkedCard.id}`} className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                                        <LinkIcon className="h-3 w-3" />
                                        Linked: {linkedCard.title}
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Waiting on Client Banner */}
                        {selectedTicket.status === 'waiting_on_client' && (
                            <div className="bg-orange-500/10 border-b border-orange-500/20 px-6 py-2 flex items-center gap-2 text-orange-400 text-sm">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="font-medium">Action Required:</span> The team is waiting for your input to proceed.
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {selectedTicket.messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl p-4 ${msg.senderType === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-sm'
                                        : 'bg-zinc-800 text-zinc-200 rounded-tl-sm border border-zinc-700'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                        <div className={`text-[10px] mt-2 opacity-60 flex justify-between gap-4 ${msg.senderType === 'user' ? 'text-indigo-200' : 'text-zinc-400'}`}>
                                            <span className="capitalize">{msg.senderType === 'agent' ? 'IMPCTFUL Agent' : 'You'}</span>
                                            <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendReply} className="p-4 border-t border-zinc-800 bg-zinc-900/30">
                            <div className="relative">
                                <input
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-full pl-6 pr-12 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-zinc-600"
                                    placeholder="Type a message..."
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
                                    disabled={!replyText.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-600">
                        <div className="text-center">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>Select a ticket to view the conversation</p>
                        </div>
                    </div>
                )}
            </div>

            {/* New Ticket Modal */}
            {isNewTicketOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsNewTicketOpen(false)} />
                    <div className="relative w-full max-w-lg bg-zinc-900 rounded-xl border border-zinc-800 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Open New Ticket</h3>
                            <button onClick={() => setIsNewTicketOpen(false)} className="text-zinc-500 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>

                        <form onSubmit={handleCreateTicket} className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Subject</label>
                                <input
                                    required
                                    value={newTicketTitle}
                                    onChange={(e) => setNewTicketTitle(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-indigo-500"
                                    placeholder="Brief summary of issue or request"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">Type</label>
                                    <select
                                        value={newTicketType}
                                        onChange={(e) => setNewTicketType(e.target.value as TicketType)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-indigo-500"
                                    >
                                        <option value="request">New Request</option>
                                        <option value="revision">Revision</option>
                                        <option value="issue">Issue</option>
                                        <option value="clarification">Clarification</option>
                                        <option value="announcement">Announcement</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">Priority</label>
                                    <select
                                        value={newTicketPriority}
                                        onChange={(e) => setNewTicketPriority(e.target.value as TicketPriority)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-indigo-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Link Work Card (Optional)</label>
                                <select
                                    value={newTicketLinkedCard}
                                    onChange={(e) => setNewTicketLinkedCard(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-indigo-500"
                                >
                                    <option value="">No linked work</option>
                                    {workCards.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newTicketMessage}
                                    onChange={(e) => setNewTicketMessage(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:ring-indigo-500"
                                    placeholder="Describe your request..."
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-md transition-colors">
                                Submit Ticket
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
