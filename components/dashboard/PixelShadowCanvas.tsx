"use client";

import React, { useEffect, useRef } from "react";

type PixelShadowCanvasProps = {
  pixelSize?: number;
  radius?: number;
  fade?: number;
  maxOpacity?: number;
  className?: string;
};

/**
 * use as the first child inside a `position: relative` and
 * `overflow: hidden` container (e.g. the hero card). It is
 * pointer-events: none, so it never blocks clicks on content
 * rendered after it in the DOM.
 */
export default function PixelShadowCanvas({
  pixelSize = 10,
  radius = 4.2,
  fade = 0.05,
  maxOpacity = 0.3,
  className = "",
}: PixelShadowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let grid = new Float32Array(0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.ceil(rect.width / pixelSize));
      rows = Math.max(1, Math.ceil(rect.height / pixelSize));
      grid = new Float32Array(cols * rows);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const handleMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const cx = Math.floor(mouseX / pixelSize);
      const cy = Math.floor(mouseY / pixelSize);
      const rad = Math.ceil(radius);

      for (let dx = -rad; dx <= rad; dx++) {
        for (let dy = -rad; dy <= rad; dy++) {
          const dist = Math.hypot(dx, dy);
          if (dist > radius) continue;
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
          const strength = 1 - dist / radius;
          const idx = y * cols + x;
          grid[idx] = Math.max(grid[idx], strength);
        }
      }
    };
    host.addEventListener("mousemove", handleMove);

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          let v = grid[idx];
          if (v <= 0) continue;
          ctx.fillStyle = `rgba(255,255,255,${v * maxOpacity})`;
          ctx.fillRect(x * pixelSize + 1, y * pixelSize + 1, pixelSize - 2, pixelSize - 2);
          v -= fade;
          grid[idx] = v > 0 ? v : 0;
        }
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("mousemove", handleMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pixelSize, radius, fade, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] block h-full w-full ${className}`.trim()}
    />
  );
}