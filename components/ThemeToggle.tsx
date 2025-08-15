"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme"; // 'light' | 'dark' | 'system'

function getSystemDark() {
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
        if (saved) return saved;
        return getSystemDark() ? "dark" : "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    return (
        <button
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={
                "group inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-2 text-sm transition-colors " +
                "bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80"
            }
        >
            <span className="relative inline-flex items-center justify-center w-4 h-4">
                {/* <span className="absolute inset-0 rounded-full bg-amber-500 opacity-70 group-hover:opacity-90 transition-opacity" /> */}
                <span className="cursor-pointer relative text-[10px] text-white">{theme === "dark" ? <Moon size={15} /> : <Sun className="text-zinc-700" size={15} />}</span>
            </span>
            {!compact && <span>{theme === "dark" ? "Dark" : "Light"}</span>}
        </button>
    );
}
