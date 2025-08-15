import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-slate-900/60 border-b border-black/5 transition-colors">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-lg text-shadow-md font-bold select-none">
                    <span className="inline-block size-2 rounded-full bg-orange-500 animate-float" />
                    BaatCheet
                </Link>
                <div className="flex items-center gap-2 sm:gap-3 text-sm">
                    <Link href="#creators" className="relative text-xs font-medium hover:opacity-100 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 hover:after:w-full after:transition-all">Creators</Link>
                    <Link href="#faq" className="relative text-xs font-medium hover:opacity-100 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 hover:after:w-full after:transition-all">FAQ</Link>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
