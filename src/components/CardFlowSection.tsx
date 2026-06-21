import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'

/* ─── keyframes ─────────────────────────────────────────────────────────── */
const KF = `
@keyframes cf-cursor  { 0%,49%{opacity:1}50%,100%{opacity:0} }
@keyframes cf-bubble  { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
.fc-body::-webkit-scrollbar { width: 4px; }
.fc-body::-webkit-scrollbar-track { background: transparent; }
.fc-body::-webkit-scrollbar-thumb { background: rgba(30,77,216,.18); border-radius: 2px; }
`

/* ─── flow steps ─────────────────────────────────────────────────────────── */
const FLOW_STEPS = [
  { num: '01', title: 'Enter a Subject',      desc: 'Type any topic — maths, science, history, a language, a skill, anything.',              color: '#1E4DD8', bg: '#EEF2FF', glow: 'rgba(30,77,216,0.18)' },
  { num: '02', title: 'Generate a Flashcard', desc: 'The AI instantly builds a comprehensive Flashcard covering all relevant subject matter.', color: '#7C3AED', bg: '#F5F3FF', glow: 'rgba(124,58,237,0.18)' },
  { num: '03', title: 'Learn First',          desc: 'Read the Flashcard. Absorb the concept, the structure, and the depth before you speak or test.', color: '#0891B2', bg: '#ECFEFF', glow: 'rgba(8,145,178,0.18)' },
  { num: '04', title: 'Talk or Test',         desc: 'Prove your understanding — explain it out loud for up to 6 minutes, or answer AI-generated questions.', color: '#059669', bg: '#ECFDF5', glow: 'rgba(5,150,105,0.18)' },
]

/* ─── design tokens ─────────────────────────────────────────────────────── */
const T = {
  bgSurface:     '#F7F9FC',
  bgPanel:       '#FFFFFF',
  borderSoft:    '#E5E9F0',
  textPrimary:   '#0A0F1C',
  textSec:       '#4A5568',
  brandBlue:     '#1E4DD8',
  brandBlueSoft: '#2A5BFF',
}

/* ─── typing bubbles ─────────────────────────────────────────────────────── */
const BUBBLES = [
  { text: 'This is the next generation of Flashcard.', delay: 900 },
  { text: 'Study this card deeply… then choose Talk or Test.', delay: 4800 },
  { text: 'Talk for 2–6 minutes to prove your understanding.', delay: 10000 },
  { text: 'See your clarity, structure, and confidence improve instantly.', delay: 16000 },
]

function TypingBubble({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false)
  const [typed, setTyped]   = useState('')
  const [done, setDone]     = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      let i = 0
      const iv = setInterval(() => {
        i++
        setTyped(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, 30)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity .45s ease, transform .45s cubic-bezier(.34,1.56,.64,1)',
      pointerEvents: 'none',
    }}>
      {/* AI label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
          </svg>
        </div>
        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.08em', color: T.brandBlue, textTransform: 'uppercase' }}>AI</span>
      </div>

      {/* Bubble */}
      <div style={{
        padding: '11px 14px', borderRadius: '4px 14px 14px 14px',
        background: '#FFFFFF', border: '1px solid #E8EDF5',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)',
        fontSize: '13px', lineHeight: 1.55, color: T.textPrimary,
      }}>
        {typed}
        {!done && (
          <span style={{
            display: 'inline-block', width: '2px', height: '13px',
            background: T.brandBlue, verticalAlign: 'text-bottom',
            marginLeft: '1px', borderRadius: '1px',
            animation: 'cf-cursor 1s step-end infinite',
          }} />
        )}
      </div>
    </div>
  )
}

/* ─── micro-primitives ───────────────────────────────────────────────────── */
function SLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: T.brandBlue, marginBottom: '10px' }}>
      {children}
    </p>
  )
}
function SBody({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: '15px', lineHeight: 1.65, color: T.textSec }}>{children}</p>
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

/* ─── icons ──────────────────────────────────────────────────────────────── */
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

/* ─── shadows ────────────────────────────────────────────────────────────── */
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

