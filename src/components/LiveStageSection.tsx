import { useEffect, useRef, useState } from 'react'
import InterviewPanel from './InterviewPanel'
import PanelQA from './PanelQA'

// ─── Keyframes for UI chrome only ────────────────────────────────────────────
const KF = `
@keyframes interrupt-pop {
  0%  { opacity:0; transform:translateX(-50%) translateY(10px) scale(.95) }
  15% { opacity:1; transform:translateX(-50%) translateY(0)    scale(1)   }
  80% { opacity:1 }
  100%{ opacity:0; transform:translateX(-50%) translateY(-8px)            }
}
@keyframes applause-pop {
  0%  { opacity:0; transform:translateX(-50%) scale(.7)  }
  20% { opacity:1; transform:translateX(-50%) scale(1.1) }
  80% { opacity:1; transform:translateX(-50%) scale(1)   }
  100%{ opacity:0; transform:translateX(-50%) scale(.9)  }
}
@keyframes wave    { 0%,100%{transform:scaleY(.15)} 50%{transform:scaleY(1)} }
@keyframes cta-glow{ 0%,100%{box-shadow:0 8px 32px rgba(30,77,216,.55)} 50%{box-shadow:0 8px 52px rgba(30,77,216,.9)} }
@keyframes stage-in{ from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
`

// ─── Config ───────────────────────────────────────────────────────────────────
const SIZES = [
  { label:'Just Me',  value:0,    emoji:'🧘', desc:'Solo — pure focus',      mode:'solo'      },
  { label:'Interview',value:3,    emoji:'🎯', desc:'3-person panel',          mode:'interview' },
  { label:'Room',     value:25,   emoji:'🏫', desc:'25 people',               mode:'crowd'     },
  { label:'Hall',     value:100,  emoji:'🎤', desc:'100 people',              mode:'crowd'     },
  { label:'Arena',    value:1000, emoji:'🏟', desc:'1,000 people',            mode:'crowd'     },
]

const MOODS = [
  { value:'friendly',     emoji:'😊', label:'Friendly',     colour:'#10B981', tint:'rgba(16,185,129,.18)',  overlay:'rgba(20,80,40,.08)'   },
  { value:'professional', emoji:'🧐', label:'Professional', colour:'#3B82F6', tint:'rgba(59,130,246,.18)',  overlay:'rgba(30,50,100,.18)'  },
  { value:'tough',        emoji:'😤', label:'Tough',        colour:'#EF4444', tint:'rgba(239,68,68,.18)',   overlay:'rgba(120,20,20,.28)'  },
]

const INTERRUPTS: Record<string,string[]> = {
  friendly:     ['"You\'re doing great! 👏"','"Can you tell us more?"','*warm applause*','"This is brilliant!"'],
  professional: ['"Could you elaborate?"','*quiet note-taking ✍️*','"Interesting point."','"Please continue."'],
  tough:        ['"Could you speak up? 🙉"','"Sorry, what was that?"','*cough cough* 😷','📱 phone buzzes loudly','"Get to the point!"'],
}

const SHIRT_PALETTES: Record<string,string[]> = {
  friendly:     ['#065F46','#047857','#1D4ED8','#7C3AED','#B45309','#0E7490','#065F46','#0369A1'],
  professional: ['#1E3A5F','#1E40AF','#374151','#1F2937','#312E81','#1E3A5F','#0C4A6E','#292524'],
  tough:        ['#7F1D1D','#991B1B','#1F2937','#374151','#4C1D95','#78350F','#111827','#7F1D1D'],
}

// 20 real face portraits — small pool, all pre-rendered to sprites
const FACE_URLS = Array.from({length:20},(_,i)=>
  `https://i.pravatar.cc/80?img=${i+1}`
)

// Sprite cache — each face+shirt pre-rendered once, blitted every frame
const spriteCache = new Map<string,HTMLCanvasElement>()

