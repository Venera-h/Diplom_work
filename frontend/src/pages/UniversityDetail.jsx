import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UniversityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [university, setUniversity] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8001/universities/${id}`)
      .then(response => setUniversity(response.data))
      .catch(error => console.error(error))
  }, [id])

  if (!university) return <p style={{ padding: '20px' }}>Загрузка...</p>

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/universities')} style={{ marginBottom: '16px', cursor: 'pointer' }}>
        ← Назад
      </button>

      {university.image_url && (
        <img
          src={university.image_url}
          alt={university.title}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px' }}
        />
      )}

      <h2>{university.title}</h2>
      {university.city && <p>📍 {university.city}</p>}
      {university.description && <p>{university.description}</p>}

      <h3>Программы обучения</h3>
      {university.programs.length === 0
        ? <p>Программ пока нет</p>
        : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {university.programs.map(program => (
              <div key={program.id} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                width: '260px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
              }}>
                <h4 style={{ margin: '0 0 8px' }}>{program.title}</h4>
                <p style={{ color: '#666', margin: '0 0 8px' }}>{program.description}</p>
                <p style={{ margin: '0 0 4px' }}>Длительность: {program.duration_months} мес.</p>
                <p style={{ margin: '0' }}>Цена: <strong>{program.price} ₽</strong></p>
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default UniversityDetail
