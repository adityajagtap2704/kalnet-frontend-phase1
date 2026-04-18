"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/features/ThemeToggle";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";
import Button from "@/components/ui/Button";
import { Magnetic } from "@/components/animations";
import { RootState, AppDispatch } from "@/store/redux/store";
import { logout } from "@/store/redux/slices/authSlice";
import { clearEnrollment } from "@/store/redux/slices/enrollmentSlice";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearEnrollment());
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-white/60 dark:bg-surface-950/60 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] shadow-[0_1px_24px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav
          ref={navRef}
          className={cn(
            "container-wide mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tight text-surface-950 dark:text-white uppercase font-display">
              ZENTRIX
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.children?.some((c) => pathname === c.href) ?? false);
              const hasDropdown = !!link.children?.length;
              const isOpen = activeDropdown === link.label;

              return (
                <div key={link.href + link.label} className="relative">
                  {hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                        isActive || isOpen
                          ? "text-brand-500 dark:text-brand-400"
                          : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/50"
                      )}
                    >
                      {link.label}
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-3.5 h-3.5 opacity-60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                      {(isActive || isOpen) && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ) : (
                    <Magnetic strength={0.2}>
                      <Link
                        href={link.href}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative block",
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
                  )}

                  {/* Dropdown */}
                  {hasDropdown && (
                    <NavDropdown
                      items={link.children!}
                      isOpen={isOpen}
                      onClose={() => setActiveDropdown(null)}
                      parentLabel={link.label}
                      parentHref={link.href}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="hidden lg:flex items-center gap-2">
              {isAuthenticated ? (
                /* ── Logged-in state ── */
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((p) => !p)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-xs font-black text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300 max-w-[100px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <motion.svg
                      animate={{ rotate: userMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-3.5 h-3.5 text-surface-400"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>

                  {/* User dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 shadow-xl shadow-black/10 overflow-hidden z-[200]"
                      >
                        <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-800">
                          <p className="text-xs font-semibold text-surface-900 dark:text-white truncate">{user?.name}</p>
                          <p className="text-xs text-surface-400 truncate">{user?.email}</p>
                        </div>
                        <div className="p-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                          >
                            <span>📊</span> Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <span>🚪</span> Log out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Guest state ── */
                <>
                  <Magnetic strength={0.15}>
                    <Link href="/login">
                      <Button variant="ghost" size="sm">Log in</Button>
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
                </>
              )}
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

