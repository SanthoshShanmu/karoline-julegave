import { useState } from 'react'
import { CHAPTERS, PLACES } from '../data/day'
import '../styles/DayJourney.css'

// Position of the sun/moon on a half-circle arc across the sky, in % of the viewport
function arc(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { left: `${50 - 42 * Math.cos(rad)}%`, top: `${30 - 24 * Math.sin(rad)}%` }
}

const DayJourney = ({ onDone, onChapter }: { onDone: () => void; onChapter?: (i: number) => void }) => {
  const [index, setIndex] = useState(() => (import.meta.env.DEV ? Number(window.location.hash.split('-')[1]) || 0 : 0))
  const chapter = CHAPTERS[index]
  const isLast = index === CHAPTERS.length - 1

  const go = (next: number) => {
    setIndex(next)
    onChapter?.(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      className={`journey ${chapter.night ? 'is-night' : ''}`}
      style={{ '--sky-top': chapter.sky[0], '--sky-bottom': chapter.sky[1] } as React.CSSProperties}
    >
      <div className="sky" aria-hidden="true">
        <div className="stars" />
        <div className={`sun ${chapter.night ? 'is-moon' : ''}`} style={chapter.night ? { left: '78%', top: '12%' } : arc(chapter.sun)} />
      </div>

      <div className="journey-progress" role="tablist" aria-label="Dagens kapitler">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === index}
            aria-label={c.title}
            className={`journey-dot ${i === index ? 'active' : ''} ${i < index ? 'done' : ''}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <article className="chapter" key={chapter.id}>
        <div className={`chapter-photos count-${chapter.images.length}`}>
          {chapter.images.map((src, i) => (
            <img key={src} src={src} alt="" className="chapter-photo" style={{ animationDelay: `${150 + i * 180}ms` }} />
          ))}
        </div>

        <div className="chapter-card">
          <div className="chapter-meta">
            <span className="chapter-time">{chapter.time}</span>
            <span className="chapter-kicker">{chapter.kicker}</span>
          </div>
          <h2 className="chapter-title">{chapter.title}</h2>
          <p className="chapter-text">{chapter.text}</p>

          <div className="chapter-word">
            <span className="chapter-word-label">Dagens ord</span>
            <strong>{chapter.word.term}</strong>
            <span>{chapter.word.meaning}</span>
          </div>

          <p className="chapter-place">
            {PLACES[chapter.place].icon} {PLACES[chapter.place].name}
          </p>
        </div>
      </article>

      <nav className="journey-nav">
        <button className="ghost-button" onClick={() => go(index - 1)} disabled={index === 0}>
          ← Forrige
        </button>
        <button className="primary-button" onClick={() => (isLast ? onDone() : go(index + 1))}>
          {isLast ? 'Se hele dagen 🧡' : 'Og så… →'}
        </button>
      </nav>
    </section>
  )
}

export default DayJourney
