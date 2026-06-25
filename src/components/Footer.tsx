export default function Footer() {
  return (
    <footer className="bg-text-dark py-12 text-center">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="text-lg font-extrabold text-bg-white mb-1.5">Talk to Learn</div>
        <div className="text-sm text-white/50 mb-7">Practice Privately. Thrive Publicly.</div>
        <nav className="flex gap-6 justify-center mb-7">
          {['Privacy','Terms','Contact'].map(l => (
            <a key={l} href="#" className="text-sm text-white/60 hover:text-primary transition-colors">{l}</a>
          ))}
        </nav>
        <p className="text-sm text-white/40 italic mb-5">Built on the Teach to Learn principle. Confidence has no language barrier.</p>
        <p className="text-xs text-white/30">© 2026 Talk to Learn</p>
      </div>
    </footer>
  )
}
