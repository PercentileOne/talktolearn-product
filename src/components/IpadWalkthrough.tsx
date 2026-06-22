import { useState, useEffect } from 'react'

/* ─── Phase durations ────────────────────────────────────────────────────── */
const PHASE_DUR: Record<number, number> = {
  1: 4200,   // Login
  2: 4000,   // Home
  3: 4500,   // Cert Card
  4: 5000,   // Deep Dive
  5: 4500,   // Talk Test
  6: 5000,   // Results
}

const PHASE_LABELS: Record<number, string> = {
  1: 'Login',
  2: 'Home Screen',
  3: 'Certification Prep',
  4: 'Deep Dive',
  5: 'Talk Test',
  6: 'Results',
}

const PHASE_COLOR: Record<number, string> = {
  1: '#1E4DD8',
  2: '#2D9E6A',
  3: '#D97706',
  4: '#7C3AED',
  5: '#0891B2',
  6: '#D97706',
}

const RING_R    = 54
const RING_CIRC = 2 * Math.PI * RING_R

/* ─── Keyframes ──────────────────────────────────────────────────────────── */
const KF = `
@keyframes iw-cursor   { 0%,49%{opacity:1}50%,100%{opacity:0} }
@keyframes iw-slide-in { from{transform:translateX(32px);opacity:0}to{transform:translateX(0);opacity:1} }
@keyframes iw-fade-up  { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
@keyframes iw-pop      { from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)} }
@keyframes iw-progress { from{width:0%}to{width:100%} }
@keyframes iw-bar-fill { from{transform:scaleX(0)}to{transform:scaleX(1)} }
@keyframes iw-wave     { 0%,100%{transform:scaleY(.22)}50%{transform:scaleY(1)} }
@keyframes iw-ring-draw{ from{stroke-dashoffset:${RING_CIRC.toFixed(1)}}to{stroke-dashoffset:${(RING_CIRC*0.28).toFixed(1)}} }
@keyframes iw-orb-pulse{ 0%,100%{opacity:.55;transform:scale(1)}50%{opacity:.85;transform:scale(1.08)} }
@keyframes iw-glow-pulse{ 0%,100%{box-shadow:0 0 0 0 rgba(30,77,216,0)}50%{box-shadow:0 0 0 5px rgba(30,77,216,.15)} }
@keyframes iw-dot-live { 0%,100%{opacity:1}50%{opacity:.3} }
@keyframes iw-expand   { from{opacity:0;max-height:0;transform:translateY(-6px)}to{opacity:1;max-height:300px;transform:translateY(0)} }
`

