"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  Zap, 
  ShieldCheck, 
  SearchCode, 
  Cpu, 
  GitPullRequest 
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Neural Analysis",
    description: "Gemini AI parses raw logs to identify the exact root cause of failure, ignoring noise.",
    color: "text-green-500"
  },
  {
    icon: SearchCode,
    title: "Auto-Detection",
    description: "Instantly identifies stack (Node, Python, Go) and configured test runners without manual config.",
    color: "text-blue-500"
  },
  {
    icon: Zap,
    title: "Instant Fixes",
    description: "Generates copy-pasteable code patches for your specific errors directly in the dashboard.",
    color: "text-yellow-500"
  },
  {
    icon: GitPullRequest,
    title: "Zero-Config Setup",
    description: "Just connect your GitHub repository. Sentinel handles the webhooks and triggers automatically.",
    color: "text-purple-500"
  },
  {
    icon: ShieldCheck,
    title: "Isolated Runtime",
    description: "Every pipeline runs in an ephemeral, sandboxed environment for maximum security.",
    color: "text-red-500"
  },
  {
    icon: Cpu,
    title: "Resource Optimized",
    description: "Smart caching for dependencies reduces build times by up to 60% on repeat runs.",
    color: "text-cyan-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-black relative border-t border-neutral-900">
      
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
          System <span className="text-green-500">Capabilities</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Sentinel upgrades your CI/CD pipeline with intelligence. 
          Stop grepping through logs; start fixing code.
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-green-500/30 transition-colors"
          >
            <div className={`w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-4 group-hover:bg-neutral-800 transition-colors`}>
              <feature.icon className={`h-6 w-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-heading">{feature.title}</h3>
            <p className="text-neutral-500 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}