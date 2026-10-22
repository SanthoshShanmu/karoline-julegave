import { useState } from 'react'
import { celebrate } from '../celebrate'
import '../styles/Quiz.css'

const OPTIONS = [
  { id: 'sushi', icon: '🍣', label: 'Sushi' },
  { id: 'pizza', icon: '🍕', label: 'Pizza napoletana' },
  { id: 'paella', icon: '🥘', label: 'Paella' },
  { id: 'croissant', icon: '🥐', label: 'Croissanter' },
]

const NOPES = [
  'Nesten… men vi bor jo i Valencia! 😉',
  'Kaldt! Tenk ris, safran og en stor panne 🍚',
  'Hint: retten ble født i rismarkene rett utenfor byen 🌾',
]

const Quiz = ({ onCorrect }: { onCorrect: () => void }) => {
  const [wrong, setWrong] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  const choose = (id: string) => {
    if (picked) return
    if (id === 'paella') {
      setPicked(id)
      setToast(null)
      celebrate()
      setTimeout(onCorrect, 1400)
      return
    }
    if (!wrong.includes(id)) setWrong([...wrong, id])
    setToast(NOPES[wrong.length % NOPES.length])
  }

  return (
    <section className="quiz stage-enter">
      <p className="eyebrow">Del 2 · Hva?</p>
      <h2 className="stage-title">Vi skal lage noe sammen.</h2>
      <p className="stage-sub">Hva tror du det er?</p>

      <div className="quiz-grid">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            className={`quiz-option ${wrong.includes(o.id) ? 'is-wrong' : ''} ${picked === o.id ? 'is-right' : ''}`}
            onClick={() => choose(o.id)}
            disabled={wrong.includes(o.id)}
          >
            <span className="quiz-icon">{o.icon}</span>
            <span>{o.label}</span>
          </button>
        ))}
      </div>

      <p className={`quiz-toast ${toast ? 'visible' : ''}`} key={toast ?? 'none'} role="status">
        {toast}
      </p>
      {picked && <p className="quiz-yes">¡Sí! Vi skal på paellakurs! 🥘</p>}
    </section>
  )
}

export default Quiz
