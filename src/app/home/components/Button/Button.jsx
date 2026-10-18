"use client";
import { useRouter } from "next/navigation";
import "./Button.css";

export const CreateButton = ({ text = "Begin Your Tale" }) => {
  const router = useRouter();

  return (
    <button
      className="btn-magic"
      type="button"
      onClick={() => router.push("/create")}
    >
      {text}
    </button>
  );
};