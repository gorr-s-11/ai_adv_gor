"use client";
import { useState } from "react";
import "./ActionBar.css";

export const ActionBar = ({ onRandomTale, onDailyGift }) => {
  const [giftOpened, setGiftOpened] = useState(false);

  const handleGift = () => {
    setGiftOpened(true);
    onDailyGift?.();
    setTimeout(() => setGiftOpened(false), 3000);
  };

  return (
    <div className="action-bar">
      <button
        className="action-btn action-btn--purple"
        type="button"
        onClick={onRandomTale}
      >
        <span className="action-icon">🎲</span>
        <span>Random Tale</span>
      </button>

      <button
        className={`action-btn action-btn--gold ${giftOpened ? "is-open" : ""}`}
        type="button"
        onClick={handleGift}
      >
        <span className="action-icon">{giftOpened ? "✨" : "🎁"}</span>
        <span>{giftOpened ? "Opened!" : "Daily Gift"}</span>
        <span className="gift-shine" aria-hidden="true" />
      </button>

      <button
        className="action-btn action-btn--mint"
        type="button"
        onClick={() => alert("Welcome to the community! 🌟")}
      >
        <span className="action-icon">👥</span>
        <span>Join Community</span>
      </button>

      <button
        className="action-btn action-btn--pink"
        type="button"
        onClick={() => alert("Trailer coming soon! 🎬")}
      >
        <span className="action-icon">🎬</span>
        <span>Watch Trailer</span>
      </button>
    </div>
  );
};