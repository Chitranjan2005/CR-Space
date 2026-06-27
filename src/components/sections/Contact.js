"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "imcr8882@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/chitranjan2005", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chitranjan-k-50bb70324", Icon: LinkedInIcon },
  { label: "Leetcode", href: "https://leetcode.com/u/O3vjKD9Bsv", Icon: LeetCodeIcon },
];

export default function Contact() {
  const rootRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.sectionHead}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.sectionHead}`, start: "top 85%" },
        }
      );

      gsap.fromTo(
        `.${styles.left}`,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.layout}`, start: "top 82%" },
        }
      );

      gsap.fromTo(
        `.${styles.right}`,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.layout}`, start: "top 82%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit — wire this up to an email service (e.g. Resend, Formspree) later.
    setStatus("Message captured locally — connect a backend to actually send this.");
  };

  return (
    <div ref={rootRef}>
      <section id="contact" className={styles.section}>

        <div className={styles.layout}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Got a project in mind? Let&apos;s talk.</h2>
            <p className={styles.subtext}>
              Open to freelance work and interesting full-stack problems.
              Reach out directly or drop a message in the form.
            </p>

            <div className={styles.contactRow}>
              <span className={styles.contactIcon}>@</span>
              <a href={`mailto:${EMAIL}`} className={styles.contactLink}>
                {EMAIL}
              </a>
            </div>

            <div className={styles.socials}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialIcon}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <label className={styles.fieldLabel} htmlFor="name">
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="email">
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  value={form.message}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                SEND MESSAGE →
              </button>

              {status && <span className={styles.statusText}>{status}</span>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}