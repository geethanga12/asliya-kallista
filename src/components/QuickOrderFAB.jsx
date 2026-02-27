import { useState, useEffect } from 'react'

export default function QuickOrderFAB({ onClick }) {
  const [visible, setVisible] = useState(false)
  const [hov,     setHov]     = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(20px, 4vw, 40px)',
        right:  'clamp(16px, 4vw, 40px)',
        zIndex: 600,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 10, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--gold)',
        background: 'rgba(10,9,7,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--gold-border)',
        padding: '8px 16px',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateX(0)' : 'translateX(8px)',
        transition: 'opacity 0.25s, transform 0.25s',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        Quick Order
      </div>

      {/* Button */}
      <button
        aria-label="Quick order – open booking"
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: 56, height: 56,
          background: hov ? 'var(--gold-light)' : 'var(--gold)',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, cursor: 'none',
          transform: hov ? 'scale(1.08)' : 'scale(1)',
          transition: 'background 0.25s, transform 0.25s',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        🛎️
        {/* Pulse ring */}
        <div style={{
          position: 'absolute', inset: -6,
          border: '1px solid var(--gold)',
          animation: 'fabPulse 2.5s ease-out infinite',
          borderRadius: 0,
          pointerEvents: 'none',
        }} />
      </button>

      <style>{`
        @keyframes fabPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
