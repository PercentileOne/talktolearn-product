import IpadWalkthrough from './IpadWalkthrough'

export default function IpadWalkthroughSection() {
  return (
    <section style={{
      background: 'linear-gradient(160deg,#0C1829 0%,#0E2040 40%,#091828 100%)',
      padding: '100px 20px 120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '56px',
    }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', maxWidth: '580px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '9px', fontWeight: 800, letterSpacing: '.18em',
          textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.45)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: '20px', padding: '5px 16px', marginBottom: '20px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 6px #60A5FA', display: 'inline-block' }} />
          See It In Action
        </div>

        <h2 style={{
          fontSize: 'clamp(1.9rem,5vw,3rem)',
          fontWeight: 900, color: '#FFFFFF',
          letterSpacing: '-.035em', lineHeight: 1.06,
          margin: '0 0 18px',
        }}>
          One subject. One session.{' '}
          <span style={{ background: 'linear-gradient(90deg,#60A5FA,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Total mastery.
          </span>
        </h2>

        <p style={{
          fontSize: '15px', color: 'rgba(255,255,255,.50)',
          lineHeight: 1.7, margin: '0 0 20px', maxWidth: '460px', marginInline: 'auto',
        }}>
          Watch the AI build your flashcard, guide your reading, then test what you know — in real time.
        </p>

        {/* Built for iPad badge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 16px', borderRadius: '20px',
            background: 'linear-gradient(135deg,rgba(96,165,250,.15),rgba(129,140,248,.15))',
            border: '1px solid rgba(96,165,250,.28)',
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.07em', color: 'rgba(255,255,255,.78)' }}>
              Built for iPad
            </span>
          </div>
        </div>
      </div>

      {/* iPad — responsive scale on smaller screens */}
      <div className="scale-[0.72] sm:scale-[0.88] md:scale-100 origin-top" style={{ lineHeight: 0 }}>
        <IpadWalkthrough />
      </div>
    </section>
  )
}
