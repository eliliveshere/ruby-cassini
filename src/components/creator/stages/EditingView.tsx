import { ArrowLeft, MonitorPlay, MessageSquare, Check, X, Clock } from 'lucide-react';

interface EditingViewProps {
    project: any;
    onBack: () => void;
}

export default function EditingView({ project, onBack }: EditingViewProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">Editing (Frame.io)</span>
                        <span>•</span>
                        <span>V2 Pending Review</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                        Approve Final Cut
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Player Area */}
                <div className="lg:col-span-2">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden relative group border border-zinc-800 shadow-2xl">
                        {/* Mock Video Player */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MonitorPlay className="h-16 w-16 text-zinc-700 opacity-50" />
                        </div>

                        {/* Player Controls Mock */}
                        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-indigo-500 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments / Frame.io Feed */}
                <div className="flex flex-col h-[600px] bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm flex justify-between items-center">
                        <h3 className="font-semibold text-white">Review Comments</h3>
                        <span className="text-xs text-zinc-500">3 Open</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <Comment
                            user="You"
                            time="09:42 AM"
                            text="The music fade here is a bit abrupt. Can we smooth it out?"
                            timestamp="02:15"
                            status="resolved"
                        />
                        <Comment
                            user="Editor (Mike)"
                            time="10:15 AM"
                            text="Fixed in V2. Checking if the color grade feels right for the mood?"
                            timestamp="02:15"
                            status="open"
                            isEditor
                        />
                        <Comment
                            user="You"
                            time="10:45 AM"
                            text="Color looks good. Just fix the typo in the lower third."
                            timestamp="04:30"
                            status="open"
                        />
                    </div>

                    <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Add a comment at 02:45..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-zinc-800 text-indigo-400">
                                <MessageSquare className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Comment({ user, time, text, timestamp, status, isEditor }: any) {
    return (
        <div className={`flex gap-3 text-sm ${status === 'resolved' ? 'opacity-50' : ''}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${isEditor ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-700 text-zinc-300'}`}>
                {user.charAt(0)}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-zinc-200">{user}</span>
                    <span className="text-xs text-zinc-500">{time}</span>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-800">
                    <p className="text-zinc-300 mb-2">{text}</p>
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 cursor-pointer hover:bg-indigo-500/20">
                            <Clock className="h-3 w-3" />
                            {timestamp}
                        </span>
                        {status === 'open' && (
                            <button className="flex items-center gap-1 text-[10px] font-medium text-zinc-500 hover:text-green-400 transition-colors">
                                <Check className="h-3 w-3" />
                                Resolve
                            </button>
                        )}
                        {status === 'resolved' && (
                            <span className="flex items-center gap-1 text-[10px] font-medium text-green-500">
                                <Check className="h-3 w-3" />
                                Resolved
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
