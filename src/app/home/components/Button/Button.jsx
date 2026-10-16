"use client";
import { useState } from "react";
import "./Button.css";

export const CreateButton = ({ text = "Begin Your Tale" }) => {
  const [on, setOn] = useState(false);

  return (
    <button
      className="btn-magic"
      type="button"
      onClick={() => setOn((p) => !p)}
    >
      {on ? "✦ Story Begins ✦" : text}
    </button>
  );
};