'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Copy, Check, MessageSquareWarning, Code2, Lightbulb, ArrowRight, Save } from 'lucide-react';
import { analyzeCORSError, CORSAnalysis } from '@/lib/parser';
import { cn } from '@/lib/utils';
import { useAuth, SignedIn, useUser } from '@clerk/nextjs';
import { logCORSError } from '@/lib/logger';

export default function Analyzer({ onUpgradeClick }: { onUpgradeClick?: () => void }) {
    const { user } = useUser();
    const isPro = user?.publicMetadata?.role === 'pro';
    const [input, setInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<CORSAnalysis | null>(null);
    const [copied, setCopied] = useState(false);
    const { userId } = useAuth();

    const handleAnalyze = async () => {
        if (!input.trim()) return;

        setIsAnalyzing(true);
        setResult(null);

        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 800));

        const analysis = analyzeCORSError(input);
        setResult(analysis);
        setIsAnalyzing(false);

        // Background log
        logCORSError(analysis.errorType, analysis.framework, input, userId || undefined);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 pb-32">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500"></div>

                <div className="relative bg-[#0a0a0b] border border-white/10 rounded-3xl p-2 transition-all duration-300 group-focus-within:border-indigo-500/50 group-focus-within:ring-4 group-focus-within:ring-indigo-500/10 shadow-2xl">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleAnalyze();
                            }
                        }}
                        placeholder="Paste your console error message here..."
                        className="w-full h-32 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 resize-none outline-none text-base md:text-lg font-mono p-4"
                    />

                    <div className="flex items-center justify-between p-2 pl-4">
                        <div className="flex items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider">
                                <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                                Ready
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium opacity-50">
                                <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-sans">Enter</kbd>
                                <span>to fix</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !input.trim()}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-30 disabled:grayscale",
                                    "bg-white text-black hover:bg-gray-200 shadow-xl"
                                )}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        <span>Thinking...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Analyze</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="mt-12 space-y-8"
                    >
                        {/* Analysis Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="glass rounded-2xl p-6 border-l-4 border-l-red-500/50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                                            <MessageSquareWarning className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">The Problem</h3>
                                            <p className="text-lg font-bold text-white">{result.errorType}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Confidence</span>
                                        <span className={cn(
                                            "text-xs font-black",
                                            result.confidence > 0.8 ? "text-emerald-400" : "text-yellow-400"
                                        )}>
                                            {Math.round(result.confidence * 100)}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                                    {result.reason}
                                </p>
                            </div>

                            <div className="glass rounded-2xl p-6 border-l-4 border-l-emerald-500/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                        <Lightbulb className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">The Solution</h3>
                                        <p className="text-lg font-bold text-white">Action Required</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                                    {result.solution}
                                </p>
                            </div>
                        </div>

                        {/* Code Block */}
                        <div className="relative group">
                            <div className="absolute top-4 left-6 flex items-center gap-2 z-10">
                                <div className="p-1.5 rounded-md bg-white/5 text-indigo-400">
                                    <Code2 className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{result.framework} Suggestion</span>
                            </div>

                            <div className="absolute top-4 right-4 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleCopy(result.codeSnippet)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2 text-xs font-medium"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>

                            <div className="pt-14 p-6 bg-[#0c0c0e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                <pre className="font-mono text-sm text-indigo-100/90 leading-relaxed overflow-x-auto selection:bg-indigo-500/30">
                                    <code>{result.codeSnippet}</code>
                                </pre>
                            </div>
                        </div>

                        {!isPro && (
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 glass rounded-2xl border-dashed border-indigo-500/30">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Need a live proxy?</h4>
                                        <p className="text-sm text-gray-500">Bypass CORS during local development with our secure proxy tunnel.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onUpgradeClick}
                                    className="whitespace-nowrap flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all"
                                >
                                    Enable Pro Features <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <SignedIn>
                            <div className="flex justify-center">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors">
                                    <Save className="w-4 h-4" />
                                    Save to my snippets
                                </button>
                            </div>
                        </SignedIn>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Zap(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 14.71 12 21l8-6.29V8.29L12 2l-8 6.29Z" />
            <path d="m12 2-8 6.29v6.42L12 21l8-6.29V8.29Z" />
            <path d="M12 2v19" />
            <path d="M21 15 12 7l-9 8" />
        </svg>
    );
}
