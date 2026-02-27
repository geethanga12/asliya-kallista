import { RevealBlock } from '../hooks/useReveal.jsx'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function InfoIcon({ children }) {
  return (
    <div style={{
      width: 40, height: 40, flexShrink: 0,
      border: '1px solid var(--gold-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16,
    }}>
      {children}
    </div>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <div style={{ display: 'flex', gap: 18, marginBottom: 28, alignItems: 'flex-start' }}>
      <InfoIcon>{icon}</InfoIcon>
      <div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 9, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: 6,
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.65,
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ── Stylised map placeholder ────────────────────────────────────── */
function MapPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Restaurant location map – No 42 Mihindu Mawatha, Kurunegala"
      style={{
        height: 'clamp(220px, 25vw, 320px)',
        background: 'linear-gradient(145deg, var(--bg-1) 0%, var(--bg-2) 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Grid lines */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(var(--gold-dim) 1px, transparent 1px),
          linear-gradient(90deg, var(--gold-dim) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Concentric rings */}
      {[120, 80, 44].map((size, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute',
          width: size, height: size,
          border: `1px solid rgba(200,169,110,${0.06 + i * 0.04})`,
          borderRadius: '50%',
          animation: `ringExpand ${2 + i * 0.6}s ${i * 0.5}s ease-out infinite`,
        }} />
      ))}

      {/* Pin */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{
          width: 14, height: 14,
          background: 'var(--gold)',
          borderRadius: '50%',
          margin: '0 auto 14px',
          boxShadow: '0 0 0 6px rgba(200,169,110,0.18), 0 0 0 12px rgba(200,169,110,0.08)',
          animation: 'pinPulse 2.4s ease-in-out infinite',
        }} />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16, fontWeight: 400,
          color: 'var(--text-primary)',
        }}>
          Asliya Kallista
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11, letterSpacing: '0.1em',
          color: 'var(--text-muted)', marginTop: 4,
        }}>
          No 42 Mihindu Mawatha, Kurunegala
        </div>
      </div>

      {/* Edge fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 70% at center, transparent 30%, var(--bg-1) 100%)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes ringExpand {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes pinPulse {
          0%,100% { box-shadow: 0 0 0 6px rgba(200,169,110,0.18), 0 0 0 12px rgba(200,169,110,0.08); }
          50%      { box-shadow: 0 0 0 10px rgba(200,169,110,0.1), 0 0 0 20px rgba(200,169,110,0.04); }
        }
      `}</style>
    </div>
  )
}

export default function LocationSection() {
  return (
    <section
      id="location"
      aria-label="Location and opening hours"
      style={{ background: 'var(--bg-0)', paddingTop: 0 }}
    >
      <MapPlaceholder />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="location-grid">
          {/* Left: Contact */}
          <RevealBlock style={{
            background: 'var(--bg-2)',
            padding: 'clamp(36px, 5vw, 64px)',
            borderRight: '1px solid var(--gold-dim)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10, letterSpacing: '0.4em',
                textTransform: 'uppercase', color: 'var(--gold)',
              }}>
                Find Us
              </span>
            </div>

            <InfoRow icon="📍" label="Address">
              No 42 Mihindu Mawatha<br />
              Kurunegala 60000<br />
              Sri Lanka
            </InfoRow>
            <InfoRow icon="📞" label="Reservations">
              <a href="tel:+94772105050" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none' }}>
                +94 77 210 5050
              </a>
            </InfoRow>
            <InfoRow icon="✉️" label="Email">
              <a href="mailto:info@asliyakallista.lk" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none' }}>
                info@asliyakallista.lk
              </a>
            </InfoRow>

            <a
              href="https://maps.google.com/?q=No+42+Mihindu+Mawatha+Kurunegala"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 8, padding: '12px 32px',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                fontFamily: 'var(--font-body)',
                fontSize: 11, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none', cursor: 'none',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#0A0907' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
            >
              Open in Maps
            </a>
          </RevealBlock>

          {/* Right: Hours */}
          <RevealBlock delay={100} style={{
            background: 'var(--bg-1)',
            padding: 'clamp(36px, 5vw, 64px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10, letterSpacing: '0.4em',
                textTransform: 'uppercase', color: 'var(--gold)',
              }}>
                Hours
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#4CAF7D',
                boxShadow: '0 0 8px rgba(76,175,125,0.6)',
                animation: 'blinkDot 2s infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12, color: '#4CAF7D', letterSpacing: '0.1em',
              }}>
                Open Now
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              background: 'var(--gold-dim)',
              marginBottom: 1,
            }}>
              {DAYS.map(day => (
                <div key={day} style={{
                  background: 'var(--bg-2)',
                  padding: '14px 18px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10, letterSpacing: '0.1em',
                    color: 'var(--text-muted)', marginBottom: 4,
                  }}>
                    {day}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13, color: 'var(--text-primary)', fontWeight: 300,
                  }}>
                    10:30 AM – 12 AM
                  </div>
                </div>
              ))}
              <div style={{ background: 'rgba(200,169,110,0.06)', padding: '14px 18px' }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10, letterSpacing: '0.1em',
                  color: 'var(--gold)', marginBottom: 4,
                }}>
                  Kitchen Closes
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13, color: 'var(--text-primary)', fontWeight: 300,
                }}>
                  11:30 PM
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>

      <style>{`
        .location-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes blinkDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}

