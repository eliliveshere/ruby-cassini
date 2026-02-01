import { ArrowLeft, Share2, Hash, Type, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';

interface DistributionViewProps {
    project: any;
    onBack: () => void;
}

export default function DistributionView({ project, onBack }: DistributionViewProps) {
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
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">Distribution</span>
                        <span>•</span>
                        <span>Ready to Publish</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-green-500/20">
                        <Youtube className="h-4 w-4" />
                        Publish to YouTube
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Metadata Generator */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title Generator */}
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Type className="h-4 w-4 text-indigo-400" />
                                Title Options
                            </h3>
                            <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                Regenerate
                            </button>
                        </div>
                        <div className="space-y-3">
                            <RadioOption id="t1" name="title" label="My Coding Setup 2024 (Productivity Hacks)" badge="SEO Optimized" checked />
                            <RadioOption id="t2" name="title" label="Stop Wasting Time: The Ultimate Dev Environment" badge="High CTR" />
                            <RadioOption id="t3" name="title" label="How I Code 10x Faster" />
                        </div>
                    </div>

                    {/* Description & Chapters */}
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4">Description & Chapters</h3>
                        <textarea
                            className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-300 focus:ring-1 focus:ring-green-500 focus:border-green-500 font-mono leading-relaxed"
                            defaultValue={`In this video, I break down my entire 2024 coding setup for maximum productivity.

TIMESTAMPS:
00:00 - Intro
01:30 - The Chair (Herman Miller)
04:15 - VS Code Extensions
...

LINKS:
...`}
                        />
                    </div>

                    {/* Tags */}
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Hash className="h-4 w-4 text-indigo-400" />
                                Tags
                            </h3>
                            <button className="text-xs text-zinc-500 hover:text-white">Copy All</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['coding setup', 'desk setup 2024', 'developer productivity', 'vs code', 'macbook pro m3', 'software engineer'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-400 flex items-center gap-1">
                                    {tag}
                                    <button className="hover:text-white"><XIcon className="h-3 w-3" /></button>
                                </span>
                            ))}
                            <button className="px-3 py-1 border border-dashed border-zinc-700 rounded-full text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors">
                                + Add Tag
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Pre-Checks */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4">Pre-Publish Checklist</h3>
                        <div className="space-y-4">
                            <CheckItem label="Copyright Check Passed" status="pass" />
                            <CheckItem label="Ad Suitability" status="pass" />
                            <CheckItem label="Subtitles Generated" status="pass" />
                            <CheckItem label="End Screen Added" status="fail" />
                            <CheckItem label="Info Cards Added" status="pending" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/20 to-zinc-900/50 border border-green-900/30 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-green-400 mb-2">Predicted Performance</h3>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-white">8.5/10</span>
                        </div>
                        <p className="text-xs text-green-200/60 mb-4">Based on title, thumbnail, and topic trend.</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Est. CTR</span>
                                <span className="text-white">7.2% - 9.5%</span>
                            </div>
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Est. View Duration</span>
                                <span className="text-white">5:30 - 6:45</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckItem({ label, status }: { label: string, status: 'pass' | 'fail' | 'pending' }) {
    const iconColor = status === 'pass' ? 'text-emerald-500' : status === 'fail' ? 'text-red-500' : 'text-zinc-600';
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-300">{label}</span>
            {status === 'pass' && <CheckCircle2 className={`h-4 w-4 ${iconColor}`} />}
            {status === 'fail' && <XIcon className={`h-4 w-4 ${iconColor}`} />}
            {status === 'pending' && <div className="h-4 w-4 rounded-full border-2 border-zinc-700 border-t-zinc-400 animate-spin" />}
        </div>
    );
}

function RadioOption({ id, name, label, badge, checked }: any) {
    return (
        <label htmlFor={id} className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-950/50 cursor-pointer hover:bg-zinc-900 transition-colors">
            <input type="radio" id={id} name={name} defaultChecked={checked} className="mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
            <div className="flex-1">
                <span className="text-sm text-zinc-200 block font-medium mb-1">{label}</span>
                {badge && <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded border border-green-900/30">{badge}</span>}
            </div>
        </label>
    );
}

function XIcon({ className }: { className?: string }) { // Lucide X is generic
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
    )
}
