import Image from "next/image";
import Reveal from "./Reveal";
import GlowButton from "./ui/GlowButton";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden dark-landing-bg">
            <div className="pointer-events-none absolute inset-0 bg-dots" />
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
                <Reveal>
                    <div className="inline-flex items-center gap-2 text-orange-600 font-medium">
                        <span className="size-1.5 rounded-full bg-orange-500 animate-float" />
                        Haanji
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <h1 className="mt-4 text-4xl text-balance md:text-5xl font-extrabold tracking-tight headline-underline">
                        Chat, learn, and collaborate with <span className="text-orange-500">expert personas</span> tailored to your needs
                    </h1>
                </Reveal>

                <Reveal delay={160}>
                    <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300 text-lg">
                        Pick a persona and start a casual chat. Get crisp answers, code tips and design feedback from your favorite creators.
                    </p>
                </Reveal>

                <Reveal delay={220}>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start w-full sm:w-auto">
                        <GlowButton as={Link} href="/chat?persona=hitesh" className="btn-shine group">Start Chatting</GlowButton>
                        <Link
                            className="rounded-full transition border border-orange-300/60 text-orange-700 dark:text-orange-300 w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base duration-200 hover:bg-orange-50/10 hover:scale-105 active:scale-95 transform text-center"
                            href="#creators"
                        >
                            Explore Creators
                        </Link>
                    </div>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Pick a creator", text: "Choose from our lineup of tech creators." },
                        { title: "Start chatting", text: "Ask questions and get helpful replies." },
                        { title: "Learn, vibe, repeat", text: "Casual convos that teach & inspire." },
                    ].map((item, i) => (
                        <Reveal key={i} delay={120 + i * 100}>
                            <div className="rounded-2xl border border-black/5 bg-white dark:bg-slate-900/60 p-6 shadow-sm card-hover">
                                <div className="mb-3 text-orange-600">0{i + 1}</div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{item.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
