"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./adventures.css"; 

export default function AdventuresPage() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Կարդում ենք պահված պատմությունները localStorage-ից
    const saved = JSON.parse(localStorage.getItem("my_stories") || "[]");
    setStories(saved);
  }, []);

  const handleRead = (story) => {
    // Երբ սեղմում ենք "Read", պատմությունը դնում ենք sessionStorage-ի մեջ,
    // որպեսզի /story էջը կարողանա կարդալ այն
    sessionStorage.setItem("currentStory", JSON.stringify(story));
  };

  return (
    <div className="adventures-page">
      <div className="adventures-header">
        <Link href="/" className="back-home">← Back to Home</Link>
        <h1 className="page-title">My Adventures</h1>
        <p className="page-subtitle">All the magical tales you have woven so far.</p>
      </div>

      {stories.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📖</span>
          <h2>No tales yet.</h2>
          <p>Your book of adventures is empty. Start writing your first story!</p>
          <Link href="/create" className="btn-magic">🪄 Begin Your First Tale</Link>
        </div>
      ) : (
        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="card-cover">
                <h3>{story.title}</h3>
                <span className="card-genre">{story.genre}</span>
              </div>
              <div className="card-body">
                <p className="card-hero">🧙 Hero: {story.characterName}</p>
                <p className="card-world">🌍 World: {story.world || "Unknown"}</p>
                <p className="card-date">
                  {new Date(story.createdAt).toLocaleDateString()}
                </p>
                <Link 
                  href="/story" 
                  onClick={() => handleRead(story)} 
                  className="read-btn"
                >
                  Read Tale →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}