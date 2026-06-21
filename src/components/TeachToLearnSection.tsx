/* ─────────────────────────────────────────────────────────────────────────────
   TeachToLearnSection
   "Why Talking Makes You Learn Faster"

   Layout:  Left column — text copy with rich typographic treatment
            Right column — 3 staggered insight cards (illustrated, no photos needed)
   ───────────────────────────────────────────────────────────────────────────── */

const YOU_LINES = [
  { text: 'You organise your thoughts.',                            color: '#1E4DD8', bg: '#EEF2FF' },
  { text: 'You connect ideas.',                                     color: '#7C3AED', bg: '#F5F3FF' },
  { text: 'You spot gaps instantly.',                               color: '#D97706', bg: '#FFFBEB' },
  { text: 'You build clarity, confidence, and real understanding.', color: '#059669', bg: '#ECFDF5' },
]

const INSIGHT_CARDS = [
  {
    num: '01',
    headline: 'Teacher Mode',
    body: 'The moment you start explaining, your brain reorganises knowledge — making connections passive reading never triggers.',
    color: '#3BAF7A',
    bg: 'linear-gradient(145deg,#F0FBF5 0%,#E2F5EA 100%)',
    border: 'rgba(59,175,122,.18)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        {/* Simple person speaking */}
        <circle cx="20" cy="14" r="7" fill="#3BAF7A" opacity=".20"/>
        <path d="M8 38 Q8 28 20 28 Q32 28 32 38" fill="#3BAF7A" opacity=".15"/>
        <circle cx="20" cy="14" r="5" fill="#3BAF7A" opacity=".55"/>
        {/* Speech arc */}
        <path d="M30 16 Q36 12 30 8" stroke="#3BAF7A" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".70"/>
        <path d="M33 18 Q42 12 33 6" stroke="#3BAF7A" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".50"/>
        <path d="M36 20 Q48 12 36 4" stroke="#3BAF7A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".30"/>
      </svg>
    ),
  },
  {
    num: '02',
    headline: 'Gap Detection',
    body: 'Gaps in understanding become instantly visible when you try to explain. Silence is feedback. The AI catches what you miss.',
    color: '#1E4DD8',
    bg: 'linear-gradient(145deg,#EEF2FF 0%,#E0E9FF 100%)',
    border: 'rgba(30,77,216,.16)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        {/* Brain / network */}
        <circle cx="24" cy="24" r="14" fill="#1E4DD8" opacity=".10"/>
        <circle cx="24" cy="24" r="3" fill="#1E4DD8" opacity=".60"/>
        <circle cx="14" cy="18" r="2.5" fill="#1E4DD8" opacity=".45"/>
        <circle cx="34" cy="18" r="2.5" fill="#1E4DD8" opacity=".45"/>
        <circle cx="14" cy="30" r="2.5" fill="#1E4DD8" opacity=".40"/>
        <circle cx="34" cy="30" r="2.5" fill="#1E4DD8" opacity=".40"/>
        <circle cx="24" cy="10" r="2" fill="#1E4DD8" opacity=".35"/>
        <circle cx="24" cy="38" r="2" fill="#1E4DD8" opacity=".35"/>
        <line x1="24" y1="24" x2="14" y2="18" stroke="#1E4DD8" strokeWidth="1.2" opacity=".30"/>
        <line x1="24" y1="24" x2="34" y2="18" stroke="#1E4DD8" strokeWidth="1.2" opacity=".30"/>
        <line x1="24" y1="24" x2="14" y2="30" stroke="#1E4DD8" strokeWidth="1.2" opacity=".30"/>
        <line x1="24" y1="24" x2="34" y2="30" stroke="#1E4DD8" strokeWidth="1.2" opacity=".30"/>
        <line x1="24" y1="24" x2="24" y2="10" stroke="#1E4DD8" strokeWidth="1.2" opacity=".30"/>
        <line x1="24" y1="24" x2="24" y2="38" stroke="#1E4DD8" strokeWidth="1.2" opacity=".30"/>
      </svg>
    ),
  },
  {
    num: '03',
    headline: 'Proven Retention',
    body: 'Research shows learners who teach retain up to 90% more than those who only read or listen. Talking is the shortcut.',
    color: '#7C3AED',
    bg: 'linear-gradient(145deg,#F5F3FF 0%,#EDE8FF 100%)',
    border: 'rgba(124,58,237,.15)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        {/* Upward growth / star */}
        <path d="M8 36 L18 24 L24 30 L34 16 L40 22" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".45" fill="none"/>
        <circle cx="40" cy="22" r="4" fill="#7C3AED" opacity=".55"/>
        <path d="M38 8 L39.5 12 L44 12 L40.5 14.5 L42 19 L38 16 L34 19 L35.5 14.5 L32 12 L36.5 12 Z" fill="#7C3AED" opacity=".35"/>
      </svg>
    ),
  },
]

