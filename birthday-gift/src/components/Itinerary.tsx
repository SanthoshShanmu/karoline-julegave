import Countdown from './Countdown'
import { useNow } from '../useNow'
import RouteMap from './RouteMap'
import credits from '../data/credits.json'
import { PLACES, TICKETS_URL, TIMELINE } from '../data/day'
import '../styles/Itinerary.css'

const ICS = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Karoline//Bursdagsgave//NO',
  'BEGIN:VEVENT',
  'UID:paella-20261107@karoline',
  'DTSTAMP:20261022T000000Z',
  'DTSTART:20261107T100000Z',
  'DTEND:20261107T133000Z',
  'SUMMARY:🥘 My First Paella – paellakurs\\, tapas & Mercat de Russafa',
  'LOCATION:Parròquia de Sant Valeri\\, Carrer del Pare Perera 6\\, 46006 València',
  'DESCRIPTION:Møtes ved kirkedøra kl. 11:00. Gå hjemmefra ca. 10:30. Billetter: ' + TICKETS_URL,
  'BEGIN:VALARM',
  'TRIGGER:-PT45M',
  'ACTION:DISPLAY',
  'DESCRIPTION:Paellakurs om 45 min!',
  'END:VALARM',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:bakkali-20261107@karoline',
  'DTSTAMP:20261022T000000Z',
  'DTSTART:20261107T193000Z',
  'DTEND:20261107T223000Z',
  'SUMMARY:🏮 Middag på Living Bakkali',
  'LOCATION:Living Bakkali\\, Carrer de Xile 9\\, 46021 València',
  'DESCRIPTION:Bord for to kl. 20:30.',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

function downloadCalendar() {
  const blob = new Blob([ICS], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'karoline-7-november.ics'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const mapsLink = (id: keyof typeof PLACES) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${PLACES[id].name}, ${PLACES[id].address}`)}`

const Itinerary = ({ onReplay }: { onReplay: () => void }) => {
  const now = useNow(30_000)
  // Index of the timeline step currently underway (only meaningful on the day itself)
  const currentStep = TIMELINE.reduce((acc, step, i) => (now >= step.at ? i : acc), -1)
  const isToday = now.toDateString() === TIMELINE[0].at.toDateString()

  return (
    <section className="itinerary stage-enter">
      <header className="itinerary-hero">
        <p className="eyebrow">Gaven din</p>
        <h1 className="itinerary-title">
          <span>Lørdag</span>
          <strong>7. november</strong>
        </h1>
        <p className="itinerary-sub">Paellakurs, tapas, marked – og middag for to</p>
        <Countdown />
      </header>

      <div className="itinerary-actions">
        <a className="primary-button" href={TICKETS_URL} target="_blank" rel="noreferrer">
          🎟️ Billettene våre (QR)
        </a>
        <button className="ghost-button" onClick={downloadCalendar}>
          📅 Legg i kalenderen
        </button>
      </div>

      <div className="tile-panel">
        <h2 className="panel-title">Dagen, time for time</h2>
        <ol className="timeline">
          {TIMELINE.map((step, i) => (
            <li
              key={step.time}
              className={`timeline-step ${isToday && i === currentStep ? 'is-now' : ''} ${isToday && i < currentStep ? 'is-past' : ''}`}
            >
              <span className="timeline-time">{step.time}</span>
              <span className="timeline-dot">{PLACES[step.place].icon}</span>
              <span className="timeline-text">
                {step.text}
                <a href={mapsLink(step.place)} target="_blank" rel="noreferrer" className="timeline-place">
                  {PLACES[step.place].address}
                </a>
              </span>
            </li>
          ))}
        </ol>
        <p className="panel-footnote">Kurset varer 11:00–14:30 – klokkeslettene innimellom er omtrentlige.</p>
      </div>

      <div className="tile-panel">
        <h2 className="panel-title">Ruten vår gjennom byen</h2>
        <RouteMap />
      </div>

      <div className="tile-panel packing">
        <h2 className="panel-title">Husk</h2>
        <ul>
          <li>👟 Gode sko – vi går mye</li>
          <li>😋 Tom mage før kl. 11</li>
          <li>📱 Telefonen med billettene</li>
          <li>💃 Noe fint til kvelden</li>
        </ul>
      </div>

      <div className="love-note">
        <p>
          Takk for at du ble med meg til Valencia. Jeg gleder meg til å lage vår første paella sammen – og alle de
          neste.
        </p>
        <p className="love-sign">Feliç aniversari, estimada 🧡</p>
      </div>

      <footer className="credits">
        <button className="link-button" onClick={onReplay}>
          ↺ Opplev avsløringen på nytt
        </button>
        <p>
        Foto via Wikimedia Commons:{' '}
        {Object.entries(credits).map(([key, c], i, arr) => (
          <span key={key}>
            <a href={c.source} target="_blank" rel="noreferrer">
              {c.author}
            </a>{' '}
            ({c.license}){i < arr.length - 1 ? ', ' : '.'}
          </span>
        ))}
        </p>
      </footer>
    </section>
  )
}

export default Itinerary
