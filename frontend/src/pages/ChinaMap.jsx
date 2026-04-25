import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Фикс иконок Leaflet в React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Координаты городов
const CITY_COORDS = {
  'Chongqing City': [29.5630, 106.5516],
  'Ningbo City, Zhejiang Province': [29.8683, 121.5440],
  'Wenzhou City, Zhejiang Province': [28.0000, 120.6720],
  'Jinhua City, Zhejiang Province': [29.1028, 119.6492],
  'Hangzhou City, Zhejiang Province': [30.2741, 120.1551],
  'Chengdu City, Sichuan Province': [30.5728, 104.0668],
  'Shanghai City': [31.2304, 121.4737],
  "Xi'an, Shaanxi Province": [34.3416, 108.9398],
}

function ChinaMap() {
  const [universities, setUniversities] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/universities/')
      .then(response => setUniversities(response.data))
      .catch(error => console.error(error))
  }, [])

  // Группируем университеты по городу
  const citiesMap = {}
  universities.forEach(uni => {
    const city = uni.city
    if (!city || !CITY_COORDS[city]) return
    if (!citiesMap[city]) citiesMap[city] = []
    citiesMap[city].push(uni)
  })

  return (
    <div style={{ padding: '20px' }}>
      <h2>Карта университетов Китая</h2>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        Нажмите на маркер чтобы увидеть университеты в этом городе
      </p>
      <MapContainer
        center={[35.0, 105.0]}
        zoom={5}
        style={{ height: '550px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {Object.entries(citiesMap).map(([city, unis]) => (
          <Marker key={city} position={CITY_COORDS[city]}>
            <Popup maxWidth={280}>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#C62828' }}>📍 {city}</h4>
                <p style={{ margin: '0 0 8px', color: '#666', fontSize: '13px' }}>
                  Университетов: {unis.length}
                </p>
                {unis.map(uni => (
                  <div
                    key={uni.id}
                    onClick={() => navigate(`/universities/${uni.id}`)}
                    style={{
                      padding: '6px 8px',
                      marginBottom: '4px',
                      background: '#f0f7ff',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#1565C0'
                    }}
                  >
                    🎓 {uni.title}
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default ChinaMap
