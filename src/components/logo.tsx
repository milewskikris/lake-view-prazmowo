export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none" stroke="currentColor">
      <path d="M4 18 16 6l12 12" strokeWidth="1.4" />
      <path d="M9 14v6M23 14v6" strokeWidth="1.4" />
      <path d="M3 24c3-1.6 5-1.6 8 0s5 1.6 8 0 5-1.6 8 0" strokeWidth="1.2" />
      <path d="M3 28c3-1.6 5-1.6 8 0s5 1.6 8 0 5-1.6 8 0" strokeWidth="1.2" opacity=".6" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="size-[30px] flex-none" />
      <span className="font-display text-[1.2rem] leading-none tracking-[0.02em]">
        Lake View
        <small className="mt-[3px] block font-mono text-[0.62rem] tracking-[0.2em] uppercase opacity-75">Prażmowo · Mazury</small>
      </span>
    </span>
  );
}
