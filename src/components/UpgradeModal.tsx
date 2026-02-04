'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Crown, Zap, ShieldCheck } from 'lucide-react';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const features = [
    'Unlimited Snippet Storage',
    'AI-Powered Deep Root-Cause Analysis',
    'Local Development Proxy Tunnel',
    'Team Collaboration (Early Access)',
    'Priority Dev Support',
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout', { method: 'POST' });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || 'Failed to start checkout. Please ensure you have configured a product in Polar.sh');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] px-6"
                    >
                        <div className="glass rounded-3xl overflow-hidden shadow-2xl border-indigo-500/30">
                            {/* Header */}
                            <div className="relative p-8 bg-indigo-600/10 border-b border-indigo-500/20">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Crown className="w-3 h-3" />
                                    Premium Access
                                </div>
                                <h2 className="text-3xl font-black text-white mb-2">Upgrade to Pro</h2>
                                <p className="text-gray-400 text-sm">Join 500+ developers shipping without CORS headaches.</p>
                            </div>

                            {/* Body */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    {features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-400">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleUpgrade}
                                        disabled={loading}
                                        className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Zap className="w-4 h-4" />
                                                Get Pro for $1/mo
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-[10px] text-gray-500">
                                        Secure checkout by Polar.sh. Cancel anytime.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-6">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                        <ShieldCheck className="w-3 h-3 opacity-50" />
                                        Secure
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
