import { useState, useCallback } from 'react'
import { MENU_TABS, MENU_DATA } from '../data/content'
import { RevealBlock } from '../hooks/useReveal.jsx'

/* ── Steam lines animation ──────────────────────────────────────── */
function Steam({ count = 3 }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', top: '14%', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: 14, zIndex: 2,
    }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          width: 2, borderRadius: 2,
          height: i === 1 ? 64 : 44,
          background: 'linear-gradient(to top, rgba(255,255,255,0.25) 0%, transparent 100%)',
          animation: `steamRise 2.2s ${i * 0.38}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes steamRise {
          0%   { opacity: 0;   transform: translateY(0)    scaleX(1); }
          40%  { opacity: 0.7; transform: translateY(-18px) scaleX(1.4); }
          100% { opacity: 0;   transform: translateY(-36px) scaleX(2); }
        }
      `}</style>
    </div>
  )
}

/* ── Menu card ──────────────────────────────────────────────────── */
function MenuCard({ item, featured = false, index = 0 }) {
  const [hov, setHov] = useState(false)

  return (
    <RevealBlock
      delay={index * 80}
      style={{ gridColumn: featured ? 'span 2' : 'span 1', minWidth: 0 }}
      className="menu-card-wrapper"
    >
      <article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-label={item.name}
        style={{
          background: 'var(--bg-3)',
          border: '1px solid transparent',
          borderColor: hov ? 'var(--gold-border)' : 'transparent',
          transform: hov ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.4s var(--ease-out), border-color 0.3s, box-shadow 0.4s',
          boxShadow: hov ? '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--gold-dim)' : 'none',
          overflow: 'hidden',
        }}
      >
        {/* Image area */}
        <div style={{
          aspectRatio: featured ? '21/8' : '4/3',
          background: `radial-gradient(ellipse 60% 80% at 50% 80%, rgba(0,0,0,0.4), transparent),
                       linear-gradient(145deg, ${item.accent}55 0%, ${item.accent}22 50%, #050403 100%)`,
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Steam />

          {/* Emoji */}
          <span style={{
            fontSize: featured ? 'clamp(100px, 14vw, 160px)' : 'clamp(72px, 10vw, 110px)',
            filter: [
              'drop-shadow(0 24px 48px rgba(0,0,0,0.95))',
              `drop-shadow(0 0 32px ${item.accent}88)`,
            ].join(' '),
            transform: hov ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.5s var(--ease-out)',
            zIndex: 1, position: 'relative',
            userSelect: 'none',
          }}>
            {item.icon}
          </span>

          {/* Hover overlay with CTA */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            opacity: hov ? 1 : 0,
            transition: 'opacity 0.35s',
            display: 'flex', alignItems: 'flex-end',
            padding: 20,
          }}>
            <button
              aria-label={`Quick order ${item.name}`}
              style={{
                padding: '9px 24px',
                background: 'var(--gold)',
                border: 'none',
                color: '#0A0907',
                fontFamily: 'var(--font-body)',
                fontSize: 10, letterSpacing: '0.22em',
                textTransform: 'uppercase', fontWeight: 500,
                cursor: 'none',
                transform: hov ? 'translateY(0)' : 'translateY(8px)',
                transition: 'transform 0.35s 0.05s',
              }}
            >
              Quick Order
            </button>
          </div>

          {/* Badge */}
          {item.badge && (
            <div style={{
              position: 'absolute', top: 16, right: 16,
              padding: '4px 12px',
              background: 'rgba(10,9,7,0.8)',
              border: '1px solid var(--gold-border)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-body)',
              fontSize: 9, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--gold)',
              zIndex: 3,
            }}>
              {item.badge}
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: 'clamp(18px, 2.5vw, 28px)' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 9, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: 8,
          }}>
            {item.tag}
          </p>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.2vw, 26px)',
            fontWeight: 400, lineHeight: 1.15,
            marginBottom: 10,
          }}>
            {item.name}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12, lineHeight: 1.65,
            color: 'var(--text-secondary)', fontWeight: 300,
          }}>
            {item.desc}
          </p>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 22, paddingTop: 18,
            borderTop: '1px solid var(--gold-dim)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 2.5vw, 28px)',
              fontWeight: 300,
              background: 'linear-gradient(120deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {item.price}
            </span>
          </div>
        </div>
      </article>

      <style>{`
        @media (max-width: 600px) {
          .menu-card-wrapper { grid-column: span 1 !important; }
        }
      `}</style>
    </RevealBlock>
  )
}

/* ── Menu section ───────────────────────────────────────────────── */
export default function MenuSection() {
  const [active, setActive] = useState('pizzas')

  const handleTab = useCallback((key) => setActive(key), [])

  const items = MENU_DATA[active]

  return (
    <section
      id="menu"
      aria-label="Menu"
      style={{
        background: 'var(--bg-1)',
        padding: 'clamp(72px, 10vw, 128px) clamp(20px, 4vw, 64px)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header */}
        <RevealBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, letterSpacing: '0.4em',
              textTransform: 'uppercase', color: 'var(--gold)',
            }}>
              Culinary Creations
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
              Menu
            </em>
          </h2>
        </RevealBlock>

        {/* Tabs */}
        <RevealBlock delay={80}>
          <div
            role="tablist"
            aria-label="Menu categories"
            style={{
              display: 'flex', gap: 0,
              borderBottom: '1px solid var(--gold-border)',
              marginTop: 44, marginBottom: 48,
              overflowX: 'auto', scrollbarWidth: 'none',
            }}
          >
            {MENU_TABS.map(({ key, label }) => {
              const isActive = active === key
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${key}`}
                  onClick={() => handleTab(key)}
                  style={{
                    padding: '14px clamp(16px, 2.5vw, 32px)',
                    background: 'none', border: 'none',
                    borderBottom: `2px solid ${isActive ? 'var(--gold)' : 'transparent'}`,
                    marginBottom: -1,
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                    cursor: 'none', whiteSpace: 'nowrap',
                    transition: 'color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </RevealBlock>

        {/* Grid */}
        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-label={active}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 3,
          }}
          className="menu-bento"
          key={active}
        >
          {items.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              featured={item.featured}
              index={i}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .menu-bento { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

