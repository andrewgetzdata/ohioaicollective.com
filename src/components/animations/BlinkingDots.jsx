import React, { useEffect, useRef } from "react";

export default function BlinkingDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const updateSize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    updateSize();

    const cols = 14;
    const rows = 8;
    const padding = 20;

    const dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          col: c,
          row: r,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.7,
          baseOpacity: 0.3 + Math.random() * 0.4,
        });
      }
    }

    let time = 0;
    let animId;

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#F7F7F2";
      ctx.fillRect(0, 0, w, h);

      const cellW = (w - padding * 2) / (cols - 1);
      const cellH = (h - padding * 2) / (rows - 1);
      const radius = Math.min(cellW, cellH) * 0.32;

      for (const dot of dots) {
        const x = padding + dot.col * cellW;
        const y = padding + dot.row * cellH;

        const wave1 = Math.sin(time * dot.speed + dot.phase);
        const wave2 = Math.sin(time * 0.4 + dot.col * 0.5 + dot.row * 0.3);
        const brightness = dot.baseOpacity + wave1 * 0.3 + wave2 * 0.15;
        const clamped = Math.max(0.1, Math.min(1, brightness));

        // Teal/cyan palette (complementary to #D14D28)
        const r = Math.floor(20 + clamped * 30);
        const g = Math.floor(120 + clamped * 80);
        const b = Math.floor(140 + clamped * 75);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${clamped})`;
        ctx.fill();
      }

      time += 0.03;
      animId = requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="w-full aspect-[7/4] border-2 border-[#1A1A1A]"
      style={{ boxShadow: "8px 8px 0px 0px #1A1A1A" }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}