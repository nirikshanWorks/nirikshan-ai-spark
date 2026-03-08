import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  loop?: boolean;
  pauseMs?: number;
}

export function TypingText({ text, speed = 80, loop = true, pauseMs = 2000 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting && idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, idx + 1));
        setIdx(idx + 1);
      }, speed);
      return () => clearTimeout(t);
    }
    if (!deleting && idx === text.length) {
      if (!loop) return;
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && idx > 0) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, idx - 1));
        setIdx(idx - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && idx === 0) {
      setDeleting(false);
    }
  }, [idx, deleting, text, speed, loop, pauseMs]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
