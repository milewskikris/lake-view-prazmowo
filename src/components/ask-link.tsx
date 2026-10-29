"use client";

import type { ReactNode } from "react";
import { useInquiry } from "./providers";

/** Link do formularza, który od razu ustawia temat zapytania (dom lub typ domu). */
export function AskLink({ house = "", hint = "", className, children }: { house?: string; hint?: string; className?: string; children: ReactNode }) {
  const { askAbout } = useInquiry();
  return (
    <a href="#kontakt" className={className} onClick={() => askAbout(house, hint)}>
      {children}
    </a>
  );
}
