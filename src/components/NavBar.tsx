import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { track } from '../analytics'
import AboutModal from './AboutModal'
import ContactModal from './ContactModal'
import LanguageSelector from './LanguageSelector'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function openContact() { window.dispatchEvent(new CustomEvent('open-contact')) }

export default function NavBar() {
  const { t } = useTranslation()
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const NAV_LINKS = [
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.whoItsFor'),  href: '#who-its-for' },
    { label: t('nav.pricing'),    href: '#pricing' },
  ]

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
              <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Mic body — rounded capsule */}
                <rect x="10" y="1" width="12" height="18" rx="6" fill="white" fillOpacity="0.95"/>
                {/* Grill lines across body */}
                <line x1="10.5" y1="8"  x2="21.5" y2="8"  stroke="#2A5BFF" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="10.5" y1="11" x2="21.5" y2="11" stroke="#2A5BFF" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="10.5" y1="14" x2="21.5" y2="14" stroke="#2A5BFF" strokeWidth="1.2" strokeLinecap="round"/>
                {/* Stand arms */}
                <path d="M8 14 Q5 14 5 20 Q5 24 10 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M24 14 Q27 14 27 20 Q27 24 22 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                {/* Vertical stem */}
                <line x1="16" y1="24" x2="16" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                {/* Base */}
                <line x1="11" y1="29" x2="21" y2="29" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#0A0F1C', letterSpacing: '-.01em', textShadow: '0 2px 6px rgba(30,77,216,0.35), 0 1px 2px rgba(0,0,0,0.15)' }}>
              TalkToLearn
            </span>
          </div>

          {/* Nav links — desktop only */}
          <div className="hidden md:flex" style={{ gap: '28px', alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={label} label={label} onClick={() => scrollTo(href.replace('#', ''))} />
            ))}
            <NavLink label={t('nav.about')} onClick={() => setAboutOpen(true)} />
            <NavLink label={t('nav.contact')} onClick={() => setContactOpen(true)} />
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
              {t('nav.cta')}
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
              {t('nav.about')}
            </button>
            <button onClick={() => { track('cta_start_free_nav'); openContact() }} style={{
              padding: '8px 16px', borderRadius: '50px',
              background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
              color: '#FFFFFF', fontSize: '12px', fontWeight: 800,
              border: 'none', cursor: 'pointer',
            }}>
              {t('nav.startFree')}
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
