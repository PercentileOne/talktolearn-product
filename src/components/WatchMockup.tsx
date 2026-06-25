import { useEffect, useState } from 'react'

const SCREEN_MS = 3800
const FADE_MS   = 600

const ANIM = `
@keyframes watch-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
@keyframes watch-bar-0 { 0%,100% { transform:scaleY(.35); } 50% { transform:scaleY(1);   } }
@keyframes watch-bar-1 { 0%,100% { transform:scaleY(.5);  } 50% { transform:scaleY(.9);  } }
@keyframes watch-bar-2 { 0%,100% { transform:scaleY(.6);  } 50% { transform:scaleY(1);   } }
@keyframes watch-bar-3 { 0%,100% { transform:scaleY(.3);  } 50% { transform:scaleY(.85); } }
@keyframes watch-bar-4 { 0%,100% { transform:scaleY(.7);  } 50% { transform:scaleY(1);   } }
@keyframes watch-bar-5 { 0%,100% { transform:scaleY(.45); } 50% { transform:scaleY(.95); } }
@keyframes watch-bar-6 { 0%,100% { transform:scaleY(.55); } 50% { transform:scaleY(1);   } }
@keyframes watch-bar-7 { 0%,100% { transform:scaleY(.4);  } 50% { transform:scaleY(.8);  } }
`

// ── Screen 1: Speaking ────────────────────────────────────────────────────────
function TalkScreen() {
  const CIRC = 2 * Math.PI * 13
  const delays = [0, 0.15, 0.07, 0.22, 0.1, 0.18, 0.05, 0.2]
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:4, padding:'2px 4px' }}>
      {/* Ring */}
      <div style={{ position:'relative', width:28, height:28 }}>
        <svg viewBox="0 0 30 30" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <circle cx="15" cy="15" r="13" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
          <circle cx="15" cy="15" r="13" fill="none" stroke="#1E4DD8" strokeWidth="3"
            strokeDasharray={CIRC} strokeDashoffset={CIRC * 0.35}
            strokeLinecap="round" style={{ filter:'drop-shadow(0 0 3px #1E4DD8)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:8, fontWeight:900, color:'#FFF', lineHeight:1 }}>1:20</span>
          <span style={{ fontSize:4.5, color:'rgba(255,255,255,0.40)' }}>left</span>
        </div>
      </div>

      {/* Waveform */}
      <svg width="44" height="12" viewBox="0 0 44 12">
        {delays.map((d, i) => (
          <rect key={i} x={i * 5.5} y={0} width={2.5} height={12} rx={1.2} fill="#4F8EF7"
            style={{ animation:`watch-bar-${i} .65s ${d}s ease-in-out infinite`, transformOrigin:'center bottom', transformBox:'fill-box' }}
          />
        ))}
      </svg>

      {/* Speaking pill */}
      <div style={{ background:'#1E4DD8', borderRadius:10, padding:'3px 7px', fontSize:6.5, fontWeight:800, color:'#FFF', boxShadow:'0 2px 5px rgba(30,77,216,0.55)', whiteSpace:'nowrap' }}>
        🎙 Speaking…
      </div>
    </div>
  )
}

