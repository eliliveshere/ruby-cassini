'use client';

import { useStore } from '@/store/useStore';
import { LayoutDashboard, LogOut, Plus, Settings, Sparkles, Wallet, MessageSquare, CreditCard, Sun, Moon, Compass, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const workspace = useStore((state) => state.workspace);
    const toggleWorkspaceStatus = useStore((state) => state.toggleWorkspaceStatus);
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setMounted(true);
        if (!workspace) {
            router.push('/onboarding');
        }
        // Initialize theme
        const isDarkMode = localStorage.getItem('theme') !== 'light';
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [workspace, router]);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30">
            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="w-72 h-full overflow-hidden border-r border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 flex flex-col backdrop-blur-sm">
                <div className="p-8 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center border border-indigo-500/20 shadow-sm">
                            <Sparkles className="h-5 w-5 text-indigo-400" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">IMPCTFUL</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
                    <nav className="space-y-1.5">
                        <div className="flex items-center gap-1.5 px-3 mb-2 text-zinc-500">
                            <LayoutDashboard className="h-3 w-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Platform</span>
                        </div>
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${pathname === '/dashboard' || pathname?.startsWith('/dashboard/work')
                                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white shadow-inner'
                                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                                }`}
                        >
                            <LayoutDashboard className={`h-4 w-4 transition-colors ${pathname === '/dashboard' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                            Agency Home
                        </Link>

                        {/* Creator Mode: Pipeline Link */}
                        {(useStore.getState().demoArchetype === 'youtube') && (
                            <Link
                                href="/dashboard/pipeline"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${pathname === '/dashboard/pipeline'
                                    ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white shadow-inner'
                                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-colors ${pathname === '/dashboard/pipeline' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}`}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 0 4h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
                                Pipeline
                            </Link>
                        )}

                        <Link
                            href="/dashboard/tickets"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${pathname === '/dashboard/tickets'
                                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white shadow-inner'
                                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                                }`}
                        >
                            <MessageSquare className={`h-4 w-4 transition-colors ${pathname === '/dashboard/tickets' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                            Tickets
                        </Link>

                        <Link
                            href="/dashboard/meeting"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${pathname === '/dashboard/meeting'
                                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white shadow-inner'
                                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                                }`}
                        >
                            <Sparkles className={`h-4 w-4 transition-colors ${pathname === '/dashboard/meeting' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                            Meeting View
                        </Link>
                    </nav>

                    <nav className="space-y-1.5">
                        <div className="flex items-center gap-1.5 px-3 mb-2 text-zinc-500">
                            <User className="h-3 w-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Account</span>
                        </div>
                        <Link
                            href="/dashboard/credits"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${pathname === '/dashboard/credits'
                                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white shadow-inner'
                                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                                }`}
                        >
                            <CreditCard className={`h-4 w-4 transition-colors ${pathname === '/dashboard/credits' ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                            Credits
                        </Link>

                        <Link
                            href="/onboarding"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 group"
                        >
                            <Compass className="h-4 w-4 text-zinc-500 group-hover:text-zinc-400" />
                            Onboarding
                        </Link>

                        <button className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 group">
                            <Settings className="mr-3 h-4 w-4 text-zinc-500 group-hover:text-zinc-400" />
                            Settings
                        </button>
                    </nav>

                    {/* Workspace & Status Cards */}
                    <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-900">
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 p-5 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Available Balance</span>
                                <Wallet className="h-3.5 w-3.5 text-zinc-600" />
                            </div>
                            <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                {workspace?.credits || 0}
                            </div>
                            <button className="mt-4 w-full rounded-md bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors border border-zinc-300 dark:border-zinc-700/50">
                                Buy Credits
                            </button>
                        </div>

                        {/* Feature 9: Global Pause Control */}
                        <div>
                            <button
                                onClick={toggleWorkspaceStatus}
                                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-medium transition-all duration-300 ${workspace?.status === 'paused'
                                    ? 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20'
                                    : 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                                    }`}
                            >
                                <div className="flex flex-col items-start gap-1">
                                    <span className={workspace?.status === 'paused' ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-zinc-500 dark:text-zinc-400'}>
                                        {workspace?.status === 'paused' ? 'Work Paused' : 'Active status'}
                                    </span>
                                    <span className="text-[10px] text-zinc-600">
                                        {workspace?.status === 'paused' ? 'Resume when ready' : 'Pause all operations'}
                                    </span>
                                </div>
                                <div className={`h-2 w-2 rounded-full ring-2 ring-offset-2 ring-offset-zinc-950 ${workspace?.status === 'paused' ? 'bg-amber-500 ring-amber-500/20 animate-pulse' : 'bg-emerald-500/50 ring-emerald-500/10'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800/50 p-4">
                    <div className="flex items-center px-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs ring-1 ring-indigo-500/30">
                            {workspace?.brandName?.[0] || 'A'}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{workspace?.brandName || 'Agency'}</p>
                            <p className="text-xs text-zinc-500">Free Plan</p>
                        </div>
                    </div>
                </div>


                <div className="border-t border-zinc-200 dark:border-zinc-800/50 p-4 flex items-center justify-between">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <button className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div >
    );
}
