import { useEffect, useRef } from 'react'

/** Slow topographic lines that bend toward the pointer. Pauses off-screen; static under reduced motion. */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, t = 0, visible = true
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      const lines = Math.max(18, Math.round(h / 26))
      for (let i = 0; i < lines; i++) {
        const base = (i / lines) * h * 1.1
        ctx.beginPath()
        let near = 0
        for (let x = -20; x <= w + 20; x += 14) {
          const n = Math.sin(x * 0.004 + i * 0.35 + t) * 18 + Math.sin(x * 0.011 - t * 1.3 + i) * 6
          const dx = x - mouse.x, dy = base - mouse.y
          const d = Math.exp(-(dx * dx + dy * dy) / 26000)
          near = Math.max(near, d)
          const y = base + n - d * 40
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = near > 0.15 ? `rgba(232,184,107,${0.08 + near * 0.35})` : 'rgba(255,255,255,0.055)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      t += 0.0035
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })
    resize(); draw(); io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas ref={ref} aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
  )
}
