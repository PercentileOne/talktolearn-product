import { openContact } from './NavBar'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-text-dark py-12 text-center">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="text-lg font-extrabold text-bg-white mb-1.5">Talk to Learn</div>
        <div className="text-sm text-white/50 mb-7">Practice Privately. Thrive Publicly.</div>

        <nav className="flex gap-6 justify-center mb-5">
          {['Privacy', 'Terms'].map(l => (
            <a key={l} href="#" className="text-sm text-white/60 hover:text-primary transition-colors">{l}</a>
          ))}
          <button
            onClick={openContact}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0, fontSize: 14 }}
            className="text-sm text-white/60 hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 28 }}>
          <a href="mailto:hello@talktolearn.app" style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Mail size={13} color='rgba(255,255,255,0.40)' strokeWidth={2} />
            hello@talktolearn.app
          </a>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Phone size={13} color='rgba(255,255,255,0.40)' strokeWidth={2} />
            <span style={{ letterSpacing: '0.05em' }}>0800 XXX XXXX</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>· coming soon</span>
          </div>
        </div>

        <p className="text-sm text-white/40 italic mb-5">Built on the Teach to Learn principle. Confidence has no language barrier.</p>
        <p className="text-xs text-white/30">© 2026 Talk to Learn</p>
      </div>
    </footer>
  )
}
