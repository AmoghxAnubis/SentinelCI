"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20 group-hover:border-green-500/50 transition-colors">
            <Terminal className="h-5 w-5 text-green-500" />
          </div>
          <span className="font-heading font-bold text-lg tracking-wide text-white">
            Sentinel<span className="text-green-500">CI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="#features" className="hover:text-green-400 transition-colors">Capabilities</Link>
          <Link href="#how-it-works" className="hover:text-green-400 transition-colors">Protocol</Link>
          <Link href="#pricing" className="hover:text-green-400 transition-colors">Access</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" className="text-neutral-500 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <div className="h-4 w-[1px] bg-neutral-800" />
          <Link href="/dashboard">
            <Button size="sm" className="bg-neutral-100 hover:bg-white text-black font-bold h-9 px-4">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}