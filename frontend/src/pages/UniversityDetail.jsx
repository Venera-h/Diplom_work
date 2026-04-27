import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UniversityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [university, setUniversity] = useState(null)

  useEffect(() => {
    axios.get(`/universities/${id}`)
      .then(response => setUniversity(response.data))
      .catch(error => console.error(error))
  }, [id])

  if (!university) return <p style={{ padding: '20px' }}>Загрузка...</p>

  const CNY_TO_RUB = 12.5

  const convertToRub = (value) => {
    if (!value) return '—'
    // Убираем RMB, заменяем запятую-разделитель тысяч на пустоту
    const cleaned = value.replace(/RMB/gi, '').replace(/\s/g, '').replace(/,/g, '')
    const match = cleaned.match(/[\d]+/)
    if (!match) return '—'
    const num = parseFloat(match[0])
    if (isNaN(num)) return '—'
    const rub = Math.round(num * CNY_TO_RUB)
    return `~${rub.toLocaleString('ru-RU')} ₽`
  }

  const feeRows = [
    { label: 'Языковые курсы (китайский язык)', value: university.fee_chinese_language },
    { label: 'Бакалавриат на китайском языке', value: university.fee_bachelor_cn },
    { label: 'Бакалавриат на английском языке', value: university.fee_bachelor_en },
    { label: 'Общежитие (одноместная комната)', value: university.fee_dormitory_single },
    { label: 'Общежитие (двухместная комната)', value: university.fee_dormitory_double },
  ].filter(row => row.value && row.value !== 'X' && row.value !== null)

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/universities')}
        style={{ marginBottom: '16px', cursor: 'pointer', background: 'none', border: '1px solid #ccc', borderRadius: '6px', padding: '6px 14px' }}
      >
        ← Назад
      </button>

      {university.image_url && (
        <img
          src={university.image_url}
          alt={university.title}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }}
        />
      )}

      <h2 style={{ margin: '0 0 4px' }}>{university.title}</h2>
      {university.title_cn && <p style={{ fontSize: '20px', color: '#C62828', margin: '0 0 8px' }}>{university.title_cn}</p>}
      {university.city && <p style={{ color: '#666', marginBottom: '8px' }}>📍 {university.city}</p>}
      {university.website && (
        <a href={university.website} target="_blank" rel="noreferrer" style={{ color: '#1565C0' }}>
          🌐 Официальный сайт
        </a>
      )}
      {university.description && (
        <p style={{
          marginTop: '12px',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '8px',
          padding: '10px 14px',
          color: '#222'
        }}>
          {university.description}
        </p>
      )}

      {/* Таблица стоимости */}
      {feeRows.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Fee Structure at {university.title}</h3>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#3949AB' }}>
                  <th style={thStyle}>ТИП РАСХОДА</th>
                  <th style={thStyle}>СТОИМОСТЬ В ГОД (ЮАНЬ)</th>
                  <th style={thStyle}>ПРИМЕРНО В РУБЛЯХ</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9ff' }}>
                    <td style={tdStyle}>{row.label}</td>
                    <td style={{ ...tdStyle, textAlign: 'center', fontWeight: '500' }}>{row.value}</td>
                    <td style={{ ...tdStyle, textAlign: 'center', color: '#C62828', fontWeight: '500' }}>{convertToRub(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '12px', color: '#888', fontSize: '14px' }}>
            👉 <em>Цены примерные и могут изменяться. Курс юань/рубль: 1 CNY ≈ 12.5 ₽. Свяжитесь с нами для уточнения актуальных данных.</em>
          </p>
        </div>
      )}

      {/* Программы */}
      {university.programs.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h3>Программы обучения</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
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
        </div>
      )}
    </div>
  )
}

const thStyle = {
  color: '#fff',
  padding: '14px 20px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '14px',
  letterSpacing: '0.5px'
}

const tdStyle = {
  padding: '14px 20px',
  borderBottom: '1px solid #eee',
  fontSize: '15px'
}

export default UniversityDetail
