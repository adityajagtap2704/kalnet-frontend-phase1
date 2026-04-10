"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/animations";
import { Button, Input } from "@/components/ui";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "✨ Hi! I'm **Zentrix AI**, your intelligent assistant. I can help you explore our solutions, find partner info, or answer anything about Zentrix engineering!",
    },
  ]);

  const categories = [
    { label: "Partners", icon: "🤝" },
    { label: "Solutions", icon: "🏢" },
    { label: "Contact", icon: "📞" },
    { label: "Courses", icon: "🎓" },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent | string) => {
    if (e && typeof e !== "string") e.preventDefault();
    
    const textToSend = typeof e === "string" ? e : inputValue;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate Bot Response
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(textToSend),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getMockResponse = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes("course")) return "We offer specialized courses in Cloud Engineering, DevOps, and Frontend Architecture. You can find them under the 'Courses' tab!";
    if (lower.includes("solution") || lower.includes("service")) return "Zentrix provides Cloud, Cybersecurity, and Custom Enterprise Software solutions. Check out our 'Services' page for details.";
    if (lower.includes("contact")) return "You can reach us at contact@zentrix.com or via the 'Contact' page form.";
    return "That's a great question! For specific inquiries about Zentrix engineering, our experts are ready to help. Would you like to see our contact info?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] max-h-[calc(100vh-14rem)] bg-white dark:bg-surface-900 rounded-[2rem] shadow-2xl border border-surface-200 dark:border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-brand-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                   <motion.span
                     animate={{ y: [0, -3, 0], x: [-1, 1, -1] }}
                     transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                   >
                     🤖
                   </motion.span>
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-1.5 text-lg">
                    Zentrix AI <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">BETA</span>
                  </h3>
                  <p className="text-xs text-white/70">Your intelligent assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 sm:p-6 overflow-y-auto bg-surface-50 dark:bg-surface-950/50 space-y-6 scroll-smooth min-h-[300px]"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-3`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                  )}
                  <div className={`p-4 rounded-2xl shadow-sm border ${
                    msg.role === "user" 
                      ? "bg-brand-500 text-white border-brand-400 rounded-tr-none" 
                      : "bg-white dark:bg-surface-800 text-surface-900 dark:text-white border-surface-200 dark:border-white/5 rounded-tl-none"
                  } max-w-[85%] text-sm leading-relaxed`}>
                    {msg.content.split("**").map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                  <div className="bg-white dark:bg-surface-800 p-4 rounded-2xl rounded-tl-none border border-surface-200 dark:border-white/5">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-white/10">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => handleSendMessage(`Tell me about your ${cat.label.toLowerCase()}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-200 dark:border-white/10 text-xs font-medium text-surface-700 dark:text-surface-300 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 transition-all"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Ask Zentrix AI..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="rounded-xl h-11"
                  />
                </div>
                <Button type="submit" size="sm" className="h-11 w-11 p-0 rounded-xl flex items-center justify-center bg-brand-500">
                  <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Magnetic>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-brand-500 text-white shadow-2xl shadow-brand-500/40 flex items-center justify-center text-2xl relative group"
        >
           <motion.div
             animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
             transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10"
           >
              🤖
           </motion.div>
           <div className="absolute inset-0 rounded-full bg-brand-400 group-hover:scale-110 transition-transform -z-10 animate-pulse" />
        </button>
      </Magnetic>
    </div>
  );
}
