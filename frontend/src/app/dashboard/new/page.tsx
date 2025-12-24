"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Github, Terminal, Shield, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NewProjectPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto pt-8">
      
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-neutral-500 hover:text-white flex items-center gap-2 mb-4 text-sm font-mono transition-colors">
           <ArrowLeft className="h-4 w-4" /> CANCEL_INIT
        </Link>
        <h1 className="text-3xl font-bold text-white font-heading">Initialize New Target</h1>
        <p className="text-neutral-500 mt-2">Connect a repository to begin monitoring.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8 text-sm font-mono">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-green-500" : "text-neutral-600"}`}>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${step >= 1 ? "border-green-500 bg-green-500/10" : "border-neutral-700"}`}>1</div>
            <span>SOURCE</span>
        </div>
        <div className="h-[1px] w-8 bg-neutral-800" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-green-500" : "text-neutral-600"}`}>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${step >= 2 ? "border-green-500 bg-green-500/10" : "border-neutral-700"}`}>2</div>
            <span>CONFIG</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-[#0A0A0A] border border-neutral-900 rounded-xl p-8 relative overflow-hidden">
        
        {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-neutral-300">Repository URL</Label>
                        <div className="relative">
                            <Github className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
                            <Input 
                                placeholder="https://github.com/username/repo" 
                                className="pl-10 bg-black border-neutral-800 h-12 text-white focus-visible:ring-green-500" 
                            />
                        </div>
                        <p className="text-xs text-neutral-500">Public repositories are supported by default.</p>
                    </div>

                    <Button onClick={() => setStep(2)} className="w-full bg-green-600 hover:bg-green-500 text-black font-bold h-12">
                        Verify Connection
                    </Button>
                </div>
            </motion.div>
        )}

        {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="space-y-6">
                    <div className="p-4 bg-green-950/10 border border-green-900/30 rounded-lg flex items-center gap-3 text-green-500 mb-6">
                        <Check className="h-5 w-5" />
                        <span className="text-sm font-mono">Repository verified successfully.</span>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-neutral-300">Project Name</Label>
                        <Input defaultValue="sentinel-backend" className="bg-black border-neutral-800 h-12 text-white" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-neutral-300">Branch</Label>
                            <Input defaultValue="main" className="bg-black border-neutral-800 h-12 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300">Test Command</Label>
                            <div className="relative">
                                <Terminal className="absolute left-3 top-3.5 h-4 w-4 text-neutral-500" />
                                <Input defaultValue="npm test" className="pl-9 bg-black border-neutral-800 h-12 text-white" />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold h-12 mt-4 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                        Initialize Pipeline
                    </Button>
                </div>
            </motion.div>
        )}

      </div>
    </div>
  );
}