import Reveal from "./Reveal";

const quotes = [
    {
        by: "Rahul Kumar",
        text:
            "Chatting with Hitesh's AI feels like having a personal mentor. The coding explanations are spot-on!",
    },
    {
        by: "Priya Sharma",
        text:
            "Piyush's system design insights helped me crack my tech interview. This app is pure gold!",
    },
    {
        by: "Arjun Patel",
        text:
            "Learning from both Hitesh Sir and Piyush Sir has been transformative—their combined expertise in coding and system design makes this platform unbeatable!",
    },
];

export default function Testimonials() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold">What People Are Saying</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {quotes.map((q, i) => (
                    <Reveal key={i} delay={i * 100}>
                        <blockquote className="flex flex-col justify-between h-full rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:bg-slate-900/60 card-hover">
                            <div>
                                <div className="flex items-center gap-1 text-orange-500">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <span key={j}>★</span>
                                    ))}
                                </div>
                                <p className="mt-3 text-slate-700 dark:text-slate-200 text-sm">“{q.text}”</p>
                            </div>
                            <footer className="mt-3 text-sm text-slate-500 dark:text-slate-400">— {q.by}</footer>
                        </blockquote>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
