/* ─────────────────────────────────────────────────────────────────────────────
   VideoSection — "Feel the Difference in Confidence in 10 Minutes"
   Option D: 3-Frame Cinematic Sequence  +  3 premium story cards
   ───────────────────────────────────────────────────────────────────────────── */

const KF = `
@keyframes vs-fadein { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
@keyframes vs-bar   { from { width:0; } to { width:var(--w); } }
`

/* ── Person silhouette SVG ─────────────────────────────────────── */
function Silhouette({ tone, speaking = false }: { tone: string; speaking?: boolean }) {
  return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Head */}
      <ellipse cx="50" cy="30" rx="18" ry="20" fill={tone}/>
      {/* Body */}
      <path d="M22 72 Q22 90 50 96 Q78 90 78 72 L76 118 Q76 128 50 130 Q24 128 24 118 Z" fill={tone}/>
      {/* Arms */}
      <path d="M22 76 L6 108" stroke={tone} strokeWidth="14" strokeLinecap="round"/>
      <path d="M78 76 L94 108" stroke={tone} strokeWidth="14" strokeLinecap="round"/>
      {/* Speaking arcs — only on middle frame */}
      {speaking && (
        <>
          <path d="M84 52 Q92 44 84 36" stroke={tone} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".6"/>
          <path d="M89 57 Q101 44 89 31" stroke={tone} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".4"/>
        </>
      )}
    </svg>
  )
}

/* ── Score bar for the "After" frame ──────────────────────────── */
function ScoreBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.65)' }}>{label}</span>
        <span style={{ fontSize: '9px', fontWeight: 800, color }}>{pct}</span>
      </div>
      <div style={{ height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,.12)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '4px', background: color,
          ['--w' as string]: `${pct}%`,
          animation: `vs-bar 1.2s ${delay}ms cubic-bezier(.4,0,.2,1) both`,
        }}/>
      </div>
    </div>
  )
}

