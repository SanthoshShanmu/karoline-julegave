import { DAY_END, DAY_START } from '../data/day'
import { useNow } from '../useNow'
import '../styles/Countdown.css'

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s / 3600) % 24),
    minutes: Math.floor((s / 60) % 60),
    seconds: s % 60,
  }
}

const Countdown = ({ variant = 'full' }: { variant?: 'full' | 'teaser' }) => {
  const now = useNow()

  if (now >= DAY_END) {
    return <p className={`countdown-state ${variant}`}>Takk for en magisk dag 🧡</p>
  }
  if (now >= DAY_START) {
    return <p className={`countdown-state ${variant}`}>Det er i dag! 🥘🎉</p>
  }

  const { days, hours, minutes, seconds } = split(DAY_START.getTime() - now.getTime())
  const units = [
    { value: days, label: days === 1 ? 'dag' : 'dager' },
    { value: hours, label: hours === 1 ? 'time' : 'timer' },
    { value: minutes, label: 'min' },
    { value: seconds, label: 'sek' },
  ]

  return (
    <div className={`countdown ${variant}`} role="timer" aria-live="off">
      {units.map((u, i) => (
        <div className="countdown-tile" key={u.label} style={{ animationDelay: `${i * 80}ms` }}>
          <span className="countdown-value">{String(u.value).padStart(2, '0')}</span>
          <span className="countdown-label">{u.label}</span>
        </div>
      ))}
    </div>
  )
}

export default Countdown
