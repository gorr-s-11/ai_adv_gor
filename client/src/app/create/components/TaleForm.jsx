"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStory } from "@/services/api";
import "./TaleForm.css";

const GENRES = [
  "Fantasy", "Sci-Fi", "Mystery", "Romance", "Adventure",
  "Horror", "Fairy Tale", "Mythology", "Steampunk", "Cyberpunk",
];

const STEPS = [
  { id: 1, title: "Character", icon: "🧙" },
  { id: 2, title: "Genre", icon: "📚" },
  { id: 3, title: "World", icon: "🌍" },
  { id: 4, title: "Story", icon: "✍️" },
  { id: 5, title: "Pages", icon: "📄" },
];

export const TaleForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ steps-ը սկսվում է դատարկ վիճակից
  const [formData, setFormData] = useState({
    characterName: "",
    genre: "",
    world: "",
    description: "", 
    steps: "" 
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // ✅ Հեռացրինք 4-րդ քայլի նախնական ստուգումը
    setError(""); 
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const prevStep = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  async function handleSubmit(event) {
    if (event) event.preventDefault();

    // Վերջնական ստուգում
    if (!formData.characterName || !formData.genre) {
      setError("Please fill in the character name and genre!");
      return;
    }

    if (!formData.steps || formData.steps < 1) {
      setError("Please enter a valid number of pages.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const storyData = {
        characterName: formData.characterName,
        genre: formData.genre,
        world: formData.world,
        description: formData.description, 
        steps: parseInt(formData.steps, 10),
      };

      const generated = await createStory(storyData);
      
      // 1. Պահում ենք ընթացիկ պատմությունը
      sessionStorage.setItem("currentStory", JSON.stringify(generated));

      // 2. Ավելացնում ենք ընդհանուր ցանկին (localStorage)
      const existingStories = JSON.parse(localStorage.getItem("my_stories") || "[]");
      const newStory = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...generated,
        characterName: formData.characterName,
        genre: formData.genre,
        world: formData.world,
      };
      
      localStorage.setItem("my_stories", JSON.stringify([newStory, ...existingStories]));

      // Անցնում ենք /story էջ
      router.push("/story");
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while creating the story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="tale-form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault();
        }
      }}
    >
      <div className="step-track">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`step-item ${step === s.id ? "active" : ""} ${
              step > s.id ? "completed" : ""
            }`}
            onClick={() => step > s.id && setStep(s.id)}
          >
            <div className="step-circle">
              {step > s.id ? "✓" : s.icon}
            </div>
            <span className="step-label">{s.title}</span>
          </div>
        ))}
        <div
          className="step-progress"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>

      {error && (
        <div style={{ color: "#ff5e9c", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
          {error}
        </div>
      )}

      <div className="form-body">
        {step === 1 && (
          <div className="form-step">
            <label className="form-label">What is your hero&apos;s name?</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Aria the Starweaver"
              value={formData.characterName}
              onChange={(e) => handleChange("characterName", e.target.value)}
              autoFocus
            />
            <p className="form-hint">✨ A name holds magic. Choose wisely.</p>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <label className="form-label">Which genre calls to you?</label>
            <div className="genre-grid">
              {GENRES.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`genre-chip ${formData.genre === g ? "selected" : ""}`}
                  onClick={() => handleChange("genre", g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <label className="form-label">Describe your world</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Floating islands above a sea of stars"
              value={formData.world}
              onChange={(e) => handleChange("world", e.target.value)}
            />
            <p className="form-hint">🌌 Where does your tale unfold?</p>
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <label className="form-label">Tell a glimpse of the story</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Once upon a time..."
              rows={5}
              value={formData.description} 
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <p className="form-hint">📖 Take your time. Every word matters.</p>
          </div>
        )}

        {step === 5 && (
          <div className="form-step">
            <label className="form-label">How many pages?</label>
            <input
              type="number"
              min="1"
              max="50"
              className="form-input"
              placeholder="e.g. 5"
              value={formData.steps}
              onChange={(e) => handleChange("steps", parseInt(e.target.value, 10) || "")}
              autoFocus
            />
            <p className="form-hint">📄 Choose the length of your magical tale.</p>
          </div>
        )}
      </div>

      <div className="form-nav">
        {step > 1 && (
          <button type="button" className="btn-secondary" onClick={prevStep} disabled={loading}>
            ← Back
          </button>
        )}

        {step < STEPS.length ? (
          <button
            type="button"
            className="btn-next"
            onClick={nextStep}
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            className={`btn-submit ${loading ? "is-loading" : ""}`}
            disabled={loading}
          >
            {loading ? "✨ Crafting your tale…" : "🪄 Begin the Story"}
          </button>
        )}
      </div>
    </form>
  );
};