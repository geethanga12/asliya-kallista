import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — attaches an IntersectionObserver to the returned ref.
 * Returns [ref, isVisible].
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)   // fire once
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

/**
 * RevealBlock — wrapper component that fades/slides up on scroll.
 */
export function RevealBlock({ children, delay = 0, y = 32, style = {}, className = '' }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.75s var(--ease-out) ${delay}ms, transform 0.75s var(--ease-out) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

