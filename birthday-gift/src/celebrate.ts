import confetti from 'canvas-confetti'

// Senyera red & yellow, orange, saffron and azulejo blue
const COLORS = ['#c8102e', '#fcd116', '#f07b1f', '#e79a12', '#1f3a93', '#fbf5ea']

export function celebrate() {
  const base = { colors: COLORS, disableForReducedMotion: true }
  confetti({ ...base, particleCount: 110, spread: 75, origin: { y: 0.6 } })
  setTimeout(() => confetti({ ...base, particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } }), 200)
  setTimeout(() => confetti({ ...base, particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } }), 380)
}
