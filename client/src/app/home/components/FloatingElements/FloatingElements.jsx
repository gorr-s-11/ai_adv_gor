"use client";
import "./FloatingElements.css";

const BUTTERFLIES = [
  { top: "20%", left: "10%", delay: "-1s", duration: "18s" },
  { top: "60%", left: "85%", delay: "-7s", duration: "22s" },
  { top: "45%", left: "30%", delay: "-4s", duration: "20s" },
];

const BALLOONS = [
  { top: "15%", left: "75%", color: "#ff6bd6", delay: "-2s" },
  { top: "35%", left: "8%",  color: "#4ee5c8", delay: "-6s" },
  { top: "70%", left: "50%", color: "#ffc93c", delay: "-10s" },
  { top: "25%", left: "40%", color: "#b06aff", delay: "-14s" },
];

const LEAVES = [
  { top: "5%",  left: "20%", delay: "0s" },
  { top: "5%",  left: "55%", delay: "-3s" },
  { top: "5%",  left: "78%", delay: "-6s" },
  { top: "5%",  left: "35%", delay: "-9s" },
  { top: "5%",  left: "65%", delay: "-12s" },
];

export const FloatingElements = () => {
  return (
    <div className="floating-layer" aria-hidden="true">
      {/* Butterflies */}
      {BUTTERFLIES.map((b, i) => (
        <span
          key={`bf-${i}`}
          className="butterfly"
          style={{ top: b.top, left: b.left, animationDelay: b.delay, animationDuration: b.duration }}
        >
          🦋
        </span>
      ))}

      {/* Balloons */}
      {BALLOONS.map((b, i) => (
        <div
          key={`bl-${i}`}
          className="balloon"
          style={{ top: b.top, left: b.left, animationDelay: b.delay, "--balloon-color": b.color }}
        >
          <span className="balloon-body" />
          <span className="balloon-string" />
        </div>
      ))}

      {/* Falling leaves */}
      {LEAVES.map((l, i) => (
        <span
          key={`lf-${i}`}
          className="leaf"
          style={{ left: l.left, animationDelay: l.delay }}
        >
          🍃
        </span>
      ))}

      {/* Shooting star */}
      <span className="shooting-star" />
      <span className="shooting-star shooting-star--2" />
    </div>
  );
};