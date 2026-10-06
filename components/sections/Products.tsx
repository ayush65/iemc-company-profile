"use client";

import Image from "next/image";
import { products, type Product } from "@/data/products";
import { Icon } from "@/components/ui/Icon";
import { Magnetic, RevealLines, Stagger, StaggerItem } from "@/components/motion/primitives";
import ProductModal from "@/components/media/ProductModal";
import { useState } from "react";

export default function Products() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section className="section showcase" id="products">
      <div className="container">
        <div className="showcase__head">
          <span className="eyebrow">
            <RevealLines lines={["CATALOG"]} delay={0.05} />
          </span>
          <h2 className="h2 showcase__title">
            <RevealLines
              lines={[
                <>
                  SYSTEMS WE
                  <br />
                  <span className="text-gradient">BUILD</span>
                </>,
              ]}
              delay={0.1}
            />
          </h2>
          <p className="showcase__sub">
            Three product lines. One standard — engineered to
            outlast the plants they run in.
          </p>
        </div>

        <Stagger className="showcase__grid" stagger={0.18}>
          {products.map((p, i) => (
            <StaggerItem
              key={p.id}
              className={`showcase__row${i % 2 === 1 ? " showcase__row--flip" : ""}`}
            >
              <article className="showcase__item">
                <div className="showcase__media" data-cursor="VIEW">
                  <div className="showcase__media-mask">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1081px) 45vw, 94vw"
                      loading="lazy"
                      className="showcase__image"
                    />
                    <div className="showcase__media-overlay" />
                  </div>
                  <span className="showcase__index" aria-hidden="true">
                    {p.index}
                  </span>
                  <span className="showcase__category">{p.category}</span>
                </div>

                <div className="showcase__body">
                  <h3 className="showcase__name">
                    {p.title}
                    <span className="showcase__tagline">{p.tagline}</span>
                  </h3>
                  <p className="showcase__desc">{p.desc}</p>

                  <ul className="showcase__specs">
                    {p.specs.map((s) => (
                      <li className="spec" key={s.label}>
                        <span className="spec__label">{s.label}</span>
                        <span className="spec__value">{s.value}</span>
                      </li>
                    ))}
                  </ul>

                  <Magnetic strength={0.22}>
                    <button
                      className="btn btn--primary btn--sm showcase__cta"
                      onClick={() => setActive(p)}
                      data-cursor="OPEN"
                    >
                      View Product
                      <Icon name="arrowUpRight" size={16} />
                    </button>
                  </Magnetic>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
