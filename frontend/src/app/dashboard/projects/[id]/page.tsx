"use client";

import { Button } from "@/components/ui/button";
import { GitBranch, Play, Clock, ArrowLeft, CheckCircle2, XCircle, AlertCircle, Hash } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock Data for Run History
const runs = [
  { id: "run_1", status: "FAILED", commit: "a1b2c3d", message: "fix: update auth logic", time: "2 mins ago", duration: "45s" },
  { id: "run_2", status: "PASSED", commit: "e5f6g7h", message: "feat: add user profile", time: "2 hours ago", duration: "1m 20s" },
  { id: "run_3", status: "PASSED", commit: "i8j9k0l", message: "chore: update deps", time: "5 hours ago", duration: "30s" },
];

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Navigation & Header */}
      <div>
        <Link href="/dashboard" className="text-neutral-500 hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm font-mono">
           <ArrowLeft className="h-4 w-4" /> BACK_TO_FLEET
        </Link>
        
        <div className="flex items-center justify-between border-b border-neutral-900 pb-6">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-neutral-900 rounded-xl flex items-center justify-center border border-neutral-800">
                    <GitBranch className="h-6 w-6 text-green-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white font-heading tracking-wide">sentinel-backend</h1>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 font-mono mt-1">
                        <span className="flex items-center gap-1"><Hash className="h-3 w-3" /> main</span>
                        <span>•</span>
                        <span>Node.js v20</span>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3">
                <Button variant="outline" className="border-neutral-800 bg-black text-neutral-400 hover:text-white hover:bg-neutral-900">
                    Config
                </Button>
                <Button className="bg-green-600 hover:bg-green-500 text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] border border-green-500/50">
                    <Play className="mr-2 h-4 w-4" /> Trigger Run
                </Button>
            </div>
        </div>
      </div>

      {/* Run History List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" /> Execution History
        </h3>

        <div className="grid gap-3">
            {runs.map((run, i) => (
                <motion.div 
                    key={run.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Link href={`/dashboard/runs/${run.id}`} className="block group">
                        <div className="bg-[#0A0A0A] border border-neutral-900 rounded-lg p-4 flex items-center justify-between hover:border-green-500/30 hover:bg-neutral-900/30 transition-all">
                            
                            <div className="flex items-center gap-4">
                                {/* Status Icon */}
                                <div className={`p-2 rounded-full border ${run.status === 'PASSED' ? 'bg-green-950/20 border-green-900/50 text-green-500' : 'bg-red-950/20 border-red-900/50 text-red-500'}`}>
                                    {run.status === 'PASSED' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`text-sm font-bold tracking-wider ${run.status === 'PASSED' ? 'text-green-500' : 'text-red-500'}`}>
                                            {run.status}
                                        </span>
                                        <span className="text-neutral-600 text-xs font-mono">#{run.commit}</span>
                                    </div>
                                    <p className="text-neutral-300 text-sm font-medium group-hover:text-white transition-colors">
                                        {run.message}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right text-xs font-mono text-neutral-500">
                                <p className="mb-1 flex items-center justify-end gap-1">
                                    <Clock className="h-3 w-3" /> {run.time}
                                </p>
                                <p>Duration: {run.duration}</p>
                            </div>

                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}