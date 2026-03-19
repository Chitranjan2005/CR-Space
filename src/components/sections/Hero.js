"use client";
import { useRef, useEffect } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 }); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];

    const REPEL_RADIUS = 60;   // how far cursor pushes stars
    const REPEL_FORCE  = 25;     // how strong the push is
    const RETURN_SPEED = 0.005;  // how fast stars float back

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
          // original home position
          originX: x,
          originY: y,
          // current position (moves when repelled)
          x,
          y,
          radius:     Math.random() * 1.4 + 0.2,
          opacity:    Math.random(),
          // twinkle — each star has its own random speed + phase
          twinkleSpeed: Math.random() * 0.008 + 0.03,
          twinkleDir:   Math.random() > 0.5 ? 1 : -1,
          // repel state
          vx: 0,  // velocity x
          vy: 0,  // velocity y
          driftX: (Math.random() - 0.5) * 0.3, 
          driftY: (Math.random() - 0.5) * 0.3, 
          
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      stars.forEach((star) => {

  // ── 1. Twinkle ──
  star.opacity += star.twinkleSpeed * star.twinkleDir;
  if (star.opacity >= 1)    { star.opacity = 1;    star.twinkleDir = -1; }
  if (star.opacity <= 0.05) { star.opacity = 0.05; star.twinkleDir =  1; }

  // ── 2. Distance from cursor ──
  const dx       = star.x - mouse.x;
  const dy       = star.y - mouse.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < REPEL_RADIUS) {
    // ── 3a. REPEL only — no return force here ──
    const angle = Math.atan2(dy, dx);
    const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
    star.vx += Math.cos(angle) * force * REPEL_FORCE;
    star.vy += Math.sin(angle) * force * REPEL_FORCE;

  } else if (Math.abs(star.vx) > 0.01 || Math.abs(star.vy) > 0.01) {
    // ── 3b. RETURNING — has velocity, pull back to origin ──
    star.vx += (star.originX - star.x) * RETURN_SPEED;
    star.vy += (star.originY - star.y) * RETURN_SPEED;

  } else {
    // ── 3c. DRIFTING — fully settled, drift freely ──
    star.vx = 0;
    star.vy = 0;
    star.x += star.driftX;
    star.y += star.driftY;
    // keep origin updated so return target moves with drift
    star.originX = star.x;
    star.originY = star.y;
  }

  // ── 4. Friction ──
  star.vx *= 0.88;
  star.vy *= 0.88;  

  // ── 5. Apply velocity ──
  star.x += star.vx;
  star.y += star.vy;

  // ── 6. Wrap edges ──
  if (star.x < 0)             star.x = canvas.width;
  if (star.x > canvas.width)  star.x = 0;
  if (star.y < 0)             star.y = canvas.height;
  if (star.y > canvas.height) star.y = 0;

  // ── 7. Draw ──
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
  ctx.fill();
});
   
      animationId = requestAnimationFrame(draw);
    };

    // ── Mouse tracking ──
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      // push cursor off screen so stars return home
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    createStars();
    draw();

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", () => { resize(); createStars(); });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize",     resize);
    };
  }, []);

  return (
     <section style={styles.section}>

    {/* Starfield */}
    <canvas ref={canvasRef} style={styles.canvas} />

    {/* Navbar */}
    <nav style={styles.nav}>
      <span style={styles.navLogo}>CR-SPACE</span>
      <div style={styles.navLinks}>
        {["HOME", "PROJECTS", "SKILLS", "CONTACT"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} style={styles.navLink}
            onMouseEnter={e => e.target.style.color = "#4db8d4"}
            onMouseLeave={e => e.target.style.color = "#888"}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>

    {/* Main content */}
    <div style={styles.content}>

      {/* Left — Photo */}
      <div style={styles.photoWrap}>
        <div style={styles.blobShape}>
          <img
            src="/profile.jpg"
            alt="Chitranjan"
            style={styles.photo}
          />
        </div>
      </div>

      {/* Right — Text */}
      <div style={styles.textWrap}>

        <h1 style={styles.heading}>
          Hey, I'm{" "}
          <span style={styles.accent}>Chitranjan</span>
        </h1>

        <p style={styles.desc}>
          I am a Full-stack developer building scalable and user-focused web applications.
        </p>
        <p style={styles.desc}>
          I am a Student of Bachelor of technology with strong focus on computer science fundamentals and continuous learning.
        </p>
        <p style={styles.desc}>
          Currently exploring Agentic AI to create intelligent, autonomous systems.
        </p>

        {/* Social icons */}
<div style={styles.socials}>
  {[
    { label: "GitHub",   href: "https://github.com",   icon: "⌥" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
  ].map((s) => (
    
      <a
      key={s.label}
      href={s.href}
      title={s.label}
      style={styles.socialIcon}
      onMouseEnter={e => {
        e.currentTarget.style.color = "#4db8d4";
        e.currentTarget.style.borderColor = "#4db8d4";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = "#888";
        e.currentTarget.style.borderColor = "#333";
      }}
    >
      {s.icon}
    </a>
  ))}
</div>

      </div>
    </div>

    {/* Scroll indicator
    <div style={styles.scrollWrap}>
      <span style={styles.scrollText}>SCROLL</span>
      <div style={styles.scrollLine} />
    </div> */}

  </section>
  );
}

const styles = {
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
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  center: {
    position: "relative",
    zIndex: 2,
  },
  temp: {
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "3rem",
  },
  // Navbar
nav: {
  position: "absolute",
  top: 0, left: 0, right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px 48px",
  zIndex: 10,
},
navLogo: {
  color: "#4db8d4",
  fontSize: "1.8rem",
  fontWeight: 700,
  fontFamily: "cursive",
  letterSpacing: "0.05em",
},
navLinks: {
  display: "flex",
  gap: "2rem",
},
navLink: {
  color: "#888",
  textDecoration: "none",
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  fontFamily: "sans-serif",
  transition: "color 0.2s",
},

// Layout
content: {
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5vw",
  padding: "0 6vw",
  width: "100%",
  maxWidth: 1100,
},

// Photo
photoWrap: {
  flex: "0 0 auto",
},
blobShape: {
  width: 260,
  height: 300,
  borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
  overflow: "hidden",
  background: "#1a2a3a",
},
photo: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
},

// Text
textWrap: {
  flex: 1,
  maxWidth: 580,
},
heading: {
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 600,
  color: "#ccc",
  fontFamily: "sans-serif",
  marginBottom: "1.5rem",
  lineHeight: 1.2,
},
accent: {
  color: "#4db8d4",
},
desc: {
  fontSize: "0.95rem",
  color: "#888",
  lineHeight: 1.8,
  marginBottom: "0.6rem",
  fontFamily: "sans-serif",
},

// Socials
socials: {
  display: "flex",
  gap: "0.8rem",
  marginTop: "1.8rem",
},
socialIcon: {
  width: 38,
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #333",
  borderRadius: "50%",
  color: "#888",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontFamily: "sans-serif",
  transition: "color 0.2s, border-color 0.2s",
},

// Scroll
scrollWrap: {
  position: "absolute",
  bottom: 32,
  right: 48,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  zIndex: 10,
},
scrollText: {
  fontFamily: "sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  color: "#4db8d4",
},
scrollLine: {
  width: 1,
  height: 50,
  background: "linear-gradient(to bottom, #4db8d4, transparent)",
},
};