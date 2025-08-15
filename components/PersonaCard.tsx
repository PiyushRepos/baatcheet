import Image from "next/image";
import Reveal from "./Reveal";
import type { Persona } from "@/lib/data";
import Link from "next/link";

export default function PersonaCard({ p }: { p: Persona }) {
    return (
        <Reveal>
            <article className="group rounded-2xl border border-black/5 bg-white dark:bg-slate-900/60 p-6 shadow-sm card-hover">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 grid place-items-center overflow-hidden">
                        <Image
                            src={p.avatar}
                            alt={p.name}
                            width={50}
                            height={50}
                            className="rounded-full object-cover group-hover:opacity-100 opacity-80 transition w-10 h-10"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{p.name}</h3>
                            <span className="text-[10px] text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">{p.tag}</span>
                        </div>
                        <p className="text-xs pt-1 text-slate-600 dark:text-slate-300">{p.id == "piyush" ? p.title.replace("Founder of Teachyst, ", "") : p.title}</p>
                    </div>
                </div>
                <ul className="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-4">
                    {/* {p.style.traits.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                            <span className="mt-1 size-1.5 rounded-full bg-orange-500" />
                            {h}
                        </li>
                    ))} */}
                    {p.short_description}
                </ul>
                <div className="mt-6 flex transition-all duration-200 gap-2">
                    <Link href={`/chat?persona=${p.id}`} className="px-4 py-2 rounded-full bg-orange-600 text-white text-center hover:bg-orange-500 text-sm w-full sm:w-auto">Chat Now</Link>
                </div>
            </article>
        </Reveal>
    );
}
