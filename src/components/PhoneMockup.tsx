// Reusable premium iPhone-style phone mockup
// variant="timer"  → shows the 2-minute talk screen
// variant="scores" → shows the Verbal Mastery Score screen

interface Props {
  variant?: 'timer' | 'scores'
}

function TimerScreen() {
  return (
    <div className="pm-screen-content">
      <div className="pm-app-name">Teach to Learn</div>
      <div className="pm-topic-pill">Topic: Photosynthesis</div>
      <div className="pm-timer-ring">
        <svg viewBox="0 0 100 100" className="pm-ring-svg">
          <circle cx="50" cy="50" r="44" className="pm-ring-track" />
          <circle cx="50" cy="50" r="44" className="pm-ring-progress" />
        </svg>
        <div className="pm-timer-inner">
          <span className="pm-timer-digits">1:47</span>
          <span className="pm-timer-label">remaining</span>
        </div>
      </div>
      <div className="pm-waveform">
        {[18, 32, 24, 42, 28, 36, 16, 38, 22, 30, 14].map((h, i) => (
          <div key={i} className="pm-bar" style={{ '--h': `${h}px`, '--d': `${i * 0.08}s` } as React.CSSProperties} />
        ))}
      </div>
      <div className="pm-start-btn">
        <span className="pm-mic-icon">🎙</span>
        Speaking…
      </div>
      <div className="pm-hint">Private · No audience · No judgement</div>
    </div>
  )
}

function ScoreScreen() {
  const scores = [
    { label: 'Accuracy',   val: 87, color: '#38BDF8' },
    { label: 'Depth',      val: 74, color: '#818CF8' },
    { label: 'Clarity',    val: 91, color: '#34D399' },
    { label: 'Structure',  val: 82, color: '#FB923C' },
    { label: 'Confidence', val: 78, color: '#F472B6' },
  ]
  return (
    <div className="pm-screen-content">
      <div className="pm-app-name">Teach to Learn</div>
      <div className="pm-score-headline">Your Results</div>
      <div className="pm-vms-ring">
        <span className="pm-vms-number">82</span>
        <span className="pm-vms-label">Verbal Mastery Score</span>
      </div>
      <div className="pm-score-rows">
        {scores.map(s => (
          <div key={s.label} className="pm-score-row">
            <div className="pm-score-row-top">
              <span className="pm-score-name">{s.label}</span>
              <span className="pm-score-val" style={{ color: s.color }}>{s.val}</span>
            </div>
            <div className="pm-score-track">
              <div className="pm-score-fill" style={{ width: `${s.val}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PhoneMockup({ variant = 'timer' }: Props) {
  return (
    <div className="pm-wrap">
      {/* Ambient glow underneath */}
      <div className="pm-ambient" />

      {/* Outer titanium frame */}
      <div className="pm-frame">
        {/* Side hardware buttons */}
        <div className="pm-btn pm-btn-vol-up" />
        <div className="pm-btn pm-btn-vol-down" />
        <div className="pm-btn pm-btn-power" />

        {/* Screen bezel */}
        <div className="pm-bezel">
          {/* Dynamic Island */}
          <div className="pm-island" />

          {/* App screen */}
          <div className="pm-screen">
            {variant === 'timer' ? <TimerScreen /> : <ScoreScreen />}
          </div>
        </div>
      </div>
    </div>
  )
}
