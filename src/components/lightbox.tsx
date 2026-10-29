"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/content/media";

export function Lightbox({ items, startIndex, onClose }: { items: MediaItem[]; startIndex: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(startIndex);
  const startX = useRef<number | null>(null);
  const item = items[index];
  const multi = items.length > 1;

  const go = useCallback((d: number) => setIndex((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (!dlg.open) dlg.showModal();
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dlg.addEventListener("cancel", onCancel);
    document.documentElement.style.overflow = "hidden";
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label="Podgląd zdjęcia"
      className="lightbox fixed inset-0 h-dvh w-screen bg-transparent text-jasny open:grid open:grid-rows-[auto_minmax(0,1fr)_auto]"
      onKeyDown={(e) => {
        if (!multi) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="wrap flex items-center justify-between gap-3 pt-[calc(env(safe-area-inset-top,0px)+8px)] pb-2 font-mono text-xs tracking-wider max-w-none">
        <span aria-live="polite">
          {index + 1} / {items.length}
        </span>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Zamknij podgląd" autoFocus>
          ×
        </button>
      </div>
      <div
        className="relative min-h-0 touch-pan-y"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (multi && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="pointer-events-none absolute inset-x-[max(16px,env(safe-area-inset-left,0px))] inset-y-0">
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            quality={85}
            className="object-contain"
          />
        </div>
        {multi && (
          <>
            <button type="button" className="icon-btn absolute top-1/2 left-[max(8px,env(safe-area-inset-left,0px))] -translate-y-1/2" onClick={() => go(-1)} aria-label="Poprzednie">
              ←
            </button>
            <button type="button" className="icon-btn absolute top-1/2 right-[max(8px,env(safe-area-inset-right,0px))] -translate-y-1/2" onClick={() => go(1)} aria-label="Następne">
              →
            </button>
          </>
        )}
      </div>
      <p className="wrap max-w-none pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+14px)] text-center text-sm text-jasny-2">{item.caption}</p>
    </dialog>
  );
}
