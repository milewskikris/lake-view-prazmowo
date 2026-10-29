"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { MediaItem } from "@/content/media";
import { Lightbox } from "./lightbox";

/* ---------- Zapytanie: dom wybrany w karcie domu trafia do formularza ---------- */
interface InquiryCtx {
  house: string;
  setHouse: (nr: string) => void;
  messageHint: string;
  /** Ustawia dom (lub pytanie ogólne) i prowadzi do formularza. */
  askAbout: (nr: string, hint?: string) => void;
  focusToken: number;
}
const InquiryContext = createContext<InquiryCtx | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry poza InquiryProvider");
  return ctx;
}

/* ---------- Lightbox współdzielony przez galerię, rzuty i elewacje ---------- */
interface LightboxCtx {
  open: (items: MediaItem[], index: number, returnFocus?: HTMLElement | null) => void;
}
const LightboxContext = createContext<LightboxCtx | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox poza Providers");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [house, setHouse] = useState("");
  const [messageHint, setMessageHint] = useState("");
  const [focusToken, setFocusToken] = useState(0);

  const askAbout = useCallback((nr: string, hint = "") => {
    setHouse(nr);
    setMessageHint(hint);
    setFocusToken((t) => t + 1);
  }, []);

  const [lb, setLb] = useState<{ items: MediaItem[]; index: number } | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = useCallback((items: MediaItem[], index: number, from?: HTMLElement | null) => {
    returnFocus.current = from ?? null;
    setLb({ items, index });
  }, []);
  const close = useCallback(() => {
    setLb(null);
    // Fokus wraca do elementu, który otworzył podgląd – po zamknięciu okna modalnego.
    const el = returnFocus.current;
    requestAnimationFrame(() => el?.focus({ preventScroll: true }));
  }, []);

  const inquiry = useMemo(() => ({ house, setHouse, messageHint, askAbout, focusToken }), [house, messageHint, askAbout, focusToken]);
  const lightbox = useMemo(() => ({ open }), [open]);

  return (
    <InquiryContext.Provider value={inquiry}>
      <LightboxContext.Provider value={lightbox}>
        {children}
        {lb && <Lightbox items={lb.items} startIndex={lb.index} onClose={close} />}
      </LightboxContext.Provider>
    </InquiryContext.Provider>
  );
}
