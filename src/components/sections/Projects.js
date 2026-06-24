// "use client";
// import { useRef, useEffect } from "react";
// import { gsap } from "@/lib/gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const STATS = [
//   { value: 10, suffix: "+", label: "Projects Built" },
//   { value: 2,  suffix: "+", label: "Years Coding"   },
//   { value: 5,  suffix: "+", label: "Happy Clients"  },
//   { value: 11, suffix: "",  label: "Technologies"   },
// ];

// const SKILLS = [
//   {
//     category: "FRONTEND",
//     items: [
//       { name: "React.js",   level: 75 },
//       { name: "Next.js",    level: 80 },
//       { name: "Tailwind",   level: 90 },
//       { name: "GSAP",       level: 70 },
//       // { name: "TypeScript", level: 65 },
//     ],
//   },
//   {
//     category: "BACKEND",
//     items: [
//       { name: "Node.js",    level: 60 },
//       { name: "Express.js", level: 60 },
//       { name: "MongoDB",    level: 75 },
//       { name: "REST APIs",  level: 65 },
//     ],
//   },
//   {
//     category: "TOOLS",
//     items: [
//       { name: "Git",     level: 80 },
//       { name: "Postman", level: 75 },
//     ],
//   },
// ];

// const SGPA = [
//   { sem: "Semester 1", score: 8.0, max: 10 },
//   { sem: "Semester 2", score: 7.4, max: 10 },
//   { sem: "Semester 3", score: 8.6, max: 10 },
// ];

// export default function About() {
//   const sectionRef   = useRef(null);
//   const canvasRef    = useRef(null);
//   const mouseRef     = useRef({ x: -9999, y: -9999 });

//   // ── Starfield (same as Hero) ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx    = canvas.getContext("2d");
//     let animationId;
//     let stars = [];

//     const REPEL_RADIUS = 60;
//     const REPEL_FORCE  = 25;
//     const RETURN_SPEED = 0.005;

//     const resize = () => {
//       canvas.width  = window.innerWidth;
//       canvas.height = canvas.parentElement.offsetHeight;
//     };

//     const createStars = () => {
//       stars = [];
//       for (let i = 0; i < 800; i++) {
//         const x = Math.random() * canvas.width;
//         const y = Math.random() * canvas.height;
//         stars.push({
//           originX: x, originY: y, x, y,
//           radius:       Math.random() * 1.2 + 0.1,
//           opacity:      Math.random(),
//           twinkleSpeed: Math.random() * 0.008 + 0.002,
//           twinkleDir:   Math.random() > 0.5 ? 1 : -1,
//           vx: 0, vy: 0,
//           driftX: (Math.random() - 0.5) * 0.15,
//           driftY: (Math.random() - 0.5) * 0.15,
//         });
//       }
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       const m = mouseRef.current;
//       stars.forEach((star) => {
//         star.opacity += star.twinkleSpeed * star.twinkleDir;
//         if (star.opacity >= 1)    { star.opacity = 1;    star.twinkleDir = -1; }
//         if (star.opacity <= 0.05) { star.opacity = 0.05; star.twinkleDir =  1; }

//         const dx = star.x - m.x;
//         const dy = star.y - m.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         if (dist < REPEL_RADIUS) {
//           const angle = Math.atan2(dy, dx);
//           const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
//           star.vx += Math.cos(angle) * force * REPEL_FORCE;
//           star.vy += Math.sin(angle) * force * REPEL_FORCE;
//         } else if (Math.abs(star.vx) > 0.01 || Math.abs(star.vy) > 0.01) {
//           star.vx += (star.originX - star.x) * RETURN_SPEED;
//           star.vy += (star.originY - star.y) * RETURN_SPEED;
//         } else {
//           star.vx = 0; star.vy = 0;
//           star.x += star.driftX;
//           star.y += star.driftY;
//           star.originX = star.x;
//           star.originY = star.y;
//         }

//         if (star.x < 0)              star.x = canvas.width;
//         if (star.x > canvas.width)   star.x = 0;
//         if (star.y < 0)              star.y = canvas.height;
//         if (star.y > canvas.height)  star.y = 0;

