import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

export default function ChatHeader({ name, personaImage }: { name: string, personaImage: string }) {

    return (
        <div className="sticky top-0 z-40 px-4 flex justify-between items-center py-3 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
            <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="mr-2 p-1 rounded hover:bg-[#FF9632]/40 transition-all text-[#FF9632]/90 duration-200 dark:hover:bg-slate-800"
                        aria-label="Go back"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <Image src={personaImage} alt="avatar" width={40} height={40} className="opacity-70 rounded-2xl hover:opacity-100 transition" />
                    <div className="font-medium hidden sm:inline-block">{name}</div>
                    <span className="ml-2 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-600">● Online</span>
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
