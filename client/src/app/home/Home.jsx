"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import { CreateButton } from "./components/Button/Button";
import { Sparkles } from "./components/Sparkles/Sparkles";
import { FloatingElements } from "./components/FloatingElements/FloatingElements";
import "./home.css";

export const Home = () => {
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [cursorTrail, setCursorTrail] = useState([]);

  /* ============================================================
     CURSOR MAGIC DUST — leaves a glowing trail behind the mouse
     ============================================================ */
  useEffect(() => {
    const handleMove = (e) => {
      const id = Date.now() + Math.random();
      setCursorTrail((prev) => [
        ...prev.slice(-15),
        { id, x: e.clientX, y: e.clientY },
      ]);
      setTimeout(() => {
        setCursorTrail((prev) => prev.filter((p) => p.id !== id));
      }, 800);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleBeginTale = () => {
    // Երբ սեղմում ենք "Begin Your Tale", սկսվում է հրավառությունը
    setSparkleTrigger((p) => p + 1);
  };

  return (
    <div className="page">
      {/* ============================================================
          AMBIENT SKY LAYERS
          ============================================================ */}
      <div className="aurora" aria-hidden="true" />
      <div className="stars stars--far"  aria-hidden="true" />
      <div className="stars stars--mid"  aria-hidden="true" />
      <div className="stars stars--near" aria-hidden="true" />

      {/* ============================================================
          GLOWING MOON + HALO
          ============================================================ */}
      <div className="moon" aria-hidden="true" />
      <div className="moon-halo" aria-hidden="true" />

      {/* ============================================================
          FIREFLIES
          ============================================================ */}
      <span className="firefly" aria-hidden="true" />
      <span className="firefly" aria-hidden="true" />
      <span className="firefly" aria-hidden="true" />
      <span className="firefly" aria-hidden="true" />
      <span className="firefly" aria-hidden="true" />
      <span className="firefly" aria-hidden="true" />

      {/* ============================================================
          FLOATING ELEMENTS — butterflies, balloons, leaves, shooting stars
          ============================================================ */}
      <FloatingElements />

      {/* ============================================================
          FLOATING ISLANDS
          ============================================================ */}
      <div className="island island--1" aria-hidden="true">
        <svg viewBox="0 0 220 100" fill="none">
          <path
            d="M20 60 Q110 20 200 60 Q150 95 110 90 Q70 95 20 60 Z"
            fill="#2a0a5a"
            stroke="#8a4fd6"
            strokeWidth="2"
          />
          <circle cx="150" cy="45" r="6" fill="#4ee5c8" opacity="0.9" />
          <circle cx="80"  cy="50" r="4" fill="#ffc93c" opacity="0.9" />
        </svg>
      </div>

      <div className="island island--2" aria-hidden="true">
        <svg viewBox="0 0 300 120" fill="none">
          <path
            d="M20 70 Q150 20 280 70 Q200 115 150 108 Q100 115 20 70 Z"
            fill="#1f0a4a"
            stroke="#b06aff"
            strokeWidth="2"
          />
          <circle cx="220" cy="50" r="8" fill="#ff6bd6" opacity="0.85" />
          <circle cx="100" cy="55" r="5" fill="#4ee5c8" opacity="0.85" />
          <circle cx="160" cy="40" r="4" fill="#ffc93c" opacity="0.9" />
        </svg>
      </div>

      <div className="island island--3" aria-hidden="true">
        <svg viewBox="0 0 180 90" fill="none">
          <path
            d="M15 55 Q90 18 165 55 Q120 88 90 82 Q60 88 15 55 Z"
            fill="#2a0a5a"
            stroke="#8a4fd6"
            strokeWidth="2"
          />
          <circle cx="120" cy="42" r="5" fill="#ffc93c" opacity="0.9" />
        </svg>
      </div>

      {/* ============================================================
          HEADER
          ============================================================ */}
      <Header />

      {/* ============================================================
          HERO
          ============================================================ */}
      <main className="hero">
        <h1 className="hero-title">
          <span>Once Upon a Time…</span>
        </h1>

        <p className="hero-text">
          A thousand worlds, a million stories — all waiting in the light of the
          moon. Turn the page and begin your own tale.
        </p>

        {/* Միակ գլխավոր կոճակը */}
        <CreateButton text="Begin Your Tale" onClick={handleBeginTale} />

        {/* ============================================================
            FLOATING OPEN BOOK + FLYING PAGES
            ============================================================ */}
        <div className="book-wrap" aria-hidden="true">
          <div className="flying-page" />
          <div className="flying-page" />
          <div className="flying-page" />

          <div className="book">
            <div className="book-page book-page--left">
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>

            <div className="book-spine" />

            <div className="book-page book-page--right">
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================
          HORIZON CLOUDS
          ============================================================ */}
      <div className="clouds" aria-hidden="true" />

      {/* ============================================================
          FIREWORK / SPARKLE LAYER
          ============================================================ */}
      <Sparkles trigger={sparkleTrigger} />

      {/* ============================================================
          CURSOR MAGIC DUST TRAIL
          ============================================================ */}
      <div className="cursor-trail" aria-hidden="true">
        {cursorTrail.map((p, i) => (
          <span
            key={p.id}
            className="cursor-dot"
            style={{
              left: p.x,
              top: p.y,
              opacity: i / Math.max(cursorTrail.length, 1),
            }}
          />
        ))}
      </div>
    </div>
  );
};