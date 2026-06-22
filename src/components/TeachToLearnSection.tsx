/* ─────────────────────────────────────────────────────────────────────────────
   TeachToLearnSection — Premium redesign
   Single accent: #2D9E6A. Neutral palette. Editorial image cards.
   Three equal step cards. Centred Feynman pull-quote.
   ───────────────────────────────────────────────────────────────────────────── */

const ACCENT = '#2D9E6A'

const YOU_BULLETS = [
  'You organise your thoughts.',
  'You connect ideas.',
  'You spot gaps instantly.',
  'You build clarity, confidence, and real understanding.',
]

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M5 3 L10 8 L5 13" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

import { useState } from 'react'
import ResearchModal from './ResearchModal'

const TTLKF = `
@keyframes ttl-fadein { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
`

/* 2×2 real photographic grid — Unsplash CDN, square crops */
const PHOTO_TILES = [
  {
    label: 'Student',
    sub: 'Explaining out loud',
    /* Student speaking/presenting at front of class */
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    label: 'Professional',
    sub: 'Presenting with confidence',
    /* Woman presenting confidently, face visible, speaking */
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    label: 'Creator',
    sub: 'Talking to camera',
    /* Person recording video / vlogging — face to camera */
    src: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    label: 'Parent & Learner',
    sub: 'Explaining together',
    /* Parent talking to child, warm and engaged */
    src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=600&h=600&q=80',
  },
]

function PhotoTile({ tile, delay }: { tile: typeof PHOTO_TILES[0]; delay: number }) {
  return (
    <div
      style={{
        borderRadius: '16px', overflow: 'hidden',
        aspectRatio: '1 / 1', position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,.07), 0 12px 32px rgba(0,0,0,.12)',
        animation: `ttl-fadein .6s ${delay}ms both`,
        transition: 'transform .22s ease, box-shadow .22s ease',
        cursor: 'default', background: '#E8EDF5',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(0,0,0,.10), 0 22px 52px rgba(0,0,0,.16)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,.07), 0 12px 32px rgba(0,0,0,.12)'
      }}
    >
      {/* Photo */}
      <img
        src={tile.src}
        alt={tile.label}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading="lazy"
      />
      {/* Warm cinematic grade overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(255,200,100,.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }}/>
      {/* Caption */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.52) 0%, transparent 100%)',
        padding: '40px 14px 14px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.09em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.96)', marginBottom: '2px' }}>
          {tile.label}
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.65)', letterSpacing: '.04em' }}>
          {tile.sub}
        </div>
      </div>
    </div>
  )
}

const STEP_CARDS = [
  {
    num: '01',
    headline: 'Teacher Mode',
    body: 'The moment you start explaining, your brain reorganises knowledge — making connections that passive reading never triggers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: '02',
    headline: 'Gap Detection',
    body: 'Gaps in understanding become instantly visible when you try to explain. Silence is feedback. The AI catches what you miss.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v6"/><path d="M8 11h6"/>
      </svg>
    ),
  },
  {
    num: '03',
    headline: 'Proven Retention',
    body: 'Research shows learners who teach retain up to 90% more than those who only read or listen. Talking is the shortcut.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
]

