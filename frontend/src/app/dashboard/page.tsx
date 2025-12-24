"use client";

import { Button } from "@/components/ui/button";
import { Plus, GitBranch, Play, Clock, MoreVertical, CheckCircle2, XCircle, Terminal } from "lucide-react";
import { motion } from "framer-motion";

// Mock Data (We will connect to your API in the next step)
const projects = [
  {
    id: "1",
    name: "sentinel-backend",
    repoUrl: "github.com/amogh/sentinel-backend",
    status: "READY",
    lastRun: "PASSED",
    lastRunTime: "2 mins ago",
    branch: "main",
    coverage: 94
  },
  {
    id: "2",
    name: "sentinel-frontend",
    repoUrl: "github.com/amogh/sentinel-frontend",
    status: "READY",
    lastRun: "FAILED",
    lastRunTime: "1 hour ago",
    branch: "feat/dashboard",
    coverage: 82
  },
  {
    id: "3",
    name: "auth-service",
    repoUrl: "github.com/amogh/auth-service",
    status: "PENDING",
    lastRun: "PENDING",
    lastRunTime: "Just now",
    branch: "dev",
    coverage: null
  }
];

export default function DashboardPage() {
  return (
    <div className="h-full space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-8">
        <div>
          <h2 className="text-3xl font-bold font-heading text-white tracking-tight">Mission Control</h2>
          <p className="text-neutral-500 mt-1 font-mono text-sm">Active pipelines and system status.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-500 text-black font-bold border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#0A0A0A] border border-neutral-900 rounded-xl p-6 hover:border-green-500/30 transition-all overflow-hidden"
          >
             {/* Hover Glow Effect */}
             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

             {/* Card Header */}
             <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${project.lastRun === 'FAILED' ? 'bg-red-950/20 border-red-900/50 text-red-500' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}>
                        <GitBranch className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold font-heading tracking-wide">{project.name}</h3>
                        <p className="text-xs text-neutral-500 flex items-center gap-1 font-mono">
                            {project.repoUrl.replace("github.com/", "")}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                </Button>
             </div>

             {/* Status Section */}
             <div className="mt-6 flex items-center justify-between relative z-10 p-3 bg-black rounded-lg border border-neutral-900">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-neutral-600 font-bold tracking-wider mb-1">Status</span>
                    <div className="flex items-center gap-2">
                        {project.lastRun === "PASSED" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {project.lastRun === "FAILED" && <XCircle className="h-4 w-4 text-red-500" />}
                        {project.lastRun === "PENDING" && <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />}
                        
                        <span className={`text-sm font-bold ${
                            project.lastRun === "PASSED" ? "text-green-500" : 
                            project.lastRun === "FAILED" ? "text-red-500" : "text-yellow-500"
                        }`}>
                            {project.lastRun}
                        </span>
                    </div>
                </div>
                
                {/* Coverage Mini-Stat */}
                {project.coverage && (
                    <div className="flex flex-col items-end">
                         <span className="text-[10px] uppercase text-neutral-600 font-bold tracking-wider mb-1">Coverage</span>
                         <span className={`text-sm font-mono font-bold ${project.coverage > 90 ? 'text-green-400' : 'text-yellow-500'}`}>
                            {project.coverage}%
                         </span>
                    </div>
                )}
             </div>

             {/* Footer Actions */}
             <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 relative z-10">
                <div className="flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3" /> {project.lastRunTime}
                </div>
                <Button size="sm" variant="outline" className="border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white h-8 hover:border-green-500/50 transition-colors">
                    <Play className="h-3 w-3 mr-2 text-green-500" /> Run Pipe
                </Button>
             </div>
          </motion.div>
        ))}
        
        {/* Empty State / Add New Card */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border border-dashed border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center text-neutral-600 hover:border-neutral-700 hover:bg-neutral-900/20 transition-all cursor-pointer group"
        >
            <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6 text-neutral-500" />
            </div>
            <p className="font-medium group-hover:text-neutral-400">Initialize New Repo</p>
        </motion.div>
      </div>
    </div>
  );
}