import React, { useEffect, useRef } from "react";

export default function DataFlow() {
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

    // Create nodes in a network layout
    const nodeCount = 24;
    const nodes = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: 40 + Math.random() * (w - 80),
        y: 30 + Math.random() * (h - 60),
        radius: 3 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
      });
    }

    // Create connections between nearby nodes
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          connections.push({ from: i, to: j, dist });
        }
      }
    }

    // Create particles that travel along connections
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      if (conn) {
        particles.push({
          connection: conn,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.008,
          forward: Math.random() > 0.5,
        });
      }
    }

    let time = 0;
    let animId;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#F7F7F2";
      ctx.fillRect(0, 0, w, h);

      // Draw connections
      for (const conn of connections) {
        const a = nodes[conn.from];
        const b = nodes[conn.to];
        const opacity = 0.08 + Math.sin(time * 0.5 + conn.dist * 0.01) * 0.04;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(60, 80, 180, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw and update particles
      for (const particle of particles) {
        const a = nodes[particle.connection.from];
        const b = nodes[particle.connection.to];

        const t = particle.forward ? particle.progress : 1 - particle.progress;
        const px = a.x + (b.x - a.x) * t;
        const py = a.y + (b.y - a.y) * t;

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0, "rgba(80, 100, 220, 0.6)");
        grd.addColorStop(1, "rgba(80, 100, 220, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140, 160, 255, 0.9)";
        ctx.fill();

        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          // Pick a new random connection
          const newConn =
            connections[Math.floor(Math.random() * connections.length)];
          if (newConn) {
            particle.connection = newConn;
            particle.forward = Math.random() > 0.5;
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.phase);
        const r = node.radius + pulse * 1.5;
        const opacity = 0.5 + pulse * 0.3;

        // Glow
        const grd = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r * 3
        );
        grd.addColorStop(0, `rgba(60, 80, 180, ${opacity * 0.3})`);
        grd.addColorStop(1, "rgba(60, 80, 180, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60, 80, 180, ${opacity})`;
        ctx.fill();
      }

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