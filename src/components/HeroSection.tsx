import PhoneMockup from './PhoneMockup'
import { openContact } from './NavBar'
import { track } from '../analytics'

const HKF = `
@keyframes hero-fade { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
@keyframes hero-phone { from { opacity:0; transform:rotate(-4deg) translateY(8px) scale(.96); } to { opacity:1; transform:rotate(-4deg) translateY(-8px) scale(1); } }
`

export default function HeroSection() {
  return (
    <section className="bg-hero-gradient py-20 md:py-28 overflow-hidden">
      <style>{HKF}</style>
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          <div className="flex-1 text-center md:text-left" style={{ animation: 'hero-fade .7s ease both' }}>
            {/* Badges row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }} className="md:justify-start">
              <div className="inline-flex items-center gap-2.5 bg-white/12 text-white text-[0.72rem] font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-btn border border-white/25 backdrop-blur-sm">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#BAE6FD', boxShadow: '0 0 7px #BAE6FD', display: 'inline-block', flexShrink: 0 }} />
                The Speak-to-Learn Method
              </div>
              <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.10em] uppercase px-4 py-1.5 rounded-btn backdrop-blur-sm" style={{ background: 'linear-gradient(135deg,rgba(251,191,36,0.25),rgba(251,191,36,0.12))', border: '1px solid rgba(251,191,36,0.45)', color: '#FDE68A' }}>
                🏆 #1 Learn-by-Talking App
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.8rem,8vw,5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white mb-4">
              Talk to Learn
            </h1>

            {/* Sub-headline */}
            <p className="text-[clamp(1.1rem,3vw,1.45rem)] text-white/90 font-semibold mb-6" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
              Pick any subject. We build your study path.<br/>
              <span style={{ color: '#FDE68A' }}>Then you speak — and AI scores you.</span>
            </p>

            {/* 3-step flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }} className="md:mx-0">
              {[
                {
                  step: '01',
                  icon: '📚',
                  title: 'Study your subject',
                  desc: 'AI generates flashcards, deep-dive lessons and multiple choice — tailored to your topic.',
                  color: '#60A5FA',
                },
                {
                  step: '02',
                  icon: '🎯',
                  title: 'Get tested — out loud',
                  desc: 'A live panel of AI interviewers asks real questions. You answer by speaking.',
                  color: '#A78BFA',
                },
                {
                  step: '03',
                  icon: '🏆',
                  title: 'Receive your score',
                  desc: 'Scored instantly on Clarity · Confidence · Relevance · Depth. Know exactly what to fix.',
                  color: '#34D399',
                },
              ].map(({ step, icon, title, desc, color }) => (
                <div key={step} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  background: 'rgba(255,255,255,0.06)', borderRadius: 14,
                  padding: '14px 16px', border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(8px)',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: '0.1em' }}>STEP {step}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>{title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6">
              <button className="btn-primary" onClick={() => { track('cta_start_free'); openContact() }} style={{ background: 'rgba(30,77,216,0.95)', boxShadow: '0 4px 18px rgba(30,77,216,0.55)' }}>Start for Free</button>
              <button className="btn-secondary" onClick={() => { track('cta_watch_demo'); document.getElementById('live-stage')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff', backdropFilter: 'blur(8px)' }}>▶ Watch the Demo</button>
            </div>

            {/* Trust line */}
            <p className="text-sm text-white/55">No credit card required · Any subject · Any level</p>
          </div>

          {/* Floating phone mockup */}
          <div className="w-[260px] md:w-auto" style={{
            flexShrink: 0,
            animation: 'hero-phone .9s .2s cubic-bezier(.4,0,.2,1) both',
            filter: [
              'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
              'drop-shadow(0 32px 64px rgba(0,0,0,0.14))',
            ].join(' '),
          }}>
            <PhoneMockup variant="timer" animated />
          </div>

        </div>
      </div>
    </section>
  )
}
