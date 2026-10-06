"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { FadeIn, Magnetic, RevealLines } from "@/components/motion/primitives";

const ctaBg =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80";

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="cta" id="cta" aria-label="Have a project in mind">
      <div className="cta__media" aria-hidden="true">
        <Image
          src={ctaBg}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="cta__image"
        />
        <div className="cta__overlay" />
        <div className="cta__grid" />
      </div>

      <div className="container cta__inner">
        <span className="eyebrow eyebrow--light">
          <FadeIn>Have a project in mind?</FadeIn>
        </span>
        <h2 className="cta__title">
          <RevealLines
            lines={[
              "LET'S BUILD SOMETHING",
              <>
                <span className="text-gradient">PEOPLE REMEMBER.</span>
              </>,
            ]}
            delay={0.08}
          />
        </h2>
        <FadeIn delay={0.2} className="cta__sub">
          <p>
            Bring us a specification, a timeline, or a rough idea. We
            engineer it, manufacture it, and commission it — on schedule.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="cta__actions">
            <Magnetic>
              <a
                href="#contact"
                className="btn btn--primary btn--lg cta__btn"
                data-cursor="START"
              >
                Start a Conversation
                <Icon name="arrowRight" size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:contact@iemcindia.com" className="btn btn--ghost-light btn--lg">
                <Icon name="mail" size={17} />
                contact@iemcindia.com
              </a>
            </Magnetic>
          </div>
        </FadeIn>
      </div>

      <motion.span
        className="cta__ring"
        aria-hidden="true"
        animate={reduce ? undefined : { scale: [1, 1.35], opacity: [0.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
      />
    </section>
  );
}
