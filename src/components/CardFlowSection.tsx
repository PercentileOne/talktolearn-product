import type { ReactNode } from 'react'

const FLOW_STEPS = [
  { num: '01', title: 'Enter a Subject',      desc: 'Type any topic — maths, science, history, a language, a skill, anything.' },
  { num: '02', title: 'Generate a Flashcard', desc: 'The AI instantly builds a comprehensive Flashcard covering all relevant subject matter.' },
  { num: '03', title: 'Learn First',          desc: 'Read the Flashcard. Absorb the concept, the structure, and the depth before you speak or test.' },
  { num: '04', title: 'Talk or Test',         desc: 'Prove your understanding — explain it out loud for up to 6 minutes, or answer AI-generated questions.' },
]

/* ── Design tokens — exact spec ─────────────────────────────────────────── */
const T = {
  bgSurface:    '#F7F9FC',
  bgPanel:      '#FFFFFF',
  borderSoft:   '#E5E9F0',
  textPrimary:  '#0A0F1C',
  textSec:      '#4A5568',
  brandBlue:    '#1E4DD8',
  brandBlueSoft:'#2A5BFF',
}

/* ── Micro-primitives ────────────────────────────────────────────────────── */

function SLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: '0.65rem', fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase' as const,
      color: T.brandBlue, marginBottom: '10px',
    }}>
      {children}
    </p>
  )
}

function SBody({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: '15px', lineHeight: 1.65, color: T.textSec }}>
      {children}
    </p>
  )
}

function SDivider() {
  return <div style={{ borderTop: `1px solid ${T.borderSoft}`, marginTop: '24px', paddingTop: '24px' }} />
}

