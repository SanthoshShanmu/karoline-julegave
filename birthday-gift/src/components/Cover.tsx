import { useState } from 'react'
import Countdown from './Countdown'
import '../styles/Cover.css'

interface Props {
  onOpen: () => void
  onSkip?: () => void
}

const Cover = ({ onOpen, onSkip }: Props) => {
  const [breaking, setBreaking] = useState(false)

  const breakSeal = () => {
    if (breaking) return
    setBreaking(true)
    setTimeout(onOpen, 1100)
  }

  return (
    <section className={`cover ${breaking ? 'is-opening' : ''}`}>
      <div className="cover-arch">
        <div className="cover-arch-photo" aria-hidden="true" />
        <div className="cover-arch-body">
          <p className="eyebrow">Per a Karoline</p>
          <h1 className="cover-title">
            Feliç
            <br />
            <em>aniversari!</em>
          </h1>
          <p className="cover-lede">Gratulerer så mye med dagen i går, kjære deg 🧡</p>
          <p className="cover-text">
            Gaven din får ikke plass i en eske.
            <br />
            Den er en hel dag – her i vår nye by.
          </p>

          <div className="cover-teaser">
            <span className="cover-teaser-label">Den starter om</span>
            <Countdown variant="teaser" />
          </div>
        </div>

        <button className="seal" onClick={breakSeal} aria-label="Bryt seglet og åpne gaven">
          <span className="seal-half left">
            <span>K</span>
          </span>
          <span className="seal-half right">
            <span>K</span>
          </span>
        </button>
      </div>

      <p className="cover-hint">Trykk på seglet for å åpne</p>
      {onSkip && (
        <button className="link-button cover-skip" onClick={onSkip}>
          Har du åpnet før? Hopp rett til programmet →
        </button>
      )}
    </section>
  )
}

export default Cover
