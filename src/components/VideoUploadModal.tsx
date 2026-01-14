import { useStore } from '@/store/useStore';
import { Film, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface VideoUploadModalProps {
    campaignId: string;
    onClose: () => void;
}

export default function VideoUploadModal({ campaignId, onClose }: VideoUploadModalProps) {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
    const deductCredits = useStore((state) => state.deductCredits);

    const handleUpload = () => {
        // Check credits
        const success = deductCredits('VIDEO_EDIT_REQUEST', 20); // Expensive action
        if (!success) {
            alert('Insufficient credits (20 required)');
            return;
        }

        setStatus('uploading');

        // Simulate upload
        setTimeout(() => {
            setStatus('processing');
            // Simulate processing
            setTimeout(() => {
                setStatus('done');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="space-y-6 text-center">
            {status === 'idle' && (
                <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/30">
                        <Film className="h-10 w-10 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white">Upload Raw Footage</h3>
                        <p className="mt-1 text-sm text-zinc-400">
                            Upload your raw clips and our AI will edit them into performant creatives.
                            <br />
                            <span className="text-indigo-400 font-medium">Cost: 20 Credits</span>
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-600 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="text-sm text-zinc-400">Drag & drop video files here</p>
                                <p className="text-xs text-zinc-600 mt-1">MP4, MOV (max 500MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="video/*" multiple onChange={handleUpload} />
                        </label>
                    </div>
                </>
            )}

            {(status === 'uploading' || status === 'processing') && (
                <div className="py-8">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-indigo-500" />
                    <p className="mt-4 text-sm font-medium text-white">
                        {status === 'uploading' ? 'Uploading assets...' : 'Generating editing preview request...'}
                    </p>
                </div>
            )}

            {status === 'done' && (
                <div className="py-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/30">
                        <Film className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Request Submitted!</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                        Your editing request is in queue. You will receive a preview within 24 hours.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full rounded-md bg-zinc-800 py-2 text-sm font-medium text-white hover:bg-zinc-700"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}
