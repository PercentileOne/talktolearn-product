import { useEffect, useRef, useState } from 'react'

// ─── Drop D-ID / HeyGen generated MP4s here ──────────────────────────────────
// Each: 6-10s loop, person sitting at desk, looking at camera, breathing
// Generate free at d-id.com or heygen.com

const PEOPLE = [
  { name:'Lord Warren',    title:'Chairman',         personality:'intimidator', video:'', img:'https://i.pravatar.cc/400?img=57', gender:'m' },
  { name:'Diana Stone',    title:'Senior Partner',   personality:'analyst',     video:'', img:'https://i.pravatar.cc/400?img=39', gender:'f' },
  { name:'R. Blake',       title:'Chief Examiner',   personality:'skeptic',     video:'', img:'https://i.pravatar.cc/400?img=15', gender:'m' },
  { name:'Sarah Chen',     title:'Founder & CEO',    personality:'friendly',    video:'', img:'https://i.pravatar.cc/400?img=47', gender:'f' },
  { name:'Marcus Reid',    title:'Investment Lead',  personality:'notetaker',   video:'', img:'https://i.pravatar.cc/400?img=11', gender:'m' },
]

// Personality → animation + behaviour
const PERSONALITY = {
  intimidator: { anim:'intimidate',  dur:8,    note:false, label:'👁 The Intimidator', desc:'Barely moves. Just watches.' },
  analyst:     { anim:'analyse',     dur:6.5,  note:false, label:'🧠 The Analyst',     desc:'Processes every word.'       },
  skeptic:     { anim:'skeptic',     dur:7,    note:false, label:'🤨 The Skeptic',      desc:'Needs convincing.'           },
  friendly:    { anim:'friendly',    dur:5,    note:false, label:'😊 The Ally',         desc:'On your side. For now.'      },
  notetaker:   { anim:'notetaker',   dur:5.5,  note:true,  label:'✍️ The Note-Taker',   desc:'Writing everything down.'    },
}

const INTERRUPTS: Record<string, Record<string, string[]>> = {
  friendly: {
    intimidator: ['"Interesting. Go on."',         '"I\'m listening."',              '"Continue."'],
    analyst:     ['"Can you quantify that?"',       '"What\'s your evidence?"',       '"Elaborate."'],
    skeptic:     ['"I\'m not convinced yet."',      '"That\'s a bold claim."',        '"Prove it."'],
    friendly:    ['"Great point!"',                 '"I like where this is going."',  '"Tell us more."'],
    notetaker:   ['"Just a moment... *scribbles*"', '"Noted. Continue."',             '"Say that again?"'],
  },
  professional: {
    intimidator: ['"Is that your best answer?"',    '"We expected more."',            '"Next point."'],
    analyst:     ['"The data doesn\'t support that."','"Walk us through your logic."','"Quantify."'],
    skeptic:     ['"I\'ve heard this before."',     '"What makes you different?"',    '"Convince me."'],
    friendly:    ['"Can you elaborate on that?"',   '"Interesting perspective."',     '"Go on."'],
    notetaker:   ['"One moment... *writes*"',       '"Repeat that please."',          '"Spell that out."'],
  },
  tough: {
    intimidator: ['"Why should we believe you?"',  '"That\'s not good enough."',     '"You have 20 seconds."'],
    analyst:     ['"The numbers don\'t add up."',  '"Where\'s your proof?"',         '"That\'s speculation."'],
    skeptic:     ['"This is a waste of our time."','"I\'ve seen better."',           '"Come on."'],
    friendly:    ['"You\'re losing me."',          '"Focus. What\'s your point?"',   '"Speak up."'],
    notetaker:   ['"*tears page* Start over."',    '"I\'m writing \'weak\' here."',  '"Note to self: no."'],
  },
}

