import { useState, useEffect } from 'react'

/* ─── constants ─────────────────────────────────────────────────────────── */
const TYPING_TEXT = 'Break-even Analysis'
const TYPE_MS     = 95

const RING_R    = 54
const RING_CIRC = 2 * Math.PI * RING_R

// How long each phase lasts before auto-advancing (ms)
const PHASE_DUR: Record<number, number> = {
  1: TYPING_TEXT.length * TYPE_MS + 1800,
  2: 6200,
  3: 5000,
  4: 3800,
  5: 7000,
}

const PHASE_LABELS: Record<number, string> = {
  1: 'Enter Subject',
  2: 'Build Flashcard',
  3: 'Learn Mode',
  4: 'Choose Path',
  5: 'Test Mode',
}

/* ─── keyframes ─────────────────────────────────────────────────────────── */
const KF = `
@keyframes iw-cursor   { 0%,49%{opacity:1}50%,100%{opacity:0} }
@keyframes iw-shimmer  { 0%{background-position:-200% 0}100%{background-position:200% 0} }
@keyframes iw-slide-in { from{transform:translateX(32px);opacity:0}to{transform:translateX(0);opacity:1} }
@keyframes iw-slide-up { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
@keyframes iw-fade-up  { from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)} }
@keyframes iw-bounce-in{
  0%  {opacity:0;transform:translateY(20px) scale(.93)}
  58% {opacity:1;transform:translateY(-4px) scale(1.03)}
  78% {transform:translateY(2px) scale(.99)}
  100%{transform:translateY(0) scale(1)}
}
@keyframes iw-btn-tap{
  0%  {transform:scale(1)}
  35% {transform:scale(.91);filter:brightness(1.15)}
  70% {transform:scale(.97)}
  100%{transform:scale(1)}
}
@keyframes iw-pulse-kp { 0%,100%{box-shadow:0 0 0 0 rgba(30,77,216,0)}50%{box-shadow:0 0 0 4px rgba(30,77,216,.10)} }
@keyframes iw-glow-sum { 0%,100%{box-shadow:0 0 0 0 rgba(0,180,90,0)}50%{box-shadow:0 0 8px 2px rgba(0,180,90,.14)} }
@keyframes iw-ring-draw{ from{stroke-dashoffset:${RING_CIRC.toFixed(1)}}to{stroke-dashoffset:${(RING_CIRC*0.28).toFixed(1)}} }
@keyframes iw-bar-fill { from{transform:scaleX(0)}to{transform:scaleX(1)} }
@keyframes iw-wave     { 0%,100%{transform:scaleY(.22)}50%{transform:scaleY(1)} }
@keyframes iw-dot-live { 0%,100%{opacity:1}50%{opacity:.35} }
@keyframes iw-input-glow{
  0%,100%{box-shadow:0 0 0 0 rgba(30,77,216,0);border-color:rgba(255,255,255,.20)}
  50%    {box-shadow:0 0 0 3px rgba(30,77,216,.24);border-color:rgba(96,165,250,.75)}
}
@keyframes iw-progress { from{width:0%}to{width:100%} }
@keyframes iw-icon-pop { from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)} }
`

/* ─── design tokens ─────────────────────────────────────────────────────── */
const FC = {
  text:     '#0A0F1C',
  sub:      '#4A5568',
  border:   '#E5E9F0',
  blue:     '#1E4DD8',
  blueSoft: '#2A5BFF',
}

/* ─── Phase colour map ───────────────────────────────────────────────────── */
const PHASE_COLOR: Record<number, string> = {
  1: '#1E4DD8',
  2: '#7C3AED',
  3: '#0891B2',
  4: '#059669',
  5: '#1E4DD8',
}

/* ════════════════════════════════════════════════════════════════════════════
   ICONS
   ════════════════════════════════════════════════════════════════════════════ */
