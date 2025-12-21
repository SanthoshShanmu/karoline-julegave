import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import '../styles/Announcement.css'

const Announcement = () => {
  const [stage, setStage] = useState(0) // 0: intro, 1: hercules reveal, 2: disney on ice reveal, 3: full details
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')

  // Disney-themed confetti
  const triggerMagicConfetti = () => {
    const colors = ['#FFD700', '#FF69B4', '#00CED1', '#9370DB', '#FF6347']
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    })

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
    }, 200)

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })
    }, 400)
  }

  const handleQuizAnswer = (answer: string) => {
    if (answer === 'London') {
      setStage(1)
      triggerMagicConfetti()
    } else {
      setNotificationText('Ikke helt! Prøv igjen! 🏰')
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2500)
    }
  }

  const revealNextShow = () => {
    if (stage === 1) {
      setStage(2)
      triggerMagicConfetti()
    } else if (stage === 2) {
      setStage(3)
      triggerMagicConfetti()
    }
  }

  // Animate stars on mount
  useEffect(() => {
    const interval = setInterval(() => {
      const stars = document.querySelectorAll('.floating-star')
      stars.forEach((star, i) => {
        const el = star as HTMLElement
        el.style.animationDelay = `${i * 0.5}s`
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="announcement">
      {/* Background decorations */}
      <div className="london-skyline"></div>
      <div className="castle-silhouette"></div>
      
      {showNotification && (
        <div className="notification">
          {notificationText}
        </div>
      )}

      {/* Floating Disney stars */}
      <div className="floating-stars">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="floating-star" style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.3}s`
          }}>⭐</span>
        ))}
      </div>

      {stage === 0 && (
        <div className="intro-stage fade-in">
          <h1 className="main-title">
            <span className="magic-text">✨ God Jul, Karoline! ✨</span>
          </h1>
          <div className="gift-box">🎁</div>
          <h2 className="subtitle">Du har fått en magisk reise i gave!</h2>
          <p className="hint-text">Men hvor skal vi?</p>
          
          <div className="quiz-section">
            <h3>Hvilken by skal vi besøke?</h3>
            <div className="quiz-options">
              {['Paris', 'London', 'New York'].map((option) => (
                <button 
                  key={option}
                  onClick={() => handleQuizAnswer(option)}
                  className="quiz-option"
                >
                  <span className="option-icon">
                    {option === 'Paris' && '🗼'}
                    {option === 'London' && '🇬🇧'}
                    {option === 'New York' && '🗽'}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === 1 && (
        <div className="reveal-stage fade-in">
          <h1 className="main-title">
            <span className="magic-text">🎭 Vi skal til London! 🎭</span>
          </h1>
          <h2 className="show-title hercules-title">
            Disney's Hercules<br/>
            <span className="subtitle-show">The Electrifying New Musical</span>
          </h2>
          
          <div className="video-container hercules-video">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="show-video"
            >
              <source src="/Hercules.mp4" type="video/mp4" />
            </video>
            <div className="video-glow hercules-glow"></div>
          </div>

          <div className="show-details">
            <div className="detail-card">
              <span className="detail-icon">📅</span>
              <span className="detail-text">Fredag 27. mars 2026</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">🏛️</span>
              <span className="detail-text">Theatre Royal Drury Lane</span>
            </div>
          </div>

          <p className="tease-text">Men vent... det er mer! 🎉</p>
          <button onClick={revealNextShow} className="reveal-button">
            <span>Vis meg mer!</span>
            <span className="button-sparkle">✨</span>
          </button>
        </div>
      )}

      {stage === 2 && (
        <div className="reveal-stage fade-in">
          <h1 className="main-title">
            <span className="magic-text">⛸️ Og på lørdag... ⛸️</span>
          </h1>
          <h2 className="show-title ice-title">
            Disney On Ice<br/>
            <span className="subtitle-show">Into the Magic</span>
          </h2>
          
          <div className="video-container ice-video">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="show-video"
            >
              <source src="/DisneyOnIce.mp4" type="video/mp4" />
            </video>
            <div className="video-glow ice-glow"></div>
          </div>

          <div className="show-details">
            <div className="detail-card">
              <span className="detail-icon">📅</span>
              <span className="detail-text">Lørdag 28. mars 2026</span>
            </div>
            <div className="detail-card">
              <span className="detail-icon">🏟️</span>
              <span className="detail-text">OVO Arena Wembley</span>
            </div>
          </div>

          <button onClick={revealNextShow} className="reveal-button">
            <span>Se hele programmet!</span>
            <span className="button-sparkle">✨</span>
          </button>
        </div>
      )}

      {stage === 3 && (
        <div className="final-stage fade-in">
          <h1 className="main-title">
            <span className="magic-text">🏰 Disney London Weekend! 🏰</span>
          </h1>
          
          <div className="weekend-overview">
            <div className="show-card hercules-card">
              <div className="show-card-header">
                <span className="day-badge">FREDAG</span>
                <h3>Disney's Hercules</h3>
                <p className="show-tagline">The Electrifying New Musical</p>
              </div>
              <div className="show-card-video">
                <video autoPlay loop muted playsInline>
                  <source src="/Hercules.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="show-card-details">
                <p>📅 27. mars 2026</p>
                <p>🏛️ Theatre Royal Drury Lane</p>
                <p>🎭 West End's nyeste Disney-musikal!</p>
              </div>
            </div>

            <div className="show-card ice-card">
              <div className="show-card-header">
                <span className="day-badge saturday">LØRDAG</span>
                <h3>Disney On Ice</h3>
                <p className="show-tagline">Into the Magic</p>
              </div>
              <div className="show-card-video">
                <video autoPlay loop muted playsInline>
                  <source src="/DisneyOnIce.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="show-card-details">
                <p>📅 28. mars 2026</p>
                <p>🏟️ OVO Arena Wembley</p>
                <p>⛸️ Magisk show på is!</p>
              </div>
            </div>
          </div>

          <div className="final-message">
            <p className="love-message">
              En hel helg med Disney-magi i London! 💖
            </p>
            <p className="closing-text">
              God jul, og gleder meg til mars! 🎄✨
            </p>
            <div className="hearts">
              {['💕', '💖', '💕'].map((heart, i) => (
                <span key={i} className="floating-heart" style={{ animationDelay: `${i * 0.2}s` }}>
                  {heart}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Announcement