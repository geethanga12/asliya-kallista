import { useState, useEffect } from 'react'

const links = [
  { href: '#menu',       label: 'Menu'       },
  { href: '#experience', label: 'Experience' },
  { href: '#location',   label: 'Location'   },
]

export default function Navbar({ onBooking }) {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [activeLink,   setActiveLink]   = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (href) => {
    setActiveLink(href)
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          height: 'var(--nav-h)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 64px)',
          background: scrolled ? 'rgba(10,9,7,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--gold-border)' : '1px solid transparent',
          transition: 'background 0.5s var(--ease-out), border-color 0.5s var(--ease-out), backdrop-filter 0.5s',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="Asliya Kallista – Home"
          onClick={() => handleNav('#home')}
          style={{ textDecoration: 'none', cursor: 'none', lineHeight: 1.1 }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(17px, 2vw, 22px)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            background: 'linear-gradient(120deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Asliya Kallista
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            letterSpacing: '0.28em',
            color: 'var(--text-secondary)',
            WebkitTextFillColor: 'var(--text-secondary)',
          }}>
            Restaurant & Café
          </div>
        </a>

        {/* Desktop links */}
        <div
          role="menubar"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 3vw, 40px)' }}
          className="nav-desktop"
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              role="menuitem"
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400,
                textDecoration: 'none',
                color: activeLink === href ? 'var(--gold-light)' : 'var(--text-secondary)',
                cursor: 'none',
                padding: '4px 0',
                borderBottom: `1px solid ${activeLink === href ? 'var(--gold)' : 'transparent'}`,
                transition: 'color 0.25s, border-color 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = activeLink === href ? 'var(--gold-light)' : 'var(--text-secondary)'}
            >
              {label}
            </a>
          ))}
          <button
            onClick={onBooking}
            aria-label="Book a table"
            style={{
              padding: '9px 22px',
              border: '1px solid var(--gold)',
              background: 'transparent',
              color: 'var(--gold)',
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#08070520' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
          >
            Reserve
          </button>
        </div>

        {/* Mobile burger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-burger"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'none', padding: 8, gap: 5, flexDirection: 'column',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', height: 1, background: 'var(--gold)',
              width: i === 1 ? (mobileOpen ? 20 : 28) : 20,
              transform: mobileOpen ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'scaleX(0)') : 'none',
              transition: 'transform 0.3s, width 0.3s',
              transformOrigin: 'left center',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: 'fixed', inset: 0, zIndex: 800,
          background: 'rgba(10,9,7,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 40,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s var(--ease-out)',
        }}
        className="nav-mobile-overlay"
      >
        {links.map(({ href, label }, i) => (
          <a
            key={href}
            href={href}
            onClick={(e) => { e.preventDefault(); handleNav(href) }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              cursor: 'none',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
              transition: `opacity 0.4s ${0.1 + i * 0.08}s, transform 0.4s ${0.1 + i * 0.08}s`,
            }}
          >
            {label}
          </a>
        ))}
        <button
          onClick={() => { setMobileOpen(false); onBooking() }}
          style={{
            marginTop: 24, padding: '14px 48px',
            background: 'var(--gold)', border: 'none',
            fontFamily: 'var(--font-body)', fontSize: 12,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#0A0907', fontWeight: 500, cursor: 'none',
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'opacity 0.4s 0.36s, transform 0.4s 0.36s',
          }}
        >
          Book a Table
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}
