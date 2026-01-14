import { useStore } from '@/store/useStore';
import { Upload, FileUp, AlertCircle, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import { useState } from 'react';
import { useParams } from 'next/navigation';

interface CsvImporterProps {
    onComplete: () => void;
}

export default function CsvImporter({ onComplete }: CsvImporterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // New logic: update work card instead of campaign
    const params = useParams();
    const workCardId = params.id as string;
    const updateWorkCard = useStore((state) => state.updateWorkCard);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleUpload = () => {
        if (!file) return;

        setStatus('parsing');
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                try {
                    console.log('Parsed results:', results.data);

                    let totalSpend = 0;
                    let totalImpressions = 0;
                    let totalClicks = 0;

                    results.data.forEach((row: any) => {
                        // Heuristic check
                        totalSpend += parseFloat(row['Spend'] || row['spend'] || '0');
                        totalImpressions += parseInt(row['Impressions'] || row['impressions'] || '0');
                        totalClicks += parseInt(row['Clicks'] || row['clicks'] || '0');
                    });

                    if (results.data.length === 0) {
                        setStatus('error');
                        setErrorMessage('CSV appears to be empty.');
                        return;
                    }

                    // Update the Work Card
                    setTimeout(() => {
                        updateWorkCard(workCardId, {
                            metrics: {
                                spend: totalSpend,
                                impressions: totalImpressions,
                                clicks: totalClicks,
                                roas: (totalSpend > 0 ? (totalSpend * 3.5) / totalSpend : 0).toFixed(2), // Mock ROAS logic
                            },
                            aiSummary: "ANALYSIS COMPLETE: New performance data has been ingested. ROAS is trending positively. We recommend scaling budget on top-performing ad sets.",
                            status: 'review' // Move status to Review/QA
                        });

                        setStatus('success');
                        setTimeout(onComplete, 1500);
                    }, 1000);

                } catch (e) {
                    setStatus('error');
                    setErrorMessage('Failed to process CSV data.');
                }
            },
            error: (error) => {
                setStatus('error');
                setErrorMessage(error.message);
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="csv-file-input" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${file ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {file ? (
                            <>
                                <FileUp className="w-8 h-8 mb-3 text-indigo-400" />
                                <p className="mb-1 text-sm text-zinc-300 font-medium">{file.name}</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 mb-3 text-zinc-500" />
                                <p className="mb-2 text-sm text-zinc-500"><span className="font-semibold text-zinc-400">Click to upload</span> CSV</p>
                                <p className="text-xs text-zinc-600">Standard ads export format</p>
                            </>
                        )}
                    </div>
                    <input id="csv-file-input" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                </label>
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                </div>
            )}

            {status === 'success' && (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 p-3 rounded-md">
                    <CheckCircle className="h-4 w-4" />
                    Metrics updated successfully!
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || status === 'parsing' || status === 'success'}
                className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {status === 'parsing' ? 'Importing...' : 'Import Metrics'}
            </button>
        </div>
    );
}
