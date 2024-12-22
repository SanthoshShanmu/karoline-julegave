import '../styles/Carousel.css'

const Carousel = ({ speed }: { speed: number }) => {
  const items = ['🐎', '🐎', '🐎', '🐎', '🐎', '🐎']
  const radius = 100 // pixels from center

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ animationDuration: `${speed}s` }}>
        {items.map((item, index) => {
          const angle = (index * 360) / items.length
          const x = radius * Math.cos((angle * Math.PI) / 180)
          const y = radius * Math.sin((angle * Math.PI) / 180)
          
          return (
            <div
              key={index}
              className="carousel-item"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
              }}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel