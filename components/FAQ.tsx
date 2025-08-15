import { faqs } from "@/lib/data";
import Reveal from "./Reveal";

export default function FAQ() {
    return (
        <section
            id="faq"
            className="mx-auto max-w-3xl px-4 py-16"
        >
            <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Frequently Asked Questions
                </h2>
            </Reveal>
            <div className="mt-6 divide-y divide-black/10 dark:divide-white/10 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900">
                {faqs.map((f, i) => (
                    <details key={i} className="group open:bg-orange-50/40 dark:open:bg-orange-900/20">
                        <summary className="cursor-pointer select-none list-none py-4 px-5 flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{f.q}</span>
                            <span className="ml-3 text-orange-600 dark:text-orange-400 transition-transform group-open:rotate-45">＋</span>
                        </summary>
                        <div className="px-5 pb-4 text-slate-600 dark:text-slate-300 text-sm">{f.a}</div>
                    </details>
                ))}
            </div>
        </section>
    );
}

// Make sure your app's root element or <body> has the 'dark' class applied when dark mode is active.
