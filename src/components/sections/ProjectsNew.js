"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsNew.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    tag: "HACKATHON",
    title: "Commit DNA",
    desc: "GitHub commit history analyzer that generates a burnout score and developer archetype card from real commit patterns.",
    stack: ["React", "Express", "Simple-Git"],
    liveUrl: "commit-dna-lkc9.vercel.app",
    codeUrl: "https://github.com/Chitranjan2005/Commit-DNA.git",
  },
  {
    tag: "PROJECT",
    title: "CR-Space Portfolio",
    desc: "This site. A sci-fi themed portfolio built with Next.js, GSAP scroll choreography, Lenis smooth scroll, and a custom starfield canvas.",
    stack: ["Next.js", "GSAP", "Lenis", "Tailwind"],
    liveUrl: "#",
    codeUrl: "https://github.com/Chitranjan2005/CR-Space.git",
  },
  {
    tag: "Project",
    title: "Footstep-Energy-Generator",
    desc: "This project explores the potential of harvesting energy from footsteps. By converting mechanical energy into electrical energy, this system aims to power small electronic devices..",
    stack: ["Arduino"],
    liveUrl: "#",
    codeUrl: "https://github.com/Chitranjan2005/Footstep-Energy-Generator.git",
  },
//   {
//     tag: "PROJECT",
//     title: "Commit DNA",
//     desc: "GitHub commit history analyzer that generates a burnout score and developer archetype card from real commit patterns.",
//     stack: ["React", "Express", "Canvas API"],
//     liveUrl: "#",
//     codeUrl: "",
//   },
  {
    tag: "HACKATHON",
    title: "Rock-Paper_scissors Using Gensture Recognition",
    desc: "The game is exclusively controlled through the recognition of the player's hand gestures, transforming each motion into a dynamic and immersive form of interaction in a couple of seconds.",
    stack: ["Python", "OpenCV", "MediaPipe" ,  "HtML/CSS" , "javascript"],
    liveUrl: "#",
    codeUrl: "https://github.com/Chitranjan2005/Foss-hack-project-25.git",
  },
//   {
//     tag: "ACADEMIC",
//     title: "Disaster Resource Allocator",
//     desc: "Linear programming model for optimal disaster resource distribution, backed by a scipy solver and real NDMA/NDRF data.",
//     stack: ["Python", "SciPy", "HTML/CSS"],
//     liveUrl: "#",
//     codeUrl: "#",
//   },
];

const DESKTOP_VISIBLE = 2;
const MOBILE_VISIBLE = 1;
const MOBILE_BREAKPOINT = 860;
const AUTO_SCROLL_MS = 3500;

export default function ProjectsNew() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(DESKTOP_VISIBLE);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, PROJECTS.length - visibleCount);

  // Track viewport width to switch 2 <-> 1 visible cards
  useEffect(() => {
    const updateVisibleCount = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setVisibleCount(isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Clamp index whenever visibleCount changes (e.g. resize mid-scroll)
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, PROJECTS.length - visibleCount)));
  }, [visibleCount]);

  const goTo = useCallback(
    (next) => {
      setIndex((i) => {
        const localMax = Math.max(0, PROJECTS.length - visibleCount);
        return Math.max(0, Math.min(next, localMax));
      });
    },
    [visibleCount]
  );

  const goNext = useCallback(() => {
    setIndex((i) => {
      const localMax = Math.max(0, PROJECTS.length - visibleCount);
      return i >= localMax ? 0 : i + 1; // loop back to start
    });
  }, [visibleCount]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // Keep a ref to the latest goNext so the interval below never goes stale
  // and never needs to be torn down/recreated just because maxIndex changed.
  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  // Move the track to match the current index
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slot = track.children[0];
    if (!slot) return;

    const slotWidth = slot.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const offset = index * (slotWidth + gap);

    gsap.to(track, {
      x: -offset,
      duration: 0.7,
      ease: "power3.out",
    });
  }, [index, visibleCount]);

  // Auto-scroll — single interval set up once, reads the latest goNext via ref.
  // Pausing/resuming just toggles whether the tick actually advances.
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused) goNextRef.current();
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const handleNextClick = () => goNext();
  const handlePrevClick = () => goPrev();

  // Scroll-in reveal for header + slider
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.glassHeader}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.glassHeader}`, start: "top 85%" },
        }
      );

      gsap.fromTo(
        `.${styles.sliderShell}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.sliderShell}`, start: "top 88%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="projects" className={styles.section}>
        <div className={styles.headerWrap}>
          <div className={styles.glassHeader}>
            <span className={styles.glassDot} />
            <span className={styles.glassTitle}>PROJECTS</span>
            <span className={styles.glassIndex}>// 04</span>
          </div>
        </div>

        <div
          className={styles.sliderShell}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={handlePrevClick}
            disabled={index === 0}
            aria-label="Previous projects"
          >
            ←
          </button>

          <div className={styles.viewport} ref={viewportRef}>
            <div className={styles.track} ref={trackRef}>
              {PROJECTS.map((project) => (
                <div key={project.title} className={styles.cardSlot}>
                  <div className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardTag}>{project.tag}</span>
                      <div className={styles.cardLinks}>
                        <a href={project.liveUrl} className={styles.cardLink} aria-label="Live demo">
                          ↗
                        </a>
                        <a href={project.codeUrl} className={styles.cardLink} aria-label="Source code">
                          ⌥
                        </a>
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <p className={styles.cardDesc}>{project.desc}</p>
                      <div className={styles.stackRow}>
                        {project.stack.map((tech) => (
                          <span key={tech} className={styles.stackChip}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.arrowBtn}
            onClick={handleNextClick}
            aria-label="Next projects"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}