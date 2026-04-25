import { useEffect, useState } from 'react'
import axios from 'axios'

const FILTERS = [
  { value: 'all', label: '🌟 Все' },
  { value: 'summer', label: '🌞 Лето' },
  { value: 'winter', label: '❄️ Зима' },
  { value: 'bachelor', label: '🎓 Бакалавриат' },
  { value: 'language', label: '🗣️ Языковые курсы' },
  { value: 'master', label: '📚 Магистратура' },
]

function Programs() {
  const [programs, setPrograms] = useState([])
  const [packages, setPackages] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/programs/')
      .then(response => setPrograms(response.data))
      .catch(error => console.error(error))

    axios.get('http://127.0.0.1:8003/api/packages/?active_only=true')
      .then(response => setPackages(response.data))
      .catch(error => console.error(error))
  }, [])

  const filtered = activeFilter === 'all'
    ? programs
    : programs.filter(p => p.category === activeFilter)

  return (
    <div style={{ padding: '20px' }}>
      <h2>Каталог программ</h2>

      {/* Кнопки фильтрации */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {FILTERS.map(filter => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: '2px solid',
              borderColor: activeFilter === filter.value ? '#C62828' : '#ddd',
              background: activeFilter === filter.value ? '#C62828' : '#fff',
              color: activeFilter === filter.value ? '#fff' : '#555',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeFilter === filter.value ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Программы */}
      {filtered.length === 0 && (
        <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
          Программ в этой категории пока нет
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
        {filtered.map(program => (
          <div
            key={program.id}
            style={{
              border: '1px solid #eee', borderRadius: '12px', padding: '20px',
              width: '280px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              transition: 'transform 0.2s, box-shadow 0.2s', background: '#fff'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)'
            }}
          >
            {program.category && (
              <span style={{
                fontSize: '12px', background: '#fff5f5', color: '#C62828',
                borderRadius: '6px', padding: '2px 8px', fontWeight: 'bold',
                marginBottom: '8px', display: 'inline-block'
              }}>
                {FILTERS.find(f => f.value === program.category)?.label || program.category}
              </span>
            )}
            <h3 style={{ margin: '8px 0' }}>{program.title}</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>{program.description}</p>
            <p style={{ margin: '0 0 4px', fontSize: '14px' }}>⏱️ {program.duration_months} мес.</p>
            <p style={{ margin: '0', fontWeight: 'bold', color: '#C62828' }}>💰 {program.price} ₽</p>
          </div>
        ))}
      </div>

      {/* Пакеты услуг */}
      {packages.length > 0 && (
        <>
          <h2 style={{ marginBottom: '8px' }}>Пакеты услуг</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Выгодные комплексные предложения со скидкой</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {packages.map(pkg => (
              <div key={pkg.id} style={{
                border: '2px solid #C62828', borderRadius: '12px',
                width: '300px', overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(198,40,40,0.1)', background: '#fff'
              }}>
                {pkg.image_url && (
                  <img
                    src={pkg.image_url}
                    alt={pkg.title}
                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '16px' }}>
                  {pkg.discount > 0 && (
                    <span style={{
                      background: '#C62828', color: '#fff', borderRadius: '6px',
                      padding: '2px 8px', fontSize: '12px', fontWeight: 'bold',
                      marginBottom: '8px', display: 'inline-block'
                    }}>
                      🔥 Скидка {pkg.discount}%
                    </span>
                  )}
                  <h3 style={{ margin: '8px 0' }}>{pkg.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>{pkg.description}</p>
                  <p style={{ margin: '0', fontWeight: 'bold', color: '#C62828', fontSize: '18px' }}>
                    💰 {pkg.price} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Programs
