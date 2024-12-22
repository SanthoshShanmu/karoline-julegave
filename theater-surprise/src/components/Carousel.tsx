import '../styles/Carousel.css'

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel-inner">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="carousel-item">
            🎠
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel