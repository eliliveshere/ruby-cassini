'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { ServiceCategory } from '@/types';
import { ONBOARDING_STEPS, INTRO_COPY } from '@/constants/onboarding';

export default function OnboardingPage() {
    const router = useRouter();
    const initializeUser = useStore((state) => state.initializeUser);
    const setOnboardingSelections = useStore((state) => state.setOnboardingSelections);

    // State
    const [stepIndex, setStepIndex] = useState(0); // 0 = Intro, 1-6 = Diagnostic, 7 = Summary
    const [brandName, setBrandName] = useState('');
    const [website, setWebsite] = useState('');
    // Store selections: Category -> Array of selected services
    const [selections, setSelections] = useState<Record<ServiceCategory, string[]>>({
        'Video & Production': [],
        'Paid Growth': [],
        'Social & Content': [],
        'Strategy & Planning': [],
        'Conversion & Funnels': [],
        'Launch Support': []
    });

    const currentDiagnosticStep = ONBOARDING_STEPS.find(s => s.id === stepIndex);
    const isIntro = stepIndex === 0;
    const isSummary = stepIndex === 7;

    const handleServiceToggle = (category: ServiceCategory, service: string) => {
        const current = selections[category] || [];
        const updated = current.includes(service)
            ? current.filter(s => s !== service)
            : [...current, service];
        setSelections({ ...selections, [category]: updated });
    };

    const handleNext = () => {
        setStepIndex(prev => prev + 1);
    };

    const handleBack = () => {
        if (stepIndex > 0) setStepIndex(prev => prev - 1);
    };

    const handleComplete = () => {
        // Collect all data and initialize
        // Collect all data and initialize
        initializeUser(brandName, website, undefined, undefined, undefined);
        setOnboardingSelections(selections);
        // Redirect to Project Selection
        router.push('/onboarding/projects');
    };

    // Calculate progress
    const progress = (stepIndex / 7) * 100;

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30 font-sans">

            {/* Progress Bar (omitted on Intro) */}
            {!isIntro && !isSummary && (
                <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* STEP 0: INTRO & BASICS */}
                {isIntro && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="flex justify-center mb-8">
                            <div className="h-16 w-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                                <Sparkles className="h-8 w-8 text-indigo-400" />
                            </div>
                        </div>

                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">{INTRO_COPY.title}</h1>
                            <p className="text-xl text-indigo-400 font-medium mb-4">{INTRO_COPY.subtitle}</p>
                            <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto">{INTRO_COPY.body}</p>
                        </div>

                        {/* Basic Info Collection First */}
                        <div className="space-y-4 mb-8 bg-zinc-950/50 p-6 rounded-xl border border-zinc-800">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Brand Name</label>
                                <input
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                    placeholder="Enter your company name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Website (Optional)</label>
                                <input
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                    placeholder="yourwebsite.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            {INTRO_COPY.bullets.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-indigo-500/80 flex-shrink-0" />
                                    <span className="text-zinc-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!brandName}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                            Start Diagnostic
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* STEPS 1-6: DIAGNOSTIC */}
                {currentDiagnosticStep && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-4 right-6 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                            Step {currentDiagnosticStep.id} of 6
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">{currentDiagnosticStep.title}</h2>
                            <p className="text-lg text-indigo-400">{currentDiagnosticStep.description}</p>
                        </div>

                        <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {currentDiagnosticStep.services.map((service) => {
                                const isSelected = selections[currentDiagnosticStep.category]?.includes(service);
                                return (
                                    <button
                                        key={service}
                                        onClick={() => handleServiceToggle(currentDiagnosticStep.category, service)}
                                        className={`w-full flex items-center p-4 rounded-xl border text-left transition-all group ${isSelected
                                            ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                            : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950'
                                            }`}
                                    >
                                        <div className={`h-6 w-6 rounded-md border flex items-center justify-center mr-4 transition-colors ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-600'
                                            }`}>
                                            {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                                            {service}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Nothing Needed Checkbox equivalent (implied by empty selection, but visual cue helps) */}
                        <div className="mb-8 p-4 bg-zinc-950/30 rounded-lg border border-zinc-800/50 flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-zinc-500" />
                            <p className="text-sm text-zinc-500">Select only what you need. If none apply, click Continue.</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                            <button onClick={handleBack} className="text-zinc-500 hover:text-white px-4 py-2 text-sm">
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
                            >
                                Continue
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 7: SUMMARY */}
                {isSummary && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl">
                        <div className="text-center mb-8">
                            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 text-green-500 mb-4 ring-1 ring-green-500/20">
                                <CheckCircle2 className="h-6 w-6" />
                            </span>
                            <h2 className="text-2xl font-bold text-white mb-2">You're all set.</h2>
                            <p className="text-zinc-400">Here’s what we’ll focus on first.</p>
                        </div>

                        <div className="space-y-6 mb-8 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800 max-h-[400px] overflow-y-auto">
                            {Object.entries(selections).map(([cat, services]) => {
                                if (services.length === 0) return null;
                                return (
                                    <div key={cat} className="space-y-3">
                                        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">{cat}</h3>
                                        <div className="grid gap-2">
                                            {services.map(s => (
                                                <div key={s} className="flex items-center gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                                    <span className="text-sm text-zinc-200">{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            {Object.values(selections).every(arr => arr.length === 0) && (
                                <div className="text-center text-zinc-500 py-8">
                                    No specific services selected. We'll set up a general workspace for you.
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-indigo-900/10 border border-indigo-500/10 p-4 rounded-xl">
                                <h4 className="font-semibold text-indigo-200 mb-1 text-sm">Next Steps</h4>
                                <ul className="text-xs text-indigo-200/60 space-y-1 list-disc list-inside">
                                    <li>We will create projects for each active category.</li>
                                    <li>Service requests will be staged for your review.</li>
                                    <li>AI agents will analyze these initial needs.</li>
                                </ul>
                            </div>

                            <button
                                onClick={handleComplete}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20"
                            >
                                Confirm & Create Projects
                            </button>
                            <button onClick={handleBack} className="w-full text-zinc-500 hover:text-white py-2 text-sm">
                                Go back and adjust
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
