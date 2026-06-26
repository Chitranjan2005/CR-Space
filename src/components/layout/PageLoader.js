"use client";
import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./PageLoader.module.css";

export default function PageLoader({ onComplete }) {
  const [loadPercent, setLoadPercent] = useState(0);

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
            onComplete,
          });
        }, 400);
      } else {
        setLoadPercent(Math.floor(progress));
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

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
        <p className={styles.loaderRole}>MERN DEVELOPER</p>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${loadPercent}%` }} />
        </div>
        <span className={styles.loaderPercent}>{loadPercent}%</span>
      </div>
    </div>
  );
}