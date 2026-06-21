import { useState } from 'react'

const KF = `
@keyframes pr-fadein { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
`

const PLANS = [
  {
    name: 'Free',
    desc: 'Perfect for getting started',
    monthly: 0,
    annual: 0,
    priceSub: 'forever',
    features: [
      'Daily 10-minute talk',
      'Basic scoring & feedback',
      'Practice in any language',
      'Share your scores',
    ],
    cta: 'Get Started Free',
    featured: false,
    badge: null,
  },
  {
    name: 'Parent Plan',
    desc: 'Help your child build real confidence',
    monthly: 7.99,
    annual: 5.99,
    priceSub: '/ month',
    annualNote: 'billed £71.88 / year — save £24',
    features: [
      'Everything in Free',
      'For ages 3–18',
      'Child dashboard',
      'Weekly progress reports',
      'Confidence tracking',
      'School presentation prep',
      'Multi-language support',
      'Share talks with teachers',
    ],
    cta: 'Start Free Trial',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Pro',
    desc: 'For creators, coaches & professionals',
    monthly: 19.99,
    annual: 14.99,
    priceSub: '/ month',
    annualNote: 'billed £179.88 / year — save £60',
    features: [
      'Everything in Parent Plan',
      'Advanced analytics & deep scoring',
      'Script rehearsal mode',
      'Coaching mode',
      'Exportable reports',
      'Unlimited talks',
    ],
    cta: 'Go Pro',
    featured: false,
    badge: null,
  },
]

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <div style={{
      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
      background: dark ? 'rgba(96,165,250,.20)' : 'rgba(45,158,106,.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2.5 2.5L8 3" stroke={dark ? '#93C5FD' : '#2D9E6A'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section style={{ background: 'linear-gradient(180deg,#F0F5FF 0%,#EBF4FF 100%)', padding: '108px 20px 120px' }}>
      <style>{KF}</style>
      <div className="max-w-[1120px] mx-auto">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px', marginBottom: '20px',
            border: '1px solid rgba(30,77,216,.22)', background: 'rgba(30,77,216,.07)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1E4DD8', display: 'inline-block' }}/>
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#1E4DD8' }}>
              Pricing
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
            color: '#0A0F1C', margin: '0 0 14px',
          }}>
            Simple, fair, and built for everyone
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: '400px', margin: '0 auto 32px' }}>
            Start free. Upgrade when you're ready.
          </p>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
            {/* Avatar stack */}
            <div style={{ display: 'flex' }}>
              {['#60A5FA','#34D399','#F59E0B','#818CF8'].map((c, i) => (
                <div key={i} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: c, border: '2px solid #EBF4FF',
                  marginLeft: i === 0 ? 0 : '-8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 800, color: '#fff',
                }}>
                  {['S','P','C','T'][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>
              Join <strong style={{ color: '#0A0F1C' }}>thousands of learners</strong> already building confidence
            </span>
          </div>

          {/* Annual/monthly toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            padding: '6px 8px', borderRadius: '50px',
            background: '#FFFFFF', border: '1px solid #E8EDF5',
            boxShadow: '0 2px 8px rgba(0,0,0,.06)',
          }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                padding: '7px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                background: !annual ? '#1E4DD8' : 'transparent',
                color: !annual ? '#FFFFFF' : '#6B7280',
                fontSize: '13px', fontWeight: 700, transition: 'all .2s',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                padding: '7px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                background: annual ? '#1E4DD8' : 'transparent',
                color: annual ? '#FFFFFF' : '#6B7280',
                fontSize: '13px', fontWeight: 700, transition: 'all .2s',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}
            >
              Annual
              <span style={{
                padding: '2px 8px', borderRadius: '20px',
                background: annual ? 'rgba(255,255,255,.20)' : 'rgba(45,158,106,.12)',
                color: annual ? '#FFFFFF' : '#2D9E6A',
                fontSize: '10px', fontWeight: 800, letterSpacing: '.06em',
              }}>
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '56px', alignItems: 'start' }}
          className="grid-cols-1 md:grid-cols-3">
          {PLANS.map((plan, pi) => {
            const dark = plan.featured
            const price = annual && plan.monthly > 0 ? plan.annual : plan.monthly
            const priceStr = price === 0 ? '£0' : `£${price.toFixed(2)}`

            return (
              <div
                key={plan.name}
                style={{
                  position: 'relative',
                  display: 'flex', flexDirection: 'column',
                  borderRadius: '22px',
                  padding: dark ? '40px 36px' : '32px 32px',
                  textAlign: 'left',
                  background: dark
                    ? 'linear-gradient(160deg,#0E2040 0%,#1A3A6E 60%,#0E2A58 100%)'
                    : '#FFFFFF',
                  boxShadow: dark
                    ? '0 8px 24px rgba(14,32,64,.28), 0 32px 72px rgba(14,32,64,.32), 0 0 0 1px rgba(96,165,250,.18)'
                    : '0 2px 6px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.07)',
                  transform: dark ? 'scale(1.04)' : 'scale(1)',
                  animation: `pr-fadein .5s ${pi * 100}ms both`,
                  zIndex: dark ? 2 : 1,
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: '24px', right: '24px', height: '3px', borderRadius: '0 0 4px 4px',
                  background: dark
                    ? 'linear-gradient(90deg,#60A5FA,#818CF8)'
                    : 'rgba(30,77,216,.10)',
                }} />

                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg,#1E4DD8,#2A5BFF)',
                    color: '#FFF', fontSize: '10px', fontWeight: 800, letterSpacing: '.10em',
                    textTransform: 'uppercase' as const, padding: '5px 20px', borderRadius: '20px',
                    whiteSpace: 'nowrap' as const, boxShadow: '0 4px 14px rgba(30,77,216,.45)',
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan name + desc */}
                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: '4px', color: dark ? '#93C5FD' : '#1E4DD8' }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,.50)' : '#6B7280', marginBottom: '24px', lineHeight: 1.4 }}>
                  {plan.desc}
                </div>

                {/* Price */}
                <div style={{ marginBottom: '6px' }}>
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1, color: dark ? '#FFFFFF' : '#0A0F1C' }}>
                    {priceStr}
                  </div>
                  <div style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,.38)' : '#9CA3AF', marginTop: '6px' }}>
                    {price === 0 ? plan.priceSub : plan.priceSub}
                  </div>
                  {annual && plan.annualNote && (
                    <div style={{ fontSize: '11px', color: dark ? 'rgba(110,231,168,.70)' : '#2D9E6A', marginTop: '4px', fontWeight: 600 }}>
                      {plan.annualNote}
                    </div>
                  )}
                </div>

                <div style={{ height: '1px', background: dark ? 'rgba(255,255,255,.09)' : '#F0F2F5', margin: '24px 0' }} />

                {/* Features */}
                <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '28px', padding: 0, listStyle: 'none' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: dark ? 'rgba(255,255,255,.82)' : '#374151', lineHeight: 1.45 }}>
                      <CheckIcon dark={dark} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  style={{
                    width: '100%', padding: '14px 0', borderRadius: '50px',
                    border: dark ? 'none' : '2px solid #1E4DD8',
                    background: dark ? 'linear-gradient(135deg,#1E4DD8,#2A5BFF)' : 'transparent',
                    color: dark ? '#FFFFFF' : '#1E4DD8',
                    fontSize: '14px', fontWeight: 800, letterSpacing: '.02em', cursor: 'pointer',
                    boxShadow: dark ? '0 4px 18px rgba(30,77,216,.44), inset 0 1px 0 rgba(255,255,255,.15)' : 'none',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA block */}
        <div style={{
          textAlign: 'center', padding: '52px 32px 0',
          borderTop: '1px solid rgba(30,77,216,.10)',
        }}>
          <h3 style={{
            fontSize: 'clamp(1.3rem,3vw,1.9rem)',
            fontWeight: 900, letterSpacing: '-.02em', color: '#0A0F1C',
            margin: '0 0 10px',
          }}>
            Ready to feel the difference?
          </h3>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '28px', lineHeight: 1.6 }}>
            Start free today. No credit card needed. No commitment. Just talk.
          </p>
          <button style={{
            padding: '16px 40px', borderRadius: '50px',
            background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
            color: '#FFFFFF', fontSize: '15px', fontWeight: 800,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(30,77,216,.38)',
            transition: 'transform .2s, box-shadow .2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(30,77,216,.48)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(30,77,216,.38)'
          }}
          >
            Start for Free — No Credit Card Needed
          </button>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '12px' }}>
            Cancel anytime. No commitment.
          </p>
        </div>

      </div>
    </section>
  )
}
