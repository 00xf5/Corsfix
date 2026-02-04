'use client';

import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-wider"
                >
                    <Sparkles className="w-3 h-3" />
                    The Developer's Choice for CORS Debugging
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
                >
                    Stop Fighting <br />
                    <span className="text-gradient-primary">CORS Errors.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    The most efficient way to understand, debug, and fix Cross-Origin Resource Sharing policy violations. Professional fixes for Express, Next.js, Django, and more.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium"
                >
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-indigo-500/60" />
                        Zero Setup
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-500/60" />
                        Framework Specific
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500/60" />
                        AI Augmented
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
