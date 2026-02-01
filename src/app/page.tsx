'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, PlayCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if in PWA/Standalone mode
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
      if (isStandalone) {
        router.replace('/dashboard');
      }
    }
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/landing-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90 backdrop-blur-[2px]"></div>
      </div>

      {/* Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">IMPCTFUL</span>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          Login
        </Link>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-indigo-300 mb-4 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v1.0 Now Available
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            The Operating System for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300">High-Impact Creators</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Stop juggling spreadhseets and disparate tools. IMPCTFUL gives you an AI-powered agency
            workflow to plan, produce, and scale your content empire.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <PlayCircle className="h-5 w-5" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof / Features */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <FeatureItem
              text="AI-Driven Strategy"
              sub="Briefs tailored to your niche."
            />
            <FeatureItem
              text="Production Pipeline"
              sub="Kanban tools built for video."
            />
            <FeatureItem
              text="Agency Management"
              sub="Scale with team workflows."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-zinc-500 text-sm">
        <p>© 2026 IMPCTFUL. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureItem({ text, sub }: { text: string, sub: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="mt-1 p-1 rounded-full bg-indigo-500/20 text-indigo-300">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{text}</h3>
        <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
