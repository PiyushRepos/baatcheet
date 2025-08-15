"use client";
import { useState } from "react";

export default function GlowButton({
    children,
    as: As = "Link",
    className = "",
    glowColor = "#fb923c", // orange-400
    href,
    onClick,
}: {
    children: React.ReactNode;
    as?: any;
    className?: string;
    glowColor?: string;
    href?: string;
    onClick?: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const style = hovered
        ? { boxShadow: `0 0 0 2px ${glowColor}40 inset, 0 10px 30px -5px ${glowColor}80, 0 0 0 1px ${glowColor}80` }
        : { boxShadow: `0 0 0 1px ${glowColor}40 inset` };

    const props: any = {
        href,
        onClick,
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        className:
            `relative inline-flex items-center justify-center rounded-full w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base gap-2 font-medium text-white bg-orange-600 transition-all active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 ${className}`,
        style,
    };

    return <As {...props}>{children}<span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 pointer-events-none" /></As>;
}
