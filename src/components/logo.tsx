export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" stroke="currentColor">
      <path d="M6 21 20 8l14 13" strokeWidth="1.3" />
      <path d="M11.5 16.5V24M28.5 16.5V24" strokeWidth="1.3" />
      <path d="M4 29c4-2 6.5-2 10.5 0s6.5 2 10.5 0 6.5-2 11 0" strokeWidth="1.1" />
      <path d="M4 34c4-2 6.5-2 10.5 0s6.5 2 10.5 0 6.5-2 11 0" strokeWidth="1.1" opacity=".55" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3.5">
      <LogoMark className={`flex-none ${compact ? "size-8" : "size-10"}`} />
      <span className="leading-none">
        <span className="block text-[0.95rem] font-normal tracking-[0.3em] whitespace-nowrap uppercase sm:tracking-[0.42em]">Lake View</span>
        <span className="mt-1.5 block text-[0.58rem] font-medium tracking-[0.3em] whitespace-nowrap uppercase opacity-70 sm:tracking-[0.5em]">Prażmowo · Mazury</span>
      </span>
    </span>
  );
}
