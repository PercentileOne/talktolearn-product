import type { ReactNode } from 'react'

const FLOW_STEPS = [
  { num: '01', icon: '✏️', title: 'Enter a Subject',       desc: 'Type any topic — maths, science, history, a language, a skill, anything.' },
  { num: '02', icon: '⚡', title: 'Generate a Flashcard',  desc: 'The AI instantly builds a comprehensive Flashcard covering all relevant subject matter.' },
  { num: '03', icon: '👁️', title: 'Learn First',           desc: 'Read the Flashcard. Absorb the concept, the structure, and the depth before you speak or test.' },
  { num: '04', icon: '🔀', title: 'Choose: Talk or Test',  desc: 'Prove your understanding — explain it out loud for up to 6 minutes, or answer AI-generated questions.' },
]

function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-brand-blue mb-2">
      {children}
    </div>
  )
}

function Divider() {
  return <div className="border-t border-fc-border mt-6 pt-6" />
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5 text-[15px] text-fc-sub leading-[1.6]">
          <span className="mt-[5px] w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function FlashCard() {
  return (
    <div
      className="
        relative rounded-[20px] text-left max-w-2xl mx-auto overflow-hidden
        border border-fc-border
        transition-all duration-300
        hover:-translate-y-[2px] hover:shadow-fc-hover
      "
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)',
      }}
    >
      {/* AI generation badge — top of card, minimal */}
      <div className="flex items-center justify-between px-8 pt-6 pb-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] ai-pulse flex-shrink-0" />
          <span className="text-[0.68rem] font-semibold tracking-[0.06em] uppercase text-fc-sub/60">AI-Generated</span>
        </div>
        <span className="text-[0.65rem] text-emerald-500 font-semibold tracking-[0.04em]">Generated in 1.2s</span>
      </div>

      {/* Title block */}
      <div className="px-8 pt-5 pb-6">
        <div className="inline-block text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-brand-blue bg-brand-blue/[0.07] px-3 py-1 rounded-full mb-3">
          Science · Year 9
        </div>
        <h3
          className="text-[1.75rem] text-fc-text leading-[1.15] mb-1.5"
          style={{ fontWeight: 600, letterSpacing: '-0.3px' }}
        >
          Photosynthesis
        </h3>
        <p className="text-[15px] text-fc-sub leading-[1.6]">How plants convert light into energy</p>
      </div>

      {/* Body */}
      <div className="px-8 pb-8">

        {/* Explanation */}
        <div>
          <SectionHeader>Explanation</SectionHeader>
          <p className="text-[15px] text-fc-sub leading-[1.6]">
            Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen — taking place in the chloroplasts of plant cells.
          </p>
        </div>

        <Divider />

        {/* Key Points */}
        <div>
          <SectionHeader>Key Points</SectionHeader>
          <BulletList items={[
            'Requires sunlight, water (H₂O), and CO₂',
            'Produces glucose (energy) and oxygen',
            'Occurs in chloroplasts — contains chlorophyll',
            'Formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
          ]} />
        </div>

        <Divider />

        {/* Example + Structure — two column */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <SectionHeader>Example</SectionHeader>
            <p className="text-[15px] text-fc-sub leading-[1.6]">
              A leaf absorbs sunlight and pulls water from roots — converting both into sugar it uses to grow.
            </p>
          </div>
          <div>
            <SectionHeader>Structure</SectionHeader>
            <p className="text-[15px] text-fc-sub leading-[1.6]">
              Two stages: light-dependent reactions (thylakoid) → Calvin cycle (stroma) → glucose output.
            </p>
          </div>
        </div>

        <Divider />

        {/* Misconceptions + Breakdown — two column */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <SectionHeader>Misconceptions</SectionHeader>
            <BulletList items={[
              'Plants do not only absorb CO₂ — they also respire',
              'Photosynthesis stops at night — it needs light',
            ]} />
          </div>
          <div>
            <SectionHeader>Breakdown</SectionHeader>
            <BulletList items={[
              'Chlorophyll absorbs red + blue light',
              'Water is split to release electrons',
              'CO₂ is fixed into 3-carbon sugars',
            ]} />
          </div>
        </div>

        <Divider />

        {/* Summary */}
        <div
          className="rounded-2xl px-6 py-5"
          style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F7FF 100%)', border: '1px solid #D4DCF7' }}
        >
          <SectionHeader>Summary</SectionHeader>
          <p className="text-[15px] text-fc-sub leading-[1.6]">
            Plants are solar-powered sugar factories. Light + water + CO₂ → glucose + oxygen. The equation balances perfectly — and so does nature.
          </p>
        </div>

      </div>

      {/* Talk / Test footer */}
      <div
        className="px-8 py-6 flex flex-col sm:flex-row gap-3"
        style={{ borderTop: '1px solid #E5E9F0', background: '#FFFFFF' }}
      >
        <button
          className="
            flex-1 flex items-center justify-center gap-3 py-3.5 px-6
            bg-brand-blue text-white text-[0.9rem] font-semibold rounded-full
            transition-all duration-200
            hover:-translate-y-[1px]
          "
          style={{ boxShadow: '0 2px 8px rgba(30,77,216,0.3)' }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,77,216,0.4)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,77,216,0.3)')}
        >
          <span className="text-lg">🎙</span>
          <span>Talk · 2–6 min</span>
        </button>
        <button
          className="
            flex-1 flex items-center justify-center gap-3 py-3.5 px-6
            text-[0.9rem] font-semibold rounded-full
            border-2 border-fc-border text-fc-sub
            transition-all duration-200
            hover:border-brand-blue hover:text-brand-blue hover:-translate-y-[1px]
          "
        >
          <span className="text-lg">🧠</span>
          <span>Test · Instant Results</span>
        </button>
      </div>
    </div>
  )
}

