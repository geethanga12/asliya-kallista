import { useRef } from 'react'
import { GALLERY_ITEMS } from '../data/content'
import { RevealBlock } from '../hooks/useReveal.jsx'

export default function GallerySection() {
  const trackRef  = useRef(null)
  const dragging  = useRef(false)
  const startX    = useRef(0)
  const scrollL   = useRef(0)

  const onDown  = (e) => {
    dragging.current = true
    startX.current   = (e.touches?.[0] ?? e).pageX - trackRef.current.offsetLeft
    scrollL.current  = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMove  = (e) => {
    if (!dragging.current) return
    const x = (e.touches?.[0] ?? e).pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollL.current - (x - startX.current) * 1.4
  }
  const onUp    = () => {
    dragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  return (
    <section
      id="experience"
      aria-label="The Asliya Kallista Experience"
      style={{ padding: 'clamp(72px, 10vw, 120px) 0', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(20px, 4vw, 64px)', marginBottom: 52 }}>
        <RevealBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, letterSpacing: '0.4em',
              textTransform: 'uppercase', color: 'var(--gold)',
            }}>
              The Atmosphere
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            fontWeight: 300, lineHeight: 1.1,
          }}>
            The{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(120deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Experience
            </em>
          </h2>
          <p style={{
            marginTop: 16,
            fontFamily: 'var(--font-body)',
            fontSize: 13, color: 'var(--text-muted)', fontWeight: 300,
            letterSpacing: '0.05em',
          }}>
            Drag to explore →
          </p>
        </RevealBlock>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        role="list"
        aria-label="Gallery photos"
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
        style={{
          display: 'flex', gap: 16,
          padding: '0 clamp(20px, 4vw, 64px)',
          overflowX: 'auto', scrollbarWidth: 'none',
          scrollSnapType: 'x mandatory',
          cursor: 'grab',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}

function GalleryCard({ item, index }) {
  const [hov, setHov] = import.meta.env ? [false, () => {}] : [false, () => {}]

  return (
    <article
      role="listitem"
      aria-label={item.label}
      onMouseEnter={e => e.currentTarget.querySelector('.g-caption').style.transform = 'translateY(0)'}
      onMouseLeave={e => e.currentTarget.querySelector('.g-caption').style.transform = 'translateY(100%)'}
      style={{
        flex: '0 0 auto',
        width: `clamp(260px, ${item.w / 14}vw, ${item.w}px)`,
        height: 'clamp(260px, 28vw, 380px)',
        scrollSnapAlign: 'start',
        position: 'relative', overflow: 'hidden',
        background: item.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
      }}
    >
      {/* Floating emoji */}
      <span style={{
        fontSize: 'clamp(72px, 9vw, 108px)',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))',
        animation: `galleryFloat ${3.5 + index * 0.4}s ${index * 0.2}s ease-in-out infinite`,
        userSelect: 'none', zIndex: 1, position: 'relative',
      }}>
        {item.emoji}
      </span>

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 75% 75% at center, transparent 35%, rgba(0,0,0,0.5) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Caption */}
      <div
        className="g-caption"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '28px 24px 24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)',
          transform: 'translateY(100%)',
          transition: 'transform 0.4s var(--ease-out)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 9, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: 6,
        }}>
          {item.label}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13, color: 'rgba(240,234,216,0.85)', fontWeight: 300,
        }}>
          {item.caption}
        </div>
      </div>

      <style>{`
        @keyframes galleryFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(3deg); }
        }
      `}</style>
    </article>
  )
}

