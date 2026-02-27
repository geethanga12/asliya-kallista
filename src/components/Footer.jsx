const FOOTER_LINKS = {
  Dining: ['Menu', 'Reservations', 'Private Events', 'Gift Cards', 'Chef\'s Table'],
  Connect: ['Instagram', 'Facebook', 'TripAdvisor', 'Google Maps'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#060504',
        borderTop: '1px solid var(--gold-border)',
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 64px) clamp(28px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 300,
              background: 'linear-gradient(120deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              Asliya <em style={{ fontStyle: 'italic' }}>Kallista</em>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic', fontSize: 14, fontWeight: 300,
              color: 'var(--text-muted)',
              letterSpacing: '0.15em', marginTop: 4, marginBottom: 20,
            }}>
              Restaurant & Café
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13, color: 'var(--text-muted)',
              lineHeight: 1.75, fontWeight: 300, maxWidth: 300,
            }}>
              Fine dining, rich flavours, unforgettable moments.
              Kurunegala's premier destination for culinary excellence.
            </p>
            <div style={{ marginTop: 28 }}>
              <a
                href="tel:+94772105050"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13, color: 'var(--gold)',
                  textDecoration: 'none', cursor: 'none',
                  display: 'block', marginBottom: 6,
                }}
              >
                +94 77 210 5050
              </a>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12, color: 'var(--text-muted)',
              }}>
                No 42 Mihindu Mawatha, Kurunegala 60000
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, items]) => (
            <div key={section}>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9, letterSpacing: '0.4em',
                textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: 24,
              }}>
                {section}
              </div>
              <ul style={{ listStyle: 'none' }}>
                {items.map(item => (
                  <li key={item} style={{ marginBottom: 12 }}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13, color: 'var(--text-muted)',
                        textDecoration: 'none', cursor: 'none',
                        fontWeight: 300,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          marginTop: 'clamp(40px, 6vw, 72px)',
          paddingTop: 24,
          borderTop: '1px solid rgba(245,235,210,0.06)',
          display: 'flex', flexWrap: 'wrap', gap: 16,
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11, color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}>
            © {year} Asliya Kallista Restaurant & Café. All rights reserved.
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11, color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}>
            Crafted with care · Kurunegala, Sri Lanka
          </span>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: clamp(32px, 6vw, 96px);
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
