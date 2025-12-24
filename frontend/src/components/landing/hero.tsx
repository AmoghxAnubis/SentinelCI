"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Code2, AlertTriangle, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pt-16 md:pt-24 lg:pt-32 pb-24">
      {/* Background Gradient Mesh - Green/Red */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-900/20 blur-[120px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none opacity-30" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Badge - Green Terminal Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-green-950/30 px-3 py-1 text-sm font-medium text-green-400 border border-green-900/50 mb-8 backdrop-blur-md"
        >
          <Code2 className="h-3 w-3" />
          <span>Sentinel CI: Online & Monitoring</span>
        </motion.div>

        {/* Headline with Green -> White -> Red Gradient */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl max-w-5xl font-heading"
        >
          Your CI Pipeline, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-200 to-red-500">
            Now with a Brain.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-neutral-400 leading-relaxed"
        >
          SentinelCI analyzes your test failures, detects your stack, and suggests fixes automatically. 
          Stop digging through thousands of lines of logs.
        </motion.p>

        {/* Waitlist Form - Green Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <Input 
            type="email" 
            placeholder="Enter your email for access" 
            className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-500 h-12 focus-visible:ring-green-500 focus-visible:border-green-500"
          />
          <Button size="lg" className="bg-green-600 hover:bg-green-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] h-12 px-8 border border-green-400/50">
            Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="mt-8 flex items-center gap-4 text-sm text-neutral-500"
        >
            <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-neutral-800" />
                ))}
            </div>
            <p>Joined by 200+ developers</p>
        </motion.div>

        {/* The "Product Demo" Visual - Mock Terminal (Matrix Style) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 relative w-full max-w-5xl rounded-xl bg-black border border-neutral-800 shadow-2xl overflow-hidden text-left group hover:border-green-500/30 transition-colors duration-500"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#050505] border-b border-neutral-900">
            <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-600/20 border border-red-600/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-600/20 border border-yellow-600/50" />
                <div className="w-3 h-3 rounded-full bg-green-600/20 border border-green-600/50" />
                </div>
                <div className="ml-4 text-xs text-green-500/50 font-mono flex items-center gap-2 px-2 py-1 rounded bg-neutral-900/30 border border-neutral-800">
                    <Terminal className="h-3 w-3" /> sentinel-ci run --verbose
                </div>
            </div>
            <div className="text-xs text-neutral-600">Node v20.10.0</div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm h-[420px] bg-black relative">
            
            {/* Standard Logs */}
            <div className="space-y-1">
                <div className="text-neutral-500">$ npm test</div>
                <div className="text-neutral-600"> sentinel-backend@1.0.0 test</div>
                <div className="text-neutral-600"> jest --coverage</div>
                <div className="text-yellow-600 mt-2">RUNS src/auth/login.test.ts</div>
                <div className="text-green-500">PASS src/utils/hash.test.ts</div>
                <div className="text-red-500 font-bold mt-2">✖ FAIL src/auth/login.test.ts</div>
                <div className="pl-4 text-neutral-500 border-l-2 border-neutral-900 ml-1 mt-2 mb-4">
                    <p>Error: Request failed with status code 401</p>
                    <p className="text-neutral-600">at Object.&lt;anonymous&gt; (src/auth/login.test.ts:42:15)</p>
                </div>
            </div>
            
            {/* The Sentinel "AI" Moment - Green/Red Theme */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-6 mx-auto max-w-2xl"
            >
                <div className="p-[1px] rounded-lg bg-gradient-to-r from-green-600 via-emerald-600 to-red-600">
                    <div className="bg-black rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-400 mb-3 border-b border-neutral-900 pb-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" /> 
                            <span className="font-bold text-sm tracking-wide text-white">SENTINEL ANALYSIS</span>
                        </div>
                        
                        <p className="text-neutral-300 mb-4">
                            The test failed because the <code className="bg-neutral-900 px-1 py-0.5 rounded text-green-400 border border-neutral-800">mockUser</code> token has expired in your test setup.
                        </p>

                        <div className="bg-neutral-900/30 rounded border border-neutral-800 p-3">
                            <div className="flex items-center gap-2 text-green-500 text-xs font-bold mb-1">
                                <CheckCircle2 className="h-3 w-3" /> SUGGESTED FIX
                            </div>
                            <div className="text-neutral-500 text-xs">
                                Update <span className="text-white underline decoration-dotted">tests/setup.ts</span> line 42:
                            </div>
                            <code className="block mt-2 text-green-400 text-xs bg-[#050505] p-2 rounded border border-neutral-900">
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