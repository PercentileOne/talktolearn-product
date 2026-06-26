import { useState, useEffect } from 'react'
import { track } from '../analytics'
import AboutModal from './AboutModal'
import ContactModal from './ContactModal'
import LanguageSelector from './LanguageSelector'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: "Who It's For", href: '#who-its-for' },
  { label: 'Pricing', href: '#pricing' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function openContact() { window.dispatchEvent(new CustomEvent('open-contact')) }

export default function NavBar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const handler = () => setContactOpen(true)
    window.addEventListener('open-contact', handler)
    return () => window.removeEventListener('open-contact', handler)
  }, [])

  return (
    <>
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '60px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,0,0,.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,.06)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px',
      }}>
        <div className="max-w-[1120px] mx-auto w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              </svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#0A0F1C', letterSpacing: '-.01em', textShadow: '0 1px 3px rgba(0,0,0,0.18), 0 2px 8px rgba(30,77,216,0.10)' }}>
              Talk to Learn
            </span>
          </div>

          {/* Nav links — desktop only */}
          <div className="hidden md:flex" style={{ gap: '28px', alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={label} label={label} onClick={() => scrollTo(href.replace('#', ''))} />
            ))}
            <NavLink label="About" onClick={() => setAboutOpen(true)} />
            <NavLink label="Contact" onClick={() => setContactOpen(true)} />
          </div>

          {/* Language selector + Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px' }}>
            <LanguageSelector />
            <button style={{
              padding: '9px 22px', borderRadius: '50px',
              background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
              color: '#FFFFFF', fontSize: '13.5px', fontWeight: 800,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(30,77,216,.32)',
              transition: 'transform .18s, box-shadow .18s',
              letterSpacing: '.01em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(30,77,216,.42)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(30,77,216,.32)'
            }}
            onClick={() => { track('cta_launching_soon'); openContact() }}
            >
              Launching Soon
            </button>
          </div>

          {/* Mobile — Language + About + CTA */}
          <div className="flex md:hidden" style={{ gap: '8px', alignItems: 'center' }}>
            <LanguageSelector />
            <button
              onClick={() => setAboutOpen(true)}
              style={{
                fontSize: '13px', fontWeight: 700, color: '#1E4DD8',
                background: 'rgba(30,77,216,.08)', border: '1px solid rgba(30,77,216,.18)',
                borderRadius: '20px', padding: '6px 14px', cursor: 'pointer',
              }}
            >
              About
            </button>
            <button onClick={() => { track('cta_start_free_nav'); openContact() }} style={{
              padding: '8px 16px', borderRadius: '50px',
              background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
              color: '#FFFFFF', fontSize: '12px', fontWeight: 800,
              border: 'none', cursor: 'pointer',
            }}>
              Start Free
            </button>
          </div>

        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: '60px' }} />
    </>
  )
}

function NavLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: '14px', fontWeight: 600, color: '#6B7280',
        cursor: 'pointer', background: 'none', border: 'none', padding: 0,
        transition: 'color .18s', fontFamily: 'inherit',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0A0F1C'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B7280'}
    >
      {label}
    </button>
  )
}
