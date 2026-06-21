import PhoneMockup from './PhoneMockup'

/* ── Skin palette ─────────────────────────────────────────────────────────── */
const SK = {
  highlight: '#EAC4A0',
  light:     '#D8A880',
  base:      '#C49070',
  shadow:    '#9E7050',
  deep:      '#7A5030',
  nail:      '#DFBFAD',
}

/* ── PalmSVG ──────────────────────────────────────────────────────────────────
   230px wide — exactly matches the phone frame width.
   Top corners are rounded to visually cup the phone bottom corners.
   Tapers naturally to wrist (155px wide at base).
   Height: 190px (overlaps into phone frame by ~20px at top).
   ─────────────────────────────────────────────────────────────────────────── */
function PalmSVG() {
  return (
    <svg
      viewBox="0 0 230 190"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '230px', height: '190px', display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Diagonal skin gradient: lighter upper-left → deeper lower-right */}
        <linearGradient id="hh-pg" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor={SK.highlight} />
          <stop offset="35%"  stopColor={SK.light} />
          <stop offset="70%"  stopColor={SK.base} />
          <stop offset="100%" stopColor={SK.shadow} />
        </linearGradient>

        {/* Top-to-bottom fade: bright at top → shadow at bottom */}
        <linearGradient id="hh-pv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.14)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.16)" />
        </linearGradient>

        {/* Side-edge shadow: dark at edges → transparent center */}
        <radialGradient id="hh-pe" cx="50%" cy="50%" r="55%">
          <stop offset="60%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.10)" />
        </radialGradient>
      </defs>

      {/* ── Main palm body ──────────────────────────────────────────────
          Top corners curve to match the phone frame's 46px border-radius.
          Sides taper inward toward wrist (155px at base vs 230px at top).
          ────────────────────────────────────────────────────────────── */}
      <path
        d="
          M 0,38
          C 0,12 12,0 38,0
          L 192,0
          C 218,0 230,12 230,38
          L 230,138
          C 230,162 216,178 192,182
          L 38,182
          C 14,178 0,162 0,138
          Z
        "
        fill="url(#hh-pg)"
      />
      {/* Highlight + shadow overlay */}
      <path
        d="
          M 0,38 C 0,12 12,0 38,0 L 192,0 C 218,0 230,12 230,38
          L 230,138 C 230,162 216,178 192,182 L 38,182
          C 14,178 0,162 0,138 Z
        "
        fill="url(#hh-pv)"
      />
      {/* Edge vignette */}
      <path
        d="
          M 0,38 C 0,12 12,0 38,0 L 192,0 C 218,0 230,12 230,38
          L 230,138 C 230,162 216,178 192,182 L 38,182
          C 14,178 0,162 0,138 Z
        "
        fill="url(#hh-pe)"
      />

      {/* Thenar eminence (thumb-muscle bulge on right side) */}
      <ellipse
        cx="188" cy="148" rx="34" ry="20"
        fill="rgba(255,255,255,0.08)"
      />

      {/* Hypothenar (little-finger-muscle on left) */}
      <ellipse
        cx="42" cy="150" rx="28" ry="16"
        fill="rgba(0,0,0,0.04)"
      />

      {/* Very faint knuckle fold at palm–finger junction (top edge) */}
      <path
        d="M 40,3 C 80,9 150,9 190,3"
        stroke={SK.shadow} strokeWidth="0.7" fill="none"
        opacity="0.28" strokeLinecap="round"
      />

      {/* Subtle palm crease */}
      <path
        d="M 12,80 C 60,70 140,72 200,68"
        stroke={SK.deep} strokeWidth="0.6" fill="none"
        opacity="0.11" strokeLinecap="round"
      />
    </svg>
  )
}

/* ── ThumbSVG ─────────────────────────────────────────────────────────────────
   32px wide × 200px tall.
   Appears in FRONT of the phone along its right edge, overlapping ~12px.
   Slightly curved to feel natural.
   ─────────────────────────────────────────────────────────────────────────── */
