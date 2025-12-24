import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-green-500/30 selection:text-green-200">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}