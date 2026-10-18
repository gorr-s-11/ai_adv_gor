"use client";

import { useState } from "react";
import Link from "next/link";
import { TaleForm } from "./components/TaleForm";
import "./create.css";

export default function CreatePage() {
  return (
    <div className="create-page">
      {/* ==== Ambient Sky ==== */}
      <div className="aurora" aria-hidden="true" />
      <div className="stars stars--far"  aria-hidden="true" />
      <div className="stars stars--mid"  aria-hidden="true" />
      <div className="stars stars--near" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />
      <div className="moon-halo" aria-hidden="true" />

      {/* ==== Fireflies ==== */}
      <span className="firefly" /><span className="firefly" />
      <span className="firefly" /><span className="firefly" />
      <span className="firefly" /><span className="firefly" />

      {/* ==== Back to Home ==== */}
      <Link href="/" className="back-link">
        ← Back to Lumen Tales
      </Link>

      {/* ==== Main Content ==== */}
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