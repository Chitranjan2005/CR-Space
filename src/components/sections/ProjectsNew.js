"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsNew.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    tag: "HACKATHON",
    title: "Climate Digital Twin — India",
    desc: "Full data pipeline with a PyTorch LSTM forecasting model and a FastAPI backend, simulating regional climate scenarios.",
    stack: ["Python", "PyTorch", "FastAPI", "React"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    tag: "PROJECT",
    title: "CR-Space Portfolio",
    desc: "This site. A sci-fi themed portfolio built with Next.js, GSAP scroll choreography, Lenis smooth scroll, and a custom starfield canvas.",
    stack: ["Next.js", "GSAP", "Lenis", "Tailwind"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    tag: "HACKATHON",
    title: "MindBridge",
    desc: "Agentic mental health triage tool with Hinglish language support, built and deployed end-to-end during a hackathon.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    tag: "PROJECT",
    title: "Commit DNA",
    desc: "GitHub commit history analyzer that generates a burnout score and developer archetype card from real commit patterns.",
    stack: ["React", "Express", "Canvas API"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    tag: "HACKATHON",
    title: "SightSpeak",
    desc: "React Native sign language bridge app using on-device LLM, speech-to-text, and text-to-speech models for offline use.",
    stack: ["React Native", "On-device LLM"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    tag: "ACADEMIC",
    title: "Disaster Resource Allocator",
    desc: "Linear programming model for optimal disaster resource distribution, backed by a scipy solver and real NDMA/NDRF data.",
    stack: ["Python", "SciPy", "HTML/CSS"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

export default function ProjectsNew() {
  const rootRef = useRef(null);

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

      gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="projects" className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>// 04 — PROJECTS</span>
          <div className={styles.sectionLine} />
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <div key={project.title} className={styles.card}>
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
          ))}
        </div>
      </section>
    </div>
  );
}