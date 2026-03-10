import React, { useEffect, useState } from "react";

export default function TypewriterText({ text, speed = 80, className = "" }) {
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setTypedText("");
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {typedText}
      <span
        className="inline-block w-[0.6em] h-[1em] bg-[#D14D28] ml-0.5 align-middle"
        style={{ animation: "blink 1s infinite", fontFamily: "Geist Mono, monospace" }}
      />
    </span>
  );
}
