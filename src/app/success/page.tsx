import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-8 border border-emerald-500/20">
                <CheckCircle2 className="w-12 h-12" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                Upgrade <span className="text-gradient-primary">Successful!</span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                You now have full access to Pro features. Your subscription is active, and the AI-powered deep insights are ready for your next CORS headache.
            </p>

            <div className="grid gap-4 mb-12">
                <div className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all text-left">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Full History Unlocked</h3>
                            <p className="text-xs text-gray-500">View all your saved snippets in the dashboard.</p>
                        </div>
                    </div>
                    <Link href="/dashboard" className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all text-left">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Priority Support</h3>
                            <p className="text-xs text-gray-500">You're now at the top of our support queue.</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Active
                    </div>
                </div>
            </div>

            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
                Back to Analyzer <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="relative min-h-screen">
            <div className="mesh-bg" />
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
                <Suspense fallback={<div className="text-center text-gray-500">Loading your profile...</div>}>
                    <SuccessContent />
                </Suspense>
            </div>
        </main>
    );
}
