"use client";
import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MusicPlayer from "@/components/ui/MusicPlayer";
import styles from "./Hero.module.css";

const NAV_ITEMS = ["HOME", "PROJECTS", "SKILLS", "CONTACT"];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: "⌥" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
  { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
];

const DESCRIPTIONS = [
  "I am a Full-stack developer building scalable and user-focused web applications.",
  "Bachelor of technology with strong focus on computer science fundamentals and continuous learning.",
  "Currently exploring Agentic AI to create intelligent, autonomous systems.",
];

const NAME_LETTERS = "Chitranjan".split("");

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  // Loader progress
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        setLoadPercent(100);
        clearInterval(interval);
        setTimeout(() => {
          gsap.to(".loader-wrap", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => setLoading(false),
          });
        }, 400);
      } else {
        setLoadPercent(Math.floor(progress));
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Hero entrance + pinned scroll word reveal
  useEffect(() => {
    if (loading) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap
      .timeline()
      .fromTo(
        ".hero-photo",
        { opacity: 0, x: -60, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      )
      .fromTo(
        ".hero-hey",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-letter",
        { opacity: 0, y: 50, rotateX: -90, transformOrigin: "bottom" },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.055, duration: 0.7, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-social",
        { opacity: 0, y: 16, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: "back.out(1.4)" },
        "-=0.2"
      );

    const words = gsap.utils.toArray(".hero-word");
    const wordPairs = [];
    for (let i = 0; i < words.length; i += 2) {
      wordPairs.push(words.slice(i, i + 2));
    }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    wordPairs.forEach((pair, i) => {
      const pos = i / wordPairs.length;
      scrollTl.fromTo(
        pair,
        { opacity: 0.15, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        pos
      );
    });
  }, [loading]);

  if (loading) {
    return (
      <div className={`loader-wrap ${styles.loader}`}>
        <div className={styles.loaderInner}>
          <div className={styles.loaderLogo}>
            {"CR-SPACE".split("").map((c, i) => (
              <span key={i} className={styles.loaderChar} style={{ animationDelay: `${i * 0.08}s` }}>
                {c}
              </span>
            ))}
          </div>
          <p className={styles.loaderRole}>FULL STACK DEVELOPER</p>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: `${loadPercent}%` }} />
          </div>
          <span className={styles.loaderPercent}>{loadPercent}%</span>
        </div>
      </div>
    );
  }

  return (
    <section className={`hero-section ${styles.section}`}>
      <nav className={styles.nav}>
        <span className={styles.navLogo}>CR-SPACE</span>
        <div className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={styles.navLink}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      <div className={styles.content}>
        <div className={`hero-photo ${styles.photoWrap}`}>
          <div className={styles.blobShape}>
            <img src="/profile.jpg" alt="Chitranjan" className={styles.photo} />
          </div>
        </div>

        <div className={styles.textWrap}>
          <h1 className={styles.heading}>
            <span className="hero-hey">Hey, I'm </span>
            <span style={{ display: "inline-block", perspective: "600px" }}>
              {NAME_LETTERS.map((char, i) => (
                <span key={i} className="hero-letter" style={{ display: "inline-block", color: "#4db8d4" }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <div className={styles.descWrap}>
            {DESCRIPTIONS.map((text, i) => (
              <p key={i} className={styles.desc}>
                {text.split(" ").map((word, j) => (
                  <span key={j} className={`hero-word ${styles.word}`}>
                    {word}{" "}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div className={styles.socials}>
            {SOCIALS.map((item) => (
              <a key={item.label} href={item.href} className={`hero-social ${styles.socialIcon}`}>
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
      </div>

      <MusicPlayer />
    </section>
  );
}