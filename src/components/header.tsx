"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./logo";

const NAV = [
  { href: "#inwestycja", label: "Inwestycja" },
  { href: "#architektura", label: "Architektura" },
  { href: "#lokalizacja", label: "Lokalizacja" },
  { href: "#domy", label: "Domy" },
  { href: "#galeria", label: "Galeria" },
];
const MOBILE_NAV = [
  { href: "#inwestycja", label: "Inwestycja" },
  { href: "#atuty", label: "Atuty" },
  { href: "#architektura", label: "Architektura" },
  { href: "#lokalizacja", label: "Lokalizacja" },
  { href: "#domy", label: "Dostępne domy" },
  { href: "#galeria", label: "Galeria" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef<HTMLDialogElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,color,box-shadow] duration-300 ${
          solid ? "bg-len text-ink shadow-[0_1px_0_var(--color-kreska)]" : "bg-transparent text-jasny"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href="#start" className="flex min-h-11 items-center no-underline" aria-label="Lake View Prażmowo – początek strony">
            <Wordmark />
          </a>
          <nav aria-label="Główna nawigacja" className="hidden items-center gap-[clamp(14px,2vw,30px)] lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.href ? "location" : undefined}
                className="relative py-2.5 text-sm tracking-[0.03em] no-underline after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current]:after:scale-x-100"
              >
                {n.label}
              </a>
            ))}
            <a href="#kontakt" className={`btn min-h-10 ${solid ? "" : "btn-ghost"}`}>
              Zapytaj o ofertę
            </a>
          </nav>
          <button
            ref={openBtn}
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 px-1 text-sm font-medium tracking-[0.06em] lg:hidden"
            aria-haspopup="dialog"
            onClick={() => menuRef.current?.showModal()}
          >
            <i aria-hidden="true" className="block h-px w-[22px] bg-current shadow-[0_6px_0_currentColor]" />
            Menu
          </button>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="mnav fixed inset-0 h-dvh w-screen bg-smola text-jasny open:flex open:flex-col"
        onClose={() => openBtn.current?.focus({ preventScroll: true })}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) closeMenu();
        }}
      >
        <div className="wrap flex flex-1 flex-col pt-[calc(env(safe-area-inset-top,0px)+12px)] pb-[calc(env(safe-area-inset-bottom,0px)+32px)]">
          <div className="flex items-center justify-between">
            <Wordmark />
            <button type="button" className="icon-btn" onClick={closeMenu} aria-label="Zamknij menu" autoFocus>
              ×
            </button>
          </div>
          <nav aria-label="Menu mobilne" className="mt-[6vh]">
            <ul className="grid gap-1.5">
              {MOBILE_NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="block py-1.5 font-display text-[2rem] no-underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#kontakt" className="btn btn-light mt-auto self-start">
            Zapytaj o ofertę <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
