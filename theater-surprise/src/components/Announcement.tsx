import Carousel from './Carousel'
import '../styles/Announcement.css'

const Announcement = () => {
  return (
    <div className="announcement">
      <h1>🎭 Overraskelse! 🎭</h1>
      <Carousel />
      <div className="details">
        <h2>Vi skal se musikalen "Karusell" på Nationaltheatret!</h2>
        <p>16 Januar kl. 19.30 med date først</p>
        <p>God Jul!🎄</p>
      </div>
    </div>
  )
}

export default Announcement