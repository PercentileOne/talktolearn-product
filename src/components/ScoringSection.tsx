import PhoneMockup from './PhoneMockup'

const SKILLS = [
  {
    name: 'Accuracy',   score: 87, color: '#1E4DD8', bg: '#EEF2FF',
    desc: 'Did you explain the topic correctly?',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E4DD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    name: 'Depth',      score: 74, color: '#7C3AED', bg: '#F5F3FF',
    desc: 'Did you go beyond the surface?',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    name: 'Clarity',    score: 91, color: '#0891B2', bg: '#ECFEFF',
    desc: 'Did you speak clearly and logically?',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21h6"/><path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.19V17H9v-2.81C7.21 13.16 6 11.22 6 9a6 6 0 0 1 6-6z"/>
      </svg>
    ),
  },
  {
    name: 'Structure',  score: 82, color: '#059669', bg: '#ECFDF5',
    desc: 'Did your explanation flow well?',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    name: 'Confidence', score: 79, color: '#D97706', bg: '#FFFBEB',
    desc: 'Did you sound sure of yourself?',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
]

export default function ScoringSection() {
  return (
    <section className="bg-bg-white py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* Left */}
          <div className="flex-1 text-center md:text-left max-w-lg">
            <span className="section-eyebrow">AI-Powered Analysis</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em] mb-4">
              Five skills.<br />One score.
            </h2>
            <p className="text-[clamp(1rem,2vw,1.15rem)] text-text-muted mb-8 leading-[1.65]">
              Every time you speak, the AI breaks your performance into five dimensions — so you always know exactly what to work on next.
            </p>

            <div className="flex flex-col gap-2.5">
              {SKILLS.map(s => (
                <div key={s.name} style={{
                  display: 'flex', alignItems: 'center', gap: '13px',
                  padding: '12px 15px', borderRadius: '12px',
                  background: '#FAFAFA', border: '1px solid #F0F2F5',
                }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                    background: s.bg, border: `1px solid ${s.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0A0F1C' }}>{s.name}</div>
                    <div style={{ fontSize: '11.5px', color: '#6B7280', lineHeight: 1.4 }}>{s.desc}</div>
                  </div>
                  <div style={{
                    minWidth: '42px', height: '28px', borderRadius: '8px', flexShrink: 0,
                    background: s.bg, border: `1px solid ${s.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 900, color: s.color,
                  }}>
                    {s.score}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-7 text-sm text-text-muted font-semibold italic">We don't guess. We measure.</p>
          </div>

          {/* Right — phone with generous breathing room */}
          <div style={{ flexShrink: 0, padding: '24px 32px', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.10)) drop-shadow(0 24px 48px rgba(0,0,0,0.08))' }}>
            <PhoneMockup variant="scores" />
          </div>

        </div>
      </div>
    </section>
  )
}
