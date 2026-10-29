"use client";

import Link from "next/link";
import { TaleForm } from "./components/TaleForm";
import "./create.css";

export default function CreatePage() {
  return (
    <div className="create-page">
      {/* ==== Կախարդական ֆոնային շերտեր ==== */}
      <div className="aurora" aria-hidden="true" />
      <div className="stars stars--far"  aria-hidden="true" />
      <div className="stars stars--mid"  aria-hidden="true" />
      <div className="stars stars--near" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />
      <div className="moon-halo" aria-hidden="true" />

      {/* ==== Թռչող կրակներ (Fireflies) ==== */}
      <span className="firefly" /><span className="firefly" />
      <span className="firefly" /><span className="firefly" />
      <span className="firefly" /><span className="firefly" />
      <span className="firefly" /><span className="firefly" />

      {/* ==== Մոգական փոշու մասնիկներ (Magic Dust) ==== */}
      <div className="magic-dust" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <span key={i} className={`dust dust-${(i % 4) + 1}`} />
        ))}
      </div>

      {/* ==== Back to Home ==== */}
      <Link href="/" className="back-link">
        ← Back to Lumen Tales
      </Link>

      {/* ==== Հիմնական բովանդակություն ==== */}
      <main className="create-main">
        <h1 className="create-title">
          <span>Weave Your Tale</span>
        </h1>
        <p className="create-subtitle">
          Fill the pages with your imagination. Every great story begins with a single word.
        </p>

        <TaleForm />
      </main>
    </div>
  );
}