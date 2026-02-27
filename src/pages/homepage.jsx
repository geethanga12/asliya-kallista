import { useState, useCallback } from 'react'

import Cursor        from '../components/Cursor'
import Navbar        from '../components/Navbar'
import MarqueeStrip  from '../components/MarqueeStrip'
import BookingModal  from '../components/BookingModal'
import QuickOrderFAB from '../components/QuickOrderFAB'
import Footer        from '../components/Footer'

import HeroSection     from '../sections/HeroSection'
import AboutSection    from '../sections/AboutSection'
import MenuSection     from '../sections/MenuSection'
import GallerySection  from '../sections/GallerySection'
import LocationSection from '../sections/LocationSection'

export default function Homepage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  const openBooking  = useCallback(() => setBookingOpen(true),  [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])

  return (
    <>
      {/* Custom cursor (desktop only via CSS) */}
      <Cursor />

      {/* Fixed navigation */}
      <Navbar onBooking={openBooking} />

      {/* ── Page sections ─────────────────────────── */}
      <main id="main-content">
        <HeroSection    onBooking={openBooking} />
        <MarqueeStrip />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <LocationSection />
      </main>

      <Footer />

      {/* ── Overlays & utilities ──────────────────── */}
      <BookingModal  open={bookingOpen} onClose={closeBooking} />
      <QuickOrderFAB onClick={openBooking} />

      {/* Skip-to-content for a11y */}
      <a
        href="#main-content"
        style={{
          position: 'fixed', top: -60, left: 16, zIndex: 9999,
          padding: '10px 20px',
          background: 'var(--gold)', color: '#0A0907',
          fontFamily: 'var(--font-body)',
          fontSize: 12, fontWeight: 500,
          textDecoration: 'none',
          transition: 'top 0.2s',
        }}
        onFocus={e => e.currentTarget.style.top = '16px'}
        onBlur={e => e.currentTarget.style.top = '-60px'}
      >
        Skip to content
      </a>
    </>
  )
}