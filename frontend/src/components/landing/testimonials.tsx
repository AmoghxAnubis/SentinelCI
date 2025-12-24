"use client";

import { Terminal } from "lucide-react";

const logs = [
  {
    user: "alex_dev",
    role: "Senior Engineer",
    msg: "Sentinel saved me 4 hours of debugging yesterday. The AI suggestion was literally the exact code I needed."
  },
  {
    user: "sarah_cto",
    role: "Tech Lead",
    msg: "Finally a CI tool that doesn't just scream 'FAILED' at you. It actually tells you WHY."
  },
  {
    user: "jason_fs",
    role: "Full Stack",
    msg: "The setup took 30 seconds. Pointed it at my Next.js repo and it just worked."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black border-t border-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold font-heading text-white mb-16">
          User <span className="text-green-500">Logs</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {logs.map((log, i) => (
            <div key={i} className="bg-neutral-950 p-6 rounded-xl border border-neutral-900 font-mono text-sm relative overflow-hidden group hover:border-green-900 transition-colors">
               <div className="flex items-center gap-2 mb-4 text-neutral-500 border-b border-neutral-900 pb-2">
                 <Terminal className="h-3 w-3" /> 
                 <span>ssh {log.user}@sentinel</span>
               </div>
               <p className="text-green-400 mb-4">"{log.msg}"</p>
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-neutral-400 text-xs">{log.user} // {log.role}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}