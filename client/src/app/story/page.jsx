"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./story.css";

export default function StoryPage() {
  const router = useRouter();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const saved = sessionStorage.getItem("currentStory");
    if (saved) {
      setStory(JSON.parse(saved));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!story) {
    return (
      <div className="loading-screen">
        <h2>✨ Opening the book...</h2>
      </div>
    );
  }

  const title = story.title || `The Tale of ${story.characterName || "a Hero"}`;
  const pages = story.pages || []; 

  if (pages.length === 0) {
    return (
      <div className="story-page">
        <Link href="/" className="back-link">← Back to Home</Link>
        <div className="magic-book" style={{ padding: '40px', color: '#000' }}>
          <pre>{JSON.stringify(story, null, 2)}</pre>
        </div>
      </div>
    );
  }

  const currentText = pages[currentPage] || "";

  return (
    <div className="story-page">
      <Link href="/" className="back-link">
        ← Back to Home
      </Link>

      <main className="story-container">
        <div className="magic-book">
          <div className="book-cover">
            <h1 className="story-title">{title}</h1>
            <p className="story-meta">
              Page {currentPage + 1} of {pages.length}
            </p>
          </div>

          <div className="book-pages">
            {currentText.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="book-controls">
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              ← Previous
            </button>
            <span className="page-indicator">
              {currentPage + 1} / {pages.length}
            </span>
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
              disabled={currentPage === pages.length - 1}
            >
              Next →
            </button>
          </div>
        </div>

        <button onClick={() => router.push("/create")} className="btn-magic" style={{ marginTop: "30px" }}>
          🪄 Write Another Tale
        </button>
      </main>
    </div>
  );
}