import { useState } from 'react'
import Carousel from './Carousel'
import confetti from 'canvas-confetti'
import '../styles/Announcement.css'

const Announcement = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [carouselSpeed, setCarouselSpeed] = useState(20)

  const handleAnswer = (answer: string) => {
    if (answer === 'Karusell') {
      setShowDetails(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      alert('Prøv igjen!')
      setCarouselSpeed(prev => Math.max(prev * 0.25, 1))
    }
  }

  return (
    <div className="announcement">
      <h1>🎭 Her er julegaven! 🎭</h1>
      <div className="announcement-content">
        <div className="carousel-column">
          <Carousel speed={carouselSpeed} />
        </div>
        <div className="details-column details">
          {showDetails ? (
            <>
              <h2>Vi skal se musikalen "Karusell" på Nationaltheatret!</h2>
              <p>16 Januar kl. 19.30 med date først</p>
              <p>God Jul!🎄</p>
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