import PhoneMockup from './PhoneMockup'

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
            {/* Badge with live green dot */}
            <div className="inline-flex items-center gap-2.5 bg-white/12 text-white text-[0.72rem] font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-btn border border-white/25 backdrop-blur-sm mb-7">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#BAE6FD', boxShadow: '0 0 7px #BAE6FD', display: 'inline-block', flexShrink: 0 }} />
              The Speak-to-Learn Method
            </div>

            {/* Headline — white on blue gradient */}
            <h1 className="text-[clamp(2.8rem,8vw,5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white mb-4">
              Learn by Talking
            </h1>

            {/* Sub-headline */}
            <p className="text-[clamp(1.1rem,3vw,1.45rem)] text-white/90 font-semibold mb-3" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
              Practice Privately. Thrive Publicly.
            </p>

            {/* Premium sub-headline */}
            <p className="text-[clamp(1rem,2.2vw,1.2rem)] text-white/70 max-w-[480px] mx-auto md:mx-0 mb-5 leading-[1.6]" style={{ fontStyle: 'italic', animation: 'hero-fade .7s 150ms ease both' }}>
              "The fastest way to understand anything is to explain it out loud."
            </p>

            {/* Body — tight and punchy */}
            <p className="text-[clamp(0.95rem,2vw,1.1rem)] text-white/78 max-w-[460px] mx-auto md:mx-0 mb-5 leading-[1.7]">
              Speak any subject out loud. The AI scores your Accuracy, Depth, Clarity,
              Structure, and Confidence — then tells you exactly what to improve.
            </p>

            {/* Explanatory sub-headline */}
            <p className="text-[clamp(1rem,2.2vw,1.2rem)] text-white/92 max-w-[480px] mx-auto md:mx-0 mb-8 leading-[1.6]" style={{ fontWeight: 500 }}>
              Explain any topic out loud — we'll score your{' '}
              <span style={{ color: '#BAE6FD', fontWeight: 650 }}>clarity</span>,{' '}
              <span style={{ color: '#BAE6FD', fontWeight: 650 }}>depth</span>,{' '}
              <span style={{ color: '#BAE6FD', fontWeight: 650 }}>accuracy</span>,{' '}
              <span style={{ color: '#BAE6FD', fontWeight: 650 }}>structure</span>, and{' '}
              <span style={{ color: '#BAE6FD', fontWeight: 650 }}>confidence</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6">
              <button className="btn-primary">Start for Free</button>
              <button className="btn-secondary border-white/70 text-white hover:bg-white/20 hover:text-white">▶ Watch the Demo</button>
            </div>

            {/* Single clean trust line */}
            <p className="text-sm text-white/55">Talk privately. Grow publicly. Master anything.</p>
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
