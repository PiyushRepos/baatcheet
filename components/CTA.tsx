import Link from "next/link";
import Reveal from "./Reveal";
import GlowButton from "./ui/GlowButton";

export default function CTA() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-16 text-center">
            <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold">
                    Learn faster with <span className="text-orange-600">AI personas</span>
                </h2>
            </Reveal>
            <Reveal delay={100}>
                <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Instant answers, code samples, and design feedback — delivered in the voice of creators you trust.
                </p>
            </Reveal>
            <Reveal delay={160}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md mx-auto">
                    <GlowButton as="a" href="/chat?persona=hitesh" className="btn-shine group">Start free</GlowButton>
                    <Link className="rounded-full border border-orange-300/60 text-orange-700 dark:text-orange-300 w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-center hover:bg-orange-50/10 transition-colors" href="#learn">How it works</Link>
                </div>
            </Reveal>
        </section>
    );
}
