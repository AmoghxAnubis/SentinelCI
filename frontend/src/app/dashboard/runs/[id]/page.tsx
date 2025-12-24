"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal, AlertTriangle, CheckCircle2, Copy, Download, Cpu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RunDetailsPage() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4">
        <div className="flex items-center gap-4">
            <Link href="/dashboard/projects/1" className="text-neutral-500 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-red-500">FAILED</span> 
                    <span className="text-neutral-600">/</span>
                    <span className="font-mono text-base text-neutral-300">Run #a1b2c3d</span>
                </h1>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">Executed 2 mins ago • Duration 45s</p>
            </div>
        </div>
        <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-neutral-800 bg-black text-neutral-400 hover:text-white h-8">
                <Download className="mr-2 h-3 w-3" /> Raw Logs
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white font-bold h-8 border border-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                Re-Run Job
            </Button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* Left: Terminal Output */}
        <div className="flex flex-col bg-[#050505] rounded-xl border border-neutral-800 overflow-hidden">
            <div className="px-4 py-2 bg-neutral-900/50 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <Terminal className="h-3 w-3" /> CONSOLE_OUTPUT
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto text-neutral-300 scrollbar-thin scrollbar-thumb-neutral-800">
                <div className="opacity-50 mb-2">$ npm run test:unit</div>
                <div className="text-green-500/50">✓ src/utils/formatter.test.ts (Passed)</div>
                <div className="text-green-500/50">✓ src/api/health.test.ts (Passed)</div>
                <div className="text-red-500 font-bold mt-4">✖ FAIL src/auth/login.test.ts</div>
                <div className="pl-4 border-l border-neutral-800 my-2 text-neutral-400">
                    Error: Expected 200, received 401 Unauthorized<br/>
                    at Object.it (src/auth/login.test.ts:42:15)<br/>
                    at processTicksAndRejections (internal/process/task_queues:95:5)
                </div>
                <div className="text-red-500 mt-4">Test Suites: 1 failed, 2 passed, 3 total</div>
                <div className="text-red-500">Tests:       1 failed, 14 passed, 15 total</div>
                <div className="text-red-500">Snapshots:   0 total</div>
                <div className="text-red-500">Time:        3.456 s</div>
                <div className="animate-pulse mt-2">_</div>
            </div>
        </div>

        {/* Right: AI Analysis */}
        <div className="flex flex-col space-y-4 overflow-y-auto pr-1">
            
            {/* Analysis Card */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-5"
            >
                <div className="flex items-center gap-2 mb-4 text-green-500 font-bold font-heading tracking-wide border-b border-neutral-800 pb-2">
                    <Cpu className="h-4 w-4" /> SENTINEL ANALYSIS
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed">
                    The failure in <code className="text-red-400 bg-red-950/30 px-1 rounded">login.test.ts</code> is caused by a 401 Unauthorized response. This typically happens when the mock authentication token used in the test environment has expired or is invalid.
                </p>
            </motion.div>

            {/* Suggestions Card */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 bg-gradient-to-b from-red-950/10 to-transparent border border-red-900/30 rounded-xl p-5"
            >
                <div className="flex items-center gap-2 mb-4 text-red-400 font-bold font-heading tracking-wide">
                    <AlertTriangle className="h-4 w-4" /> SUGGESTED FIX
                </div>
                
                <div className="space-y-4">
                    <div className="bg-black border border-neutral-800 rounded-lg p-4 relative group">
                        <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-6 w-6 text-neutral-500 hover:text-white">
                            <Copy className="h-3 w-3" />
                        </Button>
                        <div className="text-xs text-neutral-500 mb-2 font-mono">tests/setup.ts</div>
                        <code className="text-sm font-mono block">
                            <span className="text-neutral-500">// Update token expiration</span><br/>
                            <span className="text-red-500">- expiresIn: '1h'</span><br/>
                            <span className="text-green-500">+ expiresIn: '24h'</span>
                        </code>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-neutral-400 bg-neutral-900/20 p-3 rounded-lg border border-neutral-900">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Ensure the <code className="text-white">JWT_SECRET</code> in your .env.test matches the one used to sign the mock token.</span>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </div>
  );
}