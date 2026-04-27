import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/auth/login', { login, password })
      .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user_id', response.data.user_id)
          alert('Вы вошли!')
      })
      .catch(() => setError('Неверный логин или пароль'))
  }


  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login
