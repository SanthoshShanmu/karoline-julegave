import { useState, useEffect, useRef } from 'react'
import Countdown from './components/Countdown'
import Announcement from './components/Announcement'
import './App.css'

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const targetDate = new Date('2025-12-24T18:00:00')
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const now = new Date()
    setShowAnnouncement(now >= targetDate)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(error => {
        console.log('Auto-play was prevented:', error)
      })
    }
  }, [])

  return (
    <div className="app">
      {/* Floating magical elements */}
      <div className="magic-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="sparkle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}>✨</div>
        ))}
      </div>
      
      <button 
        onClick={togglePlay} 
        className="music-toggle"
      >
        {isPlaying ? '🔇 Pause musikk' : '🎵 Spill musikk'}
      </button>
      <audio ref={audioRef} loop>
        <source src="/Mariah Carey - All I Want for Christmas Is You (Make My Wish Come True Edition).mp3" type="audio/mp3" />
      </audio>
      {showAnnouncement ? <Announcement /> : <Countdown />}
    </div>
  )
}

export default App