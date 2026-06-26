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
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:7, padding:'10px 10px 6px' }}>
      {/* Ring */}
      <div style={{ position:'relative', width:58, height:58 }}>
        <svg viewBox="0 0 88 88" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
          <circle cx="44" cy="44" r="38" fill="none" stroke="#2D8CFF" strokeWidth="7"
            strokeDasharray={CIRC} strokeDashoffset={CIRC * 0.35}
            strokeLinecap="round" style={{ filter:'drop-shadow(0 0 6px #2D8CFF)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:16, fontWeight:900, color:'#FFF', lineHeight:1 }}>1:20</span>
          <span style={{ fontSize:8, color:'rgba(255,255,255,0.45)', marginTop:2 }}>remaining</span>
        </div>
      </div>

      {/* Waveform */}
      <svg width="96" height="22" viewBox="0 0 96 22" style={{ width:96, height:22 }}>
        {delays.map((d, i) => (
          <rect key={i} x={i * 12} y={0} width={6} height={22} rx={3} fill="#4F8EF7"
            style={{ animation:`watch-bar-${i} .65s ${d}s ease-in-out infinite`, transformOrigin:'center bottom', transformBox:'fill-box' }}
          />
        ))}
      </svg>

      {/* Speaking pill */}
      <div style={{ background:'#1E4DD8', borderRadius:20, padding:'4px 13px', fontSize:11, fontWeight:800, color:'#FFF', boxShadow:'0 4px 12px rgba(30,77,216,0.55)', whiteSpace:'nowrap' }}>
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
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:6, padding:'10px 12px 6px' }}>
      {/* Score ring */}
      <div style={{ position:'relative', width:58, height:58 }}>
        <svg viewBox="0 0 88 88" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <circle cx="44" cy="44" r="38" fill="none" stroke="#D97706" strokeWidth="7"
            strokeDasharray={CIRC} strokeDashoffset={(1 - fraction) * CIRC}
            strokeLinecap="round" style={{ filter:'drop-shadow(0 0 6px #D97706)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:18, fontWeight:900, color:'#FFF', lineHeight:1 }}>{score}</span>
          <span style={{ fontSize:8, color:'rgba(255,255,255,0.4)', marginTop:1 }}>/100</span>
        </div>
      </div>

      {/* Grade badge */}
      <div style={{ background:'rgba(217,119,6,0.18)', border:'1px solid rgba(217,119,6,0.40)', borderRadius:20, padding:'3px 12px', fontSize:11, fontWeight:800, color:'#F59E0B', whiteSpace:'nowrap' }}>
        ⚡ Excellent
      </div>

      {/* Bars */}
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:4 }}>
        {bars.map((b, i) => (
          <div key={i}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
              <span style={{ fontSize:8, color:'rgba(255,255,255,0.45)' }}>{b.label}</span>
              <span style={{ fontSize:8, color:b.color, fontWeight:700 }}>{b.val}</span>
            </div>
            <div style={{ height:4, borderRadius:3, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
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

// ── Woven trail-loop band texture ─────────────────────────────────────────────
const BAND_BG = [
  'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)',
  'repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(0,0,0,0.28) 4px, rgba(0,0,0,0.28) 5px)',
  'linear-gradient(180deg, #1c1c1c 0%, #111111 50%, #0e0e0e 100%)',
].join(', ')

// ── Watch shell (Apple Watch Ultra) ──────────────────────────────────────────
export default function WatchMockup() {
  const CASE_W = 160
  const CASE_H = 174
  const BAND_W = 126
  const BAND_T = 54
  const BAND_B = 58
  const RADIUS = 42   // squircle corners matching Ultra

  return (
    <>
      <style>{ANIM}</style>
      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:0,
        animation:'none',
        filter:[
          'drop-shadow(0 28px 40px rgba(0,0,0,0.75))',
          'drop-shadow(0 8px 14px rgba(0,0,0,0.55))',
          'drop-shadow(0 2px 3px rgba(0,0,0,0.90))',
        ].join(' '),
      }}>

        {/* Band top — woven texture */}
        <div style={{
          width: BAND_W, height: BAND_T,
          background: BAND_BG,
          borderRadius: '10px 10px 0 0',
          border: '1px solid rgba(255,255,255,0.06)',
          borderBottom: 'none',
          boxShadow: 'inset 2px 0 0 rgba(255,255,255,0.04), inset -2px 0 0 rgba(0,0,0,0.35)',
        }} />

        {/* Case — dark titanium with edge highlight sheen */}
        <div style={{
          width: CASE_W, height: CASE_H,
          background: 'linear-gradient(148deg, #38384e 0%, #1c1c2a 16%, #111118 65%, #1b1b28 100%)',
          borderRadius: RADIUS,
          boxShadow:[
            'inset 0 2px 0 rgba(255,255,255,0.22)',   // top titanium sheen
            'inset 2px 0 0 rgba(255,255,255,0.07)',   // left edge
            'inset -2px 0 4px rgba(0,0,0,0.45)',      // right inner shadow
            'inset 0 -3px 8px rgba(0,0,0,0.65)',      // bottom depth
            '0 0 0 1.5px rgba(255,255,255,0.10)',     // outer rim highlight
            '0 0 0 3px rgba(0,0,0,0.80)',             // outer dark ring
          ].join(', '),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          {/* Digital crown — right side, knurled cylinder */}
          <div style={{
            position:'absolute', right:-12, top:28,
            width:12, height:36,
            borderRadius:6,
            background:'linear-gradient(90deg, #2c2c42 0%, #4a4a66 45%, #38384e 100%)',
            boxShadow:[
              'inset 0 1px 0 rgba(255,255,255,0.22)',
              'inset 0 -1px 0 rgba(0,0,0,0.55)',
              '3px 0 6px rgba(0,0,0,0.50)',
            ].join(', '),
            backgroundImage:[
              'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 3px)',
              'linear-gradient(90deg, #2c2c42 0%, #4a4a66 45%, #38384e 100%)',
            ].join(', '),
          }} />

          {/* Side button — below crown */}
          <div style={{
            position:'absolute', right:-11, top:74,
            width:11, height:26,
            borderRadius:5,
            background:'linear-gradient(90deg, #242438 0%, #363652 100%)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.12), 3px 0 5px rgba(0,0,0,0.40)',
            border:'1px solid rgba(255,255,255,0.08)',
          }} />

          {/* Action button — left, Ultra orange */}
          <div style={{
            position:'absolute', left:-11, top:36,
            width:11, height:30,
            borderRadius:5,
            background:'linear-gradient(90deg, #b83a0a, #ea580c, #f97316)',
            boxShadow:[
              'inset 0 1px 0 rgba(255,200,100,0.35)',
              '-3px 0 10px rgba(234,88,12,0.55)',
            ].join(', '),
            border:'1px solid rgba(255,120,0,0.45)',
          }} />

          {/* Screen with bezel inset */}
          <div style={{
            width: CASE_W - 20,
            height: CASE_H - 20,
            borderRadius: RADIUS - 7,
            background: '#000',
            overflow: 'hidden',
            boxShadow:[
              'inset 0 0 0 1px rgba(255,255,255,0.07)',
              'inset 0 3px 10px rgba(0,0,0,0.85)',
            ].join(', '),
          }}>
            <AnimatedWatch />
          </div>
        </div>

        {/* Band bottom — woven texture */}
        <div style={{
          width: BAND_W, height: BAND_B,
          background: BAND_BG,
          borderRadius: '0 0 12px 12px',
          border: '1px solid rgba(255,255,255,0.05)',
          borderTop: 'none',
          boxShadow: 'inset 2px 0 0 rgba(255,255,255,0.04), inset -2px 0 0 rgba(0,0,0,0.35)',
        }} />

        {/* Label */}
        <p style={{ textAlign:'center', marginTop:14, fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.55)', letterSpacing:'0.12em', textTransform:'uppercase' }}>
          Works on iOS &amp; Android
        </p>
      </div>
    </>
  )
}
