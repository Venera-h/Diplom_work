import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const YANDEX_KEY = import.meta.env.VITE_YANDEX_MAP_KEY

const CITY_COORDS = {
  'Chongqing City': { coords: [29.5630, 106.5516], ru: 'Чунцин' },
  'Ningbo City, Zhejiang Province': { coords: [29.8683, 121.5440], ru: 'Нинбо' },
  'Wenzhou City, Zhejiang Province': { coords: [28.0000, 120.6720], ru: 'Вэньчжоу' },
  'Jinhua City, Zhejiang Province': { coords: [29.1028, 119.6492], ru: 'Цзиньхуа' },
  'Hangzhou City, Zhejiang Province': { coords: [30.2741, 120.1551], ru: 'Ханчжоу' },
  'Chengdu City, Sichuan Province': { coords: [30.5728, 104.0668], ru: 'Чэнду' },
  'Shanghai City': { coords: [31.2304, 121.4737], ru: 'Шанхай' },
  "Xi'an, Shaanxi Province": { coords: [34.3416, 108.9398], ru: 'Сиань' },
}

function ChinaMap() {
  const mapRef = useRef(null)
  const [universities, setUniversities] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/universities/')
      .then(response => setUniversities(response.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (!universities.length) return

    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_KEY}&lang=ru_RU`
    script.async = true
    script.onload = () => {
      window.ymaps.ready(() => {
        if (!mapRef.current) return

        const map = new window.ymaps.Map(mapRef.current, {
          center: [35.0, 105.0],
          zoom: 4,
          controls: ['zoomControl', 'fullscreenControl']
        })

        // Группируем по городу
        const citiesMap = {}
        universities.forEach(uni => {
          const city = uni.city
          if (!city || !CITY_COORDS[city]) return
          if (!citiesMap[city]) citiesMap[city] = []
          citiesMap[city].push(uni)
        })

        Object.entries(citiesMap).forEach(([city, unis]) => {
          const { coords, ru } = CITY_COORDS[city]

          const balloonContent = `
            <div style="padding:8px; min-width:200px">
              <b style="color:#C62828; font-size:15px">📍 ${ru}</b>
              <p style="color:#666; margin:4px 0">Университетов: ${unis.length}</p>
              ${unis.map(uni => `
                <a href="/universities/${uni.id}" style="display:block; padding:6px 8px; margin:4px 0; background:#f0f7ff; border-radius:6px; font-size:13px; color:#1565C0; text-decoration:none">
                  🎓 ${uni.title}
                </a>
              `).join('')}
            </div>
          `

          const placemark = new window.ymaps.Placemark(coords, {
            balloonContent,
            hintContent: ru
          }, {
            preset: 'islands#redDotIcon'
          })

          map.geoObjects.add(placemark)
        })
      })
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [universities])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Карта университетов Китая</h2>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        Нажмите на маркер чтобы увидеть университеты в этом городе
      </p>
      <div
        ref={mapRef}
        style={{ height: '550px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
      />
    </div>
  )
}

export default ChinaMap
