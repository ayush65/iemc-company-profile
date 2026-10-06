"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Magnetic } from "@/components/motion/primitives";
import {
  useEscapeKey,
  useFocusTrap,
  useScrollLock,
} from "@/components/hooks/useDialog";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuRef = useFocusTrap<HTMLDivElement>(open);
  useEscapeKey(open, () => setOpen(false));
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu, then navigate (so the scroll happens after the lock
   * is released — anchor scrolling is unreliable while overflow is hidden). */
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!open) return; // desktop nav: native anchor behaviour works fine
    e.preventDefault();
    setOpen(false);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior });
      history.replaceState(null, "", href);
    }, 80);
  };

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container site-header__inner">
          <a href="#hero" className="brand" aria-label="IEMC India — home">
            <span className="brand__mark" aria-hidden="true">
              <span className="brand__mark-letter">IE</span>
            </span>
            <span className="brand__text">
              <span className="brand__name">IEMC INDIA</span>
              <span className="brand__sub">PVT. LTD.</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <ul className="site-nav__list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    className="site-nav__link"
                    href={l.href}
                    onClick={(e) => handleNav(e, l.href)}
                  >
                    <span>{l.label}</span>
                    <span className="site-nav__underline" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Magnetic strength={0.22}>
              <a
                href="#contact"
                className="btn btn--primary btn--sm"
                onClick={(e) => handleNav(e, "#contact")}
              >
                Contact Us
                <Icon name="arrowRight" size={16} />
              </a>
            </Magnetic>
            <button
              className="menu-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="menu-toggle__box">
                <span className={`menu-toggle__line${open ? " is-open" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__inner">
              <nav aria-label="Mobile">
                <ul className="mobile-menu__list">
                  {navLinks.map((l, i) => (
                    <li key={l.href}>
                      <motion.a
                        href={l.href}
                        className="mobile-menu__link"
                        data-autofocus={i === 0 ? "" : undefined}
                        onClick={(e) => handleNav(e, l.href)}
                        initial={{ opacity: 0, y: 44 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.12 + i * 0.07,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="mobile-menu__index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{l.label}</span>
                        <Icon
                          name="arrowUpRight"
                          size={26}
                          className="mobile-menu__arrow"
                        />
                      </motion.a>
                    </li>
                  ))}
                  <li>
                    <motion.a
                      href="#contact"
                      className="mobile-menu__link mobile-menu__link--cta"
                      onClick={(e) => handleNav(e, "#contact")}
                      initial={{ opacity: 0, y: 44 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.12 + navLinks.length * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="mobile-menu__index">
                        {String(navLinks.length + 1).padStart(2, "0")}
                      </span>
                      <span>Contact Us</span>
                      <Icon
                        name="arrowUpRight"
                        size={26}
                        className="mobile-menu__arrow"
                      />
                    </motion.a>
                  </li>
                </ul>
              </nav>

              <motion.div
                className="mobile-menu__footer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                <span className="mobile-menu__loc">Hosur, Tamil Nadu, India</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
