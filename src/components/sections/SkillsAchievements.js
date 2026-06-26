"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsAchievements.module.css";

gsap.registerPlugin(ScrollTrigger);

// ── Placeholder data — swap in real values later ──
const SKILL_CATEGORIES = [
  {
    label: "FRONTEND",
    skills: [
      { name: "React / Next.js", level: 90, tag: "[ACTIVE]" },
      { name: "JavaScript / TypeScript", level: 85, tag: "[ACTIVE]" },
      { name: "GSAP / Framer Motion", level: 75, tag: "[ACTIVE]" },
    ],
  },
  {
    label: "BACKEND",
    skills: [
      { name: "Node.js / Express", level: 85, tag: "[ACTIVE]" },
      { name: "MongoDB", level: 78, tag: "[ACTIVE]" },
      { name: "REST / Auth", level: 80, tag: "[ACTIVE]" },
    ],
  },
  {
    label: "TOOLS",
    skills: [
      { name: "Git / GitHub", level: 88, tag: "[ACTIVE]" },
      { name: "Vercel / Render", level: 70, tag: "[ACTIVE]" },
      { name: "Figma", level: 60, tag: "[LEARNING]" },
    ],
  },
];

const ACHIEVEMENTS = [
  {
    date: "2026 // EVENT_01",
    badge: "HACKATHON",
    title: "Climate Digital Twin — Prototype Build",
    desc: "Built a full data pipeline with LSTM forecasting and a what-if simulator for Delhi-NCR climate modeling.",
  },
  {
    date: "2026 // EVENT_02",
    badge: "PROJECT",
    title: "CR-Space Portfolio Launch",
    desc: "Designed and shipped a fully custom Next.js portfolio with GSAP scroll choreography and a canvas starfield.",
  },
  {
    date: "2025 // EVENT_03",
    badge: "HACKATHON",
    title: "MindBridge — Agentic Mental Health Tool",
    desc: "Same-day build of a Hinglish-aware support assistant, deployed end-to-end on Vercel.",
  },
  {
    date: "2025 // EVENT_04",
    badge: "ACADEMIC",
    title: "Disaster Resource Allocation Optimizer",
    desc: "LP-based optimization model with a scipy solver, packaged as a deployed interactive web app.",
  },
];

export default function SkillsAchievements() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headers
      gsap.utils.toArray(`.${styles.sectionHead}`).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Skill bars — fill on scroll
      gsap.utils.toArray(`.${styles.skillRow}`).forEach((row) => {
        const bar = row.querySelector(`.${styles.signalBar}`);
        const level = bar?.dataset?.level || 0;

        gsap.fromTo(
          row,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          }
        );
        gsap.to(bar, {
          width: `${level}%`,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });

      // Achievement log entries
      gsap.utils.toArray(`.${styles.logEntry}`).forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: entry, start: "top 88%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ===== SKILLS ===== */}
      <section id="skills" className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>// 02 — SKILLS</span>
          <div className={styles.sectionLine} />
        </div>

        <div className={styles.skillsGrid}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label} className={styles.skillCategory}>
              <div className={styles.categoryLabel}>
                <span className={styles.categoryDot} />
                {cat.label}
              </div>

              {cat.skills.map((skill) => (
                <div key={skill.name} className={styles.skillRow}>
                  <div className={styles.skillTop}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillTag}>{skill.tag}</span>
                  </div>
                  <div className={styles.signalTrack}>
                    <div className={styles.signalBar} data-level={skill.level} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section id="achievements" className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>// 03 — ACHIEVEMENTS</span>
          <div className={styles.sectionLine} />
        </div>

        <div className={styles.logWrap}>
          <div className={styles.logSpine} />
          {ACHIEVEMENTS.map((item) => (
            <div key={item.title} className={styles.logEntry}>
              <div className={styles.logNode}>
                <span className={styles.logNodeDot} />
              </div>
              <div className={styles.logMeta}>
                <span>{item.date}</span>
                <span className={styles.logBadge}>{item.badge}</span>
              </div>
              <h3 className={styles.logTitle}>{item.title}</h3>
              <p className={styles.logDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}