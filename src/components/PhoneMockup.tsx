import { useEffect, useRef, useState } from 'react'

const SCREEN_MS = 3800  // how long each screen shows
const FADE_MS   = 600   // crossfade duration

// ─── Screen 1: Home ───────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <div style={{
      background: '#080E1C', height: '100%', display: 'flex',
      flexDirection: 'column', padding: '52px 12px 10px', fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '8px', background: '#1E4DD8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>🎙</div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#FFFFFF' }}>Learn by Talking</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.30)', borderRadius: '10px', padding: '2px 7px', fontSize: '8px', fontWeight: 800, color: '#FBB024' }}>🔥 7</div>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1E4DD8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900, color: '#FFF' }}>F</div>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.40)', marginBottom: '2px' }}>Good evening</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.3px' }}>What are you learning today?</div>
      </div>

      {/* Input */}
      <div style={{
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(30,77,216,0.60)',
        borderRadius: '12px', padding: '9px 12px', marginBottom: '10px',
        display: 'flex', alignItems: 'center', gap: '7px',
      }}>
        <span style={{ fontSize: '11px' }}>💻</span>
        <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 600 }}>AWS Solutions Architect</span>
        <div style={{ marginLeft: 'auto', background: '#1E4DD8', borderRadius: '6px', padding: '2px 7px', fontSize: '8px', fontWeight: 800, color: '#FFF' }}>Technology</div>
      </div>

      {/* Cert banner */}
      <div style={{
        background: 'rgba(30,77,216,0.12)', border: '1px solid rgba(30,77,216,0.30)',
        borderRadius: '10px', padding: '8px 10px', marginBottom: '10px',
        display: 'flex', alignItems: 'center', gap: '7px',
      }}>
        <span style={{ fontSize: '14px' }}>🏅</span>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, color: '#FFFFFF' }}>Certification Prep</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.38)' }}>AWS · GCSE · CFA · 200+ certs</div>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#60A5FA' }}>→</span>
      </div>

      {/* Study / Talk buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{
          flex: 1, background: '#1E4DD8', borderRadius: '12px',
          padding: '12px 8px', textAlign: 'center',
          boxShadow: '0 4px 14px rgba(30,77,216,0.50)',
        }}>
          <div style={{ fontSize: '14px', marginBottom: '3px' }}>📖</div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: '#FFF' }}>Study</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.55)' }}>Lesson + Test</div>
        </div>
        <div style={{
          flex: 1, background: 'rgba(45,158,106,0.20)', border: '1px solid rgba(45,158,106,0.40)',
          borderRadius: '12px', padding: '12px 8px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', marginBottom: '3px' }}>🎙</div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: '#2D9E6A' }}>Talk</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.40)' }}>Test yourself</div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 2: Certification Card ─────────────────────────────────────────────
function CertScreen() {
  const DOMAINS = [
    { name: 'Secure Architectures', pct: 30, colour: '#DC2626' },
    { name: 'Resilient Architectures', pct: 26, colour: '#D97706' },
    { name: 'High-Performing', pct: 24, colour: '#1E4DD8' },
    { name: 'Cost-Optimised', pct: 20, colour: '#2D9E6A' },
  ]
  return (
    <div style={{
      background: '#080E1C', height: '100%', display: 'flex',
      flexDirection: 'column', padding: '52px 12px 10px', fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
        <div style={{ fontSize: '16px' }}>🟠</div>
        <div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.38)', fontWeight: 700, marginBottom: '2px' }}>AMAZON WEB SERVICES</div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2 }}>AWS Solutions Architect Associate</div>
          <div style={{ display: 'inline-block', marginTop: '4px', background: 'rgba(30,77,216,0.20)', border: '1px solid rgba(30,77,216,0.40)', borderRadius: '10px', padding: '1px 7px', fontSize: '8px', fontWeight: 800, color: '#60A5FA' }}>Associate</div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '10px',
        padding: '8px', marginBottom: '12px', gap: '4px',
      }}>
        {[{ icon: '✅', v: '72%', l: 'Pass Mark' }, { icon: '❓', v: '65', l: 'Questions' }, { icon: '⏱️', v: '130m', l: 'Duration' }, { icon: '💰', v: '£280', l: 'Cost' }].map(s => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '10px', marginBottom: '2px' }}>{s.icon}</div>
            <div style={{ fontSize: '9px', fontWeight: 800, color: '#FFFFFF' }}>{s.v}</div>
            <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.30)' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Domains */}
      <div style={{ fontSize: '7px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.28)', marginBottom: '8px' }}>EXAM DOMAINS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {DOMAINS.map(d => (
          <div key={d.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.70)', fontWeight: 600 }}>{d.name}</span>
              <span style={{ fontSize: '9px', fontWeight: 900, color: d.colour }}>{d.pct}%</span>
            </div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
              <div style={{ width: `${d.pct}%`, height: '100%', borderRadius: '2px', background: d.colour }} />
            </div>
          </div>
        ))}
      </div>

      {/* Deep dive hint */}
      <div style={{
        marginTop: '10px', background: 'rgba(30,77,216,0.12)', borderRadius: '8px',
        padding: '7px 10px', border: '1px solid rgba(30,77,216,0.25)',
        fontSize: '8px', color: 'rgba(255,255,255,0.50)', fontStyle: 'italic',
      }}>
        💡 Tap any concept for Deep Dive · Real-world example · Memory hook · Exam trap
      </div>
    </div>
  )
}

