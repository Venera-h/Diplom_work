import { useEffect, useState } from 'react'
import axios from 'axios'

function Packages() {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    axios.get('/api/packages/?active_only=true')
      .then(response => setPackages(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Пакеты услуг</h2>
      {packages.length === 0 && <p>Пакетов пока нет</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {packages.map(pkg => (
          <div key={pkg.id} style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            width: '300px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {pkg.image_url && (
              <img
                src={pkg.image_url}
                alt={pkg.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '16px' }}>
              <h3 style={{ margin: '0 0 8px' }}>{pkg.title}</h3>
              <p style={{ color: '#666', margin: '0 0 8px' }}>{pkg.description}</p>
              <p style={{ margin: '0 0 4px' }}>
                Цена: <strong>{pkg.price} ₽</strong>
              </p>
              {pkg.discount > 0 && (
                <p style={{ color: 'green', margin: '0' }}>Скидка: {pkg.discount}%</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Packages
