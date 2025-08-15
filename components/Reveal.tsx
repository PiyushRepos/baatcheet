"use client";
import { useEffect, useRef, useState } from "react";

// Small intersection observer reveal hook + component
export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => e && e.isIntersecting && setShown(true),
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, shown } as const;
}

export default function Reveal({
    children,
    delay = 0,
    from = "translateY(8px)",
}: {
    children: React.ReactNode;
    delay?: number;
    from?: string;
}) {
    const { ref, shown } = useReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            style={{
                transition: "opacity 600ms ease, transform 600ms ease",
                transitionDelay: `${delay}ms`,
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : from,
            }}
        >
            {children}
        </div>
    );
}