function ThumbSVG() {
  return (
    <svg
      viewBox="0 0 38 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '38px', height: '200px', display: 'block' }}
    >
      <defs>
        {/* Left-to-right: shadow edge → highlight → base → right-edge shadow */}
        <linearGradient id="hh-tg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={SK.shadow} />
          <stop offset="25%"  stopColor={SK.base} />
          <stop offset="55%"  stopColor={SK.highlight} />
          <stop offset="80%"  stopColor={SK.light} />
          <stop offset="100%" stopColor={SK.base} />
        </linearGradient>
        {/* Top-to-bottom: tip lighter → base darker */}
        <linearGradient id="hh-tv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.10)" />
        </linearGradient>
      </defs>

      {/* Thumb body — slightly curved left edge */}
      <path
        d="
          M 5,200
          C 1,165 -3,125 1,88
          C 4,56 12,22 19,6
          C 22,-1 32,-1 36,8
          C 40,20 39,58 37,92
          C 35,135 34,165 34,200
          Z
        "
        fill="url(#hh-tg)"
      />
      {/* Highlight overlay */}
      <path
        d="
          M 5,200 C 1,165 -3,125 1,88 C 4,56 12,22 19,6
          C 22,-1 32,-1 36,8 C 40,20 39,58 37,92
          C 35,135 34,165 34,200 Z
        "
        fill="url(#hh-tv)"
      />

      {/* Thumbnail */}
      <path
        d="M 14,6 C 16,-2 31,-2 34,7 C 36,17 34,32 25,33 C 17,33 12,20 14,6 Z"
        fill={SK.nail}
        opacity="0.90"
      />
      {/* Nail highlight */}
      <path
        d="M 17,7 C 19,1 29,1 31,7 C 33,13 31,23 25,24 C 19,24 16,15 17,7 Z"
        fill="rgba(255,255,255,0.28)"
      />

      {/* First knuckle crease */}
      <path
        d="M 3,95 C 14,89 32,89 38,95"
        stroke={SK.deep} strokeWidth="1.1" fill="none"
        opacity="0.38" strokeLinecap="round"
      />
      {/* Second knuckle crease (subtler) */}
      <path
        d="M 5,128 C 14,122 32,122 38,128"
        stroke={SK.deep} strokeWidth="0.7" fill="none"
        opacity="0.22" strokeLinecap="round"
      />

      {/* Left-edge shadow stripe for curvature */}
      <path
        d="M 5,200 C 1,165 -3,125 1,88 C 4,56 12,22 19,6 L 23,6 C 16,22 8,56 5,88 C 1,125 5,165 9,200 Z"
        fill="rgba(0,0,0,0.07)"
      />
    </svg>
  )
}

/* ── HandHeldPhone ────────────────────────────────────────────────────────────
   Layer stack:
   z:1  Palm SVG  — behind the phone, overlaps its bottom edge by ~20px
   z:2  PhoneMockup — the animated screen
   z:3  Thumb SVG — in front of the phone, along its right edge

   The palm is 230px wide = exactly the phone frame width.
   Centered within the wrapper so it aligns with the frame precisely.

   Positioning:
   pm-wrap total height ≈ 24 (top pad) + 500 (frame) + 36 (bottom pad) = 560px
   Extra paddingBottom: 140px → wrapper total ≈ 700px

   Palm: bottom: 0 → palm bottom at wrapper bottom (700px),
         palm top at 700-190 = 510px (phone frame bottom ≈ 524px → overlaps ~14px) ✓

   Thumb: bottom: 200px → thumb bottom at 500px from top (just below phone centre),
          thumb top: 500-200 = 300px (one-third down the phone) ✓
   ─────────────────────────────────────────────────────────────────────────── */
export default function HandHeldPhone() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        flexShrink: 0,
        paddingBottom: '140px',
        /* Slight tilt matching reference angle */
        transform: 'rotate(-2deg)',
        /* Photographic depth via drop-shadow filter */
        filter: [
          'drop-shadow(0 8px 24px rgba(0,0,0,0.12))',
          'drop-shadow(0 24px 48px rgba(0,0,0,0.10))',
        ].join(' '),
      }}
    >
      {/* Ground shadow ellipse */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        left: '14%',
        right: '14%',
        height: '28px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.30) 0%, transparent 70%)',
        filter: 'blur(14px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* ── z:1 Palm — behind the phone ──────────────────────────────────
          Centered at 230px wide = phone frame width.
          bottom:0 ensures it sits flush at the wrapper's base.
          ──────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        <PalmSVG />
      </div>

      {/* ── z:2 Phone ─────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PhoneMockup variant="timer" animated />
      </div>

      {/* ── z:3 Thumb — in front of the phone ────────────────────────────
          right: 20px = 20px from the wrapper right edge.
          pm-wrap right padding is 20px, so this aligns with the
          phone frame's right edge.
          Thumb (38px wide) overlaps ~18px into the screen from the right.
          ──────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        right: '20px',
        bottom: '200px',
        zIndex: 3,
        pointerEvents: 'none',
      }}>
        <ThumbSVG />
      </div>
    </div>
  )
}
