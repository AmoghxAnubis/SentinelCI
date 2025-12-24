"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#050505] border-t border-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
            System <span className="text-green-500">Access</span>
          </h2>
          <p className="text-neutral-500">Initialize your workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Free Tier */}
          <div className="p-8 rounded-2xl border border-neutral-800 bg-black flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Developer</h3>
            <div className="text-4xl font-bold text-white mb-6">$0 <span className="text-lg text-neutral-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm text-neutral-400">
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> 5 Projects</li>
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> 100 Runs / month</li>
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> Basic AI Analysis</li>
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> Community Support</li>
            </ul>
            <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold h-12">
              Start Free
            </Button>
          </div>

          {/* Pro Tier - Green Border */}
          <div className="p-8 rounded-2xl border border-green-500/30 bg-green-950/5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Operator</h3>
            <div className="text-4xl font-bold text-white mb-6">$29 <span className="text-lg text-neutral-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm text-neutral-300">
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-400" /> Unlimited Projects</li>
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-400" /> Unlimited Runs</li>
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-400" /> Advanced Gemini Pro Models</li>
              <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-400" /> Priority Execution Queue</li>
            </ul>
            <Button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold h-12 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              Upgrade System
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}