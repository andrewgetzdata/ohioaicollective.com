import React, { useEffect, useRef } from "react";

export default function ThinkingBlob() {
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

    let time = 0;
    let animId;

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.28;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#F7F7F2";
      ctx.fillRect(0, 0, w, h);

      // Draw layered blobs for depth
      for (let layer = 2; layer >= 0; layer--) {
        const layerOffset = layer * 0.7;
        const layerScale = 1 - layer * 0.12;
        const points = 80;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const wobble1 = Math.sin(angle * 3 + time * 0.8 + layerOffset) * 0.15;
          const wobble2 = Math.sin(angle * 5 - time * 0.6 + layerOffset * 2) * 0.08;
          const wobble3 = Math.cos(angle * 2 + time * 1.1 + layerOffset) * 0.12;
          const breathe = Math.sin(time * 0.4 + layerOffset) * 0.05;

          const r = baseRadius * layerScale * (1 + wobble1 + wobble2 + wobble3 + breathe);
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Gradient for each layer
        const grad = ctx.createRadialGradient(
          cx - baseRadius * 0.2,
          cy - baseRadius * 0.2,
          0,
          cx,
          cy,
          baseRadius * 1.3
        );

        if (layer === 2) {
          const hueShift = Math.sin(time * 0.3) * 20;
          grad.addColorStop(0, `hsla(${260 + hueShift}, 60%, 75%, 0.4)`);
          grad.addColorStop(1, `hsla(${220 + hueShift}, 70%, 55%, 0.15)`);
        } else if (layer === 1) {
          const hueShift = Math.sin(time * 0.4 + 1) * 25;
          grad.addColorStop(0, `hsla(${230 + hueShift}, 70%, 65%, 0.6)`);
          grad.addColorStop(1, `hsla(${280 + hueShift}, 60%, 50%, 0.25)`);
        } else {
          const hueShift = Math.sin(time * 0.5 + 2) * 30;
          grad.addColorStop(0, `hsla(${210 + hueShift}, 80%, 70%, 0.85)`);
          grad.addColorStop(0.5, `hsla(${270 + hueShift}, 70%, 60%, 0.7)`);
          grad.addColorStop(1, `hsla(${300 + hueShift}, 50%, 50%, 0.4)`);
        }

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Subtle shadow
      ctx.beginPath();
      const shadowW = baseRadius * 1.2;
      const shadowH = baseRadius * 0.15;
      ctx.ellipse(cx, cy + baseRadius * 1.15, shadowW, shadowH, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fill();

      time += 0.02;
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