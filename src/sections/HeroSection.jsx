import { useEffect, useRef, useState } from 'react'

/* ── Floating 3-D-ish pizza using CSS transforms ─────────────────── */
function HeroPizza() {
  const ref = useRef(null)

  useEffect(() => {
    let frame
    let t = 0

    const tick = () => {
      t += 0.008
      if (ref.current) {
        const y    = Math.sin(t)          * 18
        const rotZ = Math.sin(t * 0.6)   * 6
        const rotX = Math.cos(t * 0.4)   * 4
        const s    = 1 + Math.sin(t * 0.8) * 0.03
        ref.current.style.transform =
          `translateY(${y}px) rotate(${rotZ}deg) rotateX(${rotX}deg) scale(${s})`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 'clamp(20px, 6vw, 80px)',
        top: '50%',
        marginTop: 'calc(var(--nav-h) / 2)',
        transform: 'translateY(-50%)',
        width: 'clamp(240px, 35vw, 480px)',
        height: 'clamp(240px, 35vw, 480px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at center, rgba(200,169,110,0.18) 0%, transparent 70%)',
        animation: 'glowPulse 4s ease-in-out infinite',
      }} />

      {/* The pizza emoji treated as a pseudo-3D object */}
      <div
        ref={ref}
        style={{
          fontSize: 'clamp(120px, 18vw, 220px)',
          filter: [
            'drop-shadow(0 40px 60px rgba(0,0,0,0.8))',
            'drop-shadow(0 0 40px rgba(200,169,110,0.25))',
            'drop-shadow(0 8px 20px rgba(0,0,0,0.9))',
          ].join(' '),
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          perspective: '600px',
        }}
      >
        🍕
      </div>

      {/* Shadow on floor */}
      <div style={{
        position: 'absolute',
        bottom: '5%', left: '15%', right: '15%', height: 30,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)',
        filter: 'blur(12px)',
        animation: 'shadowFloat 3.2s ease-in-out infinite',
      }} />

      <style>{`
        @keyframes glowPulse {
          0%,100% { opacity: 0.7; transform: scale(0.95); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes shadowFloat {
          0%,100% { transform: scaleX(0.85); opacity: 0.6; }
          50%      { transform: scaleX(1.05); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}

/* ── Scroll hint ───────────────────────────────────────────────────── */
function ScrollHint() {
  return (
    <div
      aria-label="Scroll down"
      style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
        fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
        animation: 'fadeInUp 0.8s 1.8s both',
      }}
    >
      <div style={{
        width: 1, height: 56,
        background: 'linear-gradient(to bottom, var(--gold), transparent)',
        animation: 'linePulse 2.4s ease-in-out infinite',
      }} />
      Scroll
      <style>{`
        @keyframes linePulse {
          0%,100% { opacity: 1; transform: scaleY(1); }
          50%      { opacity: 0.4; transform: scaleY(0.6); }
        }
      `}</style>
    </div>
  )
}

/* ── Hero Section ──────────────────────────────────────────────────── */
export default function HeroSection({ onBooking }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      aria-label="Hero – Asliya Kallista Restaurant & Café"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* ── Background layers ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Base gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 90% 70% at 50% 110%, rgba(200,169,110,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 80%  15%, rgba(200,169,110,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #080706 0%, #0F0D09 45%, #090806 100%)
          `,
        }} />

        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,169,110,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }} />
      </div>

      {/* ── Floating 3-D Pizza (desktop) ── */}
      <HeroPizza />

      {/* ── Main text content ── */}
      <div
        style={{
          position: 'relative', zIndex: 3,
          maxWidth: 'min(680px, 55vw)',
          padding: `calc(var(--nav-h) + 40px) clamp(20px, 4vw, 64px) 80px`,
        }}
        className="hero-text-block"
      >
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10, letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 28,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s 0.2s var(--ease-out), transform 0.7s 0.2s var(--ease-out)',
        }}>
          Kurunegala's Finest · Est. 2020
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 6.5vw, 88px)',
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s 0.35s var(--ease-out), transform 0.8s 0.35s var(--ease-out)',
          }}
        >
          Fine Dining,{' '}
          <em style={{
            display: 'block',
            fontStyle: 'italic',
            background: 'linear-gradient(120deg, var(--gold) 0%, var(--gold-light) 45%, var(--gold) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Rich Flavors,
          </em>
          Unforgettable{'\u00A0'}Moments.
        </h1>

        {/* Divider */}
        <div style={{
          width: 48, height: 1,
          background: 'var(--gold)',
          margin: '28px 0',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s 0.55s',
        }} />

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          color: 'var(--text-secondary)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: 420,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s 0.6s var(--ease-out), transform 0.7s 0.6s var(--ease-out)',
        }}>
          Where every plate tells a story.{' '}
          <span style={{ color: 'var(--text-muted)' }}>
            No 42 Mihindu Mawatha, Kurunegala
          </span>
        </p>

        {/* CTA group */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 14,
          marginTop: 44,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s 0.75s var(--ease-out), transform 0.7s 0.75s var(--ease-out)',
        }}>
          <CTAButton primary onClick={onBooking} label="Book a Table" />
          <CTAButton
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            label="Explore Menu"
          />
        </div>

        {/* Trust chips */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 48,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s 0.95s',
        }}>
          {['Open Daily 10:30 AM – 12 AM', '+94 77 210 5050', '4.9 ★ Google'].map(chip => (
            <span key={chip} style={{
              fontSize: 10, letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <ScrollHint />

      {/* Mobile: adjust hero text to be full-width */}
      <style>{`
        @media (max-width: 768px) {
          .hero-text-block {
            max-width: 100% !important;
            padding-top: calc(var(--nav-h) + 60px) !important;
            text-align: center !important;
          }
          .hero-text-block > p:first-child,
          .hero-text-block div[style*="width: 48px"] {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-text-block div[style*="flexWrap: wrap"] {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}

function CTAButton({ primary, onClick, label }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '13px 36px',
        background: primary ? (hov ? 'var(--gold-light)' : 'var(--gold)') : 'transparent',
        border: `1px solid ${primary ? 'transparent' : (hov ? 'var(--gold)' : 'var(--gold-border)')}`,
        color: primary ? '#0A0907' : (hov ? 'var(--gold-light)' : 'var(--text-secondary)'),
        fontFamily: 'var(--font-body)',
        fontSize: 11, letterSpacing: '0.22em',
        textTransform: 'uppercase', fontWeight: 500,
        cursor: 'none',
        transition: 'background 0.25s, color 0.25s, border-color 0.25s',
      }}
    >
      {label}
    </button>
  )
}
