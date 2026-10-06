"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { FadeIn, Magnetic, RevealLines } from "@/components/motion/primitives";

type Errors = { name?: boolean; phone?: boolean; message?: boolean };
type Feedback = { type: "success" | "error"; msg: string; mailto?: string } | null;

/** Accepts "98765 43210", "+91 98946 97390", "09894697390" etc. */
function normalizePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [sending, setSending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const clearError = (key: keyof Errors) =>
    setErrors((e) => (e[key] ? { ...e, [key]: false } : e));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phoneRaw = (form.elements.namedItem("phno") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const digits = normalizePhone(phoneRaw);
    const next: Errors = {
      name: name.length < 2,
      phone: !/^[6-9]\d{9}$/.test(digits),
      message: message.length < 5,
    };
    setErrors(next);

    if (next.name || next.phone || next.message) {
      setFeedback({ type: "error", msg: "Please correct the highlighted fields." });
      /* Focus the first invalid field. Error text renders below the input and
         the feedback banner below the fields, so the field's own position
         never shifts — focus can happen synchronously (works even when
         requestAnimationFrame is throttled in background tabs). */
      const firstKey = next.name
        ? "#fullName"
        : next.phone
          ? "#phoneNum"
          : "#message";
      form.querySelector<HTMLElement>(firstKey)?.focus();
      return;
    }

    setSending(true);
    timer.current = setTimeout(() => {
      setSending(false);

      /* No backend on this site — build a fully prefilled email so the
         inquiry genuinely reaches the office. The success state shows a
         one-click send action instead of pretending a network call worked. */
      const subject = `Website inquiry from ${name}`;
      const body = `${message}\n\n— ${name}\nPhone: ${phoneRaw}`;
      const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      setFeedback({
        type: "success",
        msg: "Your inquiry is ready — send it to our Hosur office:",
        mailto,
      });
      form.reset();
      setErrors({});
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setFeedback(null), 30000);
    }, 700);
  }

  const fieldClass = (key: keyof Errors) =>
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
            <div className={fieldClass("name")}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="name"
                placeholder="Your full name"
                required
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "fullName-error" : undefined}
                onChange={() => clearError("name")}
              />
              <span className="field__error" id="fullName-error">
                Please enter your full name
              </span>
            </div>

            <div className={fieldClass("phone")}>
              <label htmlFor="phoneNum">Phone Number</label>
              <input
                type="tel"
                id="phoneNum"
                name="phno"
                placeholder="98765 43210"
                required
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? "phoneNum-error" : undefined}
                onChange={() => clearError("phone")}
              />
              <span className="field__error" id="phoneNum-error">
                Please enter a valid 10-digit phone number
              </span>
            </div>

            <div className={fieldClass("message")}>
              <label htmlFor="message">Requirement Details</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Technical specs, quantities, timeline..."
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                onChange={() => clearError("message")}
              />
              <span className="field__error" id="message-error">
                Please provide details about your requirement
              </span>
            </div>

            <Magnetic strength={0.2}>
              <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                {sending ? (
                  <>
                    <span className="btn__spinner" aria-hidden="true" />
                    Preparing...
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
                <motion.div
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
                  <span>
                    {feedback.msg}
                    {feedback.mailto && (
                      <>
                        {" "}
                        <a href={feedback.mailto} className="contact-form__send">
                          Send via email <Icon name="arrowUpRight" size={13} />
                        </a>
                      </>
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