const MOOD_THEME = {
  friendly:     { bg:'#080F0A', table:'rgba(16,185,129,0.08)',  border:'rgba(16,185,129,0.25)', glow:'rgba(16,185,129,0.12)', accent:'#10B981', tag:'FRIENDLY PANEL',     light:'rgba(220,255,230,0.03)' },
  professional: { bg:'#080C14', table:'rgba(59,130,246,0.06)',  border:'rgba(59,130,246,0.20)', glow:'rgba(59,130,246,0.10)', accent:'#3B82F6', tag:'PROFESSIONAL PANEL', light:'rgba(200,220,255,0.03)' },
  tough:        { bg:'#0F0606', table:'rgba(239,68,68,0.08)',   border:'rgba(239,68,68,0.28)',  glow:'rgba(239,68,68,0.14)',  accent:'#EF4444', tag:'TOUGH PANEL',        light:'rgba(255,200,200,0.03)' },
}

type Mood = 'friendly'|'professional'|'tough'
type Personality = keyof typeof PERSONALITY

const KF = `
@keyframes intimidate { 0%,100%{transform:translateY(0) scale(1)} 60%{transform:translateY(-1px) scale(1.003)} }
@keyframes analyse    { 0%,100%{transform:rotate(0deg) translateX(0)} 30%{transform:rotate(-0.8deg) translateX(-1px)} 70%{transform:rotate(0.5deg) translateX(1px)} }
@keyframes skeptic    { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(-1.5deg) translateY(-1px)} 75%{transform:rotate(0.8deg)} }
@keyframes friendly   { 0%,100%{transform:rotate(0deg) translateY(0)} 35%{transform:rotate(-0.5deg) translateY(-2px)} 70%{transform:rotate(0.4deg) translateY(-1px)} }
@keyframes notetaker  { 0%,100%{transform:rotate(0deg)} 20%,60%{transform:rotate(-2deg) translateX(-2px)} 40%,80%{transform:rotate(1deg) translateX(1px)} }
@keyframes blink      { 0%,88%,100%{transform:scaleY(1)} 91%,95%{transform:scaleY(0.06)} }
@keyframes note-hand  { 0%,100%{transform:translateX(0) translateY(0) rotate(-10deg)} 25%{transform:translateX(4px) translateY(1px) rotate(-8deg)} 50%{transform:translateX(8px) translateY(2px) rotate(-11deg)} 75%{transform:translateX(4px) translateY(1px) rotate(-9deg)} }
@keyframes bubble-in  { 0%{opacity:0;transform:translateY(8px) scale(.93)} 14%{opacity:1;transform:translateY(0) scale(1)} 82%{opacity:1} 100%{opacity:0;transform:translateY(-6px)} }
@keyframes live-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes room-glow  { 0%,100%{opacity:0.6} 50%{opacity:1} }
@keyframes eyeshift   { 0%,100%{transform:translateX(0)} 40%{transform:translateX(-1.5px)} 70%{transform:translateX(1px)} }
`

