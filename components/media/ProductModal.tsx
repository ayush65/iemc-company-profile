"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Magnetic } from "@/components/motion/primitives";
import {
  useEscapeKey,
  useFocusTrap,
  useScrollLock,
} from "@/components/hooks/useDialog";
import type { Product } from "@/data/products";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const active = product !== null;
  const dialogRef = useFocusTrap<HTMLDivElement>(active);
  useEscapeKey(active, onClose);
  useScrollLock(active);

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
            ref={dialogRef}
            className="modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 24,
              scale: 0.98,
              transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
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
                sizes="(min-width: 1080px) 46vw, 92vw"
              />
              <div className="modal__media-overlay" aria-hidden="true" />
              <span className="modal__category">{product.category}</span>
            </div>

            <div className="modal__body">
              <span className="modal__index" aria-hidden="true">
                {product.index}
              </span>
              <h2 className="modal__title" id="product-modal-title">
                {product.title}
              </h2>
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
                    onClick={(e) => {
                      /* Close first, then navigate — anchor scrolling is
                         unreliable while the body scroll-lock is active. */
                      e.preventDefault();
                      onClose();
                      window.setTimeout(() => {
                        document
                          .querySelector("#contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                        history.replaceState(null, "", "#contact");
                      }, 80);
                    }}
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