export default function TeachToLearnSection() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #FEFBF3 0%, #F7F9FC 100%)',
      padding: '100px 20px 112px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle decorative arc */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '520px', height: '520px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,175,122,.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1160px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-20 items-start">

          {/* ── Left: text column ─────────────────────────────────── */}
          <div className="flex-1 max-w-[560px]">

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 14px', borderRadius: '20px', marginBottom: '20px',
              background: 'rgba(59,175,122,.10)', border: '1px solid rgba(59,175,122,.22)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3BAF7A', display: 'inline-block', boxShadow: '0 0 6px #3BAF7A' }} />
              <span style={{ fontSize: '0.70rem', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#2E9E6A' }}>
                The Teach to Learn Principle
              </span>
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(1.8rem,4.5vw,2.9rem)',
              fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
              color: '#0A0F1C', margin: '0 0 10px',
            }}>
              Why Talking Makes You<br />
              <span style={{ color: '#3BAF7A' }}>Learn Faster</span>
            </h2>

            {/* Subtitle */}
            <p style={{ fontSize: '15px', color: '#6B7280', fontStyle: 'italic', marginBottom: '32px', lineHeight: 1.6 }}>
              The science behind the Teach to Learn Principle.
            </p>

            {/* Intro paragraph */}
            <p style={{ fontSize: '17px', fontWeight: 500, lineHeight: 1.7, color: '#1A2332', marginBottom: '28px' }}>
              When you explain something out loud, your brain switches into{' '}
              <span style={{ color: '#3BAF7A', fontWeight: 700 }}>'teacher mode'</span>.
            </p>

            {/* The "You..." lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {YOU_LINES.map((line, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '13px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: line.bg, border: `1px solid ${line.color}20`,
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: line.color, flexShrink: 0, boxShadow: `0 0 6px ${line.color}80` }} />
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#1A2332', lineHeight: 1.4 }}>{line.text}</span>
                </div>
              ))}
            </div>

            {/* Principle callout */}
            <div style={{
              padding: '22px 28px', borderRadius: '16px', marginBottom: '24px',
              background: 'linear-gradient(135deg,#0A0F1C,#1A2540)',
              borderLeft: '4px solid #3BAF7A',
            }}>
              <p style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.65, color: '#F0F4FF', margin: 0 }}>
                This is the{' '}
                <span style={{ color: '#6EE7A8', fontWeight: 800 }}>Teach to Learn Principle</span>
                {' '}— one of the most powerful learning methods ever discovered.
              </p>
            </div>

            {/* Closing */}
            <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: 1.7 }}>
              <strong style={{ color: '#0A0F1C', fontWeight: 700 }}>Talk to Learn</strong> brings this method to life with AI that listens, scores, and helps you improve every time you speak.
            </p>

          </div>

          {/* ── Right: insight cards ──────────────────────────────── */}
          <div className="flex-1 w-full" style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {INSIGHT_CARDS.map((card, i) => (
                <div key={i} style={{
                  padding: '28px 32px', borderRadius: '20px',
                  background: card.bg, border: `1px solid ${card.border}`,
                  boxShadow: '0 2px 6px rgba(0,0,0,.04),0 8px 28px rgba(0,0,0,.07)',
                  display: 'flex', alignItems: 'flex-start', gap: '20px',
                  transform: i === 1 ? 'translateX(20px)' : i === 2 ? 'translateX(10px)' : 'translateX(0)',
                  transition: 'transform .3s ease',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px', flexShrink: 0,
                    background: '#FFFFFF', border: `1px solid ${card.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,.06)',
                  }}>
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.14em', color: card.color, textTransform: 'uppercase' as const }}>{card.num}</span>
                      <span style={{ fontSize: '10px', color: `${card.color}60` }}>·</span>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0A0F1C', margin: 0 }}>{card.headline}</h3>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#4A5568', margin: 0 }}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom quote */}
            <div style={{
              marginTop: '20px', padding: '18px 24px', borderRadius: '14px',
              background: 'rgba(255,255,255,.70)', border: '1px solid #E8EDF5',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="#F0FBF5" stroke="rgba(59,175,122,.25)" strokeWidth="1"/>
                <path d="M10 20 Q10 14 14 12 L16 13 Q13 14 13 17 L15 17 L15 22 L10 22 Z" fill="#3BAF7A" opacity=".70"/>
                <path d="M18 20 Q18 14 22 12 L24 13 Q21 14 21 17 L23 17 L23 22 L18 22 Z" fill="#3BAF7A" opacity=".70"/>
              </svg>
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#4A5568', margin: 0, lineHeight: 1.5 }}>
                "The best way to learn something is to teach it." — Richard Feynman
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
