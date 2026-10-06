"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { FadeIn, Parallax, RevealLines, Stagger, StaggerItem } from "@/components/motion/primitives";

const capabilities = [
  {
    icon: "shield" as const,
    title: "Pioneering Engineering",
    text: "Complete product lifecycle engineering — from research and prototype conception to turnkey commissioning, rooted in Indian industrial manufacturing.",
  },
  {
    icon: "gears" as const,
    title: "Advanced Manufacturing",
    text: "Multi-axis CNC cells, clean-room fabrication, and automated testing rigs built to ASME, CE, and ISO international safety benchmarks.",
  },
  {
    icon: "globe" as const,
    title: "Global Export Footprint",
    text: "Serving Tier-1 automotive, heavy machinery, renewable energy, and aerospace suppliers with zero-defect quality and after-sales support.",
  },
];

const aboutImage =
  "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1400&q=80";
const aboutImageAlt = "CNC machining cell manufacturing precision components";
const portraitImage =
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80";
const portraitAlt = "IEMC engineer reviewing technical drawings on site";

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__intro">
          <span className="eyebrow">
            <FadeIn>Who We Are</FadeIn>
          </span>
          <h2 className="h2 about__title">
            <RevealLines
              lines={[
                "A DECADE OF",
                <>
                  <span className="text-gradient">PRECISION</span> ENGINEERING
                </>,
              ]}
              delay={0.05}
            />
          </h2>
          <FadeIn delay={0.15} className="about__lede">
            <p>
              IEMC India Pvt. Ltd. builds industrial systems that plants can
              depend on for decades — designed here, manufactured here, and
              commissioned to global standards.
            </p>
          </FadeIn>

          <Stagger className="about__list">
            {capabilities.map((c) => (
              <StaggerItem key={c.title}>
                <article className="capability" data-cursor="OPEN">
                  <span className="capability__icon">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <div className="capability__body">
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                  <Icon
                    name="arrowUpRight"
                    size={20}
                    className="capability__arrow"
                  />
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="about__media">
          <Parallax strength={36} className="about__parallax">
            <motion.div
              className="about__image-frame"
              initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src={aboutImage}
                alt={aboutImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                loading="lazy"
                className="about__image"
              />
              <div className="about__image-overlay" aria-hidden="true" />
            </motion.div>
          </Parallax>

          <motion.div
            className="about__portrait"
            initial={reduce ? undefined : { opacity: 0, y: 48, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={portraitImage}
              alt={portraitAlt}
              fill
              sizes="(min-width: 1024px) 22vw, 44vw"
              loading="lazy"
            />
            <span className="about__portrait-caption">
              <Icon name="check" size={14} /> Zero-defect floor audit
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
