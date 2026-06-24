"use client";
import { useRef, useEffect } from "react";
import styles from "./Background.module.css";

const STAR_COUNT = 1000;
const REPEL_RADIUS = 60;
const REPEL_FORCE = 25;
const RETURN_SPEED = 0.005;
const FRICTION = 0.88;

export default function Background() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          originX: x,
          originY: y,
          x,
          y,
          radius: Math.random() * 1.4 + 0.2,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.008 + 0.003,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          vx: 0,
          vy: 0,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.15,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const m = mouseRef.current;

      stars.forEach((star) => {
        // Twinkle
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.twinkleDir = -1;
        }
        if (star.opacity <= 0.05) {
          star.opacity = 0.05;
          star.twinkleDir = 1;
        }

        // Cursor repel / return / drift
        const dx = star.x - m.x;
        const dy = star.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          star.vx += Math.cos(angle) * force * REPEL_FORCE;
          star.vy += Math.sin(angle) * force * REPEL_FORCE;
        } else if (Math.abs(star.vx) > 0.01 || Math.abs(star.vy) > 0.01) {
          star.vx += (star.originX - star.x) * RETURN_SPEED;
          star.vy += (star.originY - star.y) * RETURN_SPEED;
        } else {
          star.vx = 0;
          star.vy = 0;
          star.x += star.driftX;
          star.y += star.driftY;
          star.originX = star.x;
          star.originY = star.y;
        }

        // Wrap edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.vx *= FRICTION;
        star.vy *= FRICTION;
        star.x += star.vx;
        star.y += star.vy;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onResize = () => {
      resize();
      createStars();
    };

    resize();
    createStars();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.starfield} />
      <div className={styles.grid} />
    </>
  );
}