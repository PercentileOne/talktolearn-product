const PROMISES = [
  {
    title: 'Build Confidence',
    desc: 'Your child practises privately — no pressure, no audience, no judgement.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Improve Speaking Skills',
    desc: 'Clarity, structure, expression, and confidence improve naturally over time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    title: 'Prepare for School Success',
    desc: 'Presentations, reading aloud, oral exams — all become easier, naturally.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
]

export default function ParentSection() {
  return (
    <section style={{ background: '#FAFBFC', padding: '108px 20px 120px' }}>
      <div className="max-w-[1120px] mx-auto">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px', marginBottom: '20px',
            border: '1px solid rgba(245,158,11,.24)', background: 'rgba(245,158,11,.07)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}/>
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#D97706' }}>
              For Parents
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.1,
            color: '#0A0F1C', margin: '0 0 14px', maxWidth: '680px', marginInline: 'auto',
          }}>
            For Every Parent Who Wants Their Child to Speak with Confidence
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: '480px', margin: '0 auto' }}>
            Help your child find their voice — privately, safely, and at their own pace.
          </p>
        </div>

        {/* Quote block */}
        <div style={{
          maxWidth: '720px', margin: '0 auto 56px',
          padding: '36px 40px', borderRadius: '20px',
          background: '#FFFFFF', border: '1px solid #E8EDF5',
          borderLeft: '4px solid #F59E0B',
          boxShadow: '0 4px 12px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.07)',
          position: 'relative',
        }}>
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ marginBottom: '18px', opacity: .20 }}>
            <path d="M0 28V15.75C0 7 5.25 1.75 15.75 0L17.5 3.5C11.08 5.25 8.17 8.17 8.17 12.25V14H19.25V28H0zm18.67 0V15.75C18.67 7 23.92 1.75 34.42 0L36 3.5C29.58 5.25 26.83 8.17 26.83 12.25V14H36V28H18.67z" fill="#0A0F1C"/>
          </svg>
          <p style={{
            fontSize: 'clamp(1rem,2vw,1.15rem)', fontStyle: 'italic', fontWeight: 400,
            color: '#1A2332', lineHeight: 1.75, margin: '0 0 18px',
          }}>
            My son used to freeze when speaking. He'd whisper. He'd avoid eye contact. He'd panic before presentations.
            We tried Talk to Learn for just 10 minutes a day… and last week he stood in front of
            400 students and delivered the best talk of his life. I cried. This changed everything.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#FCD34D,#F59E0B)', flexShrink: 0 }}/>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0A0F1C' }}>Sarah M.</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Parent — London</div>
            </div>
          </div>
        </div>

        {/* Promise cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {PROMISES.map((p) => (
            <div key={p.title} style={{
              background: '#FFFFFF', border: '1px solid #E8EDF5',
              borderRadius: '16px', padding: '28px 28px 26px',
              boxShadow: '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)',
              transition: 'transform .22s ease, box-shadow .22s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,.06), 0 16px 40px rgba(0,0,0,.10)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)'
            }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.16)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#D97706', marginBottom: '18px',
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0A0F1C', margin: '0 0 10px' }}>{p.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button style={{
            padding: '16px 36px', borderRadius: '50px',
            background: 'linear-gradient(135deg,#F59E0B,#D97706)',
            color: '#FFFFFF', fontSize: '15px', fontWeight: 800,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(245,158,11,.36)',
          }}>
            Try the 10-Minute Challenge with Your Child
          </button>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '12px', fontStyle: 'italic' }}>
            Every child deserves to feel confident when they speak.
          </p>
        </div>

      </div>
    </section>
  )
}
