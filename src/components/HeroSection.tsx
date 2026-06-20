import PhoneMockup from './PhoneMockup'

export default function HeroSection() {
  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">The 2-Minute Talk Challenge</div>
            <h1 className="hero-title">Teach to Learn</h1>
            <p className="hero-tagline">Private Talk. Public Mastery.</p>
            <p className="hero-sub">
              Unlock confidence, clarity, and mastery — by speaking out loud for just 2 minutes a day.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary hero-cta-primary">Start the 2-Minute Challenge</button>
              <button className="btn-secondary">▶ Watch How It Works</button>
            </div>
            <p className="hero-micro">Practice privately. Perform publicly. Master anything.</p>
            <p className="hero-challenge">Think you know your stuff? We'll tell you the truth.</p>
          </div>
          <PhoneMockup variant="timer" />
        </div>
      </div>
    </section>
  )
}