export default function CardFlowSection() {
  return (
    <section className="bg-bg-alt py-12 md:py-20">
      <div className="max-w-[1160px] mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">The Flashcard — Your Learning Unit</h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-2xl mx-auto">Enter any subject and the AI generates a comprehensive Flashcard instantly. Then prove you know it: Talk or Test.</p>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col md:flex-row gap-0 mb-16">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flex md:flex-col md:flex-1 md:items-center md:text-center items-start gap-5 md:gap-0 relative pb-9 md:pb-0 md:px-3">
              {/* Mobile vertical line */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="absolute left-[13px] top-7 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent md:hidden" />
              )}
              {/* Desktop horizontal line */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden md:block absolute left-[calc(50%+24px)] right-[calc(-50%+24px)] top-5 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              <div className="text-[0.65rem] font-black tracking-[0.1em] text-primary min-w-[28px] md:mb-3">{step.num}</div>
              <div>
                <div className="w-10 h-10 flex items-center justify-center text-xl bg-bg-white rounded-xl shadow-[0_2px_12px_rgba(14,165,233,0.1)] border border-primary/[0.12] mb-0 md:mb-3 md:mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-text-dark mb-1 md:mt-3">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flashcard */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-text-muted mb-6">A real Flashcard — generated in seconds</p>
          <FlashCard />
        </div>

        {/* TALK / TEST mode cards */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="flex-1 bg-bg-white rounded-card p-8 shadow-card border border-primary/20">
            <div className="text-3xl mb-3">🎙</div>
            <h3 className="text-lg font-black tracking-[0.08em] text-primary mb-2.5">TALK</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Explain the Flashcard out loud — choose your own duration from <strong className="text-text-dark">2 to 6 minutes</strong>.
              The AI listens and scores you across five skills, then delivers your Verbal Mastery Score.
            </p>
            <div className="flex flex-wrap gap-2">
              {['2–6 Minutes','Accuracy','Depth','Clarity','Structure','Confidence'].map(t => (
                <span key={t} className={`text-[0.7rem] font-bold px-3 py-1 rounded-btn border ${t === '2–6 Minutes' ? 'bg-primary/15 text-primary-dark border-primary/30 font-extrabold' : 'bg-primary/10 text-primary-dark border-primary/20'}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-2 md:py-0 text-sm font-semibold text-text-muted uppercase tracking-wider">or</div>

          <div className="flex-1 bg-bg-white rounded-card p-8 shadow-card border border-accent-gold/20">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-black tracking-[0.08em] text-accent-gold mb-2.5">TEST</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              The AI generates targeted questions based on your Flashcard — testing recall, application, and real depth.
              Instant feedback on every answer, not just right or wrong.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Understanding','Application','Recall','Instant Feedback'].map(t => (
                <span key={t} className="text-[0.7rem] font-bold px-3 py-1 rounded-btn border bg-accent-gold/10 text-amber-800 border-accent-gold/20">{t}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
