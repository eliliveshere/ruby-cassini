'use client';

import { Zap, TrendingUp, Lightbulb, BarChart, Tag, ArrowUp, ArrowDown, Activity, Sun, Moon, MessageSquare, X, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';


// ... imports

// --- DYNAMIC DATA ---
const BRIEFING_DATA: Record<string, any> = {
    "Tech & Coding": {
        stats: [
            { label: "Videos", value: "45.2K", diff: "+12%", icon: Activity },
            { label: "Subs", value: "+185", diff: "+5%", icon: TrendingUp },
            { label: "Retention", value: "42%", diff: "-2%", icon: BarChart, negative: true },
            { label: "Velocity", value: "12/hr", diff: "+8%", icon: MessageSquare }
        ],
        ideas: [
            {
                title: "Is Cursor the End of VS Code?",
                reason: "High velocity cluster. Viewers stopped scrolling at 'VS Code'.",
                confidence: "High Confidence",
                tagColor: "indigo",
                basedOn: "Last 2 Videos"
            },
            {
                title: "Day in the Life: Senior Engineer",
                reason: "Lifestyle videos seeing +45% retention on weekends.",
                confidence: "Trending Format",
                tagColor: "emerald",
                basedOn: "Comment Sentiment"
            },
            {
                title: "Next.js 15: Everything Changed",
                reason: "Competitors gaining rank. Haven't covered core updates in 45d.",
                confidence: "Gap Fill",
                tagColor: "amber",
                basedOn: "Gap Analysis"
            }
        ],
        trends: [
            { topic: "AI Agents", relevance: "High", reason: "+200% search volume.", type: "Tech", volume: "125K", trend: "up" },
            { topic: "Cursor vs VS Code", relevance: "Medium", reason: "Comparison request.", type: "Tools", volume: "85K", trend: "up" },
            { topic: "Minimal Desk Setup", relevance: "Low", reason: "Evergreen content.", type: "Lifestyle", volume: "300K", trend: "stable" }
        ],
        insights: [
            { title: "Editor Idle", description: "No activity for 48h on 'Coding Setup'.", action: "Send Reminder", level: "critical" },
            { title: "Production Gap", description: "Nothing scheduled for Tuesday.", action: "Open Script", level: "warning" }
        ]
    },
    "Lifestyle & Vlog": {
        stats: [
            { label: "Reach", value: "125K", diff: "+22%", icon: Activity },
            { label: "Followers", value: "+850", diff: "+15%", icon: TrendingUp },
            { label: "Engagement", value: "8.5%", diff: "+1%", icon: BarChart },
            { label: "Shares", value: "1.2K", diff: "+40%", icon: MessageSquare }
        ],
        ideas: [
            {
                title: "NYC Apartment Tour 2024",
                reason: "High aesthetic appeal. 'Tour' keywords trending.",
                confidence: "Viral Potential",
                tagColor: "indigo",
                basedOn: "Pinterest Trends"
            },
            {
                title: "Sunday Reset Routine",
                reason: "Sunday uploads perform 2x better for this topic.",
                confidence: "Consistent",
                tagColor: "emerald",
                basedOn: "Past Performance"
            },
            {
                title: "Travel Essentials: Tokyo",
                reason: "Audience asking for packing tips.",
                confidence: "Request",
                tagColor: "amber",
                basedOn: "Q&A Sticker"
            }
        ],
        trends: [
            { topic: "Slow Living", relevance: "High", reason: "Aesthetic shift.", type: "Vibe", volume: "2M", trend: "up" },
            { topic: "Digital Camera", relevance: "Medium", reason: "Retro tech trend.", type: "Tech", volume: "500K", trend: "up" },
            { topic: "Matcha Recipes", relevance: "Low", reason: "Seasonal dip.", type: "Food", volume: "150K", trend: "down" }
        ],
        insights: [
            { title: "Copyright Claim", description: "Background music in 'Vlog #4' flagged.", action: "Review Audio", level: "critical" },
            { title: "Brand Deal", description: "Skincare brand requested rates.", action: "Reply", level: "warning" }
        ]
    },
    "Finance & Business": {
        stats: [
            { label: "Views", value: "12.5K", diff: "+5%", icon: Activity },
            { label: "Leads", value: "+45", diff: "+12%", icon: TrendingUp },
            { label: "CPM", value: "$24.50", diff: "+2%", icon: BarChart },
            { label: "Comments", value: "120", diff: "-5%", icon: MessageSquare, negative: true }
        ],
        ideas: [
            {
                title: "Market Crash Incoming?",
                reason: "Fear-based titles driving CTR in niche right now.",
                confidence: "High CTR",
                tagColor: "indigo",
                basedOn: "Competitor Analysis"
            },
            {
                title: "How to Invest $1k in 2024",
                reason: "Beginner content gap in your library.",
                confidence: "Evergreen",
                tagColor: "emerald",
                basedOn: "Search Volume"
            },
            {
                title: "Fed Interest Rate Reaction",
                reason: "Newsjacking opportunity. Event is tomorrow.",
                confidence: "Timely",
                tagColor: "amber",
                basedOn: "News Calendar"
            }
        ],
        trends: [
            { topic: "Crypto ETF", relevance: "High", reason: "Regulatory news.", type: "Finance", volume: "800K", trend: "up" },
            { topic: "Side Hustles", relevance: "Medium", reason: "Q1 motivation.", type: "Business", volume: "1.2M", trend: "stable" },
            { topic: "Real Estate", relevance: "Low", reason: "Rate uncertainty.", type: "Investing", volume: "400K", trend: "down" }
        ],
        insights: [
            { title: "Sponsor Renewal", description: "Trading app contract expires in 3 days.", action: "Renewal Call", level: "warning" },
            { title: "Low CTR", description: "Yesterday's thumbnail underperforming (2.1%).", action: "A/B Test", level: "critical" }
        ]
    },
    "Education": {
        stats: [
            { label: "Students", value: "85K", diff: "+8%", icon: Activity },
            { label: "Watch Time", value: "15K hr", diff: "+12%", icon: TrendingUp },
            { label: "Shares", value: "450", diff: "+5%", icon: BarChart },
            { label: "Completion", value: "65%", diff: "+2%", icon: MessageSquare }
        ],
        ideas: [
            {
                title: "The Roman Empire: Deep Dive",
                reason: "Long-form history docs suggest high retention.",
                confidence: "High Retention",
                tagColor: "indigo",
                basedOn: "YouTube Analytics"
            },
            {
                title: "Explain Quantum Physics",
                reason: "Complex topics simplified are viral prone.",
                confidence: "Viral",
                tagColor: "emerald",
                basedOn: "Audience Poll"
            },
            {
                title: "5 Study Hacks",
                reason: "Exam season approaching.",
                confidence: "Timely",
                tagColor: "amber",
                basedOn: "Seasonality"
            }
        ],
        trends: [
            { topic: "EdTech", relevance: "Medium", reason: "AI tools in class.", type: "Tech", volume: "200K", trend: "up" },
            { topic: "Visual Learning", relevance: "High", reason: "Animation style trending.", type: "Format", volume: "N/A", trend: "up" },
            { topic: "Homeschooling", relevance: "Low", reason: "Steady baseline.", type: "Niche", volume: "50K", trend: "stable" }
        ],
        insights: [
            { title: "Fact Check Needed", description: "Source link 4 broken in script.", action: "Fix Link", level: "warning" },
            { title: "Audio Glitch", description: "Reports of static at 04:20 in latest vid.", action: "Re-upload", level: "critical" }
        ]
    },
    "Entertainment": {
        stats: [
            { label: "Views", value: "1.2M", diff: "+150%", icon: Activity },
            { label: "Shares", value: "45K", diff: "+200%", icon: TrendingUp },
            { label: "Saves", value: "12K", diff: "+80%", icon: BarChart },
            { label: "Comments", value: "3.4K", diff: "+100%", icon: MessageSquare }
        ],
        ideas: [
            {
                title: "POV: You're layout off",
                reason: "Relatable corporate humor trending on Reels.",
                confidence: "Viral",
                tagColor: "indigo",
                basedOn: "Reels Trend"
            },
            {
                title: "Reaction to Met Gala",
                reason: "High search volume event.",
                confidence: "Timely",
                tagColor: "emerald",
                basedOn: "Twitter Trends"
            },
            {
                title: "Skit: First Date",
                reason: "Evergreen comedy format.",
                confidence: "Safe Bet",
                tagColor: "amber",
                basedOn: "Library"
            }
        ],
        trends: [
            { topic: "CapCut Template", relevance: "High", reason: "Easy viral format.", type: "Tool", volume: "5M", trend: "up" },
            { topic: "Trending Auido #4", relevance: "High", reason: "Peaking now.", type: "Audio", volume: "10M", trend: "up" },
            { topic: "Dance Challenge", relevance: "Low", reason: "Oversaturated.", type: "Dance", volume: "20M", trend: "down" }
        ],
        insights: [
            { title: "Sound Removed", description: "Viral video audio muted by platform.", action: "Swap Audio", level: "critical" },
            { title: "Collab Request", description: "Big creator DM'd for collab.", action: "Respond", level: "warning" }
        ]
    }
};

type ActiveItemType = {
    type: 'idea' | 'trend' | 'insight';
    data: any;
};

export default function MorningBriefingDashboard() {
    const creatorProfile = useStore((state) => state.creatorProfile);
    const loadDemoData = useStore((state) => state.loadDemoData);
    const [isDark, setIsDark] = useState(true);
    const [activeItem, setActiveItem] = useState<ActiveItemType | null>(null);
    const router = useRouter();

    const currentNiche = creatorProfile?.niche || "Tech & Coding";
    const data = BRIEFING_DATA[currentNiche] || BRIEFING_DATA["Tech & Coding"];

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleAction = (action: string) => {
        if (action === 'script') {
            router.push('/dashboard/new-project');
        }
        setActiveItem(null);
    };

    return (
        <div className="max-w-[1600px] mx-auto p-4 pb-32 lg:p-12 animate-in fade-in duration-700 space-y-8 relative">
            <header className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">Morning Briefing</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Daily insights and trends tailored for your <strong>{currentNiche}</strong> channel.</p>
                </div>
                {/* Theme toggle is hidden on mobile, but if we add more controls they should stack */}
                <div className="flex items-center gap-2">
                    <select
                        className="hidden md:block bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 border-none rounded-lg py-2 px-3 text-sm font-medium outline-none cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors mr-2"
                        value={creatorProfile?.niche || 'Tech & Coding'}
                        onChange={(e) => loadDemoData(e.target.value)}
                    >
                        <option value="Tech & Coding">Demo: Tech & Coding</option>
                        <option value="Lifestyle & Vlog">Demo: Lifestyle</option>
                        <option value="Finance & Business">Demo: Finance</option>
                        <option value="Education">Demo: Education</option>
                        <option value="Entertainment">Demo: Entertainment</option>
                    </select>
                    <button
                        onClick={toggleTheme}
                        className="hidden md:block p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {data.stats.map((stat: any, i: number) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            {/* 1. Feedback -> Idea Loop */}
            <section>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg">
                            <Lightbulb className="h-4 w-4" />
                        </span>
                        What to Make Today
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.ideas.map((idea: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => setActiveItem({ type: 'idea', data: idea })}
                            className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm cursor-pointer hover:border-zinc-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-bold uppercase tracking-wider text-${idea.tagColor}-600 dark:text-${idea.tagColor}-400 bg-${idea.tagColor}-100 dark:bg-${idea.tagColor}-900/30 px-2 py-0.5 rounded`}>
                                    {idea.confidence}
                                </span>
                            </div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">"{idea.title}"</h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                {idea.reason}
                            </p>
                            <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-[10px] text-zinc-500">Based on:</span>
                                <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{idea.basedOn}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Production Intelligence (Bottlenecks) */}
            <section>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="bg-red-500/10 text-red-500 p-1.5 rounded-lg">
                        <Activity className="h-4 w-4" />
                    </span>
                    Production Intelligence
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.insights.map((insight: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => setActiveItem({ type: 'insight', data: insight })}
                            className={`border rounded-xl p-4 flex items-start gap-4 cursor-pointer transition-colors ${insight.level === 'critical' ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30' : 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/30'}`}
                        >
                            <div className={`p-2 rounded-lg ${insight.level === 'critical' ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'}`}>
                                {insight.level === 'critical' ? <Zap className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">{insight.title}</h4>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{insight.description}</p>
                                <button className={`mt-2 text-xs font-medium ${insight.level === 'critical' ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300' : 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300'}`}>{insight.action} →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Topics Expanded */}
            <section>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 p-1.5 rounded-lg">
                            <TrendingUp className="h-4 w-4" />
                        </span>
                        Market Trends
                    </h2>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 w-full md:w-auto text-left md:text-right">View All Trends</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.trends.map((trend: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => setActiveItem({ type: 'trend', data: trend })}
                            className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group flex flex-col h-full shadow-sm dark:shadow-none"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                                    {trend.type}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                                        <BarChart className="h-3 w-3" />
                                        {trend.volume}
                                    </div>
                                    {trend.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                                    {trend.trend === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
                                    {trend.trend === 'stable' && <div className="h-0.5 w-2 bg-zinc-600" />}
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                                {trend.topic}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                                {trend.reason}
                            </p>

                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tag className="h-3 w-3 text-zinc-400 dark:text-zinc-600" />
                                    <span className="text-xs text-zinc-500">{trend.relevance} Relevance</span>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-medium text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Lightbulb className="h-3 w-3" />
                                    Generate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Detail Modal */}
            {activeItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveItem(null)} />
                    <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setActiveItem(null)}
                            className="absolute right-4 top-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Modal Content based on Type */}
                        <div className="mt-2">
                            {activeItem.type === 'idea' && (
                                <>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
                                            <Lightbulb className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Project Concept</h3>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{activeItem.data.title}</h4>
                                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{activeItem.data.reason}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Confidence Score</div>
                                            <div className="text-2xl font-bold text-green-400">92%</div>
                                        </div>
                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Retention Est.</div>
                                            <div className="text-2xl font-bold text-indigo-400">45%</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAction('script')}
                                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mb-2"
                                    >
                                        <Play className="h-4 w-4 fill-current" />
                                        Start Scripting Now
                                    </button>
                                </>
                            )}

                            {activeItem.type === 'trend' && (
                                <>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Trend Analysis</h3>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{activeItem.data.topic}</h4>
                                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                                        <span className="flex items-center gap-1.5"><BarChart className="h-4 w-4" /> {activeItem.data.volume} Vol</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${activeItem.data.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>{activeItem.data.trend} Trending</span>
                                    </div>

                                    <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 mb-6">
                                        <h5 className="text-sm font-semibold text-white mb-2">Why it matters</h5>
                                        <p className="text-xs text-zinc-400 leading-relaxed">{activeItem.data.reason}</p>
                                    </div>

                                    <button
                                        onClick={() => handleAction('script')}
                                        className="w-full py-3 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Lightbulb className="h-4 w-4" />
                                        Generate 5 Video Ideas
                                    </button>
                                </>
                            )}

                            {activeItem.type === 'insight' && (
                                <>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`p-2 rounded-lg border ${activeItem.data.level === 'critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                            <Activity className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Action Required</h3>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{activeItem.data.title}</h4>
                                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{activeItem.data.description}</p>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="w-full py-3 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                            {activeItem.data.action}
                                        </button>
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="w-full py-3 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                                        >
                                            Ignore / Dismiss
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, diff, icon: Icon, negative }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm dark:shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
                <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            </div>
            <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</span>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${negative ? 'text-red-400 bg-red-900/20' : 'text-emerald-400 bg-emerald-900/20'}`}>
                    {diff}
                </span>
            </div>
        </div>
    );
}
