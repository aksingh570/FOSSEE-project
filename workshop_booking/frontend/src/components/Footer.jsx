export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
                          flex items-center justify-center font-black text-white text-xs">
            F
          </div>
          <span className="font-bold text-sm text-[var(--color-textbase)]">FOSSEE Workshops</span>
        </div>

        {/* Copy */}
        <p className="text-xs text-[var(--color-muted)]">
          Developed by the{' '}
          <a href="https://fossee.in" target="_blank" rel="noopener noreferrer"
             className="text-[var(--color-primary)] hover:underline">
            FOSSEE group
          </a>
          , IIT Bombay.
        </p>

        {/* Links */}
        <div className="flex items-center gap-3">
          <a href="https://fossee.in" target="_blank" rel="noopener noreferrer"
             className="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
            About FOSSEE
          </a>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
          <a href="mailto:pythonsupport@fossee.in"
             className="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
