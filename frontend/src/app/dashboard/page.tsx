"use client";

import { Button } from "@/components/ui/button";
import { Plus, GitBranch, Play, CheckCircle2, XCircle, Loader2, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/api"; // Ensure this import works!

// Define what our Real Data looks like
interface Project {
  id: string;
  name: string;
  repoUrl: string;
  status: string;
  lastRunId?: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProjects();
        // The backend returns { data: [...] }
        setProjects(data.data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
        setError("Failed to load projects. Is the backend running on port 4000?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="h-full space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-8">
        <div>
          <h2 className="text-3xl font-bold font-heading text-white tracking-tight">Mission Control</h2>
          <p className="text-neutral-500 mt-1 font-mono text-sm">Active pipelines and system status.</p>
        </div>
        <Link href="/dashboard/new">
          <Button className="bg-green-600 hover:bg-green-500 text-black font-bold border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-lg flex items-center gap-3 text-red-500">
           <AlertCircle className="h-5 w-5" />
           {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
        </div>
      )}

      {/* Empty State (Real but empty) */}
      {!loading && projects.length === 0 && !error && (
         <div className="text-center py-20 text-neutral-500">
            <p>No projects found. Initialize one to get started.</p>
         </div>
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0A0A0A] border border-neutral-900 rounded-xl p-6 hover:border-green-500/30 transition-all overflow-hidden h-full"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Header */}
                <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg border bg-neutral-900 border-neutral-800 text-neutral-400">
                            <GitBranch className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold font-heading tracking-wide truncate max-w-[180px]">{project.name}</h3>
                            <p className="text-xs text-neutral-500 flex items-center gap-1 font-mono truncate max-w-[150px]">
                                {project.repoUrl.replace("https://github.com/", "")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status Section */}
                <div className="mt-6 flex items-center justify-between relative z-10 p-3 bg-black rounded-lg border border-neutral-900">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-neutral-600 font-bold tracking-wider mb-1">Status</span>
                        <div className="flex items-center gap-2">
                             {project.status === "READY" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                             ) : (
                                <Clock className="h-4 w-4 text-yellow-500" />
                             )}
                            <span className={`text-sm font-bold ${project.status === "READY" ? "text-green-500" : "text-yellow-500"}`}>
                                {project.status}
                            </span>
                        </div>
                    </div>
                </div>
              </motion.div>
            </Link>
          ))}
          
          {/* "Add New" Card */}
          <Link href="/dashboard/new">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border border-dashed border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center text-neutral-600 hover:border-neutral-700 hover:bg-neutral-900/20 transition-all cursor-pointer group h-full min-h-[180px]"
            >
                <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="h-6 w-6 text-neutral-500" />
                </div>
                <p className="font-medium group-hover:text-neutral-400">Initialize New Repo</p>
            </motion.div>
          </Link>
        </div>
      )}
    </div>
  );
}