function getSprite(img:HTMLImageElement, shirtColor:string, r:number): HTMLCanvasElement {
  const key=`${img.src}|${shirtColor}|${r}`
  if(spriteCache.has(key)) return spriteCache.get(key)!

  const bW=r*2.6, bH=r*2.4, nH=r*0.5
  const totalW=bW, totalH=r*2+nH+bH
  const cx=totalW/2, cy=r

  const oc=document.createElement('canvas')
  oc.width=Math.ceil(totalW); oc.height=Math.ceil(totalH)
  const c=oc.getContext('2d')!

  // Shirt / shoulders
  c.fillStyle=shirtColor
  c.beginPath()
  c.moveTo(cx-bW/2, totalH)
  c.lineTo(cx-bW/2, cy+r+nH+r*0.3)
  c.quadraticCurveTo(cx-bW/2, cy+r+nH, cx-r*0.35, cy+r+nH)
  c.lineTo(cx+r*0.35, cy+r+nH)
  c.quadraticCurveTo(cx+bW/2, cy+r+nH, cx+bW/2, cy+r+nH+r*0.3)
  c.lineTo(cx+bW/2, totalH)
  c.closePath()
  c.fill()

  // Neck
  c.fillStyle='rgba(170,110,60,0.55)'
  c.fillRect(cx-r*0.22, cy+r*0.9, r*0.44, nH)

  // Face circle
  c.save()
  c.beginPath()
  c.arc(cx,cy,r,0,Math.PI*2)
  c.clip()
  if(img.complete&&img.naturalWidth){
    c.drawImage(img,cx-r,cy-r,r*2,r*2)
  } else {
    c.fillStyle='#B87333'; c.fill()
  }
  c.restore()

  spriteCache.set(key,oc)
  return oc
}

type Mood = 'friendly'|'professional'|'tough'

// ─── Per-person animation state ───────────────────────────────────────────────
type Person = {
  x:number; y:number; faceR:number; opacity:number; blur:number
  imgIdx:number; shirtColor:string
  breathPhase:number; breathSpeed:number
  blinkTimer:number; blinkProgress:number; blinking:boolean
  swayPhase:number; swayAmp:number; swaySpeed:number
  swayYPhase:number
  applausePhase:number
}

function pseudo(idx:number){ return (idx*2654435761)>>>0 }

// Cap visible persons — canvas can't do 1000 faces smoothly; imply scale via blur+density
function visibleCount(size:number){ return size<=5?size:size<=25?25:size<=100?60:100 }

function buildPersons(size:number, W:number, H:number, mood:Mood): Person[] {
  if(size===0) return []
  const total = visibleCount(size)
  const rows  = size<=5?1:size<=25?3:size<=100?5:7
  const palette = SHIRT_PALETTES[mood]
  const persons: Person[] = []
  let idx=0

  for(let r=0;r<rows;r++){
    const t      = rows===1?1:(r/(rows-1))
    const faceR  = Math.round(8+t*16)   // integer radius → sharper sprite cache hits
    const y      = (1-t)*H*0.75
    const op     = 0.22+t*0.78
    const blur   = (1-t)*1.8
    const rowN   = Math.round(total/rows + (rows-1-r)*1.5)
    const count  = Math.min(rowN,20)
    const gap    = W/(count+1)

    for(let c=0;c<count;c++){
      const p=pseudo(idx)
      persons.push({
        x:gap*(c+1), y, faceR, opacity:op, blur,
        imgIdx:     p%FACE_URLS.length,
        shirtColor: palette[p%palette.length],
        breathPhase: (p%628)/100, breathSpeed: 0.006+(p%10)/1600,
        blinkTimer:  1.5+(p%70)/14, blinkProgress:0, blinking:false,
        swayPhase:   (p%628)/100, swayAmp:0.3+(p%10)/14, swaySpeed:0.0025+(p%8)/2800,
        swayYPhase:  (p%400)/100, applausePhase:0,
      })
      idx++
    }
  }
  return persons
}

