import PhoneMockup from './PhoneMockup'

const steps = [
  {
    num: 1,
    title: 'Pick a Topic',
    desc: 'Choose anything — schoolwork, a concept, a script, a presentation, a story, a language.',
  },
  {
    num: 2,
    title: 'Talk for 2 Minutes',
    desc: "Hit 'Start Talking' and explain it out loud. No pressure. No audience. No judgement.",
  },
  {
    num: 3,
    title: 'Get Instant AI Feedback',
    desc: 'Clarity. Accuracy. Depth. Structure. Confidence. Your Verbal Mastery Score.',
  },
]

export default function ChallengeSection() {
  return (
    <section className="challenge-section section">
      <div className="container">
        <div className="challenge-inner">
          <div className="challenge-content">
            <h2 className="section-title">The 2-Minute Talk Challenge</h2>
            <p className="section-subtitle">
              Master any topic by explaining it out loud — in just 120 seconds.
            </p>

            <div className="challenge-steps">
              {steps.map((s) => (
                <div key={s.num} className="challenge-step">
                  <div className="challenge-step-num">{s.num}</div>
                  <div className="challenge-step-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="challenge-ctas">
              <button className="btn-primary">Start Your First Talk</button>
              <p className="challenge-micro">Practice privately. Perform publicly.</p>
              <p className="challenge-truth">Think you know your stuff? We'll tell you the truth.</p>
            </div>
          </div>

          <PhoneMockup variant="timer" />
        </div>
      </div>
    </section>
  )
}
