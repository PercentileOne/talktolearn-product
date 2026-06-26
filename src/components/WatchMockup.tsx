import { useEffect, useState } from 'react'

const SCREEN_MS = 3800
const FADE_MS   = 600

const ANIM = `
@keyframes watch-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
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
  const CIRC = 2 * Math.PI * 38
  const delays = [0, 0.15, 0.07, 0.22, 0.1, 0.18, 0.05, 0.2]
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:10, padding:'8px 10px' }}>
      {/* Ring */}
      <div style={{ position:'relative', width:80, height:80 }}>
        <svg viewBox="0 0 88 88" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
          <circle cx="44" cy="44" r="38" fill="none" stroke="#2D8CFF" strokeWidth="7"
            strokeDasharray={CIRC} strokeDashoffset={CIRC * 0.35}
            strokeLinecap="round" style={{ filter:'drop-shadow(0 0 6px #2D8CFF)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:22, fontWeight:900, color:'#FFF', lineHeight:1 }}>1:20</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.45)', marginTop:2 }}>remaining</span>
        </div>
      </div>

      {/* Waveform */}
      <svg width="110" height="28" viewBox="0 0 110 28" style={{ width:110, height:28 }}>
        {delays.map((d, i) => (
          <rect key={i} x={i * 13.75} y={0} width={7} height={28} rx={3.5} fill="#4F8EF7"
            style={{ animation:`watch-bar-${i} .65s ${d}s ease-in-out infinite`, transformOrigin:'center bottom', transformBox:'fill-box' }}
          />
        ))}
      </svg>

      {/* Speaking pill */}
      <div style={{ background:'#1E4DD8', borderRadius:20, padding:'6px 16px', fontSize:14, fontWeight:800, color:'#FFF', boxShadow:'0 4px 12px rgba(30,77,216,0.55)', whiteSpace:'nowrap' }}>
        🎙 Speaking…
      </div>
    </div>
  )
}

// ── Screen 2: Results ─────────────────────────────────────────────────────────
function ResultsScreen() {
  const CIRC = 2 * Math.PI * 38
  const score = 82
  const fraction = score / 100

  const bars = [
    { label:'Clarity',    color:'#38BDF8', val:87 },
    { label:'Confidence', color:'#818CF8', val:74 },
    { label:'Relevance',  color:'#34D399', val:91 },
    { label:'Depth',      color:'#FB923C', val:82 },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, padding:'8px 12px' }}>
      {/* Score ring */}
      <div style={{ position:'relative', width:80, height:80 }}>
        <svg viewBox="0 0 88 88" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <circle cx="44" cy="44" r="38" fill="none" stroke="#D97706" strokeWidth="7"
            strokeDasharray={CIRC} strokeDashoffset={(1 - fraction) * CIRC}
            strokeLinecap="round" style={{ filter:'drop-shadow(0 0 6px #D97706)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:24, fontWeight:900, color:'#FFF', lineHeight:1 }}>{score}</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:1 }}>/100</span>
        </div>
      </div>

      {/* Grade badge */}
      <div style={{ background:'rgba(217,119,6,0.18)', border:'1px solid rgba(217,119,6,0.40)', borderRadius:20, padding:'4px 14px', fontSize:13, fontWeight:800, color:'#F59E0B', whiteSpace:'nowrap' }}>
        ⚡ Excellent
      </div>

      {/* Bars */}
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:5 }}>
        {bars.map((b, i) => (
          <div key={i}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
              <span style={{ fontSize:9, color:'rgba(255,255,255,0.45)' }}>{b.label}</span>
              <span style={{ fontSize:9, color:b.color, fontWeight:700 }}>{b.val}</span>
            </div>
            <div style={{ height:5, borderRadius:3, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
              <div style={{ width:`${b.val}%`, height:'100%', borderRadius:3, background:b.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Cycle controller ───────────────────────────────────────────────────────────
function AnimatedWatch() {
  const [showResults, setShowResults] = useState(false)
  const [opacity, setOpacity]         = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setOpacity(0)
      setTimeout(() => { setShowResults(prev => !prev); setOpacity(1) }, FADE_MS)
    }, SCREEN_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ transition:`opacity ${FADE_MS}ms ease`, opacity, height:'100%' }}>
      {showResults ? <ResultsScreen /> : <TalkScreen />}
    </div>
  )
}

// ── Watch shell (Apple Watch Ultra proportions) ───────────────────────────────
export default function WatchMockup() {
  // Case is 160 × 174px — close to Ultra's near-square footprint
  const CASE_W  = 160
  const CASE_H  = 174
  const BAND_W  = 124   // bands slightly narrower than case
  const BAND_T  = 52    // top band height
  const BAND_B  = 56    // bottom band height
  const RADIUS  = 36    // case corner radius

  return (
    <>
      <style>{ANIM}</style>
      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:0,
        animation:'watch-float 4s 1.5s ease-in-out infinite',
        filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.45)) drop-shadow(0 3px 8px rgba(45,140,255,0.18))',
      }}>

        {/* Band — top */}
        <div style={{
          width: BAND_W,
          height: BAND_T,
          backgroundColor: '#0d0d0d',
          background: 'linear-gradient(180deg, #181818 0%, #0d0d0d 100%)',
          borderRadius: '10px 10px 0 0',
          border: '1.5px solid rgba(255,255,255,0.07)',
          borderBottom: 'none',
        }} />

        {/* Case */}
        <div style={{
          width: CASE_W,
          height: CASE_H,
          background: 'linear-gradient(145deg, #252535 0%, #14141f 60%, #1a1a2a 100%)',
          borderRadius: RADIUS,
          border: '2px solid rgba(255,255,255,0.14)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.10)',
            'inset 0 -1px 0 rgba(0,0,0,0.5)',
            '0 0 0 1px rgba(0,0,0,0.6)',
          ].join(', '),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          {/* Digital crown — top right */}
          <div style={{
            position:'absolute', right:-9, top:32,
            width:9, height:30,
            borderRadius:5,
            background:'linear-gradient(90deg,#2a2a40,#3a3a54)',
            border:'1px solid rgba(255,255,255,0.14)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.12)',
          }} />

          {/* Side button — below crown */}
          <div style={{
            position:'absolute', right:-8, top:72,
            width:8, height:22,
            borderRadius:4,
            background:'linear-gradient(90deg,#252538,#353550)',
            border:'1px solid rgba(255,255,255,0.10)',
          }} />

          {/* Action button — left (orange, Ultra-specific) */}
          <div style={{
            position:'absolute', left:-8, top:40,
            width:8, height:26,
            borderRadius:4,
            background:'linear-gradient(90deg,#c2410c,#ea580c)',
            border:'1px solid rgba(255,100,0,0.5)',
            boxShadow:'0 0 6px rgba(234,88,12,0.4)',
          }} />

          {/* Screen */}
          <div style={{
            width: CASE_W - 24,
            height: CASE_H - 22,
            background: '#000',
            borderRadius: RADIUS - 8,
            overflow: 'hidden',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
            <AnimatedWatch />
          </div>
        </div>

        {/* Band — bottom */}
        <div style={{
          width: BAND_W,
          height: BAND_B,
          backgroundColor: '#0d0d0d',
          background: 'linear-gradient(180deg, #0d0d0d 0%, #181818 100%)',
          borderRadius: '0 0 10px 10px',
          border: '1.5px solid rgba(255,255,255,0.06)',
          borderTop: 'none',
        }} />

        {/* Label */}
        <p style={{ textAlign:'center', marginTop:12, fontSize:11, fontWeight:700, color:'rgba(0,0,0,0.45)', letterSpacing:'0.12em', textTransform:'uppercase' }}>
          Works on iOS &amp; Android
        </p>
      </div>
    </>
  )
}