/* ─── Progress bar ───────────────────────────────────────────────────────── */
function ProgressBar({ phase }: { phase: number }) {
  const color = PHASE_COLOR[phase]
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,.08)', zIndex: 20 }}>
      <div key={`pb-${phase}`} style={{
        height: '100%',
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        borderRadius: '0 2px 2px 0',
        animation: `iw-progress ${PHASE_DUR[phase]}ms linear both`,
        boxShadow: `0 0 6px ${color}`,
      }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 1 — Login Screen
   ════════════════════════════════════════════════════════════════════════════ */
function Phase1() {
  return (
    <div style={{
      height: '100%', background: '#080E1C', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px 28px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '-60px', left: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,77,216,0.38) 0%,transparent 70%)', animation: 'iw-orb-pulse 3s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(45,158,106,0.28) 0%,transparent 70%)', animation: 'iw-orb-pulse 3.5s ease-in-out 1s infinite', pointerEvents: 'none' }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '28px', animation: 'iw-fade-up .5s ease both' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(30,77,216,.20)', border: '1px solid rgba(30,77,216,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 12px', boxShadow: '0 0 24px rgba(30,77,216,.35)' }}>🎙</div>
        <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.4px', marginBottom: '4px' }}>Learn by Talking</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' as const }}>Talk · Learn · Grow</div>
      </div>

      {/* Toggle pill */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,.06)', borderRadius: '25px', padding: '3px', marginBottom: '20px', animation: 'iw-fade-up .5s .1s ease both' }}>
        {['Sign In', 'Create Account'].map((l, i) => (
          <div key={l} style={{ padding: '7px 16px', borderRadius: '22px', fontSize: '10px', fontWeight: 800, background: i === 0 ? '#1E4DD8' : 'transparent', color: i === 0 ? '#FFF' : 'rgba(255,255,255,.38)', boxShadow: i === 0 ? '0 2px 8px rgba(30,77,216,.45)' : 'none' }}>{l}</div>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', animation: 'iw-fade-up .5s .2s ease both' }}>
        {[{ label: 'Email', value: 'francis@percentile.one', type: 'email' }, { label: 'Password', value: '••••••••••', type: 'password' }].map((f) => (
          <div key={f.label} style={{ background: 'rgba(255,255,255,.06)', border: `1px solid ${f.label === 'Email' ? 'rgba(30,77,216,.60)' : 'rgba(255,255,255,.12)'}`, borderRadius: '12px', padding: '10px 14px', boxShadow: f.label === 'Email' ? '0 0 0 3px rgba(30,77,216,.15)' : 'none' }}>
            <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,.35)', letterSpacing: '1px', marginBottom: '3px', textTransform: 'uppercase' as const }}>{f.label}</div>
            <div style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>{f.value}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ width: '100%', animation: 'iw-pop .5s .35s cubic-bezier(.34,1.56,.64,1) both' }}>
        <div style={{ padding: '13px', borderRadius: '50px', background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)', textAlign: 'center', fontWeight: 800, color: '#FFF', fontSize: '13px', boxShadow: '0 4px 18px rgba(30,77,216,.50)' }}>
          Sign In →
        </div>
      </div>

      {/* Divider */}
      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.28)', marginTop: '14px', letterSpacing: '1.5px', fontWeight: 700 }}>YOUR JOURNEY BEGINS HERE</div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 2 — Home Screen
   ════════════════════════════════════════════════════════════════════════════ */
function Phase2() {
  const [showBadge, setShowBadge] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShowBadge(true), 1200); return () => clearTimeout(t) }, [])

  return (
    <div style={{ height: '100%', background: '#080E1C', display: 'flex', flexDirection: 'column', padding: '18px 18px 14px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-80px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,77,216,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', animation: 'iw-fade-up .4s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '9px', background: '#1E4DD8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '0 3px 10px rgba(30,77,216,.45)' }}>🎙</div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>Learn by Talking</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.30)', borderRadius: '12px', padding: '3px 9px', fontSize: '9px', fontWeight: 800, color: '#FBB024' }}>🔥 7</div>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1E4DD8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#FFF' }}>F</div>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: '16px', animation: 'iw-fade-up .4s .1s ease both' }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.38)', marginBottom: '3px' }}>Good evening, Francis 👋</div>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.4px' }}>What are you learning today?</div>
      </div>

      {/* Input */}
      <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(30,77,216,.60)', borderRadius: '14px', padding: '12px 16px', marginBottom: '10px', animation: 'iw-glow-pulse 2s ease-in-out infinite', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '14px' }}>💻</span>
        <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600, flex: 1 }}>AWS Solutions Architect</span>
        {showBadge && (
          <div style={{ background: 'rgba(30,77,216,.25)', border: '1px solid rgba(30,77,216,.50)', borderRadius: '8px', padding: '3px 9px', fontSize: '9px', fontWeight: 800, color: '#60A5FA', animation: 'iw-pop .4s cubic-bezier(.34,1.56,.64,1) both' }}>Technology</div>
        )}
      </div>

      {/* Cert banner */}
      <div style={{ background: 'rgba(30,77,216,0.12)', border: '1px solid rgba(30,77,216,0.28)', borderRadius: '12px', padding: '10px 14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', animation: 'iw-fade-up .4s .2s ease both' }}>
        <span style={{ fontSize: '18px' }}>🏅</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>Certification Prep</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.38)' }}>AWS · GCSE · A-Level · CFA · 200+ more</div>
        </div>
        <span style={{ fontSize: '14px', color: '#60A5FA' }}>→</span>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', animation: 'iw-fade-up .4s .3s ease both' }}>
        <div style={{ flex: 1, background: '#1E4DD8', borderRadius: '14px', padding: '14px 10px', textAlign: 'center', boxShadow: '0 4px 16px rgba(30,77,216,.50)' }}>
          <div style={{ fontSize: '18px', marginBottom: '4px' }}>📖</div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFF' }}>Study</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.55)', marginTop: '2px' }}>Lesson + Test</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(45,158,106,0.15)', border: '1px solid rgba(45,158,106,0.35)', borderRadius: '14px', padding: '14px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '4px' }}>🎙</div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#2D9E6A' }}>Talk</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.38)', marginTop: '2px' }}>Test yourself</div>
        </div>
      </div>

      {/* Rank strip */}
      <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,.07)', animation: 'iw-fade-up .4s .4s ease both' }}>
        <span style={{ fontSize: '12px' }}>📘</span>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>Learner Rank</span>
        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '62%', height: '100%', background: '#0891B2', borderRadius: '2px' }} />
        </div>
        <span style={{ fontSize: '10px', color: '#60A5FA', fontWeight: 800 }}>1,240 pts</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 3 — Certification Card
   ════════════════════════════════════════════════════════════════════════════ */