// ─── Screen 3: Lesson Card ─────────────────────────────────────────────────────
function LessonScreen() {
  return (
    <div style={{
      background: '#080E1C', height: '100%', display: 'flex',
      flexDirection: 'column', padding: '52px 12px 10px', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px', fontWeight: 700 }}>AWS SOLUTIONS ARCHITECT · LESSON</div>
      <div style={{ fontSize: '12px', fontWeight: 900, color: '#FFFFFF', marginBottom: '12px', letterSpacing: '-0.3px' }}>Shared Responsibility Model</div>

      {/* Concept card */}
      <div style={{
        background: 'rgba(30,77,216,0.12)', border: '1px solid rgba(30,77,216,0.30)',
        borderLeft: '3px solid #1E4DD8', borderRadius: '10px', padding: '10px', marginBottom: '8px',
      }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.35)', marginBottom: '5px' }}>📖 DEEP DIVE</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>
          AWS secures the infrastructure. <span style={{ color: '#60A5FA', fontWeight: 700 }}>YOU</span> secure everything inside it — your data, IAM policies, network config.
        </div>
      </div>

      {/* Example */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.35)', marginBottom: '5px' }}>💡 REAL-WORLD EXAMPLE</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>The Capital One breach: AWS secured the servers. Capital One misconfigured their IAM role. That was the customer's responsibility.</div>
      </div>

      {/* Memory hook */}
      <div style={{ background: 'rgba(30,77,216,0.10)', borderRadius: '10px', padding: '8px 10px', marginBottom: '8px', border: '1px solid rgba(30,77,216,0.22)' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.35)', marginBottom: '3px' }}>🧠 MEMORY HOOK</div>
        <div style={{ fontSize: '10px', color: '#60A5FA', fontWeight: 700 }}>AWS = security OF the cloud. You = security IN the cloud.</div>
      </div>

      {/* Exam trap */}
      <div style={{ background: 'rgba(220,38,38,0.08)', borderRadius: '10px', padding: '8px 10px', border: '1px solid rgba(220,38,38,0.22)' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(220,38,38,0.70)', marginBottom: '3px' }}>⚠️ EXAM TRAP</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>Lambda: AWS patches the runtime. EC2: YOU patch the OS.</div>
      </div>
    </div>
  )
}

// ─── Screen 4: Talk Test ──────────────────────────────────────────────────────
function TalkScreen({ elapsed }: { elapsed: number }) {
  const CIRCUMFERENCE = 2 * Math.PI * 44
  const progress = Math.min(elapsed / 6000, 1)
  const remaining = Math.max(0, 120 - Math.floor(progress * 120))
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <div style={{
      background: '#080E1C', height: '100%', display: 'flex',
      flexDirection: 'column', alignItems: 'center', padding: '14px 12px 10px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', marginBottom: '4px' }}>TALK TEST</div>
      <div style={{ fontSize: '11px', fontWeight: 900, color: '#FFFFFF', marginBottom: '12px' }}>AWS Solutions Architect</div>

      {/* Ring */}
      <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '10px' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#1E4DD8" strokeWidth="6"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={progress * CIRCUMFERENCE}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px #1E4DD8)' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>{mins}:{secs.toString().padStart(2, '0')}</span>
          <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.40)' }}>remaining</span>
        </div>
      </div>

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px', marginBottom: '12px' }}>
        {[18, 28, 14, 36, 22, 32, 12, 34, 20, 26, 10].map((h, i) => (
          <div key={i} style={{
            width: '3px', borderRadius: '2px', background: '#1E4DD8',
            height: `${h}px`,
            animation: `wave-bar 0.8s ease-in-out ${i * 0.08}s infinite alternate`,
            opacity: 0.7 + (i % 3) * 0.1,
          }} />
        ))}
      </div>

      <div style={{ background: '#1E4DD8', borderRadius: '20px', padding: '9px 24px', fontSize: '11px', fontWeight: 800, color: '#FFF', marginBottom: '8px', boxShadow: '0 4px 14px rgba(30,77,216,0.50)' }}>
        🎙 Speaking…
      </div>
      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.28)' }}>Talk privately. No judgement.</div>
    </div>
  )
}

// ─── Screen 5: MC Results ─────────────────────────────────────────────────────
function ResultsScreen() {
  const SCORES = [
    { label: 'Accuracy',   val: 87, color: '#38BDF8' },
    { label: 'Depth',      val: 74, color: '#818CF8' },
    { label: 'Clarity',    val: 91, color: '#34D399' },
    { label: 'Structure',  val: 82, color: '#FB923C' },
    { label: 'Confidence', val: 78, color: '#F472B6' },
  ]
  return (
    <div style={{
      background: '#080E1C', height: '100%', display: 'flex',
      flexDirection: 'column', alignItems: 'center', padding: '14px 12px 10px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.30)', marginBottom: '8px', marginTop: '10px' }}>YOUR RESULTS</div>

      {/* Score ring */}
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        border: '5px solid #D97706', marginBottom: '6px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(217,119,6,0.40)',
      }}>
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>82</span>
        <span style={{ fontSize: '7px', color: 'rgba(255,255,255,0.40)' }}>VMS</span>
      </div>

      <div style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.35)', borderRadius: '20px', padding: '3px 12px', fontSize: '9px', fontWeight: 800, color: '#F59E0B', marginBottom: '12px' }}>
        ⚡ Excellent  +80 pts
      </div>

      {/* Score bars */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {SCORES.map((s) => (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.60)', fontWeight: 600 }}>{s.label}</span>
              <span style={{ fontSize: '9px', fontWeight: 800, color: s.color }}>{s.val}</span>
            </div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
              <div style={{ width: `${s.val}%`, height: '100%', borderRadius: '2px', background: s.color, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px', fontSize: '9px', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
        📤 Share to LinkedIn · WhatsApp · X
      </div>
    </div>
  )
}

// ─── Cycle controller ─────────────────────────────────────────────────────────
const SCREENS = ['home', 'cert', 'lesson', 'talk', 'results'] as const
type ScreenId = typeof SCREENS[number]

function AnimatedPhone() {
  const [current, setCurrent] = useState<ScreenId>('home')
  const [opacity, setOpacity] = useState(1)
  const [elapsed, setElapsed] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const idx = useRef(0)

  // Animate elapsed for the talk screen ring
  useEffect(() => {
    if (current !== 'talk') return
    startRef.current = performance.now()
    const tick = (now: number) => {
      setElapsed(now - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [current])

  // Cycle screens
  useEffect(() => {
    const t = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => {
        idx.current = (idx.current + 1) % SCREENS.length
        setElapsed(0)
        setCurrent(SCREENS[idx.current])
        setOpacity(1)
      }, FADE_MS)
    }, SCREEN_MS)
    return () => clearTimeout(t)
  }, [current])

  const screen = (() => {
    switch (current) {
      case 'home':    return <HomeScreen />
      case 'cert':    return <CertScreen />
      case 'lesson':  return <LessonScreen />
      case 'talk':    return <TalkScreen elapsed={elapsed} />
      case 'results': return <ResultsScreen />
    }
  })()

  return (
    <div className="pm-screen" style={{ transition: `opacity ${FADE_MS}ms ease`, opacity }}>
      {screen}
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
interface Props {
  variant?: 'timer' | 'scores'
  animated?: boolean
}

export default function PhoneMockup({ animated = false }: Props) {
  return (
    <div className="pm-wrap">
      <div className="pm-ambient" />
      <style>{`
        @keyframes wave-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.0); }
        }
      `}</style>
      <div className="pm-frame">
        <div className="pm-btn pm-btn-vol-up" />
        <div className="pm-btn pm-btn-vol-down" />
        <div className="pm-btn pm-btn-power" />
        <div className="pm-bezel">
          <div className="pm-island" />
          {animated ? <AnimatedPhone /> : <div className="pm-screen"><HomeScreen /></div>}
        </div>
      </div>
    </div>
  )
}
