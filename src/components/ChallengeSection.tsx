import PhoneMockup from './PhoneMockup'

const steps = [
  { num: 1, title: 'Pick a Topic',             desc: 'Choose anything — schoolwork, a concept, a script, a presentation, a story, a language.' },
  { num: 2, title: 'Talk for 2–6 Minutes',      desc: "Hit 'Start Talking' and explain it out loud. No pressure. No audience. No judgement." },
  { num: 3, title: 'Get Instant AI Feedback',   desc: 'Clarity. Accuracy. Depth. Structure. Confidence. Your Verbal Mastery Score, delivered instantly.' },
]

export default function ChallengeSection() {
  return (
    <section className="bg-bg-blue py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <span className="section-eyebrow">TalkToLearn</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em] mb-3">
              The 10-Minute Talk Challenge
            </h2>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted max-w-lg">
              The heart of TalkToLearn — read the Flashcard, explain the topic out loud for 2 to 6 minutes, and see the difference in 10 minutes.
            </p>
            <div className="flex flex-col gap-6 my-10 text-left">
              {steps.map(s => (
                <div key={s.num} className="flex gap-5 items-start bg-bg-white rounded-card p-6 shadow-card hover:-translate-y-0.5 transition-transform">
                  <div className="w-11 h-11 min-w-[44px] bg-primary text-white rounded-full flex items-center justify-center text-lg font-black shadow-blue-sm">{s.num}</div>
                  <div>
                    <h3 className="text-base font-bold text-text-dark mb-1.5">{s.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-start gap-3">
              <button className="btn-primary">Start for Free</button>
              <p className="text-sm text-text-muted">Practice privately. Perform publicly.</p>
              <p className="text-sm text-primary italic font-semibold">Think you know your stuff? We'll tell you the truth.</p>
            </div>
          </div>
          <PhoneMockup variant="timer" />
        </div>
      </div>
    </section>
  )
}
