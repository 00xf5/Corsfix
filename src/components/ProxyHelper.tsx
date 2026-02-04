'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, Zap, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProxyHelper() {
    const [proxyUrl, setProxyUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const command = `npx local-cors-proxy --proxyUrl ${proxyUrl || 'http://your-api.com'} --port 8010 --proxyPartial ''`;

    const handleCopy = () => {
        if (!proxyUrl) return;
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Server className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Local Proxy <span className="text-indigo-400 underline decoration-indigo-500/30">Tunnel</span></h2>
                    <p className="text-sm text-gray-500">Bypass CORS locally without changing a single line of backend code.</p>
                </div>
            </div>

            <div className="glass p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Terminal className="w-32 h-32 text-white" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Target API URL</label>
                            <input
                                type="text"
                                value={proxyUrl}
                                onChange={(e) => setProxyUrl(e.target.value)}
                                placeholder="https://api.yourbackend.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500/50 transition-all font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Installs via npx (no global install needed)
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                Proxies to localhost:8010
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6">
                        <div className="bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-xs text-indigo-300/80 leading-relaxed min-h-[80px] break-all">
                            {command}
                        </div>

                        <button
                            onClick={handleCopy}
                            disabled={!proxyUrl}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-30",
                                copied ? "bg-emerald-600 text-white" : "bg-white text-black hover:bg-gray-200"
                            )}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Command Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy Proxy Command
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
