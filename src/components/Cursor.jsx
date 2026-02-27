import { useState, useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const raf     = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      if (e.target.matches('a, button, [data-cursor="pointer"], label, input, select, textarea')) {
        setHovered(true)
      }
    }
    const onLeave = (e) => {
      if (e.target.matches('a, button, [data-cursor="pointer"], label, input, select, textarea')) {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`
      }
      if (ringRef.current) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.1
        ring.current.y += (pos.current.y - ring.current.y) * 0.1
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 10, height: 10,
          background: 'var(--gold)', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999, willChange: 'transform',
          transition: 'opacity 0.2s, transform 0.05s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 40, height: 40,
          border: `1px solid ${hovered ? 'var(--gold)' : 'rgba(200,169,110,0.5)'}`,
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9998, willChange: 'transform',
          transform: hovered ? 'scale(1.6)' : 'scale(1)',
          transition: 'border-color 0.3s, opacity 0.2s',
        }}
      />
    </>
  )
}