//         star.vx *= 0.88;
//         star.vy *= 0.88;
//         star.x  += star.vx;
//         star.y  += star.vy;

//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
//         ctx.fill();
//       });
//       animationId = requestAnimationFrame(draw);
//     };

//     const onMouseMove  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
//     const onMouseLeave = ()    => { mouseRef.current = { x: -9999, y: -9999 }; };
//     const onResize     = ()    => { resize(); createStars(); };

//     resize(); createStars(); draw();
//     window.addEventListener("mousemove",  onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);
//     window.addEventListener("resize",     onResize);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("mousemove",  onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       window.removeEventListener("resize",     onResize);
//     };
//   }, []);

//   // ── GSAP animations ──
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const ctx = gsap.context(() => {

//       // label
//       gsap.fromTo(".about-label",
//         { opacity: 0, y: -20 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
//           scrollTrigger: { trigger: ".about-label", start: "top 88%" } }
//       );

//       // heading
//       gsap.fromTo(".about-word",
//         { opacity: 0, y: 40, rotateX: -80, transformOrigin: "bottom" },
//         { opacity: 1, y: 0, rotateX: 0,
//           duration: 0.9, stagger: 0.1, ease: "power4.out",
//           scrollTrigger: { trigger: ".about-heading", start: "top 85%" } }
//       );

//       // bio
//       gsap.fromTo(".about-bio",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
//           scrollTrigger: { trigger: ".about-bio", start: "top 85%" } }
//       );

//       // stat cards + counters
//       STATS.forEach((stat, i) => {
//         gsap.fromTo(`.stat-card-${i}`,
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: "power3.out",
//             scrollTrigger: { trigger: `.stat-card-${i}`, start: "top 88%" } }
//         );

//         const el = document.querySelector(`.stat-val-${i}`);
//         if (!el) return;
//         ScrollTrigger.create({
//           trigger: el, start: "top 88%",
//           onEnter: () => {
//             gsap.fromTo({ val: 0 }, { val: stat.value }, {
//               duration: 2, ease: "power2.out",
//               onUpdate: function () {
//                 el.textContent = Math.round(this.targets()[0].val) + stat.suffix;
//               },
//             });
//           },
//         });
//       });

//       // skill columns
//       gsap.fromTo(".skill-col",
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
//           scrollTrigger: { trigger: ".skills-section", start: "top 82%" } }
//       );

//       // sgpa rows
//       gsap.fromTo(".sgpa-row",
//         { opacity: 0, x: -20 },
//         { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
//           scrollTrigger: { trigger: ".sgpa-section", start: "top 82%" } }
//       );

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   // hover bar fill
//   const handleSkillEnter = (e, level) => {
//     const bar = e.currentTarget.querySelector(".bar-fill");
//     const dot = e.currentTarget.querySelector(".bar-dot");
//     gsap.to(bar, { width: `${level}%`, duration: 0.8, ease: "power3.out" });
//     gsap.to(dot, { left: `${level}%`,  duration: 0.8, ease: "power3.out" });
//     gsap.to(e.currentTarget, { x: 4, duration: 0.2 });
//   };

//   const handleSkillLeave = (e) => {
//     const bar = e.currentTarget.querySelector(".bar-fill");
//     const dot = e.currentTarget.querySelector(".bar-dot");
//     gsap.to(bar, { width: "0%", duration: 0.5, ease: "power2.in" });
//     gsap.to(dot, { left: "0%", duration: 0.5, ease: "power2.in" });
//     gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
//   };

//   // sgpa hover
//   const handleSgpaEnter = (e, score) => {
//     const bar = e.currentTarget.querySelector(".sgpa-fill");
//     gsap.to(bar, { width: `${score * 10}%`, duration: 0.8, ease: "power3.out" });
//     gsap.to(e.currentTarget, { backgroundColor: "rgba(0,212,255,0.04)", duration: 0.2 });
//   };

//   const handleSgpaLeave = (e) => {
//     const bar = e.currentTarget.querySelector(".sgpa-fill");
//     gsap.to(bar, { width: "0%", duration: 0.5, ease: "power2.in" });
//     gsap.to(e.currentTarget, { backgroundColor: "transparent", duration: 0.2 });
//   };

//   return (
//     <section ref={sectionRef} style={s.section}>

//       {/* ── Starfield ── */}
//       <canvas ref={canvasRef} style={s.canvas} />

//       {/* subtle grid */}
//       <div style={s.grid} />

//       <div style={s.inner}>

//         {/* ── Label ── */}
//         <div className="about-label" style={{ ...s.label, opacity: 0 }}>
//           <span style={s.labelLine} />
//           <span style={s.labelText}>◈ &nbsp; 02 / ABOUT ME &nbsp; ◈</span>
//           <span style={s.labelLine} />
//         </div>

//         {/* ── Top row: heading + bio + stats ── */}
//         <div style={s.topRow}>

//           {/* Left: heading + bio */}
//           <div style={s.topLeft}>
//             <h2 className="about-heading" style={s.heading}>
//               {["The", "Dev", "Behind", "The", "Code."].map((w, i) => (
//                 <span key={i} className="about-word" style={{
//                   display: "inline-block",
//                   marginRight: "0.25em", opacity: 0,
//                   color: i === 1 || i === 4 ? "#4db8d4" : "#e6edf3",
//                 }}>
//                   {w}
//                 </span>
//               ))}
//             </h2>

//             <p className="about-bio" style={{ ...s.bio, opacity: 0 }}>
//               2nd year B.Tech CS student & freelance MERN developer.
//               Building real products while mastering DSA every day.
//             </p>

//             {/* online dot */}
//             <div style={s.onlineWrap}>
//               <span style={s.onlineDot} />
//               <span style={s.onlineText}>B.Tech 2nd Year &nbsp;·&nbsp; Freelancing</span>
//             </div>
//           </div>

//           {/* Right: stats */}
//           <div style={s.statsGrid}>
//             {STATS.map((stat, i) => (
//               <div key={i} className={`stat-card-${i}`}
//                 style={{ ...s.statCard, opacity: 0 }}
//                 onMouseEnter={e => gsap.to(e.currentTarget, { y: -4, borderColor: "#4db8d4", duration: 0.2 })}
//                 onMouseLeave={e => gsap.to(e.currentTarget, { y:  0, borderColor: "#1e2d3d", duration: 0.2 })}
//               >
//                 <span className={`stat-val-${i}`} style={s.statVal}>0</span>
//                 <span style={s.statLabel}>{stat.label}</span>
//               </div>
//             ))}
//           </div>

//         </div>

//         {/* ── Skills ── */}
//         <div className="skills-section" style={s.divider}>
//           <span style={s.dividerText}>// SKILLS</span>
//           <span style={s.dividerLine} />
//         </div>

//         <div style={s.skillsRow}>
//           {SKILLS.map((group, gi) => (
//             <div key={gi} className="skill-col" style={{ ...s.skillCol, opacity: 0 }}>
//               <p style={s.catLabel}>{group.category}</p>
//               {group.items.map((skill, si) => (
//                 <div key={si} style={s.skillRow}
//                   onMouseEnter={e => handleSkillEnter(e, skill.level)}
//                   onMouseLeave={e => handleSkillLeave(e)}
//                 >
//                   <div style={s.skillTop}>
//                     <span style={s.skillName}>{skill.name}</span>
//                     <span style={s.skillPct}>{skill.level}%</span>
//                   </div>
//                   <div style={s.barTrack}>
//                     <div className="bar-fill" style={s.barFill} />
//                     <div className="bar-dot"  style={s.barDot}  />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* ── SGPA ── */}
//         <div className="sgpa-section" style={{ ...s.divider, marginTop: "3rem" }}>
//           <span style={s.dividerText}>// ACADEMIC PERFORMANCE</span>
//           <span style={s.dividerLine} />
//         </div>

//         <div style={s.sgpaWrap}>
//           {SGPA.map((item, i) => (
//             <div key={i} className="sgpa-row"
//               style={{ ...s.sgpaRow, opacity: 0 }}
//               onMouseEnter={e => handleSgpaEnter(e, item.score)}
//               onMouseLeave={e => handleSgpaLeave(e)}
//             >
//               <span style={s.sgpaSem}>{item.sem}</span>

//               <div style={s.sgpaBarWrap}>
//                 <div style={s.sgpaTrack}>
//                   <div className="sgpa-fill" style={{
//                     ...s.sgpaFill,
//                     background: item.score >= 8.5
//                       ? "linear-gradient(to right, #00ff8844, #00ff88)"
//                       : item.score >= 8.0
//                       ? "linear-gradient(to right, #4db8d444, #4db8d4)"
//                       : "linear-gradient(to right, #7c3aed44, #7c3aed)",
//                   }} />
//                 </div>
//               </div>

//               <span style={{
//                 ...s.sgpaScore,
//                 color: item.score >= 8.5 ? "#00ff88"
//                      : item.score >= 8.0 ? "#4db8d4"
//                      : "#7c3aed",
//               }}>
//                 {item.score}
//               </span>

//               <span style={s.sgpaMax}>/ 10</span>
//             </div>
//           ))}
//         </div>

//       </div>

//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1;   box-shadow: 0 0 8px #00ff88; }
//           50%       { opacity: 0.4; box-shadow: 0 0 2px #00ff88; }
//         }
//       `}</style>

//     </section>
//   );
// }

// const s = {
//   section: {
//     position: "relative",
//     minHeight: "100vh",
//     background: "#060d14",
//     overflow: "hidden",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "120px 0",
//   },
//   canvas: {
//     position: "absolute", inset: 0,
//     zIndex: 0, pointerEvents: "none",
//   },
//   grid: {
//     position: "absolute", inset: 0, zIndex: 1,
//     backgroundImage: `
//       linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
//     `,
//     backgroundSize: "60px 60px",
//     pointerEvents: "none",
//   },
//   inner: {
//     position: "relative", zIndex: 2,
//     width: "100%", maxWidth: 1100,
//     padding: "0 6vw",
//   },

//   // label
//   label: {
//     display: "flex", alignItems: "center",
//     gap: "1rem", marginBottom: "3rem",
//   },
//   labelLine: {
//     flex: 1, maxWidth: 60, height: 1,
//     background: "linear-gradient(to right, transparent, #1e2d3d)",
//     display: "inline-block",
//   },
//   labelText: {
//     fontFamily: "monospace", fontSize: "0.68rem",
//     color: "#4db8d4", letterSpacing: "0.2em",
//   },

//   // top row
//   topRow: {
//     display: "flex", gap: "5vw",
//     alignItems: "flex-start", flexWrap: "wrap",
//     marginBottom: "4rem",
//   },
//   topLeft: { flex: 1, minWidth: 280 },

//   // heading
//   heading: {
//     fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
//     fontWeight: 800, lineHeight: 1.15,
//     marginBottom: "1.2rem",
//     fontFamily: "sans-serif", perspective: "800px",
//   },

//   // bio
//   bio: {
//     fontSize: "0.9rem", color: "#666",
//     lineHeight: 1.9, fontFamily: "sans-serif",
//     marginBottom: "1.2rem", maxWidth: 400,
//   },

//   // online
//   onlineWrap: {
//     display: "flex", alignItems: "center", gap: "0.6rem",
//   },
//   onlineDot: {
//     width: 7, height: 7, borderRadius: "50%",
//     background: "#00ff88", boxShadow: "0 0 8px #00ff88",
//     display: "inline-block", flexShrink: 0,
//     animation: "pulse 2s ease-in-out infinite",
//   },
//   onlineText: {
//     fontFamily: "monospace", fontSize: "0.68rem",
//     color: "#555", letterSpacing: "0.08em",
//   },

//   // stats
//   statsGrid: {
//     display: "grid", gridTemplateColumns: "1fr 1fr",
//     gap: "0.7rem", alignSelf: "flex-start",
//     minWidth: 220,
//   },
//   statCard: {
//     padding: "1rem 1.2rem",
//     border: "1px solid #1e2d3d",
//     background: "rgba(13,17,23,0.7)",
//     backdropFilter: "blur(8px)",
//     display: "flex", flexDirection: "column",
//     gap: "0.3rem", cursor: "default",
//   },
//   statVal: {
//     fontSize: "1.9rem", fontWeight: 800,
//     color: "#4db8d4", fontFamily: "sans-serif", lineHeight: 1,
//   },
//   statLabel: {
//     fontFamily: "monospace", fontSize: "0.6rem",
//     color: "#444", letterSpacing: "0.1em",
//   },

//   // divider
//   divider: {
//     display: "flex", alignItems: "center",
//     gap: "1rem", marginBottom: "1.5rem",
//   },
//   dividerText: {
//     fontFamily: "monospace", fontSize: "0.65rem",
//     color: "#4db8d4", letterSpacing: "0.2em",
//     whiteSpace: "nowrap",
//   },
//   dividerLine: {
//     flex: 1, height: 1,
//     background: "linear-gradient(to right, #1e2d3d, transparent)",
//     display: "inline-block",
//   },

//   // skills
//   skillsRow: {
//     display: "flex", gap: "3vw", flexWrap: "wrap",
//   },
//   skillCol: {
//     flex: 1, minWidth: 200,
//   },
//   catLabel: {
//     fontFamily: "monospace", fontSize: "0.65rem",
//     color: "#4db8d4", letterSpacing: "0.2em",
//     marginBottom: "1rem",
//   },
//   skillRow: {
//     marginBottom: "1rem", cursor: "default",
//     padding: "0.4rem 0",
//   },
//   skillTop: {
//     display: "flex", justifyContent: "space-between",
//     marginBottom: "0.3rem",
//   },
//   skillName: {
//     fontFamily: "monospace", fontSize: "0.7rem",
//     color: "#888",
//   },
//   skillPct: {
//     fontFamily: "monospace", fontSize: "0.65rem",
//     color: "#4db8d4",
//   },
//   barTrack: {
//     position: "relative", height: 2,
//     background: "#1e2d3d", borderRadius: 2,
//     overflow: "visible",
//   },
//   barFill: {
//     position: "absolute", top: 0, left: 0,
//     height: "100%", width: "0%",
//     background: "linear-gradient(to right, #4db8d444, #4db8d4)",
//     borderRadius: 2,
//   },
//   barDot: {
//     position: "absolute", top: "50%",
//     left: "0%",
//     transform: "translate(-50%, -50%)",
//     width: 7, height: 7, borderRadius: "50%",
//     background: "#4db8d4",
//     boxShadow: "0 0 8px #4db8d4",
//   },

//   // sgpa
//   sgpaWrap: {
//     display: "flex", flexDirection: "column",
//     gap: "0.4rem", maxWidth: 600,
//   },
//   sgpaRow: {
//     display: "grid",
//     gridTemplateColumns: "140px 1fr 60px 40px",
//     alignItems: "center", gap: "1rem",
//     padding: "0.8rem 1rem",
//     border: "1px solid #1e2d3d",
//     cursor: "default",
//     transition: "background 0.2s",
//   },
//   sgpaSem: {
//     fontFamily: "monospace", fontSize: "0.68rem",
//     color: "#888", letterSpacing: "0.05em",
//   },
//   sgpaBarWrap: { flex: 1 },
//   sgpaTrack: {
//     height: 2, background: "#1e2d3d",
//     borderRadius: 2, overflow: "hidden",
//   },
//   sgpaFill: {
//     height: "100%", width: "0%",
//     borderRadius: 2,
//   },
//   sgpaScore: {
//     fontFamily: "monospace", fontSize: "1.1rem",
//     fontWeight: 800, textAlign: "right",
//   },
//   sgpaMax: {
//     fontFamily: "monospace", fontSize: "0.6rem",
//     color: "#333",
//   },
// };
