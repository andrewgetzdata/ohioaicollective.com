import React, { useRef, useEffect, useState } from "react";

export default function RunningMan() {
  const svgRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
      setIsIdle(false);

      // Reset idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !isVisible) return;
    const paths = svgRef.current.querySelectorAll("path, line, circle, polyline");
    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = Math.max(0, length * (1 - scrollProgress * 2));
    });
  }, [scrollProgress, isVisible]);

  const translateY = 10 + scrollProgress * 60; // vh units
  const breathe = isIdle ? "animate-pulse" : "";

  return (
    <div
      className={`fixed right-8 z-40 transition-all duration-500 hidden md:block ${breathe}`}
      style={{
        top: `${translateY}vh`,
        opacity: isVisible ? 0.7 : 0,
        pointerEvents: "none",
      }}
    >
      <svg
        ref={svgRef}
        width="60"
        height="120"
        viewBox="0 0 60 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle cx="30" cy="12" r="8" stroke="#D14D28" strokeWidth="2" />
        {/* Body */}
        <line x1="30" y1="20" x2="30" y2="55" stroke="#D14D28" strokeWidth="2" />
        {/* Left arm (carrying circuit board) */}
        <polyline points="30,30 15,42 10,38" stroke="#D14D28" strokeWidth="2" fill="none" />
        {/* Right arm */}
        <polyline points="30,30 48,25 52,30" stroke="#D14D28" strokeWidth="2" fill="none" />
        {/* Left leg */}
        <polyline points="30,55 18,75 10,95" stroke="#D14D28" strokeWidth="2" fill="none" />
        {/* Right leg */}
        <polyline points="30,55 42,78 50,95" stroke="#D14D28" strokeWidth="2" fill="none" />
        {/* Circuit board in left hand */}
        <rect x="2" y="30" width="12" height="10" stroke="#D14D28" strokeWidth="1.5" rx="0" />
        <line x1="5" y1="33" x2="11" y2="33" stroke="#D14D28" strokeWidth="1" />
        <line x1="5" y1="36" x2="9" y2="36" stroke="#D14D28" strokeWidth="1" />
        <circle cx="11" cy="36" r="1" stroke="#D14D28" strokeWidth="1" />
      </svg>
    </div>
  );
}
