import { useEffect, useRef, useState } from 'react'

// ─── Drop your D-ID / HeyGen generated video files here ──────────────────────
// Each should be a 5-10s looping MP4 of a person sitting, looking at camera
// Generate at d-id.com or heygen.com (free tier)
const PANELISTS = {
  friendly: [
    { name: 'Sarah Chen',    title: 'Founder & CEO',      video: '', img: 'https://i.pravatar.cc/300?img=47' },
    { name: 'Marcus Reid',   title: 'Partner, Ventures',  video: '', img: 'https://i.pravatar.cc/300?img=11' },
    { name: 'Priya Sharma',  title: 'Chief of Growth',    video: '', img: 'https://i.pravatar.cc/300?img=29' },
  ],
  professional: [
    { name: 'Dr. J. Miller', title: 'Board Director',     video: '', img: 'https://i.pravatar.cc/300?img=53' },
    { name: 'Victoria Cross',title: 'Managing Partner',   video: '', img: 'https://i.pravatar.cc/300?img=44' },
    { name: 'Ahmed Hassan',  title: 'Investment Lead',    video: '', img: 'https://i.pravatar.cc/300?img=12' },
  ],
  tough: [
    { name: 'Lord Warren',   title: 'Chairman',           video: '', img: 'https://i.pravatar.cc/300?img=57' },
    { name: 'Diana Stone',   title: 'Senior Partner',     video: '', img: 'https://i.pravatar.cc/300?img=39' },
    { name: 'R. Blake',      title: 'Chief Examiner',     video: '', img: 'https://i.pravatar.cc/300?img=15' },
  ],
}

const INTERRUPTS: Record<string, string[]> = {
  friendly:     ['"That\'s a great point!"', '"Tell us more about that."', '"I like where this is going..."', '"Can you expand on that?"'],
  professional: ['"Interesting. Continue."', '"Could you elaborate?"', '"What\'s your evidence for that?"', '"Mm. Go on."'],
  tough:        ['"Why should we believe you?"', '"That\'s not good enough."', '"You have 30 seconds to convince me."', '"I\'ve heard this before."', '"Next point. Quickly."'],
}

const MOOD_THEME = {
  friendly:     { bg: '#0A1A0F', border: 'rgba(16,185,129,0.30)', glow: 'rgba(16,185,129,0.12)', label: 'rgba(16,185,129,0.80)', tag: 'FRIENDLY PANEL' },
  professional: { bg: '#0A0F1C', border: 'rgba(59,130,246,0.25)', glow: 'rgba(59,130,246,0.10)', label: 'rgba(59,130,246,0.80)', tag: 'PROFESSIONAL PANEL' },
  tough:        { bg: '#130A0A', border: 'rgba(239,68,68,0.35)',   glow: 'rgba(239,68,68,0.15)',  label: 'rgba(239,68,68,0.85)',  tag: 'TOUGH PANEL' },
}

const KF = `
@keyframes breathe    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.012)} }
@keyframes headsway   { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(-0.6deg)} 66%{transform:rotate(0.5deg)} }
@keyframes leanleft   { 0%,100%{transform:rotate(0deg) translateX(0)} 50%{transform:rotate(-1.2deg) translateX(-2px)} }
@keyframes leanright  { 0%,100%{transform:rotate(0deg) translateX(0)} 50%{transform:rotate(1.2deg) translateX(2px)} }
@keyframes thoughtful { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(-1.5deg) translateY(-1px)} 80%{transform:rotate(0.5deg)} }
@keyframes blink-face { 0%,90%,100%{clip-path:inset(0 0 0 0)} 93%,97%{clip-path:inset(44% 0 44% 0)} }
@keyframes panel-glow { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 32px 4px var(--panel-glow)} }
@keyframes bubble-in  { 0%{opacity:0;transform:translateY(8px) scale(.94)} 12%{opacity:1;transform:translateY(0) scale(1)} 85%{opacity:1} 100%{opacity:0;transform:translateY(-6px)} }
@keyframes vignette-pulse { 0%,100%{opacity:.7} 50%{opacity:1} }
`

type Mood = 'friendly' | 'professional' | 'tough'

const POSES = ['breathe', 'headsway', 'leanleft', 'leanright', 'thoughtful']
const POSE_DUR = [4.5, 5.5, 6.0, 6.2, 7.0]

