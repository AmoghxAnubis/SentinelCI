import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Protocol } from "@/components/landing/protocol";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-green-500/30 selection:text-green-200">
      <Navbar />
      <Hero />
      <Protocol />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}