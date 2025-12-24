"use client";

import { motion } from "framer-motion";
import { GitBranch, Scan, BrainCircuit, CheckSquare } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    title: "Link Repository",
    desc: "Connect your GitHub repo. Sentinel automatically detects your branch structure.",
    color: "text-neutral-400"
  },
  {
    icon: Scan,
    title: "Deep Scan",
    desc: "We analyze your package.json, detecting test runners (Jest, Vitest, Pytest) instantly.",
    color: "text-blue-400"
  },
  {
    icon: BrainCircuit,
    title: "Neural Analysis",
    desc: "On failure, Gemini AI reads the raw logs, ignoring noise to find the root cause.",
    color: "text-green-500"
  },
  {
    icon: CheckSquare,
    title: "Patch Generation",
    desc: "Sentinel writes the fix code. You just copy-paste or click 'Apply' (coming soon).",
    color: "text-red-400"
  }
];

export function Protocol() {
  return (
    <section id="how-it-works" className="py-24 bg-black border-t border-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
            Execution <span className="text-green-500">Protocol</span>
          </h2>
          <p className="text-neutral-500">From commit to fix in under 30 seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-black border border-neutral-800 flex items-center justify-center mb-6 z-10 group-hover:border-green-500/50 transition-colors shadow-2xl">
                <step.icon className={`h-10 w-10 ${step.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}