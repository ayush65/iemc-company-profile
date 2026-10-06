"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { FadeIn, RevealLines, Stagger, StaggerItem } from "@/components/motion/primitives";

const vision = {
  title: "Our Vision",
  text: "To be India's premier global technology and industrial equipment provider — renowned for clean energy, high-precision automation, and sustainable manufacturing worldwide.",
  points: [
    "Benchmark in high-precision engineering",
    "Carbon-conscious manufacturing processes",
    "Global benchmark for indigenous innovation",
  ],
};

const mission = {
  title: "Our Mission",
  text: "Deliver robust, defect-free, high-efficiency mechanical and automation solutions by combining rigorous quality standards, digital transformation, and an agile workforce.",
  points: [
    "Uncompromising adherence to ISO quality metrics",
    "Rapid lead times through lean manufacturing",
    "Fostering long-term customer partnerships",
  ],
};

export default function VisionMission() {
  const reduce = useReducedMotion();
  const cards = [vision, mission];

  return (
    <section className="vision" id="vision-mission">
      <div className="vision__bg" aria-hidden="true">
        <div className="vision__glow" />
        <span className="vision__ghost">01</span>
      </div>

      <div className="container vision__inner">
        <div className="vision__head">
          <span className="eyebrow">
            <FadeIn>Strategic Direction</FadeIn>
          </span>
          <h2 className="h2 vision__title">
            <RevealLines
              lines={[
                "WHERE WE'RE",
                <>
                  <span className="text-gradient">HEADING</span>
                </>,
              ]}
              delay={0.05}
            />
          </h2>
        </div>

        <Stagger className="vision__grid" stagger={0.2}>
          {cards.map((card, i) => (
            <StaggerItem key={card.title}>
              <motion.article
                className={`vision-card${i === 0 ? " vision-card--vision" : " vision-card--mission"}`}
                initial={reduce ? undefined : { opacity: 0, y: 56, scale: 0.97 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.3 } }}
              >
                <header className="vision-card__head">
                  <span className="vision-card__icon">
                    {i === 0 ? <Icon name="compass" size={24} /> : <Icon name="target" size={24} />}
                  </span>
                  <span className="vision-card__num">0{i + 1}</span>
                  <h3>{card.title}</h3>
                </header>
                <p className="vision-card__text">{card.text}</p>
                <ul className="vision-card__list">
                  {card.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={16} /> {p}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
