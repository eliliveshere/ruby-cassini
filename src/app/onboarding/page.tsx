'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Smartphone, Youtube, Instagram, Upload, AlertCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CreatorProfile } from '@/types';

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default function OnboardingPage() {
    const router = useRouter();
    const setCreatorProfile = useStore((state) => state.setCreatorProfile);
    const loadDemoData = useStore((state) => state.loadDemoData);
    const [step, setStep] = useState<Step>(0);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<CreatorProfile>>({
        contentTypes: [],
        formats: [],
        integrations: {
            youtube: false,
            instagram: false,
            googleDrive: false,
            metaAds: false // Optional
        },
        workflow: {
            pipelineTemplate: 'simple',
            requireApproval: false
        }
    });

    // Helper to update form
    const updateForm = (key: keyof CreatorProfile | string, value: any) => {
        if (key.includes('.')) {
            // fast handle nested (integrations/workflow)
            const [parent, child] = key.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...((prev as any)[parent] || {}),
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [key]: value }));
        }
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 6) as Step);
    const prevStep = () => setStep(s => Math.max(s - 1, 0) as Step);

    const handleFinish = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));

        // 1. Load Demo Data based on Niche
        if (formData.niche) {
            loadDemoData(formData.niche);
        }

        // 2. Overwrite with specific user inputs (e.g. Channel Name)
        // Ensure defaults for any missing fields to avoid type errors
        const finalProfile = formData as CreatorProfile; // In real app, validate strictly
        setCreatorProfile(finalProfile);

        setLoading(false);
        router.push('/dashboard'); // Go to dashboard home
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
            {/* Left Panel: Progress (Mobile: Top Bar) */}
            <div className="w-full md:w-80 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-xl font-bold mb-2">Setup Your Studio</h1>
                    <p className="text-sm text-zinc-400 mb-8">Let's configure IMPCTFUL to match your creative workflow.</p>

                    {/* Steps Indicator */}
                    <div className="space-y-4 hidden md:block">
                        {[
                            { id: 0, label: 'Mode' },
                            { id: 1, label: 'Channel & Niche' },
                            { id: 2, label: 'Format Strategy' },
                            { id: 3, label: 'Voice & Style' },
                            { id: 4, label: 'Goals' },
                            { id: 5, label: 'Integrations' },
                            { id: 6, label: 'Workflow' }
                        ].map((s) => (
                            <div key={s.id} className={`flex items-center gap-3 ${step === s.id ? 'text-white' : 'text-zinc-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${step === s.id ? 'bg-indigo-600 border-indigo-500' :
                                    step > s.id ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'border-zinc-800'
                                    }`}>
                                    {step > s.id ? <Check className="h-4 w-4" /> : s.id + 1}
                                </div>
                                <span className="text-sm font-medium">{s.label}</span>
                            </div>
                        ))}
                    </div>
                    {/* Mobile Progress Bar */}
                    <div className="md:hidden w-full bg-zinc-800 h-1.5 rounded-full mt-4">
                        <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${((step + 1) / 7) * 100}%` }} />
                    </div>
                </div>
            </div>

            {/* Right Panel: Form Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto p-6 md:p-12 min-h-[calc(100vh-80px)] md:min-h-screen flex flex-col">

                    <div className="flex-1">
                        {step === 0 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                <h2 className="text-3xl font-bold mb-6">How do you work?</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {['Solo Creator', 'Creator + Editor', 'Team / Agency'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => { updateForm('mode', mode); nextStep(); }} // 'mode' is strictly local for UI flow mostly, or stored in profile if we add it
                                            className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-indigo-500/50 transition-all text-left group"
                                        >
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400">{mode}</h3>
                                            <p className="text-sm text-zinc-400">
                                                {mode === 'Solo Creator' ? 'Just you. We will focus on saving you time.' :
                                                    mode === 'Creator + Editor' ? 'You film, they edit. We manage the handoff.' :
                                                        'Full production pipeline with approvals.'}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-6">
                                <h2 className="text-3xl font-bold">Channel & Niche</h2>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Channel Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="e.g. Tech with Tim"
                                        value={formData.channelName || ''}
                                        onChange={(e) => updateForm('channelName', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Primary Platform</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['youtube', 'instagram', 'both'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => updateForm('primaryPlatform', p)}
                                                className={`p-3 rounded-lg border capitalize text-sm font-medium ${formData.primaryPlatform === p ? 'bg-indigo-600 border-indigo-500' : 'bg-zinc-900 border-zinc-800'}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Niche</label>
                                    <select
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 outline-none"
                                        value={formData.niche || ''}
                                        onChange={(e) => updateForm('niche', e.target.value)}
                                    >
                                        <option value="">Select a niche...</option>
                                        <option value="Tech & Coding">Tech & Coding</option>
                                        <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
                                        <option value="Finance & Business">Finance & Business</option>
                                        <option value="Education">Education</option>
                                        <option value="Entertainment">Entertainment</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Target Audience (One Liner)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 outline-none"
                                        placeholder="e.g. Junior devs wanting to break into FAANG"
                                        value={formData.targetAudienceOneLiner || ''}
                                        onChange={(e) => updateForm('targetAudienceOneLiner', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-8">
                                <h2 className="text-3xl font-bold">Content Strategy</h2>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-3">Formats (Select all that apply)</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Talking Head', 'Screen Record', 'B-Roll Heavy', 'Podcast Clips', 'Cinematic', 'Tutorial'].map(fmt => (
                                            <button
                                                key={fmt}
                                                onClick={() => {
                                                    const current = formData.formats || [];
                                                    const newValue = current.includes(fmt) ? current.filter(x => x !== fmt) : [...current, fmt];
                                                    updateForm('formats', newValue);
                                                }}
                                                className={`px-4 py-2 rounded-full border text-sm transition-all ${formData.formats?.includes(fmt)
                                                    ? 'bg-white text-zinc-950 border-white font-semibold'
                                                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                                                    }`}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-3">Typical Length</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {['30-60s', '1-3m', '3-8m', '8-20m', '20m+'].map(len => (
                                            <button
                                                key={len}
                                                onClick={() => updateForm('typicalLength', len)}
                                                className={`p-3 rounded-lg border text-sm font-medium ${formData.typicalLength === len ? 'bg-indigo-600 border-indigo-500' : 'bg-zinc-900 border-zinc-800'}`}
                                            >
                                                {len}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-8">
                                <h2 className="text-3xl font-bold">Voice & Style</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Tone</label>
                                        <select
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 outline-none"
                                            value={formData.tone || ''}
                                            onChange={(e) => updateForm('tone', e.target.value)}
                                        >
                                            <option value="punchy">Punchy / Fast</option>
                                            <option value="educational">Educational / Calm</option>
                                            <option value="comedic">Comedic</option>
                                            <option value="inspirational">Inspirational</option>
                                            <option value="analytical">Analytical / Deep</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Pacing</label>
                                        <select
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 outline-none"
                                            value={formData.pacing || ''}
                                            onChange={(e) => updateForm('pacing', e.target.value)}
                                        >
                                            <option value="fast">Fast (retention hacking)</option>
                                            <option value="medium">Medium (storytelling)</option>
                                            <option value="slow">Slow (ASMR/Relaxed)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-3">Preview: Generated Hook</label>
                                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                                        <p className="text-lg font-medium text-white italic">
                                            {formData.tone === 'punchy' ? '"Stop doing THIS if you want to grow."' :
                                                formData.tone === 'analytical' ? '"Let\'s look at the data behind the crash."' :
                                                    formData.tone === 'calm' ? '"Here is a quiet moment from my day."' :
                                                        '"I tried X so you don\'t have to."'}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
                                            <span>{formData.tone || 'Neutral'} Tone</span>
                                            <span>•</span>
                                            <span>{formData.pacing || 'Medium'} Pace</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-6">
                                <h2 className="text-3xl font-bold">Goals & Reality</h2>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Ideal Posting Cadence</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['daily', '3wk', '2wk', '1wk'].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => updateForm('cadenceGoal', c)}
                                                className={`p-3 rounded-lg border text-sm font-medium ${formData.cadenceGoal === c ? 'bg-indigo-600 border-indigo-500' : 'bg-zinc-900 border-zinc-800'}`}
                                            >
                                                {c === '3wk' ? '3x / Week' : c === '2wk' ? '2x / Week' : c === '1wk' ? 'Weekly' : 'Daily'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Biggest Constraint</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['time', 'editing', 'ideas', 'consistency', 'team'].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => updateForm('biggestConstraint', c)}
                                                className={`px-4 py-2 rounded-full border text-sm capitalize ${formData.biggestConstraint === c ? 'bg-red-500/20 text-red-200 border-red-500/50' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-6">
                                <h2 className="text-3xl font-bold">Connect Accounts</h2>
                                <p className="text-zinc-400 mb-6">Skip any you don't use. You can do this later.</p>

                                <div className="space-y-4">
                                    <div className={`p-4 rounded-xl border flex items-center justify-between ${formData.integrations?.youtube ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-500">
                                                <Youtube className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">YouTube Channel</h3>
                                                <p className="text-xs text-zinc-400">For analytics & uploading</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => updateForm('integrations.youtube', !formData.integrations?.youtube)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${formData.integrations?.youtube ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-300'}`}
                                        >
                                            {formData.integrations?.youtube ? 'Connected' : 'Connect'}
                                        </button>
                                    </div>

                                    <div className={`p-4 rounded-xl border flex items-center justify-between ${formData.integrations?.instagram ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-500">
                                                <Instagram className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Instagram Professional</h3>
                                                <p className="text-xs text-zinc-400">For Reels & stories</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => updateForm('integrations.instagram', !formData.integrations?.instagram)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${formData.integrations?.instagram ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-300'}`}
                                        >
                                            {formData.integrations?.instagram ? 'Connected' : 'Connect'}
                                        </button>
                                    </div>

                                    <div className={`p-4 rounded-xl border flex items-center justify-between ${formData.integrations?.googleDrive ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                                                <Upload className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Google Drive</h3>
                                                <p className="text-xs text-zinc-400">Asset storage</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => updateForm('integrations.googleDrive', !formData.integrations?.googleDrive)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${formData.integrations?.googleDrive ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-300'}`}
                                        >
                                            {formData.integrations?.googleDrive ? 'Connected' : 'Connect'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 6 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-8">
                                <h2 className="text-3xl font-bold">Workflow Setup</h2>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Pipeline Template</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => updateForm('workflow.pipelineTemplate', 'simple')}
                                            className={`p-4 rounded-xl border text-left ${formData.workflow?.pipelineTemplate === 'simple' ? 'bg-indigo-600/10 border-indigo-500' : 'bg-zinc-900 border-zinc-800'}`}
                                        >
                                            <span className="font-bold block mb-1">Simple</span>
                                            <span className="text-xs text-zinc-400">Ideation → Filming → Done. Best for solo creators.</span>
                                        </button>
                                        <button
                                            onClick={() => updateForm('workflow.pipelineTemplate', 'team')}
                                            className={`p-4 rounded-xl border text-left ${formData.workflow?.pipelineTemplate === 'team' ? 'bg-indigo-600/10 border-indigo-500' : 'bg-zinc-900 border-zinc-800'}`}
                                        >
                                            <span className="font-bold block mb-1">Team / Agency</span>
                                            <span className="text-xs text-zinc-400">Full Kanban with Review and Approval stages.</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.workflow?.requireApproval}
                                        onChange={(e) => updateForm('workflow.requireApproval', e.target.checked)}
                                        className="h-5 w-5 rounded border-zinc-700 bg-zinc-900 text-indigo-600"
                                    />
                                    <span className="text-sm font-medium">Require approval before publishing?</span>
                                </div>

                                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center">
                                    <Check className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-white mb-2">Ready to Launch?</h3>
                                    <p className="text-sm text-zinc-400 mb-6">Your studio is configured and ready.</p>
                                    <button
                                        onClick={handleFinish}
                                        disabled={loading}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
                                    >
                                        {loading ? 'Setting up...' : 'Enter Studio ->'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Nav */}
                    {step < 6 && (
                        <div className="flex justify-between items-center pt-8 mt-4 border-t border-zinc-900">
                            <button
                                onClick={prevStep}
                                disabled={step === 0}
                                className="text-zinc-500 hover:text-white disabled:opacity-0 transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
                            >
                                Next <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
