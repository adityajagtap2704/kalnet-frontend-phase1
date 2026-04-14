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

// ─── Knowledge base built from site data ────────────────────────────────────
const KB = {
  company: {
    name: "Zentrix",
    tagline: "Engineering Digital Infrastructure",
    description: "We build the systems that power modern businesses — from cloud platforms to secure enterprise applications.",
    founded: 2016,
    email: "hello@zentrix.in",
    phone: "+91 80 4953 2200",
    address: "Zentrix, Gachibowli, Hyderabad, Telangana 500032",
    social: {
      linkedin: "https://linkedin.com/company/zentrix",
      twitter: "https://twitter.com/zentrix_tech",
      github: "https://github.com/zentrix-tech",
    },
  },
  services: [
    { name: "Web Development", desc: "Modern, high-performance web apps with React & Next.js. Features: Custom Web Apps, Performance Optimization, SEO Friendly, Responsive Design. Stack: React, Next.js, TypeScript, Tailwind CSS." },
    { name: "Cloud Architecture", desc: "Scalable, secure cloud solutions on AWS, Azure, or GCP. Features: Cloud Migration, Serverless Architecture, DevOps Pipelines, Infrastructure as Code. Stack: AWS, Azure, GCP, Docker, Kubernetes." },
    { name: "Mobile Development", desc: "Cross-platform iOS & Android apps using React Native. Features: Cross-Platform Apps, Native Performance, User-Centric UI/UX, App Store Deployment. Stack: React Native, Expo." },
    { name: "Cybersecurity", desc: "Comprehensive security audits, penetration testing & vulnerability assessments. Features: Security Audits, Penetration Testing, Vulnerability Assessment, Compliance Checks. Stack: Kali Linux, OWASP, Metasploit, Nmap." },
    { name: "Data & Analytics", desc: "Custom data pipelines and dashboards to drive data-driven decisions. Features: Data Pipelines, Predictive Analytics, Custom Dashboards, Big Data Processing. Stack: Python, Spark, Tableau, PowerBI." },
    { name: "UI/UX Design", desc: "User-centric interfaces that are beautiful and intuitive. Features: User Research, Wireframing, Prototyping, Visual Design. Stack: Figma, Adobe XD, Sketch, Framer." },
  ],
  courses: [
    { name: "Frontend Engineering Bootcamp", duration: "12 weeks", level: "Beginner", price: "₹14,999", instructor: "Rahul Menon", rating: 4.8, enrolled: 342, tags: "React, Next.js, JavaScript, CSS" },
    { name: "Cloud & DevOps Professional", duration: "10 weeks", level: "Intermediate", price: "₹19,999", instructor: "Priya Sharma", rating: 4.7, enrolled: 198, tags: "AWS, Docker, Kubernetes, Terraform" },
    { name: "Cybersecurity Foundations", duration: "8 weeks", level: "Beginner", price: "₹12,999", instructor: "Arjun Nair", rating: 4.6, enrolled: 156, tags: "Security, Networking, Penetration Testing" },
    { name: "Full-Stack TypeScript", duration: "14 weeks", level: "Intermediate", price: "₹17,999", instructor: "Sneha Kulkarni", rating: 4.9, enrolled: 267, tags: "TypeScript, Node.js, Prisma, Next.js" },
    { name: "Data Engineering & ML Ops", duration: "16 weeks", level: "Advanced", price: "₹24,999", instructor: "Vikram Desai", rating: 4.7, enrolled: 124, tags: "Python, Spark, MLflow, SQL" },
    { name: "UI/UX Design Intensive", duration: "8 weeks", level: "Beginner", price: "₹11,999", instructor: "Ananya Joshi", rating: 4.8, enrolled: 213, tags: "Figma, Design Thinking, Prototyping" },
  ],
  team: [
    { name: "Rushikesh Dehankar", role: "Founder @ TAYOG & Zentrix | IIT Hyderabad" },
    { name: "RISHAV RAJ", role: "Co-Founder & CTO" },
    { name: "Anveshchandra Bavikadi", role: "Founder Associate" },
    { name: "Vedika Khiwansara", role: "Partnership Manager" },
    { name: "Jyothsna Lenka", role: "AI/ML Engineer" },
  ],
  stats: { projects: "520+", clients: "180+", engineers: "65+", years: "8+" },
};

