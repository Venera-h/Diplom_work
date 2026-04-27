import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Universities() {
  const [universities, setUniversities] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/universities/')
      .then(response => setUniversities(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Университеты</h2>
      {universities.length === 0 && <p>Университетов пока нет</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {universities.map(uni => (
          <div
            key={uni.id}
            onClick={() => navigate(`/universities/${uni.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)'}
          >
            {uni.image_url && (
              <img
                src={uni.image_url}
                alt={uni.title}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
              />
            )}
            <div>
              <h3 style={{ margin: '0 0 4px' }}>{uni.title}</h3>
              {uni.city && <p style={{ margin: '0', color: '#666' }}>📍 {uni.city}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Universities
