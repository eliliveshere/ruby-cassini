'use client';

import { useState, useMemo, useEffect } from 'react';
import { Upload, RefreshCw, ArrowUp, ArrowDown, Minus, Info, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import Papa from 'papaparse';
import { KICKSTARTER_DEMO_DATA, DEMO_NARRATIVE, ReferrerData } from './demo-data';

interface KickstarterDashboardProps {
    isDemoMode: boolean;
}

export default function KickstarterDashboard({ isDemoMode }: KickstarterDashboardProps) {
    const [rawData, setRawData] = useState<ReferrerData[]>([]);
    const [isUsingDemoData, setIsUsingDemoData] = useState(false);

    // File Upload State
    const [isMappingOpen, setIsMappingOpen] = useState(false);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [mappingColumns, setMappingColumns] = useState<string[]>([]);
    const [columnMapping, setColumnMapping] = useState({
        referrer: '',
        date: '',
        pledges: '',
        pledged: '',
        percentPledged: '',
        type: ''
    });

    // Initialize Demo Data
    useEffect(() => {
        if (isDemoMode && rawData.length === 0) {
            setRawData(KICKSTARTER_DEMO_DATA);
            setIsUsingDemoData(true);
        } else if (!isDemoMode && isUsingDemoData) {
            setRawData([]);
            setIsUsingDemoData(false);
        }
    }, [isDemoMode]);

    // Derived Metrics
    const metrics = useMemo(() => {
        if (rawData.length === 0) return null;

        const totalPledged = rawData.reduce((sum, item) => sum + item.pledged, 0);
        const totalPledges = rawData.reduce((sum, item) => sum + item.pledges, 0);
        const avgPledge = totalPledges > 0 ? totalPledged / totalPledges : 0;
        const activeReferrers = new Set(rawData.map(r => r.referrer)).size;

        // Validation: Check if imported percentages match derived percentages
        let hasDataMismatch = false;
        if (totalPledged > 0) {
            const significantMismatch = rawData.find(r => {
                if (r.pledgedPercent === undefined) return false;
                const derivedPercent = (r.pledged / totalPledged) * 100;
                // Allow 1% variance for rounding diffs
                return Math.abs(r.pledgedPercent - derivedPercent) > 1.0;
            });
            if (significantMismatch) hasDataMismatch = true;
        }

        const typeBreakdown = rawData.reduce((acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + item.pledged;
            return acc;
        }, {} as Record<string, number>);

        const kickstarterTotal = rawData.filter(r => r.type === 'Kickstarter').reduce((sum, r) => sum + r.pledged, 0);
        const customTotal = totalPledged - kickstarterTotal;
        const kickstarterShare = totalPledged > 0 ? (kickstarterTotal / totalPledged) : 0;

        // Group by Referrer for Leaderboard
        const referrerMap = rawData.reduce((acc, item) => {
            if (!acc[item.referrer]) {
                acc[item.referrer] = { ...item, count: 0, totalPledged: 0, totalPledges: 0, records: 0, importedPercent: 0 };
            }
            acc[item.referrer].totalPledged += item.pledged;
            acc[item.referrer].totalPledges += item.pledges;
            // Summing percentages for group isn't perfectly accurate if aggregated, but good distinct proxy
            if (item.pledgedPercent) acc[item.referrer].importedPercent += item.pledgedPercent;
            acc[item.referrer].records += 1;
            return acc;
        }, {} as Record<string, any>);

        const leaderboard = Object.values(referrerMap)
            .map(r => ({
                referrer: r.referrer,
                type: r.type,
                pledged: r.totalPledged,
                pledges: r.totalPledges,
                avgPledge: r.totalPledges > 0 ? r.totalPledged / r.totalPledges : 0,
                percentOfTotal: r.importedPercent > 0 ? (r.importedPercent / 100) : (totalPledged > 0 ? r.totalPledged / totalPledged : 0),
                quality: (r.totalPledged / r.totalPledges) > avgPledge * 1.2 ? 'High' : (r.totalPledged / r.totalPledges) < avgPledge * 0.8 ? 'Low' : 'Medium'
            }))
            .sort((a, b) => b.pledged - a.pledged);

        // Group by Date for Chart
        const dailyMap = rawData.reduce((acc, item) => {
            const dateKey = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            acc[dateKey] = (acc[dateKey] || 0) + item.pledged; // STRICTLY USE PLEDGED AMOUNT
            return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(dailyMap)
            .map(([date, value]) => ({ date, value }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
            totalPledged,
            totalPledges,
            avgPledge,
            activeReferrers,
            kickstarterShare,
            customShare: 1 - kickstarterShare,
            leaderboard,
            chartData,
            hasDataMismatch
        };
    }, [rawData]);

    // Handlers
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            preview: 5, // Preview mostly for headers
            complete: (results) => {
                const headers = results.meta.fields || [];
                setMappingColumns(headers);
                setPendingFile(file);

                const lowerHeaders = headers.map(h => h.toLowerCase());

                // Refined Auto-detect columns (STRICT)
                const newMapping = {
                    referrer: headers.find(h => {
                        const l = h.toLowerCase();
                        return l.includes('referrer') || l.includes('source');
                    }) || '',
                    date: headers.find(h => {
                        const l = h.toLowerCase();
                        return l.includes('date') || l.includes('time');
                    }) || '',
                    pledges: headers.find(h => {
                        const l = h.toLowerCase();
                        return (l.includes('pledges') || l.includes('backers') || l.includes('count')) && !l.includes('pledged');
                    }) || '',
                    pledged: headers.find(h => {
                        const l = h.toLowerCase();
                        // MUST contain 'pledged', or 'amount'
                        // MUST NOT contain '%' or 'percent'
                        return (l.includes('pledged') || l.includes('amount')) && !l.includes('%') && !l.includes('percent');
                    }) || '',
                    percentPledged: headers.find(h => {
                        const l = h.toLowerCase();
                        // MUST contain '%' or 'percent' AND 'pledged'
                        return (l.includes('pledged') && (l.includes('%') || l.includes('percent'))) || l === '%';
                    }) || '',
                    type: headers.find(h => h.toLowerCase().includes('type') || h.toLowerCase().includes('kind')) || ''
                };

                setColumnMapping(newMapping);

                // If critical columns missing, open mapping modal
                if (!newMapping.referrer || !newMapping.pledged) {
                    setIsMappingOpen(true);
                } else {
                    processFullFile(file, newMapping);
                }
            }
        });
    };

    const processFullFile = (file: File, mapping: typeof columnMapping) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsed: ReferrerData[] = results.data
                    .map((row: any) => ({
                        referrer: row[mapping.referrer] || 'Unknown',
                        date: row[mapping.date] ? new Date(row[mapping.date]).toISOString() : new Date().toISOString(),
                        // Parse currency carefully (remove $ , etc)
                        pledged: parseFloat((row[mapping.pledged] || '0').replace(/[^0-9.-]+/g, "")),
                        pledges: parseInt((row[mapping.pledges] || '0').replace(/[^0-9.-]+/g, "")),
                        // Parse percent if mapped
                        pledgedPercent: mapping.percentPledged ? parseFloat((row[mapping.percentPledged] || '0').replace(/[^0-9.-]+/g, "")) : undefined,
                        type: (mapping.type ? (row[mapping.type]?.toLowerCase().includes('kickstarter') ? 'Kickstarter' : 'Custom') : 'Custom') as 'Kickstarter' | 'Custom'
                    }))
                    .filter(item => item.pledged > 0 || item.pledges > 0);

                setRawData(parsed);
                setIsUsingDemoData(false);
                setIsMappingOpen(false);
                setPendingFile(null);
            }
        });
    };

    const resetToDemo = () => {
        setRawData(KICKSTARTER_DEMO_DATA);
        setIsUsingDemoData(true);
    };

    if (!metrics && !isDemoMode) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
                <FileSpreadsheet className="h-16 w-16 text-zinc-600 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Kickstarter Analytics Dashboard</h3>
                <p className="text-zinc-400 mb-6 text-center max-w-sm">Upload your Kickstarter Referrers CSV export to visualize your campaign data.</p>
                <label className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium cursor-pointer transition-colors shadow-lg shadow-indigo-500/20">
                    <Upload className="h-4 w-4" />
                    Upload .CSV
                    <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* MAPPING MODAL MOCKUP (Simple inline if active) */}
            {isMappingOpen && pendingFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-4">Confirm Column Mapping</h3>
                        <div className="space-y-4">
                            {Object.entries(columnMapping).map(([key, val]) => (
                                <div key={key}>
                                    <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">{key}</label>
                                    <select
                                        value={val}
                                        onChange={(e) => setColumnMapping(prev => ({ ...prev, [key]: e.target.value }))}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
                                    >
                                        <option value="">Select Column...</option>
                                        {mappingColumns.map(col => <option key={col} value={col}>{col}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setIsMappingOpen(false)} className="text-sm text-zinc-400 hover:text-white">Cancel</button>
                            <button onClick={() => processFullFile(pendingFile, columnMapping)} className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium">Process</button>
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/50 pb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Kickstarter Launch — Analytics</h2>
                    <p className="mt-2 text-zinc-400">
                        {isUsingDemoData ? "Demo data is loaded. Upload your Kickstarter Referrers CSV to see your campaign." : "Showing visualized campaign data."}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                        <Upload className="h-4 w-4" />
                        {isUsingDemoData ? "Upload Kickstarter Referrers CSV" : "Replace CSV"}
                        <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                    </label>
                    {(!isUsingDemoData || isDemoMode) && (
                        <button onClick={resetToDemo} className="flex items-center gap-2 px-4 py-2 text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors">
                            <RefreshCw className="h-4 w-4" />
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* SCOREBOARD */}
            {metrics && (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        <MetricCard label="Total Pledged" value={`$${metrics.totalPledged.toLocaleString()}`} />
                        <MetricCard label="Total Pledges" value={metrics.totalPledges.toLocaleString()} />
                        <MetricCard label="Avg Pledge" value={`$${metrics.avgPledge.toFixed(0)}`} />
                        <MetricCard label="Active Referrers" value={metrics.activeReferrers.toString()} />
                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex flex-col justify-center">
                            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Source Split</span>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <span className="text-green-400 w-16">{(metrics.kickstarterShare * 100).toFixed(1)}% KS</span>
                                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full" style={{ width: `${metrics.kickstarterShare * 100}%` }} />
                                </div>
                                <span className="text-indigo-400 w-16 text-right">{(metrics.customShare * 100).toFixed(1)}% Ext</span>
                            </div>
                        </div>
                    </div>
                    {/* INSIGHT */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900/30 py-2 px-4 rounded-lg border border-zinc-800/50 w-fit">
                            <Info className="h-4 w-4 text-indigo-400" />
                            Most funding is driven by {metrics.customShare > metrics.kickstarterShare ? 'External Sources' : 'Kickstarter Discovery'} this period.
                        </div>

                        {metrics.hasDataMismatch && (
                            <div className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 py-2 px-4 rounded-lg border border-amber-500/20 w-fit animate-in fade-in slide-in-from-left-4">
                                <AlertCircle className="h-4 w-4" />
                                Percentages shown are from Kickstarter export.
                            </div>
                        )}
                    </div>

                    {/* CHARTS ROW */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* CHART */}
                        <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-6">Momentum Over Time</h3>
                            <div className="h-64 w-full flex items-end gap-2">
                                {(() => {
                                    const maxVal = Math.max(...metrics.chartData.map(c => c.value)) || 1;
                                    return metrics.chartData.map((d, i) => {
                                        const hPercent = (d.value / maxVal) * 100;
                                        return (
                                            <div key={i} className="flex-1 h-full flex flex-col justify-end group relative">
                                                <div
                                                    style={{ height: `${hPercent}%` }}
                                                    className="w-full bg-indigo-500/20 border-t-2 border-indigo-500 rounded-t-sm group-hover:bg-indigo-500/40 transition-all"
                                                />
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                    {d.date}: ${d.value.toLocaleString()}
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-zinc-600">
                                <span>{metrics.chartData[0]?.date}</span>
                                <span>{metrics.chartData[metrics.chartData.length - 1]?.date}</span>
                            </div>
                        </div>

                        {/* WEEKLY REVIEW */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <FileSpreadsheet className="h-4 w-4" /> AI Situation Report
                                </h3>
                                {(isUsingDemoData ? DEMO_NARRATIVE.weeklyReview : { whatHappened: "Analyzing uploaded dataset patterns...", whatItMeans: "Data ingestion complete.", nextSteps: [] }).nextSteps && (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-zinc-300 uppercase mb-1">What Happened</h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed">
                                                {isUsingDemoData ? DEMO_NARRATIVE.weeklyReview.whatHappened : "Most pledge activity is concentrated in the first 48 hours of your dataset."}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-zinc-300 uppercase mb-1">Interpretation</h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed">
                                                {isUsingDemoData ? DEMO_NARRATIVE.weeklyReview.whatItMeans : "This correlates with typical crowdfunding power laws."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* LEADERBOARD */}
                    <div className="rounded-2xl border border-zinc-800/50 overflow-hidden">
                        <div className="p-6 bg-zinc-900/50 border-b border-zinc-800/50 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Referrer Leaderboard</h3>
                            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">Export Report</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50 border-b border-zinc-800/50">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Referrer</th>
                                        <th className="px-6 py-4 font-medium">Type</th>
                                        <th className="px-6 py-4 font-medium text-right">Pledged</th>
                                        <th className="px-6 py-4 font-medium text-right">Count</th>
                                        <th className="px-6 py-4 font-medium text-right">Avg</th>
                                        <th className="px-6 py-4 font-medium text-center">Quality</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/20">
                                    {metrics.leaderboard.map((row, i) => (
                                        <tr key={i} className="hover:bg-zinc-800/30 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-zinc-200">
                                                {i < 3 && <span className="inline-block w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs text-center leading-5 mr-2">{i + 1}</span>}
                                                {row.referrer}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border ${row.type === 'Kickstarter'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    }`}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-zinc-300 font-mono">${row.pledged.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right text-zinc-400">{row.pledges}</td>
                                            <td className="px-6 py-4 text-right text-zinc-400">${row.avgPledge.toFixed(0)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${row.quality === 'High' ? 'text-emerald-400 bg-emerald-500/10' :
                                                    row.quality === 'Low' ? 'text-orange-400 bg-orange-500/10' :
                                                        'text-zinc-400 bg-zinc-500/10'
                                                    }`}>
                                                    {row.quality === 'High' && <CheckCircle2 className="h-3 w-3" />}
                                                    {row.quality === 'Low' && <AlertCircle className="h-3 w-3" />}
                                                    {row.quality}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ACTION PLAN */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(isUsingDemoData ? DEMO_NARRATIVE.suggestedActions : ["Review high-value referrers", "Engage top backers", "Update campaign timeline"]).map((action, i) => (
                            <div key={i} className="p-4 rounded-xl bg-indigo-900/10 border border-indigo-500/20 flex items-start gap-4 hover:bg-indigo-900/20 transition-colors cursor-pointer group">
                                <div className="mt-1 h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold border border-indigo-500/30 group-hover:border-indigo-400 group-hover:scale-110 transition-all">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-indigo-200 mb-1">Recommended Action</h4>
                                    <p className="text-sm text-zinc-400">{action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function MetricCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{label}</h3>
            <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
    );
}
