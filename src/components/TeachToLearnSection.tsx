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

const TTLKF = `
@keyframes ttl-fadein { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
`

/* 2×2 photographic grid — cinematic illustrated tiles per user type */
const PHOTO_TILES = [
  {
    label: 'Student',
    sub: 'Learning out loud',
    gradient: 'linear-gradient(145deg, #F5EAC8 0%, #E8D080 55%, #CEB855 100%)',
    highlight: 'rgba(255,255,255,.32)',
    /* Seated figure leaning over desk */
    figure: (
      <svg viewBox="0 0 160 200" fill="none" style={{ width: '75%', height: '75%' }}>
        {/* head */}
        <ellipse cx="80" cy="48" rx="22" ry="24" fill="rgba(0,0,0,.22)"/>
        {/* body leaning forward */}
        <path d="M52 78 Q52 102 80 108 Q108 102 108 78 L106 148 Q106 158 80 160 Q54 158 54 148 Z" fill="rgba(0,0,0,.18)"/>
        {/* arms over desk */}
        <path d="M52 86 L20 116" stroke="rgba(0,0,0,.20)" strokeWidth="16" strokeLinecap="round"/>
        <path d="M108 86 L140 116" stroke="rgba(0,0,0,.20)" strokeWidth="16" strokeLinecap="round"/>
        {/* desk surface */}
        <rect x="12" y="118" width="136" height="8" rx="4" fill="rgba(0,0,0,.14)"/>
        {/* book on desk */}
        <rect x="34" y="108" width="48" height="10" rx="3" fill="rgba(0,0,0,.16)"/>
        <line x1="58" y1="108" x2="58" y2="118" stroke="rgba(0,0,0,.10)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: 'Professional',
    sub: 'Presenting with confidence',
    gradient: 'linear-gradient(145deg, #C8D8EE 0%, #96B4D8 55%, #6890C0 100%)',
    highlight: 'rgba(255,255,255,.28)',
    /* Standing figure, slight forward stance */
    figure: (
      <svg viewBox="0 0 160 200" fill="none" style={{ width: '70%', height: '70%' }}>
        {/* head */}
        <ellipse cx="80" cy="40" rx="20" ry="22" fill="rgba(0,0,0,.22)"/>
        {/* shoulders/jacket */}
        <path d="M50 68 Q50 88 80 94 Q110 88 110 68 L108 158 Q108 168 80 170 Q52 168 52 158 Z" fill="rgba(0,0,0,.20)"/>
        {/* arms — one raised slightly */}
        <path d="M50 74 L24 114" stroke="rgba(0,0,0,.20)" strokeWidth="15" strokeLinecap="round"/>
        <path d="M110 74 L128 100" stroke="rgba(0,0,0,.20)" strokeWidth="15" strokeLinecap="round"/>
        {/* speech wave lines */}
        <path d="M128 86 Q136 80 128 74" stroke="rgba(0,0,0,.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M133 91 Q145 80 133 69" stroke="rgba(0,0,0,.14)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Creator',
    sub: 'Talking to camera',
    gradient: 'linear-gradient(145deg, #F0D0B8 0%, #D8A888 55%, #C08860 100%)',
    highlight: 'rgba(255,255,255,.30)',
    /* Forward-facing casual figure + camera suggestion */
    figure: (
      <svg viewBox="0 0 160 200" fill="none" style={{ width: '75%', height: '75%' }}>
        {/* head */}
        <ellipse cx="80" cy="44" rx="22" ry="24" fill="rgba(0,0,0,.22)"/>
        {/* body casual */}
        <path d="M52 74 Q52 96 80 102 Q108 96 108 74 L106 155 Q106 165 80 167 Q54 165 54 155 Z" fill="rgba(0,0,0,.18)"/>
        {/* arms relaxed */}
        <path d="M52 80 L28 118" stroke="rgba(0,0,0,.20)" strokeWidth="15" strokeLinecap="round"/>
        <path d="M108 80 L132 118" stroke="rgba(0,0,0,.20)" strokeWidth="15" strokeLinecap="round"/>
        {/* camera icon top-right */}
        <rect x="114" y="22" width="28" height="20" rx="4" fill="rgba(0,0,0,.18)"/>
        <circle cx="128" cy="32" r="6" fill="rgba(0,0,0,.22)"/>
        <circle cx="128" cy="32" r="3" fill="rgba(0,0,0,.14)"/>
        {/* record dot */}
        <circle cx="137" cy="24" r="3" fill="rgba(0,0,0,.28)"/>
      </svg>
    ),
  },
  {
    label: 'Parent & Learner',
    sub: 'Learning together',
    gradient: 'linear-gradient(145deg, #C8E4D4 0%, #98C8AE 55%, #70A888 100%)',
    highlight: 'rgba(255,255,255,.30)',
    /* Two figures side by side — adult + child */
    figure: (
      <svg viewBox="0 0 160 200" fill="none" style={{ width: '78%', height: '78%' }}>
        {/* adult — left, taller */}
        <ellipse cx="58" cy="42" rx="18" ry="20" fill="rgba(0,0,0,.22)"/>
        <path d="M36 68 Q36 86 58 92 Q80 86 80 68 L78 148 Q78 158 58 160 Q38 158 38 148 Z" fill="rgba(0,0,0,.18)"/>
        <path d="M36 74 L16 108" stroke="rgba(0,0,0,.18)" strokeWidth="13" strokeLinecap="round"/>
        <path d="M80 74 L88 102" stroke="rgba(0,0,0,.18)" strokeWidth="13" strokeLinecap="round"/>
        {/* child — right, shorter */}
        <ellipse cx="112" cy="62" rx="14" ry="15" fill="rgba(0,0,0,.20)"/>
        <path d="M94 82 Q94 96 112 100 Q130 96 130 82 L128 148 Q128 155 112 157 Q96 155 96 148 Z" fill="rgba(0,0,0,.16)"/>
        <path d="M94 88 L80 112" stroke="rgba(0,0,0,.16)" strokeWidth="11" strokeLinecap="round"/>
        <path d="M130 88 L144 112" stroke="rgba(0,0,0,.16)" strokeWidth="11" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function PhotoTile({ tile, delay }: { tile: typeof PHOTO_TILES[0]; delay: number }) {
  return (
    <div
      style={{
        borderRadius: '16px', overflow: 'hidden',
        background: tile.gradient,
        aspectRatio: '1 / 1', position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,.06), 0 12px 32px rgba(0,0,0,.10)',
        animation: `ttl-fadein .6s ${delay}ms both`,
        transition: 'transform .22s ease, box-shadow .22s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(0,0,0,.09), 0 20px 48px rgba(0,0,0,.14)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,.06), 0 12px 32px rgba(0,0,0,.10)'
      }}
    >
      {/* Highlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 28% 18%, ${tile.highlight} 0%, transparent 58%)`,
        pointerEvents: 'none',
      }}/>
      {/* Figure */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: '8px',
      }}>
        {tile.figure}
      </div>
      {/* Caption */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.38) 0%, transparent 100%)',
        padding: '36px 14px 14px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.09em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.95)', marginBottom: '2px' }}>
          {tile.label}
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.62)', letterSpacing: '.04em' }}>
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
  return (
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
              Why Talking Makes You<br />
              <span style={{ color: ACCENT }}>Learn Faster</span>
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

            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.72 }}>
              <strong style={{ color: '#0A0F1C', fontWeight: 700 }}>Talk to Learn</strong> brings this method to life with AI that listens, scores, and helps you improve every time you speak.
            </p>
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
  )
}
