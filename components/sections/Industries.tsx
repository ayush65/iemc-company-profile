"use client";

import { industries } from "@/data/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/primitives";

export default function Industries() {
  return (
    <section className="industries" aria-label="Industries we serve">
      <div className="container industries__inner">
        <FadeIn className="industries__label">
          <span className="eyebrow eyebrow--light">Sectors</span>
          <h2 className="industries__title">
            Trusted across <span className="text-gradient">six core industries</span>
          </h2>
        </FadeIn>
        <Stagger className="industries__chips" stagger={0.07}>
          {industries.map((ind, i) => (
            <StaggerItem key={ind}>
              <span className="industry-chip">
                <span className="industry-chip__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {ind}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
