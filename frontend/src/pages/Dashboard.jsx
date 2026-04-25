import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const STATUS_STEPS = [
  { key: 'pending', label: 'Заявка подана', icon: '📝' },
  { key: 'confirmed', label: 'Документы приняты', icon: '✅' },
  { key: 'in_progress', label: 'Ожидание приглашения от вуза', icon: '🏫' },
  { key: 'completed', label: 'Виза готова', icon: '🛂' },
]

const STATUS_INDEX = {
  pending: 0,
  confirmed: 1,
  in_progress: 2,
  completed: 3,
  cancelled: -1
}

function StatusTracker({ status }) {
  if (status === 'cancelled') {
    return (
      <div style={{ background: '#fff3f3', borderRadius: '8px', padding: '12px 16px', color: '#C62828' }}>
        ❌ Заявка отменена
      </div>
    )
  }

  const currentIndex = STATUS_INDEX[status] ?? 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', margin: '12px 0', flexWrap: 'wrap' }}>
      {STATUS_STEPS.map((step, i) => (
        <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: i <= currentIndex ? '#C62828' : '#eee',
              color: i <= currentIndex ? '#fff' : '#aaa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'all 0.3s'
            }}>
              {i <= currentIndex ? step.icon : '○'}
            </div>
            <span style={{
              fontSize: '11px',
              color: i <= currentIndex ? '#C62828' : '#aaa',
              textAlign: 'center',
              maxWidth: '80px',
              lineHeight: '1.3'
            }}>
              {step.label}
            </span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div style={{
              width: '40px',
              height: '3px',
              background: i < currentIndex ? '#C62828' : '#eee',
              margin: '0 4px',
              marginBottom: '24px',
              transition: 'all 0.3s'
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

function Dashboard() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    if (!token) {
      setError('Вы не авторизованы')
      return
    }
    axios.get(`http://127.0.0.1:8002/api/orders/user/${userId}`)
      .then(response => setOrders(response.data))
      .catch(() => setError('Не удалось загрузить заявки'))
  }, [])

  if (error) return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
      <p style={{ color: '#C62828', fontSize: '18px' }}>{error}</p>
      <button
        onClick={() => navigate('/auth')}
        style={{ marginTop: '16px', padding: '12px 24px', background: '#C62828', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}
      >
        Войти
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#C62828' }}>👤 Личный кабинет</h2>

      <div style={{ background: '#fff9f0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', border: '1px solid #f0e0d0' }}>
        <p style={{ margin: 0, color: '#666' }}>🎓 Добро пожаловать! Здесь вы можете отслеживать статус ваших заявок.</p>
      </div>

      <h3 style={{ marginBottom: '16px' }}>Мои заявки</h3>

      {orders.length === 0
        ? (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px' }}>📭</p>
            <p style={{ color: '#666', marginBottom: '16px' }}>У вас пока нет заявок</p>
            <button
              onClick={() => navigate('/apply')}
              style={{ padding: '12px 24px', background: '#C62828', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}
            >
              Оставить заявку
            </button>
          </div>
        )
        : orders.map(order => (
          <div key={order.id} style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ margin: 0 }}>Заявка №{order.id}</h4>
              <span style={{ fontSize: '13px', color: '#999' }}>
                {new Date(order.created_at).toLocaleDateString('ru-RU')}
              </span>
            </div>

            <StatusTracker status={order.status} />

            <div style={{ marginTop: '12px', padding: '12px', background: '#f9f9f9', borderRadius: '8px', fontSize: '14px' }}>
              <p style={{ margin: '0 0 4px' }}>💰 Стоимость: <strong>{order.price} ₽</strong></p>
              {order.comment && <p style={{ margin: '0', color: '#666' }}>💬 {order.comment}</p>}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Dashboard
