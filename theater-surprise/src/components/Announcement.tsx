import { useState } from 'react'
import Carousel from './Carousel'
import confetti from 'canvas-confetti'
import '../styles/Announcement.css'

const Announcement = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [carouselSpeed, setCarouselSpeed] = useState(20)
  const [showNotification, setShowNotification] = useState(false)

  const handleAnswer = (answer: string) => {
    if (answer === 'Karusell') {
      setShowDetails(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setShowNotification(true)
      setCarouselSpeed(prev => Math.max(prev * 0.25, 1))
      setTimeout(() => setShowNotification(false), 2500)
    }
  }

  return (
    <div className="announcement">
      {showNotification && (
        <div className="notification">
          Prøv igjen!
        </div>
      )}
      <h1>🎭 Her er julegaven! 🎭</h1>
      <div className="announcement-content">
        <div className="carousel-column">
          <Carousel speed={carouselSpeed} />
        </div>
        <div className="details-column details">
          {showDetails ? (
            <>
              <h2>Vi skal se musikalen "Karusell" på Nationaltheatret!</h2>
              <p>16 Januar kl. 19.30 med middag før det 💗</p>
                <p>Her er mer info: <a href="https://www.nationaltheatret.no/forestillinger/karusell/" target="_blank" rel="noopener noreferrer">Info</a></p>
              <p>Sees på søndag, god jul i mellomtiden!🎄</p>
            </>
          ) : (
            <>
              <h2>Hva er det den fine animasjonen viser?</h2>
              <div className="quiz-options">
                {['Gale hester', 'Snurrebass', 'Karusell'].map((option) => (
                  <button 
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="quiz-option"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Announcement