function IconPencil({ c }: { c: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}
function IconSparkles({ c }: { c: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  )
}
function IconEye({ c }: { c: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
function IconFork({ c }: { c: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="12" cy="6" r="3"/>
      <path d="M6 15V9a6 6 0 0 0 6 6 6 6 0 0 0 6-6v6"/>
    </svg>
  )
}
function IconTimer({ c }: { c: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/>
    </svg>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
   PROGRESS BAR — sits at the very top of the screen
   ════════════════════════════════════════════════════════════════════════════ */
function ProgressBar({ phase }: { phase: number }) {
  const color = PHASE_COLOR[phase]
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,.08)', zIndex: 20 }}>
      <div
        key={`pb-${phase}`}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          borderRadius: '0 2px 2px 0',
          animation: `iw-progress ${PHASE_DUR[phase]}ms linear both`,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 1 — Subject Entry
   ════════════════════════════════════════════════════════════════════════════ */
function Phase1({ text, done }: { text: string; done: boolean }) {
  return (
    <div style={{
      height: '100%', padding: '28px 22px',
      background: 'linear-gradient(170deg,#0C1829 0%,#0E2040 55%,#091424 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '22px',
    }}>
      {/* Icon */}
      <div style={{
        width: '48px', height: '48px', borderRadius: '14px',
        background: 'rgba(30,77,216,.18)', border: '1px solid rgba(30,77,216,.30)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'iw-icon-pop .5s cubic-bezier(.34,1.56,.64,1) both',
      }}>
        <IconPencil c="#60A5FA" />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.16em', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Teach · To · Learn
        </div>
        <div style={{ fontSize: '17px', fontWeight: 800, color: '#FFF', letterSpacing: '-.02em', lineHeight: 1.15 }}>
          What do you want<br />to learn today?
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.38)', marginTop: '7px' }}>
          Enter any subject — we'll build your flashcard.
        </div>
      </div>

      {/* Input */}
      <div style={{ width: '100%', maxWidth: '276px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-8px', left: '11px',
          fontSize: '8.5px', fontWeight: 700, letterSpacing: '.08em',
          color: 'rgba(255,255,255,.45)', background: '#0E2040', padding: '0 5px', textTransform: 'uppercase',
        }}>Subject</div>
        <div style={{
          padding: '12px 14px', boxSizing: 'border-box' as const,
          background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.20)',
          borderRadius: '11px', fontSize: '13.5px', fontWeight: 600, color: '#FFF',
          display: 'flex', alignItems: 'center', minHeight: '44px',
          backdropFilter: 'blur(12px)',
          animation: text.length > 0 ? 'iw-input-glow 2s ease-in-out infinite' : 'none',
        }}>
          <span>{text}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '16px',
            background: '#60A5FA', marginLeft: '1px', borderRadius: '1px',
            animation: 'iw-cursor 1s step-end infinite',
          }} />
        </div>
      </div>

      {/* Status */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '10px', color: 'rgba(255,255,255,.30)',
        opacity: done ? 1 : 0, transition: 'opacity .5s ease',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 6px #60A5FA', display: 'inline-block', animation: 'iw-dot-live 1s ease-in-out infinite' }} />
        Generating your flashcard…
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   BREAK-EVEN FLASHCARD — matches the real CardFlowSection design
   ════════════════════════════════════════════════════════════════════════════ */
const BE_SECTIONS = [
  { label: 'EXPLANATION',    body: 'Break-even analysis identifies the output level where total revenue equals total costs — neither profit nor loss.',
    accent: null, border: null, pulse: null },
  { label: 'KEY POINTS',     body: '• BEP = Fixed Costs ÷ Contribution per unit\n• Contribution = Price − Variable Cost\n• Fixed costs don\'t change with output\n• Variable costs change directly with output',
    accent: 'rgba(59,130,246,.06)', border: 'rgba(59,130,246,.12)', pulse: 'iw-pulse-kp' },
  { label: 'MISCONCEPTIONS', body: 'Break-even ≠ success. It only means costs are covered.\nA lower BEP is generally better.',
    accent: 'rgba(245,158,11,.06)', border: 'rgba(245,158,11,.13)', pulse: null },
  { label: 'SUMMARY',        body: 'BEP = Fixed Costs ÷ (Price − Variable Cost). Every unit above this point generates profit.',
    accent: 'rgba(0,180,90,.05)',   border: 'rgba(0,180,90,.16)',   pulse: 'iw-glow-sum' },
]

function BreakEvenCard({ visibleSections, readMode }: { visibleSections: number; readMode?: boolean }) {
  return (
    <div style={{
      background: '#FAFAFA', borderRadius: '14px',
      border: '1px solid rgba(0,0,0,.07)',
      boxShadow: '0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.08)',
      overflow: 'hidden',
      animation: 'iw-fade-up .5s cubic-bezier(.34,1.56,.64,1) both',
    }}>
      {/* Accent stripe */}
      <div style={{ height: '2.5px', background: 'linear-gradient(90deg,#1E4DD8,#2A5BFF,#60A5FA)' }} />

      {/* Dark header */}
      <div style={{ padding: '14px 16px', background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '3px 9px', borderRadius: '50px',
            background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.16)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 5px #34D399', display: 'inline-block' }} />
            <span style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.70)' }}>AI Flashcard</span>
          </div>
          <span style={{ fontSize: '8px', fontWeight: 600, color: '#34D399' }}>1.2s</span>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '10px',
          padding: '3px 10px', borderRadius: '50px',
          background: 'rgba(96,165,250,.14)', border: '1px solid rgba(96,165,250,.28)',
        }}>
          <span style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase' as const, color: '#93C5FD' }}>Business &amp; Management · Yr 12</span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFF', letterSpacing: '-.02em', marginBottom: '4px' }}>
          Break-even Analysis
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.50)' }}>
          How businesses calculate their minimum sales target
        </div>
      </div>

      {/* Body sections */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'linear-gradient(180deg,#FAFAFA,#F3F3F3)' }}>
        {BE_SECTIONS.map((s, i) => {
          const show = readMode ? true : i < visibleSections
          if (!show) return null
          return (
            <div key={i} style={{
              borderRadius: s.accent ? '9px' : '0',
              padding: s.accent ? '9px 11px' : '0',
              background: readMode && i < visibleSections ? (s.accent || 'rgba(30,77,216,.04)') : (s.accent || 'transparent'),
              border: s.border ? `1px solid ${s.border}` : '1px solid transparent',
              transition: readMode ? 'background .6s ease, border .6s ease' : 'none',
              animation: !readMode ? 'iw-slide-up .4s cubic-bezier(.34,1.56,.64,1) both' : (s.pulse && i < visibleSections ? `${s.pulse} 2.2s ease-in-out infinite` : 'none'),
            }}>
              <div style={{ fontSize: '7px', fontWeight: 800, letterSpacing: '.12em', color: FC.blue, textTransform: 'uppercase' as const, marginBottom: '3px' }}>{s.label}</div>
              <div style={{ fontSize: '10px', color: FC.text, lineHeight: 1.55, whiteSpace: 'pre-line' as const }}>{s.body}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 2 — Flashcard Build
   ════════════════════════════════════════════════════════════════════════════ */
function Phase2({ shimmer, visible }: { shimmer: boolean; visible: number }) {
  return (
    <div style={{
      height: '100%', padding: '12px 12px 10px', overflowY: 'auto',
      background: 'linear-gradient(180deg,#F7F9FC,#EEF2F8)',
    }}>
      {/* Icon header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px', animation: 'iw-fade-up .4s ease both' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(124,58,237,.12)', border: '1px solid rgba(124,58,237,.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'iw-icon-pop .5s cubic-bezier(.34,1.56,.64,1) .1s both' }}>
          <IconSparkles c="#7C3AED" />
        </div>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.12em', color: '#7C3AED', textTransform: 'uppercase' }}>Generating</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: FC.text }}>Building your flashcard…</div>
        </div>
      </div>

      {shimmer ? (
        <div style={{
          height: '280px', borderRadius: '12px',
          background: 'linear-gradient(90deg,#F0F2F5 25%,#E4E8ED 50%,#F0F2F5 75%)',
          backgroundSize: '200% 100%',
          animation: 'iw-shimmer 1.3s ease-in-out infinite',
        }} />
      ) : (
        <BreakEvenCard visibleSections={visible} />
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 3 — Reading / Highlight Mode
   ════════════════════════════════════════════════════════════════════════════ */
function Phase3({ line }: { line: number }) {
  return (
    <div style={{
      height: '100%', padding: '12px 12px 10px', overflowY: 'auto',
      background: 'linear-gradient(180deg,#F7F9FC,#EEF2F8)',
    }}>
      {/* Icon header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px', animation: 'iw-fade-up .4s ease both' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(8,145,178,.12)', border: '1px solid rgba(8,145,178,.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'iw-icon-pop .5s cubic-bezier(.34,1.56,.64,1) .1s both' }}>
          <IconEye c="#0891B2" />
        </div>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.12em', color: '#0891B2', textTransform: 'uppercase' }}>Learn Mode</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: FC.text }}>Reading your flashcard</div>
        </div>
      </div>
      <BreakEvenCard visibleSections={line} readMode />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 4 — Talk or Test
   ════════════════════════════════════════════════════════════════════════════ */
function Phase4({ onAdvance }: { onAdvance: () => void }) {
  const [tapping, setTapping] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setTapping(true)
      setTimeout(onAdvance, 650)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      height: '100%', position: 'relative',
      background: 'linear-gradient(180deg,#F7F9FC,#EEF2F8)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
      padding: '0 18px 28px',
    }}>
      {/* Blurred card behind */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px', right: '12px',
        borderRadius: '14px', overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.08)',
        opacity: .38, filter: 'blur(1.5px)',
        border: '1px solid rgba(0,0,0,.07)', background: '#FAFAFA', height: '52%',
      }}>
        <div style={{ height: '2.5px', background: 'linear-gradient(90deg,#1E4DD8,#2A5BFF)' }} />
        <div style={{ background: '#1E1E1E', padding: '12px 14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFF' }}>Break-even Analysis</div>
        </div>
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {[88,72,82].map((w,i) => <div key={i} style={{ height: '7px', background: '#E5E9F0', borderRadius: '4px', width: `${w}%` }} />)}
        </div>
      </div>

      {/* Gradient lift */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '58%',
        background: 'linear-gradient(0deg,rgba(238,242,248,1) 50%,rgba(238,242,248,0) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Choice UI */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', animation: 'iw-icon-pop .5s cubic-bezier(.34,1.56,.64,1) .2s both' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(5,150,105,.12)', border: '1px solid rgba(5,150,105,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconFork c="#059669" />
          </div>
        </div>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.14em', color: FC.sub, textTransform: 'uppercase', marginBottom: '12px', animation: 'iw-slide-up .5s cubic-bezier(.34,1.56,.64,1) .25s both' }}>
          How do you want to practise?
        </div>
        <div style={{ display: 'flex', gap: '9px', justifyContent: 'center' }}>
          <button style={{
            flex: 1, maxWidth: '118px', padding: '12px 0',
            borderRadius: '50px', border: 'none',
            background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
            color: '#FFF', fontSize: '11.5px', fontWeight: 800, letterSpacing: '.04em',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(30,77,216,.38),inset 0 1px 0 rgba(255,255,255,.15)',
            animation: 'iw-bounce-in .6s cubic-bezier(.34,1.56,.64,1) 300ms both',
          }}>🎙 TALK</button>

          <button style={{
            flex: 1, maxWidth: '118px', padding: '12px 0',
            borderRadius: '50px', border: `2px solid ${FC.blue}`,
            background: tapping ? 'linear-gradient(135deg,#1E4DD8,#2A5BFF)' : 'transparent',
            color: tapping ? '#FFF' : FC.blue,
            fontSize: '11.5px', fontWeight: 800, letterSpacing: '.04em',
            cursor: 'pointer',
            boxShadow: tapping ? '0 4px 16px rgba(30,77,216,.38)' : '0 2px 8px rgba(30,77,216,.12)',
            animation: tapping
              ? 'iw-btn-tap .5s cubic-bezier(.34,1.56,.64,1) both'
              : 'iw-bounce-in .6s cubic-bezier(.34,1.56,.64,1) 440ms both',
            transition: 'background .25s, color .25s, box-shadow .25s',
          }}>📝 TEST</button>
        </div>

        {tapping && (
          <div style={{ marginTop: '10px', fontSize: '9px', color: FC.sub, animation: 'iw-fade-up .3s ease both' }}>
            Starting test mode…
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 5 — Test Mode
   ════════════════════════════════════════════════════════════════════════════ */
const SCORES = [
  { label: 'Accuracy',   val: 87, color: '#60A5FA' },
  { label: 'Depth',      val: 74, color: '#818CF8' },
  { label: 'Clarity',    val: 91, color: '#34D399' },
  { label: 'Structure',  val: 82, color: '#FBBF24' },
  { label: 'Confidence', val: 79, color: '#F87171' },
]
const WAVE_D = [0, 200, 80, 320, 140, 40, 260, 100, 220]

function Phase5() {
  return (
    <div style={{
      height: '100%', background: 'linear-gradient(160deg,#0D1117,#0A0E1A)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '16px 22px', gap: '14px',
    }}>
      {/* Icon header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', animation: 'iw-icon-pop .5s cubic-bezier(.34,1.56,.64,1) .1s both' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(30,77,216,.20)', border: '1px solid rgba(30,77,216,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconTimer c="#60A5FA" />
          </div>
        </div>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.14em', color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', marginBottom: '3px' }}>Test Mode</div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFF', letterSpacing: '-.01em' }}>Break-even Analysis</div>
      </div>

      {/* Timer ring */}
      <div style={{ position: 'relative', width: '126px', height: '126px' }}>
        <svg width="126" height="126" viewBox="0 0 126 126" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="iw-rg2" x1="0" y1="63" x2="126" y2="63" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#1E4DD8" />
            </linearGradient>
          </defs>
          <circle cx="63" cy="63" r={RING_R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
          <circle cx="63" cy="63" r={RING_R} fill="none" stroke="rgba(96,165,250,.25)" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={RING_CIRC} strokeDashoffset={RING_CIRC * 0.28}
            style={{ animation: `iw-ring-draw 6s cubic-bezier(.4,0,.2,1) both` }} />
          <circle cx="63" cy="63" r={RING_R} fill="none" stroke="url(#iw-rg2)" strokeWidth="7"
            strokeLinecap="round" strokeDasharray={RING_CIRC} strokeDashoffset={RING_CIRC * 0.28}
            style={{ animation: `iw-ring-draw 6s cubic-bezier(.4,0,.2,1) both` }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFF', letterSpacing: '-.04em', lineHeight: 1 }}>4:32</div>
          <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,.38)', marginTop: '3px', letterSpacing: '.08em' }}>REMAINING</div>
        </div>
      </div>

      {/* Speaking + waveform */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(30,77,216,.18)', border: '1px solid rgba(30,77,216,.35)',
          borderRadius: '20px', padding: '4px 13px',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 6px #60A5FA', animation: 'iw-cursor 1.2s step-end infinite' }} />
          <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#93C5FD', letterSpacing: '.07em' }}>SPEAKING…</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '26px' }}>
          {WAVE_D.map((d, i) => (
            <div key={i} style={{
              width: '3px', height: '100%', borderRadius: '2px',
              background: `linear-gradient(to top,#1E4DD8,#60A5FA)`,
              transformOrigin: 'center',
              animation: `iw-wave ${.52 + (i % 3) * .18}s ease-in-out ${d}ms infinite`,
            }} />
          ))}
        </div>
      </div>

      {/* Score bars */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {SCORES.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,.48)', width: '54px', textAlign: 'right', flexShrink: 0 }}>{s.label}</span>
            <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,.07)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                width: `${s.val}%`, height: '100%', background: s.color,
                borderRadius: '2px', transformOrigin: 'left',
                animation: `iw-bar-fill 1.1s cubic-bezier(.34,1.56,.64,1) ${i * 120}ms both`,
              }} />
            </div>
            <span style={{ fontSize: '8.5px', fontWeight: 800, color: s.color, width: '20px' }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   IPAD FRAME
   ════════════════════════════════════════════════════════════════════════════ */
const FW = 394; const FH = 570
const BT = 25;  const BS = 17; const BB = 23

function IpadFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative', width: `${FW}px`, height: `${FH}px`, borderRadius: '30px',
      background: `linear-gradient(152deg,#505054 0%,#3C3C40 6%,#2E2E32 14%,#242428 24%,#1C1C20 36%,#1E1E22 48%,#242428 60%,#2C2C30 72%,#3A3A3E 84%,#4A4A4E 93%,#565658 100%)`,
      boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.22),inset 0 -1px 0 rgba(0,0,0,.40),inset 1.5px 0 0 rgba(255,255,255,.14),inset -1.5px 0 0 rgba(0,0,0,.28),0 2px 4px rgba(0,0,0,.22),0 8px 20px rgba(0,0,0,.32),0 28px 56px rgba(0,0,0,.30),0 60px 100px rgba(0,0,0,.18)',
    }}>
      {/* Top chamfer */}
      <div style={{ position: 'absolute', top: '1.5px', left: '30px', right: '30px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.38) 28%,rgba(255,255,255,.52) 50%,rgba(255,255,255,.38) 72%,transparent)', pointerEvents: 'none' }} />
      {/* Buttons */}
      {[60,108,142].map((top,i) => (
        <div key={i} style={{ position: 'absolute', top: `${top}px`, right: '-4px', width: '5px', height: i===0?30:24, borderRadius: '0 3px 3px 0', background: 'linear-gradient(90deg,#1A1A1E,#3E3E42 40%,#2A2A2E)', boxShadow: '2px 0 5px rgba(0,0,0,.45)' }} />
      ))}
      {/* Smart connector */}
      {[0,1,2].map(i => (
        <div key={i} style={{ position: 'absolute', bottom: '9px', left: `${108+i*18}px`, width: '5px', height: '5px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#3A3A3E,#1A1A1C)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.8)' }} />
      ))}
      {/* Camera */}
      <div style={{ position: 'absolute', top: `${BT/2-4}px`, left: '50%', transform: 'translateX(-50%)', width: '7px', height: '7px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#2C2C38,#080810)', boxShadow: '0 0 0 1.5px rgba(255,255,255,.07)' }}>
        <div style={{ position: 'absolute', top: '1px', left: '1.5px', width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,.25)' }} />
      </div>
      {/* Screen */}
      <div style={{
        position: 'absolute', top: `${BT}px`, left: `${BS}px`,
        width: `${FW-BS*2}px`, height: `${FH-BT-BB}px`,
        borderRadius: '16px', background: '#0A0A10', overflow: 'hidden',
        boxShadow: 'inset 0 1.5px 4px rgba(0,0,0,.75),inset 1px 0 4px rgba(0,0,0,.45),inset -1px 0 4px rgba(0,0,0,.45)',
      }}>
        {/* Screen glare */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(135deg,rgba(255,255,255,.05) 0%,transparent 55%)', borderRadius: '16px' }} />
        <div style={{ position: 'relative', height: '100%', zIndex: 1 }}>
          {children}
        </div>
      </div>
      {/* Home bar */}
      <div style={{ position: 'absolute', bottom: `${BB/2-3}px`, left: '50%', transform: 'translateX(-50%)', width: '44px', height: '3.5px', borderRadius: '2px', background: 'rgba(255,255,255,.14)' }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN — IpadWalkthrough
   ════════════════════════════════════════════════════════════════════════════ */
export default function IpadWalkthrough() {
  const [phase,    setPhase]    = useState<1|2|3|4|5>(1)
  const [typed,    setTyped]    = useState('')
  const [typeDone, setTypeDone] = useState(false)
  const [shimmer,  setShimmer]  = useState(false)
  const [visible,  setVisible]  = useState(0)
  const [line,     setLine]     = useState(0)

  const reset = () => {
    setPhase(1); setTyped(''); setTypeDone(false)
    setShimmer(false); setVisible(0); setLine(0)
  }

  /* Phase 1 — typing */
  useEffect(() => {
    if (phase !== 1) return
    let i = 0
    const iv = setInterval(() => {
      i++; setTyped(TYPING_TEXT.slice(0, i))
      if (i >= TYPING_TEXT.length) {
        clearInterval(iv); setTypeDone(true)
        setTimeout(() => { setPhase(2); setShimmer(true) }, 1400)
      }
    }, TYPE_MS)
    return () => clearInterval(iv)
  }, [phase])

  /* Phase 2 — shimmer → build */
  useEffect(() => {
    if (phase !== 2) return
    const t1 = setTimeout(() => {
      setShimmer(false)
      let i = 0
      const iv = setInterval(() => {
        i++; setVisible(i)
        if (i >= BE_SECTIONS.length) { clearInterval(iv); setTimeout(() => setPhase(3), 1600) }
      }, 520)
      return () => clearInterval(iv)
    }, 1000)
    return () => clearTimeout(t1)
  }, [phase])

  /* Phase 3 — progressive highlight */
  useEffect(() => {
    if (phase !== 3) return
    setLine(0); let i = 0
    const iv = setInterval(() => {
      i++; setLine(i)
      if (i >= BE_SECTIONS.length) { clearInterval(iv); setTimeout(() => setPhase(4), 1200) }
    }, 950)
    return () => clearInterval(iv)
  }, [phase])

  /* Phase 4 auto-advance is handled inside Phase4 component via onAdvance */

  /* Phase 5 → loop */
  useEffect(() => {
    if (phase !== 5) return
    const t = setTimeout(reset, 7000)
    return () => clearTimeout(t)
  }, [phase])

  const color = PHASE_COLOR[phase]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <style>{KF}</style>

      <IpadFrame>
        {/* Progress bar — always visible inside screen */}
        <ProgressBar phase={phase} />

        {/* Phase content — keyed so slide-in triggers on every change */}
        <div key={`ph-${phase}`} style={{ height: '100%', animation: 'iw-slide-in .38s cubic-bezier(.25,.46,.45,.94) both' }}>
          {phase === 1 && <Phase1 text={typed} done={typeDone} />}
          {phase === 2 && <Phase2 shimmer={shimmer} visible={visible} />}
          {phase === 3 && <Phase3 line={line} />}
          {phase === 4 && <Phase4 onAdvance={() => setPhase(5)} />}
          {phase === 5 && <Phase5 />}
        </div>
      </IpadFrame>

      {/* Label beneath iPad */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.35)', letterSpacing: '.10em' }}>
            See how it works in 30 seconds
          </span>
        </div>
        <div style={{
          fontSize: '10px', fontWeight: 800, letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: color,
          transition: 'color .4s ease',
        }}>
          Phase {String(phase).padStart(2,'0')} — {PHASE_LABELS[phase]}
        </div>
      </div>

      {/* Phase dots */}
      <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
        {([1,2,3,4,5] as const).map(p => (
          <button key={p} onClick={() => { reset(); setTimeout(() => setPhase(p), 50) }} style={{
            width: p === phase ? '22px' : '7px', height: '7px', borderRadius: '4px',
            border: 'none', padding: 0, cursor: 'pointer',
            background: p === phase ? PHASE_COLOR[p] : 'rgba(255,255,255,.20)',
            boxShadow: p === phase ? `0 0 8px ${PHASE_COLOR[p]}` : 'none',
            transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
          }} />
        ))}
      </div>
    </div>
  )
}
