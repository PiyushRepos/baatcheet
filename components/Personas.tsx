import { personas } from "@/lib/data";
import PersonaCard from "./PersonaCard";
import Reveal from "./Reveal";
// import Link from "next/link";

export default function Personas() {
    return (
        <section id="creators" className="mx-auto max-w-6xl px-4 py-16 scroll-mt-4">
            <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold">Meet the Personas</h2>
            </Reveal>
            <Reveal delay={80}>
                <p className="mt-2 text-slate-600 dark:text-slate-300">AI versions of popular tech creators - approachable, opinionated and ready to help.</p>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {personas.map((p) => (
                    <PersonaCard key={p.id} p={p} />
                ))}
            </div>
            {/* <div className="mt-6 text-center">
                <Link className="chip" href="#">View All →</Link>
            </div> */}
        </section>
    );
}