/* ─── FlashCard ──────────────────────────────────────────────────────────── */
function FlashCard() {
  return (
    <div
      className="text-left transition-all duration-300"
      style={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.08)', background: '#FAFAFA', boxShadow: cardShadow, overflow: 'hidden' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = cardShadowHover }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = cardShadow }}
    >
      {/* Top accent stripe */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${T.brandBlue} 0%, ${T.brandBlueSoft} 55%, #60A5FA 100%)` }} />

      {/* Dark charcoal header */}
      <div style={{ padding: '32px 40px', background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 12px', borderRadius: '50px', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.16)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #34D399', flexShrink: 0 }} />
            <span style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.75)' }}>AI-Generated Flashcard</span>
          </div>
          <span style={{ fontSize: '0.63rem', fontWeight: 600, color: '#34D399', letterSpacing: '0.04em' }}>Generated in 1.2s</span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px', padding: '5px 14px', borderRadius: '50px', background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.30)' }}>
          <BookIcon />
          <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#93C5FD' }}>Business &amp; Management · Year 12</span>
        </div>

        <h3 style={{ fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.12, color: '#FFFFFF', margin: '0 0 10px' }}>
          Break-even Analysis
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
          How businesses calculate their minimum sales target
        </p>
      </div>

      {/* Body — scrollable with bottom fade */}
      <div style={{ position: 'relative' }}>
        <div
          className="fc-body"
          style={{ padding: '36px 40px', background: 'linear-gradient(180deg, #FAFAFA 0%, #F3F3F3 100%)', maxHeight: '420px', overflowY: 'auto' }}
        >
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

          <div style={{ padding: '20px 24px', borderRadius: '14px', background: 'rgba(0,180,90,0.05)', border: '1px solid rgba(0,180,90,0.14)' }}>
            <SLabel>Summary</SLabel>
            <SBody>
              Break-even = Fixed Costs ÷ (Price − Variable Cost). Every unit sold above this point generates profit. Every unit below it represents a loss. It is the foundation of pricing and production decisions.
            </SBody>
          </div>
        </div>

        {/* Bottom fade — signals scrollable depth */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '64px',
          background: 'linear-gradient(to bottom, transparent, #F0F0F0)',
          pointerEvents: 'none',
        }} />
        {/* Bottom shadow line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.06)' }} />
      </div>

      {/* Footer — Talk / Test buttons */}
      <div style={{ display: 'flex', gap: '12px', padding: '24px 40px', background: '#EDEDED', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <button
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', padding: '14px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${T.brandBlue} 0%, ${T.brandBlueSoft} 100%)`, color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(30,77,216,0.32), 0 1px 0 rgba(255,255,255,0.15) inset', transition: 'all 0.2s ease' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 6px 20px rgba(30,77,216,0.45), 0 1px 0 rgba(255,255,255,0.15) inset' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 8px rgba(30,77,216,0.32), 0 1px 0 rgba(255,255,255,0.15) inset' }}
        >
          <MicIcon /> Talk for 2–6 Minutes
        </button>

        <button
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', padding: '14px 24px', borderRadius: '50px', cursor: 'pointer', background: T.bgPanel, border: `1.5px solid ${T.borderSoft}`, color: T.textSec, fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit', boxShadow: '0 1px 4px rgba(10,15,28,0.06)', transition: 'all 0.2s ease' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(-1px)'; el.style.borderColor = T.brandBlue; el.style.color = T.brandBlue; el.style.boxShadow = '0 4px 12px rgba(30,77,216,0.12)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(0)'; el.style.borderColor = T.borderSoft; el.style.color = T.textSec; el.style.boxShadow = '0 1px 4px rgba(10,15,28,0.06)' }}
        >
          <QuizIcon /> Multiple Choice Test
        </button>
      </div>
    </div>
  )
}

/* ─── section ────────────────────────────────────────────────────────────── */
export default function CardFlowSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: `linear-gradient(180deg, ${T.bgSurface} 0%, #EEF2F8 100%)` }}>
      <style>{KF}</style>
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
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-0 mb-20">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flex md:flex-col md:flex-1 md:items-center md:text-center items-start gap-5 md:gap-0 relative md:px-3">
              {i < FLOW_STEPS.length - 1 && (
                <div className="absolute left-[27px] top-[60px] bottom-[-24px] w-px md:hidden" style={{ background: `linear-gradient(to bottom, ${step.color}40, ${FLOW_STEPS[i+1].color}20)` }} />
              )}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden md:flex absolute top-[27px] items-center pointer-events-none" style={{ left: 'calc(50% + 30px)', right: 'calc(-50% + 30px)', zIndex: 1 }}>
                  <div style={{ flex: 1, height: '2px', background: `linear-gradient(to right, ${step.color}50, ${FLOW_STEPS[i+1].color}50)` }} />
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginLeft: '-1px' }}>
                    <path d="M3 7h8M7 3l4 4-4 4" stroke={FLOW_STEPS[i+1].color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                  </svg>
                </div>
              )}
              <div className="flex-shrink-0 md:mx-auto md:mb-5" style={{ width: '56px', height: '56px', minWidth: '56px', borderRadius: '50%', background: step.bg, border: `2px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 6px ${step.glow}, 0 4px 16px ${step.glow}`, position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 900, color: step.color, letterSpacing: '0.02em' }}>{step.num}</span>
              </div>
              <div className="pt-1 md:pt-0">
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: T.textPrimary, marginBottom: '6px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.85rem', color: T.textSec, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flashcard label + card + typing bubbles */}
        <div className="mb-20">
          {/* Label */}
          <div className="text-center mb-8">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '20px', background: 'rgba(30,77,216,.07)', border: '1px solid rgba(30,77,216,.16)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.brandBlue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: T.brandBlue }}>
                Flashcard Example
              </span>
            </div>
          </div>

          {/* Card + bubbles side by side on desktop */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Flashcard */}
            <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: '672px' }}>
              <FlashCard />
            </div>

            {/* Typing bubbles */}
            <div className="flex flex-col gap-4 lg:pt-4" style={{ width: '100%', maxWidth: '260px' }}>
              {BUBBLES.map((b, i) => <TypingBubble key={i} text={b.text} delay={b.delay} />)}
            </div>
          </div>
        </div>

        {/* TALK / TEST explainer cards */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch">

          {/* TALK card */}
          <div className="flex-1 rounded-card p-7 shadow-card" style={{ background: `linear-gradient(180deg, ${T.bgPanel} 0%, #F8FAFD 100%)`, border: `1px solid ${T.borderSoft}` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
                <MicIcon color={T.brandBlue} />
              </div>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: T.brandBlue, marginBottom: '3px' }}>TALK</div>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: T.textPrimary, lineHeight: 1.25, margin: 0 }}>Give a Quick Talk — Build Real Understanding</h3>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              Explain the Flashcard out loud — choose your own duration from{' '}
              <strong className="text-text-dark font-semibold">2 to 6 minutes</strong>.
              The AI listens and scores you across five skills, then delivers your Verbal Mastery Score.
            </p>
            <div className="flex flex-wrap gap-2">
              {['2–6 Minutes', 'Accuracy', 'Depth', 'Clarity', 'Structure', 'Confidence'].map(t => (
                <span key={t} className="text-[0.67rem] font-semibold px-3 py-1 rounded-full"
                  style={{ background: t === '2–6 Minutes' ? '#EEF2FF' : '#F5F7FF', border: t === '2–6 Minutes' ? '1px solid #C7D2FE' : `1px solid ${T.borderSoft}`, color: t === '2–6 Minutes' ? T.brandBlue : T.textSec }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-2 md:py-0 text-xs font-semibold tracking-[0.1em] uppercase text-text-muted">or</div>

          {/* TEST card */}
          <div className="flex-1 rounded-card p-7 shadow-card" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFCF5 100%)', border: '1px solid #EDE5C8' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
                <QuizIcon color="#D97706" />
              </div>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#D97706', marginBottom: '3px' }}>TEST</div>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: T.textPrimary, lineHeight: 1.25, margin: 0 }}>Take a Multiple Choice Test — Check Your Recall</h3>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              The AI generates targeted questions based on your Flashcard — testing recall, application, and real depth.
              Instant feedback on every answer, not just right or wrong.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Multiple Choice', 'Understanding', 'Application', 'Instant Feedback'].map(t => (
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