// ─── Canvas audience renderer ─────────────────────────────────────────────────
function AudienceCanvas({size,mood,applauding}:{size:number;mood:Mood;applauding:boolean}){
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const images     = useRef<HTMLImageElement[]>([])
  const persons    = useRef<Person[]>([])
  const animId     = useRef(0)
  const lastT      = useRef(0)
  const loadedN    = useRef(0)
  const [ready, setReady] = useState(false)
  const moodRef    = useRef(mood)
  const appRef     = useRef(applauding)
  const sizeRef    = useRef(size)

  moodRef.current = mood
  appRef.current  = applauding

  // Preload face images once
  useEffect(()=>{
    if(images.current.length) return
    FACE_URLS.forEach((url,i)=>{
      const img = new Image()
      img.onload = img.onerror = ()=>{
        loadedN.current++
        if(loadedN.current===FACE_URLS.length) setReady(true)
      }
      img.src=url
      images.current[i]=img
    })
  },[])

  // Rebuild persons when size/mood change
  useEffect(()=>{
    const cv=canvasRef.current; if(!cv) return
    persons.current = buildPersons(size,cv.width,cv.height,mood)
    sizeRef.current = size
  },[size,mood])

  // Canvas resize handler
  useEffect(()=>{
    const cv=canvasRef.current; if(!cv) return
    const obs=new ResizeObserver(()=>{
      const rect=cv.getBoundingClientRect()
      cv.width=rect.width*devicePixelRatio
      cv.height=rect.height*devicePixelRatio
      persons.current=buildPersons(sizeRef.current,cv.width,cv.height,moodRef.current)
    })
    obs.observe(cv)
    return ()=>obs.disconnect()
  },[])

  // Main render loop
  useEffect(()=>{
    if(!ready) return
    const cv=canvasRef.current; if(!cv) return
    const ctx=cv.getContext('2d'); if(!ctx) return

    if(!persons.current.length && sizeRef.current>0){
      persons.current=buildPersons(sizeRef.current,cv.width,cv.height,moodRef.current)
    }


    const FRAME_MS=1000/30  // 30fps — smooth enough, half the CPU

    const render=(time:number)=>{
      if(time-lastT.current<FRAME_MS){ animId.current=requestAnimationFrame(render); return }
      const dt=Math.min((time-lastT.current)/1000,0.05)
      lastT.current=time
      const app=appRef.current
      const W=cv.width, H=cv.height

      ctx.clearRect(0,0,W,H)
      const grad=ctx.createLinearGradient(0,0,0,H)
      grad.addColorStop(0,'rgba(0,0,0,0)')
      grad.addColorStop(1,'rgba(0,0,0,0.5)')
      ctx.fillStyle=grad; ctx.fillRect(0,0,W,H)

      const ps=persons.current
      for(const p of ps){
        p.breathPhase   += p.breathSpeed*dt*60
        p.swayPhase     += p.swaySpeed*dt*60
        p.swayYPhase    += p.swaySpeed*0.65*dt*60
        p.applausePhase += 0.12*dt*60

        if(!p.blinking){
          p.blinkTimer-=dt
          if(p.blinkTimer<=0){ p.blinking=true; p.blinkProgress=0 }
        } else {
          p.blinkProgress+=dt/0.15
          if(p.blinkProgress>=1){ p.blinking=false; p.blinkTimer=2+Math.random()*5 }
        }

        const scale=1+Math.sin(p.breathPhase)*0.010
        const cx=p.x+Math.sin(p.swayPhase)*p.swayAmp
        const cy=p.y+Math.sin(p.swayYPhase)*p.swayAmp*0.4
        const r=p.faceR

        ctx.save()
        ctx.globalAlpha=p.opacity
        if(p.blur>0.4) ctx.filter=`blur(${p.blur.toFixed(1)}px)`

        // Blit sprite (face+shirt pre-rendered — no clip per frame)
        const img=images.current[p.imgIdx]
        const sprite=(img?.complete&&img.naturalWidth)?getSprite(img,p.shirtColor,r):null
        if(sprite){
          const sw=sprite.width*scale, sh=sprite.height*scale
          ctx.drawImage(sprite,cx-sw/2,cy-r*scale,sw,sh)
        } else {
          ctx.fillStyle='#5B4030'
          ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill()
        }

        // Blink overlay on top of sprite
        if(p.blinking){
          const prog=Math.sin(p.blinkProgress*Math.PI)
          const lidH=r*0.5*prog*scale
          const eyeY=cy-r*0.1*scale
          ctx.fillStyle='rgba(140,85,45,0.95)'
          ctx.beginPath()
          ctx.ellipse(cx,eyeY-lidH*0.4,r*0.7*scale,Math.max(0.1,lidH*0.65),0,0,Math.PI*2)
          ctx.fill()
          ctx.fillStyle='rgba(120,70,35,0.75)'
          ctx.beginPath()
          ctx.ellipse(cx,eyeY+lidH*0.25,r*0.65*scale,Math.max(0.1,lidH*0.3),0,0,Math.PI*2)
          ctx.fill()
        }

        if(app){
          const bounce=Math.abs(Math.sin(p.applausePhase))*r*scale
          ctx.font=`${Math.round(r*scale*1.1)}px serif`
          ctx.textAlign='center'; ctx.textBaseline='middle'
          ctx.fillText('👏',cx,cy+r*scale*3.2-bounce)
        }

        ctx.restore()
      }

      animId.current=requestAnimationFrame(render)
    }

    animId.current=requestAnimationFrame(render)
    return ()=>cancelAnimationFrame(animId.current)
  },[ready])

  const H = size===0?0:size<=5?120:size<=25?180:size<=100?240:300

  return (
    <canvas ref={canvasRef}
      style={{width:'100%',height:H,display:'block',transition:'height .5s ease'}}
    />
  )
}

