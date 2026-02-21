"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes } from "react";

export default function GlowCard({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-card transition-colors duration-200 ${className || ""}`}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              boxShadow: "0 16px 32px rgba(15, 23, 42, 0.14)",
              borderColor: "rgba(250, 12, 247, 0.4)"
            }
      }
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(43,179,1,0.25),rgba(250,12,247,0.25))] blur-2xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}