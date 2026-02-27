import { MARQUEE_ITEMS } from '../data/content'

export default function MarqueeStrip() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      aria-hidden="true"
      style={{
        background: 'var(--gold)',
        padding: '13px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{
        display: 'inline-flex',
        animation: 'marqueeTicker 24s linear infinite',
        willChange: 'transform',
      }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 500, color: '#0A0907',
              padding: '0 32px',
            }}>
              {item}
            </span>
            <span style={{ color: 'rgba(10,9,7,0.3)', fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
