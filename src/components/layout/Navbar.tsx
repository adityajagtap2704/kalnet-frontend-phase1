"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavLinks } from "@/data/navigation";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/features/ThemeToggle";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";
import { Magnetic } from "@/components/animations";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ease-in-out",
          scrolled
            ? "top-4 mx-auto max-w-[95%] lg:max-w-[1200px] rounded-2xl bg-white/70 dark:bg-surface-950/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5"
            : "bg-transparent h-16 lg:h-20"
        )}
      >
        <nav className={cn(
          "container-wide mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8",
          scrolled ? "h-14 lg:h-16" : "h-full"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tight text-surface-950 dark:text-white uppercase font-display">
              ZENTRIX
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Magnetic strength={0.2} key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                      isActive
                        ? "text-brand-500 dark:text-brand-400"
                        : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/50"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="hidden lg:flex items-center gap-2">
              <Magnetic strength={0.15}>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
              </Magnetic>
              <Magnetic strength={0.15}>
                <Link href="/signup">
                  <Button size="sm" className="rounded-full px-5 flex items-center gap-1.5 font-semibold shadow-md shadow-brand-500/20">
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
              </Magnetic>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
