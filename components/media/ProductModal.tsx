"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Magnetic } from "@/components/motion/primitives";
import type { Product } from "@/data/products";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.title} — product details`}
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              className="modal__close"
              onClick={onClose}
              aria-label="Close product details"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="modal__media">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 900px) 44vw, 90vw"
                priority
              />
              <div className="modal__media-overlay" aria-hidden="true" />
              <span className="modal__category">{product.category}</span>
            </div>

            <div className="modal__body">
              <span className="modal__index" aria-hidden="true">
                {product.index}
              </span>
              <h2 className="modal__title">{product.title}</h2>
              <p className="modal__tagline">{product.tagline}</p>
              <p className="modal__desc">{product.details}</p>

              <h3 className="modal__specs-heading">Technical Specifications</h3>
              <dl className="modal__specs">
                {product.specs.map((s) => (
                  <div className="modal__spec-row" key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="modal__actions">
                <Magnetic strength={0.2}>
                  <a
                    href="#contact"
                    className="btn btn--primary btn--sm"
                    onClick={onClose}
                  >
                    Inquire About This Product
                    <Icon name="arrowUpRight" size={16} />
                  </a>
                </Magnetic>
                <button className="btn btn--ghost btn--sm" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
