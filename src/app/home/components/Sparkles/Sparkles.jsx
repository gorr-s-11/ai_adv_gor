"use client";
import { useEffect, useState } from "react";
import "./Sparkles.css";

const COLORS = ["#ffe9a8", "#b06aff", "#ff6bd6", "#4ee5c8", "#ffc93c", "#fff"];

export const Sparkles = ({ trigger }) => {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const newBurst = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // %
      y: Math.random() * 50 + 20, // %
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 1500);
  }, [trigger]);

  return (
    <div className="sparkles-layer" aria-hidden="true">
      {bursts.map((b) => (
        <div
          key={b.id}
          className="sparkle-burst"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            "--sparkle-color": b.color,
          }}
        >
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="sparkle-dot"
              style={{ "--angle": `${i * 30}deg` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};