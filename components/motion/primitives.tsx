"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.7;

/* ---------------- FadeIn ---------------- */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Stagger ---------------- */
export function Stagger({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- RevealLines — masked line-by-line headline reveal ---------------- */
export function RevealLines({
  lines,
  className,
  delay = 0,
  inView = false,
  lineDelay = 0.13,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  inView?: boolean;
  lineDelay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className} style={{ display: "block" }}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span
            className="line-inner"
            initial={{ y: "112%" }}
            animate={inView ? { y: 0 } : undefined}
            whileInView={inView ? undefined : { y: 0 }}
            viewport={inView ? undefined : { once: true, margin: "-40px" }}
            transition={{
              duration: reduce ? 0.01 : 0.95,
              delay: delay + i * lineDelay,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Parallax ---------------- */
export function Parallax({
  children,
  strength = 48,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ---------------- Counter ---------------- */
export function Counter({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

/* ---------------- Magnetic ---------------- */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const enabled = useFinePointer();
  const sx = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      sx.set((e.clientX - (r.left + r.width / 2)) * strength);
      sy.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      sx.set(0);
      sy.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduce, strength, sx, sy]);

  if (!enabled || reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}

function useFinePointer() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return enabled;
}

/* ---------------- useFinePointer export for cursor etc ---------------- */
export { useFinePointer };
