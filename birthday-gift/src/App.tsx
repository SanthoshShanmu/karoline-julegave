import { useState } from 'react'
import Cover from './components/Cover'
import ScratchDate from './components/ScratchDate'
import Quiz from './components/Quiz'
import DayJourney from './components/DayJourney'
import Itinerary from './components/Itinerary'
import { CHAPTERS } from './data/day'
import { celebrate } from './celebrate'

type Stage = 'cover' | 'date' | 'quiz' | 'journey' | 'itinerary'

const SEEN_KEY = 'karoline-bursdag-sett'

function readSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

// In dev, jump straight to a stage with e.g. localhost:5173/#itinerary
const initialStage = (import.meta.env.DEV && (window.location.hash.slice(1).split('-')[0] as Stage)) || 'cover'

function App() {
  const [stage, setStage] = useState<Stage>(initialStage)
  const [seenBefore, setSeenBefore] = useState(readSeen)

  const goTo = (next: Stage) => {
    setStage(next)
    window.scrollTo({ top: 0 })
  }

  const finish = () => {
    try {
      localStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Private mode – the skip link just won't show next time
    }
    setSeenBefore(true)
    goTo('itinerary')
    setTimeout(celebrate, 300)
  }

  return (
    <main className={`app stage-${stage}`}>
      {stage === 'cover' && (
        <Cover
          onOpen={() => {
            celebrate()
            goTo('date')
          }}
          onSkip={seenBefore ? () => goTo('itinerary') : undefined}
        />
      )}
      {stage === 'date' && <ScratchDate onNext={() => goTo('quiz')} />}
      {stage === 'quiz' && (
        <Quiz
          onCorrect={() => goTo('journey')}
        />
      )}
      {stage === 'journey' && (
        <DayJourney
          onDone={finish}
          onChapter={(i) => CHAPTERS[i].id === 'paella' && celebrate()}
        />
      )}
      {stage === 'itinerary' && <Itinerary onReplay={() => goTo('cover')} />}
    </main>
  )
}

export default App
