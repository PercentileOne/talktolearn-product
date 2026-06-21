import PhoneMockup from './PhoneMockup'

const SK = {
  light:   '#E2BC96',
  base:    '#C8946A',
  shadow:  '#9E6E46',
  deep:    '#7A5030',
  nail:    '#DEC0AE',
}

/* A single finger peeking around the back-left of the phone */
function Finger({ top, height = 58, highlight = false }: { top: number; height?: number; highlight?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      /* left:4px → only ~16px of the 24px finger width is visible past the phone frame left edge (pm-wrap left pad = 20px) */
      left: '4px',
      top: `${top}px`,
      width: '24px',
      height: `${height}px`,
      borderRadius: '12px',
      background: highlight
        ? `linear-gradient(100deg, ${SK.shadow} 0%, ${SK.base} 30%, ${SK.light} 62%, ${SK.base} 100%)`
        : `linear-gradient(100deg, ${SK.deep} 0%, ${SK.shadow} 28%, ${SK.base} 55%, ${SK.light} 80%)`,
      zIndex: 1,
      /* Right-side shadow gives the curved-finger 3-D effect */
      boxShadow: `inset -4px 0 10px rgba(0,0,0,0.22), inset 1px 0 4px rgba(255,255,255,0.10)`,
      pointerEvents: 'none',
    }} />
  )
}

/* The thumb overlapping the right side of the phone screen */
function Thumb({ bottom }: { bottom: number }) {
  return (
    <div style={{
      position: 'absolute',
      right: '18px',        /* aligns near phone frame right edge (pm-wrap right pad = 20px) */
      bottom: `${bottom}px`,
      width: '30px',
      height: '170px',
      borderRadius: '15px 15px 8px 8px',
      background: `linear-gradient(100deg, ${SK.shadow} 0%, ${SK.base} 32%, ${SK.light} 60%, ${SK.base} 85%, ${SK.shadow} 100%)`,
      zIndex: 3,
      boxShadow: `-3px 0 12px rgba(0,0,0,0.24), inset 3px 0 8px rgba(255,255,255,0.13)`,
      pointerEvents: 'none',
    }}>
      {/* Thumbnail */}
      <div style={{
        position: 'absolute',
        top: '5px', left: '5px', right: '5px',
        height: '24px',
        background: SK.nail,
        borderRadius: '9px 9px 7px 7px',
        opacity: 0.90,
        boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.28)',
      }} />
      {/* Knuckle crease 1 */}
      <div style={{
        position: 'absolute', top: '88px',
        left: '3px', right: '3px', height: '1.5px',
        background: `rgba(80,44,16,0.32)`, borderRadius: '1px',
      }} />
      {/* Knuckle crease 2 */}
      <div style={{
        position: 'absolute', top: '116px',
        left: '4px', right: '4px', height: '1px',
        background: `rgba(80,44,16,0.19)`, borderRadius: '1px',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HandHeldPhone
   Layer order:
     z:1  Four fingers — behind the phone, left side peeking out
     z:2  PhoneMockup  — the phone itself (animated screen)
     z:3  Thumb        — in front of the phone, right side

   The wrapper is display:inline-block (no extra paddingBottom) so there is NO
   gap below the phone. The hand is on the SIDES, not below.
   ───────────────────────────────────────────────────────────────────────────── */
export default function HandHeldPhone() {
  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      flexShrink: 0,
      transform: 'rotate(-3deg)',
      filter: [
        'drop-shadow(0 8px 20px rgba(0,0,0,0.16))',
        'drop-shadow(0 28px 52px rgba(0,0,0,0.12))',
      ].join(' '),
    }}>

      {/* ── Fingers behind the phone (left edge) ─────────────────────
          pm-wrap left padding = 20px → phone frame left edge at x=20.
          With left:4px and finger width=24px, the finger occupies x=4–28.
          The phone (z:2) covers x=20–28, leaving x=4–20 = 16px visible.
          ────────────────────────────────────────────────────────────── */}
      <Finger top={218} height={60} highlight />   {/* index   */}
      <Finger top={290} height={63} />              {/* middle  */}
      <Finger top={362} height={59} />              {/* ring    */}
      <Finger top={428} height={44} />              {/* pinky   */}

      {/* ── Phone ─────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PhoneMockup variant="timer" animated />
      </div>

      {/* ── Thumb in front of phone (right edge) ─────────────────────
          bottom:120px puts the thumb in the lower-centre of the phone,
          which is the natural resting position for a one-handed grip.
          ────────────────────────────────────────────────────────────── */}
      <Thumb bottom={120} />

    </div>
  )
}
