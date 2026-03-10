import React, { useEffect, useRef } from "react";

export default function HeroAmbient() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chars = ['.', ' ', ':', '+', '-', '=', 'X'];

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const cellSize = 14;
    const cols = Math.ceil(canvas.width / cellSize) + 50;
    const rows = Math.ceil(canvas.height / cellSize);

    let time = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      ctx.fillStyle = '#F7F7F2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${cellSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize - (time * scrollSpeed % (cols * cellSize));
          const y = row * cellSize;

          if (x < -cellSize * 2 || x > canvas.width + cellSize * 2) continue;

          // Create fire-like pattern with turbulence
          const noise1 = Math.sin((row * 0.15) + (col * 0.08) + time * 0.02) * 3;
          const noise2 = Math.cos((row * 0.12) + (col * 0.1) - time * 0.025) * 2.5;
          const noise3 = Math.sin((row + col) * 0.06 + time * 0.03) * 2;
          const flicker = Math.sin(time * 0.1 + col * 0.5) * 0.8;

          // Distance from bottom creates flame shape (hotter at bottom)
          const distFromBottom = rows - row;
          const baseIntensity = distFromBottom * 0.2;

          const turbulence = noise1 + noise2 + noise3 + flicker;
          const intensity = baseIntensity + turbulence;

          const charIndex = Math.max(0, Math.min(chars.length - 1, Math.floor(intensity)));
          const char = chars[charIndex];

          // Opacity with flickering
          const baseOpacity = charIndex / chars.length * 0.4;
          const flickerAmount = Math.sin(time * 0.08 + row * 0.3 + col * 0.2) * 0.1;
          const opacity = Math.max(0.02, Math.min(0.35, baseOpacity + flickerAmount));

          // Subtle time-based color shifting
          const colorShift = Math.sin(time * 0.005) * 15;

          // Color based on intensity (warm palette)
          let r, g, b;
          if (charIndex >= 5) {
            r = Math.min(255, 209 + colorShift); g = 77; b = 40; // Burnt orange
          } else if (charIndex >= 3) {
            r = Math.min(255, 232 + colorShift); g = 131; b = 74; // Warm amber
          } else if (charIndex >= 1) {
            r = 196; g = 168; b = 130; // Warm tan
          } else {
            r = 213; g = 207; b = 192; // Warm grey
          }

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fillText(char, x, y + cellSize / 2);
        }
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.3 }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(247, 247, 242, 0.4) 70%, #F7F7F2 100%)'
        }}
      />
    </div>
  );
}
