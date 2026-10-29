"use client";

import { useEffect, useRef } from "react";

/** Delikatnie falujące linie tafli jeziora. Zatrzymuje się poza ekranem i przy preferencji ograniczonego ruchu. */
export function WaterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;

    const size = () => {
      const r = cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.max(1, Math.round(r.width * d));
      cv.height = Math.max(1, Math.round(r.height * d));
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const draw = (t: number) => {
      const W = cv.clientWidth;
      const H = cv.clientHeight;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < 22; i++) {
        const p = i / 22;
        const y = p * H;
        const amp = 1.5 + p * 5;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(236,235,227,${0.08 + p * 0.28})`;
        ctx.lineWidth = 0.6 + p * 0.8;
        for (let x = 0; x <= W; x += 14) {
          const yy = y + Math.sin(x * 0.012 + t * 0.0006 + i * 1.7) * amp + Math.sin(x * 0.031 - t * 0.0004 + i) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
    };
    const loop = (t: number) => {
      draw(t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    size();
    draw(0);
    const onResize = () => {
      size();
      draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      });
      io.observe(cv);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] w-full opacity-55" />;
}
