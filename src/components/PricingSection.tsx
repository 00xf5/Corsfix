'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
    {
        name: 'Basic',
        price: 'Free',
        description: 'Perfect for quick debugging sessions.',
        features: ['Standard Analysis', 'Framework Detection', 'Manual Copy Snippets'],
        cta: 'Current Plan',
        active: true,
    },
    {
        name: 'Pro',
        price: '$1',
        period: '/mo',
        description: 'Advanced tools for professional developers.',
        features: [
            'AI-Powered Deep Insight',
            'Local Proxy Tunnel',
            'Snippet Library (Unlimited)',
            'API Health Monitoring',
            'Priority Support',
        ],
        cta: 'Upgrade to Pro',
        active: false,
        highlight: true,
    },
];

export default function PricingSection({ onUpgradeClick }: { onUpgradeClick?: () => void }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Developer pricing</h2>
                <p className="text-gray-500 text-lg">Everything you need to ship faster without the CORS headache.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {tiers.map((tier, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`
              relative p-8 rounded-3xl glass flex flex-col
              ${tier.highlight ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : ''}
            `}
                    >
                        {tier.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black">{tier.price}</span>
                                {tier.period && <span className="text-gray-500">{tier.period}</span>}
                            </div>
                            <p className="mt-4 text-gray-500 text-sm leading-relaxed">{tier.description}</p>
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                            {tier.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                    <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-400">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={tier.highlight ? onUpgradeClick : undefined}
                            className={`
                w-full py-4 rounded-xl font-bold transition-all active:scale-95
                ${tier.highlight
                                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}
              `}
                        >
                            {tier.cta}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