function SBullets({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map(item => (
        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', lineHeight: 1.65, color: T.textSec }}>
          <span style={{ marginTop: '9px', width: '5px', height: '5px', borderRadius: '50%', background: T.brandBlue, opacity: 0.4, flexShrink: 0 }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ── Lucide-style SVG icons ──────────────────────────────────────────────── */

function MicIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  )
}

function QuizIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  )
}

/* ── FlashCard ───────────────────────────────────────────────────────────── */

const cardShadow = [
  '0 1px 0 rgba(255,255,255,0.6) inset',
  '0 2px 4px rgba(0,0,0,0.04)',
  '0 8px 24px rgba(0,0,0,0.08)',
  '0 24px 64px rgba(0,0,0,0.07)',
].join(', ')

const cardShadowHover = [
  '0 1px 0 rgba(255,255,255,0.6) inset',
  '0 4px 8px rgba(0,0,0,0.06)',
  '0 16px 40px rgba(0,0,0,0.11)',
  '0 40px 80px rgba(0,0,0,0.10)',
].join(', ')

function FlashCard() {
  return (
    <div
      className="text-left max-w-2xl mx-auto transition-all duration-300"
      style={{
        borderRadius: '24px',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#FAFAFA',
        boxShadow: cardShadow,
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = cardShadowHover
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = cardShadow
      }}
    >

      {/* Top accent stripe */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, ${T.brandBlue} 0%, ${T.brandBlueSoft} 55%, #60A5FA 100%)`,
      }} />

      {/* ── Header zone — dark charcoal ─────────────────── */}
      <div style={{
        padding: '32px 40px',
        background: '#1E1E1E',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* AI generation badge + timer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '5px 12px', borderRadius: '50px',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.16)',
          }}>
            <span className="ai-pulse" style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#10B981', boxShadow: '0 0 6px #34D399', flexShrink: 0 as const,
            }} />
            <span style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.75)' }}>
              AI-Generated Flashcard
            </span>
          </div>
          <span style={{ fontSize: '0.63rem', fontWeight: 600, color: '#34D399', letterSpacing: '0.04em' }}>
            Generated in 1.2s
          </span>
        </div>

        {/* Subject badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px',
          padding: '5px 14px', borderRadius: '50px',
          background: 'rgba(96,165,250,0.15)',
          border: '1px solid rgba(96,165,250,0.30)',
        }}>
          <BookIcon />
          <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#93C5FD' }}>
            Business &amp; Management · Year 12
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.3px',
          lineHeight: 1.12, color: '#FFFFFF', margin: '0 0 10px',
        }}>
          Break-even Analysis
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
          How businesses calculate their minimum sales target
        </p>
      </div>

      {/* ── Body ────────────────────────────────────────── */}
      <div style={{ padding: '36px 40px', background: 'linear-gradient(180deg, #FAFAFA 0%, #F3F3F3 100%)' }}>

        <div>
          <SLabel>Explanation</SLabel>
          <SBody>
            Break-even analysis identifies the level of output at which total revenue exactly equals total costs — the point at which a business makes neither a profit nor a loss.
          </SBody>
        </div>

        <SDivider />

        <div style={{ background: 'rgba(59,130,246,0.06)', borderRadius: '12px', padding: '16px 18px', margin: '0 -18px', border: '1px solid rgba(59,130,246,0.10)' }}>
          <SLabel>Key Points</SLabel>
          <SBullets items={[
            'Break-even point = Fixed Costs ÷ Contribution per unit',
            'Contribution per unit = Selling Price − Variable Cost per unit',
            'Fixed costs do not change with output (e.g. rent, salaries)',
            'Variable costs change directly with output (e.g. raw materials)',
          ]} />
        </div>

        <SDivider />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          <div>
            <SLabel>Example</SLabel>
            <SBody>Fixed costs £20,000 · Price £50 · Variable cost £30 → Contribution £20 → Break-even = 1,000 units.</SBody>
          </div>
          <div style={{ background: 'rgba(139,92,246,0.05)', borderRadius: '10px', padding: '14px 16px', margin: '0 -16px', border: '1px solid rgba(139,92,246,0.10)' }}>
            <SLabel>Structure</SLabel>
            <SBody>Revenue line vs Total Cost line. Their intersection = break-even point. Above: profit zone. Below: loss zone.</SBody>
          </div>
        </div>

        <SDivider />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          <div style={{ background: 'rgba(245,158,11,0.06)', borderRadius: '10px', padding: '14px 16px', margin: '0 -16px', border: '1px solid rgba(245,158,11,0.12)' }}>
            <SLabel>Misconceptions</SLabel>
            <SBullets items={[
              'Break-even ≠ success — it only means costs are covered',
              'A lower break-even point is generally better, not worse',
            ]} />
          </div>
          <div style={{ background: 'rgba(16,185,129,0.05)', borderRadius: '10px', padding: '14px 16px', margin: '0 -16px', border: '1px solid rgba(16,185,129,0.10)' }}>
            <SLabel>Breakdown</SLabel>
            <SBullets items={[
              'Step 1: Calculate contribution per unit',
              'Step 2: Divide fixed costs by contribution',
              'Step 3: Plot on a break-even chart',
            ]} />
          </div>
        </div>

        <SDivider />

        {/* Summary panel */}
        <div style={{
          padding: '20px 24px', borderRadius: '14px',
          background: 'rgba(0,180,90,0.05)',
          border: '1px solid rgba(0,180,90,0.14)',
        }}>
          <SLabel>Summary</SLabel>
          <SBody>
            Break-even = Fixed Costs ÷ (Price − Variable Cost). Every unit sold above this point generates profit. Every unit below it represents a loss. It is the foundation of pricing and production decisions.
          </SBody>
        </div>

      </div>

      {/* ── Talk / Test footer ──────────────────────────── */}
      <div style={{
        display: 'flex', gap: '12px',
        padding: '24px 40px',
        background: '#EDEDED',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}>
        <button
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
            padding: '14px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${T.brandBlue} 0%, ${T.brandBlueSoft} 100%)`,
            color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit',
            boxShadow: '0 2px 8px rgba(30,77,216,0.32), 0 1px 0 rgba(255,255,255,0.15) inset',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 6px 20px rgba(30,77,216,0.45), 0 1px 0 rgba(255,255,255,0.15) inset'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 2px 8px rgba(30,77,216,0.32), 0 1px 0 rgba(255,255,255,0.15) inset'
          }}
        >
          <MicIcon /> Talk · 2–6 min
        </button>

        <button
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
            padding: '14px 24px', borderRadius: '50px', cursor: 'pointer',
            background: T.bgPanel, border: `1.5px solid ${T.borderSoft}`,
            color: T.textSec, fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit',
            boxShadow: '0 1px 4px rgba(10,15,28,0.06)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'translateY(-1px)'
            el.style.borderColor = T.brandBlue
            el.style.color = T.brandBlue
            el.style.boxShadow = '0 4px 12px rgba(30,77,216,0.12)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'translateY(0)'
            el.style.borderColor = T.borderSoft
            el.style.color = T.textSec
            el.style.boxShadow = '0 1px 4px rgba(10,15,28,0.06)'
          }}
        >
          <QuizIcon /> Test · Instant Results
        </button>
      </div>

    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export default function CardFlowSection() {
  return (
    /* Warm off-white surface — the Flashcard floats above this via layered shadows */
    <section
      className="py-16 md:py-24"
      style={{ background: `linear-gradient(180deg, ${T.bgSurface} 0%, #EEF2F8 100%)` }}
    >
      <div className="max-w-[1160px] mx-auto px-5">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em] mt-1 mb-4">
            The Flashcard — Your Learning Unit
          </h2>
          <p className="text-[clamp(1rem,2vw,1.15rem)] text-text-muted max-w-2xl mx-auto">
            Enter any subject and the AI generates a comprehensive Flashcard instantly. Then prove you know it: Talk or Test.
          </p>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col md:flex-row gap-0 mb-16">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num}
                 className="flex md:flex-col md:flex-1 md:items-center md:text-center items-start gap-5 md:gap-0 relative pb-9 md:pb-0 md:px-4">
              {i < FLOW_STEPS.length - 1 && (
                <div className="absolute left-[14px] top-8 bottom-0 w-px bg-gradient-to-b from-primary/25 to-transparent md:hidden" />
              )}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden md:block absolute h-px top-[18px] bg-gradient-to-r from-primary/25 to-transparent"
                     style={{ left: 'calc(50% + 22px)', right: 'calc(-50% + 22px)' }} />
              )}
              <div className="w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center text-[0.68rem] font-black md:mx-auto md:mb-4 shadow-card"
                   style={{ background: T.bgPanel, border: `1px solid ${T.borderSoft}`, color: T.brandBlue }}>
                {step.num}
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-text-dark mb-1.5">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The Flashcard */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span style={{
              display: 'inline-block',
              fontSize: '0.65rem', fontWeight: 800,
              letterSpacing: '0.18em', textTransform: 'uppercase' as const,
              color: T.brandBlue,
              borderBottom: `2px solid ${T.brandBlue}`,
              paddingBottom: '4px',
            }}>
              Flashcard Example
            </span>
          </div>
          <FlashCard />
        </div>

        {/* TALK / TEST explainer cards */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch">

          <div className="flex-1 rounded-card p-7 shadow-card"
               style={{
                 background: `linear-gradient(180deg, ${T.bgPanel} 0%, #F8FAFD 100%)`,
                 border: `1px solid ${T.borderSoft}`,
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                   style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
                <MicIcon color={T.brandBlue} />
              </div>
              <span className="text-base font-extrabold tracking-[0.05em] text-text-dark">TALK</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              Explain the Flashcard out loud — choose your own duration from{' '}
              <strong className="text-text-dark font-semibold">2 to 6 minutes</strong>.
              The AI listens and scores you across five skills, then delivers your Verbal Mastery Score.
            </p>
            <div className="flex flex-wrap gap-2">
              {['2–6 Minutes', 'Accuracy', 'Depth', 'Clarity', 'Structure', 'Confidence'].map(t => (
                <span key={t} className="text-[0.67rem] font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: t === '2–6 Minutes' ? '#EEF2FF' : '#F5F7FF',
                        border: t === '2–6 Minutes' ? '1px solid #C7D2FE' : `1px solid ${T.borderSoft}`,
                        color: t === '2–6 Minutes' ? T.brandBlue : T.textSec,
                      }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-2 md:py-0 text-xs font-semibold tracking-[0.1em] uppercase text-text-muted">
            or
          </div>

          <div className="flex-1 rounded-card p-7 shadow-card"
               style={{
                 background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFCF5 100%)',
                 border: '1px solid #EDE5C8',
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                   style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
                <QuizIcon color="#D97706" />
              </div>
              <span className="text-base font-extrabold tracking-[0.05em] text-text-dark">TEST</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              The AI generates targeted questions based on your Flashcard — testing recall, application, and real depth.
              Instant feedback on every answer, not just right or wrong.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Understanding', 'Application', 'Recall', 'Instant Feedback'].map(t => (
                <span key={t} className="text-[0.67rem] font-semibold px-3 py-1 rounded-full"
                      style={{ background: '#FEF9EC', border: '1px solid #FDE68A', color: '#92400E' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
