"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  GitBranch, 
  Settings, 
  Terminal,
  Activity,
  ShieldAlert,
  LogOut
} from "lucide-react";

const routes = [
  {
    label: "Mission Control",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-green-500",
  },
  {
    label: "Repositories",
    icon: GitBranch,
    href: "/dashboard/projects",
    color: "text-green-500",
  },
  {
    label: "System Config",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-neutral-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#050505] border-r border-neutral-900 text-white">
      <div className="px-3 py-2 flex-1">
        
        {/* Logo Area */}
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 group">
          <div className="relative w-8 h-8 mr-4 flex items-center justify-center bg-green-500/10 rounded-lg border border-green-500/20 group-hover:border-green-500/50 transition-colors">
            <Terminal className="h-5 w-5 text-green-500" />
          </div>
          <h1 className="text-xl font-bold font-heading tracking-wider">
            Sentinel<span className="text-green-600">CI</span>
          </h1>
        </Link>
        
        {/* Navigation Links */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-neutral-900/50 rounded-lg transition border border-transparent",
                pathname === route.href ? "text-white bg-neutral-900/80 border-neutral-800" : "text-neutral-500"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                <span className="font-mono tracking-tight">{route.label}</span>
              </div>
              {pathname === route.href && (
                 <Activity className="h-4 w-4 text-green-500 animate-pulse ml-auto" />
              )}
            </Link>
          ))}
        </div>
      </div>
      
      {/* System Status Footer */}
      <div className="px-3 py-2">
         <div className="p-3 bg-red-950/10 border border-red-900/20 rounded-lg group hover:border-red-900/40 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-red-500/80 text-xs font-mono">
                    <ShieldAlert className="h-3 w-3" /> SECURITY LEVEL
                </div>
                <LogOut className="h-3 w-3 text-red-500/50 group-hover:text-red-500 transition-colors" />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-red-400">
                <span>DEFCON 1</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
            </div>
         </div>
      </div>
    </div>
  );
}