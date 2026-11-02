/** Znak słowny Lake View Prażmowo – czysto typograficzny. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-4 leading-none">
      <span className={`font-light tracking-[0.42em] whitespace-nowrap uppercase transition-[font-size] duration-500 ${compact ? "text-[1rem]" : "text-[1.12rem]"}`}>Lake View</span>
      <span aria-hidden="true" className="h-5 w-px bg-current opacity-40" />
      <span className="font-serif text-[1.05rem] whitespace-nowrap italic opacity-85">Prażmowo</span>
    </span>
  );
}
