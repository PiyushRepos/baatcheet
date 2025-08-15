"use client";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";
import { Persona, personas } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { DefaultChatTransport } from 'ai';
import { useChat } from '@ai-sdk/react';
import { Suspense, useEffect, useRef, useState } from "react";

function getPersonaName(persona: string | null) {
    const q = (persona || "").toLowerCase();
    const p = personas.find((x) => x.id === q || x.name.toLowerCase().includes(q));
    return p as Persona;
}

function ChatPageInner() {
    const searchParams = useSearchParams();
    const persona = searchParams.get("persona");
    const { id, name, avatar, greetings } = getPersonaName(persona);

    const { messages, sendMessage, status, stop, setMessages } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
            body: {
                personaId: id,
            },
        }),
    });
    const endRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    const handleOnMessageSend = async (text: string) => {
        await sendMessage({ text });
    };
    useEffect(() => {
        if (!autoScroll) return;
        const id = requestAnimationFrame(() => {
            endRef.current?.scrollIntoView({
                behavior: status === 'streaming' ? 'auto' : 'smooth',
                block: 'end',
            });
        });
        return () => cancelAnimationFrame(id);
    }, [messages, status, autoScroll]);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const threshold = 100;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setAutoScroll(distanceFromBottom <= threshold);
    };

    useEffect(() => {
        if (greetings && greetings.length > 0) {
            let greeting = greetings[Math.floor(Math.random() * greetings.length)];
            setMessages([
                {
                    role: "assistant",
                    id: Date.now().toString(),
                    parts: [{ type: "text", text: greeting }]
                }
            ])
        }
    }, [])

    return (
        <section className="min-h-[calc(100vh-0px)] flex flex-col">
            <ChatHeader name={name} personaImage={avatar} />
            <div ref={scrollRef} onScroll={handleScroll} className="flex-1 bg-[var(--background)] relative overflow-y-auto pb-20">
                <div className="pointer-events-none absolute inset-0 bg-dots" />
                <div className="mx-auto w-full max-w-5xl sm:px-4 py-6 space-y-4 relative">
                    {messages.map((msg, index) => (
                        <ChatBubble
                            key={index}
                            role={msg.role}
                            personaImage={avatar}
                            text={msg.parts?.map((part: any, i: number) => (
                                part.type === 'text' ? part.text : null
                            ))}
                        />
                    ))}
                    {status === 'submitted' && (
                        <ChatBubble personaImage={avatar} role="assistant" text={<TypingIndicator personaName={name} />} />
                    )}
                    <div ref={endRef} className="h-px scroll-mb-28 md:scroll-mb-32" />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-neutral-800 px-0 py-2">
                <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
                    <ChatInput
                        onSend={handleOnMessageSend}
                        className="w-full md:w-auto"
                        disabled={status == "ready"}
                        stop={stop}
                    />
                </div>
            </div>
        </section>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="mx-auto w-full max-w-5xl sm:px-4 py-6 text-sm text-neutral-500">Loading chat…</div>}>
            <ChatPageInner />
        </Suspense>
    );
}

function TypingIndicator({ personaName }: { personaName: string }) {
    return (
        <span className="inline-flex gap-1 items-center">
            <span className="ml-2 text-xs text-gray-400">Typing</span>
            <span className="animate-bounce relative -bottom-2" style={{ animationDelay: "0ms" }}>•</span>
            <span className="animate-bounce relative -bottom-2" style={{ animationDelay: "150ms" }}>•</span>
            <span className="animate-bounce relative -bottom-2" style={{ animationDelay: "300ms" }}>•</span>
        </span>
    );
}
