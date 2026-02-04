'use client';

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Zap, LayoutDashboard, Crown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ onUpgradeClick }: { onUpgradeClick?: () => void }) {
  const { user } = useUser();
  const isPro = user?.publicMetadata?.role === 'pro';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
            <Image
              src="/logo.png"
              alt="CORSFIX Logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-bold tracking-tight text-lg">
            CORS<span className="text-indigo-400">FIX</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <SignedIn>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-400">
              <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4" />
                History
              </Link>
            </div>

            <div className="h-4 w-px bg-white/10 mx-2" />

            {isPro ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                <Crown className="w-3 h-3" />
                PRO
              </div>
            ) : (
              <button
                onClick={onUpgradeClick}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold hover:bg-yellow-500/20 transition-all"
              >
                <Zap className="w-3 h-3" />
                UPGRADE
              </button>
            )}

            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-8 h-8 border border-white/10 hover:border-white/20 transition-all'
                }
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                Join Free
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
