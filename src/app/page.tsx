'use client';

import { useState } from 'react';
import { analyzeCORSError, CORSAnalysis } from '@/lib/parser';
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import { logCORSError } from '@/lib/logger';

export default function Home() {
  const [errorInput, setErrorInput] = useState('');
  const [analysis, setAnalysis] = useState<CORSAnalysis | null>(null);
  const { userId } = useAuth();

  const handleExplain = async () => {
    if (!errorInput.trim()) return;
    const result = analyzeCORSError(errorInput);
    setAnalysis(result);

    // Background log to Firebase
    analyticsLog(result, errorInput);
  };

  const analyticsLog = async (result: CORSAnalysis, raw: string) => {
    await logCORSError(result.errorType, result.framework, raw, userId || undefined);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 py-20">
      <div className="mesh-bg" />

      {/* Navbar Placeholder */}
      <nav className="absolute top-0 w-full max-w-7xl flex justify-between items-center py-8 px-6">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          CORSFIXER
        </div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="glass py-2 px-6 text-sm font-medium hover:text-indigo-400 transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10' } }} />
        </SignedIn>
      </nav>

      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Fix CORS <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">errors</span> instantly.
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          No signups. No nonsense. Paste your error message below and get framework-specific fixes in seconds.
        </p>

        {/* Input Area */}
        <div className="glass p-2 flex flex-col md:flex-row gap-2 items-stretch">
          <textarea
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            placeholder="Access to fetch at '...' from origin '...' has been blocked by CORS policy..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white p-4 min-h-[120px] outline-none"
          />
          <button
            onClick={handleExplain}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center"
          >
            Explain
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="max-w-4xl w-full animate-fade-in space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-8">
              <h3 className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">Problem</h3>
              <h2 className="text-2xl font-bold mb-4">{analysis.errorType}</h2>
              <p className="text-gray-300 leading-relaxed">
                {analysis.reason}
              </p>
            </div>

            <div className="glass p-8 bg-indigo-500/5">
              <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2">The Fix</h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                {analysis.solution}
              </p>
              <div className="text-xs text-gray-500 font-mono">
                Suggested Framework: <span className="text-gray-300">{analysis.framework}</span>
              </div>
            </div>
          </div>

          <div className="glass p-8 overflow-hidden">
            <h3 className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-4">Code Snippet</h3>
            <pre className="p-6 bg-black/40 rounded-xl font-mono text-sm text-indigo-200 overflow-x-auto border border-white/5">
              <code>{analysis.codeSnippet}</code>
            </pre>
            <button
              className="mt-4 text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              onClick={() => navigator.clipboard.writeText(analysis.codeSnippet)}
            >
              Click to Copy Code
            </button>
          </div>

          <div className="flex justify-center pt-8">
            <div className="text-gray-500 text-sm">
              Need more advanced help? <button className="text-indigo-400 hover:underline">Get Pro Explainer</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CORSFIXER. Designed for developers.
      </footer>
    </main>
  );
}
