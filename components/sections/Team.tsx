"use client";

import { motion, useReducedMotion } from "framer-motion";
import { team } from "@/data/products";
import { Icon } from "@/components/ui/Icon";
import { FadeIn, RevealLines, Stagger, StaggerItem } from "@/components/motion/primitives";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Team() {
  const reduce = useReducedMotion();

  return (
    <section className="section team" id="team">
      <div className="container">
        <div className="team__head">
          <span className="eyebrow">
            <FadeIn>Executive Council</FadeIn>
          </span>
          <h2 className="h2 team__title">
            <RevealLines
              lines={[
                "THE MINDS",
                <>
                  BEHIND <span className="text-gradient">THE MACHINES</span>
                </>,
              ]}
              delay={0.05}
            />
          </h2>
        </div>

        <Stagger className="team__grid" stagger={0.18}>
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <motion.article
                className="team-card"
                data-cursor="OPEN"
                initial={reduce ? undefined : { opacity: 0, y: 48, scale: 0.97 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -8, transition: { duration: 0.3 } }}
              >
                <div className="team-card__avatar" aria-hidden="true">
                  <span>{initials(m.name)}</span>
                  <span className="team-card__avatar-ring" />
                </div>
                <div className="team-card__body">
                  <h3>{m.name}</h3>
                  <span className="team-card__role">{m.role}</span>
                  <p>{m.bio}</p>
                  <ul className="team-card__focus">
                    {m.focus.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <footer className="team-card__socials">
                  <a
                    href={m.linkedin}
                    aria-label={`${m.name} on LinkedIn`}
                    className="team-card__social"
                  >
                    <Icon name="linkedin" size={18} />
                  </a>
                  <a
                    href="mailto:contact@iemcindia.com"
                    aria-label={`Email ${m.name}`}
                    className="team-card__social"
                  >
                    <Icon name="mail" size={18} />
                  </a>
                </footer>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
