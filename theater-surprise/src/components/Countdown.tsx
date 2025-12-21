import { useState, useEffect } from 'react'
import '../styles/Countdown.css'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const target = new Date('2025-12-24T18:00:00')
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)
      
      return { days, hours, minutes, seconds }
    }

    setTimeLeft(calculateTimeLeft())
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="countdown">
      {/* Animated background elements */}
      <div className="bg-stars">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="bg-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Disney castle icon */}
      <div className="castle-icon">🏰</div>

      <h1 className="countdown-title">
        <span className="magic-gradient">✨ En magisk overraskelse venter! ✨</span>
      </h1>
      
      <p className="countdown-subtitle">Julaften kl. 18:00 kan du åpne gaven!</p>

      <div className="timer">
        <div className="timer-block">
          <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="timer-label">Dager</span>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-block">
          <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="timer-label">Timer</span>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-block">
          <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="timer-label">Min</span>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-block">
          <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="timer-label">Sek</span>
        </div>
      </div>

      <div className="countdown-footer">
        <p className="hint-text">🎁 Noe magisk er på vei... 🎁</p>
        <div className="disney-icons">
          <span className="floating-icon" style={{ animationDelay: '0s' }}>🎭</span>
          <span className="floating-icon" style={{ animationDelay: '0.3s' }}>⛸️</span>
          <span className="floating-icon" style={{ animationDelay: '0.6s' }}>🇬🇧</span>
          <span className="floating-icon" style={{ animationDelay: '0.9s' }}>✨</span>
        </div>
      </div>
    </div>
  )
}

export default Countdown