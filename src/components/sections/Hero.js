"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MusicPlayer from "@/components/ui/MusicPlayer";

export default function Hero() {
  const loaderCanvasRef = useRef(null);
  const heroCanvasRef   = useRef(null);
  const mouseRef        = useRef({ x: -9999, y: -9999 });
  const [loading, setLoading]         = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  const initStarfield = (canvas, mouse) => {
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];
    const REPEL_RADIUS = 60;
    const REPEL_FORCE  = 25;
    const RETURN_SPEED = 0.005;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          originX: x, originY: y, x, y,
          radius:       Math.random() * 1.4 + 0.2,
          opacity:      Math.random(),
          twinkleSpeed: Math.random() * 0.008 + 0.03,
          twinkleDir:   Math.random() > 0.5 ? 1 : -1,
          vx: 0, vy: 0,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const m = mouse.current;
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity >= 1)    { star.opacity = 1;    star.twinkleDir = -1; }
        if (star.opacity <= 0.05) { star.opacity = 0.05; star.twinkleDir =  1; }

        const dx = star.x - m.x;
        const dy = star.y - m.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < REPEL_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
          star.vx += Math.cos(angle) * force * REPEL_FORCE;
          star.vy += Math.sin(angle) * force * REPEL_FORCE;
        } else if (Math.abs(star.vx) > 0.01 || Math.abs(star.vy) > 0.01) {
          star.vx += (star.originX - star.x) * RETURN_SPEED;
          star.vy += (star.originY - star.y) * RETURN_SPEED;
        } else {
          star.vx = 0; star.vy = 0;
          star.x += star.driftX;
          star.y += star.driftY;
          star.originX = star.x;
          star.originY = star.y;
        }

        if (star.x < 0)             star.x = canvas.width;
        if (star.x > canvas.width)  star.x = 0;
        if (star.y < 0)             star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.vx *= 0.88;
        star.vy *= 0.88;
        star.x  += star.vx;
        star.y  += star.vy;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize(); createStars(); draw();
    const onResize = () => { resize(); createStars(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  };

  // loader starfield
  useEffect(() => {
    if (!loaderCanvasRef.current) return;
    return initStarfield(loaderCanvasRef.current, mouseRef);
  }, []);

  // hero starfield
  useEffect(() => {
    if (loading || !heroCanvasRef.current) return;
    return initStarfield(heroCanvasRef.current, mouseRef);
  }, [loading]);

  // mouse
  useEffect(() => {
    const onMouseMove  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = ()    => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // loader progress
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
            opacity: 0, duration: 0.8, ease: "power2.inOut",
            onComplete: () => setLoading(false),
          });
        }, 400);
      } else {
        setLoadPercent(Math.floor(progress));
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // hero animations
  useEffect(() => {
    if (!loading) {
      gsap.registerPlugin(ScrollTrigger);

      // ── entrance timeline ──
      const tl = gsap.timeline();
      tl.fromTo(".hero-photo",
        { opacity: 0, x: -60, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      )
      .fromTo(".hero-hey",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-letter",
        { opacity: 0, y: 50, rotateX: -90, transformOrigin: "bottom" },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.055, duration: 0.7, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(".hero-social",
        { opacity: 0, y: 16, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: "back.out(1.4)" },
        "-=0.2"
      );

      // ── pinned scroll word reveal ──
      const words = gsap.utils.toArray(".hero-word");

      // group into pairs of 2
      const wordPairs = [];
      for (let i = 0; i < words.length; i += 2) {
        wordPairs.push(words.slice(i, i + 2));
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=500%",        // 5x scroll distance = ~5s
          pin: true,            // section stays fixed
          scrub: 1.5,           // smooth tie to scroll
          anticipatePin: 1,
        },
      });

      // place each pair at equal intervals across the timeline
      wordPairs.forEach((pair, i) => {
        const pos = i / wordPairs.length;
        scrollTl.fromTo(pair,
          { opacity: 0.15, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          pos
        );
      });
    }
  }, [loading]);

  const nameLetters = "Chitranjan".split("");

  const descriptions = [
    "I am a Full-stack developer building scalable and user-focused web applications.",
    "Bachelor of technology with strong focus on computer science fundamentals and continuous learning.",
    "Currently exploring Agentic AI to create intelligent, autonomous systems.",
  ];

  return (
    <>
      {/* ── LOADER ── */}
      {loading && (
        <div className="loader-wrap" style={s.loader}>
          <canvas ref={loaderCanvasRef} style={s.canvas} />
          <div style={s.loaderInner}>
            <div style={s.loaderLogo}>
              {"CR-SPACE".split("").map((c, i) => (
                <span key={i} style={{
                  ...s.loaderChar,
                  animationDelay: `${i * 0.08}s`,
                }}>
                  {c}
                </span>
              ))}
            </div>
            <p style={s.loaderRole}>FULL STACK DEVELOPER</p>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressBar, width: `${loadPercent}%` }} />
            </div>
            <span style={s.loaderPercent}>{loadPercent}%</span>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      {!loading && (
        <section className="hero-section" style={s.section}>

          <canvas ref={heroCanvasRef} style={s.canvas} />

          {/* Navbar */}
          <nav style={s.nav}>
            <span style={s.navLogo}>CR-SPACE</span>
            <div style={s.navLinks}>
              {["HOME", "PROJECTS", "SKILLS", "CONTACT"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} style={s.navLink}
                  onMouseEnter={e => e.target.style.color = "#4db8d4"}
                  onMouseLeave={e => e.target.style.color = "#888"}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div style={s.content}>

            {/* Photo */}
            <div className="hero-photo" style={{ ...s.photoWrap, opacity: 0 }}>
              <div style={s.blobShape}>
                <img src="/profile.jpg" alt="Chitranjan" style={s.photo} />
              </div>
            </div>

            {/* Text */}
            <div style={s.textWrap}>

              <h1 style={s.heading}>
                <span className="hero-hey" style={{ opacity: 0 }}>
                  Hey, I'm{" "}
                </span>
                <span style={{ display: "inline-block", perspective: "600px" }}>
                  {nameLetters.map((char, i) => (
                    <span key={i} className="hero-letter" style={{
                      display: "inline-block",
                      color: "#4db8d4",
                      opacity: 0,
                    }}>
                      {char}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Words — pinned scroll reveal */}
              <div style={s.descWrap}>
                {descriptions.map((text, i) => (
                  <p key={i} style={s.desc}>
                    {text.split(" ").map((word, j) => (
                      <span key={j} className="hero-word" style={s.word}>
                        {word}{" "}
                      </span>
                    ))}
                  </p>
                ))}
              </div>

              {/* Socials */}
              <div style={s.socials}>
                {[
                  { label: "GitHub",   href: "https://github.com",   icon: "⌥" },
                  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
                  { label: "Twitter",  href: "https://twitter.com",  icon: "𝕏"  },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="hero-social"
                    style={{ ...s.socialIcon, opacity: 0 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#4db8d4";
                      e.currentTarget.style.borderColor = "#4db8d4";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#888";
                      e.currentTarget.style.borderColor = "#333";
                    }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* Scroll hint */}
          <div style={s.scrollHint}>
            <div style={s.scrollLine} />
            <span style={s.scrollText}>SCROLL</span>
          </div>
          <MusicPlayer />

        </section>
      )}

      <style>{`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0px);  opacity: 0.4; }
          50%       { transform: translateY(-8px); opacity: 1;   }
        }
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </>
  );
}

const s = {
  // loader
  loader: {
    position: "fixed", inset: 0,
    background: "#060d14",
    display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: 9999,
  },
  loaderInner: {
    position: "relative", zIndex: 2,
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "1.2rem",
  },
  loaderLogo: { display: "flex", gap: "4px" },
  loaderChar: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800, color: "#4db8d4",
    fontFamily: "sans-serif", display: "inline-block",
    animation: "loaderFloat 1.8s ease-in-out infinite",
    letterSpacing: "0.05em",
  },
  loaderRole: {
    fontFamily: "sans-serif", fontSize: "0.7rem",
    letterSpacing: "0.3em", color: "#444",
  },
  progressTrack: {
    width: "240px", height: "2px",
    background: "#1a2a3a", borderRadius: "2px",
    overflow: "hidden", marginTop: "0.5rem",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(to right, #1a4a5a, #4db8d4)",
    borderRadius: "2px", transition: "width 0.1s ease",
  },
  loaderPercent: {
    fontFamily: "sans-serif", fontSize: "0.7rem",
    color: "#4db8d4", letterSpacing: "0.1em",
  },

  // hero
  section: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    background: "#060d14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    position: "absolute", inset: 0,
    zIndex: 0, pointerEvents: "none",
  },
  nav: {
    position: "absolute", top: 0, left: 0, right: 0,
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 48px", zIndex: 10,
  },
  navLogo: {
    color: "#4db8d4", fontSize: "1.4rem",
    fontWeight: 700, fontFamily: "sans-serif",
  },
  navLinks: { display: "flex", gap: "2rem" },
  navLink: {
    color: "#888", textDecoration: "none",
    fontSize: "0.8rem", letterSpacing: "0.1em",
    fontFamily: "sans-serif",
  },
  content: {
    position: "relative", zIndex: 2,
    display: "flex", alignItems: "center",
    justifyContent: "center",
    gap: "5vw", padding: "0 6vw",
    width: "100%", maxWidth: 1100,
  },
  photoWrap: { flex: "0 0 auto" },
  blobShape: {
    width: 260, height: 300,
    borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
    overflow: "hidden", background: "#1a2a3a",
  },
  photo: {
    width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "top",
  },
  textWrap: { flex: 1, maxWidth: 580 },
  heading: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 600, color: "#ccc",
    fontFamily: "sans-serif",
    marginBottom: "1.5rem", lineHeight: 1.4,
  },
  descWrap: {
    display: "flex", flexDirection: "column", gap: "0.5rem",
  },
  desc: {
    fontSize: "0.95rem", lineHeight: 1.9,
    fontFamily: "sans-serif", margin: 0,
  },
  word: {
    display: "inline-block",
    color: "#888",
    opacity: 0.15,
    marginRight: "4px",
    willChange: "opacity, transform",
  },
  socials: { display: "flex", gap: "0.8rem", marginTop: "1.8rem" },
  socialIcon: {
    width: 38, height: 38,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1px solid #333", borderRadius: "50%",
    color: "#888", textDecoration: "none",
    fontSize: "0.85rem", fontFamily: "sans-serif",
    transition: "color 0.2s, border-color 0.2s",
  },
  scrollHint: {
    position: "absolute",
    bottom: 32, right: 48,
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 8, zIndex: 10,
  },
  scrollLine: {
    width: 1, height: 50,
    background: "linear-gradient(to bottom, #4db8d4, transparent)",
    animation: "scrollPulse 2s ease-in-out infinite",
  },
  scrollText: {
    fontFamily: "sans-serif", fontSize: "0.65rem",
    letterSpacing: "0.2em", color: "#4db8d4",
  },
};
