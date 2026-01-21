"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Github, Terminal, Check, Loader2, AlertCircle } from "lucide-react"; // Added Loader2, AlertCircle
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { createProject } from "@/lib/api"; // Import our API helper
import { useRouter } from "next/navigation"; // To redirect after success

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    repoUrl: "",
    name: "",
    defaultBranch: "main",
    testCommand: "npm test"
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Step 1: "Verify" (Simulated for now, just checks if URL is not empty)
  const handleVerify = () => {
    if (!formData.repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub URL.");
      return;
    }
    setError("");
    
    // Auto-fill project name from repo URL if empty
    if (!formData.name) {
      const parts = formData.repoUrl.split("/");
      const repoName = parts[parts.length - 1]?.replace(".git", "") || "my-project";
      handleChange("name", repoName);
    }
    
    setStep(2);
  };

  // Step 2: Submit to Backend
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await createProject(formData);
      // Redirect to dashboard on success
      router.push("/dashboard");
      router.refresh(); // Ensure dashboard re-fetches data
    } catch (err) {
      console.error(err);
      setError("Failed to create project. Ensure Backend is running on Port 4000.");
    } finally {
      setLoading(false);
    }
  };

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
        
        {/* Error Banner */}
        {error && (
            <div className="mb-6 p-3 bg-red-950/20 border border-red-900/50 rounded-lg flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
            </div>
        )}

        {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-neutral-300">Repository URL</Label>
                        <div className="relative">
                            <Github className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
                            <Input 
                                placeholder="https://github.com/username/repo" 
                                value={formData.repoUrl}
                                onChange={(e) => handleChange("repoUrl", e.target.value)}
                                className="pl-10 bg-black border-neutral-800 h-12 text-white focus-visible:ring-green-500" 
                            />
                        </div>
                        <p className="text-xs text-neutral-500">Public repositories are supported by default.</p>
                    </div>

                    <Button onClick={handleVerify} className="w-full bg-green-600 hover:bg-green-500 text-black font-bold h-12">
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
                        <Input 
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="bg-black border-neutral-800 h-12 text-white" 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-neutral-300">Branch</Label>
                            <Input 
                                value={formData.defaultBranch}
                                onChange={(e) => handleChange("defaultBranch", e.target.value)}
                                className="bg-black border-neutral-800 h-12 text-white" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300">Test Command</Label>
                            <div className="relative">
                                <Terminal className="absolute left-3 top-3.5 h-4 w-4 text-neutral-500" />
                                <Input 
                                    value={formData.testCommand}
                                    onChange={(e) => handleChange("testCommand", e.target.value)}
                                    className="pl-9 bg-black border-neutral-800 h-12 text-white" 
                                />
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-black font-bold h-12 mt-4 shadow-[0_0_20px_rgba(34,197,94,0.2)] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Initialize Pipeline"}
                    </Button>
                </div>
            </motion.div>
        )}

      </div>
    </div>
  );
}