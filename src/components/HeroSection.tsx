import { useTranslation } from 'react-i18next'
import PhoneMockup from './PhoneMockup'
import WatchMockup from './WatchMockup'

import { track } from '../analytics'
import { BookOpen, Mic, Trophy, Zap, Play } from 'lucide-react'

const HKF = `
@keyframes hero-fade { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
@keyframes hero-phone { from { opacity:0; transform:translateY(8px) scale(.96); } to { opacity:1; transform:none; } }
@media (max-width: 767px) { .devices-container { zoom: 0.52; } }
`

export default function HeroSection() {
  const { t } = useTranslation()

  const steps = [
    {
      step: t('hero.step1Label'),
      Icon: BookOpen,
      title: t('hero.step1Title'),
      desc: t('hero.step1Desc'),
      color: '#60A5FA',
      bg: 'linear-gradient(135deg,rgba(30,58,138,0.6),rgba(37,99,235,0.3))',
      border: 'rgba(96,165,250,0.30)',
    },
    {
      step: t('hero.step2Label'),
      Icon: Mic,
      title: t('hero.step2Title'),
      desc: t('hero.step2Desc'),
      color: '#C4B5FD',
      bg: 'linear-gradient(135deg,rgba(76,29,149,0.6),rgba(109,40,217,0.3))',
      border: 'rgba(167,139,250,0.30)',
    },
    {
      step: t('hero.step3Label'),
      Icon: Trophy,
      title: t('hero.step3Title'),
      desc: t('hero.step3Desc'),
      color: '#6EE7B7',
      bg: 'linear-gradient(135deg,rgba(6,78,59,0.6),rgba(16,185,129,0.3))',
      border: 'rgba(52,211,153,0.30)',
    },
  ]

  return (
    <section className="bg-hero-gradient py-20 md:py-28 overflow-hidden">
      <style>{HKF}</style>
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          <div className="flex-1 text-center md:text-left" style={{ animation: 'hero-fade .7s ease both' }}>
            {/* Badges row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }} className="md:justify-start">
              <div className="inline-flex items-center gap-2.5 bg-white/12 text-white text-[0.72rem] font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-btn border border-white/25 backdrop-blur-sm">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#BAE6FD', boxShadow: '0 0 7px #BAE6FD', display: 'inline-block', flexShrink: 0 }} />
                {t('hero.badge1')}
              </div>
              <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.10em] uppercase px-4 py-1.5 rounded-btn backdrop-blur-sm" style={{ background: 'linear-gradient(135deg,rgba(251,191,36,0.25),rgba(251,191,36,0.12))', border: '1px solid rgba(251,191,36,0.45)', color: '#FDE68A' }}>
                <Trophy size={11} color='#FDE68A' strokeWidth={2.5} /> {t('hero.badge2')}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.8rem,8vw,5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white mb-4" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.30), 0 1px 3px rgba(0,0,0,0.20)' }}>
              {t('hero.title')}
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.08em', marginBottom: 18, fontStyle: 'italic' }}>
              {t('hero.tagline')}
            </p>

            {/* Sub-headline */}
            <p className="text-[clamp(1.1rem,3vw,1.45rem)] text-white/90 font-semibold mb-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
              {t('hero.subheadline1')}<br/>
              <span style={{ color: '#FDE68A' }}>{t('hero.subheadline2')}</span>{' '}
              <span style={{ color: '#FFF' }}>{t('hero.scoringDimensions')}</span>
            </p>

            {/* Comprehension claim */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(52,211,153,0.50)', borderRadius: 12, padding: '10px 16px', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)' }}>
              <Zap size={18} color="#6EE7B7" strokeWidth={2.5} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6EE7B7', lineHeight: 1.4 }}>
                {t('hero.comprehensionBanner')}
              </span>
            </div>

            {/* 3-step flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {steps.map(({ step, Icon, title, desc, color, bg, border }) => (
                <div key={step} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: bg, borderRadius: 14,
                  padding: '16px 18px', border: `1px solid ${border}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={color} strokeWidth={2} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: '0.1em' }}>{step}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>{title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6">
              <button className="btn-primary" onClick={() => { track('cta_give_talk'); (window as unknown as Record<string, () => void>).__openVideoFeed?.() }} style={{ background: 'rgba(30,77,216,0.95)', boxShadow: '0 4px 18px rgba(30,77,216,0.55)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>🎙 Give a Talk</button>
              <button className="btn-secondary" onClick={() => { track('cta_watch_demo'); document.getElementById('live-stage')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', gap: 7 }}><Play size={13} strokeWidth={2.5} fill='white' /> {t('hero.watchDemo')}</button>
            </div>

            {/* Comprehension guarantee */}
            <p style={{ marginTop: 16, fontSize: 13, fontStyle: 'italic', fontWeight: 600, color: 'rgba(255,255,255,0.62)', letterSpacing: '0.01em' }}>
              "{t('hero.guarantee')}"
            </p>
            {/* Trust line */}
            <p className="text-sm text-white/40" style={{ marginTop: 10 }}>{t('hero.trust')}</p>
          </div>

          {/* Floating phone + watch — scale both down on mobile */}
          <div className="devices-container" style={{
            flexShrink: 0,
            display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 24,
            animation: 'hero-phone .9s .2s cubic-bezier(.4,0,.2,1) both',
            marginRight: '-40px',
          }}>
            <div className="w-[260px] md:w-auto" style={{
              filter: [
                'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
                'drop-shadow(0 32px 64px rgba(0,0,0,0.14))',
              ].join(' '),
            }}>
              <PhoneMockup variant="timer" animated />
            </div>

            <WatchMockup />
          </div>

        </div>
      </div>
    </section>
  )
}
