import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LEGS, PLACES, ROUTES, type LegId } from '../data/day'
import '../styles/RouteMap.css'

const RouteMap = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const linesRef = useRef<Partial<Record<LegId, L.Polyline>>>({})
  const [active, setActive] = useState<LegId | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: false })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: 'map-tiles',
    }).addTo(map)

    for (const leg of LEGS) {
      linesRef.current[leg.id] = L.polyline(ROUTES[leg.id].path, {
        color: leg.color,
        weight: 5,
        opacity: 0.85,
        dashArray: leg.id === 'evening' ? '2 9' : undefined,
        lineCap: 'round',
      }).addTo(map)
    }

    for (const place of Object.values(PLACES)) {
      L.marker(place.coords, {
        icon: L.divIcon({
          className: 'map-pin',
          html: `<span>${place.icon}</span>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        }),
      })
        .bindPopup(`<strong>${place.name}</strong><br/>${place.address}`)
        .addTo(map)
    }

    const all = L.featureGroup(Object.values(linesRef.current) as L.Polyline[])
    map.fitBounds(all.getBounds(), { padding: [28, 28] })
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      linesRef.current = {}
    }
  }, [])

  // Highlight one leg and zoom to it, or show the whole day
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    for (const leg of LEGS) {
      const line = linesRef.current[leg.id]
      line?.setStyle({ opacity: !active || active === leg.id ? 0.9 : 0.15, weight: active === leg.id ? 7 : 5 })
      if (active === leg.id) line?.bringToFront()
    }
    const target = active
      ? linesRef.current[active]!.getBounds()
      : L.featureGroup(Object.values(linesRef.current) as L.Polyline[]).getBounds()
    map.flyToBounds(target, { padding: [36, 36], duration: 0.8 })
  }, [active])

  const activeLeg = LEGS.find((l) => l.id === active)

  return (
    <div className="route-map">
      <div className="route-legs">
        <button className={`route-leg ${active === null ? 'active' : ''}`} onClick={() => setActive(null)}>
          Hele dagen
        </button>
        {LEGS.map((leg) => (
          <button
            key={leg.id}
            className={`route-leg ${active === leg.id ? 'active' : ''}`}
            style={{ '--leg': leg.color } as React.CSSProperties}
            onClick={() => setActive(active === leg.id ? null : leg.id)}
          >
            <i />
            {leg.label}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="route-map-canvas" />
      <p className="route-note">
        {activeLeg
          ? `${PLACES[activeLeg.from].icon} → ${PLACES[activeLeg.to].icon}   ${activeLeg.note} · ${(ROUTES[activeLeg.id].distance / 1000).toFixed(1).replace('.', ',')} km`
          : 'Trykk på en etappe for å zoome inn'}
      </p>
    </div>
  )
}

export default RouteMap
