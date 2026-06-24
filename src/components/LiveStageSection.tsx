import { useEffect, useRef, useState } from 'react'

const KF = `
@keyframes bob-0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
@keyframes bob-1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
@keyframes bob-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
@keyframes bob-3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1px)} }
@keyframes interrupt-pop { 0%{opacity:0;transform:translateY(10px) scale(0.95)} 15%{opacity:1;transform:translateY(0) scale(1)} 80%{opacity:1} 100%{opacity:0;transform:translateY(-6px)} }
@keyframes spotlight { 0%,100%{opacity:0.6} 50%{opacity:1} }
@keyframes stage-in { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes wave { 0%,100%{transform:scaleY(0.2)} 50%{transform:scaleY(1)} }
@keyframes cta-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(30,77,216,0.5)} 50%{box-shadow:0 0 0 16px rgba(30,77,216,0)} }
`

const SIZES = [
  { label: 'Just Me', value: 0,    emoji: '🧘', desc: 'Solo — pure focus' },
  { label: 'Small',   value: 5,    emoji: '👥', desc: '5 people' },
  { label: 'Room',    value: 25,   emoji: '🏫', desc: '25 people' },
  { label: 'Hall',    value: 100,  emoji: '🎤', desc: '100 people' },
  { label: 'Arena',   value: 1000, emoji: '🏟', desc: '1,000 people' },
]

const MOODS = [
  { value: 'friendly',     emoji: '😊', label: 'Friendly',     colour: '#10B981', bodyCol: '#065F46' },
  { value: 'professional', emoji: '🧐', label: 'Professional', colour: '#3B82F6', bodyCol: '#1E3A5F' },
  { value: 'tough',        emoji: '😤', label: 'Tough',        colour: '#EF4444', bodyCol: '#7F1D1D' },
]

const INTERRUPTS: Record<string, string[]> = {
  friendly:     ['"You\'re doing great! 👏"', '"Can you tell us more?"', '*warm applause*', '"This is brilliant!"'],
  professional: ['"Could you elaborate?"', '*quiet note-taking*', '"Interesting point."', '"Please continue."'],
  tough:        ['"Could you speak up? 🙉"', '"Sorry, what was that?"', '*cough cough*', '📱 phone buzzes loudly', '"Get to the point!"'],
}

type Mood = 'friendly' | 'professional' | 'tough'

function buildSeats(size: number, containerW: number) {
  if (size === 0) return []
  const rows = size <= 5 ? 1 : size <= 25 ? 2 : size <= 100 ? 4 : 6
  const perRow = size <= 5 ? size : size <= 25 ? Math.ceil(size / rows) : 14
  const seats: { x: number; y: number; sz: number; op: number; animIdx: number }[] = []
  for (let r = 0; r < rows; r++) {
    const count = Math.min(perRow + r * 2, 18)
    const sz = Math.max(10, 20 - r * 2)
    const op = Math.max(0.25, 1 - r * 0.13)
    const gap = (containerW - 32) / (count + 1)
    for (let c = 0; c < count; c++) {
      seats.push({ x: 16 + gap * (c + 1) - sz / 2, y: r * 36, sz, op, animIdx: r * 20 + c })
    }
  }
  return seats
}

function Silhouette({ x, y, sz, op, animIdx, bodyCol }: {
  x: number; y: number; sz: number; op: number; animIdx: number; bodyCol: string
}) {
  const dur = 2.4 + (animIdx % 5) * 0.35
  const delay = (animIdx * 0.13) % 3
  return (
    <div style={{
      position: 'absolute', left: x, top: y, opacity: op,
      animation: `bob-${animIdx % 4} ${dur}s ease-in-out ${delay}s infinite`,
      transition: 'left 0.6s ease, top 0.6s ease',
    }}>
      <div style={{ width: sz * 0.65, height: sz * 0.65, borderRadius: '50%', background: '#D97706', margin: '0 auto 1px' }} />
      <div style={{ width: sz, height: sz * 0.85, borderRadius: 3, background: bodyCol, transition: 'background 0.5s ease' }} />
    </div>
  )
}

function WaveBar({ i, active }: { i: number; active: boolean }) {
  return (
    <div style={{
      width: 3, height: 32, borderRadius: 2,
      background: '#1E4DD8', opacity: active ? 0.9 : 0.2,
      margin: '0 2px',
      animation: active ? `wave ${0.4 + i * 0.07}s ease-in-out ${i * 0.04}s infinite` : 'none',
      transformOrigin: 'center',
    }} />
  )
}

