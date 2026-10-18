"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./TaleForm.css";

const GENRES = [
  "Fantasy", "Sci-Fi", "Mystery", "Romance", "Adventure",
  "Horror", "Fairy Tale", "Mythology", "Steampunk", "Cyberpunk",
];

const STEPS = [
  { id: 1, title: "Character", icon: "🧙" },
  { id: 2, title: "Genre",     icon: "📚" },
  { id: 3, title: "World",     icon: "🌍" },
  { id: 4, title: "Story",     icon: "✍️" },
];

export const TaleForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ՄԻԱՅՆ 4 դաշտ
  const [formData, setFormData] = useState({
    characterName: "",
    genre: "",
    world: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    // Եթե կանչվում է form-ի submit-ից, կանխում ենք էջի reload-ը
    if (e && e.preventDefault) e.preventDefault();
    
    // Վալիդացիա
    if (!formData.characterName || !formData.genre) {
      alert("Please fill in at least the character name and genre!");
      return;
    }

    setIsSubmitting(true);

    // Պահպանում ենք localStorage-ում
    try {
      const existing = JSON.parse(localStorage.getItem("lumen_tales") || "[]");
      localStorage.setItem(
        "lumen_tales",
        JSON.stringify([
          ...existing,
          { ...formData, id: Date.now(), createdAt: new Date().toISOString() },
        ])
      );
    } catch (err) {
      console.error(err);
    }

    // Փոքր ուշացում գեղեցիկ loading-ի համար, ապա վերադարձ գլխավոր էջ
    setTimeout(() => {
      router.push("/");
    }, 1600);
  };

  return (
    <form
      className="tale-form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        // Թույլ ենք տալիս Enter-ին աշխատել ՄԻԱՅՆ textarea-ում (նոր տողի համար)
        // Մնացած բոլոր դեպքերում արգելում ենք submit-ը
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault();
        }
      }}
    >
      {/* ===== Քայլերի ցուցիչ ===== */}
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

      {/* ===== Քայլերի բովանդակություն ===== */}
      <div className="form-body">
        {step === 1 && (
          <div className="form-step">
            <label className="form-label">What is your hero's name?</label>
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
            <label className="form-label">Number of page</label>
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
      </div>

      {/* ===== Նավիգացիոն կոճակներ ===== */}
      <div className="form-nav">
        {step > 1 && (
          <button type="button" className="btn-secondary" onClick={prevStep}>
            ← Back
          </button>
        )}

        {step < STEPS.length ? (
          <button
            type="button"
            className="btn-next"
            onClick={nextStep}
            disabled={
              // Հուշում. կարող ես պարտադիր դարձնել քայլերը
              // (step === 1 && !formData.characterName) ||
              // (step === 2 && !formData.genre)
              false
            }
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            className={`btn-submit ${isSubmitting ? "is-loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "✨ Crafting your tale…" : "🪄 Begin the Story"}
          </button>
        )}
      </div>
    </form>
  );
};