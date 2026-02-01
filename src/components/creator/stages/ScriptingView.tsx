import { ArrowLeft, Wand2, FileText, Clock, Save, Copy, Layout, Megaphone, Hash } from 'lucide-react';

interface ScriptingViewProps {
    project: any;
    onBack: () => void;
}

export default function ScriptingView({ project, onBack }: ScriptingViewProps) {
    const type = project.serviceType?.toLowerCase() || '';
    const isAd = type.includes('ad') || type.includes('commercial') || type.includes('ugc');
    const isSocial = type.includes('social') || type.includes('instagram') || type.includes('linkedin') || type.includes('tiktok') || type.includes('short');
    const isYouTube = !isAd && !isSocial; // Default fallback

    const projectLabel = isAd ? "Ad Creative" : isSocial ? "Social Content" : "YouTube Video";

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white leading-tight">{project.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">Scripting</span>
                            <span>•</span>
                            <span className="capitalize">{project.serviceType}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
                        <Save className="h-4 w-4" />
                        Save Draft
                    </button>
                    <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                        {isAd ? "Move to Production" : "Move to Filming"}
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
                            {isAd ? "Variant Generator" : "AI Script Generator"}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">Format</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {isAd ? (
                                        <>
                                            <button className="px-3 py-2 rounded bg-indigo-600/20 border border-indigo-500 text-indigo-300 text-sm font-medium text-center">Problem/Solution</button>
                                            <button className="px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-medium text-center transition-colors">Testimonial</button>
                                        </>
                                    ) : isSocial ? (
                                        <>
                                            <button className="px-3 py-2 rounded bg-indigo-600/20 border border-indigo-500 text-indigo-300 text-sm font-medium text-center">Carousel</button>
                                            <button className="px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-medium text-center transition-colors">Viral Thread</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="px-3 py-2 rounded bg-indigo-600/20 border border-indigo-500 text-indigo-300 text-sm font-medium text-center">In-Depth Tutorial</button>
                                            <button className="px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-medium text-center transition-colors">Vlog/Story</button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">
                                    {isAd ? "Target Outcome" : "Target Duration"}
                                </label>
                                {isAd ? (
                                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-300 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                        <option>Click-Through (Traffic)</option>
                                        <option>Conversion (Sales)</option>
                                        <option>Brand Recall</option>
                                    </select>
                                ) : (
                                    <div className="relative">
                                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-300 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                            {isSocial ? (
                                                <>
                                                    <option>10 Slides (Carousel)</option>
                                                    <option>Short Caption</option>
                                                    <option>Long-Form Story</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option>8-12 Minutes (Mid-Roll)</option>
                                                    <option>15+ Minutes (Deep Dive)</option>
                                                    <option>60 Seconds (Shorts)</option>
                                                </>
                                            )}
                                        </select>
                                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none" />
                                    </div>
                                )}
                            </div>

                            <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-sm font-medium shadow-md transition-all">
                                {isAd ? "Generate Concepts" : "Generate Draft"}
                            </button>
                        </div>
                    </div>

                    {/* Contextual Helper */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-sm">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            {isAd ? <Megaphone className="h-4 w-4 text-orange-400" /> : isSocial ? <Hash className="h-4 w-4 text-blue-400" /> : <FileText className="h-4 w-4 text-emerald-400" />}
                            {isAd ? "Winning Patterns" : isSocial ? "Viral Templates" : "Hook Library"}
                        </h3>

                        <div className="space-y-4">
                            {isAd ? (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs p-2 rounded bg-orange-500/10 border border-orange-500/20 text-orange-300">
                                        <span>"Stop Scroll Pattern"</span>
                                        <span className="font-bold">High CTR</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                                        <span>"Us vs Them"</span>
                                        <span className="font-bold">Good CPA</span>
                                    </div>
                                </div>
                            ) : isSocial ? (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs p-2 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
                                        <span>"Contrarian Take"</span>
                                        <span className="font-bold">High Engagement</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                                        <span>"How-To Listicle"</span>
                                        <span className="font-bold">Great Saves</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                                        <span>"Negative/Warning"</span>
                                        <span className="font-bold">+40% Retention</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                                        <span>"Story/Vlog Intro"</span>
                                        <span className="font-bold">+15% Retention</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Editor */}
                <div className="lg:col-span-2 min-h-[600px] bg-zinc-950 border border-zinc-800/50 rounded-xl p-8 font-mono text-sm text-zinc-300 leading-relaxed shadow-inner">
                    <h1 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">{project.title}</h1>

                    {isAd ? (
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6 pb-4 border-b border-zinc-900">
                                <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Visual / Scene</h4>
                                <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Audio / Script</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-6 group">
                                <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs">
                                    [Scene: Person struggling with messy spreadsheet. Grayscale filter.]
                                </div>
                                <div>
                                    <p className="text-white">"Stop managing your projects like it's 1999."</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 group">
                                <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs">
                                    [Cut to: Clean UI of IMPCTFUL dashboard. Bright colors.]
                                </div>
                                <div>
                                    <p className="text-white">"Meet your new command center. Everything you need, one click away."</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 group">
                                <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs">
                                    [Text Overlay: "Start Free Today"]
                                </div>
                                <div>
                                    <p className="text-white">"Claim your free workspace at impctful.com."</p>
                                </div>
                            </div>
                        </div>
                    ) : isSocial ? (
                        <div className="space-y-6">
                            <Section title="Slide 1 (Hook)">
                                <p>Unpopular opinion: You don't need a 10-step morning routine.</p>
                                <p className="text-zinc-500 italic">[Bg Image: Simple bold text on black]</p>
                            </Section>

                            <Section title="Slide 2 (The Problem)">
                                <p>Most productivity advice is just procrastination in disguise. Here's why...</p>
                            </Section>

                            <Section title="Slide 3 (The Solution)">
                                <p>Focus on ONE big rock per day. That's it.</p>
                            </Section>
                            <Section title="Caption">
                                <p>Stop overcomplicating your mornings. 🛑</p>
                                <br />
                                <p>Simplicity wins. What's your one big rock today?</p>
                                <br />
                                <p>#productivity #focus #mindset</p>
                            </Section>
                        </div>
                    ) : (
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
                    )}
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
