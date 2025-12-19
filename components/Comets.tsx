import { useEffect, useRef } from 'react'

type Comet = {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

export default function Comets() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof window === 'undefined') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Use matchMedia to respect user preference for reduced motion
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    let prefersReduced = !!mql?.matches

    // Device pixel ratio
    let dpr = window.devicePixelRatio || 1

    const setSize = () => {
      dpr = window.devicePixelRatio || 1
      const w = Math.max(1, Math.floor(window.innerWidth))
      const h = Math.max(1, Math.floor(window.innerHeight))
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      // keep drawing in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()

    // Lower defaults for subtler effect
    const DESKTOP_COUNT = 12
    const MOBILE_COUNT = 6

    let w = canvas.width / dpr
    let h = canvas.height / dpr

    const isMobile = () => window.innerWidth < 768

    const createComet = (): Comet => {
      const mobile = isMobile()
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        // shorter on mobile
        length: Math.random() * (mobile ? 40 : 80) + (mobile ? 20 : 40),
        // slower on mobile
        speed: Math.random() * (mobile ? 0.4 : 0.6) + (mobile ? 0.12 : 0.15),
        // much lower opacity by default
        opacity: Math.random() * 0.08 + 0.02,
      }
    }

    const initialCount = isMobile() ? MOBILE_COUNT : DESKTOP_COUNT
    let comets: Comet[] = Array.from({ length: initialCount }).map(createComet)

    const resetCometsForResize = () => {
      dpr = window.devicePixelRatio || 1
      w = canvas.width / dpr
      h = canvas.height / dpr
      const newCount = isMobile() ? MOBILE_COUNT : DESKTOP_COUNT
      comets = Array.from({ length: newCount }).map(createComet)
    }

    let raf = 0
    let running = false

    const draw = () => {
      if (!running) return
      w = canvas.width / dpr
      h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      comets.forEach((c) => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,255,255,${c.opacity})`
        ctx.lineWidth = 1
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(c.x - c.length, c.y + c.length)
        ctx.stroke()

        c.x += c.speed
        c.y -= c.speed

        if (c.y < -100 || c.x > w + 100) {
          c.x = Math.random() * w
          c.y = h + Math.random() * 100
          const mobile = isMobile()
          c.length = Math.random() * (mobile ? 40 : 80) + (mobile ? 20 : 40)
          c.speed = Math.random() * (mobile ? 0.4 : 0.6) + (mobile ? 0.12 : 0.15)
          c.opacity = Math.random() * 0.08 + 0.02
        }
      })

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (prefersReduced) return
      if (!running) {
        running = true
        raf = requestAnimationFrame(draw)
      } else if (!raf) {
        raf = requestAnimationFrame(draw)
      }
    }

    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    // Visibility handling to save CPU when tab is hidden
    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    // Respond to reduced-motion preference changes
    const onReducedChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : false
      prefersReduced = matches
      if (prefersReduced) {
        stop()
        // clear canvas so nothing remains
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        // re-create comets and start
        resetCometsForResize()
        start()
      }
    }

    // Attach listeners
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => {
      setSize()
      resetCometsForResize()
    }

    window.addEventListener('resize', onResize)

    if (mql) {
      // modern browsers support addEventListener on MediaQueryList
      try {
        if ((mql as any).addEventListener) {
          (mql as any).addEventListener('change', onReducedChange)
        } else if ((mql as any).addListener) {
          (mql as any).addListener(onReducedChange as any)
        }
      } catch (e) {
        // ignore if attach fails
      }
    }

    // Initialize: only start animation if user has not requested reduced motion
    resetCometsForResize()
    if (!prefersReduced) start()

    return () => {
      // cleanup everything we added
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (mql) {
        try {
          if ((mql as any).removeEventListener) {
            (mql as any).removeEventListener('change', onReducedChange)
          } else if ((mql as any).removeListener) {
            (mql as any).removeListener(onReducedChange as any)
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden={true}
    />
  )
}