// ─── Wave bar ────────────────────────────────────────────────────────────────
function WaveBar({i,active}:{i:number;active:boolean}){
  return <div style={{
    width:3,height:34,borderRadius:2,margin:'0 2px',
    background:active?'#1E4DD8':'rgba(255,255,255,0.12)',
    animation:active?`wave ${.38+i*.06}s ease-in-out ${i*.035}s infinite`:'none',
    transformOrigin:'center', transition:'background .3s',
  }}/>
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function LiveStageSection(){
  const [sizeIdx,     setSizeIdx]     = useState(1) // Interview panel by default
  const [panelCount,  setPanelCount]  = useState(3) // 1-5 interviewers
  const [mood,     setMood]       = useState<Mood>('professional')
  const [interruptions,setInt]    = useState(false)
  const [speaking, setSpeaking]   = useState(false)
  const [applauding,setApplauding]= useState(false)
  const [interrupt,setInterrupt]  = useState<string|null>(null)
  const [seconds,  setSeconds]    = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null)
  const intRef   = useRef<ReturnType<typeof setTimeout>|null>(null)

  const selected  = SIZES[sizeIdx]
  const moodData  = MOODS.find(m=>m.value===mood)!

  // Timer
  useEffect(()=>{
    if(speaking){ timerRef.current=setInterval(()=>setSeconds(s=>s+1),1000) }
    else { clearInterval(timerRef.current!) }
    return ()=>clearInterval(timerRef.current!)
  },[speaking])

  // Interruptions
  useEffect(()=>{
    if(!speaking||!interruptions||selected.value===0){ clearTimeout(intRef.current!); setInterrupt(null); return }
    const schedule=()=>{
      const delay=(mood==='tough'?3500:7000)+Math.random()*5000
      intRef.current=setTimeout(()=>{
        const list=INTERRUPTS[mood]
        setInterrupt(list[Math.floor(Math.random()*list.length)])
        setTimeout(()=>{ setInterrupt(null); schedule() },3800)
      },delay)
    }
    schedule()
    return ()=>clearTimeout(intRef.current!)
  },[speaking,interruptions,mood,selected.value])

  const fmt=(s:number)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  const handleMic=()=>{
    if(speaking){
      setSpeaking(false); setSeconds(0)
      if(mood==='friendly'&&selected.value>0){
        setApplauding(true)
        setTimeout(()=>setApplauding(false),4500)
      }
    } else {
      setSpeaking(true); setApplauding(false)
    }
  }

  return (
    <section style={{background:'linear-gradient(180deg,#060D1A 0%,#0A0F1C 100%)',padding:'100px 20px 120px',overflow:'hidden'}}>
      <style>{KF}</style>
      <div style={{maxWidth:1120,margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:64,animation:'stage-in .7s ease both'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(251,191,36,.12)',border:'1px solid rgba(251,191,36,.30)',borderRadius:20,padding:'6px 18px',marginBottom:20}}>
            <span style={{fontSize:13,fontWeight:800,color:'#FDE68A',letterSpacing:'.08em'}}>📹 PANEL CALL — TRY IT NOW</span>
          </div>
          <h2 style={{fontSize:'clamp(2.4rem,5vw,3.6rem)',fontWeight:900,color:'#FFF',letterSpacing:'-.04em',marginBottom:16,lineHeight:1.05}}>
            Answer on your subject.<br/>Under real pressure.
          </h2>
          <p style={{fontSize:'clamp(1rem,2vw,1.2rem)',color:'rgba(255,255,255,.55)',maxWidth:520,margin:'0 auto',lineHeight:1.75}}>
            Join a Panel Call, choose your panel mood, and speak.{' '}
            <span style={{color:'#FDE68A',fontWeight:700}}>Your heart rate goes up the moment you see the grid. That's the point.</span>
          </p>
        </div>

        {/* Demo card */}
        <div style={{background:'rgba(255,255,255,.03)',borderRadius:28,border:'1px solid rgba(255,255,255,.08)',overflow:'hidden',boxShadow:'0 40px 120px rgba(0,0,0,.6)'}}>

          {/* Stage */}
          <div style={{background:'linear-gradient(180deg,#0D1829 0%,#080E1C 100%)',padding:'32px 16px 28px',borderBottom:'1px solid rgba(255,255,255,.06)',position:'relative',overflow:'hidden'}}>

            {/* Spotlight */}
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'60%',height:'80%',background:`radial-gradient(ellipse at top,${moodData.tint} 0%,transparent 72%)`,transition:'background .8s ease',pointerEvents:'none'}}/>

            {/* Floor gradient */}
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:'28%',background:'linear-gradient(transparent,rgba(0,0,0,.5))',pointerEvents:'none',zIndex:2}}/>

            {/* Status */}
            <div style={{textAlign:'center',marginBottom:12,position:'relative',zIndex:3}}>
              {selected.value>0
                ?<div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.45)'}}>
                    {selected.emoji} {selected.value.toLocaleString()} people · {moodData.emoji} {moodData.label}
                    {interruptions?' · 🔔 interruptions on':''}
                  </div>
                :<div style={{fontSize:12,color:'rgba(255,255,255,.25)',fontStyle:'italic'}}>Solo — no audience, pure focus</div>
              }
            </div>

            {/* Interview panel OR canvas crowd */}
            <div style={{position:'relative',zIndex:3,padding:'0 8px'}}>
              {selected.mode==='interview'
                ? <>
                    <InterviewPanel mood={mood} speaking={speaking} interruptions={interruptions} count={panelCount}/>
                    <PanelQA mood={mood}/>
                  </>
                : <AudienceCanvas size={selected.value} mood={mood} applauding={applauding}/>
              }
            </div>

            {/* Applause banner */}
            {applauding&&(
              <div style={{position:'absolute',bottom:100,left:'50%',background:'rgba(16,185,129,.16)',border:'1px solid rgba(16,185,129,.5)',borderRadius:22,padding:'11px 28px',animation:'applause-pop 4.5s ease forwards',zIndex:10,whiteSpace:'nowrap'}}>
                <span style={{fontSize:16,fontWeight:800,color:'#6EE7B7'}}>👏 The crowd loves it!</span>
              </div>
            )}

            {/* Interruption bubble */}
            {interrupt&&(
              <div style={{position:'absolute',bottom:90,left:'50%',background:'rgba(251,191,36,.15)',border:'1px solid rgba(251,191,36,.45)',borderRadius:22,padding:'11px 24px',animation:'interrupt-pop 3.8s ease forwards',zIndex:10,whiteSpace:'nowrap'}}>
                <span style={{fontSize:14,fontWeight:700,color:'#FDE68A'}}>{interrupt}</span>
              </div>
            )}

            {/* Waveform + mic */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:14,position:'relative',zIndex:4,marginTop:16}}>
              <div style={{display:'flex',alignItems:'center',height:40}}>
                {Array.from({length:22}).map((_,i)=><WaveBar key={i} i={i} active={speaking}/>)}
              </div>
              {speaking&&(
                <div style={{fontSize:30,fontWeight:900,color:'#FFF',letterSpacing:-1,fontVariantNumeric:'tabular-nums',lineHeight:1}}>
                  {fmt(seconds)}
                </div>
              )}
              <button onClick={handleMic} style={{
                width:76,height:76,borderRadius:'50%',border:'none',cursor:'pointer',fontSize:30,
                background:speaking?'#DC2626':'#1E4DD8',
                boxShadow:speaking?'0 0 32px rgba(220,38,38,.6)':'0 8px 32px rgba(30,77,216,.55)',
                transition:'background .3s,box-shadow .3s',
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>
                {speaking?'⏹':'🎙'}
              </button>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:'.14em',color:'rgba(255,255,255,.28)'}}>
                {speaking?'TAP TO STOP':'TAP TO START SPEAKING'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{padding:'32px 28px 36px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:32}}>

            {/* Size */}
            <div>
              <div style={{fontSize:10,fontWeight:800,letterSpacing:'.18em',color:'rgba(255,255,255,.28)',marginBottom:14}}>AUDIENCE SIZE</div>
              <div style={{display:'flex',flexDirection:'column',gap:5}}>
                {SIZES.map((s,i)=>(
                  <button key={s.value} onClick={()=>setSizeIdx(i)} style={{
                    display:'flex',alignItems:'center',gap:10,padding:'9px 14px',borderRadius:11,border:'none',cursor:'pointer',textAlign:'left',
                    background:sizeIdx===i?'rgba(30,77,216,.22)':'rgba(255,255,255,.03)',
                    outline:sizeIdx===i?'1px solid rgba(30,77,216,.60)':'1px solid transparent',
                    transition:'all .2s ease',
                  }}>
                    <span style={{fontSize:15}}>{s.emoji}</span>
                    <span style={{fontSize:13,fontWeight:sizeIdx===i?800:500,color:sizeIdx===i?'#FFF':'rgba(255,255,255,.40)'}}>{s.label}</span>
                    <span style={{fontSize:11,color:'rgba(255,255,255,.22)',marginLeft:'auto'}}>{s.desc}</span>
                  </button>
                ))}
              </div>
              {/* Panel size — only in interview mode */}
              {selected.mode==='interview' && (
                <div style={{marginTop:12}}>
                  <div style={{fontSize:10,fontWeight:800,letterSpacing:'.16em',color:'rgba(255,255,255,.28)',marginBottom:10}}>PANEL SIZE</div>
                  <div style={{display:'flex',gap:6}}>
                    {[1,2,3,4,5].map(n=>(
                      <button key={n} onClick={()=>setPanelCount(n)} style={{
                        flex:1,padding:'8px 4px',borderRadius:10,border:'none',cursor:'pointer',
                        background:panelCount===n?'rgba(30,77,216,.22)':'rgba(255,255,255,.04)',
                        outline:panelCount===n?'1px solid rgba(30,77,216,.60)':'1px solid transparent',
                        transition:'all .2s',
                      }}>
                        <div style={{fontSize:14,marginBottom:2}}>{'🧑'.repeat(Math.min(n,3))}{n>3?'+':''}</div>
                        <div style={{fontSize:11,fontWeight:800,color:panelCount===n?'#FFF':'rgba(255,255,255,.40)'}}>{n}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mood + interruptions */}
            <div>
              <div style={{fontSize:10,fontWeight:800,letterSpacing:'.18em',color:'rgba(255,255,255,.28)',marginBottom:14}}>CROWD MOOD</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {MOODS.map(m=>(
                  <button key={m.value} onClick={()=>setMood(m.value as Mood)} style={{
                    display:'flex',alignItems:'center',gap:12,padding:'11px 16px',borderRadius:13,border:'none',cursor:'pointer',textAlign:'left',
                    background:mood===m.value?`${m.colour}1A`:'rgba(255,255,255,.03)',
                    outline:mood===m.value?`1px solid ${m.colour}55`:'1px solid transparent',
                    transition:'all .25s ease',
                  }}>
                    <span style={{fontSize:22}}>{m.emoji}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:mood===m.value?'#FFF':'rgba(255,255,255,.40)',marginBottom:2}}>{m.label}</div>
                      <div style={{fontSize:11,color:mood===m.value?m.colour:'rgba(255,255,255,.25)'}}>
                        {m.value==='friendly'?'Warm and supportive':m.value==='professional'?'Attentive, neutral':'Earn their attention'}
                      </div>
                    </div>
                    {mood===m.value&&<div style={{marginLeft:'auto',width:8,height:8,borderRadius:'50%',background:m.colour,flexShrink:0}}/>}
                  </button>
                ))}
              </div>
              <div style={{marginTop:12,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderRadius:13,background:'rgba(255,255,255,.03)',outline:'1px solid rgba(255,255,255,.06)'}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#FFF',marginBottom:2}}>🔔 Interruptions</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,.28)'}}>Coughs · whispers · phones</div>
                </div>
                <button onClick={()=>setInt(v=>!v)} style={{width:44,height:26,borderRadius:13,border:'none',cursor:'pointer',background:interruptions?'#1E4DD8':'rgba(255,255,255,.12)',position:'relative',transition:'background .25s ease',flexShrink:0}}>
                  <div style={{position:'absolute',top:3,width:20,height:20,borderRadius:'50%',background:'#FFF',transition:'left .25s ease',left:interruptions?21:3}}/>
                </button>
              </div>
            </div>
          </div>

          {/* CTA footer */}
          <div style={{borderTop:'1px solid rgba(255,255,255,.06)',padding:'24px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:'#FFF',marginBottom:4}}>Ready to take the real stage?</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.38)'}}>Download TalkToLearn and speak to the world.</div>
            </div>
            <a href="#pricing" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'14px 28px',borderRadius:50,textDecoration:'none',background:'#1E4DD8',color:'#FFF',fontWeight:800,fontSize:14,animation:'cta-glow 2.5s ease-in-out infinite'}}>
              🎭 Get TalkToLearn Free
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'flex',flexWrap:'wrap',gap:16,justifyContent:'center',marginTop:48}}>
          {[
            {emoji:'🏟',stat:'1,000',label:'Max audience size'},
            {emoji:'😤',stat:'3',    label:'Crowd moods'},
            {emoji:'💬',stat:'∞',   label:'Interruption types'},
            {emoji:'🧠',stat:'100%',label:'Real confidence gained'},
          ].map(s=>(
            <div key={s.stat} style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:16,padding:'20px 28px',textAlign:'center',minWidth:130}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.emoji}</div>
              <div style={{fontSize:22,fontWeight:900,color:'#FFF',marginBottom:4}}>{s.stat}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.35)',fontWeight:600}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
