"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

type AnimatedSectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  children: ReactNode;
};

export default function AnimatedSection({
  as = "section",
  className,
  children,
  ...rest
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = (motion as any)[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </Component>
  );
}