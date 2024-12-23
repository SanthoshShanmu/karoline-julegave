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
    const target = new Date('2024-12-24T20:00:00')
    
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

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="countdown">
      <h1>🎄 Snart lov til å åpne julegaven! 🎄</h1>
      <div className="timer">
        <div>{String(timeLeft.days).padStart(2, '0')}d</div>
        <div>{String(timeLeft.hours).padStart(2, '0')}h</div>
        <div>{String(timeLeft.minutes).padStart(2, '0')}m</div>
        <div>{String(timeLeft.seconds).padStart(2, '0')}s</div>
      </div>
    </div>
  )
}

export default Countdown