import type { ReactNode } from "react";
import { useRef, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";
import Image from "next/image";

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type IChatBubble = { role: "user" | "assistant" | "system"; text: string | ReactNode, personaImage?: string };

export default function ChatBubble({ role, text, personaImage }: IChatBubble) {
    const isUser = role === "user";

    return (
        <div
            className={cx(
                "flex w-full flex-col",
                isUser ? "items-end" : "items-start",
                "md:px-6 px-2"
            )}
        >
            {/* Avatar on top for persona */}
            {!isUser && (
                <div className="flex justify-start mb-2">
                    <Image
                        src={personaImage || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"}
                        alt="Persona"
                        className="w-8 h-8 rounded-full object-cover border border-orange-300 dark:border-slate-700"
                        style={{ width: "2rem", height: "2rem" }}
                    />
                </div>
            )}
            <div className={cx("flex w-full", isUser ? "justify-end" : "justify-start")}>
                {/* User avatar on right */}
                {isUser && (
                    <div className="flex items-end order-2 ml-2">
                        <Image
                            src="/image.png"
                            alt="You"
                            className="w-8 h-8 rounded-full object-cover border border-orange-300 dark:border-slate-700"
                        />
                    </div>
                )}
                {/* Bubble */}
                <div
                    className={cx(
                        "rounded-2xl px-4 py-3 text-sm shadow-sm transition-transform",
                        "card-hover",
                        isUser
                            ? "bg-orange-200 font-semibold text-white dark:bg-orange-600/70 rounded-br-md"
                            : "bg-white dark:bg-slate-900/60 text-[color:var(--foreground)] rounded-bl-md",
                        "max-w-full sm:max-w-2xl",
                        "break-words",
                        isUser ? "order-1" : "order-2"
                    )}
                >
                    {Array.isArray(text) ? (
                        text?.map((part, index) => {
                            return !part ? null : (
                                <div key={index}>
                                    <div
                                        className={cx(
                                            "prose",
                                            "prose-a:text-orange-600 prose-a:font-semibold",
                                            "prose-blockquote:border-l-orange-600 prose-blockquote:pl-4 prose-blockquote:italic",
                                            "prose-code:bg-none prose-code:rounded-xl prose-code:p-5 prose-code:pb-8 prose-code:overflow-x-auto",
                                            "prose-hr:border-orange-300",
                                            "prose-img:rounded-lg prose-img:shadow-md",
                                            "prose-table:border prose-table:border-orange-300 prose-th:bg-orange-100 prose-td:bg-white",
                                            "prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-orange-600",
                                            "prose-h1:text-orange-700 prose-h2:text-orange-600 prose-h3:text-orange-500",
                                            "prose-p:transition-all prose-p:duration-300 prose-p:ease-in prose-p:animate-fadeIn",
                                            "dark:prose-invert",
                                            "max-w-full"
                                        )}
                                        style={{ animation: "fadeIn 0.5s" }}
                                    >
                                        <Markdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[
                                                rehypeRaw,
                                                [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
                                                rehypeHighlight,
                                            ]}
                                            components={{
                                                code(props: any) {
                                                    const { inline, className, children, ...rest } = props as any;
                                                    if (inline) {
                                                        return (
                                                            <code className={className} {...rest}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                    return (
                                                        <code className={className} {...rest}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                                pre({ children, ...props }: any) {
                                                    const preRef = useRef<HTMLPreElement>(null);
                                                    const [copied, setCopied] = useState(false);

                                                    const onCopy = async () => {
                                                        try {
                                                            const text = preRef.current?.textContent ?? "";
                                                            await navigator.clipboard.writeText(text);
                                                            setCopied(true);
                                                            toast.success("Code copied to clipboard!");
                                                            setTimeout(() => setCopied(false), 1200);
                                                        } catch {
                                                            // no-op
                                                        }
                                                    };

                                                    return (
                                                        <div className="relative group">
                                                            <button
                                                                type="button"
                                                                onClick={onCopy}
                                                                aria-label="Copy code"
                                                                className="cursor-pointer absolute top-2 right-2 rounded-md border border-neutral-300/70 bg-orange-200 hover:bg-orange-200/90 text-neutral-700 px-2 py-1 text-xs shadow-sm backdrop-blur-sm transition dark:bg-neutral-800/70 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:border-neutral-700"
                                                            >
                                                                {copied ? "Copied" : "Copy"}
                                                            </button>
                                                            <pre ref={preRef} {...props}>{children}</pre>
                                                        </div>
                                                    );
                                                },
                                            }}
                                        >
                                            {part}
                                        </Markdown>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="max-w-full break-words">{text}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
