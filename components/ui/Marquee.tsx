"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { marqueeItems } from "@/data/site";

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="marquee"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div className={`marquee__track${paused ? " paused" : ""}`}>
        {[0, 1].map((half) => (
          <div className="marquee__half" key={half}>
            {row.map((item, i) => (
              <span className="marquee__item" key={`${half}-${i}`}>
                <span className="marquee__text">{item}</span>
                <span className="marquee__dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {paused && (
          <motion.span
            className="marquee__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            paused
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