function getMockResponse(input: string): string {
  const q = input.toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|howdy|sup|yo)\b/.test(q)) {
    return `Hey there! 👋 Welcome to **Zentrix** — we engineer digital infrastructure that powers modern businesses. I can tell you about our **services**, **courses**, **team**, **pricing**, or how to **get in touch**. What would you like to know?`;
  }

  // About / Company
  if (q.includes("about") || q.includes("who are you") || q.includes("what is zentrix") || q.includes("company") || q.includes("zentrix")) {
    return `**Zentrix** is a full-service engineering company founded in **${KB.company.founded}**, headquartered in **Hyderabad, India**.\n\n**Tagline:** "${KB.company.tagline}"\n\n**What we do:** ${KB.company.description}\n\n**By the numbers:**\n• ${KB.stats.projects} Projects Delivered\n• ${KB.stats.clients} Active Clients\n• ${KB.stats.engineers} Engineers\n• ${KB.stats.years} Years Running\n\nWe work across web, mobile, cloud, security, data, and design — all under one roof.`;
  }

  // Services (general)
  if ((q.includes("service") || q.includes("what do you do") || q.includes("offer") || q.includes("solution")) && !q.includes("web") && !q.includes("cloud") && !q.includes("mobile") && !q.includes("cyber") && !q.includes("data") && !q.includes("design") && !q.includes("ui")) {
    const list = KB.services.map(s => `• **${s.name}**`).join("\n");
    return `Zentrix offers **6 core services**:\n\n${list}\n\nEach service is delivered by a dedicated team of specialists. Which one would you like to explore in detail?`;
  }

  // Web Development
  if (q.includes("web") || q.includes("react") || q.includes("next.js") || q.includes("frontend")) {
    const s = KB.services[0];
    return `**${s.name}** at Zentrix:\n\n${s.desc}\n\nWe build everything from marketing sites to complex SaaS platforms. Our team follows performance-first principles — every app we ship is fast, accessible, and SEO-ready.\n\n👉 Explore: /services/web-development`;
  }

  // Cloud
  if (q.includes("cloud") || q.includes("aws") || q.includes("devops") || q.includes("kubernetes") || q.includes("docker") || q.includes("infrastructure")) {
    const s = KB.services[1];
    return `**${s.name}** at Zentrix:\n\n${s.desc}\n\nWhether you're migrating an existing system or building cloud-native from scratch, our architects design for scale, security, and cost-efficiency.\n\n👉 Explore: /services/cloud-architecture`;
  }

  // Mobile
  if (q.includes("mobile") || q.includes("app") || q.includes("ios") || q.includes("android") || q.includes("react native")) {
    const s = KB.services[2];
    return `**${s.name}** at Zentrix:\n\n${s.desc}\n\nWe use React Native to ship a single codebase to both iOS and Android without sacrificing native performance or UX quality.\n\n👉 Explore: /services/mobile-development`;
  }

  // Cybersecurity
  if (q.includes("cyber") || q.includes("security") || q.includes("pentest") || q.includes("penetration") || q.includes("audit") || q.includes("vulnerability")) {
    const s = KB.services[3];
    return `**${s.name}** at Zentrix:\n\n${s.desc}\n\nOur security engineers have worked with fintech, healthcare, and banking clients where compliance and data protection are non-negotiable.\n\n👉 Explore: /services/cybersecurity`;
  }

  // Data & Analytics
  if (q.includes("data") || q.includes("analytics") || q.includes("ml") || q.includes("machine learning") || q.includes("dashboard") || q.includes("pipeline")) {
    const s = KB.services[4];
    return `**${s.name}** at Zentrix:\n\n${s.desc}\n\nFrom raw ingestion to predictive models and executive dashboards — we handle the full data lifecycle.\n\n👉 Explore: /services/data-analytics`;
  }

  // UI/UX Design
  if (q.includes("design") || q.includes("ui") || q.includes("ux") || q.includes("figma") || q.includes("prototype")) {
    const s = KB.services[5];
    return `**${s.name}** at Zentrix:\n\n${s.desc}\n\nOur designers don't just make things look good — they run user research, test with real users, and iterate until the metrics move.\n\n👉 Explore: /services/ui-ux-design`;
  }

  // Courses (general)
  if ((q.includes("course") || q.includes("learn") || q.includes("training") || q.includes("bootcamp") || q.includes("program")) && !q.includes("frontend") && !q.includes("cloud") && !q.includes("cyber") && !q.includes("typescript") && !q.includes("data") && !q.includes("ux")) {
    const list = KB.courses.map(c => `• **${c.name}** — ${c.duration} · ${c.level} · ${c.price}`).join("\n");
    return `Zentrix offers **6 professional courses**:\n\n${list}\n\nAll courses are instructor-led with hands-on projects. Ratings range from 4.6 to 4.9 ⭐. Which course interests you?`;
  }

  // Specific courses
  if (q.includes("frontend") || (q.includes("react") && q.includes("course"))) {
    const c = KB.courses[0];
    return `**${c.name}**\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Price: ${c.price}\n• Instructor: ${c.instructor}\n• Rating: ${c.rating} ⭐ (${c.enrolled} enrolled)\n• Topics: ${c.tags}\n\nGo from zero to job-ready in 12 weeks covering HTML, CSS, JavaScript, React, and Next.js with hands-on projects at every stage.\n\n👉 View full curriculum: /courses`;
  }
  if ((q.includes("cloud") || q.includes("devops")) && q.includes("course")) {
    const c = KB.courses[1];
    return `**${c.name}**\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Price: ${c.price}\n• Instructor: ${c.instructor}\n• Rating: ${c.rating} ⭐ (${c.enrolled} enrolled)\n• Topics: ${c.tags}\n\nMaster AWS, Docker, Kubernetes, and Terraform. Build production infrastructure from scratch.\n\n👉 View full curriculum: /courses`;
  }
  if (q.includes("typescript") || q.includes("fullstack") || q.includes("full stack") || q.includes("full-stack")) {
    const c = KB.courses[3];
    return `**${c.name}**\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Price: ${c.price}\n• Instructor: ${c.instructor}\n• Rating: ${c.rating} ⭐ (${c.enrolled} enrolled)\n• Topics: ${c.tags}\n\nBuild complete web apps with TypeScript on both frontend (Next.js) and backend (Node + Prisma) with end-to-end type safety.\n\n👉 View full curriculum: /courses`;
  }

  // Pricing
  if (q.includes("price") || q.includes("cost") || q.includes("fee") || q.includes("how much") || q.includes("pricing")) {
    return `**Course Pricing at Zentrix:**\n\n• UI/UX Design Intensive — ₹11,999 (8 weeks)\n• Cybersecurity Foundations — ₹12,999 (8 weeks)\n• Frontend Engineering Bootcamp — ₹14,999 (12 weeks)\n• Full-Stack TypeScript — ₹17,999 (14 weeks)\n• Cloud & DevOps Professional — ₹19,999 (10 weeks)\n• Data Engineering & ML Ops — ₹24,999 (16 weeks)\n\nFor **service/project pricing**, it depends on scope. Reach us at **${KB.company.email}** or via the Contact page for a custom quote.`;
  }

  // Team
  if (q.includes("team") || q.includes("founder") || q.includes("who built") || q.includes("leadership") || q.includes("cto")) {
    const list = KB.team.map(m => `• **${m.name}** — ${m.role}`).join("\n");
    return `**Zentrix Leadership Team:**\n\n${list}\n\nThe team combines IIT-level technical depth with real-world product and business experience. You can learn more on our About page.`;
  }

  // Contact
  if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("phone") || q.includes("address") || q.includes("location") || q.includes("hyderabad")) {
    return `**Get in touch with Zentrix:**\n\n📧 Email: **${KB.company.email}**\n📞 Phone: **${KB.company.phone}**\n📍 Address: **${KB.company.address}**\n\n🔗 Social:\n• LinkedIn: ${KB.company.social.linkedin}\n• Twitter: ${KB.company.social.twitter}\n• GitHub: ${KB.company.social.github}\n\nOr use the **Contact form** at /contact — we typically respond within 24 hours.`;
  }

  // Partners
  if (q.includes("partner") || q.includes("client") || q.includes("work with")) {
    return `Zentrix has worked with **${KB.stats.clients} active clients** across fintech, healthcare, logistics, retail, and edtech.\n\nNotable client outcomes:\n• **FinStack** — rebuilt payment platform handling 3x transaction volume\n• **MedVault** — HIPAA-compliant AWS infrastructure on a tight timeline\n• **RetailEdge** — checkout redesign boosted conversions by 28%\n• **EduBridge** — React Native app serving 50,000+ daily students\n• **SecureBank Digital** — security audit uncovering critical vulnerabilities\n\nInterested in partnering? Reach us at **${KB.company.email}**`;
  }

  // Stats / numbers
  if (q.includes("how many") || q.includes("stat") || q.includes("number") || q.includes("project") || q.includes("experience")) {
    return `**Zentrix by the numbers:**\n\n• 🚀 **${KB.stats.projects}** Projects Delivered\n• 🤝 **${KB.stats.clients}** Active Clients\n• 👨‍💻 **${KB.stats.engineers}** Engineers on staff\n• 📅 **${KB.stats.years}** Years in operation (founded ${KB.company.founded})\n\nWe've shipped across web, mobile, cloud, security, data, and design — for startups and enterprises alike.`;
  }

  // Default
  return `Thanks for asking! Here's a quick overview of what Zentrix offers:\n\n**Services:** Web Dev, Cloud, Mobile, Cybersecurity, Data & Analytics, UI/UX Design\n**Courses:** 6 instructor-led programs from ₹11,999 to ₹24,999\n**Contact:** ${KB.company.email} · ${KB.company.phone}\n\nFeel free to ask me anything specific — services, courses, pricing, team, or how to get in touch!`;
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
      content: "✨ Hi! I'm **Zentrix AI**, your intelligent assistant. I can help you explore our services, courses, team, pricing, or how to get in touch. What would you like to know?",
    },
  ]);

  const categories = [
    { label: "Services", icon: "🏢" },
    { label: "Courses", icon: "🎓" },
    { label: "Pricing", icon: "💰" },
    { label: "Contact", icon: "📞" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent | string) => {
    if (e && typeof e !== "string") e.preventDefault();
    const textToSend = typeof e === "string" ? e : inputValue;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(textToSend),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Render message content with **bold** support and newlines
  const renderContent = (content: string) => {
    return content.split("\n").map((line, li) => (
      <span key={li} className="block">
        {line.split("**").map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        )}
      </span>
    ));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] flex flex-col overflow-hidden rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/60 border border-black/10 dark:border-white/10"
            style={{ maxHeight: "calc(100vh - 10rem)" }}
          >
            {/* Header */}
            <div
              className="relative flex items-center justify-between px-5 py-4 overflow-hidden flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)" }}
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-base border border-white/20">
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >🤖</motion.span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm tracking-tight">Zentrix AI</span>
                    <span className="text-[9px] font-semibold bg-white/20 text-white/90 px-1.5 py-0.5 rounded-full uppercase tracking-widest">Beta</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-white/70">Online · Ready to help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth bg-white dark:bg-slate-900"
              style={{ minHeight: 260, maxHeight: 360, overscrollBehavior: "contain" }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i === 0 ? 0 : 0.05 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xs flex-shrink-0 mb-0.5">
                      🤖
                    </div>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "rounded-bl-sm border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #3b82f6, #6366f1)" }
                        : undefined
                    }
                  >
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xs flex-shrink-0">🤖</div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <div className="flex gap-1 items-center">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay, ease: "easeInOut" }}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 pt-3 pb-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => handleSendMessage(`Tell me about your ${cat.label.toLowerCase()}`)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:border-blue-500 transition-all duration-200"
                  >
                    <span className="text-[10px]">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Ask Zentrix AI…"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="rounded-xl h-10 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                >
                  <svg className="w-4 h-4 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <Magnetic>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open chat assistant"
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-xl shadow-blue-500/30 overflow-hidden group"
          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }}
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-white relative z-10"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.span
                key="bot"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >🤖</motion.span>
            )}
          </AnimatePresence>
        </button>
      </Magnetic>
    </div>
  );
}
