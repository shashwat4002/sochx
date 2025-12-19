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

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1

    const setSize = () => {
      dpr = window.devicePixelRatio || 1
      const w = Math.max(1, Math.floor(window.innerWidth))
      const h = Math.max(1, Math.floor(window.innerHeight))
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      // reset transform and scale for high-DPI
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()
    window.addEventListener('resize', setSize)

    let w = canvas.width / dpr
    let h = canvas.height / dpr

    const createComet = (): Comet => ({
      x: Math.random() * w,
      y: Math.random() * h,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 0.8 + 0.4,
      opacity: Math.random() * 0.4 + 0.15,
    })

    let comets: Comet[] = Array.from({ length: 25 }).map(createComet)

    const resetCometsForResize = () => {
      dpr = window.devicePixelRatio || 1
      w = canvas.width / dpr
      h = canvas.height / dpr
      comets = comets.map(() => createComet())
    }

    let raf = 0

    const draw = () => {
      // logical size
      w = canvas.width / dpr
      h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      comets.forEach((c) => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,255,255,${c.opacity})`
        ctx.lineWidth = 1
        // draw diagonal streak: from (x,y) to (x - length, y + length)
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(c.x - c.length, c.y + c.length)
        ctx.stroke()

        // move diagonally (right & up)
        c.x += c.speed
        c.y -= c.speed

        // recycle when off-screen
        if (c.y < -100 || c.x > w + 100) {
          c.x = Math.random() * w
          c.y = h + Math.random() * 100
          c.length = Math.random() * 80 + 40
          c.speed = Math.random() * 0.8 + 0.4
          c.opacity = Math.random() * 0.4 + 0.15
        }
      })

      raf = requestAnimationFrame(draw)
    }

    // ensure comets are valid size-aware after initial setSize
    resetCometsForResize()
    draw()

    // if the window resizes, re-create comets to match new size
    const onResize = () => {
      setSize()
      resetCometsForResize()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('resize', setSize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    />
  )
}
