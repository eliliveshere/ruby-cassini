import { ArrowLeft, Wand2, FileText, Clock, Save } from 'lucide-react';

interface ScriptingViewProps {
    project: any;
    onBack: () => void;
}

export default function ScriptingView({ project, onBack }: ScriptingViewProps) {
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
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">Scripting</span>
                        <span>•</span>
                        <span>Last edited 2m ago</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
                        <Save className="h-4 w-4" />
                        Save Draft
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                        Move to Filming
                    </button>
                </div>
            </div>

            {/* Main Editor Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: AI Tools */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Wand2 className="h-4 w-4 text-indigo-400" />
                            AI Script Generator
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">Format</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="px-3 py-2 rounded bg-indigo-600/20 border border-indigo-500 text-indigo-300 text-sm font-medium text-center">In-Depth Tutorial</button>
                                    <button className="px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-medium text-center transition-colors">Vlog/Story</button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">Target Duration</label>
                                <div className="relative">
                                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-300 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                        <option>8-12 Minutes (Mid-Roll)</option>
                                        <option>15+ Minutes (Deep Dive)</option>
                                        <option>60 Seconds (Shorts)</option>
                                    </select>
                                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none" />
                                </div>
                            </div>

                            <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-sm font-medium shadow-md transition-all">
                                Generate Outline
                            </button>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                        <h3 className="text-sm font-bold text-white mb-4">Research Notes</h3>
                        <div className="text-sm text-zinc-400 space-y-2">
                            <p className="border-l-2 border-indigo-500 pl-3">Mention the new Vercel updates from yesterday.</p>
                            <p className="border-l-2 border-indigo-500 pl-3">Compare cost vs open source alternatives.</p>
                        </div>
                    </div>
                </div>

                {/* Right: Editor */}
                <div className="lg:col-span-2 min-h-[600px] bg-zinc-950 border border-zinc-800/50 rounded-xl p-8 font-mono text-sm text-zinc-300 leading-relaxed shadow-inner">
                    <h1 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">{project.title}</h1>

                    <div className="space-y-6">
                        <Section title="00:00 - Hook">
                            <p>Stop wasting time setting up your dev environment. In this video, I'm showing you the ultimate 2024 coding setup that saves me 10 hours a week.</p>
                        </Section>

                        <Section title="01:30 - The Hardware">
                            <p className="text-zinc-500 italic">[B-Roll: Desk pan, keyboard clacking sound]</p>
                            <p>First, let's talk about the chair. Ergonomics isn't just a buzzword...</p>
                        </Section>

                        <Section title="04:15 - Software Stack">
                            <p>VS Code is great, but have you tried...</p>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h4 className="text-indigo-400 font-bold mb-2 text-xs uppercase tracking-wider bg-indigo-500/10 inline-block px-2 py-1 rounded">{title}</h4>
            <div className="pl-2 border-l border-zinc-800 space-y-2">
                {children}
            </div>
        </div>
    );
}
