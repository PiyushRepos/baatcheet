"use client";
import { CircleStop } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ stop, onSend, className, disabled }: { stop: () => void, onSend: (text: string) => void, className?: string, disabled?: boolean }) {
    const [text, setText] = useState("");
    return (
        <form
            className={`flex items-center gap-2 p-2 border-t border-black/5 dark:border-white/10 shadow-sm rounded-2xl ${className}`}
            onSubmit={(e) => {
                e.preventDefault();
                if (!text.trim()) return;
                onSend(text.trim());
                setText("");
            }}
        >
            <input
                className="flex-1 rounded-xl bg-white dark:bg-slate-900/60 border border-black/10 dark:border-white/10 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400/50"
                placeholder="Ask anything..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {!disabled ? <button title="send" type="submit" className="cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-full bg-orange-600 text-white px-4 py-3 text-sm hover:bg-orange-500 btn-shine">
                ➤
            </button> : <button title="stop" onClick={stop} className="cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-full bg-orange-600 text-white px-4 py-3 text-sm hover:bg-orange-500 btn-shine">
                <CircleStop size={18} />
            </button>}
        </form>
    );
}
