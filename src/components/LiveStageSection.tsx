import { useRef } from 'react'
import InterviewPanel from './InterviewPanel'
import PanelQA from './PanelQA'
import { openContact } from './NavBar'
import { track } from '../analytics'
import { HelpCircle, BarChart2, Volume2, TrendingUp, Rocket } from 'lucide-react'

const KF = `
@keyframes stage-in { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes cta-glow  { 0%,100%{box-shadow:0 8px 32px rgba(30,77,216,.55)} 50%{box-shadow:0 8px 52px rgba(30,77,216,.9)} }
@keyframes live-pulse{ 0%,100%{opacity:1} 50%{opacity:.3} }
`

export default function LiveStageSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="live-stage" style={{ background: 'linear-gradient(180deg,#060D1A 0%,#0A0F1C 100%)', padding: '100px 20px 120px', overflow: 'hidden' }}>
      <style>{KF}</style>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, animation: 'stage-in .7s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(251,191,36,.12)', border: '1px solid rgba(251,191,36,.30)', borderRadius: 20, padding: '6px 18px', marginBottom: 20 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', animation: 'live-pulse 1.4s ease-in-out infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FDE68A', letterSpacing: '.08em' }}>PANEL CALL — TRY IT NOW</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', fontWeight: 900, color: '#FFF', letterSpacing: '-.04em', marginBottom: 16, lineHeight: 1.05 }}>
            Answer on your subject.<br />Under real pressure.
          </h2>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,.55)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Join a Panel Call and speak about any subject.{' '}
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>Your heart rate goes up the moment you see the grid. That's the point.</span>
          </p>
        </div>

        {/* Demo card */}
        <div style={{ background: 'rgba(255,255,255,.03)', borderRadius: 28, border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,.6)' }}>

          {/* Panel + Q&A */}
          <div style={{ background: 'linear-gradient(180deg,#0D1829 0%,#080E1C 100%)', padding: '32px 20px 28px', position: 'relative', overflow: 'hidden' }}>

            {/* Subtle blue spotlight */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '70%', background: 'radial-gradient(ellipse at top,rgba(59,130,246,.14) 0%,transparent 72%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <InterviewPanel mood="professional" speaking={false} interruptions={false} count={4} />
              <PanelQA mood="professional" />
            </div>
          </div>

          {/* CTA footer */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFF', marginBottom: 4 }}>Ready to take the real stage?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>Join the waitlist and be first when we launch.</div>
            </div>
            <button onClick={() => { track('cta_join_waitlist'); openContact() }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#1E4DD8', color: '#FFF', fontWeight: 800, fontSize: 14, animation: 'cta-glow 2.5s ease-in-out infinite' }}>
              <Rocket size={16} strokeWidth={2} /> Join the Waitlist
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 48 }}>
          {[
            { Icon: HelpCircle, stat: '5',    label: 'AI-generated questions', color: '#60A5FA' },
            { Icon: BarChart2,  stat: '4',    label: 'Scoring dimensions',      color: '#C4B5FD' },
            { Icon: Volume2,    stat: '4',    label: 'Distinct panel voices',   color: '#34D399' },
            { Icon: TrendingUp, stat: '100%', label: 'Real confidence gained',  color: '#FDE68A' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '20px 28px', textAlign: 'center', minWidth: 130 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <s.Icon size={22} color={s.color} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FFF', marginBottom: 4 }}>{s.stat}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