function PanelistCard({ person, idx, mood, speaking, interrupt, panelCount }: {
  person: typeof PEOPLE[0]
  idx: number
  mood: Mood
  speaking: boolean
  interrupt: { text:string; idx:number } | null
  panelCount: number
}) {
  const theme = MOOD_THEME[mood]
  const p     = PERSONALITY[person.personality as Personality]
  const isInterrupting = interrupt?.idx === idx
  const hasVideo = !!person.video
  const blinkDelay = [0, 1.8, 3.4, 0.9, 2.6][idx]
  const eyeshiftDelay = [0.5, 2.1, 3.8, 1.2, 4.0][idx]

  const cardW = panelCount <= 2 ? 220 : panelCount === 3 ? 180 : panelCount === 4 ? 150 : 130

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, position:'relative', flex:1, maxWidth:cardW }}>

      {/* Personality badge */}
      <div style={{ fontSize:9, fontWeight:800, letterSpacing:'0.12em', color:`${theme.accent}99`, marginBottom:-4 }}>
        {p.label}
      </div>

      {/* Video / photo panel */}
      <div style={{
        width:'100%', aspectRatio:'3/4',
        borderRadius:14, overflow:'hidden', position:'relative',
        border:`1px solid ${isInterrupting ? theme.accent : theme.border}`,
        boxShadow: isInterrupting
          ? `0 0 28px 6px ${theme.glow}, 0 12px 40px rgba(0,0,0,0.7)`
          : `0 8px 32px rgba(0,0,0,0.65)`,
        transition:'box-shadow 0.5s ease, border-color 0.4s ease',
        background:'#0A0A0A',
      }}>

        {/* Room lighting: overhead single source */}
        <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'80%', height:'60%', zIndex:2, pointerEvents:'none',
          background:'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)',
          animation: speaking ? 'room-glow 4s ease-in-out infinite' : 'none',
        }}/>
        {/* Bottom shadow */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', zIndex:2, pointerEvents:'none',
          background:'linear-gradient(transparent, rgba(0,0,0,0.6))',
        }}/>
        {/* Edge vignette */}
        <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}/>

        {hasVideo ? (
          <video src={person.video} autoPlay muted loop playsInline
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }}
          />
        ) : (
          <>
            {/* Animated photo */}
            <div style={{
              width:'100%', height:'100%',
              animation:`${p.anim} ${p.dur}s ease-in-out infinite`,
              transformOrigin:'bottom center',
            }}>
              <img src={person.img} alt={person.name}
                style={{
                  width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block',
                  filter: mood==='tough'       ? 'brightness(0.82) contrast(1.10) saturate(0.65)'
                        : mood==='professional'? 'brightness(0.90) saturate(0.80) contrast(1.05)'
                        : 'brightness(1.0) saturate(0.90)',
                  transition:'filter 0.8s ease',
                  animation:`blink ${3+blinkDelay}s ease-in-out ${blinkDelay}s infinite`,
                }}
              />
            </div>
            {/* Eye shift overlay — implies looking around */}
            {speaking && (
              <div style={{
                position:'absolute', top:'28%', left:0, right:0, height:'14%', zIndex:3, pointerEvents:'none',
                animation:`eyeshift ${4.5 + idx}s ease-in-out ${eyeshiftDelay}s infinite`,
              }}/>
            )}
            {/* Note-taking hand */}
            {p.note && (
              <div style={{
                position:'absolute', bottom:'8%', right:'12%', zIndex:4,
                fontSize: panelCount <= 3 ? 22 : 16,
                animation:'note-hand 2.8s ease-in-out infinite',
                filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                transformOrigin:'bottom right',
              }}>✍️</div>
            )}
          </>
        )}

        {/* LIVE / PHOTO badge */}
        <div style={{ position:'absolute', top:7, left:7, zIndex:5,
          display:'flex', alignItems:'center', gap:4,
          background:'rgba(0,0,0,0.60)', borderRadius:20, padding:'3px 7px',
        }}>
          <div style={{
            width:5, height:5, borderRadius:'50%',
            background: hasVideo ? '#EF4444' : 'rgba(255,255,255,0.25)',
            animation: hasVideo ? 'live-pulse 1.2s ease-in-out infinite' : 'none',
          }}/>
          <span style={{ fontSize:8, fontWeight:800, letterSpacing:'0.1em', color: hasVideo ? '#FCA5A5' : 'rgba(255,255,255,0.25)' }}>
            {hasVideo ? 'LIVE' : 'PHOTO'}
          </span>
        </div>

        {/* Speaking attention ring */}
        {speaking && (
          <div style={{ position:'absolute', inset:0, zIndex:4, borderRadius:14, pointerEvents:'none',
            border:`1.5px solid ${theme.accent}`, opacity:0.25,
            animation:'room-glow 3s ease-in-out infinite',
          }}/>
        )}
      </div>

      {/* Speech bubble */}
      {isInterrupting && interrupt && (
        <div style={{
          position:'absolute', bottom:56, left:'50%',
          transform:'translateX(-50%)',
          background:'rgba(5,5,10,0.95)', border:`1px solid ${theme.border}`,
          borderRadius:12, padding:'8px 14px',
          animation:'bubble-in 4.2s ease forwards',
          zIndex:10, whiteSpace:'nowrap', maxWidth:190,
          boxShadow:`0 4px 20px ${theme.glow}`,
        }}>
          <p style={{ margin:0, fontSize:11, fontWeight:700, color:'#FFF', fontStyle:'italic', textAlign:'center', lineHeight:1.4 }}>
            {interrupt.text}
          </p>
          <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)',
            width:10, height:6, background:'rgba(5,5,10,0.95)',
            clipPath:'polygon(0 0,100% 0,50% 100%)',
          }}/>
        </div>
      )}

      {/* Name plate */}
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize: panelCount<=3?12:10, fontWeight:800, color:'#FFF', marginBottom:2 }}>{person.name}</div>
        <div style={{ fontSize: panelCount<=3?10:9,  fontWeight:600, color:`${theme.accent}CC` }}>{person.title}</div>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.28)', marginTop:2, fontStyle:'italic' }}>{p.desc}</div>
      </div>
    </div>
  )
}

