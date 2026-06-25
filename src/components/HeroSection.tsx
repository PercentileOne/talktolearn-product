import PhoneMockup from './PhoneMockup'
import { openContact } from './NavBar'

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
            <p className="text-[clamp(1.1rem,3vw,1.45rem)] text-white/90 font-semibold mb-3" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
              Watch. Read. Talk. Get scored. Own any subject.
            </p>

            {/* Italic pull-quote */}
            <p className="text-[clamp(1rem,2.2vw,1.2rem)] text-white/70 max-w-[480px] mx-auto md:mx-0 mb-5 leading-[1.6]" style={{ fontStyle: 'italic', animation: 'hero-fade .7s 150ms ease both' }}>
              "The fastest way to understand anything is to explain it out loud."
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {['📖 Study Cards', '🎙 Talk Test', '🎯 Multiple Choice', '🏅 Certification Prep', '🏆 Leaderboards', '📤 Share Scores'].map(f => (
                <span key={f} style={{
                  fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.90)',
                  background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '20px', padding: '5px 12px',
                  backdropFilter: 'blur(8px)',
                }}>
                  {f}
                </span>
              ))}
            </div>

            {/* Body */}
            <p className="text-[clamp(0.95rem,2vw,1.1rem)] text-white/70 max-w-[460px] mx-auto md:mx-0 mb-8 leading-[1.7]">
              Enter a subject, study it, then speak about it — from AWS certifications and GCSEs
              to A-Levels and Masters-level topics. The AI scores every answer and tells you
              exactly what to improve.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6">
              <button className="btn-primary" onClick={openContact} style={{ background: 'rgba(30,77,216,0.95)', boxShadow: '0 4px 18px rgba(30,77,216,0.55)' }}>Start for Free</button>
              <button className="btn-secondary" onClick={() => document.getElementById('live-stage')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff', backdropFilter: 'blur(8px)' }}>▶ Watch the Demo</button>
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
