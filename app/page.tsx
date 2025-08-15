import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Personas from "@/components/Personas";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <Personas />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <footer className="border-t border-black/5 bg-slate-900 text-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold">BaatCheet</div>
            <p className="text-sm text-slate-400">Chat with AI personas of your favorite tech creators.</p>
          </div>
          <div className="text-sm text-slate-400">© {new Date().getFullYear()} BaatCheet AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
