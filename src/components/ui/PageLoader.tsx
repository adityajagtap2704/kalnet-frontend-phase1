"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-950"
        >
          {/* Central Logo Animation */}
          <div className="relative mb-8">
             <motion.div
               animate={{ 
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 0]
               }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="w-24 h-24 border-2 border-brand-500 rounded-2xl"
             />
             <motion.div
               animate={{ 
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, 0]
               }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 w-24 h-24 border-2 border-accent-500 rounded-2xl opacity-50"
             />
          </div>

          {/* Text reveal animation */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-black tracking-widest text-white uppercase font-display"
            >
              ZENTRIX
            </motion.h2>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