export default function LiveStageSection() {
  const [sizeIdx, setSizeIdx] = useState(3)
  const [mood, setMood] = useState<Mood>('professional')
  const [interruptions, setInterruptions] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [interrupt, setInterrupt] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const intRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(560)

  const selected = SIZES[sizeIdx]
  const moodData = MOODS.find(m => m.value === mood)!
  const seats = buildSeats(selected.value, containerW)
  const audienceH = selected.value === 0 ? 0 : Math.max(80, 36 * (seats.length > 0 ? Math.ceil(seats[seats.length - 1].y / 36) + 1 : 1) + 24)

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      setContainerW(entries[0].contentRect.width)
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (speaking) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      clearInterval(timerRef.current!)
    }
    return () => clearInterval(timerRef.current!)
  }, [speaking])

  useEffect(() => {
    if (!speaking || !interruptions || selected.value === 0) {
      clearTimeout(intRef.current!)
      return
    }
    const schedule = () => {
      const delay = (mood === 'tough' ? 4000 : 8000) + Math.random() * 6000
      intRef.current = setTimeout(() => {
        const list = INTERRUPTS[mood]
        setInterrupt(list[Math.floor(Math.random() * list.length)])
        setTimeout(() => { setInterrupt(null); schedule() }, 3500)
      }, delay)
    }
    schedule()
    return () => clearTimeout(intRef.current!)
  }, [speaking, interruptions, mood, selected.value])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <section style={{ background: 'linear-gradient(180deg,#07111F 0%,#0A0F1C 100%)', padding: '100px 20px 120px', overflow: 'hidden' }}>
      <style>{KF}</style>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, animation: 'stage-in .7s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.30)',
            borderRadius: 20, padding: '6px 18px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FDE68A', letterSpacing: '0.08em' }}>🎭 LIVE STAGE — TRY IT NOW</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', fontWeight: 900, color: '#FFF', letterSpacing: '-0.04em', marginBottom: 16, lineHeight: 1.05 }}>
            Practice to a crowd.<br />Build real confidence.
          </h2>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Set your audience, choose their mood, and speak. Your nervous system can't tell the difference.{' '}
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>The confidence you build here is real.</span>
          </p>
        </div>

        {/* Interactive demo card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
        }}>

          {/* Stage area */}
          <div ref={containerRef} style={{
            background: 'linear-gradient(180deg,#0D1526 0%,#080E1C 100%)',
            padding: '36px 16px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', minHeight: 280,
          }}>
            {/* Spotlight */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: '70%',
              background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.055) 0%, transparent 70%)',
              animation: speaking ? 'spotlight 3s ease-in-out infinite' : 'none',
              pointerEvents: 'none',
            }} />

            {/* Audience status bar */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              {selected.value > 0
                ? <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}>
                    {selected.emoji} {selected.value.toLocaleString()} people · {moodData.emoji} {moodData.label}
                    {interruptions ? ' · 🔔 interruptions on' : ''}
                  </div>
                : <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.30)', fontStyle: 'italic' }}>Solo practice — no audience</div>
              }
            </div>

            {/* Audience silhouettes */}
            {seats.length > 0 && (
              <div style={{ position: 'relative', height: audienceH, marginBottom: 16, transition: 'height 0.5s ease' }}>
                {seats.map((s, i) => (
                  <Silhouette key={i} {...s} bodyCol={moodData.bodyCol} />
                ))}
              </div>
            )}

            {/* Interruption bubble */}
            {interrupt && (
              <div style={{
                position: selected.value > 0 ? 'absolute' : 'relative',
                bottom: selected.value > 0 ? 80 : undefined,
                left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(251,191,36,0.14)', border: '1px solid rgba(251,191,36,0.40)',
                borderRadius: 20, padding: '10px 22px', whiteSpace: 'nowrap',
                animation: 'interrupt-pop 3.5s ease forwards',
                zIndex: 10,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#FDE68A' }}>{interrupt}</span>
              </div>
            )}

            {/* Waveform + mic */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: selected.value > 0 ? 0 : 40 }}>
              {/* Waveform */}
              <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                {Array.from({ length: 20 }).map((_, i) => <WaveBar key={i} i={i} active={speaking} />)}
              </div>

              {/* Timer */}
              {speaking && (
                <div style={{ fontSize: 28, fontWeight: 900, color: '#FFF', letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>
                  {fmt(seconds)}
                </div>
              )}

              {/* Mic button */}
              <button
                onClick={() => { setSpeaking(v => !v); if (speaking) setSeconds(0) }}
                style={{
                  width: 72, height: 72, borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 28,
                  background: speaking ? '#DC2626' : '#1E4DD8',
                  boxShadow: speaking ? '0 0 0 0 rgba(220,38,38,0.4)' : '0 8px 32px rgba(30,77,216,0.55)',
                  animation: speaking ? 'cta-pulse 1.5s ease-in-out infinite' : 'none',
                  transition: 'background 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {speaking ? '⏹' : '🎙'}
              </button>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>
                {speaking ? 'TAP TO STOP' : 'TAP TO SPEAK'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding: '32px 28px 36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32 }}>

            {/* Audience size */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 14 }}>AUDIENCE SIZE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SIZES.map((s, i) => (
                  <button key={s.value} onClick={() => setSizeIdx(i)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 14px', borderRadius: 11, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: sizeIdx === i ? 'rgba(30,77,216,0.20)' : 'rgba(255,255,255,0.03)',
                    outline: sizeIdx === i ? '1px solid rgba(30,77,216,0.55)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{ fontSize: 16 }}>{s.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: sizeIdx === i ? 800 : 500, color: sizeIdx === i ? '#FFF' : 'rgba(255,255,255,0.45)' }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto' }}>{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 14 }}>CROWD MOOD</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MOODS.map(m => (
                  <button key={m.value} onClick={() => setMood(m.value as Mood)} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 13, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: mood === m.value ? `${m.colour}18` : 'rgba(255,255,255,0.03)',
                    outline: mood === m.value ? `1px solid ${m.colour}55` : '1px solid transparent',
                    transition: 'all 0.25s ease',
                  }}>
                    <span style={{ fontSize: 22 }}>{m.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: mood === m.value ? '#FFF' : 'rgba(255,255,255,0.45)', marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: mood === m.value ? m.colour : 'rgba(255,255,255,0.25)' }}>
                        {m.value === 'friendly' ? 'Warm and supportive' : m.value === 'professional' ? 'Attentive, neutral' : 'Earn their attention'}
                      </div>
                    </div>
                    {mood === m.value && <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: m.colour }} />}
                  </button>
                ))}
              </div>

              {/* Interruptions toggle */}
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 13, background: 'rgba(255,255,255,0.03)', outline: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF', marginBottom: 2 }}>🔔 Interruptions</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)' }}>Coughs · whispers · phones</div>
                </div>
                <button onClick={() => setInterruptions(v => !v)} style={{
                  width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                  background: interruptions ? '#1E4DD8' : 'rgba(255,255,255,0.12)',
                  position: 'relative', transition: 'background 0.25s ease', flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%',
                    background: '#FFF', transition: 'left 0.25s ease',
                    left: interruptions ? 21 : 3,
                  }} />
                </button>
              </div>
            </div>

          </div>

          {/* CTA footer */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '24px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFF', marginBottom: 4 }}>Ready to take the real stage?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)' }}>Download TalkToLearn and speak to the world.</div>
            </div>
            <a href="#pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 50, textDecoration: 'none',
              background: '#1E4DD8', color: '#FFF', fontWeight: 800, fontSize: 14,
              boxShadow: '0 8px 32px rgba(30,77,216,0.50)',
              animation: 'cta-pulse 2.5s ease-in-out infinite',
            }}>
              🎭 Get TalkToLearn Free
            </a>
          </div>

        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 48 }}>
          {[
            { emoji: '🏟', stat: '1,000', label: 'Max audience size' },
            { emoji: '😤', stat: '3',     label: 'Crowd moods' },
            { emoji: '💬', stat: '∞',     label: 'Interruption types' },
            { emoji: '🧠', stat: '100%',  label: 'Real confidence gained' },
          ].map(s => (
            <div key={s.stat} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '20px 28px', textAlign: 'center', minWidth: 130,
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FFF', marginBottom: 4 }}>{s.stat}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
