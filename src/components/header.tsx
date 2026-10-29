"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./logo";

const NAV = [
  { href: "#inwestycja", label: "Inwestycja" },
  { href: "#dom", label: "Dom 1a" },
  { href: "#lokalizacja", label: "Lokalizacja" },
  { href: "#domy", label: "Domy" },
  { href: "#galeria", label: "Galeria" },
];
const MOBILE_NAV = [
  { href: "#inwestycja", label: "Inwestycja" },
  { href: "#dom", label: "Dom typu 1a" },
  { href: "#atuty", label: "Atuty" },
  { href: "#architektura", label: "Rzuty i elewacje" },
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
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)), {
      rootMargin: "-45% 0px -50% 0px",
    });
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
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] text-jasny transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solid ? "border-b border-jasny/10 bg-smola/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`wrap flex items-center justify-between gap-6 transition-[height] duration-500 ${solid ? "h-[72px]" : "h-[84px] md:h-[104px]"}`}>
          <a href="#start" className="flex min-h-11 items-center no-underline" aria-label="Lake View Prażmowo – początek strony">
            <Wordmark compact={solid} />
          </a>
          <nav aria-label="Główna nawigacja" className="hidden items-center gap-[clamp(20px,2.6vw,44px)] lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.href ? "location" : undefined}
                className="relative py-3 text-[0.72rem] font-medium tracking-[0.24em] uppercase no-underline opacity-80 transition-opacity after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-mosiadz after:transition-transform after:duration-300 hover:opacity-100 hover:after:scale-x-100 aria-[current]:opacity-100 aria-[current]:after:scale-x-100"
              >
                {n.label}
              </a>
            ))}
            <a href="#kontakt" className="btn btn-ghost min-h-11 px-6">
              Kontakt
            </a>
          </nav>
          <button
            ref={openBtn}
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center gap-3 px-1 text-[0.72rem] font-medium tracking-[0.24em] uppercase lg:hidden"
            aria-haspopup="dialog"
            onClick={() => menuRef.current?.showModal()}
          >
            Menu
            <span aria-hidden="true" className="grid gap-1.5">
              <i className="block h-px w-7 bg-current" />
              <i className="block h-px w-5 justify-self-end bg-current" />
            </span>
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
        <div className="wrap flex flex-1 flex-col pt-[calc(env(safe-area-inset-top,0px)+18px)] pb-[calc(env(safe-area-inset-bottom,0px)+32px)]">
          <div className="flex items-center justify-between">
            <Wordmark compact />
            <button type="button" className="icon-btn" onClick={closeMenu} aria-label="Zamknij menu" autoFocus>
              ×
            </button>
          </div>
          <nav aria-label="Menu mobilne" className="mt-[7vh]">
            <ul className="grid">
              {MOBILE_NAV.map((n, i) => (
                <li key={n.href} className="border-b border-jasny/10">
                  <a href={n.href} className="flex items-baseline gap-5 py-3.5 text-[1.35rem] font-light tracking-[0.14em] uppercase no-underline">
                    <span className="w-6 text-[0.65rem] tracking-[0.2em] text-mosiadz">{String(i + 1).padStart(2, "0")}</span>
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
