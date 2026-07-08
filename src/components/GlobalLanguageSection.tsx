const LANGUAGES = ['English', 'Twi', 'French', 'Spanish', 'Mandarin', 'Arabic', 'Hindi', 'Portuguese']

export default function GlobalLanguageSection() {
  return (
    <section style={{ background: '#0A0F1C', padding: '108px 20px 120px', position: 'relative', overflow: 'hidden' }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '700px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(45,158,106,.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div className="max-w-[1120px] mx-auto" style={{ position: 'relative', textAlign: 'center' }}>

        {/* Globe icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'rgba(45,158,106,.12)', border: '1px solid rgba(45,158,106,.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D9E6A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
          fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
          color: '#FFFFFF', margin: '0 0 14px',
        }}>
          TalkToLearn in Any Language
        </h2>

        <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'rgba(255,255,255,.55)', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto 48px' }}>
          Your voice, your language, your world. The Teach to Learn Principle applies everywhere — which is everywhere.
        </p>

        {/* Language pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '48px' }}>
          {LANGUAGES.map(lang => (
            <div key={lang} style={{
              padding: '10px 22px', borderRadius: '50px',
              background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
              fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,.80)',
              letterSpacing: '.02em',
              transition: 'background .2s, border-color .2s, color .2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(45,158,106,.18)'
              el.style.borderColor = 'rgba(45,158,106,.40)'
              el.style.color = '#6EE7A8'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,.06)'
              el.style.borderColor = 'rgba(255,255,255,.12)'
              el.style.color = 'rgba(255,255,255,.80)'
            }}
            >
              {lang}
            </div>
          ))}
          {/* More coming */}
          <div style={{
            padding: '10px 22px', borderRadius: '50px',
            background: 'rgba(45,158,106,.08)', border: '1px solid rgba(45,158,106,.20)',
            fontSize: '13px', fontWeight: 600, color: 'rgba(110,231,168,.60)',
            letterSpacing: '.04em', fontStyle: 'italic',
          }}>
            + more coming soon
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '44px' }}>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,.90)', marginBottom: '8px' }}>
            Confidence has no language barrier.
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.40)', fontStyle: 'italic' }}>
            Your voice is your passport.
          </p>
        </div>

      </div>
    </section>
  )
}
