"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const pathname = usePathname();
  const raised = pathname === "/contact";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello — I can answer general questions about UK, Canada, and other pathways. How can I help?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await res.json()) as {
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Could not send message.");
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message ?? "" },
      ]);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div
          className={`fixed right-6 z-50 flex h-[min(420px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-[#EBE4D6] bg-white shadow-xl transition-[bottom] duration-1000 ease-in-out ${raised ? "bottom-40" : "bottom-24"}`}
          role="dialog"
          aria-label="Akshar AI chat"
        >
          <header className="flex items-center justify-between bg-[#0B1F3A] px-4 py-3 text-[#F7F3EB]">
            <span className="font-serif text-sm font-semibold">Akshar AI</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-[#1A3358]"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </header>
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[90%] rounded-lg px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-[#0B1F3A] text-[#F7F3EB]"
                    : "bg-[#F7F3EB] text-[#0B1F3A]"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <p className="text-xs text-[#8A9BB0]">Thinking…</p>
            )}
            {error && (
              <p className="text-xs text-red-700" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="border-t border-[#EBE4D6] p-2">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about visas, study, work…"
                rows={2}
                className="min-h-0 resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
              />
              <Button
                type="button"
                size="icon"
                disabled={loading || !input.trim()}
                className="shrink-0 bg-[#C4A35A] text-[#0B1F3A] hover:bg-[#D4B56A]"
                onClick={() => void send()}
                aria-label="Send message"
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        type="button"
        size="icon-lg"
        onClick={() => setOpen((v) => !v)}
        className={`fixed right-6 z-50 size-14 rounded-full bg-[#0B1F3A] text-[#F7F3EB] shadow-lg transition-[bottom] duration-1000 ease-in-out hover:bg-[#1A3358] ${raised ? "bottom-24" : "bottom-6"}`}
        aria-expanded={open}
        aria-label={open ? "Close Akshar AI chat" : "Open Akshar AI chat"}
      >
        <MessageCircle className="size-6" />
      </Button>
    </>
  );
}