const DOMAINS = [
  { name: 'Design Secure Architectures',          pct: 30, colour: '#DC2626', topics: ['IAM', 'VPC security', 'Encryption'] },
  { name: 'Design Resilient Architectures',        pct: 26, colour: '#D97706', topics: ['Multi-AZ', 'Auto Scaling', 'Decoupling'] },
  { name: 'Design High-Performing Architectures',  pct: 24, colour: '#1E4DD8', topics: ['Storage', 'Caching', 'Compute'] },
  { name: 'Design Cost-Optimised Architectures',   pct: 20, colour: '#2D9E6A', topics: ['Reserved', 'S3 tiers', 'Right-sizing'] },
]

function Phase3() {
  const [domainsVisible, setDomainsVisible] = useState(0)
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => { i++; setDomainsVisible(i); if (i >= DOMAINS.length) clearInterval(iv) }, 500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ height: '100%', background: '#080E1C', display: 'flex', flexDirection: 'column', padding: '18px 18px 14px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px', animation: 'iw-fade-up .4s ease both' }}>
        <span style={{ fontSize: '20px' }}>🟠</span>
        <div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.38)', fontWeight: 700, letterSpacing: '1px', marginBottom: '2px' }}>AMAZON WEB SERVICES</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.3px', lineHeight: 1.2 }}>AWS Solutions Architect Associate</div>
          <div style={{ display: 'inline-block', marginTop: '5px', background: 'rgba(30,77,216,.20)', border: '1px solid rgba(30,77,216,.40)', borderRadius: '12px', padding: '2px 10px', fontSize: '9px', fontWeight: 800, color: '#60A5FA' }}>Associate · SAA-C03</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,.05)', borderRadius: '12px', padding: '10px', marginBottom: '14px', animation: 'iw-fade-up .4s .1s ease both' }}>
        {[{ icon: '✅', v: '72%', l: 'Pass Mark' }, { icon: '❓', v: '65', l: 'Questions' }, { icon: '⏱️', v: '130m', l: 'Duration' }, { icon: '💰', v: '£280', l: 'Cost' }].map(s => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '3px' }}>{s.icon}</div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#FFFFFF' }}>{s.v}</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.30)', marginTop: '1px' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Domains */}
      <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,.28)', marginBottom: '10px' }}>EXAM DOMAINS — OFFICIAL WEIGHTINGS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {DOMAINS.map((d, i) => i < domainsVisible && (
          <div key={d.name} style={{ animation: 'iw-fade-up .4s ease both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.75)', fontWeight: 700 }}>{d.name}</span>
              <span style={{ fontSize: '12px', fontWeight: 900, color: d.colour }}>{d.pct}%</span>
            </div>
            <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.07)', overflow: 'hidden', marginBottom: '5px' }}>
              <div style={{ width: `${d.pct}%`, height: '100%', borderRadius: '3px', background: d.colour, transformOrigin: 'left', animation: 'iw-bar-fill .6s cubic-bezier(.34,1.56,.64,1) both' }} />
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {d.topics.map(t => (
                <div key={t} style={{ fontSize: '8px', fontWeight: 700, color: d.colour, background: `${d.colour}15`, border: `1px solid ${d.colour}30`, borderRadius: '8px', padding: '2px 7px' }}>{t}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div style={{ marginTop: 'auto', paddingTop: '10px', background: 'rgba(30,77,216,0.10)', borderRadius: '10px', padding: '8px 12px', border: '1px solid rgba(30,77,216,.22)', fontSize: '9px', color: 'rgba(255,255,255,.45)', fontStyle: 'italic' as const }}>
        💡 Tap any concept → Deep Dive · Example · Memory Hook · Exam Trap
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 4 — Deep Dive
   ════════════════════════════════════════════════════════════════════════════ */
function Phase4() {
  const [expanded, setExpanded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setExpanded(true), 1000); return () => clearTimeout(t) }, [])

  return (
    <div style={{ height: '100%', background: '#080E1C', display: 'flex', flexDirection: 'column', padding: '18px 18px 14px', overflow: 'hidden' }}>
      <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,.28)', marginBottom: '5px' }}>AWS SAA-C03 · KEY CONCEPTS</div>
      <div style={{ fontSize: '14px', fontWeight: 900, color: '#FFFFFF', marginBottom: '14px' }}>Tap to go deeper</div>

      {/* Concept card — expanded */}
      <div style={{ background: 'rgba(30,77,216,0.10)', border: '1px solid rgba(30,77,216,.35)', borderRadius: '14px', padding: '14px', marginBottom: '8px', animation: 'iw-fade-up .4s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: expanded ? '12px' : '0' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🔐</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>Shared Responsibility Model</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.50)', marginTop: '2px' }}>AWS secures the cloud. YOU secure what's in it.</div>
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.28)' }}>{expanded ? '▲' : '▼'}</span>
        </div>

        {expanded && (
          <div style={{ animation: 'iw-fade-up .4s ease both' }}>
            <div style={{ height: '1px', background: 'rgba(30,77,216,.30)', marginBottom: '12px' }} />

            <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,.30)', marginBottom: '6px' }}>📖 DEEP DIVE</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.78)', lineHeight: 1.55, marginBottom: '10px' }}>
              Think of it like renting a flat. The building owner (AWS) handles the foundations and infrastructure. <span style={{ color: '#60A5FA', fontWeight: 700 }}>You</span> handle your locks, your data, and who you give keys to.
            </div>

            <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: '10px', padding: '9px', marginBottom: '8px', border: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,.30)', marginBottom: '4px' }}>💡 REAL-WORLD EXAMPLE</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>The Capital One breach: AWS secured the servers. Capital One misconfigured their IAM role. That was the customer's fault.</div>
            </div>

            <div style={{ background: 'rgba(30,77,216,.12)', borderRadius: '10px', padding: '8px 10px', marginBottom: '8px', border: '1px solid rgba(30,77,216,.25)' }}>
              <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,.30)', marginBottom: '3px' }}>🧠 MEMORY HOOK</div>
              <div style={{ fontSize: '11px', color: '#60A5FA', fontWeight: 700 }}>AWS = security OF the cloud. You = security IN the cloud.</div>
            </div>

            <div style={{ background: 'rgba(220,38,38,.08)', borderRadius: '10px', padding: '8px 10px', border: '1px solid rgba(220,38,38,.22)' }}>
              <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(220,38,38,.70)', marginBottom: '3px' }}>⚠️ EXAM TRAP</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.65)', lineHeight: 1.45 }}>Lambda: AWS patches the runtime. EC2: YOU patch the OS. Know the difference.</div>
            </div>
          </div>
        )}
      </div>

      {/* Other concepts collapsed */}
      {[{ icon: '🌐', title: 'VPC & Networking', sub: 'Public vs private subnets, Security Groups vs NACLs' }, { icon: '⚡', title: 'High Availability vs Fault Tolerance', sub: 'Multi-AZ RDS vs S3 durability' }].map((c, i) => (
        <div key={c.title} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px', padding: '11px 14px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px', animation: `iw-fade-up .4s ${(i + 1) * 0.08}s ease both` }}>
          <span style={{ fontSize: '16px' }}>{c.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF' }}>{c.title}</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.40)', marginTop: '2px' }}>{c.sub}</div>
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.22)' }}>▼</span>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 5 — Talk Test
   ════════════════════════════════════════════════════════════════════════════ */
const WAVE_D = [0, 200, 80, 320, 140, 40, 260, 100, 220, 60, 180]

function Phase5() {
  return (
    <div style={{ height: '100%', background: '#080E1C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '18px 22px', gap: '16px' }}>
      <div style={{ textAlign: 'center', animation: 'iw-fade-up .4s ease both' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,.30)', marginBottom: '4px' }}>TALK TEST</div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#FFFFFF' }}>AWS Solutions Architect</div>
      </div>

      {/* Ring */}
      <div style={{ position: 'relative', width: '130px', height: '130px', animation: 'iw-pop .5s .1s cubic-bezier(.34,1.56,.64,1) both' }}>
        <svg width="130" height="130" viewBox="0 0 126 126" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="iw-rg" x1="0" y1="63" x2="126" y2="63" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#1E4DD8" />
            </linearGradient>
          </defs>
          <circle cx="63" cy="63" r={RING_R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
          <circle cx="63" cy="63" r={RING_R} fill="none" stroke="rgba(96,165,250,.18)" strokeWidth="10" strokeLinecap="round" strokeDasharray={RING_CIRC} strokeDashoffset={RING_CIRC * 0.28} style={{ animation: `iw-ring-draw 5s cubic-bezier(.4,0,.2,1) both` }} />
          <circle cx="63" cy="63" r={RING_R} fill="none" stroke="url(#iw-rg)" strokeWidth="7" strokeLinecap="round" strokeDasharray={RING_CIRC} strokeDashoffset={RING_CIRC * 0.28} style={{ animation: `iw-ring-draw 5s cubic-bezier(.4,0,.2,1) both`, filter: 'drop-shadow(0 0 6px #1E4DD8)' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px', lineHeight: 1 }}>1:28</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.38)', marginTop: '3px', letterSpacing: '1px' }}>REMAINING</div>
        </div>
      </div>

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '30px', animation: 'iw-fade-up .4s .2s ease both' }}>
        {WAVE_D.map((d, i) => (
          <div key={i} style={{ width: '4px', height: '100%', borderRadius: '2px', background: `linear-gradient(to top,#1E4DD8,#60A5FA)`, transformOrigin: 'center', animation: `iw-wave ${.52 + (i % 3) * .18}s ease-in-out ${d}ms infinite` }} />
        ))}
      </div>

      {/* Speaking btn */}
      <div style={{ background: '#1E4DD8', borderRadius: '50px', padding: '12px 32px', fontSize: '13px', fontWeight: 800, color: '#FFF', boxShadow: '0 4px 18px rgba(30,77,216,.55)', display: 'flex', alignItems: 'center', gap: '8px', animation: 'iw-pop .5s .3s cubic-bezier(.34,1.56,.64,1) both' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#BAE6FD', boxShadow: '0 0 6px #BAE6FD', display: 'inline-block', animation: 'iw-dot-live 1s ease-in-out infinite' }} />
        Speaking…
      </div>

      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.25)', letterSpacing: '0.5px' }}>Talk privately. No judgement.</div>

      {/* Live score preview */}
      <div style={{ width: '100%', background: 'rgba(255,255,255,.04)', borderRadius: '12px', padding: '10px 14px', border: '1px solid rgba(255,255,255,.07)', animation: 'iw-fade-up .4s .4s ease both' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,.28)', marginBottom: '8px' }}>LIVE SCORING</div>
        {[{ l: 'Accuracy', v: 87, c: '#38BDF8' }, { l: 'Clarity', v: 91, c: '#34D399' }, { l: 'Depth', v: 74, c: '#818CF8' }].map((s, i) => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: i < 2 ? '5px' : 0 }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,.45)', width: '48px', flexShrink: 0 }}>{s.l}</span>
            <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,.07)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${s.v}%`, height: '100%', background: s.c, borderRadius: '2px', transformOrigin: 'left', animation: `iw-bar-fill 1s cubic-bezier(.34,1.56,.64,1) ${i * 120}ms both` }} />
            </div>
            <span style={{ fontSize: '9px', fontWeight: 800, color: s.c, width: '20px' }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 6 — Results
   ════════════════════════════════════════════════════════════════════════════ */
const ALL_SCORES = [
  { label: 'Accuracy',   val: 87, color: '#38BDF8' },
  { label: 'Depth',      val: 74, color: '#818CF8' },
  { label: 'Clarity',    val: 91, color: '#34D399' },
  { label: 'Structure',  val: 82, color: '#FB923C' },
  { label: 'Confidence', val: 78, color: '#F472B6' },
]

function Phase6() {
  return (
    <div style={{ height: '100%', background: '#080E1C', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px 18px 14px', overflow: 'hidden' }}>
      <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,.28)', marginBottom: '12px', animation: 'iw-fade-up .4s ease both' }}>YOUR RESULTS</div>

      {/* Score ring */}
      <div style={{ width: '88px', height: '88px', borderRadius: '50%', border: '6px solid #D97706', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', boxShadow: '0 0 28px rgba(217,119,6,.45)', animation: 'iw-pop .6s .1s cubic-bezier(.34,1.56,.64,1) both' }}>
        <span style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px', lineHeight: 1 }}>82</span>
        <span style={{ fontSize: '8px', color: 'rgba(255,255,255,.40)', marginTop: '2px' }}>VMS</span>
      </div>

      <div style={{ background: 'rgba(217,119,6,.15)', border: '1px solid rgba(217,119,6,.35)', borderRadius: '20px', padding: '4px 14px', fontSize: '10px', fontWeight: 800, color: '#F59E0B', marginBottom: '16px', animation: 'iw-fade-up .4s .2s ease both' }}>
        ⚡ Excellent · +80 pts earned
      </div>

      {/* Score bars */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '14px' }}>
        {ALL_SCORES.map((s, i) => (
          <div key={s.label} style={{ animation: `iw-fade-up .35s ${i * 0.06}s ease both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>{s.label}</span>
              <span style={{ fontSize: '10px', fontWeight: 800, color: s.color }}>{s.val}</span>
            </div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.07)', overflow: 'hidden' }}>
              <div style={{ width: `${s.val}%`, height: '100%', borderRadius: '2px', background: s.color, transformOrigin: 'left', animation: `iw-bar-fill 1s cubic-bezier(.34,1.56,.64,1) ${i * 100}ms both` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Share */}
      <div style={{ width: '100%', background: 'rgba(30,77,216,.12)', border: '1px solid rgba(30,77,216,.28)', borderRadius: '12px', padding: '10px 14px', animation: 'iw-fade-up .4s .5s ease both' }}>
        <div style={{ fontSize: '10px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>📤 Share your score</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[{ l: 'LinkedIn', c: '#0077B5' }, { l: 'WhatsApp', c: '#25D366' }, { l: 'X', c: '#1DA1F2' }].map(p => (
            <div key={p.l} style={{ flex: 1, padding: '6px 0', borderRadius: '8px', background: `${p.c}22`, border: `1px solid ${p.c}44`, textAlign: 'center', fontSize: '9px', fontWeight: 800, color: p.c }}>{p.l}</div>
          ))}
        </div>
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
      <div style={{ position: 'absolute', top: '1.5px', left: '30px', right: '30px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.38) 28%,rgba(255,255,255,.52) 50%,rgba(255,255,255,.38) 72%,transparent)', pointerEvents: 'none' }} />
      {[60,108,142].map((top,i) => (
        <div key={i} style={{ position: 'absolute', top: `${top}px`, right: '-4px', width: '5px', height: i===0?30:24, borderRadius: '0 3px 3px 0', background: 'linear-gradient(90deg,#1A1A1E,#3E3E42 40%,#2A2A2E)', boxShadow: '2px 0 5px rgba(0,0,0,.45)' }} />
      ))}
      {[0,1,2].map(i => (
        <div key={i} style={{ position: 'absolute', bottom: '9px', left: `${108+i*18}px`, width: '5px', height: '5px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#3A3A3E,#1A1A1C)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.8)' }} />
      ))}
      <div style={{ position: 'absolute', top: `${BT/2-4}px`, left: '50%', transform: 'translateX(-50%)', width: '7px', height: '7px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#2C2C38,#080810)', boxShadow: '0 0 0 1.5px rgba(255,255,255,.07)' }}>
        <div style={{ position: 'absolute', top: '1px', left: '1.5px', width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,.25)' }} />
      </div>
      <div style={{
        position: 'absolute', top: `${BT}px`, left: `${BS}px`,
        width: `${FW-BS*2}px`, height: `${FH-BT-BB}px`,
        borderRadius: '16px', background: '#0A0A10', overflow: 'hidden',
        boxShadow: 'inset 0 1.5px 4px rgba(0,0,0,.75),inset 1px 0 4px rgba(0,0,0,.45),inset -1px 0 4px rgba(0,0,0,.45)',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(135deg,rgba(255,255,255,.05) 0%,transparent 55%)', borderRadius: '16px' }} />
        <div style={{ position: 'relative', height: '100%', zIndex: 1 }}>{children}</div>
      </div>
      <div style={{ position: 'absolute', bottom: `${BB/2-3}px`, left: '50%', transform: 'translateX(-50%)', width: '44px', height: '3.5px', borderRadius: '2px', background: 'rgba(255,255,255,.14)' }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════════════════════ */
export default function IpadWalkthrough() {
  const [phase, setPhase] = useState<1|2|3|4|5|6>(1)

  const reset = () => setPhase(1)
  const next = () => setPhase(p => (p >= 6 ? 1 : (p + 1) as any))

  useEffect(() => {
    const t = setTimeout(next, PHASE_DUR[phase])
    return () => clearTimeout(t)
  }, [phase])

  const color = PHASE_COLOR[phase]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <style>{KF}</style>

      <IpadFrame>
        <ProgressBar phase={phase} />
        <div key={`ph-${phase}`} style={{ height: '100%', animation: 'iw-slide-in .38s cubic-bezier(.25,.46,.45,.94) both' }}>
          {phase === 1 && <Phase1 />}
          {phase === 2 && <Phase2 />}
          {phase === 3 && <Phase3 />}
          {phase === 4 && <Phase4 />}
          {phase === 5 && <Phase5 />}
          {phase === 6 && <Phase6 />}
        </div>
      </IpadFrame>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.35)', letterSpacing: '.10em' }}>The full experience in 30 seconds</span>
        </div>
        <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase' as const, color, transition: 'color .4s ease' }}>
          {String(phase).padStart(2,'0')} — {PHASE_LABELS[phase]}
        </div>
      </div>

      {/* Phase dots */}
      <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
        {([1,2,3,4,5,6] as const).map(p => (
          <button key={p} onClick={() => setPhase(p)} style={{
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
