"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";

export default function HeroMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -20]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [shouldReduceMotion, rotateX, rotateY]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;
    const rotateXValue = ((yPos / rect.height) - 0.5) * -6;
    const rotateYValue = ((x / rect.width) - 0.5) * 6;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? {} : { y }}
      className="aspect-[16/10] rounded-2xl border border-border bg-surface shadow-soft"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 900
              }
        }
        className="h-full w-full rounded-2xl border border-border bg-[linear-gradient(130deg,rgba(43,179,1,0.12),rgba(250,12,247,0.12))]"
      />
    </motion.div>
  );
}