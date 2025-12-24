import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-[#050505] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <span className="font-heading font-bold text-xl text-white tracking-wide">
              Sentinel<span className="text-green-500">CI</span>
            </span>
            <p className="mt-4 text-neutral-500 text-sm max-w-xs">
              Next-generation continuous integration platform powered by generative intelligence.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="hover:text-green-500 cursor-pointer">Features</li>
              <li className="hover:text-green-500 cursor-pointer">Integrations</li>
              <li className="hover:text-green-500 cursor-pointer">Changelog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="hover:text-green-500 cursor-pointer">Privacy Protocol</li>
              <li className="hover:text-green-500 cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* Status Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-green-500 font-mono bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <Activity className="h-3 w-3 animate-pulse" />
                ALL SYSTEMS OPERATIONAL
            </div>
            <p className="text-neutral-600 text-xs">
                © 2024 Sentinel Operations. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}