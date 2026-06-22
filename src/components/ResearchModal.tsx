const KF = `
@keyframes rm-backdrop { from { opacity:0; } to { opacity:1; } }
@keyframes rm-slide { from { opacity:0; transform:translateY(20px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
`

const CITATIONS = [
  {
    num: '01',
    title: 'The Protégé Effect',
    authors: 'Nestojko et al.',
    journal: 'Memory & Cognition, 2014',
    finding: 'Students who were told they would teach material to others learned significantly more than those who were only told they would be tested. Expecting to teach triggers deeper processing.',
    accent: '#2D9E6A',
  },
  {
    num: '02',
    title: 'Retrieval Practice Produces More Learning',
    authors: 'Roediger & Karpicke',
    journal: 'Psychological Science, 2006',
    finding: 'Retrieving information from memory (as you do when explaining aloud) produces greater long-term retention than re-reading the same material multiple times.',
    accent: '#1E4DD8',
  },
  {
    num: '03',
    title: 'Generative Learning Through Explanation',
    authors: 'Fiorella & Mayer',
    journal: 'Educational Psychology Review, 2016',
    finding: 'Self-explanation — generating explanations of material in your own words — is one of the most effective learning strategies, producing deeper understanding and better transfer.',
    accent: '#7C3AED',
  },
  {
    num: '04',
    title: 'The Feynman Technique',
    authors: 'Feynman, R.P.',
    journal: 'Surely You\'re Joking, Mr Feynman!, 1985',
    finding: 'Nobel Prize-winning physicist Richard Feynman\'s core method: if you cannot explain a concept in simple terms, you do not yet understand it. Explanation reveals the gaps.',
    accent: '#D97706',
  },
  {
    num: '05',
    title: 'Learning by Teaching Others',
    authors: 'Roscoe & Chi',
    journal: 'Review of Educational Research, 2007',
    finding: 'Teaching others promotes knowledge-building through explanation, elaboration, and monitoring — processes that passive learning never triggers. Talking is active learning at its most effective.',
    accent: '#DB2777',
  },
]

export default function ResearchModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <style>{KF}</style>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(8,14,28,0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'rm-backdrop .25s ease both',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '660px',
            width: '100%',
            maxHeight: '88vh',
            overflowY: 'auto',
            animation: 'rm-slide .32s cubic-bezier(.4,0,.2,1) both',
            boxShadow: '0 24px 80px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.06)',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,#0E2A1E 0%,#1A4A30 100%)',
            borderRadius: '24px 24px 0 0',
            padding: '36px 36px 32px',
            position: 'relative',
          }}>
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '18px', right: '18px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', border: 'none',
                color: '#fff', fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '4px 12px', borderRadius: '20px', marginBottom: '16px',
              background: 'rgba(45,158,106,0.20)', border: '1px solid rgba(45,158,106,0.35)',
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#6EE7A8' }}>
                Peer-Reviewed Research
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.3rem,4vw,1.75rem)',
              fontWeight: 900, color: '#FFFFFF',
              letterSpacing: '-.03em', margin: '0 0 8px', lineHeight: 1.1,
            }}>
              The Science Behind Learning by Talking
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
              5 studies that prove explaining out loud is the fastest way to learn
            </p>
          </div>

          {/* Citations */}
          <div style={{ padding: '28px 36px 36px' }}>
            {CITATIONS.map((c, i) => (
              <div key={c.num} style={{
                paddingBottom: i < CITATIONS.length - 1 ? '24px' : 0,
                marginBottom: i < CITATIONS.length - 1 ? '24px' : 0,
                borderBottom: i < CITATIONS.length - 1 ? '1px solid #F0F2F7' : 'none',
              }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    background: `${c.accent}12`, border: `1px solid ${c.accent}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 800, color: c.accent, letterSpacing: '.05em',
                  }}>
                    {c.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0A0F1C', margin: '0 0 3px' }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: c.accent, fontWeight: 700, margin: '0 0 10px', letterSpacing: '.01em' }}>
                      {c.authors} · {c.journal}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.7, margin: 0 }}>
                      {c.finding}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Footer note */}
            <div style={{
              marginTop: '28px', padding: '16px 20px', borderRadius: '12px',
              background: '#F8FAFF', border: '1px solid #E8EDF5',
            }}>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: '#0A0F1C' }}>Talk to Learn</strong> applies these evidence-based principles in a single daily practice: explain a topic out loud, get scored on clarity, depth, accuracy, structure and confidence, and improve faster than any other method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
