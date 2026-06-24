const KF = `
@keyframes person-bob-0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
@keyframes person-bob-1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
@keyframes person-bob-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
@keyframes interrupt-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes stage-fade { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
`

const MOODS = [
  { emoji: '😊', label: 'Friendly', colour: '#10B981' },
  { emoji: '🧐', label: 'Professional', colour: '#3B82F6' },
  { emoji: '😤', label: 'Tough', colour: '#EF4444' },
]

const SIZES = ['Just Me', '5 people', '25 people', '100 people', '1,000 people']

const INTERRUPTS = [
  '"Could you speak up? 🙉"',
  '"Sorry, can you repeat that?"',
  '*cough cough*',
  '📱 phone buzzes in row 3',
]

function Silhouette({ x, y, size, animIdx }: { x: number; y: number; size: number; animIdx: number }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      animation: `person-bob-${animIdx % 3} ${2.5 + (animIdx % 4) * 0.4}s ease-in-out ${animIdx * 0.18}s infinite`,
    }}>
      {/* Head */}
      <div style={{
        width: size * 0.7, height: size * 0.7, borderRadius: '50%',
        background: '#D97706', margin: '0 auto', marginBottom: 1,
      }} />
      {/* Body */}
      <div style={{
        width: size, height: size * 0.9, borderRadius: 3,
        background: '#374151',
      }} />
    </div>
  )
}

function AudiencePreview() {
  const rows = [
    { y: 0,   count: 10, size: 18, opacity: 1 },
    { y: 36,  count: 12, size: 14, opacity: 0.85 },
    { y: 66,  count: 14, size: 11, opacity: 0.65 },
    { y: 90,  count: 16, size: 9,  opacity: 0.45 },
    { y: 110, count: 18, size: 7,  opacity: 0.28 },
  ]
  const W = 380
  let idx = 0

  return (
    <div style={{ position: 'relative', width: W, height: 140, margin: '0 auto' }}>
      {rows.map((row, ri) => {
        const spacing = W / (row.count + 1)
        return Array.from({ length: row.count }).map((_, ci) => {
          const el = (
            <div key={`${ri}-${ci}`} style={{ opacity: row.opacity }}>
              <Silhouette
                x={spacing * (ci + 1) - row.size / 2}
                y={row.y}
                size={row.size}
                animIdx={idx}
              />
            </div>
          )
          idx++
          return el
        })
      })}
    </div>
  )
}

export default function LiveStageSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg,#0A0F1C 0%,#0D1526 100%)', padding: '108px 20px 120px', overflow: 'hidden' }}>
      <style>{KF}</style>
      <div className="max-w-[1120px] mx-auto">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, animation: 'stage-fade .7s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.30)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FDE68A', letterSpacing: '0.08em' }}>🎭 NEW FEATURE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', marginBottom: 16, lineHeight: 1.05 }}>
            Live Stage
          </h2>
          <p style={{ fontSize: 'clamp(1rem,2.2vw,1.25rem)', color: 'rgba(255,255,255,0.60)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Practice privately. Perform publicly.{' '}
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>Now practice with the public.</span>
          </p>
        </div>

        {/* Main card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden', marginBottom: 48,
        }}>

          {/* Stage preview */}
          <div style={{
            background: 'linear-gradient(180deg,#111827 0%,#0A0F1C 100%)',
            padding: '40px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
          }}>
            {/* Spotlight effect */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 300, height: 200,
              background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>
                YOUR AUDIENCE
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.50)' }}>
                🏟 1,000 people · 😤 Tough crowd · 🔔 Interruptions on
              </div>
            </div>

            <AudiencePreview />

            {/* Interruption bubble */}
            <div style={{
              margin: '20px auto 0', maxWidth: 300,
              background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.35)',
              borderRadius: 20, padding: '10px 20px', textAlign: 'center',
              animation: 'interrupt-in 0.4s 1.2s ease both',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#FDE68A' }}>
                "Could you speak up? 🙉"
              </span>
            </div>

            {/* Speaker podium */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(30,77,216,0.20)', border: '1px solid rgba(30,77,216,0.40)',
                borderRadius: 50, padding: '10px 24px',
              }}>
                <span style={{ fontSize: 18 }}>🎙</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>You're on stage</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>2:14 remaining</span>
              </div>
            </div>
          </div>

          {/* Controls preview */}
          <div style={{ padding: '32px 28px', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-around' }}>

            {/* Audience size */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.30)', marginBottom: 12 }}>AUDIENCE SIZE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SIZES.map((s, i) => (
                  <div key={s} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '7px 14px', borderRadius: 10,
                    background: i === 4 ? 'rgba(30,77,216,0.18)' : 'transparent',
                    border: `1px solid ${i === 4 ? 'rgba(30,77,216,0.45)' : 'transparent'}`,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: i === 4 ? '#1E4DD8' : 'rgba(255,255,255,0.15)',
                    }} />
                    <span style={{ fontSize: 13, fontWeight: i === 4 ? 800 : 500, color: i === 4 ? '#FFFFFF' : 'rgba(255,255,255,0.40)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.30)', marginBottom: 12 }}>CROWD MOOD</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MOODS.map(m => (
                  <div key={m.label} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 14px', borderRadius: 10,
                    background: m.label === 'Tough' ? `${m.colour}18` : 'transparent',
                    border: `1px solid ${m.label === 'Tough' ? m.colour + '40' : 'transparent'}`,
                  }}>
                    <span style={{ fontSize: 18 }}>{m.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: m.label === 'Tough' ? 800 : 500, color: m.label === 'Tough' ? '#FFFFFF' : 'rgba(255,255,255,0.40)' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interruptions */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.30)', marginBottom: 12 }}>INTERRUPTIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 220 }}>
                {INTERRUPTS.map(i => (
                  <div key={i} style={{
                    padding: '8px 12px', borderRadius: 10,
                    background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.20)',
                    fontSize: 12, color: '#FDE68A', fontStyle: 'italic',
                  }}>{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {[
            { emoji: '🏟', stat: '1,000', label: 'Max audience size' },
            { emoji: '😤', stat: '3', label: 'Crowd moods' },
            { emoji: '💬', stat: '∞', label: 'Interruption types' },
            { emoji: '📤', stat: '1-click', label: 'Share your performance' },
          ].map(s => (
            <div key={s.stat} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '20px 28px', textAlign: 'center', minWidth: 130,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 4 }}>{s.stat}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Science note */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontStyle: 'italic' }}>
            "Your nervous system can't tell the difference between a simulated audience and a real one. The confidence you build here is real."
          </p>
        </div>

      </div>
    </section>
  )
}
