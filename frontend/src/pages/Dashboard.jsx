import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

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

  const statusLabels = {
    pending: 'Ожидает',
    confirmed: 'Подтверждена',
    in_progress: 'В работе',
    completed: 'Завершена',
    cancelled: 'Отменена'
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Личный кабинет</h2>
      {orders.length === 0
        ? <p>У вас пока нет заявок</p>
        : orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '12px 0' }}>
            <p>Заявка №{order.id}</p>
            <p>Программа: {order.program_id}</p>
            <p>Статус: {statusLabels[order.status]}</p>
            <p>Цена: {order.price} ₽</p>
            {order.comment && <p>Комментарий: {order.comment}</p>}
          </div>
        ))
      }
    </div>
  )
}

export default Dashboard
