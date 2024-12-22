import { useState } from 'react'
import Carousel from './Carousel'
import '../styles/Announcement.css'

const Announcement = () => {
  const [showDetails, setShowDetails] = useState(false)

  const handleAnswer = (answer: string) => {
    if (answer === 'Karusell') {
      setShowDetails(true)
    } else {
      alert('Prøv igjen!')
    }
  }

  const QuizContent = () => (
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
  )

  const DetailsContent = () => (
    <>
      <h1>Korrekt!</h1>
      <h2>Vi skal se musikalen "Karusell" på Nationaltheatret!</h2>
      <p>16 Januar kl. 19.30 med date først</p>
      <p>God Jul!🎄</p>
    </>
  )

  return (
    <div className="announcement">
      <h1>🎭 Her er julegaven! 🎭</h1>
      <div className="announcement-content">
        <div className="carousel-column">
          <Carousel />
        </div>
        <div className="details-column details">
          {showDetails ? <DetailsContent /> : <QuizContent />}
        </div>
      </div>
    </div>
  )
}

export default Announcement