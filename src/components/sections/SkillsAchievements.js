"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsAchievements.module.css";

gsap.registerPlugin(ScrollTrigger);

const DEVELOPMENT = [
  "React / Next.js",
  "JavaScript",
  "Node.js / Express",
  "MongoDB / SQL",
  "REST APIs / Auth",
];

const TOOLS_AND_LANGUAGES = [
  "Git / GitHub",
  "Doker",
  "Java",
  "Javascript",
];

const ACHIEVEMENTS = [
  {
    date: "Securerd 2nd Position in Hackathon",
    badge: "HACKATHON",
    title: "Footstep Energy Generator",
    desc: "This project explores the potential of harvesting energy from footsteps. By converting mechanical energy into electrical energy, this system aims to power small electronic devices.",
  },
  {
    date: "secured 3rd Position in Hackathon",
    badge: "Hackathon",
    title: "Survillance Car",
    desc: "A survillance car that can be cntrolled by using anyphone using blutooth and cab control by voice commands.",
  },
];

export default function SkillsAchievements() {
  const rootRef = useRef(null);

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
        `.${styles.skillsBox}`,
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
        `.${styles.achievementsBox}`,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.layout}`, start: "top 82%" },
        }
      );

      gsap.utils.toArray(`.${styles.logEntry}`).forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: entry, start: "top 90%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="skills" className={styles.section}>
        <div className={styles.headerWrap}>
          <div className={styles.glassHeader}>
            <span className={styles.glassDot} />
            <span className={styles.glassTitle}>SKILLS & ACHIEVEMENTS</span>
          </div>
        </div>

        <div className={styles.layout}>
          {/* ===== SKILLS BOX ===== */}
          <div className={styles.skillsBox}>
            <h3 className={styles.boxTitle}>Skills</h3>

            <div className={styles.subPanelGrid}>
              <div className={styles.subPanel}>
                <div className={styles.subPanelLabel}>
                  <span className={styles.subPanelDot} />
                  DEVELOPMENT
                </div>
                <div className={styles.chipRow}>
                  {DEVELOPMENT.map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.subPanel}>
                <div className={styles.subPanelLabel}>
                  <span className={styles.subPanelDot} />
                  TOOLS & LANGUAGES
                </div>
                <div className={styles.chipRow}>
                  {TOOLS_AND_LANGUAGES.map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== ACHIEVEMENTS BOX ===== */}
          <div className={styles.achievementsBox}>
            <h3 className={styles.boxTitle}>Achievements</h3>

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
                  <h4 className={styles.logTitle}>{item.title}</h4>
                  <p className={styles.logDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}