export default function TeachToLearnSection() {
  const [researchOpen, setResearchOpen] = useState(false)

  return (
    <>
    {researchOpen && <ResearchModal onClose={() => setResearchOpen(false)} />}
    <section style={{ background: '#FAFBFC', padding: '108px 20px 120px' }}>
      <style>{TTLKF}</style>
      <div className="max-w-[1120px] mx-auto">

        {/* ── Part 1: Two columns ──────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start mb-20">

          {/* LEFT: text */}
          <div style={{ flex: '1 1 460px', maxWidth: '520px' }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '4px 14px', borderRadius: '20px', marginBottom: '22px',
              border: `1px solid ${ACCENT}28`, background: `${ACCENT}0C`,
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
              <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: ACCENT }}>
                The Teach to Learn Principle
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
              fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
              color: '#0A0F1C', margin: '0 0 12px',
            }}>
              Why Explaining a Topic<br />Makes You{' '}
              <span style={{ color: ACCENT }}>Learn it Faster</span>
            </h2>

            <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#9CA3AF', marginBottom: '28px', lineHeight: 1.6 }}>
              The science behind the Teach to Learn Principle.
            </p>

            <p style={{ fontSize: '17px', fontWeight: 500, color: '#1A2332', lineHeight: 1.72, marginBottom: '28px' }}>
              When you explain something out loud, your brain switches into{' '}
              <span style={{ color: ACCENT, fontWeight: 700 }}>'teacher mode'</span>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '32px' }}>
              {YOU_BULLETS.map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flexShrink: 0, marginTop: '3px' }}><ChevronIcon /></div>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: '#374151', lineHeight: 1.5 }}>{line}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '20px 24px', borderRadius: '14px',
              background: '#FFFFFF', border: '1px solid #E8EDF5',
              borderLeft: `3px solid ${ACCENT}`,
              boxShadow: '0 2px 8px rgba(0,0,0,.04)',
              marginBottom: '22px',
            }}>
              <p style={{ fontSize: '15.5px', fontWeight: 600, lineHeight: 1.65, color: '#1A2332', margin: 0 }}>
                This is the <span style={{ color: ACCENT }}>Teach to Learn Principle</span> — one of the most powerful learning methods ever discovered.
              </p>
            </div>

            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.72, marginBottom: '20px' }}>
              <strong style={{ color: '#0A0F1C', fontWeight: 700 }}>Talk to Learn</strong> brings this method to life with AI that listens, scores, and helps you improve every time you speak.
            </p>

            {/* Backed by research link */}
            <button
              onClick={() => setResearchOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                fontSize: '13px', fontWeight: 700, color: ACCENT,
                background: `${ACCENT}0C`, border: `1px solid ${ACCENT}28`,
                borderRadius: '20px', padding: '6px 14px', cursor: 'pointer',
                transition: 'background .18s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${ACCENT}18`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${ACCENT}0C`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Backed by research — see the science
            </button>

          </div>

          {/* RIGHT: 2×2 photographic grid */}
          <div style={{ flex: '1 1 420px', maxWidth: '480px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {PHOTO_TILES.map((tile, i) => (
                <PhotoTile key={tile.label} tile={tile} delay={i * 80} />
              ))}
            </div>
          </div>

        </div>

        {/* ── Part 2: Three equal step cards ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {STEP_CARDS.map((card) => (
            <div key={card.num} style={{
              background: '#FFFFFF', border: '1px solid #E8EDF5',
              borderRadius: '16px', padding: '28px 28px 26px',
              boxShadow: '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${ACCENT}0E`, border: `1px solid ${ACCENT}1E`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px',
              }}>
                {card.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.14em', color: `${ACCENT}80`, textTransform: 'uppercase' as const }}>{card.num}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0A0F1C', margin: 0 }}>{card.headline}</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        {/* ── Part 3: Feynman pull-quote — centred ────────────────────── */}
        <div style={{ textAlign: 'center', borderTop: '1px solid #E8EDF5', paddingTop: '60px' }}>
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ marginBottom: '22px', opacity: .20 }}>
            <path d="M0 24V13.5C0 6 4.5 1.5 13.5 0l1.5 3C9.5 4.5 7 7 7 10.5V12h6V24H0zm18 0V13.5C18 6 22.5 1.5 31.5 0L33 3C27.5 4.5 25 7 25 10.5V12h6V24H18z" fill="#0A0F1C"/>
          </svg>
          <p style={{
            fontSize: 'clamp(1.15rem,2.5vw,1.42rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: '#6B7280', lineHeight: 1.7,
            maxWidth: '580px', margin: '0 auto 16px',
          }}>
            "The best way to learn something is to teach it."
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '.06em' }}>
            — Richard Feynman
          </p>
        </div>

      </div>
    </section>
    </>
  )
}
