"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How does Sentinel analyze my code?",
    a: "We clone your repository into a secure, ephemeral sandbox. We run your test command, capture the raw stdout/stderr, and feed it into a context-aware LLM to generate fix suggestions."
  },
  {
    q: "Is my code safe?",
    a: "Yes. The sandbox is destroyed immediately after the run. We do not store your source code, only the logs and the AI analysis results."
  },
  {
    q: "Does it support Python/Go/Rust?",
    a: "Currently we have native support for Node.js/TypeScript. Python and Go support is in beta and can be enabled via the dashboard settings."
  },
  {
    q: "Can I self-host this?",
    a: "The Enterprise plan includes a Docker container that you can run on your own infrastructure for full data isolation."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#050505] border-t border-neutral-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-center text-3xl font-bold font-heading text-white mb-12">
          Knowledge <span className="text-green-500">Base</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-neutral-900 rounded-lg bg-black overflow-hidden cursor-pointer hover:border-neutral-800 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-white font-medium">{faq.q}</h3>
                {openIndex === i ? <Minus className="h-4 w-4 text-green-500" /> : <Plus className="h-4 w-4 text-neutral-500" />}
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 pt-0 text-neutral-400 text-sm leading-relaxed border-t border-neutral-900/50">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}