"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { stats, site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Counter, EASE, Magnetic, RevealLines } from "@/components/motion/primitives";

const heroImage =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Atmosphere */}
      <motion.div className="hero__bg" style={{ y: reduce ? undefined : bgY }} aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <span className="hero__ghost">IEMC</span>
        <div className="hero__noise" />
      </motion.div>

      <motion.div
        className="container hero__inner"
        style={{ opacity: fade }}
      >
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <span className="hero__badge-dot" aria-hidden="true" />
            {site.certification}
          </motion.div>

          <h1 className="hero__title">
            <RevealLines
              lines={[
                "ENGINEERING",
                <>
                  PRECISION<span className="hero__accent">.</span>
                </>,
                "POWERING ",
                <>
                  <span className="hero__gradient">INDUSTRIAL</span>
                </>,
                <>
                  GROWTH<span className="hero__accent">.</span>
                </>,
              ]}
              delay={0.28}
              lineDelay={0.11}
            />
          </h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          >
            Automated water management, precision metering, and industrial IoT
            hardware — engineered in Hosur, trusted by manufacturers worldwide.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.98, ease: EASE }}
          >
            <Magnetic>
              <a href="#products" className="btn btn--primary btn--lg" data-cursor="EXPLORE">
                Explore Systems
                <Icon name="arrowRight" size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#about" className="btn btn--ghost btn--lg">
                Corporate Profile
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.12, ease: EASE }}
          >
            {stats.map((s, i) => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">
                  <Counter value={s.value} />
                  <span className="hero__stat-suffix">{s.suffix}</span>
                </span>
                <span className="hero__stat-label">{s.label}</span>
                {i > 0 && <span className="hero__stat-divider" aria-hidden="true" />}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          <div className="hero__frame">
            <motion.div style={{ y: reduce ? undefined : mediaY }} className="hero__media-wrap">
              <Image
                src={heroImage}
                alt={site.name + " — precision engineering"}
                fill
                sizes="(min-width: 1024px) 44vw, 90vw"
                priority
                className="hero__image"
              />
              <div className="hero__media-overlay" aria-hidden="true" />
            </motion.div>

            <motion.div
              className="hero__chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25, ease: EASE }}
            >
              <span className="hero__chip-icon">
                <Icon name="chip" size={20} />
              </span>
              <span>
                <strong>Industry 4.0 Ready</strong>
                <em>Smart Automation & Sensors</em>
              </span>
            </motion.div>

            <motion.div
              className="hero__orbit"
              aria-hidden="true"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="orbitPath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text>
                  <textPath href="#orbitPath">
                    ISO 9001 CERTIFIED · PRECISION ENGINEERING ·
                  </textPath>
                </text>
              </svg>
              <span className="hero__orbit-center">
                <Icon name="zap" size={22} />
              </span>
            </motion.div>

            <span className="hero__cross hero__cross--tl" aria-hidden="true" />
            <span className="hero__cross hero__cross--br" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        className="hero__scroll-cue"
        href="#about"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line">
          <motion.span
            animate={reduce ? undefined : { y: [0, 26, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
