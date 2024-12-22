import { useState, useEffect, useRef } from 'react'
import Countdown from './components/Countdown'
import Announcement from './components/Announcement'
import './App.css'

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const targetDate = new Date('2023-12-24T00:00:00')
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
    // Start playing when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.5 // Set volume to 50%
      audioRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error)
      })
    }
  }, [])

  return (
    <div className="app">
      <button 
        onClick={togglePlay} 
        className="music-toggle"
      >
        {isPlaying ? '🔇 Skru av litt julestemning' : '🔊 Sett på litt julestemning'}
      </button>
      <audio ref={audioRef} loop>
        <source src="/Mariah Carey - All I Want for Christmas Is You (Make My Wish Come True Edition).mp3" type="audio/mp3" />
      </audio>
      {showAnnouncement ? <Announcement /> : <Countdown />}
    </div>
  )
}

export default App