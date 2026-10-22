import { useEffect, useRef, useState } from 'react'
import '../styles/ScratchDate.css'

const REVEAL_AT = 0.5

const ScratchDate = ({ onNext }: { onNext: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  const [revealed, setRevealed] = useState(false)

  // Paint the cobalt "tile" cover the first time the canvas mounts
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const { width, height } = canvas.getBoundingClientRect()
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, '#1f3a93')
    grad.addColorStop(1, '#14286b')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Little azulejo motif repeated over the cover
    const size = 46
    ctx.strokeStyle = 'rgba(251, 245, 234, 0.35)'
    ctx.lineWidth = 1.5
    for (let x = 0; x < width + size; x += size) {
      for (let y = 0; y < height + size; y += size) {
        ctx.beginPath()
        ctx.arc(x, y, size / 3, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x - size / 2, y)
        ctx.quadraticCurveTo(x, y - size / 4, x + size / 2, y)
        ctx.quadraticCurveTo(x, y + size / 4, x - size / 2, y)
        ctx.stroke()
      }
    }

    ctx.fillStyle = '#fbf5ea'
    ctx.font = '600 18px "Nunito Sans", system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦ skrap her ✦', width / 2, height / 2)
  }, [])

  const pointFor = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const scratch = (e: React.PointerEvent) => {
    // Also pick up a mouse drag that started just outside the card
    if ((!drawing.current && e.buttons !== 1) || revealed) return
    const ctx = canvasRef.current!.getContext('2d')!
    const p = pointFor(e)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 42
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    const from = last.current ?? p
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
  }

  const checkProgress = () => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const { data } = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    // Sample the alpha channel of every 16th pixel
    for (let i = 3; i < data.length; i += 64) if (data[i] < 128) clear++
    if (clear / (data.length / 64) > REVEAL_AT) setRevealed(true)
  }

  return (
    <section className="scratch stage-enter">
      <p className="eyebrow">Del 1 · Når?</p>
      <h2 className="stage-title">Først: datoen</h2>
      <p className="stage-sub">Skrap bort flisen med fingeren</p>

      <div className={`scratch-card ${revealed ? 'is-revealed' : ''}`}>
        <div className="scratch-under">
          <span className="scratch-weekday">Lørdag</span>
          <span className="scratch-day">7</span>
          <span className="scratch-month">november 2026</span>
        </div>
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onPointerDown={(e) => {
            drawing.current = true
            last.current = null
            e.currentTarget.setPointerCapture(e.pointerId)
            scratch(e)
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false
            checkProgress()
          }}
          onPointerLeave={() => {
            last.current = null
            checkProgress()
          }}
          onPointerCancel={() => (drawing.current = false)}
        />
      </div>

      <div className={`scratch-after ${revealed ? 'visible' : ''}`}>
        <p className="stage-sub">Hold av hele dagen – fra formiddag til langt på kveld.</p>
        <button className="primary-button" onClick={onNext} disabled={!revealed}>
          Og hva skal vi gjøre? →
        </button>
      </div>
      {!revealed && (
        <button className="link-button" onClick={() => setRevealed(true)}>
          Orker ikke skrape – bare vis meg!
        </button>
      )}
    </section>
  )
}

export default ScratchDate
