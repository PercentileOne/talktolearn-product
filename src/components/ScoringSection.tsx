import PhoneMockup from './PhoneMockup'

export default function ScoringSection() {
  return (
    <section className="scoring-section section">
      <div className="container">
        <div className="scoring-inner">
          <div className="scoring-text">
            <div className="section-eyebrow">AI-Powered Analysis</div>
            <h2 className="section-title">Your Voice. Measured. Mastered.</h2>
            <p className="section-subtitle">
              AI breaks down your speaking performance into the five skills that matter most.
            </p>
            <div className="scoring-skill-list">
              {[
                { icon: '🎯', name: 'Accuracy',   desc: 'Did you explain the topic correctly?' },
                { icon: '🔍', name: 'Depth',      desc: 'Did you go beyond the surface?' },
                { icon: '💡', name: 'Clarity',    desc: 'Did you speak clearly and logically?' },
                { icon: '🏗️', name: 'Structure',  desc: 'Did your explanation flow?' },
                { icon: '⚡', name: 'Confidence', desc: 'Did you sound sure of yourself?' },
              ].map(s => (
                <div key={s.name} className="scoring-skill">
                  <span className="scoring-skill-icon">{s.icon}</span>
                  <div>
                    <strong>{s.name}</strong>
                    <span> — {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="scoring-micro">We don't guess. We measure.</p>
          </div>
          <PhoneMockup variant="scores" />
        </div>
      </div>
    </section>
  )
}
