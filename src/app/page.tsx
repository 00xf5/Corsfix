'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Analyzer from '@/components/Analyzer';
import PricingSection from '@/components/PricingSection';
import UpgradeModal from '@/components/UpgradeModal';
import ProxyHelper from '@/components/ProxyHelper';
import HealthMonitor from '@/components/HealthMonitor';

export default function Home() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <div className="mesh-bg" />

      <Navbar onUpgradeClick={() => setIsUpgradeModalOpen(true)} />

      <div className="relative z-10">
        <Hero />
        <Analyzer onUpgradeClick={() => setIsUpgradeModalOpen(true)} />

        <div id="tools" className="mt-20">
          <ProxyHelper />
          <HealthMonitor />
        </div>

        <PricingSection onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      <footer className="py-20 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
              </div>
              <span className="font-bold tracking-tight text-white">CORSFIX</span>
            </div>

            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
            </div>

            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} CORSFIX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
