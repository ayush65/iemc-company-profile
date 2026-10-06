"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { useFinePointer } from "@/components/motion/primitives";

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.6 });
  const y = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.6 });
  const ringX = useSpring(-100, { stiffness: 260, damping: 26, mass: 0.55 });
  const ringY = useSpring(-100, { stiffness: 260, damping: 26, mass: 0.55 });

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-cursor");
      return;
    }
    document.body.classList.add("has-cursor");
    return () => document.body.classList.remove("has-cursor");
  }, [enabled]);

  useEffect(() => {
    const ok = fine && !reduce;
    setEnabled(ok);
    if (!ok) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);

      const cursorEl = (e.target as HTMLElement).closest?.("[data-cursor]");
      const interactive = (e.target as HTMLElement).closest?.(
        "a, button, input, textarea, select, [role='button']"
      );
      setLabel(cursorEl ? (cursorEl as HTMLElement).dataset.cursor ?? "" : "");
      setHovering(Boolean(interactive));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, reduce, x, y, ringX, ringY]);

  if (!enabled) return null;

  return (
    <div className="cursor" aria-hidden="true">
      <motion.span
        className={`cursor__dot${visible ? " is-visible" : ""}`}
        style={{ x, y }}
      />
      <motion.span
        className={`cursor__ring${hovering ? " is-hover" : ""}${label ? " is-label" : ""}${visible ? " is-visible" : ""}`}
        style={{ x: ringX, y: ringY }}
      >
        {label && <span className="cursor__label">{label}</span>}
      </motion.span>
    </div>
  );
}