function PanelistCard({ person, idx, mood, speaking, interrupt }: {
  person: typeof PANELISTS.friendly[0]
  idx: number
  mood: Mood
  speaking: boolean
  interrupt: { text: string; panelistIdx: number } | null
}) {
  const theme = MOOD_THEME[mood]
  const pose  = POSES[idx % POSES.length]
  const dur   = POSE_DUR[idx % POSE_DUR.length]
  const blinkOffset = [0, 2.3, 4.7][idx]
  const isInterrupting = interrupt?.panelistIdx === idx
  const hasVideo = !!person.video

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, position: 'relative' }}>
      {/* Video / photo panel */}
      <div style={{
        width: '100%', aspectRatio: '3/4', maxWidth: 240,
        borderRadius: 16, overflow: 'hidden', position: 'relative',
        border: `1px solid ${isInterrupting ? theme.label : theme.border}`,
        boxShadow: isInterrupting ? `0 0 32px 4px ${theme.glow}` : `0 8px 32px rgba(0,0,0,0.6)`,
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        background: '#0D1117',
      }}>
        {/* Dark vignette corners */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* Dramatic top shadow (like overhead interview lighting) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '20%', zIndex: 2,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Person — video if available, else animated photo */}
        {hasVideo ? (
          <video
            src={person.video} autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            animation: `${pose} ${dur}s ease-in-out infinite`,
            transformOrigin: 'bottom center',
          }}>
            <img
              src={person.img} alt={person.name}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top',
                display: 'block',
                animation: `blink-face ${3.2 + blinkOffset}s ease-in-out ${blinkOffset}s infinite`,
                filter: mood === 'tough' ? 'brightness(0.88) contrast(1.08) saturate(0.7)'
                      : mood === 'professional' ? 'brightness(0.92) saturate(0.85)'
                      : 'brightness(1.02) saturate(0.95)',
                transition: 'filter 0.7s ease',
              }}
            />
          </div>
        )}

        {/* Speaking attention — subtle mood-coloured border flash */}
        {speaking && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3, borderRadius: 16,
            border: `2px solid ${theme.label}`,
            opacity: 0.4, pointerEvents: 'none',
            animation: 'panel-glow 3s ease-in-out infinite',
          }} />
        )}

        {/* LIVE indicator */}
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 4,
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(0,0,0,0.55)', borderRadius: 20, padding: '3px 8px',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: hasVideo ? '#EF4444' : 'rgba(255,255,255,0.3)',
            boxShadow: hasVideo ? '0 0 6px #EF4444' : 'none',
          }} />
          <span style={{ fontSize: 9, fontWeight: 800, color: hasVideo ? '#FCA5A5' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            {hasVideo ? 'LIVE' : 'PHOTO'}
          </span>
        </div>
      </div>

      {/* Speech bubble */}
      {isInterrupting && interrupt && (
        <div style={{
          position: 'absolute', bottom: 72, left: '50%',
          background: 'rgba(0,0,0,0.85)', border: `1px solid ${theme.border}`,
          borderRadius: 14, padding: '9px 16px',
          animation: 'bubble-in 4s ease forwards',
          zIndex: 10, whiteSpace: 'nowrap', maxWidth: 220,
          boxShadow: `0 4px 24px ${theme.glow}`,
        }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#FFF', fontStyle: 'italic', textAlign: 'center' }}>
            {interrupt.text}
          </p>
          {/* Tail */}
          <div style={{
            position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)',
            width: 12, height: 7,
            background: 'rgba(0,0,0,0.85)',
            clipPath: 'polygon(0 0,100% 0,50% 100%)',
          }} />
        </div>
      )}

      {/* Name plate */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 3 }}>{person.name}</div>
        <div style={{ fontSize: 11, color: theme.label, fontWeight: 600 }}>{person.title}</div>
      </div>
    </div>
  )
}

export default function InterviewPanel({ mood, speaking, interruptions }: {
  mood: Mood
  speaking: boolean
  interruptions: boolean
}) {
  const panel     = PANELISTS[mood]
  const theme     = MOOD_THEME[mood]
  const [interrupt, setInterrupt] = useState<{ text: string; panelistIdx: number } | null>(null)
  const intRef    = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!speaking || !interruptions) { clearTimeout(intRef.current!); setInterrupt(null); return }
    const schedule = () => {
      const delay = (mood === 'tough' ? 5000 : 10000) + Math.random() * 8000
      intRef.current = setTimeout(() => {
        const list   = INTERRUPTS[mood]
        const pIdx   = Math.floor(Math.random() * 3)
        setInterrupt({ text: list[Math.floor(Math.random() * list.length)], panelistIdx: pIdx })
        setTimeout(() => { setInterrupt(null); schedule() }, 4200)
      }, delay)
    }
    schedule()
    return () => clearTimeout(intRef.current!)
  }, [speaking, interruptions, mood])

  return (
    <div style={{
      background: theme.bg,
      borderRadius: 20,
      padding: '32px 24px 28px',
      border: `1px solid ${theme.border}`,
      position: 'relative', overflow: 'hidden',
      transition: 'background 0.8s ease, border-color 0.8s ease',
    }}>
      <style>{KF}</style>

      {/* Ambient room glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '50%',
        background: `radial-gradient(ellipse at top, ${theme.glow} 0%, transparent 70%)`,
        pointerEvents: 'none', transition: 'background 0.8s ease',
      }} />

      {/* Panel tag */}
      <div style={{ textAlign: 'center', marginBottom: 24, position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,0,0,0.4)', border: `1px solid ${theme.border}`,
          borderRadius: 20, padding: '5px 14px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: theme.label, boxShadow: `0 0 8px ${theme.label}` }} />
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: theme.label }}>{theme.tag}</span>
        </div>
      </div>

      {/* 3 panelists */}
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', position: 'relative' }}>
        {panel.map((person, i) => (
          <PanelistCard
            key={`${mood}-${i}`}
            person={person} idx={i} mood={mood}
            speaking={speaking} interrupt={interrupt}
          />
        ))}
      </div>

      {/* Bottom table suggestion */}
      <div style={{
        marginTop: 20,
        height: 3, borderRadius: 2,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }} />

      {/* Instruction */}
      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', letterSpacing: '0.05em' }}>
          {speaking
            ? 'They\'re listening. Don\'t stop now.'
            : 'They\'re waiting. Tap the mic when you\'re ready.'}
        </p>
      </div>
    </div>
  )
}
