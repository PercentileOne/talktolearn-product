import { useTranslation } from 'react-i18next'
import { track } from '../analytics'
import { openContact } from './NavBar'

const phases = [
  {
    badgeKey: 'roadmap.f1Badge',
    titleKey: 'roadmap.f1Title',
    descKey:  'roadmap.f1Desc',
    tags:     ['roadmap.f1Tag1', 'roadmap.f1Tag2', 'roadmap.f1Tag3'],
    accent:   '#34D399',
    glow:     'rgba(52,211,153,0.18)',
    border:   'rgba(52,211,153,0.28)',
    live:     true,
  },
  {
    badgeKey: 'roadmap.f2Badge',
    titleKey: 'roadmap.f2Title',
    descKey:  'roadmap.f2Desc',
    tags:     ['roadmap.f2Tag1', 'roadmap.f2Tag2', 'roadmap.f2Tag3'],
    accent:   '#818CF8',
    glow:     'rgba(129,140,248,0.15)',
    border:   'rgba(129,140,248,0.28)',
    live:     false,
  },
  {
    badgeKey: 'roadmap.f3Badge',
    titleKey: 'roadmap.f3Title',
    descKey:  'roadmap.f3Desc',
    tags:     ['roadmap.f3Tag1', 'roadmap.f3Tag2', 'roadmap.f3Tag3'],
    accent:   '#FBBF24',
    glow:     'rgba(251,191,36,0.12)',
    border:   'rgba(251,191,36,0.28)',
    live:     false,
  },
]

export default function RoadmapSection() {
  const { t } = useTranslation()

  return (
    <section id="roadmap" style={{ background: '#0A0F1C', padding: '80px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#818CF8', background: 'rgba(129,140,248,0.12)',
            border: '1px solid rgba(129,140,248,0.30)',
            borderRadius: 20, padding: '5px 16px', marginBottom: 16,
          }}>
            {t('roadmap.badge')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', fontWeight: 900, color: '#FFF', letterSpacing: '-0.03em', margin: '0 0 14px' }}>
            {t('roadmap.title')}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 620, margin: '0 auto', lineHeight: 1.65 }}>
            {t('roadmap.subtitle')}
          </p>
        </div>

        {/* Phase cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, marginBottom: 56 }}>
          {phases.map(({ badgeKey, titleKey, descKey, tags, accent, glow, border, live }) => (
            <div key={titleKey} style={{
              background: `linear-gradient(135deg,${glow},rgba(255,255,255,0.02))`,
              border: `1px solid ${border}`,
              borderRadius: 20, padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: 16,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Phase badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: accent,
                background: `${accent}18`, border: `1px solid ${accent}40`,
                borderRadius: 20, padding: '4px 12px', width: 'fit-content',
              }}>
                {live && (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}`, display: 'inline-block' }} />
                )}
                {t(badgeKey)}
              </span>

              <div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#FFF', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                  {t(titleKey)}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: 0 }}>
                  {t(descKey)}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 11, fontWeight: 700, color: accent,
                    background: `${accent}15`, border: `1px solid ${accent}30`,
                    borderRadius: 20, padding: '4px 12px',
                  }}>
                    {t(tag)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => { track('cta_roadmap_early_access'); openContact() }}
            style={{
              padding: '14px 36px', borderRadius: 50,
              background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
              color: '#FFF', fontSize: 15, fontWeight: 800,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(30,77,216,0.45)',
              letterSpacing: '0.01em',
            }}
          >
            {t('roadmap.cta')}
          </button>
        </div>
      </div>
    </section>
  )
}