// ── Screen: Results ───────────────────────────────────────────────────────────
function ResultsScreen() {
  const CIRC = 2 * Math.PI * 13
  const score = 82
  const fraction = score / 100

  const bars = [
    { color:'#38BDF8', val:87 },
    { color:'#818CF8', val:74 },
    { color:'#34D399', val:91 },
    { color:'#FB923C', val:82 },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:4, padding:'2px 6px' }}>
      {/* Score ring — same size as TalkScreen ring */}
      <div style={{ position:'relative', width:28, height:28 }}>
        <svg viewBox="0 0 30 30" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <circle cx="15" cy="15" r="13" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <circle cx="15" cy="15" r="13" fill="none" stroke="#D97706" strokeWidth="3"
            strokeDasharray={CIRC} strokeDashoffset={(1 - fraction) * CIRC}
            strokeLinecap="round" style={{ filter:'drop-shadow(0 0 3px #D97706)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:8, fontWeight:900, color:'#FFF', lineHeight:1 }}>{score}</span>
          <span style={{ fontSize:4.5, color:'rgba(255,255,255,0.4)', lineHeight:1 }}>/100</span>
        </div>
      </div>

      {/* Grade badge */}
      <div style={{ background:'rgba(217,119,6,0.18)', border:'1px solid rgba(217,119,6,0.40)', borderRadius:10, padding:'2px 7px', fontSize:6.5, fontWeight:800, color:'#F59E0B', whiteSpace:'nowrap' }}>
        ⚡ Excellent
      </div>

      {/* Mini bars */}
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:3 }}>
        {bars.map((b, i) => (
          <div key={i} style={{ height:3, borderRadius:2, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
            <div style={{ width:`${b.val}%`, height:'100%', borderRadius:2, background:b.color }} />
          </div>
        ))}
      </div>

      <div style={{ fontSize:6, color:'rgba(255,255,255,0.30)' }}>📤 Share results</div>
    </div>
  )
}

// ── Cycle controller — alternates speaking → results → speaking → … ───────────
function AnimatedWatch() {
  const [showResults, setShowResults] = useState(false)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setOpacity(0)
      setTimeout(() => {
        setShowResults(prev => !prev)
        setOpacity(1)
      }, FADE_MS)
    }, SCREEN_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ transition:`opacity ${FADE_MS}ms ease`, opacity, height:'100%' }}>
      {showResults ? <ResultsScreen /> : <TalkScreen />}
    </div>
  )
}

// ── Watch shell ───────────────────────────────────────────────────────────────
export default function WatchMockup() {
  return (
    <>
      <style>{ANIM}</style>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0,
        animation:'watch-float 4s 1.5s ease-in-out infinite',
        filter:'drop-shadow(0 8px 22px rgba(0,0,0,0.32)) drop-shadow(0 2px 6px rgba(79,142,247,0.18))',
      }}>

        {/* Band top */}
        <div style={{ width:44, height:26, background:'linear-gradient(180deg,#1a1a2e,#111827)', borderRadius:'6px 6px 0 0', borderLeft:'1.5px solid rgba(255,255,255,0.08)', borderRight:'1.5px solid rgba(255,255,255,0.08)', borderTop:'1.5px solid rgba(255,255,255,0.12)' }} />

        {/* Case */}
        <div style={{ width:80, height:96, background:'linear-gradient(145deg,#1c1c2e 0%,#12121f 100%)', borderRadius:20, border:'2px solid rgba(255,255,255,0.12)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.5)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* Crown */}
          <div style={{ position:'absolute', right:-5, top:28, width:5, height:20, borderRadius:3, background:'linear-gradient(180deg,#2a2a3e,#1a1a2e)', border:'1px solid rgba(255,255,255,0.10)' }} />
          {/* Screen */}
          <div style={{ width:64, height:80, background:'linear-gradient(160deg,#080e1a 0%,#0d1525 100%)', borderRadius:14, overflow:'hidden' }}>
            <AnimatedWatch />
          </div>
        </div>

        {/* Band bottom */}
        <div style={{ width:44, height:28, background:'linear-gradient(180deg,#111827,#1a1a2e)', borderRadius:'0 0 8px 8px', borderLeft:'1.5px solid rgba(255,255,255,0.08)', borderRight:'1.5px solid rgba(255,255,255,0.08)', borderBottom:'1.5px solid rgba(255,255,255,0.06)' }} />

        {/* Label */}
        <p style={{ textAlign:'center', marginTop:10, fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.65)', letterSpacing:'0.12em', textTransform:'uppercase' }}>
          Apple Watch
        </p>
      </div>
    </>
  )
}
