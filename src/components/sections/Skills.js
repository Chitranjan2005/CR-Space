// "use client";
// import { useRef, useEffect } from "react";

// export default function Hero() {
//   const canvasRef = useRef(null);
//   const mouseRef = useRef({ x: -9999, y: -9999 }); // off screen by default

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let animationId;
//     let stars = [];

//     const REPEL_RADIUS = 70;   // how far cursor pushes stars
//     const REPEL_FORCE  = 20;     // how strong the push is
//     const RETURN_SPEED = 0.01;  // how fast stars float back

//     const resize = () => {
//       canvas.width  = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
    

//     const createStars = () => {
//       stars = [];
//       for (let i = 0; i < 1000; i++) {
//         const x = Math.random() * canvas.width;
//         const y = Math.random() * canvas.height;
//         stars.push({
//           // original home position
//           originX: x,
//           originY: y,
//           // current position (moves when repelled)
//           x,
//           y,
//           radius:     Math.random() * 1.4 + 0.2,
//           opacity:    Math.random(),
//           // twinkle — each star has its own random speed + phase
//           twinkleSpeed: Math.random() * 0.008 + 0.03,
//           twinkleDir:   Math.random() > 0.5 ? 1 : -1,
//           // repel state
//           vx: 20,  // velocity x
//           vy: 20,  // velocity y
          
//         });
//       }
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       const mouse = mouseRef.current;

//       stars.forEach((star) => {

//         // ── 1. Random twinkling ──
//         star.opacity += star.twinkleSpeed * star.twinkleDir;
//         if (star.opacity >= 1)    { star.opacity = 1;    star.twinkleDir = -1; }
//         if (star.opacity <= 0.05) { star.opacity = 0.05; star.twinkleDir =  1; }

//         // ── 2. Cursor repel ──
//         const dx       = star.x - mouse.x;
//         const dy       = star.y - mouse.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance < REPEL_RADIUS) {
//           // push star away from cursor
//           const angle = Math.atan2(dy, dx);
//           const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
//           star.vx += Math.cos(angle) * force * REPEL_FORCE;
//           star.vy += Math.sin(angle) * force * REPEL_FORCE;
//         }

//         // ── 3. Return to home position ──
//         const homeX = star.originX - star.x;
//         const homeY = star.originY - star.y;
//         star.vx += homeX * RETURN_SPEED;
//         star.vy += homeY * RETURN_SPEED;

//         // ── 4. Apply friction so it doesn't bounce forever ──
//         star.vx *= 0.88;
//         star.vy *= 0.88;

//         // ── 5. Move star ──
//         star.x += star.vx;
//         star.y += star.vy;

//         // ── 6. Draw ──
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
//         ctx.fill();
//       });

//       animationId = requestAnimationFrame(draw);
//     };

//     // ── Mouse tracking ──
//     const onMouseMove = (e) => {
//       mouseRef.current = { x: e.clientX, y: e.clientY };
//     };
//     const onMouseLeave = () => {
//       // push cursor off screen so stars return home
//       mouseRef.current = { x: -9999, y: -9999 };
//     };

//     resize();
//     createStars();
//     draw();

//     window.addEventListener("mousemove",  onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);
//     window.addEventListener("resize", () => { resize(); createStars(); });

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("mousemove",  onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       window.removeEventListener("resize",     resize);
//     };
//   }, []);

//   return (
//     <section style={styles.section}>
//       <canvas ref={canvasRef} style={styles.canvas} />

//       <div style={styles.center}>
//         <h1 style={styles.temp}>SKILLS</h1>
//       </div>
//     </section>
//   );
// }

// const styles = {
//   section: {
//     position: "relative",
//     height: "100vh",
//     overflow: "hidden",
//     background: "#060d14",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   canvas: {
//     position: "absolute",
//     inset: 0,
//     zIndex: 0,
//     pointerEvents: "none",
//   },
//   center: {
//     position: "relative",
//     zIndex: 2,
//   },
//   temp: {
//     color: "white",
//     fontFamily: "sans-serif",
//     fontSize: "3rem",
//   },
// };
