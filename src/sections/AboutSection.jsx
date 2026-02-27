import { RevealBlock } from '../hooks/useReveal.jsx'
import { STATS } from '../data/content'

/* ── Placeholder image tile ─────────────────────────────────────── */
function ImageTile({ bg, emoji, style = {} }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <span style={{
        fontSize: 'clamp(64px, 8vw, 100px)',
        filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 24px rgba(200,169,110,0.15))',
        userSelect: 'none',
      }}>
        {emoji}
      </span>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.45) 100%)',
      }} />
    </div>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Asliya Kallista"
      style={{
        padding: 'clamp(72px, 10vw, 128px) clamp(20px, 4vw, 64px)',
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
      }}
    >
      <div className="about-grid">
        {/* ── Left: Image mosaic ── */}
        <RevealBlock delay={0} style={{ position: 'relative' }}>
          <div className="mosaic-grid">
            <ImageTile
              bg="linear-gradient(145deg, #2E1C08 0%, #3D2510 60%, #1C1008 100%)"
              emoji="🍽️"
              style={{ gridArea: 'main', aspectRatio: '4/5', minHeight: 300 }}
            />
            <ImageTile
              bg="linear-gradient(145deg, #1A1408 0%, #2A1E0A 100%)"
              emoji="🥂"
              style={{ gridArea: 'accent1', aspectRatio: '1', border: '4px solid var(--bg-0)' }}
            />
            <ImageTile
              bg="linear-gradient(145deg, #08100A 0%, #0F1A0C 100%)"
              emoji="🌿"
              style={{ gridArea: 'accent2', aspectRatio: '16/9', border: '4px solid var(--bg-0)' }}
            />
          </div>

          {/* Gold border accent */}
          <div style={{
            position: 'absolute', top: -16, left: -16,
            width: 80, height: 80,
            border: '1px solid var(--gold-border)',
            pointerEvents: 'none',
          }} />
        </RevealBlock>

        {/* ── Right: Text + stats ── */}
        <RevealBlock delay={120} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            marginBottom: 20,
          }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, letterSpacing: '0.4em',
              textTransform: 'uppercase', color: 'var(--gold)',
            }}>
              Our Story
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            fontWeight: 300, lineHeight: 1.1,
            marginBottom: 28,
          }}>
            A Culinary{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(120deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Journey
            </em>
          </h2>

          <div style={{ width: 56, height: 1, background: 'var(--gold)', marginBottom: 28 }} />

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.3vw, 15px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8, fontWeight: 300, marginBottom: 16,
          }}>
            Nestled in the heart of Kurunegala, Asliya Kallista is where bold flavours meet refined aesthetics.
            Our kitchen draws from pan-Asian traditions while championing local Sri Lankan ingredients
            and produce.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.3vw, 15px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8, fontWeight: 300, marginBottom: 44,
          }}>
            From our legendary Bacon Special to the slow-braised Glazed Pork Belly, every dish is
            a testament to culinary artistry. We believe dining is theatre — and you deserve
            the finest seat in the house.
          </p>

          {/* Stats grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1, background: 'var(--gold-dim)',
          }}
          className="stats-grid"
          >
            {STATS.map((s, i) => (
              <RevealBlock key={s.num} delay={200 + i * 60} style={{
                background: 'var(--bg-1)',
                padding: 'clamp(16px, 2vw, 24px) 12px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3vw, 38px)',
                  fontWeight: 300,
                  background: 'linear-gradient(120deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  marginTop: 6,
                }}>
                  {s.label}
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: center;
        }
        .mosaic-grid {
          display: grid;
          grid-template-areas:
            "main  accent1"
            "main  accent2";
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 1fr auto;
          gap: 4px;
        }
        .stats-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .mosaic-grid {
            grid-template-areas: "main" "accent1" "accent2";
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

