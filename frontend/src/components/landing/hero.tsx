"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-16 md:pt-24 lg:pt-32 pb-24">
      {/* Background Gradient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-violet-900/20 px-3 py-1 text-sm font-medium text-violet-300 border border-violet-700/50 mb-8 backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3" />
          <span>Sentinel AI v1.0 is coming</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl max-w-5xl"
        >
          Your CI Pipeline, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
            Now with a Brain.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed"
        >
          SentinelCI analyzes your test failures, detects your stack, and suggests fixes automatically. 
          Stop digging through thousands of lines of logs.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <Input 
            type="email" 
            placeholder="Enter your email for access" 
            className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 h-12"
          />
          <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 h-12 px-8">
            Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="mt-8 flex items-center gap-4 text-sm text-slate-500"
        >
            <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800" />
                ))}
            </div>
            <p>Joined by 200+ developers</p>
        </motion.div>

        {/* The "Product Demo" Visual - Mock Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 relative w-full max-w-5xl rounded-xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-left group hover:border-violet-500/30 transition-colors duration-500"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 text-xs text-slate-500 font-mono flex items-center gap-2 px-2 py-1 rounded bg-slate-900">
                    <Terminal className="h-3 w-3" /> sentinel-ci run --verbose
                </div>
            </div>
            <div className="text-xs text-slate-500">Node v20.10.0</div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm h-[420px] bg-slate-950/80 backdrop-blur-sm overflow-hidden relative">
            
            {/* Standard Logs */}
            <div className="space-y-1">
                <div className="text-slate-400">$ npm test</div>
                <div className="text-slate-500"> sentinel-backend@1.0.0 test</div>
                <div className="text-slate-500"> jest --coverage</div>
                <div className="text-yellow-400 mt-2">RUNS src/auth/login.test.ts</div>
                <div className="text-slate-300">PASS src/utils/hash.test.ts</div>
                <div className="text-red-400 font-bold mt-2">✖ FAIL src/auth/login.test.ts</div>
                <div className="pl-4 text-slate-400 border-l-2 border-slate-800 ml-1 mt-2 mb-4">
                    <p>Error: Request failed with status code 401</p>
                    <p className="text-slate-500">at Object.&lt;anonymous&gt; (src/auth/login.test.ts:42:15)</p>
                </div>
            </div>
            
            {/* The Sentinel "AI" Moment */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-6 mx-auto max-w-2xl"
            >
                <div className="p-[1px] rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500">
                    <div className="bg-slate-950 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-violet-400 mb-3 border-b border-slate-800 pb-2">
                            <Sparkles className="h-4 w-4" /> 
                            <span className="font-bold text-sm">Sentinel Insight Analysis</span>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                            The test failed because the <code className="bg-slate-900 px-1 py-0.5 rounded text-white border border-slate-700">mockUser</code> token has expired in your test setup.
                        </p>

                        <div className="bg-slate-900/50 rounded border border-slate-800 p-3">
                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                                <CheckCircle2 className="h-3 w-3" /> SUGGESTED FIX
                            </div>
                            <div className="text-slate-400 text-xs">
                                Update <span className="text-white underline decoration-dotted">tests/setup.ts</span> line 42:
                            </div>
                            <code className="block mt-2 text-green-400 text-xs bg-slate-950 p-2 rounded border border-slate-800">
                                - expiresIn: '1h'<br/>
                                + expiresIn: '24h'
                            </code>
                        </div>
                    </div>
                </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}