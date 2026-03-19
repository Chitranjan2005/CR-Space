"use client";
import { useRef, useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function MusicPlayer() {
  const audioRef     = useRef(null);
  const ripple1Ref   = useRef(null);
  const ripple2Ref   = useRef(null);
  const ripple3Ref   = useRef(null);
  const iconRef      = useRef(null);
  const [playing, setPlaying] = useState(false);

  // ── Ripple animation when playing ──
  useEffect(() => {
    if (playing) {
      [ripple1Ref, ripple2Ref, ripple3Ref].forEach((ref, i) => {
        gsap.fromTo(ref.current,
          { scale: 1, opacity: 0.6 },
          {
            scale: 2.5,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            repeat: -1,
            delay: i * 0.6,
          }
        );
      });
      gsap.to(iconRef.current, {
        rotate: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });
    } else {
      [ripple1Ref, ripple2Ref, ripple3Ref].forEach((ref) => {
        gsap.killTweensOf(ref.current);
        gsap.set(ref.current, { scale: 1, opacity: 0 });
      });
      gsap.killTweensOf(iconRef.current);
      gsap.to(iconRef.current, { rotate: 0, duration: 0.5 });
    }
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <div style={s.wrap}>
      <audio ref={audioRef} src="/interstellar.mp3" loop />

      {/* Ripple rings */}
      <div ref={ripple1Ref} style={{ ...s.ripple, opacity: 0 }} />
      <div ref={ripple2Ref} style={{ ...s.ripple, opacity: 0 }} />
      <div ref={ripple3Ref} style={{ ...s.ripple, opacity: 0 }} />

      {/* Button */}
      <button
        onClick={toggle}
        style={s.btn}
        title={playing ? "Pause Music" : "Play Interstellar OST"}
        onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
        onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
      >
        {/* Vinyl icon */}
        <div ref={iconRef} style={s.vinyl}>
          <div style={s.vinylInner} />
        </div>

        {/* Sound bars when playing */}
        {playing ? (
          <div style={s.bars}>
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} style={{
                ...s.bar,
                animationDelay: `${i * 0.15}s`,
              }} />
            ))}
          </div>
        ) : (
          <span style={s.playIcon}>♪</span>
        )}
      </button>

      {/* Label */}
      <span style={{
        ...s.label,
        opacity: playing ? 1 : 0.4,
        color: playing ? "#4db8d4" : "#888",
      }}>
        {playing ? "INTERSTELLAR OST" : "PLAY MUSIC"}
      </span>

      <style>{`
        @keyframes barBounce {
          0%, 100% { height: 4px; }
          50%       { height: 16px; }
        }
      `}</style>
    </div>
  );
}

const s = {
  wrap: {
    position: "absolute",
    bottom: 32,
    left: 48,
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    zIndex: 20,
  },
  ripple: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid #4db8d4",
    pointerEvents: "none",
  },
  btn: {
    position: "relative",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid #4db8d4",
    background: "rgba(6,13,20,0.8)",
    backdropFilter: "blur(10px)",
    cursor: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    flexShrink: 0,
  },
  vinyl: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "2px solid #4db8d4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
  },
  vinylInner: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4db8d4",
  },
  bars: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    height: 20,
    position: "absolute",
  },
  bar: {
    width: 3,
    height: 4,
    background: "#4db8d4",
    borderRadius: 2,
    animation: "barBounce 0.8s ease-in-out infinite",
  },
  playIcon: {
    color: "#4db8d4",
    fontSize: "1rem",
    position: "absolute",
  },
  label: {
    fontFamily: "monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    transition: "color 0.3s, opacity 0.3s",
    whiteSpace: "nowrap",
  },
};
