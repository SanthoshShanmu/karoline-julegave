import { useState, useEffect } from 'react'
import Countdown from './components/Countdown'
import Announcement from './components/Announcement'
import './App.css'

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const targetDate = new Date('2023-12-24T00:00:00')

  useEffect(() => {
    const now = new Date()
    setShowAnnouncement(now >= targetDate)
  }, [])

  return (
    <div className="app">
      {showAnnouncement ? <Announcement /> : <Countdown />}
    </div>
  )
}

export default App