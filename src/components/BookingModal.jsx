import { useState, useEffect, useRef } from 'react'

function FormField({ label, id, type = 'text', placeholder, value, onChange, style = {} }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ ...style }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: 9, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
        style={{
          width: '100%',
          padding: '13px 16px',
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'var(--gold)' : 'var(--gold-border)'}`,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 14, fontWeight: 300,
          outline: 'none',
          transition: 'border-color 0.25s',
          cursor: 'none',
        }}
      />
    </div>
  )
}

export default function BookingModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const firstRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Trap focus inside modal
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' })
      onClose()
    }, 2800)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a table at Asliya Kallista"
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(5,4,3,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
        animation: 'fadeInModal 0.3s var(--ease-out)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: 'var(--bg-3)',
          border: '1px solid var(--gold-border)',
          maxWidth: 560, width: '100%',
          padding: 'clamp(32px, 5vw, 60px)',
          position: 'relative',
          maxHeight: '90svh', overflowY: 'auto',
          animation: 'slideUpModal 0.4s var(--ease-out)',
        }}
      >
        {/* Close */}
        <button
          aria-label="Close booking dialog"
          onClick={onClose}
          ref={firstRef}
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 36, height: 36,
            background: 'var(--surface-1)',
            border: '1px solid var(--gold-border)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 18, cursor: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--gold-border)' }}
        >
          ×
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🎉</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32, fontWeight: 300, marginBottom: 12,
            }}>
              Reservation Received
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14, color: 'var(--text-secondary)', fontWeight: 300,
            }}>
              We'll call you at <strong style={{ color: 'var(--gold)' }}>{form.phone}</strong> to confirm shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: 300, lineHeight: 1.1, marginBottom: 8,
              }}>
                Reserve a{' '}
                <em style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(120deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Table
                </em>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12, color: 'var(--text-muted)',
                letterSpacing: '0.05em', fontWeight: 300,
              }}>
                We'll call you to confirm within the hour
              </p>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <FormField
                id="modal-name" label="Full Name"
                placeholder="Your name"
                value={form.name} onChange={set('name')}
              />
              <FormField
                id="modal-phone" label="Phone Number"
                type="tel" placeholder="+94 77 XXX XXXX"
                value={form.phone} onChange={set('phone')}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="modal-row">
                <FormField
                  id="modal-date" label="Date"
                  type="date"
                  value={form.date} onChange={set('date')}
                />
                <FormField
                  id="modal-time" label="Preferred Time"
                  type="time"
                  value={form.time} onChange={set('time')}
                />
              </div>
              <FormField
                id="modal-guests" label="Number of Guests"
                type="number" placeholder="2"
                value={form.guests} onChange={set('guests')}
              />
              <div>
                <label
                  htmlFor="modal-notes"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 9, letterSpacing: '0.32em',
                    textTransform: 'uppercase', color: 'var(--gold)',
                    marginBottom: 8,
                  }}
                >
                  Special Requests <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                </label>
                <textarea
                  id="modal-notes"
                  placeholder="Dietary requirements, celebrations, seating preference..."
                  value={form.notes}
                  onChange={set('notes')}
                  rows={3}
                  style={{
                    width: '100%', resize: 'vertical',
                    padding: '13px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--gold-border)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14, fontWeight: 300,
                    outline: 'none', cursor: 'none',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%', marginTop: 28,
                padding: '15px',
                background: 'var(--gold)',
                border: 'none',
                color: '#0A0907',
                fontFamily: 'var(--font-body)',
                fontSize: 12, letterSpacing: '0.22em',
                textTransform: 'uppercase', fontWeight: 500,
                cursor: 'none',
                transition: 'background 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >
              Confirm Reservation
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          .modal-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
