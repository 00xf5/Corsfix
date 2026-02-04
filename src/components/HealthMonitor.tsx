'use client';

import { useState } from 'react';
import { Activity, Search, ShieldCheck, ShieldAlert, Zap, Globe, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HealthMonitor() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleProbe = async () => {
        if (!url) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/probe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, origin: window.location.origin }),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setResult({ error: 'Failed to reach probe service' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Activity className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">API Health <span className="text-cyan-400 underline decoration-cyan-500/30">Monitor</span></h2>
                    <p className="text-sm text-gray-500">Live probe your endpoint to see exactly what headers it returns.</p>
                </div>
            </div>

            <div className="glass p-8 rounded-3xl">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://api.example.com/data"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleProbe}
                        disabled={loading || !url}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        Run Probe
                    </button>
                </div>

                {result && (
                    <div className="space-y-6 animate-fade-in">
                        {result.error ? (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" />
                                {result.error}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">CORS Headers</h4>
                                    <div className="space-y-2">
                                        {Object.entries(result.corsHeadersReceived || {}).map(([key, value]: [string, any]) => (
                                            <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                                                <span className="text-gray-400 font-mono">{key}</span>
                                                <span className={cn(
                                                    "font-bold font-mono",
                                                    value ? "text-emerald-400" : "text-red-400 opacity-60"
                                                )}>
                                                    {value || 'MISSING'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center text-center">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                                        result.corsHeadersReceived?.['access-control-allow-origin'] ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                                    )}>
                                        {result.corsHeadersReceived?.['access-control-allow-origin'] ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {result.corsHeadersReceived?.['access-control-allow-origin'] ? 'Endpoint Accessible' : 'CORS Blockage Likely'}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed px-4">
                                        {result.corsHeadersReceived?.['access-control-allow-origin']
                                            ? 'The server is correctly configured to allow cross-origin requests.'
                                            : 'The critical Access-Control-Allow-Origin header is missing. Browsers will block this request.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
