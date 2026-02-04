import { auth, currentUser } from '@clerk/nextjs/server';
import { sql, ErrorLog } from '@/lib/db';
import Navbar from '@/components/Navbar';
import { Terminal, Calendar, Code2, ChevronRight, History, ShieldAlert, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
    const { userId } = await auth();
    const user = await currentUser();
    const isPro = user?.publicMetadata?.role === 'pro';

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="glass p-12 max-w-md">
                    <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-400 mb-8">Please sign in to view your CORS history and snippet library.</p>
                    <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all">
                        Back Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!isPro) {
        return (
            <main className="relative min-h-screen">
                <div className="mesh-bg" />
                <Navbar />
                <div className="max-w-7xl mx-auto px-6 pt-40 flex flex-col items-center text-center relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 mb-8 border border-indigo-600/20 shadow-2xl shadow-indigo-600/20">
                        <Zap className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Uncover the <span className="text-gradient-primary">Pro Library</span></h1>
                    <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
                        The Developer Dashboard and Snippet History are exclusive to Pro members. Upgrade now to save your fixes and access them anytime.
                    </p>
                    <Link
                        href="/#pricing"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                        See Pro Plans
                    </Link>
                </div>
            </main>
        );
    }

    // Fetch logs for the user
    const logs = await sql`
    SELECT * FROM error_logs 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC 
    LIMIT 50
  ` as ErrorLog[];

    return (
        <main className="relative min-h-screen">
            <div className="mesh-bg" />
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
                            <History className="w-4 h-4" />
                            Developer Dashboard
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">Your Snippet <span className="text-gradient-primary">Library</span></h1>
                    </div>

                    <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4 border-indigo-500/20">
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Total Analytics</p>
                            <p className="text-xl font-black text-white">{logs.length} <span className="text-xs text-gray-500">Fixed</span></p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                            <Code2 className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {logs.length === 0 ? (
                    <div className="glass p-20 text-center rounded-3xl border-dashed border-white/10">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-600">
                            <Terminal className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No history yet</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-8">Start by analyzing a CORS error on the home page. Your results will be saved here automatically.</p>
                        <Link href="/" className="text-indigo-400 font-bold flex items-center gap-2 justify-center hover:underline">
                            Go to Analyzer <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {logs.map((log) => (
                            <div key={log.id} className="glass p-6 rounded-2xl group hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                        <History className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-lg font-bold text-white">{log.error_type}</span>
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-gray-500 border border-white/5">
                                                {log.framework}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-1 font-mono opacity-60">
                                            {log.raw_error}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full md:w-auto">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(log.created_at).toLocaleDateString()}
                                    </div>
                                    <button className="flex-1 md:flex-none py-2 px-6 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all border border-white/5">
                                        View Solution
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