export default function InterviewPanel({ mood, speaking, interruptions, count=3 }: {
  mood:Mood; speaking:boolean; interruptions:boolean; count?:number
}) {
  const theme    = MOOD_THEME[mood]
  const panel    = PEOPLE.slice(0, count)
  const [interrupt, setInterrupt] = useState<{ text:string; idx:number }|null>(null)
  const intRef   = useRef<ReturnType<typeof setTimeout>|null>(null)

  useEffect(()=>{
    if(!speaking||!interruptions){ clearTimeout(intRef.current!); setInterrupt(null); return }
    const schedule=()=>{
      const delay=(mood==='tough'?5000:10000)+Math.random()*8000
      intRef.current=setTimeout(()=>{
        const pIdx  = Math.floor(Math.random()*count)
        const pType = panel[pIdx].personality as keyof typeof INTERRUPTS.friendly
        const list  = INTERRUPTS[mood][pType]
        setInterrupt({ text:list[Math.floor(Math.random()*list.length)], idx:pIdx })
        setTimeout(()=>{ setInterrupt(null); schedule() },4400)
      },delay)
    }
    schedule()
    return ()=>clearTimeout(intRef.current!)
  },[speaking,interruptions,mood,count])

  return (
    <div style={{
      background:theme.bg, borderRadius:20, padding:'24px 20px 22px',
      border:`1px solid ${theme.border}`, position:'relative', overflow:'hidden',
      transition:'background 0.8s ease, border-color 0.8s ease',
    }}>
      <style>{KF}</style>

      {/* Ceiling light simulation */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
        width:'60%', height:'55%', pointerEvents:'none',
        background:`radial-gradient(ellipse at top, ${theme.light} 0%, transparent 75%)`,
        transition:'background 0.8s ease',
      }}/>

      {/* Panel tag */}
      <div style={{ textAlign:'center', marginBottom:20, position:'relative' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:7,
          background:'rgba(0,0,0,0.5)', border:`1px solid ${theme.border}`,
          borderRadius:20, padding:'4px 14px',
        }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:theme.accent, boxShadow:`0 0 8px ${theme.accent}` }}/>
          <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.18em', color:theme.accent }}>{theme.tag}</span>
        </div>
      </div>

      {/* Panelists */}
      <div style={{ display:'flex', gap: count<=3?20:12, justifyContent:'center', alignItems:'flex-start', position:'relative' }}>
        {panel.map((person,i)=>(
          <PanelistCard key={`${mood}-${i}`}
            person={person} idx={i} mood={mood}
            speaking={speaking} interrupt={interrupt}
            panelCount={count}
          />
        ))}
      </div>

      {/* Table line */}
      <div style={{ margin:'18px 0 14px',
        height:2, borderRadius:1,
        background:`linear-gradient(90deg,transparent,${theme.border},transparent)`,
      }}/>

      {/* Status line */}
      <p style={{ margin:0, textAlign:'center', fontSize:11,
        color: speaking ? theme.accent : 'rgba(255,255,255,0.25)',
        fontStyle:'italic', letterSpacing:'0.04em',
        transition:'color 0.5s ease',
      }}>
        {speaking ? "They're listening. Don't stop now." : "They're waiting. Tap the mic when you're ready."}
      </p>
    </div>
  )
}
