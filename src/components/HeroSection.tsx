import PhoneMockup from './PhoneMockup'
import { openContact } from './NavBar'
import { track } from '../analytics'
import { BookOpen, Mic, Trophy, Zap, Play } from 'lucide-react'

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
                <Trophy size={11} color='#FDE68A' strokeWidth={2.5} /> #1 Learn-by-Talking App
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.8rem,8vw,5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white mb-4">
              Talk to Learn
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.08em', marginBottom: 18, fontStyle: 'italic' }}>
              Speak It. To Understand It.
            </p>

            {/* Sub-headline */}
            <p className="text-[clamp(1.1rem,3vw,1.45rem)] text-white/90 font-semibold mb-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
              You learn faster when you speak out loud.<br/>
              <span style={{ color: '#FDE68A' }}>Pick any subject. Talk about it. AI scores your</span>{' '}
              <span style={{ color: '#FFF' }}>Clarity · Confidence · Relevance · Depth.</span>
            </p>

            {/* Comprehension claim */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(52,211,153,0.50)', borderRadius: 12, padding: '10px 16px', marginBottom: 24 }}>
              <Zap size={18} color="#6EE7B7" strokeWidth={2.5} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6EE7B7', lineHeight: 1.4 }}>
                The proven method that <strong style={{ color: '#FFF', fontWeight: 900 }}>doubles comprehension</strong> —<br/>
                <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>now powered by AI and available for any subject or certification.</span>
              </span>
            </div>

            {/* 3-step flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {[
                {
                  step: '01',
                  Icon: BookOpen,
                  title: 'Study your subject',
                  desc: 'AI generates flashcards, deep-dive lessons and multiple choice — tailored to your topic.',
                  color: '#60A5FA',
                  bg: 'linear-gradient(135deg,rgba(30,58,138,0.6),rgba(37,99,235,0.3))',
                  border: 'rgba(96,165,250,0.30)',
                },
                {
                  step: '02',
                  Icon: Mic,
                  title: 'Get tested — out loud',
                  desc: 'A live AI panel challenges you with real questions. You answer by speaking — out loud.',
                  color: '#C4B5FD',
                  bg: 'linear-gradient(135deg,rgba(76,29,149,0.6),rgba(109,40,217,0.3))',
                  border: 'rgba(167,139,250,0.30)',
                },
                {
                  step: '03',
                  Icon: Trophy,
                  title: 'Receive your score',
                  desc: 'Scored instantly on Clarity · Confidence · Relevance · Depth. Know exactly what to fix.',
                  color: '#6EE7B7',
                  bg: 'linear-gradient(135deg,rgba(6,78,59,0.6),rgba(16,185,129,0.3))',
                  border: 'rgba(52,211,153,0.30)',
                },
              ].map(({ step, Icon, title, desc, color, bg, border }) => (
                <div key={step} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: bg, borderRadius: 14,
                  padding: '16px 18px', border: `1px solid ${border}`,
                  backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={color} strokeWidth={2} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: '0.1em' }}>STEP {step}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>{title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6">
              <button className="btn-primary" onClick={() => { track('cta_start_free'); openContact() }} style={{ background: 'rgba(30,77,216,0.95)', boxShadow: '0 4px 18px rgba(30,77,216,0.55)' }}>Start for Free</button>
              <button className="btn-secondary" onClick={() => { track('cta_watch_demo'); document.getElementById('live-stage')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', gap: 7 }}><Play size={13} strokeWidth={2.5} fill='white' /> Watch the Demo</button>
            </div>

            {/* Micro-copy */}
            <p className="text-sm text-white/50" style={{ marginTop: 2, fontStyle: 'italic', letterSpacing: '0.01em' }}>
              Launching soon — join the early access list.
            </p>
            {/* Trust line */}
            <p className="text-sm text-white/40" style={{ marginTop: 10 }}>No credit card required · Any subject · Any level</p>
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
