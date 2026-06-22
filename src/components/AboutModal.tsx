const KF = `
@keyframes am-backdrop { from { opacity:0; } to { opacity:1; } }
@keyframes am-slide { from { opacity:0; transform:translateY(24px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
`

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <style>{KF}</style>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(8,14,28,0.78)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'am-backdrop .25s ease both',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Panel */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '640px',
            width: '100%',
            maxHeight: '88vh',
            overflowY: 'auto',
            animation: 'am-slide .32s cubic-bezier(.4,0,.2,1) both',
            boxShadow: '0 24px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,#1E4DD8 0%,#2A5BFF 100%)',
            borderRadius: '24px 24px 0 0',
            padding: '36px 36px 32px',
            position: 'relative',
          }}>
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '18px', right: '18px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)', border: 'none',
                color: '#fff', fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1,
              }}
            >×</button>

            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', marginBottom: '16px',
            }}>🎙</div>

            <h2 style={{
              fontSize: 'clamp(1.4rem,4vw,1.9rem)',
              fontWeight: 900, color: '#FFFFFF',
              letterSpacing: '-.03em', margin: '0 0 8px',
              lineHeight: 1.1,
            }}>
              Why Learn by Talking Exists
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.70)', margin: 0, lineHeight: 1.5 }}>
              The story behind the app
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: '36px' }}>

            {/* Pull quote */}
            <div style={{
              background: 'linear-gradient(135deg,#F0F5FF,#EBF4FF)',
              borderRadius: '16px',
              padding: '24px 28px',
              borderLeft: '4px solid #1E4DD8',
              marginBottom: '28px',
            }}>
              <p style={{
                fontSize: 'clamp(1rem,2.5vw,1.2rem)',
                fontStyle: 'italic', fontWeight: 600,
                color: '#0A0F1C', lineHeight: 1.65, margin: 0,
              }}>
                "I have hundreds of books. I've always loved reading. But I realised — like most people — that reading alone doesn't make you retain things. Not really."
              </p>
            </div>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '20px' }}>
              A few years ago, I started adding a simple habit to my routine: after reading something, I'd record myself on a voice note or camera, explaining what I'd just learned — in my own words, out loud.
            </p>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '20px' }}>
              The results were immediate. I was retaining information more deeply than I ever had. When someone asked me to explain a concept, I could. When I went to interviews, I actually knew my stuff — not just recognised it on a page.
            </p>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '20px' }}>
              The truth is, <strong>you never really know how much you've understood something until you have to explain it.</strong> That's the moment the gaps appear — and that's exactly when real learning happens.
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: '#F0F2F7', margin: '28px 0' }} />

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0A0F1C', marginBottom: '14px' }}>
              The Science Behind It
            </h3>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '20px' }}>
              This isn't just intuition — it's called the <strong>Feynman Technique</strong>, named after Nobel Prize-winning physicist Richard Feynman. His method was simple: if you can't explain something simply, you don't understand it yet.
            </p>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '28px' }}>
              When you explain something out loud, your brain switches into <em>teacher mode</em>. You organise your thoughts. You connect ideas. You spot gaps instantly. And those gaps — the moments you stumble — are where the real learning happens.
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: '#F0F2F7', margin: '28px 0' }} />

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0A0F1C', marginBottom: '14px' }}>
              So We Built the App
            </h3>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '20px' }}>
              Learn by Talking gives you a topic, a timer, and a microphone. You explain it out loud — just like you would to a friend, a colleague, or a camera. Then our AI scores your <strong>Clarity</strong>, <strong>Depth</strong>, <strong>Accuracy</strong>, <strong>Structure</strong>, and <strong>Confidence</strong> — and tells you exactly what to work on.
            </p>

            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '20px' }}>
              It's private practice for public performance. No judgement. No pressure. Just you, your voice, and a smarter way to learn.
            </p>

            {/* Emotional truth block */}
            <div style={{
              background: 'linear-gradient(135deg,#0E2040,#1A3A6E)',
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '28px',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 'clamp(1.05rem,2.5vw,1.2rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.65,
                margin: '0 0 10px',
              }}>
                You will feel the difference — immediately.
              </p>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.62)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                Not just in what you know — but in how you feel about yourself. Your confidence. Your clarity. The way you walk into a room knowing you can explain anything you've learned. That feeling is real, and it happens faster than you think.
              </p>
            </div>

            {/* Stat pills */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px',
            }}>
              {[
                { stat: '2×', label: 'faster retention vs reading alone' },
                { stat: '10 min', label: 'daily practice is all it takes' },
                { stat: '5 scores', label: 'clarity · depth · accuracy · structure · confidence' },
              ].map(({ stat, label }) => (
                <div key={stat} style={{
                  flex: '1 1 160px',
                  background: '#F8FAFF',
                  border: '1px solid #E8EDF5',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1E4DD8', letterSpacing: '-.02em' }}>{stat}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onClose}
              style={{
                width: '100%', padding: '16px',
                borderRadius: '50px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
                color: '#FFFFFF', fontSize: '15px', fontWeight: 800,
                boxShadow: '0 4px 18px rgba(30,77,216,.38)',
                transition: 'transform .18s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
            >
              Start Talking for Free →
            </button>

          </div>
        </div>
      </div>
    </>
  )
}