/* ── The three cinematic frames ───────────────────────────────── */
const FRAMES = [
  {
    label: 'Before',
    caption: 'Uncertain. Unsure where to start.',
    bg: 'linear-gradient(155deg, #1C2A3A 0%, #0F1A28 100%)',
    silhouetteTone: 'rgba(255,255,255,.16)',
    accent: '#60A5FA',
    pill: { text: 'Thinking…', color: 'rgba(96,165,250,.75)', bg: 'rgba(96,165,250,.10)' },
    content: (
      <div style={{ textAlign: 'center', padding: '16px 0 0' }}>
        <div style={{ width: '60%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {['', '', ''].map((_, i) => (
            <div key={i} style={{
              height: '7px', borderRadius: '4px',
              background: 'rgba(255,255,255,.10)',
              width: i === 1 ? '70%' : i === 2 ? '50%' : '88%',
              marginLeft: i === 1 ? '15%' : i === 2 ? '25%' : '6%',
            }}/>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'During',
    caption: 'Talking. Engaging. Building.',
    bg: 'linear-gradient(155deg, #0E2A1E 0%, #082014 100%)',
    silhouetteTone: 'rgba(59,175,122,.40)',
    accent: '#3BAF7A',
    speaking: true,
    pill: { text: 'AI Listening…', color: 'rgba(59,175,122,.90)', bg: 'rgba(59,175,122,.12)' },
    content: (
      <div style={{ textAlign: 'center', padding: '12px 0 0', display: 'flex', gap: '6px', justifyContent: 'center' }}>
        {[20, 35, 28, 40, 32, 46, 38, 52, 44, 58].map((h, i) => (
          <div key={i} style={{
            width: '5px', borderRadius: '3px', height: `${h}px`,
            background: `rgba(59,175,122,${0.4 + i * 0.055})`,
            animation: `vs-bar ${400 + i * 80}ms ${i * 60}ms ease-in-out both`,
          }}/>
        ))}
      </div>
    ),
  },
  {
    label: 'After',
    caption: 'Confident. Scored. Transformed.',
    bg: 'linear-gradient(155deg, #1A1430 0%, #100C22 100%)',
    silhouetteTone: 'rgba(129,140,248,.35)',
    accent: '#818CF8',
    pill: { text: 'Score: 88/100', color: 'rgba(129,140,248,.90)', bg: 'rgba(129,140,248,.12)' },
    content: (
      <div style={{ padding: '14px 4px 0' }}>
        <ScoreBar label="Clarity"     pct={91} color="#60A5FA" delay={100}/>
        <ScoreBar label="Confidence"  pct={84} color="#818CF8" delay={220}/>
        <ScoreBar label="Accuracy"    pct={88} color="#34D399" delay={340}/>
      </div>
    ),
  },
]

/* ── Story cards ──────────────────────────────────────────────── */
const STORIES = [
  {
    title: 'Your A-ha Moment',
    quote: 'I thought I understood my topic… until I tried explaining it out loud.',
    context: 'Student — First attempt',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21h6"/><path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.19V17H9v-2.81C7.21 13.16 6 11.22 6 9a6 6 0 0 1 6-6z"/>
      </svg>
    ),
  },
  {
    title: "A Parent's Story",
    quote: 'He stood in front of 400 students and delivered the best talk of his life.',
    context: 'Parent — After 3 weeks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'The Professional Edge',
    quote: 'Now I walk into every room with clarity.',
    context: 'Professional — Daily practice',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
]

export default function VideoSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '108px 20px 120px' }}>
      <style>{KF}</style>
      <div className="max-w-[1120px] mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px', marginBottom: '20px',
            border: '1px solid rgba(99,102,241,.22)', background: 'rgba(99,102,241,.06)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6366F1', display: 'inline-block' }}/>
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#6366F1' }}>
              Real Transformation
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
            color: '#0A0F1C', margin: '0 0 14px',
          }}>
            Feel the Difference in Confidence in 10 Minutes
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: '480px', margin: '0 auto' }}>
            Real people. Real confidence. Real transformation.
          </p>
        </div>

        {/* ── 3-Frame Cinematic Sequence ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {FRAMES.map((frame, fi) => (
            <div
              key={frame.label}
              style={{
                borderRadius: '20px', overflow: 'hidden',
                background: frame.bg,
                boxShadow: '0 4px 16px rgba(0,0,0,.14), 0 24px 56px rgba(0,0,0,.18)',
                animation: `vs-fadein .7s ${fi * 120}ms both`,
                transition: 'transform .25s ease, box-shadow .25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.18), 0 32px 72px rgba(0,0,0,.22)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.14), 0 24px 56px rgba(0,0,0,.18)'
              }}
            >
              {/* Top section: silhouette */}
              <div style={{ padding: '32px 28px 0', height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '88px', opacity: .85 }}>
                  <Silhouette tone={frame.silhouetteTone} speaking={'speaking' in frame && frame.speaking}/>
                </div>
              </div>

              {/* Pill badge */}
              <div style={{ padding: '16px 24px 0', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '4px 12px', borderRadius: '20px',
                  background: frame.pill.bg, border: `1px solid ${frame.pill.color}40`,
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: frame.pill.color, display: 'inline-block' }}/>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: frame.pill.color, letterSpacing: '.06em' }}>
                    {frame.pill.text}
                  </span>
                </div>
              </div>

              {/* Dynamic content (dots / waveform / score bars) */}
              <div style={{ padding: '0 24px' }}>
                {frame.content}
              </div>

              {/* Footer label */}
              <div style={{ padding: '20px 24px 28px' }}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: frame.accent, marginBottom: '5px' }}>
                    {frame.label}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)', lineHeight: 1.5 }}>
                    {frame.caption}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Arrow between frames — desktop only ──────────────────── */}
        {/* (handled by gap + visual flow of gradients) */}

        {/* ── Story cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {STORIES.map((s) => (
            <div
              key={s.title}
              style={{
                background: '#FFFFFF', border: '1px solid #E8EDF5',
                borderRadius: '16px', padding: '28px 28px 26px',
                boxShadow: '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)',
                transition: 'transform .22s ease, box-shadow .22s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,.06), 0 16px 40px rgba(0,0,0,.10)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: '#F4F6FA', border: '1px solid #E8EDF5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#6B7280', marginBottom: '18px',
              }}>
                {s.icon}
              </div>

              {/* Context label */}
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#9CA3AF', marginBottom: '8px' }}>
                {s.context}
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0A0F1C', margin: '0 0 12px', lineHeight: 1.3 }}>
                {s.title}
              </h3>

              {/* Quote */}
              <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#6B7280', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
                "{s.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* ── Language line ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', borderTop: '1px solid #F0F2F7', paddingTop: '44px' }}>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#9CA3AF', letterSpacing: '.02em', margin: 0 }}>
            Practice in any language.
          </p>
        </div>

      </div>
    </section>
  )
}
