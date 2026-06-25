import { openContact } from './NavBar'
import { Mail, Phone, ExternalLink } from 'lucide-react'

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0F1C', padding: '64px 20px 40px' }}>
      <div className="max-w-[1120px] mx-auto">

        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#FFF', letterSpacing: '-.01em', marginBottom: 8 }}>Talk to Learn</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, marginBottom: 16 }}>
              A new way to learn — by speaking out loud.<br />
              Practice privately. Thrive publicly.
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.28)', fontSize: 11, fontWeight: 700, color: '#FDE68A', letterSpacing: '0.06em' }}>
              Launching Soon · Early Access Open
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: 16, textTransform: 'uppercase' }}>Product</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: "Who It's For", href: '#who-its-for' },
                  { label: 'Pricing', href: '#pricing' },
                ].map(l => (
                  <a key={l.label} href={l.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color .18s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFF'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                  >{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: 16, textTransform: 'uppercase' }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={openContact} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)', textAlign: 'left', fontFamily: 'inherit', transition: 'color .18s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFF'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                >Early Access</button>
                <button onClick={openContact} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)', textAlign: 'left', fontFamily: 'inherit', transition: 'color .18s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFF'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                >Contact</button>
                <a href="https://www.linkedin.com/in/franciscobbinah/" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color .18s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFF'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                >
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href="https://cockpit.percentile.one" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color .18s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFF'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                >
                  <ExternalLink size={13} /> Cockpit
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: 16, textTransform: 'uppercase' }}>Get in Touch</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:hello@talktolearn.app"
                style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFF'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
              >
                <Mail size={13} strokeWidth={2} /> hello@talktolearn.app
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.30)' }}>
                <Phone size={13} strokeWidth={2} />
                <span style={{ letterSpacing: '0.05em' }}>0800 XXX XXXX</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>· coming soon</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 28 }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>© 2026 TalkToLearn.app — <span style={{ fontStyle: 'italic' }}>Speak It. To Understand It.</span></p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)'}
              >{l}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
