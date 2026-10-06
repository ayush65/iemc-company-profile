"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { FadeIn, Magnetic, RevealLines } from "@/components/motion/primitives";

export default function Contact() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phno") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const next: Record<string, boolean> = {
      name: !name,
      phone: !/^[6-9]\d{9}$/.test(phone),
      message: !message,
    };
    setErrors(next);

    if (Object.values(next).some(Boolean)) {
      setFeedback({ type: "error", msg: "Please correct the highlighted fields." });
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFeedback({
        type: "success",
        msg: "Thank you — your quotation request has been routed to our Hosur office.",
      });
      form.reset();
      setErrors({});
      setTimeout(() => setFeedback(null), 7000);
    }, 900);
  }

  const groupClass = (key: string) =>
    `field${errors[key] ? " field--error" : ""}`;

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="eyebrow">
            <FadeIn>Get In Touch</FadeIn>
          </span>
          <h2 className="h2 contact__title">
            <RevealLines
              lines={[
                "LET'S TALK",
                <>
                  <span className="text-gradient">ENGINEERING.</span>
                </>,
              ]}
              delay={0.05}
            />
          </h2>
          <FadeIn delay={0.15}>
            <p>
              Reach our engineering office for technical datasheets,
              quotations, and industrial consultations.
            </p>
          </FadeIn>

          <FadeIn delay={0.22} className="contact__details">
            <div className="contact-item">
              <span className="contact-item__icon">
                <Icon name="location" size={20} />
              </span>
              <div>
                <strong>Headquarters</strong>
                <p>{site.address}</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="contact__form-wrap">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className={groupClass("name")}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="name"
                placeholder="Your full name"
                required
                autoComplete="name"
              />
              <span className="field__error">Please enter your full name</span>
            </div>

            <div className={groupClass("phone")}>
              <label htmlFor="phoneNum">Phone Number</label>
              <input
                type="tel"
                id="phoneNum"
                name="phno"
                placeholder="98765 43210"
                required
                autoComplete="tel"
                inputMode="tel"
              />
              <span className="field__error">
                Please enter a valid 10-digit phone number
              </span>
            </div>

            <div className={groupClass("message")}>
              <label htmlFor="message">Requirement Details</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Technical specs, quantities, timeline..."
                required
              />
              <span className="field__error">
                Please provide details about your requirement
              </span>
            </div>

            <Magnetic strength={0.2}>
              <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                {sending ? (
                  <>
                    <span className="btn__spinner" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <Icon name="send" size={16} />
                  </>
                )}
              </button>
            </Magnetic>

            <AnimatePresence>
              {feedback && (
                <motion.p
                  className={`contact-form__feedback ${feedback.type}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <Icon
                    name={feedback.type === "success" ? "check" : "close"}
                    size={16}
                  />
                  {feedback.msg}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
